function getPrayerMethodForCountry(country) {
    return PRAYER_METHOD_BY_COUNTRY[country] ?? DEFAULT_PRAYER_METHOD;
}

// مفتاح فريد يمثل الموقع الحالي (مدينة أو إحداثيات) لأغراض التخزين المؤقت
function getCurrentPrayerLocationKey() {
    if (useGeolocationForPrayer && userPrayerCoords) {
        return `geo:${userPrayerCoords.latitude.toFixed(3)},${userPrayerCoords.longitude.toFixed(3)}`;
    }
    return `city:${currentSelectedCity}`;
}

function todayLocalDateKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

// التخزين المؤقت الجديد (v2): يحفظ مواقيت كل مدينة على حِدة تحت
// مفتاحها الخاص بها، بدل الاعتماد على مفتاح واحد يُستبدل في كل
// مرة (وهو سبب مشكلة "باقي المدن لا تحمل عند قطع الإنترنت"،
// لأن تغيير المدينة كان يمسح مواقيت المدينة السابقة من التخزين).
function readPrayerCacheStore() {
    try {
        const raw = localStorage.getItem('prayerTimesCache_v2');
        return raw ? JSON.parse(raw) : {};
    } catch (e) {
        return {};
    }
}

function writePrayerCacheStore(store) {
    try {
        localStorage.setItem('prayerTimesCache_v2', JSON.stringify(store));
    } catch (e) { /* التخزين المحلي غير متاح، لا بأس بتجاوز الأمر */ }
}

// يرجع مواقيت مدينة معينة من التخزين المؤقت (أو null إن لم تكن محفوظة)
function readPrayerCache(locKey) {
    const store = readPrayerCacheStore();
    return store[locKey] || null;
}

// يحفظ مواقيت مدينة معينة دون المساس بمواقيت باقي المدن المحفوظة
function writePrayerCache(locKey, payload) {
    const store = readPrayerCacheStore();
    store[locKey] = payload;
    writePrayerCacheStore(store);
}

// قائمة كل المدن الموجودة في القائمة المنسدلة، تُستخدم لتحميل
// مواقيتها كلها مسبقًا (Prefetch) أثناء توفر الإنترنت، حتى تعمل
// عند اختيار أي دولة/مدينة من القائمة حتى بدون اتصال لاحقًا.
function getAllPrayerCityKeys() {
    const select = document.getElementById('prayer-city-select');
    if (!select) return [];
    return Array.from(select.options).map(o => o.value).filter(Boolean);
}

// يجلب ويخزّن مواقيت كل المدن في القائمة تباعًا (بفاصل بسيط بين كل
// طلب وآخر) دون التأثير على الواجهة الحالية المعروضة للمستخدم.
// يتم استدعاؤها عند تحميل الصفحة وعند عودة الاتصال بالإنترنت.
let prefetchingAllCities = false;
async function prefetchAllCitiesPrayerTimes() {
    if (prefetchingAllCities || !navigator.onLine) return;
    prefetchingAllCities = true;
    const dateKey = todayLocalDateKey();
    const keys = getAllPrayerCityKeys();
    for (const cityValue of keys) {
        const locKey = `city:${cityValue}`;
        const existing = readPrayerCache(locKey);
        if (existing && existing.dateKey === dateKey) continue; // محفوظة بالفعل لليوم الحالي
        try {
            const [city, country] = cityValue.split(',');
            const method = getPrayerMethodForCountry(country);
            const url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
            const res = await fetch(url);
            const data = await res.json();
            const t = data.data.timings;
            const dateStr = data.data.date.readable;
            writePrayerCache(locKey, { dateKey, dateStr, timings: t });
        } catch (e) {
            // تعذّر تحميل مدينة معينة (انقطاع مفاجئ مثلًا)؛ نكمل الباقي ونحاول لاحقًا
        }
        // فاصل بسيط بين الطلبات حتى لا نُرهق الـ API دفعة واحدة
        await new Promise(r => setTimeout(r, 250));
    }
    prefetchingAllCities = false;
}

