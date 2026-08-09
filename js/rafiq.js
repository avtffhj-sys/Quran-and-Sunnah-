/* ============================================================
   الرفيق الروحي التكيفي (Adaptive Spiritual Journey & Habits Tracker)
============================================================ */
const rafiqHabitsDefs = [
    { id: 'azkar-sabah', name: 'أذكار الصباح', icon: 'fa-sun', azkarCategory: 'sabah' },
    { id: 'azkar-masa', name: 'أذكار المساء', icon: 'fa-cloud-moon', azkarCategory: 'masa' },
    { id: 'quran-wird', name: 'ورد القرآن اليومي', icon: 'fa-book-quran' },
    { id: 'sadaqah', name: 'صدقة اليوم', icon: 'fa-hand-holding-heart' },
    { id: 'silat-rahim', name: 'صلة الرحم', icon: 'fa-people-arrows' },
    { id: 'qiyam-layl', name: 'قيام الليل', icon: 'fa-moon' },
    { id: 'azkar-sleep', name: 'أذكار النوم', icon: 'fa-bed', azkarCategory: 'sleep' },
    { id: 'istighfar', name: '100 استغفار', icon: 'fa-hands-praying', azkarCategory: 'praise' }
];

function rafiqTodayKey() {
    const d = new Date();
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

function getRafiqStore() {
    return JSON.parse(localStorage.getItem('rafiqHabitLog') || '{}');
}

function saveRafiqStore(store) {
    localStorage.setItem('rafiqHabitLog', JSON.stringify(store));
}

function toggleRafiqHabit(habitId) {
    const store = getRafiqStore();
    const key = rafiqTodayKey();
    if (!store[key]) store[key] = [];
    const idx = store[key].indexOf(habitId);
    if (idx > -1) store[key].splice(idx, 1); else store[key].push(habitId);
    saveRafiqStore(store);
    renderRafiqHabits();
    renderRafiqStats();
}

// الضغط على أي بطاقة أذكار في الرفيق الروحي ينزل مباشرة إلى قسم الأذكار بالتصنيف المناسب
function goToAzkarFromRafiq(habitId, category) {
    const store = getRafiqStore();
    const key = rafiqTodayKey();
    if (!store[key]) store[key] = [];
    if (!store[key].includes(habitId)) store[key].push(habitId);
    saveRafiqStore(store);
    switchPage('azkar', null);
    setTimeout(() => switchAzkarCategory(category, null), 60);
}

function renderRafiqHabits() {
    const grid = document.getElementById('rafiq-habits-grid');
    if (!grid) return;
    const store = getRafiqStore();
    const todayDone = store[rafiqTodayKey()] || [];
    grid.innerHTML = rafiqHabitsDefs.map(h => {
        const done = todayDone.includes(h.id);
        let streak = 0;
        let d = new Date();
        if (!done) d.setDate(d.getDate() - 1);
        while (true) {
            const k = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
            if ((store[k] || []).includes(h.id)) { streak++; d.setDate(d.getDate() - 1); } else break;
        }
        const cardClick = h.azkarCategory ? `goToAzkarFromRafiq('${h.id}','${h.azkarCategory}')` : `toggleRafiqHabit('${h.id}')`;
        const cardTitle = h.azkarCategory ? 'اضغط للانتقال مباشرة إلى هذا الذكر' : 'اضغط لتسجيل الإنجاز';
        return `<div class="rafiq-habit-card ${done ? 'done' : ''}" onclick="${cardClick}" title="${cardTitle}">
            <div class="rafiq-habit-check" onclick="event.stopPropagation(); toggleRafiqHabit('${h.id}')" title="تحديد كمنجَز"><i class="fa-solid fa-check"></i></div>
            <div>
                <div class="rafiq-habit-name"><i class="fa-solid ${h.icon}" style="color:var(--primary); margin-left:6px;"></i>${h.name}${h.azkarCategory ? ' <i class="fa-solid fa-arrow-left" style="font-size:0.68rem; color:var(--text-muted); margin-right:6px;"></i>' : ''}</div>
                <div class="rafiq-habit-streak">${streak > 0 ? streak + ' يوم متتالي 🔥' : 'ابدأ اليوم'}</div>
            </div>
        </div>`;
    }).join('');
}

function renderRafiqStats() {
    const store = getRafiqStore();
    const todayDone = (store[rafiqTodayKey()] || []).length;
    document.getElementById('rafiq-stat-today').textContent = `${todayDone}/${rafiqHabitsDefs.length}`;
    const total = Object.values(store).reduce((sum, arr) => sum + arr.length, 0);
    document.getElementById('rafiq-stat-total').textContent = total;
    let streakDays = 0;
    let d = new Date();
    while (true) {
        const k = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
        if ((store[k] || []).length > 0) { streakDays++; d.setDate(d.getDate() - 1); } else break;
    }
    document.getElementById('rafiq-stat-streak').textContent = streakDays;
}

function renderRafiqAdaptiveSuggestion() {
    const hour = new Date().getHours();
    let title, text, icon;
    if (hour >= 3 && hour < 6) {
        title = 'وقت السحر مبارك'; icon = 'fa-star';
        text = 'هذا وقت استجابة الدعاء، جرّب قيام الليل والاستغفار قبل آذان الفجر.';
    } else if (hour >= 6 && hour < 11) {
        title = 'ابدأ يومك بذكر الله'; icon = 'fa-sun';
        text = 'وقت مناسب لأذكار الصباح وورد قصير من القرآن قبل انشغالك بالعمل.';
    } else if (hour >= 11 && hour < 16) {
        title = 'استراحة قصيرة للروح'; icon = 'fa-hand-holding-heart';
        text = 'اغتنم لحظة من يومك للصدقة أو التواصل مع أحد أرحامك ولو برسالة بسيطة.';
    } else if (hour >= 16 && hour < 19) {
        title = 'اقترب وقت المساء'; icon = 'fa-cloud-moon';
        text = 'حافظ على أذكار المساء قبل غروب الشمس لحصنك من كل مكروه.';
    } else if (hour >= 22 || hour < 3) {
        title = 'وضع قيام الليل مقترح لك'; icon = 'fa-moon';
        text = 'لاحظنا أنك غالبًا نشيط في هذا الوقت، هل تحب تفعيل تذكير لطيف بأذكار النوم وركعات قيام الليل؟';
    } else {
        title = 'جرعتك الروحية اليوم'; icon = 'fa-wand-magic-sparkles';
        text = 'تابع عباداتك اليومية بانتظام، فالعمل القليل الدائم خير من الكثير المنقطع.';
    }
    document.getElementById('rafiq-suggestion-title').textContent = title;
    document.getElementById('rafiq-suggestion-text').textContent = text;
    document.querySelector('#rafiq-suggestion-card i.rf-icon').className = `fa-solid ${icon} rf-icon`;
}

/* --- الرقية الذكية ومتابعة الحالة النفسية الإسلامية --- */
const moodDefs = [
    { id: 'anxious', name: 'قلق', icon: 'fa-cloud-showers-heavy' },
    { id: 'sad', name: 'حزن', icon: 'fa-face-sad-tear' },
    { id: 'distressed', name: 'ضيق', icon: 'fa-heart-crack' },
    { id: 'grateful', name: 'شكر', icon: 'fa-hands-praying' },
    { id: 'happy', name: 'فرح', icon: 'fa-face-smile' },
    { id: 'fearful', name: 'خوف', icon: 'fa-triangle-exclamation' }
];

const moodContent = {
    anxious: {
        note: 'القلق يهدأ بذكر الله والتوكل عليه، فقلوبنا لا تطمئن إلا بذكره سبحانه.',
        duas: [
            { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْهَمِّ وَالْحَزَنِ، وَالْعَجْزِ وَالْكَسَلِ، وَالْبُخْلِ وَالْجُبْنِ', src: 'رواه البخاري' },
            { text: 'حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ', src: 'سورة آل عمران' },
            { text: '﴿الَّذِينَ آمَنُوا وَتَطْمَئِنُّ قُلُوبُهُم بِذِكْرِ اللَّهِ ۗ أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ﴾', src: 'سورة الرعد: 28' }
        ]
    },
    sad: {
        note: 'الحزن يخفف بحسن الظن بالله ويقين أن الفرج قريب من الصابرين.',
        duas: [
            { text: 'اللَّهُمَّ أَنْتَ رَبِّي لَا إِلَهَ إِلَّا أَنْتَ، عَلَيْكَ تَوَكَّلْتُ وَأَنْتَ رَبُّ الْعَرْشِ الْعَظِيمِ', src: 'من دعاء الكرب' },
            { text: 'لَا إِلَهَ إِلَّا أَنْتَ سُبْحَانَكَ إِنِّي كُنْتُ مِنَ الظَّالِمِينَ', src: 'دعاء ذي النون، سورة الأنبياء' },
            { text: '﴿وَلَنَبْلُوَنَّكُم بِشَيْءٍ مِّنَ الْخَوْفِ وَالْجُوعِ... وَبَشِّرِ الصَّابِرِينَ﴾', src: 'سورة البقرة: 155' }
        ]
    },
    distressed: {
        note: 'مع كل ضيق يسر، فاصبر واستعن بالله ولا تعجز.',
        duas: [
            { text: 'لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ', src: 'كنز من كنوز الجنة' },
            { text: 'اللَّهُمَّ رَحْمَتَكَ أَرْجُو فَلَا تَكِلْنِي إِلَى نَفْسِي طَرْفَةَ عَيْنٍ، وَأَصْلِحْ لِي شَأْنِي كُلَّهُ', src: 'من دعاء النبي ﷺ' },
            { text: '﴿فَإِنَّ مَعَ الْعُسْرِ يُسْرًا﴾', src: 'سورة الشرح: 5' }
        ]
    },
    grateful: {
        note: 'الشكر يزيد النعمة، فاحمد الله على ما أنت فيه من خير.',
        duas: [
            { text: 'الْحَمْدُ لِلَّهِ الَّذِي بِنِعْمَتِهِ تَتِمُّ الصَّالِحَاتُ', src: 'دعاء مأثور' },
            { text: 'اللَّهُمَّ لَكَ الْحَمْدُ كُلُّهُ، وَلَكَ الْمُلْكُ كُلُّهُ، وَبِيَدِكَ الْخَيْرُ كُلُّهُ', src: 'من دعاء النبي ﷺ' },
            { text: '﴿لَئِن شَكَرْتُمْ لَأَزِيدَنَّكُمْ﴾', src: 'سورة إبراهيم: 7' }
        ]
    },
    happy: {
        note: 'الفرح بنعم الله يُشكر عليه، واجعل فرحتك سببًا لطاعة تزيدك قربًا من ربك.',
        duas: [
            { text: 'اللَّهُمَّ لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ وَعَظِيمِ سُلْطَانِكَ', src: 'دعاء مأثور' },
            { text: 'الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ', src: 'هدي النبي ﷺ' },
            { text: '﴿قُلْ بِفَضْلِ اللَّهِ وَبِرَحْمَتِهِ فَبِذَٰلِكَ فَلْيَفْرَحُوا﴾', src: 'سورة يونس: 58' }
        ]
    },
    fearful: {
        note: 'الخوف يسكن بالالتجاء إلى الله وحده، فهو حسبك ونعم الوكيل.',
        duas: [
            { text: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ وَأَعُوذُ بِكَ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ', src: 'رواه البخاري' },
            { text: 'حَسْبِيَ اللَّهُ لَا إِلَهَ إِلَّا هُوَ عَلَيْهِ تَوَكَّلْتُ وَهُوَ رَبُّ الْعَرْشِ الْعَظِيمِ', src: 'سورة التوبة: 129' },
            { text: '﴿الَّذِينَ قَالَ لَهُمُ النَّاسُ إِنَّ النَّاسَ قَدْ جَمَعُوا لَكُمْ فَاخْشَوْهُمْ فَزَادَهُمْ إِيمَانًا وَقَالُوا حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ﴾', src: 'سورة آل عمران: 173' }
        ]
    }
};

function renderMoodGrid() {
    const grid = document.getElementById('mood-grid');
    if (!grid) return;
    grid.innerHTML = moodDefs.map(m =>
        `<div class="mood-btn" id="mood-btn-${m.id}" onclick="selectMood('${m.id}')"><i class="fa-solid ${m.icon}"></i><span>${m.name}</span></div>`
    ).join('');
}

function selectMood(moodId) {
    document.querySelectorAll('.mood-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(`mood-btn-${moodId}`).classList.add('active');
    const data = moodContent[moodId];
    const area = document.getElementById('mood-result-area');
    area.style.display = 'block';
    area.innerHTML = `
        <div class="mood-note-card"><i class="fa-solid fa-heart" style="margin-left:8px;"></i>${data.note}</div>
        ${data.duas.map(d => `<div class="mood-dua-card"><div class="mood-dua-text">${d.text}</div><div class="mood-dua-source">${d.src}</div></div>`).join('')}
    `;
    area.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

