// دالة تأخير بسيطة (debounce) لتقليل عدد مرات إعادة الرسم أثناء الكتابة
// السريعة في مربعات البحث، بحيث يبقى التمرير/الكتابة سلسًا دون تجميد
// المعالج بإعادة رسم كل قارئ/سورة مع كل ضغطة حرف.
function debounce(fn, delay = 150) {
    let timerId = null;
    return function (...args) {
        if (timerId) clearTimeout(timerId);
        timerId = setTimeout(() => fn.apply(this, args), delay);
    };
}

async function loadReciters() {
    try {
        const res = await fetch('https://mp3quran.net/api/v3/reciters?language=ar');
        const data = await res.json();
        recitersData = data.reciters;
    } catch (e) {
        recitersData = [];
    }

    if (!recitersData || !recitersData.some(r => r.name.includes("سلمان العتيبي"))) {
        recitersData.unshift({
            id: 115,
            name: "سلمان العتيبي",
            moshaf: [{ id: 1, name: "حفص عن عاصم", server: "https://server11.mp3quran.net/s_otaibi/", surah_total: 114, surah_list: "1-114" }]
        });
    }

    // قرّاء إضافيون يغطّون روايات نادرًا ما تتوفر بكثرة (كشعبة عن عاصم، الدوري
    // عن أبي عمرو، خلف عن حمزة، السوسي، هشام، ابن ذكوان، ابن جماز، البزي وقنبل،
    // الدوري عن الكسائي...)، رغم صحة بيانات API. تُدمَج هذه القائمة دائمًا مع
    // نتائج API (وليس فقط عند فشله بالكامل)، مع تفادي أي تكرار لقارئ موجود
    // بالفعل بنفس الاسم، حتى تبقى الروايات القليلة مزوَّدة بخيارات أكثر دومًا.
    const extraRiwayaReciters = [
        {
            id: 108,
            name: "محمود خليل الحصري",
            moshaf: [
                { id: 1, name: "حفص عن عاصم", server: "https://server13.mp3quran.net/hussary/", surah_total: 114, surah_list: "1-114" },
                { id: 2, name: "ورش عن نافع", server: "https://server13.mp3quran.net/hussary/warsh/", surah_total: 114, surah_list: "1-114" },
                { id: 3, name: "قالون عن نافع", server: "https://server13.mp3quran.net/hussary/qalun/", surah_total: 114, surah_list: "1-114" },
                // إضافة رابعة لنفس القارئ: المصحف المجود (رابط مؤكَّد فعليًا)، أسلوب
                // تلاوة مختلف عن "مجود - حفص عن عاصم" الموجود أصلًا لقارئ آخر
                { id: 4, name: "المصحف المجود", server: "https://server13.mp3quran.net/download/husr/Almusshaf-Al-Mojawwad/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            id: 64,
            name: "عبد الباسط عبد الصمد",
            moshaf: [
                { id: 1, name: "حفص عن عاصم", server: "https://server7.mp3quran.net/basit/", surah_total: 114, surah_list: "1-114" },
                { id: 2, name: "ورش عن نافع", server: "https://server7.mp3quran.net/basit/warsh/", surah_total: 114, surah_list: "1-114" },
                { id: 3, name: "مجود - حفص عن عاصم", server: "https://server7.mp3quran.net/basit/Mujawwad/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            id: 54,
            name: "مشاري العفاسي",
            moshaf: [
                { id: 1, name: "حفص عن عاصم", server: "https://server8.mp3quran.net/afs/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            id: 92,
            name: "ماهر المعيقلي",
            moshaf: [
                { id: 1, name: "حفص عن عاصم", server: "https://server12.mp3quran.net/maher/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            id: 120,
            name: "الدوكالي محمد العالم",
            moshaf: [
                { id: 1, name: "قالون عن نافع", server: "https://server10.mp3quran.net/dokali/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            id: 121,
            name: "عبدالرشيد صوفي",
            moshaf: [
                { id: 1, name: "السوسي عن أبي عمرو", server: "https://server16.mp3quran.net/download/soufi/Rewayat-Assosi-A-n-Abi-Amr/", surah_total: 114, surah_list: "1-114" },
                { id: 2, name: "خلف عن حمزة", server: "https://server16.mp3quran.net/download/soufi/Rewayat-Khalaf-A-n-Hamzah/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            // أحمد ديبان قارئ متخصص بالقراءات العشر، لذا فهو يوفّر بمفرده عددًا
            // كبيرًا من الروايات (روابط مؤكَّدة فعليًا من مصادر موثوقة)، وهو ما
            // يحقق طلب توسيع قائمة الروايات والقرّاء المتاحين في هذا القسم
            id: 122,
            name: "أحمد ديبان",
            moshaf: [
                { id: 1, name: "شعبة عن عاصم", server: "https://server16.mp3quran.net/download/deban/Rewayat-Sho-bah-A-n-Asim/", surah_total: 114, surah_list: "1-114" },
                { id: 2, name: "الدوري عن أبي عمرو", server: "https://server16.mp3quran.net/download/deban/Rewayat-Aldori-A-n-Abi-Amr/", surah_total: 114, surah_list: "1-114" },
                { id: 3, name: "قالون عن نافع", server: "https://server16.mp3quran.net/download/deban/Rewayat-Qalon-A-n-Nafi/", surah_total: 114, surah_list: "1-114" },
                { id: 4, name: "ورش عن نافع من طريق الأزرق", server: "https://server16.mp3quran.net/download/deban/Rewayat-Warsh-A-n-Nafi-Men-Tariq-Alazraq/", surah_total: 114, surah_list: "1-114" },
                { id: 5, name: "هشام عن ابي عامر", server: "https://server16.mp3quran.net/download/deban/Rewayat-Hesham-A-n-Abi-A-mer/", surah_total: 25, surah_list: "1-9,13,85,90,92-95,99-101,103,105,107,108,110,112-114" },
                { id: 6, name: "ابن ذكوان عن ابن عامر", server: "https://server16.mp3quran.net/download/deban/Rewayat-Ibn-Thakwan-A-n-Ibn-Amer/", surah_total: 24, surah_list: "1-9,13,77,83,85,86,88,90,92-97,99-101,103,105,107,108,109,112-114" },
                { id: 7, name: "ابن جماز عن أبي جعفر", server: "https://server16.mp3quran.net/download/deban/Rewayat-Ibn-Jammaz-A-n-Abi-Ja-far/", surah_total: 11, surah_list: "1,93,100,102,103,109,110,111,112,113,114" },
                // إضافتان لنفس القارئ (أحمد ديبان) تكملان روايتي ابن كثير كلٌّ على
                // حدة، بعد أن كانت الرواية المدموجة "البزي وقنبل" وحدها متاحة سابقًا
                // (روابط مؤكَّدة فعليًا)
                { id: 8, name: "قنبل عن ابن كثير", server: "https://server16.mp3quran.net/download/deban/Rewayat-Qunbol-A-n-Ibn-Katheer/", surah_total: 114, surah_list: "1-114" },
                { id: 9, name: "البزي عن ابن كثير", server: "https://server16.mp3quran.net/download/deban/Rewayat-Albizi-A-n-Ibn-Katheer/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            id: 123,
            name: "محمد العبدالله",
            moshaf: [
                { id: 1, name: "البزي وقنبل عن ابن كثير", server: "https://server9.mp3quran.net/download/abdullah/", surah_total: 114, surah_list: "1-114" },
                { id: 2, name: "الدوري عن الكسائي", server: "https://server9.mp3quran.net/download/abdullah/Rewayat-AlDorai-A-n-Al-Kisa-ai/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            // مفتاح السلطني يضيف قارئًا ثانيًا لروايات موجودة أصلًا (الدوري عن أبي
            // عمرو، ابن ذكوان عن ابن عامر، الدوري عن الكسائي) ليصبح لدى المستخدم
            // أكثر من صوت للاختيار من بينها لكل رواية (روابط مؤكَّدة فعليًا)
            id: 125,
            name: "مفتاح السلطني",
            moshaf: [
                { id: 1, name: "الدوري عن أبي عمرو", server: "https://server14.mp3quran.net/download/muftah_sultany/Rewayat-Aldori-A-n-Abi-Amr/", surah_total: 114, surah_list: "1-114" },
                { id: 2, name: "ابن ذكوان عن ابن عامر", server: "https://server14.mp3quran.net/download/muftah_sultany/Rewayat_Ibn-Thakwan-A-n-Ibn-Amer/", surah_total: 114, surah_list: "1-114" },
                { id: 3, name: "الدوري عن الكسائي", server: "https://server14.mp3quran.net/download/muftah_sultany/Rewayat-AlDorai-A-n-Al-Kisa-ai/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            // وليد النائحي يوفّر رواية "قالون عن نافع من طريق أبي نشيط"، وهي طريق مختلف
            // عن "قالون عن نافع" الأصلية الموجودة أعلاه ولم تكن ممثَّلة سابقًا (رابط مؤكَّد فعليًا)
            id: 126,
            name: "وليد النائحي",
            moshaf: [
                { id: 1, name: "قالون عن نافع من طريق أبي نشيط", server: "https://server9.mp3quran.net/download/waleed/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            // محمد عبدالكريم يوفّر رواية "ورش عن نافع من طريق أبي بكر الأصبهاني"، وهي
            // طريق مختلف عن "ورش عن نافع" و"ورش عن نافع من طريق الأزرق" الموجودتين
            // أعلاه، ولم تكن ممثَّلة سابقًا في هذه القائمة (رابط مؤكَّد فعليًا)
            id: 127,
            name: "محمد عبدالكريم",
            moshaf: [
                { id: 1, name: "ورش عن نافع من طريق أبي بكر الأصبهاني", server: "https://server7.mp3quran.net/m_kreem_warsh/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            // الحسيني العزازي يوفّر "المصحف المعلم" (تلاوة بأسلوب الترديد التعليمي لحفظ
            // القرآن)، وهو نمط مختلف لم يكن ممثَّلًا سابقًا في هذه القائمة (رابط مؤكَّد فعليًا)
            id: 128,
            name: "الحسيني العزازي",
            moshaf: [
                { id: 1, name: "المصحف المعلم", server: "https://server8.mp3quran.net/download/3zazi/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            // علي عبدالرحمن الحذيفي يضيف صوتًا ثانيًا لرواية شعبة عن عاصم، التي كانت
            // متاحة سابقًا فقط عبر أحمد ديبان (رابط مؤكَّد فعليًا)
            id: 129,
            name: "علي عبدالرحمن الحذيفي",
            moshaf: [
                { id: 1, name: "شعبة عن عاصم", server: "https://server9.mp3quran.net/download/hthfi/Rewayat-Sho-bah-A-n-Asim/", surah_total: 114, surah_list: "1-114" }
            ]
        },
        {
            // صابر عبدالحكم يضيف صوتًا ثالثًا لرواية شعبة عن عاصم (رابط مؤكَّد فعليًا)
            id: 130,
            name: "صابر عبدالحكم",
            moshaf: [
                { id: 1, name: "شعبة عن عاصم", server: "https://server16.mp3quran.net/download/The-ten-readings/Rewayat-Sho-bah-A-n-Asim/Sabdulhakam/", surah_total: 114, surah_list: "1-114" }
            ]
        }
    ];
    extraRiwayaReciters.forEach((r) => {
        const existingReciter = recitersData.find(existing => existing.name === r.name);
        if (!existingReciter) {
            // القارئ غير موجود إطلاقًا في نتائج API: يُضاف كاملًا كما كان سابقًا
            recitersData.push(r);
            return;
        }
        // القارئ موجود بالفعل في نتائج API (وهذا شائع لقرّاء مشهورين): بدل تجاهل
        // الإضافة بالكامل كما كان يحدث سابقًا، نُدمج فقط الروايات التي لا يملكها
        // القارئ الحقيقي من API، حتى لا تُفقَد الروايات الإضافية المؤكَّدة صمتًا.
        if (!existingReciter.moshaf) existingReciter.moshaf = [];
        r.moshaf.forEach((extraMoshaf) => {
            const alreadyHasIt = existingReciter.moshaf.some(
                m => normalizeRiwayaName(m.name) === normalizeRiwayaName(extraMoshaf.name)
            );
            if (!alreadyHasIt) {
                existingReciter.moshaf.push(extraMoshaf);
            }
        });
    });

    renderRecitersOptions(recitersData);
    buildGlobalRiwayatList();
    renderRiwayatOptions();
    if (recitersData.length > 0) {
        // الرواية الرئيسية الافتراضية عند فتح نافذة القرآن الكريم: حفص عن عاصم
        const defaultRiwayaName = 'حفص عن عاصم';
        const defaultOwner = recitersData.find(r => findMoshafInReciter(r, defaultRiwayaName));
        if (defaultOwner) {
            currentReciter = defaultOwner;
            currentRiwayaFilter = defaultRiwayaName;
            document.getElementById('reciter-select').value = recitersData.indexOf(defaultOwner);
            document.getElementById('moshaf-select').value = defaultRiwayaName;
            selectRiwayaForReciter(currentReciter, defaultRiwayaName);
        } else {
            currentReciter = recitersData[0];
            document.getElementById('reciter-select').value = 0;
            selectRiwayaForReciter(currentReciter, currentReciter.moshaf && currentReciter.moshaf[0] ? currentReciter.moshaf[0].name : null);
        }
    }
}

// تسريع بدء التشغيل: لا نجلب قائمة القرّاء (طلب شبكي خارجي) إلا عند فتح صفحة
// "القرآن الكريم" فعليًا، بدل تحميلها فور فتح الموقع حتى لو كان المستخدم
// في صفحة أخرى؛ الخدمة نفسها لم تُحذف، فقط يتأخر جلبها لحين الحاجة الفعلية.
let recitersLoadStarted = false;
function ensureRecitersLoaded() {
    if (recitersLoadStarted) return;
    recitersLoadStarted = true;
    loadReciters();
}

// قائمة موحّدة بكل أسماء الروايات الموجودة لدى جميع القراء مجتمعين،
// بحيث تكون متاحة للاختيار بغض النظر عن القارئ المحدد حاليًا
let globalRiwayatNames = [];

function normalizeRiwayaName(name) {
    return (name || '').replace(/\s*-\s*(مرتل|المصحف المجود|المصحف المعلم)\s*-?\s*/g, '').trim();
}

function buildGlobalRiwayatList() {
    const set = new Set();
    recitersData.forEach(r => {
        (r.moshaf || []).forEach(m => {
            const n = normalizeRiwayaName(m.name) || 'حفص عن عاصم';
            set.add(n);
        });
    });
    globalRiwayatNames = Array.from(set).sort((a, b) => a.localeCompare('ar'));
}

function renderRiwayatOptions() {
    const select = document.getElementById('moshaf-select');
    select.innerHTML = '<option value="">-- اختر الرواية / القراءة --</option>';
    globalRiwayatNames.forEach((name) => {
        const opt = document.createElement('option');
        opt.value = name;
        opt.textContent = name;
        select.appendChild(opt);
    });
}

function findMoshafInReciter(reciter, riwayaName) {
    if (!reciter || !reciter.moshaf) return null;
    return reciter.moshaf.find(m => normalizeRiwayaName(m.name) === riwayaName)
        || reciter.moshaf.find(m => normalizeRiwayaName(m.name).includes(riwayaName) || riwayaName.includes(normalizeRiwayaName(m.name)))
        || null;
}

function showRiwayaNote(text) {
    const note = document.getElementById('riwaya-fallback-note');
    if (!text) { note.style.display = 'none'; note.textContent = ''; return; }
    note.textContent = text;
    note.style.display = 'block';
}

// يحاول تشغيل القارئ بالرواية المطلوبة، وإن لم تكن مسجّلة لديه
// يعرض تنبيهًا ويشغّل أقرب رواية متوفرة له بدلًا من قفل الاختيار
function selectRiwayaForReciter(reciter, preferredRiwayaName) {
    if (!reciter || !reciter.moshaf || reciter.moshaf.length === 0) return;
    const wanted = preferredRiwayaName || document.getElementById('moshaf-select').value;
    let match = wanted ? findMoshafInReciter(reciter, wanted) : null;
    const moshafSelect = document.getElementById('moshaf-select');
    if (match) {
        showRiwayaNote(null);
        moshafSelect.value = normalizeRiwayaName(match.name);
    } else {
        match = reciter.moshaf[0];
        const fallbackName = normalizeRiwayaName(match.name);
        if (wanted) {
            showRiwayaNote(`القارئ "${reciter.name}" ليس لديه تسجيل برواية "${wanted}"، تم تشغيل رواية "${fallbackName}" المتوفرة له بدلًا منها.`);
        } else {
            showRiwayaNote(null);
        }
        if (![...moshafSelect.options].some(o => o.value === fallbackName)) {
            globalRiwayatNames.push(fallbackName);
            globalRiwayatNames.sort((a, b) => a.localeCompare('ar'));
            renderRiwayatOptions();
        }
        moshafSelect.value = fallbackName;
    }
    currentMoshaf = match;
    renderSurahsGrid(currentReciter, currentMoshaf);
}

function renderRecitersOptions(list) {
    const select = document.getElementById('reciter-select');
    select.innerHTML = '<option value="">-- اختر القارئ --</option>';
    list.forEach((r) => {
        const originalIndex = recitersData.indexOf(r);
        const opt = document.createElement('option');
        opt.value = originalIndex;
        opt.textContent = r.name;
        select.appendChild(opt);
    });
}

document.getElementById('reciter-select').addEventListener('change', (e) => {
    const idx = e.target.value;
    if (idx === "") return;
    currentReciter = recitersData[idx];
    // اختيار قارئ لا يغيّر أبدًا الرواية المختارة حاليًا من القائمة (إن وُجدت):
    // بما أن قائمة القرّاء تكون بالفعل مُصفّاة حسب الرواية المختارة، فإن
    // القارئ المختار مضمون أن لديه تسجيلًا بهذه الرواية بالذات.
    if (currentRiwayaFilter) {
        const match = findMoshafInReciter(currentReciter, currentRiwayaFilter);
        if (match) {
            currentMoshaf = match;
            showRiwayaNote(null);
            document.getElementById('moshaf-select').value = currentRiwayaFilter;
            renderSurahsGrid(currentReciter, currentMoshaf);
            return;
        }
    }
    // لا توجد رواية مختارة حاليًا من القائمة: نعرض للقارئ أقرب رواية متاحة له
    selectRiwayaForReciter(currentReciter, null);
});

document.getElementById('moshaf-select').addEventListener('change', (e) => {
    const wantedRiwaya = e.target.value;
    currentRiwayaFilter = wantedRiwaya || null;
    if (wantedRiwaya === "") { showRiwayaNote(null); renderRecitersOptions(recitersData); return; }
    // عند اختيار رواية: يتم عرض أسماء القراء المسجّلة لديهم هذه الرواية فقط (بأسمائهم)
    const owners = recitersData.filter(r => findMoshafInReciter(r, wantedRiwaya));
    renderRecitersOptions(owners);
    if (owners.length > 0) {
        const keepCurrent = currentReciter && findMoshafInReciter(currentReciter, wantedRiwaya) ? currentReciter : owners[0];
        currentReciter = keepCurrent;
        const ownerIdx = recitersData.indexOf(currentReciter);
        document.getElementById('reciter-select').value = ownerIdx;
        showRiwayaNote(null);
        const match = findMoshafInReciter(currentReciter, wantedRiwaya);
        currentMoshaf = match;
        document.getElementById('moshaf-select').value = wantedRiwaya;
        renderSurahsGrid(currentReciter, currentMoshaf);
    } else {
        showRiwayaNote(`لا يوجد حاليًا أي قارئ مسجَّل بهذه الرواية "${wantedRiwaya}".`);
    }
});

document.getElementById('reciter-search-input').addEventListener('input', debounce((e) => {
    const val = e.target.value.toLowerCase().trim();
    // احترام الرواية المختارة حاليًا: البحث يتم ضمن القراء المسجّلين بهذه
    // الرواية فقط إن كانت هناك رواية محددة، حتى لا يعيد اختيار قارئ آخر
    // ليس لديه هذه الرواية الرواية الافتراضية (حفص عن عاصم) تلقائيًا
    const baseList = currentRiwayaFilter
        ? recitersData.filter(r => findMoshafInReciter(r, currentRiwayaFilter))
        : recitersData;
    const filtered = baseList.filter(r => r.name.toLowerCase().includes(val));
    renderRecitersOptions(filtered);
    if (filtered.length > 0) {
        const firstOriginalIdx = recitersData.indexOf(filtered[0]);
        document.getElementById('reciter-select').value = firstOriginalIdx;
        currentReciter = filtered[0];
        if (currentRiwayaFilter) {
            const match = findMoshafInReciter(currentReciter, currentRiwayaFilter);
            if (match) {
                currentMoshaf = match;
                showRiwayaNote(null);
                document.getElementById('moshaf-select').value = currentRiwayaFilter;
                renderSurahsGrid(currentReciter, currentMoshaf);
                return;
            }
        }
        selectRiwayaForReciter(currentReciter, null);
    }
}, 120));

// كاش لعناصر بطاقات السور مع نصّها بحروف صغيرة، بدل استعلام DOM (querySelectorAll)
// وإعادة قراءة textContent من جديد مع كل ضغطة حرف أثناء البحث
let _surahCardsCache = null;
function getSurahCardsCache() {
    if (!_surahCardsCache || !_surahCardsCache.length || !document.body.contains(_surahCardsCache[0].el)) {
        const cards = document.querySelectorAll('#surah-grid .surah-card');
        _surahCardsCache = Array.from(cards).map(el => ({ el, text: el.textContent.toLowerCase() }));
    }
    return _surahCardsCache;
}

document.getElementById('surah-search-input').addEventListener('input', debounce((e) => {
    const query = e.target.value.toLowerCase().trim();
    const cards = getSurahCardsCache();
    for (const { el, text } of cards) {
        el.style.display = text.includes(query) ? 'flex' : 'none';
    }
}, 120));

/* ============================================================
   إشعارات تقدّم التنزيل: تُستخدم عند تنزيل أي موعظة أو سورة من
   القرآن الكريم (تنزيل مباشر أو حفظ للاستماع بدون إنترنت). بدل
   عرض شريط تقدّم داخل صفحات الموقع، تُعرض نسبة التحميل وحجم
   الملف كإشعار حقيقي في شريط إشعارات الهاتف (أعلى الشاشة) عبر
   Service Worker المسجَّل أصلًا في الموقع لإشعارات التحديثات،
   ويُحدَّث نفس الإشعار (بنفس المعرّف/tag) مع تقدّم التحميل بدل
   فتح إشعار جديد في كل مرة.
============================================================ */
function formatBytes(bytes) {
    if (!isFinite(bytes) || bytes <= 0) return '';
    if (bytes < 1024) return `${bytes} بايت`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} كيلوبايت`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} ميجابايت`;
}

const DOWNLOAD_NOTIFICATION_TAG = 'quran-sunnah-download-progress';
const DOWNLOAD_CANCEL_ACTION = 'cancel-download';
let downloadNotifyPermissionAsked = false;

// يتتبّع عملية التنزيل الجارية حاليًا (واحدة في كل مرة، لأنها تشارك نفس
// معرّف الإشعار) حتى يمكن إلغاؤها من زر الإلغاء داخل الصفحة أو من زر
// الإلغاء في إشعار النظام على الهاتف.
let activeDownload = null; // { controller, id, filename }
let activeDownloadId = 0;

// يطلب إذن إشعارات الهاتف مرة واحدة فقط لكل جلسة (إن لم يكن قد تقرر
// مسبقًا)، حتى تظهر إشعارات التنزيل في شريط إشعارات الجهاز
async function ensureDownloadNotificationPermission() {
    if (!('Notification' in window)) return false;
    if (Notification.permission === 'granted') return true;
    if (Notification.permission === 'denied' || downloadNotifyPermissionAsked) return false;
    downloadNotifyPermissionAsked = true;
    try {
        const perm = await Notification.requestPermission();
        return perm === 'granted';
    } catch (e) {
        return false;
    }
}

// يعرض/يحدّث إشعار التنزيل الحقيقي في شريط إشعارات الهاتف عبر تسجيل
// الـ Service Worker الحالي للموقع (نفس الآلية المستخدمة أصلًا لإشعارات
// التحديثات في هذا الملف). يضيف زر "إلغاء" ضمن الإشعار نفسه أثناء
// التنزيل (withCancelAction)، حتى يمكن إيقاف التحميل مباشرة من شريط
// إشعارات الهاتف دون فتح الموقع.
async function showDownloadNotification(title, body, withCancelAction) {
    if (!('serviceWorker' in navigator) || !('Notification' in window) || Notification.permission !== 'granted') return;
    try {
        const reg = await navigator.serviceWorker.ready;
        if (!reg || !reg.showNotification) return;
        await reg.showNotification(title, {
            body,
            tag: DOWNLOAD_NOTIFICATION_TAG,
            renotify: false,
            silent: true,
            requireInteraction: false,
            icon: 'apple-touch-icon.png',
            actions: withCancelAction ? [{ action: DOWNLOAD_CANCEL_ACTION, title: 'إلغاء التنزيل' }] : []
        });
    } catch (e) { /* تجاهل بصمت إن تعذّر عرض إشعار النظام */ }
}

// يغلق إشعار التنزيل الحالي (يُستخدم عند الإلغاء أو الاكتمال أو الخطأ
// قبل عرض إشعار نهائي جديد بنفس المعرّف)
async function closeDownloadNotification() {
    if (!('serviceWorker' in navigator) || !('Notification' in window) || Notification.permission !== 'granted') return;
    try {
        const reg = await navigator.serviceWorker.ready;
        if (!reg || !reg.getNotifications) return;
        const notes = await reg.getNotifications({ tag: DOWNLOAD_NOTIFICATION_TAG });
        notes.forEach((n) => n.close());
    } catch (e) { /* تجاهل */ }
}

let lastDownloadNotifyAt = 0;
// يُحدّث نص إشعار التنزيل بالنسبة المئوية وحجم الملف، مع تحديد وتيرة
// التحديث (نصف ثانية كحد أقصى) حتى لا تُثقل التحديثات المتكررة جدًا
// على النظام أثناء تنزيل الملفات الكبيرة
function updateDownloadNotification(title, loaded, total) {
    const now = Date.now();
    const isDone = total > 0 && loaded >= total;
    if (now - lastDownloadNotifyAt < 500 && !isDone) return;
    lastDownloadNotifyAt = now;
    const percentText = total > 0
        ? `${Math.min(100, Math.round((loaded / total) * 100))}% — ${formatBytes(loaded)} / ${formatBytes(total)}`
        : `تم تنزيل ${formatBytes(loaded)}`;
    showDownloadNotification(`جاري تنزيل: ${title}`, percentText, true);
    updateDownloadProgressToast(title, total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : null, percentText);
}

// ========= شريط تقدّم التنزيل داخل الصفحة (بديل مضمون على كل الأجهزة) =========
function updateDownloadProgressToast(title, percent, detailText) {
    const toast = document.getElementById('download-progress-toast');
    const text = document.getElementById('download-progress-text');
    if (!toast || !text) return;
    text.textContent = percent !== null
        ? `جاري تنزيل "${title}" — ${percent}%`
        : `جاري تنزيل "${title}"${detailText ? ' — ' + detailText : ''}`;
    toast.classList.add('show');
}

function hideDownloadProgressToast() {
    const toast = document.getElementById('download-progress-toast');
    if (toast) toast.classList.remove('show');
}

// يُستدعى من زر الإلغاء داخل الصفحة، ومن رسالة زر إلغاء إشعار النظام
// (عبر postMessage من الـ Service Worker) على حدٍّ سواء.
function cancelActiveDownload() {
    if (activeDownload && activeDownload.controller) {
        try { activeDownload.controller.abort(); } catch (e) { /* تجاهل */ }
    }
}

// يستقبل رسالة من الـ Service Worker عند الضغط على زر "إلغاء التنزيل"
// داخل إشعار النظام على الهاتف (يتطلب أن يقوم sw.js بإعادة توجيه حدث
// notificationclick الخاص بهذا الإجراء كرسالة postMessage من هذا النوع
// إلى صفحات الموقع المفتوحة — راجع التعليق أسفل الملف لِـ sw.js).
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.addEventListener('message', (event) => {
        const data = event && event.data;
        if (data && data.type === DOWNLOAD_CANCEL_ACTION) {
            cancelActiveDownload();
        }
    });
}

// يجلب ملفًا صوتيًا مع تتبّع تقدّم التنزيل حيًا (نسبة مئوية + حجم الملف)
// عبر قراءة الاستجابة كتدفّق (Stream) بدل انتظارها دفعة واحدة، ويعرض
// التقدّم كإشعار على الهاتف وكشريط داخل الصفحة، مع إمكانية الإلغاء في
// أي لحظة عبر AbortController، ثم يُرجع Blob الملف الكامل بعد اكتمال
// القراءة. يُستخدم في التنزيل المباشر وفي الحفظ بدون إنترنت.
async function fetchWithProgress(url, title, controller) {
    await ensureDownloadNotificationPermission();
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) throw new Error('تعذر جلب الملف');
    if (!response.body || !response.body.getReader) {
        // متصفح لا يدعم قراءة الاستجابة كتدفّق: نرجع للطريقة المعتادة دون تحديث حي للنسبة
        const blob = await response.blob();
        updateDownloadNotification(title, blob.size, blob.size);
        return blob;
    }
    const totalStr = response.headers.get('Content-Length');
    const total = totalStr ? parseInt(totalStr, 10) : 0;
    const reader = response.body.getReader();
    const chunks = [];
    let loaded = 0;
    while (true) {
        if (controller.signal.aborted) {
            try { await reader.cancel(); } catch (e) { /* تجاهل */ }
            const abortErr = new Error('تم إلغاء التنزيل');
            abortErr.name = 'AbortError';
            throw abortErr;
        }
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        loaded += value.length;
        updateDownloadNotification(title, loaded, total);
    }
    return new Blob(chunks);
}

async function downloadAudioFile(url, filename) {
    // إلغاء أي تنزيل سابق ما زال جاريًا قبل بدء تنزيل جديد، لأن الإشعار
    // وشريط التقدّم يعرضان عملية واحدة فقط في كل مرة
    if (activeDownload && activeDownload.controller) {
        try { activeDownload.controller.abort(); } catch (e) { /* تجاهل */ }
    }
    const controller = new AbortController();
    const id = ++activeDownloadId;
    activeDownload = { controller, id, filename };

    try {
        const blob = await fetchWithProgress(url, filename, controller);
        if (activeDownload && activeDownload.id === id) activeDownload = null;
        hideDownloadProgressToast();
        const blobUrl = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = blobUrl;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(blobUrl);
        showDownloadNotification(`اكتمل التنزيل: ${filename}`, 'تم حفظ الملف على جهازك بنجاح', false);
    } catch (e) {
        if (activeDownload && activeDownload.id === id) activeDownload = null;
        hideDownloadProgressToast();
        if (e && e.name === 'AbortError') {
            showDownloadNotification(`تم إلغاء التنزيل: ${filename}`, 'تم إيقاف التحميل بناءً على طلبك', false);
            return; // لا نفتح رابط تنزيل احتياطي إذا كان الإلغاء مقصودًا من المستخدم
        }
        await closeDownloadNotification();
        showDownloadNotification(`تعذّر التنزيل: ${filename}`, 'تحقق من اتصالك بالإنترنت وحاول مجددًا', false);
        const a = document.createElement('a');
        a.href = url;
        a.target = '_blank';
        a.download = filename;
        document.body.appendChild(a);
        a.click();
    }
}

// يتتبّع سياق التشغيل الحالي (السور المتاحة على نفس الخادم + الفهرس)
// حتى تعمل أزرار "التالي/السابق" من شاشة القفل عبر Media Session API.
const playbackContext = { server: null, reciter: null, moshaf: null, index: -1 };

// خادم احتياطي موثوق (حفص عن عاصم) يُستخدم فقط إذا تعذّر تشغيل السورة
// من القارئ/الرواية المختارة، حتى تبقى كل سورة قابلة للتشغيل دائمًا
const DEFAULT_FALLBACK_SERVER = 'https://server8.mp3quran.net/afs/';

// يحاول تشغيل رابط صوتي واحد على عنصر التشغيل الفعلي، ويُخبر عبر Promise هل نجح البدء بالتشغيل أم لا
function tryPlayUrl(url, options) {
    const timeoutMs = (options && options.timeoutMs) || 20000;
    const isRetry = !!(options && options.isRetry);
    return new Promise((resolve) => {
        let settled = false;
        let timer = null;
        function cleanup() {
            if (settled) return;
            settled = true;
            if (timer) clearTimeout(timer);
            audio.removeEventListener('canplay', onCanPlay);
            audio.removeEventListener('error', onError);
        }
        function onCanPlay() { cleanup(); resolve(true); }
        function onError() {
            cleanup();
            // خطأ واحد قد يكون تعثّرًا مؤقتًا من الخادم؛ نعيد المحاولة مرة واحدة
            // فقط قبل اعتبار السورة فعليًا غير قابلة للتشغيل من هذا القارئ.
            if (!isRetry) {
                tryPlayUrl(url, { timeoutMs, isRetry: true }).then(resolve);
            } else {
                resolve(false);
            }
        }
        function onTimeout() {
            if (settled) return;
            // إن كان الملف أصبح جاهزًا فعليًا (أو بدأ التشغيل) رغم انتهاء المهلة،
            // فهذا نجاح حقيقي ولا داعي لاعتباره فشلاً والتحويل لقارئ آخر.
            if (audio.src === url && (audio.readyState >= 2 || !audio.paused)) {
                onCanPlay();
                return;
            }
            onError();
        }
        audio.addEventListener('canplay', onCanPlay, { once: true });
        audio.addEventListener('error', onError, { once: true });
        timer = setTimeout(onTimeout, timeoutMs);
        audio.src = url;
        audio.load();
        audio.play().catch(() => { /* سيُلتقط الخطأ الفعلي عبر حدث error أو المهلة إن استمر الفشل */ });
    });
}

// ========= تسريع بدء التشغيل =========
// (أ) ذاكرة مؤقتة: صيغة الترقيم الناجحة (001/01/1) لكل خادم قارئ+رواية، بحيث بعد
// أول تشغيل ناجح من خادم معيّن، لا يُعاد تجربة الصيغ الثلاث في كل مرة يبدّل فيها
// المستخدم السورة على نفس القارئ/الرواية — تجربة رابط واحد مباشرة أسرع بكثير.
const serverFormatCache = new Map();

// (ب) فحص رابط صوتي عبر عنصر Audio منفصل مؤقت (لا يُصدر صوتًا مسموعًا وله كتم صوت)
// بدل عنصر التشغيل الفعلي، حتى يمكن فحص عدة روابط بالتوازي دون التأثير على ما يُسمع،
// مع مهلة قصوى (ms) لتفادي التعليق الطويل إن كان الرابط معطّلاً أو الخادم متعثّرًا.
function probeUrl(url, timeoutMs = 9000) {
    return new Promise((resolve) => {
        const probe = new Audio();
        probe.preload = 'auto';
        probe.muted = true;
        let settled = false;
        function finish(ok) {
            if (settled) return;
            settled = true;
            clearTimeout(timer);
            probe.removeEventListener('canplay', onOk);
            probe.removeEventListener('error', onErr);
            probe.src = '';
            resolve(ok);
        }
        const onOk = () => finish(true);
        const onErr = () => finish(false);
        // قبل اعتبار الرابط فاشلاً عند انتهاء المهلة، نتحقق إن كان أصبح جاهزًا فعليًا
        // (readyState) رغم بطء وصول الحدث نفسه — فلا نحكم عليه بالفشل ظلمًا بسبب
        // تأخّر مؤقت من الخادم بينما الملف موجود وصالح للتشغيل بالفعل.
        const timer = setTimeout(() => {
            if (probe.readyState >= 2) { finish(true); return; }
            finish(false);
        }, timeoutMs);
        probe.addEventListener('canplay', onOk, { once: true });
        probe.addEventListener('error', onErr, { once: true });
        probe.src = url;
        probe.load();
    });
}

// (ج) يفحص عدّة روابط بالتوازي (لا بالتتابع) ويُرجع أول رابط نجح الفحص عليه فورًا
// دون انتظار البقية، أو null إن فشلت كل الروابط — هذا هو ما يجعل بدء التشغيل أسرع
function raceUrls(urls) {
    return new Promise((resolve) => {
        let remaining = urls.length;
        let resolved = false;
        urls.forEach((url) => {
            probeUrl(url).then((ok) => {
                if (resolved) return;
                if (ok) { resolved = true; resolve(url); return; }
                remaining -= 1;
                if (remaining === 0 && !resolved) resolve(null);
            });
        });
    });
}

// يبحث عن قارئ آخر يملك نفس الرواية المحددة حاليًا (نفس moshaf.name بعد التطبيع)
// ولديه هذه السورة مسجّلة فعليًا ضمن قائمة surah_list الخاصة به، ليُستخدم كبديل
// عند تعذّر تشغيل السورة من القارئ الحالي، بدل القفز مباشرة لرواية مختلفة تمامًا
// (حفص عن عاصم) كما كان يحدث سابقًا. هذا يحافظ على الرواية التي اختارها المستخدم.
function findAlternateReciterForSurah(riwayaName, surahNumberInt, excludeReciterId) {
    const normalizedWanted = normalizeRiwayaName(riwayaName) || riwayaName;
    for (const r of recitersData) {
        if (!r || !r.moshaf) continue;
        if (excludeReciterId != null && r.id === excludeReciterId) continue;
        for (const m of r.moshaf) {
            if (normalizeRiwayaName(m.name) !== normalizedWanted) continue;
            const available = parseSurahList(m.surah_list);
            if (available.has(surahNumberInt)) {
                const rawServer = m.server || '';
                const server = rawServer.endsWith('/') ? rawServer : rawServer + '/';
                return { reciter: r, moshaf: m, server };
            }
        }
    }
    return null;
}

async function playSurahAtIndex(server, index, reciter, moshaf) {
    if (index < 0 || index >= staticSurahNames.length) return;
    const name = staticSurahNames[index];
    const surahNumberInt = index + 1;
    const surahNum3 = surahNumberInt.toString().padStart(3, '0');
    const surahNum2 = surahNumberInt.toString().padStart(2, '0');
    const surahNum1 = surahNumberInt.toString();

    playbackContext.server = server;
    playbackContext.reciter = reciter;
    playbackContext.moshaf = moshaf;
    playbackContext.index = index;

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    updateNowPlaying(`سورة ${name}`, `${reciter.name} (${moshaf.name || ''})`);
    recordLastSurah(index, name, reciter.name);

    // إن كانت هذه السورة محفوظة محليًا للاستماع بدون إنترنت، نشغّلها مباشرة من
    // النسخة المحفوظة (Blob) دون أي اتصال بالشبكة، تمامًا كما تعمل المواعظ المحفوظة
    if (lastSurahBlobUrl) {
        URL.revokeObjectURL(lastSurahBlobUrl);
        lastSurahBlobUrl = null;
    }
    const offlineAudioUrl = `${server}${surahNum3}.mp3`;
    const offlineRecord = await getSurahOffline(offlineAudioUrl).catch(() => null);
    if (offlineRecord && offlineRecord.blob) {
        if (playbackContext.index !== index) return;
        const blobUrl = URL.createObjectURL(offlineRecord.blob);
        lastSurahBlobUrl = blobUrl;
        audio.src = blobUrl;
        audio.play().catch(err => console.log(err));
        showToast(`جاري تشغيل سورة ${name} (بدون إنترنت)`);
        return;
    }

    if (!navigator.onLine) {
        showToast(`لا يوجد اتصال بالإنترنت، ولم يتم حفظ سورة ${name} مسبقًا للاستماع بدون نت.`);
        return;
    }

    showToast(`جاري تحميل سورة ${name}...`);

    // إن كانت صيغة الترقيم الصحيحة لهذا الخادم معروفة من تشغيل سابق (نفس القارئ/الرواية)،
    // نجرّب رابطًا واحدًا مباشرة بدل تجربة الصيغ الثلاث من جديد، فيبدأ التشغيل فورًا
    // عند تبديل السور المتتالية لنفس القارئ
    const cachedLen = serverFormatCache.get(server);
    if (cachedLen) {
        if (playbackContext.index !== index) return;
        const cachedUrl = `${server}${surahNumberInt.toString().padStart(cachedLen, '0')}.mp3`;
        const ok = await tryPlayUrl(cachedUrl);
        if (ok) return;
        // نادرًا ما تفشل السورة بعينها مع صيغة صالحة لباقي السور؛ نتابع للفحص الكامل أدناه
    }

    // نفحص صيغ الترقيم الشائعة (001 ثم 01 ثم 1) بالتوازي عبر عناصر صوت مؤقتة صامتة
    // بدل تجربتها تباعًا على عنصر التشغيل نفسه، فيبدأ التشغيل بأسرع ما يمكن
    const candidateUrls = [
        { url: `${server}${surahNum3}.mp3`, len: 3 },
        { url: `${server}${surahNum2}.mp3`, len: 2 },
        { url: `${server}${surahNum1}.mp3`, len: 1 }
    ];
    if (playbackContext.index !== index) return;
    const winnerUrl = await raceUrls(candidateUrls.map(c => c.url));
    if (playbackContext.index !== index) return; // المستخدم بدّل السورة أثناء الفحص
    if (winnerUrl) {
        const matched = candidateUrls.find(c => c.url === winnerUrl);
        if (matched) serverFormatCache.set(server, matched.len);
        const ok = await tryPlayUrl(winnerUrl);
        if (ok) return;
    }

    // إن تعذّر تشغيل السورة من هذا القارئ/الرواية تمامًا، نبحث أولًا عن قارئ آخر
    // يملك نفس الرواية المحددة حاليًا ولديه هذه السورة مسجّلة فعليًا لديه، حتى
    // تبقى الرواية التي اختارها المستخدم محفوظة قدر الإمكان بدل القفز لرواية مختلفة
    if (playbackContext.index !== index) return;
    const riwayaName = normalizeRiwayaName(moshaf.name) || 'حفص عن عاصم';
    const alternate = findAlternateReciterForSurah(riwayaName, surahNumberInt, reciter.id);
    if (alternate) {
        const altUrl = `${alternate.server}${surahNum3}.mp3`;
        const altOk = await tryPlayUrl(altUrl);
        if (playbackContext.index !== index) return;
        if (altOk) {
            playbackContext.server = alternate.server;
            playbackContext.reciter = alternate.reciter;
            playbackContext.moshaf = alternate.moshaf;
            updateNowPlaying(`سورة ${name}`, `${alternate.reciter.name} (${alternate.moshaf.name || ''})`);
            showToast(`تعذّر تشغيل سورة ${name} من "${reciter.name}"، تم تشغيلها من "${alternate.reciter.name}" بنفس رواية "${riwayaName}".`);
            return;
        }
    }

    // لم يُعثر على قارئ آخر بنفس الرواية يملك هذه السورة (أو تعذّر تشغيله أيضًا)،
    // فنلجأ كحل أخير لخادم احتياطي موثوق حتى لا تبقى السورة معطّلة، مع توضيح
    // للمستخدم أن الرواية المشغَّلة ستكون مختلفة عن الرواية التي اختارها
    if (playbackContext.index !== index) return;
    const fallbackUrl = `${DEFAULT_FALLBACK_SERVER}${surahNum3}.mp3`;
    const fallbackOk = await tryPlayUrl(fallbackUrl);
    if (fallbackOk) {
        playbackContext.server = DEFAULT_FALLBACK_SERVER;
        showToast(`تعذّر تشغيل سورة ${name} من "${reciter.name}" ولم يُعثر على قارئ آخر بنفس الرواية، فتم تشغيلها برواية مختلفة بدلًا منها.`);
    } else {
        showToast(`تعذّر تشغيل سورة ${name} حاليًا، تحقق من اتصال الإنترنت.`);
    }
}

// يحوّل نص "surah_list" القادم من واجهة mp3quran (مثل "1-9,13,85-90") إلى مجموعة
// بأرقام السور المسجَّلة فعليًا لدى هذا القارئ بهذه الرواية. نص فارغ أو غير موجود
// يُعامَل كتغطية كاملة (١١٤ سورة) حفاظًا على التوافق مع بيانات لا تحدد هذا الحقل.
function parseSurahList(listStr) {
    const full = new Set(Array.from({ length: 114 }, (_, i) => i + 1));
    if (!listStr || typeof listStr !== 'string') return full;
    const trimmed = listStr.trim();
    if (trimmed === '' || trimmed === '1-114') return full;
    const set = new Set();
    trimmed.split(',').forEach((part) => {
        const piece = part.trim();
        if (!piece) return;
        if (piece.includes('-')) {
            const [a, b] = piece.split('-').map(n => parseInt(n, 10));
            if (!isNaN(a) && !isNaN(b)) {
                for (let n = Math.min(a, b); n <= Math.max(a, b); n++) set.add(n);
            }
        } else {
            const n = parseInt(piece, 10);
            if (!isNaN(n)) set.add(n);
        }
    });
    return set.size > 0 ? set : full;
}

/* ============================================================
   تخزين سور القرآن الكريم محليًا عبر IndexedDB لتعمل بدون إنترنت
   (نفس أسلوب تخزين المواعظ أعلاه تمامًا، بقاعدة بيانات مستقلة
   خاصة بالسور حتى لا تختلط بمكتبة المواعظ)
============================================================ */
const OFFLINE_QURAN_DB = 'quran-sunnah-offline-surahs';
const OFFLINE_QURAN_STORE = 'surahs';

function openOfflineQuranDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(OFFLINE_QURAN_DB, 1);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(OFFLINE_QURAN_STORE)) {
                db.createObjectStore(OFFLINE_QURAN_STORE, { keyPath: 'url' });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function saveSurahOffline(url, blob, meta) {
    const db = await openOfflineQuranDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(OFFLINE_QURAN_STORE, 'readwrite');
        tx.objectStore(OFFLINE_QURAN_STORE).put({ url, blob, name: meta.name, reciter: meta.reciter, savedAt: Date.now() });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

async function getSurahOffline(url) {
    const db = await openOfflineQuranDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(OFFLINE_QURAN_STORE, 'readonly');
        const req = tx.objectStore(OFFLINE_QURAN_STORE).get(url);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
}

async function deleteSurahOffline(url) {
    const db = await openOfflineQuranDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(OFFLINE_QURAN_STORE, 'readwrite');
        tx.objectStore(OFFLINE_QURAN_STORE).delete(url);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

async function listOfflineSurahUrls() {
    try {
        const db = await openOfflineQuranDB();
        return await new Promise((resolve, reject) => {
            const tx = db.transaction(OFFLINE_QURAN_STORE, 'readonly');
            const req = tx.objectStore(OFFLINE_QURAN_STORE).getAllKeys();
            req.onsuccess = () => resolve(new Set(req.result));
            req.onerror = () => reject(req.error);
        });
    } catch (e) {
        return new Set();
    }
}

let lastSurahBlobUrl = null;

// يحفظ سورة معيّنة محليًا للاستماع بدون إنترنت، أو يحذف نسختها المحفوظة إن كانت
// محفوظة بالفعل (نفس منطق toggleSoundOffline الخاص بالمواعظ أعلاه بالضبط)
async function toggleSurahOffline(url, name, reciterName, btn) {
    const existing = await getSurahOffline(url).catch(() => null);
    if (existing) {
        await deleteSurahOffline(url);
        btn.classList.remove('is-saved');
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i>';
        btn.title = 'حفظ للاستماع بدون نت';
        showToast(`تم حذف نسخة سورة ${name} المحفوظة بدون نت`);
        return;
    }

    // إن كان الزر في حالة "جارٍ الحفظ" بالفعل، فالضغط عليه من جديد يُلغي عملية الحفظ الجارية
    if (btn.classList.contains('is-saving')) {
        if (btn._downloadController) { try { btn._downloadController.abort(); } catch (e) { /* تجاهل */ } }
        return;
    }

    btn.classList.add('is-saving');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    btn.title = 'إلغاء الحفظ';
    showToast(`جاري حفظ سورة ${name} للاستماع بدون إنترنت...`);
    if (activeDownload && activeDownload.controller) {
        try { activeDownload.controller.abort(); } catch (e) { /* تجاهل */ }
    }
    const controller = new AbortController();
    const id = ++activeDownloadId;
    btn._downloadController = controller;
    activeDownload = { controller, id, filename: `سورة ${name}` };
    try {
        const blob = await fetchWithProgress(url, `سورة ${name}`, controller);
        if (activeDownload && activeDownload.id === id) activeDownload = null;
        hideDownloadProgressToast();
        await saveSurahOffline(url, blob, { name, reciter: reciterName });
        btn.classList.remove('is-saving');
        btn.classList.add('is-saved');
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.title = 'محفوظ - اضغط للحذف';
        showToast(`تم حفظ سورة ${name}، يمكنك الاستماع إليها الآن بدون إنترنت`);
    } catch (e) {
        if (activeDownload && activeDownload.id === id) activeDownload = null;
        hideDownloadProgressToast();
        btn.classList.remove('is-saving');
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i>';
        btn.title = 'حفظ للاستماع بدون نت';
        if (e && e.name === 'AbortError') {
            showToast(`تم إلغاء حفظ سورة ${name}`);
        } else {
            showToast('تعذر الحفظ، تحقق من اتصالك بالإنترنت وحاول مجددًا');
        }
    } finally {
        btn._downloadController = null;
    }
}

// ذاكرة مؤقتة بروابط السور المحفوظة بدون إنترنت، تُحمَّل مبكرًا حتى تظهر شارة
// "متاح بدون إنترنت" على البطاقات الصحيحة من أول عرض للشبكة (نفس نمط soundsOfflineUrlsCache)
let surahsOfflineUrlsCache = new Set();
listOfflineSurahUrls().then((set) => {
    surahsOfflineUrlsCache = set;
    if (currentReciter && currentMoshaf) renderSurahsGrid(currentReciter, currentMoshaf);
});

function renderSurahsGrid(reciter, moshaf) {
    if (!reciter || !moshaf) return;
    const grid = document.getElementById('surah-grid');
    grid.innerHTML = '';
    _surahCardsCache = null; // إبطال كاش بطاقات السور لأن الشبكة أُعيد بناؤها بالكامل

    const rawServer = moshaf.server || '';
    const server = rawServer.endsWith('/') ? rawServer : rawServer + '/';
    const availableSurahs = parseSurahList(moshaf.surah_list);

    const offlineUrls = surahsOfflineUrlsCache || new Set();

    staticSurahNames.forEach((name, i) => {
        const surahNumberInt = i + 1;
        const surahNum3 = surahNumberInt.toString().padStart(3, '0');
        const audioUrl = `${server}${surahNum3}.mp3`;
        const isAvailable = availableSurahs.has(surahNumberInt);
        const isSaved = offlineUrls.has(audioUrl);
        const card = document.createElement('div');
        card.className = isAvailable ? 'surah-card glass-panel' : 'surah-card glass-panel surah-unavailable';
        if (!isAvailable) {
            card.title = `سورة ${name} غير مسجّلة لدى "${reciter.name}" بهذه الرواية، ستُشغَّل تلقائيًا من قارئ آخر بنفس الرواية عند الضغط عليها إن أمكن.`;
        }
        card.innerHTML = `
            <div>
                <strong>${surahNumberInt}. سورة ${name}</strong>
                <div class="offline-badge" style="${isSaved ? '' : 'display:none;'}"><i class="fa-solid fa-check-circle"></i> متاح بدون إنترنت</div>
            </div>
            <div class="surah-actions">
                ${isAvailable ? '' : '<span class="surah-unavailable-badge">غير متوفرة بهذه الرواية</span>'}
                <button class="fav-star-btn surah-fav-btn ${isFavorited('surah', 'surah-' + i) ? 'active' : ''}" title="أضف إلى المفضلة">
                    <i class="fa-solid fa-star"></i>
                </button>
                <button class="surah-download-btn" title="تحميل مباشر للسورة">
                    <i class="fa-solid fa-download"></i>
                </button>
                <button class="offline-save-btn ${isSaved ? 'is-saved' : ''}" title="${isSaved ? 'محفوظ - اضغط للحذف' : 'حفظ للاستماع بدون نت'}">
                    <i class="fa-solid ${isSaved ? 'fa-check' : 'fa-cloud-arrow-down'}"></i>
                </button>
                <i class="fa-solid fa-circle-play" style="color:var(--primary); font-size:1.4rem;"></i>
            </div>
        `;

        card.querySelector('.surah-fav-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            toggleFavorite('surah', 'surah-' + i, `سورة ${name}`, reciter.name);
            e.currentTarget.classList.toggle('active', isFavorited('surah', 'surah-' + i));
        });

        card.querySelector('.surah-download-btn').addEventListener('click', (e) => {
            e.stopPropagation();
            const fileName = `سورة_${name}_${reciter.name}.mp3`;
            downloadAudioFile(audioUrl, fileName);
        });

        const offlineBtn = card.querySelector('.offline-save-btn');
        const offlineBadge = card.querySelector('.offline-badge');
        offlineBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            await toggleSurahOffline(audioUrl, name, reciter.name, offlineBtn);
            offlineBadge.style.display = offlineBtn.classList.contains('is-saved') ? 'flex' : 'none';
        });

        card.addEventListener('click', () => {
            playSurahAtIndex(server, i, reciter, moshaf);
        });

        grid.appendChild(card);
    });
}

function initTafseerSurahs() {
    const sel = document.getElementById('tafseer-surah-select');
    sel.innerHTML = '';
    staticSurahNames.forEach((n, idx) => {
        const opt = document.createElement('option');
        opt.value = idx + 1;
        opt.textContent = `${idx + 1}. سورة ${n}`;
        sel.appendChild(opt);
    });
}
initTafseerSurahs();

document.getElementById('fetch-tafseer-btn').addEventListener('click', async () => {
    const surah = document.getElementById('tafseer-surah-select').value;
    const ayah = document.getElementById('tafseer-ayah-input').value;
    const box = document.getElementById('tafseer-content-box');
    box.textContent = "جاري جلب التفسير الميسر...";

    try {
        const res = await fetch(`https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ar.muyassar`);
        const data = await res.json();
        if (data.code === 200) {
            box.innerHTML = `<strong>الآية (${escapeHtml(ayah)}) - سورة ${escapeHtml(staticSurahNames[surah-1])}:</strong>\n"${escapeHtml(data.data.text)}"\n\n<strong>التفسير الميسر:</strong>\n${escapeHtml(data.data.text)}`;
        } else {
            box.textContent = "تعذر جلب التفسير، يرجى التأكد من أن رقم الآية صحيح لهذه السورة.";
        }
    } catch (e) {
        box.textContent = "حدث خطأ أثناء الاتصال بالخادم. تحقق من الاتصال بالإنترنت.";
    }
});

async function loadRadios() {
    const grid = document.getElementById('radio-grid');
    let radios = [];
    try {
        const res = await fetch('https://mp3quran.net/api/v3/radios?language=ar');
        const data = await res.json();
        radios = data.radios;
    } catch(e) {
        radios = [
            { name: "إذاعة القرآن الكريم من القاهرة", url: "https://stream.radiojar.com/8swywhatfs8uv" },
            { name: "إذاعة تكبيرات العيد", url: "https://backup.qurango.net/radio/takbeer" }
        ];
    }

    grid.innerHTML = '';
    radios.slice(0, 12).forEach(r => {
        const card = document.createElement('div');
        card.className = 'radio-card glass-panel';
        card.innerHTML = `<div><strong>${escapeHtml(r.name)}</strong></div><button class="btn-primary" style="padding: 8px 15px;"><i class="fa-solid fa-play"></i> استماع</button>`;

        card.querySelector('button').addEventListener('click', () => {
            playbackContext.index = -1; // البث المباشر ليس له سورة سابقة/تالية
            audio.src = r.url;
            audio.play();
            playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
            updateNowPlaying(r.name, "بث مباشر");
            showToast(`جاري تشغيل ${r.name}`);
        });
        grid.appendChild(card);
    });
}

// تسريع بدء التشغيل: نؤجل جلب قائمة الإذاعات (طلب شبكي خارجي) إلى حين فتح
// صفحة "الإذاعات" فعليًا بدل تحميلها فور فتح الموقع؛ الخدمة تبقى كما هي
// تمامًا، فقط يتأخر تنفيذها لحين الحاجة الفعلية.
let radiosLoadStarted = false;
function ensureRadiosLoaded() {
    if (radiosLoadStarted) return;
    radiosLoadStarted = true;
    loadRadios();
}

/* ============================================================
   تخزين "الصوتيات/المواعظ" محليًا عبر IndexedDB لتعمل بدون إنترنت
   (لا نستخدم Cache API/Service Worker هنا لأن ملفات mp3 كبيرة
   ولا تتعامل بشكل صحيح مع طلبات Range، فنخزّنها كـ Blob كامل
   داخل قاعدة بيانات المتصفح بعد أن يطلب المستخدم حفظها صراحةً)
============================================================ */
const OFFLINE_SOUNDS_DB = 'quran-sunnah-offline-sounds';
const OFFLINE_SOUNDS_STORE = 'sounds';

function openOfflineSoundsDB() {
    return new Promise((resolve, reject) => {
        const req = indexedDB.open(OFFLINE_SOUNDS_DB, 1);
        req.onupgradeneeded = () => {
            const db = req.result;
            if (!db.objectStoreNames.contains(OFFLINE_SOUNDS_STORE)) {
                db.createObjectStore(OFFLINE_SOUNDS_STORE, { keyPath: 'url' });
            }
        };
        req.onsuccess = () => resolve(req.result);
        req.onerror = () => reject(req.error);
    });
}

async function saveSoundOffline(url, blob, meta) {
    const db = await openOfflineSoundsDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(OFFLINE_SOUNDS_STORE, 'readwrite');
        tx.objectStore(OFFLINE_SOUNDS_STORE).put({ url, blob, title: meta.title, sheikh: meta.sheikh, savedAt: Date.now() });
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

async function getSoundOffline(url) {
    const db = await openOfflineSoundsDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(OFFLINE_SOUNDS_STORE, 'readonly');
        const req = tx.objectStore(OFFLINE_SOUNDS_STORE).get(url);
        req.onsuccess = () => resolve(req.result || null);
        req.onerror = () => reject(req.error);
    });
}

async function deleteSoundOffline(url) {
    const db = await openOfflineSoundsDB();
    return new Promise((resolve, reject) => {
        const tx = db.transaction(OFFLINE_SOUNDS_STORE, 'readwrite');
        tx.objectStore(OFFLINE_SOUNDS_STORE).delete(url);
        tx.oncomplete = () => resolve(true);
        tx.onerror = () => reject(tx.error);
    });
}

async function listOfflineSoundUrls() {
    try {
        const db = await openOfflineSoundsDB();
        return await new Promise((resolve, reject) => {
            const tx = db.transaction(OFFLINE_SOUNDS_STORE, 'readonly');
            const req = tx.objectStore(OFFLINE_SOUNDS_STORE).getAllKeys();
            req.onsuccess = () => resolve(new Set(req.result));
            req.onerror = () => reject(req.error);
        });
    } catch (e) {
        return new Set();
    }
}

let lastSoundBlobUrl = null;

// نسخة محسّنة ومخصّصة لتشغيل روابط المواعظ فقط (لا تؤثر على تشغيل القرآن):
// - تستمع لأحداث canplay و loadeddata و playing معًا، فتبدأ التشغيل بمجرد توفر
//   أول جزء قابل للتشغيل فعليًا بدل انتظار تخزين مؤقت أطول، فيبدأ الصوت فورًا
//   بمجرد أن يصبح جاهزًا دون أي تأخير إضافي من الكود نفسه.
// - تضع مهلة أطول وأكثر واقعية (35 ثانية) لأن أغلب "فشل" المواعظ سابقًا لم يكن
//   تعطّلًا فعليًا في الرابط، بل بطئًا مؤقتًا في تجهيز الملف من الخادم (يحدث كثيرًا
//   مع أرشيف archive.org عند أول طلب لملف)، وكانت المهلة القصيرة (12 ثانية) تقطع
//   التحميل الجاري وتُعيد ضبطه من الصفر بدل إعطائه فرصة لإكمال ما بدأه فعلاً،
//   وهذا بالتحديد ما كان يجعل معظم المواعظ تبدو "لا تعمل" رغم أنها كانت ستعمل
//   لو أُتيح لها وقت كافٍ لإكمال التحميل الذي بدأ بالفعل.
// - عند بلوغ المهلة نتحقق أولاً إن كان الملف قد أصبح جاهزًا فعليًا (readyState)
//   قبل اعتباره فاشلاً، فلا نقطع تحميلاً كان على وشك النجاح.
// - لا تُعاد المحاولة (بإعادة ضبط المصدر من الصفر) إلا عند فشل حقيقي فعلي
//   (حدث error أو استمرار التعثر التام بعد انتهاء المهلة الطويلة).
function trySoundUrl(url, options) {
    const timeoutMs = (options && options.timeoutMs) || 35000;
    const isRetry = !!(options && options.isRetry);
    return new Promise((resolve) => {
        let settled = false;
        let timer = null;

        function cleanup() {
            if (settled) return;
            settled = true;
            if (timer) clearTimeout(timer);
            audio.removeEventListener('canplay', onReady);
            audio.removeEventListener('loadeddata', onReady);
            audio.removeEventListener('playing', onReady);
            audio.removeEventListener('error', onError);
        }

        function onReady() { cleanup(); resolve(true); }

        function onError() {
            cleanup();
            if (!isRetry) {
                trySoundUrl(url, { timeoutMs: timeoutMs, isRetry: true }).then(resolve);
            } else {
                resolve(false);
            }
        }

        function onTimeout() {
            if (settled) return;
            // إن كان الملف أصبح جاهزًا فعليًا (أو بدأ التشغيل) رغم انتهاء المهلة،
            // فهذا نجاح حقيقي ولا داعي لاعتباره فشلاً وإعادة ضبط التحميل من الصفر.
            if (audio.src === url && (audio.readyState >= 2 || !audio.paused)) {
                onReady();
                return;
            }
            onError();
        }

        audio.addEventListener('canplay', onReady, { once: true });
        audio.addEventListener('loadeddata', onReady, { once: true });
        audio.addEventListener('playing', onReady, { once: true });
        audio.addEventListener('error', onError, { once: true });

        timer = setTimeout(onTimeout, timeoutMs);

        audio.src = url;
        audio.load();
        audio.play().catch(() => { /* سيُلتقط الخطأ الفعلي عبر حدث error أو المهلة إن استمر الفشل */ });
    });
}

// يشغّل مقطعًا صوتيًا: من النسخة المحفوظة محليًا إن وُجدت، وإلا من الشبكة مباشرة
async function playSoundSmart(s) {
    if (lastSoundBlobUrl) {
        URL.revokeObjectURL(lastSoundBlobUrl);
        lastSoundBlobUrl = null;
    }
    playbackContext.index = -1; // مقطع مستقل بدون تالي/سابق

    const offlineRecord = await getSoundOffline(s.url).catch(() => null);
    if (offlineRecord && offlineRecord.blob) {
        const blobUrl = URL.createObjectURL(offlineRecord.blob);
        lastSoundBlobUrl = blobUrl;
        audio.src = blobUrl;
        audio.play().catch(err => console.log(err));
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        updateNowPlaying(s.title, s.sheikh);
        showToast(`جاري تشغيل ${s.title} (بدون إنترنت)`);
        return;
    }

    if (!navigator.onLine) {
        showToast('لا يوجد اتصال بالإنترنت، ولم يتم حفظ هذا المقطع مسبقًا للاستماع بدون نت.');
        return;
    }

    playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    updateNowPlaying(s.title, s.sheikh);
    showToast(`جاري تحميل ${s.title}...`);
    const ok = await trySoundUrl(s.url);
    if (ok) {
        showToast(`جاري تشغيل ${s.title}`);
    } else {
        showToast(`تعذر تشغيل "${s.title}" حاليًا، تحقق من اتصال الإنترنت.`);
    }
}

async function toggleSoundOffline(s, btn) {
    const existing = await getSoundOffline(s.url).catch(() => null);
    if (existing) {
        await deleteSoundOffline(s.url);
        btn.classList.remove('is-saved');
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i>';
        btn.title = 'حفظ للاستماع بدون نت';
        showToast('تم حذف النسخة المحفوظة بدون نت');
        return;
    }

    // إن كان الزر في حالة "جارٍ الحفظ" بالفعل، فالضغط عليه من جديد يُلغي عملية الحفظ الجارية
    if (btn.classList.contains('is-saving')) {
        if (btn._downloadController) { try { btn._downloadController.abort(); } catch (e) { /* تجاهل */ } }
        return;
    }

    btn.classList.add('is-saving');
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i>';
    btn.title = 'إلغاء الحفظ';
    showToast('جاري الحفظ للاستماع بدون إنترنت...');
    if (activeDownload && activeDownload.controller) {
        try { activeDownload.controller.abort(); } catch (e) { /* تجاهل */ }
    }
    const controller = new AbortController();
    const id = ++activeDownloadId;
    btn._downloadController = controller;
    activeDownload = { controller, id, filename: s.title };
    try {
        const blob = await fetchWithProgress(s.url, s.title, controller);
        if (activeDownload && activeDownload.id === id) activeDownload = null;
        hideDownloadProgressToast();
        await saveSoundOffline(s.url, blob, { title: s.title, sheikh: s.sheikh });
        btn.classList.remove('is-saving');
        btn.classList.add('is-saved');
        btn.innerHTML = '<i class="fa-solid fa-check"></i>';
        btn.title = 'محفوظ - اضغط للحذف';
        showToast('تم الحفظ، يمكنك الآن الاستماع إليه بدون إنترنت');
    } catch (e) {
        if (activeDownload && activeDownload.id === id) activeDownload = null;
        hideDownloadProgressToast();
        btn.classList.remove('is-saving');
        btn.innerHTML = '<i class="fa-solid fa-cloud-arrow-down"></i>';
        btn.title = 'حفظ للاستماع بدون نت';
        if (e && e.name === 'AbortError') {
            showToast('تم إلغاء عملية الحفظ');
        } else {
            showToast('تعذر الحفظ، تحقق من اتصالك بالإنترنت وحاول مجددًا');
        }
    } finally {
        btn._downloadController = null;
    }
}