// زر "استخدم موقعي الحالي": يجلب الإحداثيات عبر واجهة المتصفح الجغرافية
// ثم يستدعي API بالإحداثيات مباشرة بدل الاعتماد على اسم المدينة.
function usePrayerGeolocation() {
    if (!navigator.geolocation) {
        alert('متصفحك لا يدعم تحديد الموقع الجغرافي.');
        return;
    }
    const btn = document.getElementById('prayer-geo-btn');
    if (btn) btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> جارٍ التحديد...';

    navigator.geolocation.getCurrentPosition(
        (pos) => {
            userPrayerCoords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
            useGeolocationForPrayer = true;
            const nameEl = document.getElementById('prayer-city-name');
            if (nameEl) nameEl.textContent = 'موقعك الحالي (تحديد تلقائي)';
            if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> موقعي الحالي';
            fetchPrayerTimesData();
        },
        (err) => {
            if (btn) btn.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> موقعي الحالي';
            alert('تعذر تحديد موقعك، تأكد من السماح بالوصول للموقع الجغرافي من إعدادات المتصفح.');
        },
        { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 }
    );
}

function changePrayerCity(v) {
    useGeolocationForPrayer = false;
    userPrayerCoords = null;
    currentSelectedCity = v;
    const nameMap = {
        "Sanaa,Yemen": "صنعاء (اليمن)",
        "Aden,Yemen": "عدن (اليمن)",
        "Al Mukalla,Yemen": "المكلا - حضرموت (اليمن)",
        "Makkah,Saudi Arabia": "مكة المكرمة (السعودية)",
        "Madinah,Saudi Arabia": "المدينة المنورة (السعودية)",
        "Riyadh,Saudi Arabia": "الرياض (السعودية)",
        "Cairo,Egypt": "القاهرة (مصر)",
        "Jerusalem,Palestine": "القدس الشريف (فلسطين)",
        "Dubai,United Arab Emirates": "دبي (الإمارات)",
        "Abu Dhabi,United Arab Emirates": "أبوظبي (الإمارات)",
        "Amman,Jordan": "عمان (الأردن)",
        "Kuwait City,Kuwait": "الكويت (الكويت)",
        "Doha,Qatar": "الدوحة (قطر)",
        "Manama,Bahrain": "المنامة (البحرين)",
        "Muscat,Oman": "مسقط (عُمان)",
        "Baghdad,Iraq": "بغداد (العراق)",
        "Damascus,Syria": "دمشق (سوريا)",
        "Beirut,Lebanon": "بيروت (لبنان)",
        "Khartoum,Sudan": "الخرطوم (السودان)",
        "Tripoli,Libya": "طرابلس (ليبيا)",
        "Tunis,Tunisia": "تونس (تونس)",
        "Algiers,Algeria": "الجزائر (الجزائر)",
        "Rabat,Morocco": "الرباط (المغرب)",
        "Nouakchott,Mauritania": "نواكشوط (موريتانيا)",
        "Mogadishu,Somalia": "مقديشو (الصومال)",
        "Djibouti,Djibouti": "جيبوتي (جيبوتي)",
        "Moroni,Comoros": "موروني (جزر القمر)"
    };
    document.getElementById('prayer-city-name').textContent = nameMap[v] || v;
    fetchPrayerTimesData();
}

function renderPrayerCards(t, dateStr) {
    document.getElementById('prayer-date-display').textContent = dateStr;
    const container = document.getElementById('prayer-times-cards');
    container.innerHTML = `
        <div class="prayer-card" id="card-Fajr"><div class="prayer-name">الفجر</div><div class="prayer-time">${t.Fajr}</div></div>
        <div class="prayer-card" id="card-Sunrise"><div class="prayer-name">الشروق</div><div class="prayer-time">${t.Sunrise}</div></div>
        <div class="prayer-card" id="card-Dhuhr"><div class="prayer-name">الظهر</div><div class="prayer-time">${t.Dhuhr}</div></div>
        <div class="prayer-card" id="card-Asr"><div class="prayer-name">العصر</div><div class="prayer-time">${t.Asr}</div></div>
        <div class="prayer-card" id="card-Maghrib"><div class="prayer-name">المغرب</div><div class="prayer-time">${t.Maghrib}</div></div>
        <div class="prayer-card" id="card-Isha"><div class="prayer-name">العشاء</div><div class="prayer-time">${t.Isha}</div></div>
    `;
    startPrayerCountdown(t);
}

async function fetchPrayerTimesData(forceRefresh = false) {
    const container = document.getElementById('prayer-times-cards');
    const locKey = getCurrentPrayerLocationKey();
    const dateKey = todayLocalDateKey();

    const cached = readPrayerCache(locKey);
    const hasFreshCache = !!(cached && cached.dateKey === dateKey && cached.timings);
    const hasStaleCache = !!(cached && cached.timings);

    // التخزين المؤقت: إن كانت مواقيت اليوم لنفس الموقع محفوظة مسبقًا
    // في localStorage نعرضها فورًا دون طلب API جديد، ما يسرّع التحميل
    // ويضمن عمل الصفحة فورًا دون إنترنت.
    if (!forceRefresh && hasFreshCache) {
        renderPrayerCards(cached.timings, cached.dateStr);
        scheduleMidnightPrayerRefresh();
        return;
    }

    if (hasStaleCache) {
        // نعرض فورًا آخر مواقيت محفوظة لهذا الموقع (حتى لو من يوم سابق)
        // حتى تعمل الصفحة والعداد بدون إنترنت، ثم نحاول تحديثها في الخلفية
        // بمجرد توفر الاتصال.
        renderPrayerCards(cached.timings, cached.dateStr);
        scheduleMidnightPrayerRefresh();
    } else {
        container.innerHTML = '<p style="grid-column:1/-1; text-align:center;">جاري جلب المواقيت المباشرة...</p>';
    }

    try {
        let url;
        if (useGeolocationForPrayer && userPrayerCoords) {
            // استخدام إحداثيات المستخدم مباشرة لدقة أعلى (تاريخ ثابت طوال
            // اليوم بدل الطابع الزمني المتغير، لضمان صلاحية التخزين المؤقت)
            const now = new Date();
            const dd = String(now.getDate()).padStart(2, '0');
            const mm = String(now.getMonth() + 1).padStart(2, '0');
            const yyyy = now.getFullYear();
            url = `https://api.aladhan.com/v1/timings/${dd}-${mm}-${yyyy}?latitude=${userPrayerCoords.latitude}&longitude=${userPrayerCoords.longitude}&method=${DEFAULT_PRAYER_METHOD}`;
        } else {
            const [city, country] = currentSelectedCity.split(',');
            const method = getPrayerMethodForCountry(country);
            url = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
        }

        const res = await fetch(url);
        const data = await res.json();
        const t = data.data.timings;
        const dateStr = data.data.date.readable;

        renderPrayerCards(t, dateStr);
        writePrayerCache(locKey, { dateKey, dateStr, timings: t });
        scheduleMidnightPrayerRefresh();
    } catch(e) {
        // تعذّر الاتصال بالشبكة: إن كانت هناك بيانات محفوظة فهي معروضة
        // بالفعل أعلاه ولا داعي لتغييرها، وإلا نعرض رسالة واضحة توضح
        // أن هذه المدينة تحديدًا لم تُحمَّل بعد ولو مرة واحدة أثناء
        // توفر الإنترنت.
        if (!hasStaleCache) {
            container.innerHTML = '<p style="grid-column:1/-1; text-align:center; color:red;">لا يوجد اتصال بالإنترنت، ولم يتم تحميل مواقيت هذه المدينة من قبل. اتصل بالإنترنت مرة واحدة على الأقل لتحميلها، وستعمل بعدها بدون إنترنت.</p>';
        }
    }
}

// بمجرد عودة الاتصال بالإنترنت: نحدّث مواقيت المدينة الحالية فورًا،
// ثم نحمّل مسبقًا مواقيت كل المدن الأخرى في القائمة حتى تعمل جميعها
// بدون إنترنت لاحقًا.
window.addEventListener('online', () => {
    fetchPrayerTimesData(true);
    prefetchAllCitiesPrayerTimes();
});

// يجدول تحديثًا تلقائيًا عند منتصف الليل المحلي لجلب مواقيت اليوم
// الجديد، ثم يعيد جدولة نفسه لليوم التالي.
function scheduleMidnightPrayerRefresh() {
    if (prayerMidnightTimeout) clearTimeout(prayerMidnightTimeout);
    const now = new Date();
    const nextMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 5, 0);
    const msUntilMidnight = nextMidnight - now;
    prayerMidnightTimeout = setTimeout(() => {
        fetchPrayerTimesData(true);
    }, msUntilMidnight);
}

function startPrayerCountdown(timings) {
    const prayers = [
        { key: 'Fajr', name: 'الفجر' },
        { key: 'Sunrise', name: 'الشروق' },
        { key: 'Dhuhr', name: 'الظهر' },
        { key: 'Asr', name: 'العصر' },
        { key: 'Maghrib', name: 'المغرب' },
        { key: 'Isha', name: 'العشاء' }
    ];

    if (prayerTimerInterval) clearInterval(prayerTimerInterval);

    // نتتبّع اسم الصلاة القادمة الحالية لتفادي إعادة قراءة/تعديل DOM
    // (querySelectorAll + classList) في كل ثانية طالما لم تتغيّر الصلاة القادمة؛
    // فقط عدّاد الوقت (نص) يُحدَّث كل ثانية، وهذا أخف بكثير على المعالج
    let lastNextPrayerKey = null;

    prayerTimerInterval = setInterval(() => {
        const now = new Date();
        let nextPrayer = null;
        let nextPrayerTime = null;

        for (let p of prayers) {
            const [hours, minutes] = timings[p.key].split(':').map(Number);
            const pDate = new Date();
            pDate.setHours(hours, minutes, 0, 0);

            if (pDate > now) {
                nextPrayer = p;
                nextPrayerTime = pDate;
                break;
            }
        }

        if (!nextPrayerTime) {
            const [hours, minutes] = timings['Fajr'].split(':').map(Number);
            nextPrayerTime = new Date();
            nextPrayerTime.setDate(nextPrayerTime.getDate() + 1);
            nextPrayerTime.setHours(hours, minutes, 0, 0);
            nextPrayer = prayers[0];
        }

        if (nextPrayer.key !== lastNextPrayerKey) {
            document.querySelectorAll('.prayer-card').forEach(c => c.classList.remove('next-prayer'));
            const cardEl = document.getElementById(`card-${nextPrayer.key}`);
            if (cardEl) cardEl.classList.add('next-prayer');
            lastNextPrayerKey = nextPrayer.key;
        }

        const diff = nextPrayerTime - now;
        const hrs = Math.floor(diff / (1000 * 60 * 60)).toString().padStart(2, '0');
        const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)).toString().padStart(2, '0');
        const secs = Math.floor((diff % (1000 * 60)) / 1000).toString().padStart(2, '0');

        document.getElementById('next-prayer-name').textContent = nextPrayer.name;
        document.getElementById('prayer-countdown-timer').textContent = `${hrs}:${mins}:${secs}`;
    }, 1000);
}

let recitersData = [];
let currentReciter = null;
let currentMoshaf = null;
// الرواية المختارة حاليًا من قائمة "اختر الرواية"، إن وُجدت — تبقى ثابتة
// ولا يجوز لاختيار قارئ جديد أن يغيّرها؛ فقط اختيار رواية جديدة صراحةً من القائمة يغيّرها
let currentRiwayaFilter = null;

