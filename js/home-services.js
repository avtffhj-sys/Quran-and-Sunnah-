/* ============================================================
   التقويم الهجري والميلادي + الخدمات الإسلامية الحديثة
   (إضافات جديدة على الصفحة الرئيسية فقط)
============================================================ */

const HIJRI_CALENDAR_ID = 'islamic-umalqura';
let miniCalendarViewDate = new Date();

const hijriFullFormatter = new Intl.DateTimeFormat(`ar-SA-u-ca-${HIJRI_CALENDAR_ID}`, { day: 'numeric', month: 'long', year: 'numeric' });
const hijriWeekdayFormatter = new Intl.DateTimeFormat('ar-SA', { weekday: 'long' });
const gregorianFullFormatter = new Intl.DateTimeFormat('ar-EG', { day: 'numeric', month: 'long', year: 'numeric' });
const gregorianWeekdayFormatter = new Intl.DateTimeFormat('ar-EG', { weekday: 'long' });

function getHijriParts(date) {
    const parts = new Intl.DateTimeFormat(`en-US-u-ca-${HIJRI_CALENDAR_ID}`, { day: 'numeric', month: 'numeric', year: 'numeric' }).formatToParts(date);
    const obj = {};
    parts.forEach(p => { if (p.type !== 'literal') obj[p.type] = parseInt(p.value, 10); });
    return { day: obj.day, month: obj.month, year: obj.year };
}

function renderTodayDualDate() {
    const now = new Date();
    document.getElementById('hijri-date-main').textContent = hijriFullFormatter.format(now) + ' هـ';
    document.getElementById('hijri-date-sub').textContent = hijriWeekdayFormatter.format(now);
    document.getElementById('gregorian-date-main').textContent = gregorianFullFormatter.format(now);
    document.getElementById('gregorian-date-sub').textContent = gregorianWeekdayFormatter.format(now);
}

function renderMiniCalendar() {
    const year = miniCalendarViewDate.getFullYear();
    const month = miniCalendarViewDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startOffset = firstDay.getDay();
    const today = new Date();

    document.getElementById('mini-calendar-title').textContent = new Intl.DateTimeFormat('ar-EG', { month: 'long', year: 'numeric' }).format(firstDay);

    const grid = document.getElementById('mini-calendar-grid');
    grid.innerHTML = '';
    ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'].forEach(d => {
        const el = document.createElement('div');
        el.className = 'cal-weekday';
        el.textContent = d;
        grid.appendChild(el);
    });

    for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement('div');
        empty.className = 'mini-calendar-cell empty';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= lastDay.getDate(); d++) {
        const cellDate = new Date(year, month, d);
        const hijriParts = getHijriParts(cellDate);
        const cell = document.createElement('div');
        cell.className = 'mini-calendar-cell';
        if (cellDate.toDateString() === today.toDateString()) cell.classList.add('today');
        cell.innerHTML = `<span>${d}</span><span class="cal-hijri-num">${hijriParts.day}</span>`;
        grid.appendChild(cell);
    }
}

function shiftMiniCalendarMonth(delta) {
    miniCalendarViewDate = new Date(miniCalendarViewDate.getFullYear(), miniCalendarViewDate.getMonth() + delta, 1);
    renderMiniCalendar();
}

const hijriMonthNames = ['محرم', 'صفر', 'ربيع الأول', 'ربيع الآخر', 'جمادى الأولى', 'جمادى الآخرة', 'رجب', 'شعبان', 'رمضان', 'شوال', 'ذو القعدة', 'ذو الحجة'];

const islamicOccasions = [
    { id: 'hijri-new-year', name: 'رأس السنة الهجرية', icon: 'fa-star-and-crescent', month: 1, day: 1 },
    { id: 'tasua', name: 'يوم تاسوعاء', icon: 'fa-hands-praying', month: 1, day: 9 },
    { id: 'ashura', name: 'يوم عاشوراء', icon: 'fa-hands-praying', month: 1, day: 10 },
    { id: 'isra-miraj', name: 'الإسراء والمعراج', icon: 'fa-moon', month: 7, day: 27 },
    { id: 'nisf-shaban', name: 'ليلة النصف من شعبان', icon: 'fa-star', month: 8, day: 15 },
    { id: 'ramadan-start', name: 'بداية شهر رمضان المبارك', icon: 'fa-star-and-crescent', month: 9, day: 1,
        link: { label: 'أدعية وأذكار رمضان', action: () => { switchPage('azkar', null); setTimeout(() => switchAzkarCategory('jawami', null), 60); } } },
    { id: 'badr', name: 'ذكرى غزوة بدر الكبرى', icon: 'fa-flag', month: 9, day: 17 },
    { id: 'fath-makkah', name: 'ذكرى فتح مكة المكرمة', icon: 'fa-flag', month: 9, day: 20 },
    { id: 'ramadan-last-ten', name: 'العشر الأواخر من رمضان', icon: 'fa-mosque', month: 9, day: 21,
        link: { label: 'أدعية وأذكار رمضان', action: () => { switchPage('azkar', null); setTimeout(() => switchAzkarCategory('jawami', null), 60); } } },
    { id: 'eid-fitr', name: 'عيد الفطر المبارك', icon: 'fa-gift', month: 10, day: 1,
        link: { label: 'تكبيرات وأدعية العيد', action: () => { switchPage('azkar', null); setTimeout(() => switchAzkarCategory('jawami', null), 60); } } },
    { id: 'shawwal-sittah', name: 'صيام الست من شوال', icon: 'fa-calendar-check', month: 10, day: 2 },
    { id: 'dhulhijjah-ten', name: 'العشر الأوائل من ذي الحجة', icon: 'fa-mosque', month: 12, day: 1,
        link: { label: 'أذكار وأدعية الحج والعمرة', action: () => { switchPage('azkar', null); setTimeout(() => switchAzkarCategory('hajj', null), 60); } } },
    { id: 'arafah', name: 'يوم عرفة', icon: 'fa-kaaba', month: 12, day: 9,
        link: { label: 'أذكار وأدعية الحج والعمرة', action: () => { switchPage('azkar', null); setTimeout(() => switchAzkarCategory('hajj', null), 60); } } },
    { id: 'eid-adha', name: 'عيد الأضحى المبارك', icon: 'fa-gift', month: 12, day: 10 },
    { id: 'tashreeq', name: 'أيام التشريق', icon: 'fa-kaaba', month: 12, day: 11 }
];

// بطاقات التهنئة تُتاح فقط للأعياد وشهر رمضان
const GREETING_CARD_OCCASION_IDS = ['ramadan-start', 'eid-fitr', 'eid-adha'];
function occasionHasGreetingCard(occId) {
    return GREETING_CARD_OCCASION_IDS.includes(occId);
}

// أحداث إسلامية تاريخية قصيرة تُعرض حسب التاريخ الهجري "حدث في مثل هذا اليوم"
// تركز هذه القائمة على الفتوحات والمعارك وتاريخ ولادة ووفاة القادة والفاتحين المسلمين عبر التاريخ الإسلامي
const islamicHistoryEvents = [
    // محرم
    { month: 1, day: 1, year: '1هـ', fullDate: '1 محرم 1هـ', text: 'هجرة النبي صلى الله عليه وسلم من مكة إلى المدينة المنورة سنة 1هـ، وبها بدأ التأريخ بالتقويم الهجري.' },
    { month: 1, day: 2, year: '897هـ', fullDate: '2 محرم 897هـ', text: 'سقوط غرناطة آخر معاقل المسلمين في الأندلس سنة 897هـ، بتسليم السلطان أبي عبدالله الصغير المدينة، فانتهى الوجود السياسي الإسلامي في الأندلس بعد قرابة ثمانية قرون.' },
    { month: 1, day: 3, year: '24هـ', fullDate: '3 محرم 24هـ', text: 'بيعة عثمان بن عفان رضي الله عنه بالخلافة بعد مشورة الصحابة الستة، ليصبح ثالث الخلفاء الراشدين سنة 24هـ.' },
    { month: 1, day: 5, year: '12هـ', fullDate: '5 محرم 12هـ', text: 'معركة اليمامة التي انتصر فيها المسلمون بقيادة خالد بن الوليد رضي الله عنه على مسيلمة الكذاب سنة 12هـ، وانتهت بها حروب الردة.' },
    { month: 1, day: 6, year: '21هـ', fullDate: '6 محرم 21هـ', text: 'فتح الإسكندرية عاصمة مصر البيزنطية على يد عمرو بن العاص رضي الله عنه سنة 21هـ، فاكتمل بذلك فتح مصر.' },
    { month: 1, day: 10, year: '61هـ', fullDate: '10 محرم 61هـ', text: 'استشهاد الحسين بن علي بن أبي طالب رضي الله عنهما في كربلاء سنة 61هـ.' },
    { month: 1, day: 15, year: '15هـ', fullDate: '15 محرم 15هـ', text: 'معركة القادسية الفاصلة بين المسلمين والفرس سنة 15هـ، وكانت مفتاحًا لفتح بلاد فارس.' },
    { month: 1, day: 20, year: '500هـ', fullDate: '20 محرم 500هـ', text: 'وفاة الأمير يوسف بن تاشفين قائد المرابطين وبطل معركة الزلاقة سنة 500هـ، بعد أن قضى معظم حياته مجاهدًا في الأندلس والمغرب.' },
    // صفر
    { month: 2, day: 1, year: '213هـ', fullDate: '1 صفر 213هـ', text: 'فتح جزيرة كريت على يد القائد أبي حفص عمر البلّوطي سنة 213هـ، وأسس بها إمارة إسلامية استمرت أكثر من قرن.' },
    { month: 2, day: 1, year: '478هـ', fullDate: '1 صفر 478هـ', text: 'سقوط مدينة طليطلة بيد ألفونسو السادس ملك قشتالة سنة 478هـ، بعد حصار دام قرابة تسعة أشهر، وكانت من أكبر النكبات على المسلمين في الأندلس.' },
    { month: 2, day: 4, year: '656هـ', fullDate: '4 صفر 656هـ', text: 'سقوط بغداد على يد جيوش المغول في 4 صفر سنة 656هـ، وانتهاء الخلافة العباسية فيها.' },
    { month: 2, day: 7, year: '974هـ', fullDate: '7 صفر 974هـ', text: 'وفاة السلطان سليمان القانوني أثناء حصاره قلعة سيجيتفار في المجر سنة 974هـ، بعد أن قاد جيشه بنفسه حتى آخر أيامه.' },
    { month: 2, day: 9, year: '38هـ', fullDate: '9 صفر 38هـ', text: 'معركة النهروان بين جيش أمير المؤمنين علي بن أبي طالب رضي الله عنه والخوارج سنة 38هـ.' },
    { month: 2, day: 10, year: '99هـ', fullDate: '10 صفر 99هـ', text: 'تولي عمر بن عبد العزيز رضي الله عنه الخلافة سنة 99هـ، الذي عُدّ لعدله خامس الخلفاء الراشدين.' },
    { month: 2, day: 12, year: '11هـ', fullDate: '12 صفر 11هـ', text: 'وفاة النبي صلى الله عليه وسلم سنة 11هـ، وكانت من أعظم المصائب التي ألمّت بالأمة الإسلامية.' },
    { month: 2, day: 13, year: '11هـ', fullDate: '13 صفر 11هـ', text: 'مبايعة أبي بكر الصديق رضي الله عنه بالخلافة في سقيفة بني ساعدة سنة 11هـ، أول الخلفاء الراشدين بعد وفاة النبي صلى الله عليه وسلم.' },
    { month: 2, day: 13, year: '303هـ', fullDate: '13 صفر 303هـ', text: 'وفاة الإمام أحمد بن شعيب النسائي سنة 303هـ، صاحب "السنن" أحد كتب الحديث الستة المعتمدة.' },
    { month: 2, day: 14, year: '609هـ', fullDate: '14 صفر 609هـ', text: 'معركة العقاب (لاس نافاس دي تولوسة) في الأندلس سنة 609هـ، هُزم فيها الموحدون بقيادة محمد الناصر أمام تحالف الممالك النصرانية.' },
    { month: 2, day: 20, year: '7هـ', fullDate: '20 صفر 7هـ', text: 'غزوة خيبر وفتح حصونها سنة 7هـ، وفيها كانت راية النبي صلى الله عليه وسلم مع علي بن أبي طالب رضي الله عنه.' },
    { month: 2, day: 27, year: '589هـ', fullDate: '27 صفر 589هـ', text: 'وفاة القائد صلاح الدين الأيوبي في دمشق سنة 589هـ، محرر بيت المقدس ومؤسس الدولة الأيوبية.' },
    { month: 2, day: 28, year: '50هـ', fullDate: '28 صفر 50هـ', text: 'وفاة الحسن بن علي بن أبي طالب رضي الله عنهما سنة 50هـ، الذي تنازل عن الخلافة توحيدًا لكلمة المسلمين.' },
    // ربيع الأول
    { month: 3, day: 1, year: '16هـ', fullDate: '1 ربيع الأول 16هـ', text: 'فتح المدائن (طيسفون) عاصمة الفرس على يد سعد بن أبي وقاص رضي الله عنه سنة 16هـ، فسقطت بذلك عاصمة الإمبراطورية الفارسية.' },
    { month: 3, day: 4, year: '886هـ', fullDate: '4 ربيع الأول 886هـ', text: 'وفاة السلطان محمد الفاتح فاتح القسطنطينية سنة 886هـ، تاركًا دولة عثمانية عظمى امتدت في ثلاث قارات.' },
    { month: 3, day: 5, year: '41هـ', fullDate: '5 ربيع الأول 41هـ', text: 'تنازل الحسن بن علي رضي الله عنهما عن الخلافة لمعاوية بن أبي سفيان توحيدًا لكلمة المسلمين، وسُمي ذلك العام بعام الجماعة سنة 41هـ.' },
    { month: 3, day: 6, year: '726هـ', fullDate: '6 ربيع الأول 726هـ', text: 'فتح السلطان أورخان غازي مدينة بورصة سنة 726هـ، واتخذها العثمانيون عاصمة أولى لدولتهم.' },
    { month: 3, day: 10, year: '465هـ', fullDate: '10 ربيع الأول 465هـ', text: 'وفاة السلطان ألب أرسلان السلجوقي بطل معركة ملاذكرد سنة 465هـ، اغتيل غدرًا بعد عودته من إحدى حملاته.' },
    { month: 3, day: 12, year: 'عام الفيل', fullDate: '12 ربيع الأول عام الفيلهـ', text: 'مولد النبي محمد صلى الله عليه وسلم بمكة المكرمة في عام الفيل.' },
    { month: 3, day: 12, year: '132هـ', fullDate: '12 ربيع الأول 132هـ', text: 'مبايعة أبي العباس السفاح في الكوفة أول خلفاء بني العباس سنة 132هـ، بداية عهد الدولة العباسية.' },
    { month: 3, day: 12, year: '241هـ', fullDate: '12 ربيع الأول 241هـ', text: 'وفاة الإمام أحمد بن حنبل سنة 241هـ ببغداد، صاحب المذهب الحنبلي ورابع الأئمة الأربعة، وصاحب كتاب "المسند" الشهير.' },
    { month: 3, day: 14, year: '64هـ', fullDate: '14 ربيع الأول 64هـ', text: 'وفاة يزيد بن معاوية سنة 64هـ.' },
    { month: 3, day: 14, year: '179هـ', fullDate: '14 ربيع الأول 179هـ', text: 'وفاة الإمام مالك بن أنس سنة 179هـ بالمدينة المنورة، إمام دار الهجرة وصاحب المذهب المالكي وثاني الأئمة الأربعة.' },
    { month: 3, day: 16, year: '316هـ', fullDate: '16 ربيع الأول 316هـ', text: 'إعلان الأمير عبد الرحمن الناصر نفسه خليفة للمسلمين في الأندلس سنة 316هـ، فبلغت الدولة الأموية هناك أوج عزها.' },
    // ربيع الآخر
    { month: 4, day: 1, year: '37هـ', fullDate: '1 ربيع الآخر 37هـ', text: 'بداية وقعة صفين بين علي بن أبي طالب ومعاوية بن أبي سفيان رضي الله عنهما سنة 37هـ.' },
    { month: 4, day: 1, year: '945هـ', fullDate: '1 ربيع الآخر 945هـ', text: 'معركة بريفيزا البحرية سنة 945هـ، انتصر فيها الأسطول العثماني بقيادة خير الدين بربروس على أساطيل التحالف الأوروبي.' },
    { month: 4, day: 5, year: '16هـ', fullDate: '5 ربيع الآخر 16هـ', text: 'معركة جلولاء بقيادة القعقاع بن عمرو التميمي سنة 16هـ، طاردت فلول جيش الفرس بعد سقوط المدائن.' },
    { month: 4, day: 20, year: '16هـ', fullDate: '20 ربيع الآخر 16هـ', text: 'فتح بيت المقدس على يد الفاروق عمر بن الخطاب رضي الله عنه سنة 16هـ، الذي قدم بنفسه لتسلّم مفاتيح المدينة.' },
    { month: 4, day: 21, year: '297هـ', fullDate: '21 ربيع الآخر 297هـ', text: 'إعلان قيام الدولة الفاطمية في إفريقية (تونس حاليًا) سنة 297هـ، ومبايعة عبيد الله المهدي بالخلافة.' },
    { month: 4, day: 23, year: '421هـ', fullDate: '23 ربيع الآخر 421هـ', text: 'وفاة السلطان محمود الغزنوي سنة 421هـ، الذي وسّع حدود الإسلام في بلاد الهند.' },
    { month: 4, day: 25, year: '583هـ', fullDate: '25 ربيع الآخر 583هـ', text: 'معركة حطين الفاصلة سنة 583هـ، انتصر فيها القائد صلاح الدين الأيوبي على الصليبيين، وكانت مقدمة لتحرير بيت المقدس.' },
    // جمادى الأولى
    { month: 5, day: 1, year: '8هـ', fullDate: '1 جمادى الأولى 8هـ', text: 'غزوة مؤتة بين المسلمين والروم سنة 8هـ، استشهد فيها القادة زيد بن حارثة وجعفر بن أبي طالب وعبدالله بن رواحة رضي الله عنهم.' },
    { month: 5, day: 4, year: '953هـ', fullDate: '4 جمادى الأولى 953هـ', text: 'وفاة القائد البحري خير الدين بربروس سنة 953هـ، الذي جعل من الأسطول العثماني القوة الأولى في البحر المتوسط.' },
    { month: 5, day: 10, year: '138هـ', fullDate: '10 جمادى الأولى 138هـ', text: 'دخول عبد الرحمن الداخل قرطبة وتأسيسه الإمارة الأموية في الأندلس سنة 138هـ.' },
    { month: 5, day: 10, year: '93هـ', fullDate: '10 جمادى الأولى 93هـ', text: 'فتح القائد محمد بن القاسم الثقفي مدينة الديبل وبلاد السند سنة 93هـ، وهو دون العشرين من عمره.' },
    { month: 5, day: 17, year: '73هـ', fullDate: '17 جمادى الأولى 73هـ', text: 'مقتل عبدالله بن الزبير رضي الله عنهما في مكة سنة 73هـ، بعد أن بويع بالخلافة في الحجاز وأجزاء من العالم الإسلامي سنوات.' },
    { month: 5, day: 17, year: '690هـ', fullDate: '17 جمادى الأولى 690هـ', text: 'فتح عكا آخر معاقل الصليبيين الكبرى على ساحل فلسطين، على يد السلطان الأشرف خليل بن قلاوون سنة 690هـ، فانتهت بذلك الحروب الصليبية في بلاد الشام.' },
    { month: 5, day: 18, year: '642هـ', fullDate: '18 جمادى الأولى 642هـ', text: 'معركة الحرْبِيّة (غزة) سنة 642هـ، هزم فيها الأيوبيون والخوارزمية الصليبيين هزيمة ساحقة ثبّتت بها بيت المقدس بيد المسلمين.' },
    { month: 5, day: 20, year: '857هـ', fullDate: '20 جمادى الأولى 857هـ', text: 'فتح القسطنطينية على يد السلطان محمد الفاتح سنة 857هـ، تحقيقًا لبشارة النبي صلى الله عليه وسلم.' },
    { month: 5, day: 23, year: '13هـ', fullDate: '23 جمادى الأولى 13هـ', text: 'معركة فِحل في الأردن سنة 13هـ، مهدت لفتح دمشق وبلاد الشام.' },
    { month: 5, day: 28, year: '13هـ', fullDate: '28 جمادى الأولى 13هـ', text: 'معركة أجنادين في بلاد الشام سنة 13هـ، من أولى معارك فتح الشام الكبرى بقيادة خالد بن الوليد.' },
    { month: 5, day: 30, year: '986هـ', fullDate: '30 جمادى الأولى 986هـ', text: 'معركة وادي المخازن (ملوك الثلاثة) في المغرب سنة 986هـ، انتصر فيها السلطان السعدي عبدالملك المعتصم على الغزو البرتغالي.' },
    // جمادى الآخرة
    { month: 6, day: 1, year: '28هـ', fullDate: '1 جمادى الآخرة 28هـ', text: 'فتح جزيرة قبرص على يد معاوية بن أبي سفيان سنة 28هـ في خلافة عثمان بن عفان رضي الله عنه، أول غزوة بحرية إسلامية كبرى.' },
    { month: 6, day: 3, year: '193هـ', fullDate: '3 جمادى الآخرة 193هـ', text: 'وفاة الخليفة هارون الرشيد سنة 193هـ، الذي بلغت الدولة العباسية في عهده أوج ازدهارها.' },
    { month: 6, day: 10, year: '36هـ', fullDate: '10 جمادى الآخرة 36هـ', text: 'وقعة الجمل بين علي بن أبي طالب رضي الله عنه وأم المؤمنين عائشة رضي الله عنها سنة 36هـ.' },
    { month: 6, day: 11, year: '132هـ', fullDate: '11 جمادى الآخرة 132هـ', text: 'معركة الزاب الكبرى في العراق سنة 132هـ، هُزم فيها آخر الخلفاء الأمويين مروان بن محمد، فسقطت الدولة الأموية في المشرق وقامت الدولة العباسية.' },
    { month: 6, day: 14, year: '212هـ', fullDate: '14 جمادى الآخرة 212هـ', text: 'بداية فتح صقلية على يد القائد أسد بن الفرات سنة 212هـ.' },
    { month: 6, day: 14, year: '505هـ', fullDate: '14 جمادى الآخرة 505هـ', text: 'وفاة الإمام أبي حامد الغزالي سنة 505هـ في مدينة طوس، الملقب بحجة الإسلام، صاحب كتاب "إحياء علوم الدين".' },
    { month: 6, day: 15, year: '96هـ', fullDate: '15 جمادى الآخرة 96هـ', text: 'وفاة الخليفة الوليد بن عبد الملك سنة 96هـ، الذي شهدت خلافته فتح الأندلس والسند.' },
    { month: 6, day: 22, year: '13هـ', fullDate: '22 جمادى الآخرة 13هـ', text: 'وفاة الصدّيق أبي بكر رضي الله عنه سنة 13هـ، أول الخلفاء الراشدين بعد النبي صلى الله عليه وسلم.' },
    { month: 6, day: 23, year: '13هـ', fullDate: '23 جمادى الآخرة 13هـ', text: 'تولي عمر بن الخطاب رضي الله عنه الخلافة بعد وفاة أبي بكر الصديق رضي الله عنه سنة 13هـ.' },
    { month: 6, day: 26, year: '539هـ', fullDate: '26 جمادى الآخرة 539هـ', text: 'فتح القائد عماد الدين زنكي مدينة الرها (أول إمارات الصليبيين) سنة 539هـ، أول نصر إسلامي كبير على الصليبيين.' },
    // رجب
    { month: 7, day: 1, year: '92هـ', fullDate: '1 رجب 92هـ', text: 'عبور طارق بن زياد إلى الأندلس سنة 92هـ، وبداية الفتح الإسلامي لها.' },
    { month: 7, day: 1, year: '676هـ', fullDate: '1 رجب 676هـ', text: 'وفاة السلطان الظاهر بيبرس البندقداري سنة 676هـ، الذي أتم طرد الصليبيين من معظم الشام وأوقف زحف المغول.' },
    { month: 7, day: 2, year: '920هـ', fullDate: '2 رجب 920هـ', text: 'معركة جالديران بين العثمانيين بقيادة السلطان سليم الأول والصفويين سنة 920هـ.' },
    { month: 7, day: 2, year: '725هـ', fullDate: '2 رجب 725هـ', text: 'خروج الرحالة ابن بطوطة من طنجة سنة 725هـ قاصدًا الحج، في رحلة استمرت نحو 29 عامًا طاف خلالها معظم بلاد العالم الإسلامي وما وراءها.' },
    { month: 7, day: 5, year: '15هـ', fullDate: '5 رجب 15هـ', text: 'معركة اليرموك الفاصلة سنة 15هـ، وبها فُتحت بلاد الشام وانهارت قوة الروم فيها.' },
    { month: 7, day: 8, year: '932هـ', fullDate: '8 رجب 932هـ', text: 'معركة بانيبت الأولى في الهند سنة 932هـ، انتصر فيها الأمير ظهير الدين بابر وأسس بها الدولة المغولية الإسلامية في الهند.' },
    { month: 7, day: 9, year: '218هـ', fullDate: '9 رجب 218هـ', text: 'وفاة الخليفة المأمون سنة 218هـ، الذي عُرف باهتمامه الكبير بالعلم والفتوحات.' },
    { month: 7, day: 10, year: '9هـ', fullDate: '10 رجب 9هـ', text: 'غزوة تبوك سنة 9هـ، وهي آخر غزوات النبي صلى الله عليه وسلم بنفسه.' },
    { month: 7, day: 12, year: '479هـ', fullDate: '12 رجب 479هـ', text: 'معركة الزلاقة في الأندلس سنة 479هـ، هزم فيها يوسف بن تاشفين وجيشه المرابطي ملك قشتالة ألفونسو السادس.' },
    { month: 7, day: 13, year: '279هـ', fullDate: '13 رجب 279هـ', text: 'وفاة الإمام الترمذي سنة 279هـ في بلدة ترمذ، صاحب كتاب "الجامع" (سنن الترمذي) أحد كتب الحديث الستة المعتمدة.' },
    { month: 7, day: 19, year: '92هـ', fullDate: '19 رجب 92هـ', text: 'معركة وادي لكة بقيادة طارق بن زياد سنة 92هـ، هُزم فيها ملك القوط رودريك، ففتحت أبواب الأندلس أمام المسلمين.' },
    { month: 7, day: 20, year: '13هـ', fullDate: '20 رجب 13هـ', text: 'فتح دمشق سنة 13هـ على يد القائدين أبي عبيدة بن الجراح وخالد بن الوليد رضي الله عنهما، بعد حصار دام أكثر من شهر.' },
    { month: 7, day: 22, year: '60هـ', fullDate: '22 رجب 60هـ', text: 'وفاة معاوية بن أبي سفيان رضي الله عنه سنة 60هـ، مؤسس الدولة الأموية.' },
    { month: 7, day: 24, year: '101هـ', fullDate: '24 رجب 101هـ', text: 'وفاة الخليفة العادل عمر بن عبد العزيز رضي الله عنه سنة 101هـ، الذي عُدّ لعدله خامس الخلفاء الراشدين.' },
    { month: 7, day: 25, year: '922هـ', fullDate: '25 رجب 922هـ', text: 'معركة مرج دابق قرب حلب سنة 922هـ، انتصر فيها السلطان سليم الأول على المماليك، ومهدت لضم بلاد الشام إلى الدولة العثمانية.' },
    { month: 7, day: 25, year: '261هـ', fullDate: '25 رجب 261هـ', text: 'وفاة الإمام مسلم بن الحجاج سنة 261هـ في نيسابور، صاحب "صحيح مسلم" ثاني أصح كتب الحديث بعد صحيح البخاري.' },
    { month: 7, day: 27, year: '583هـ', fullDate: '27 رجب 583هـ', text: 'استرداد صلاح الدين الأيوبي مدينة بيت المقدس من الصليبيين سنة 583هـ، بعد قرابة قرن من احتلالهم لها.' },
    { month: 7, day: 27, year: '835هـ', fullDate: '27 رجب 835هـ', text: 'مولد السلطان محمد الفاتح فاتح القسطنطينية سنة 835هـ.' },
    { month: 7, day: 27, year: '', text: 'الإسراء والمعراج، حيث أُسري بالنبي صلى الله عليه وسلم من المسجد الحرام إلى المسجد الأقصى، ثم عُرج به إلى السماوات العلا، وفُرضت فيها الصلوات الخمس.' },
    { month: 7, day: 30, year: '204هـ', fullDate: '30 رجب 204هـ', text: 'وفاة الإمام الشافعي سنة 204هـ بمصر، صاحب المذهب الشافعي وثالث الأئمة الأربعة، ومؤسس علم أصول الفقه.' },
    // شعبان
    { month: 8, day: 1, year: '13هـ', fullDate: '1 شعبان 13هـ', text: 'معركة البويب بين المسلمين بقيادة المثنى بن حارثة الشيباني والفرس سنة 13هـ، من أوائل الانتصارات في فتح العراق.' },
    { month: 8, day: 1, year: '145هـ', fullDate: '1 شعبان 145هـ', text: 'شروع الخليفة أبي جعفر المنصور في بناء مدينة بغداد لتكون عاصمة الدولة العباسية سنة 145هـ.' },
    { month: 8, day: 1, year: '94هـ', fullDate: '1 شعبان 94هـ', text: 'فتح القائد قتيبة بن مسلم الباهلي مدينة سمرقند سنة 94هـ، ومهّد بذلك لدخول الإسلام إلى بلاد ما وراء النهر.' },
    { month: 8, day: 2, year: '726هـ', fullDate: '2 شعبان 726هـ', text: 'وفاة عثمان بن أرطغرل مؤسس الدولة العثمانية سنة 726هـ، بعد أن أرسى دعائم دولة امتدت قرونًا.' },
    { month: 8, day: 6, year: '223هـ', fullDate: '6 شعبان 223هـ', text: 'فتح الخليفة المعتصم بالله مدينة عمورية الحصينة عند الروم سنة 223هـ، تلبيةً لاستغاثة امرأة مسلمة.' },
    { month: 8, day: 15, year: '791هـ', fullDate: '15 شعبان 791هـ', text: 'استشهاد السلطان مراد الأول في معركة كوسوفو سنة 791هـ، بعد أن حقق فيها العثمانيون نصرًا على تحالف البلقان.' },
    { month: 8, day: 15, year: '2هـ', fullDate: '15 شعبان 2هـ', text: 'تحويل القبلة من المسجد الأقصى إلى المسجد الحرام سنة 2هـ، استجابةً لأمر الله تعالى في سورة البقرة.' },
    { month: 8, day: 16, year: '927هـ', fullDate: '16 شعبان 927هـ', text: 'فتح السلطان سليمان القانوني مدينة بلغراد سنة 927هـ، أول فتوحاته الكبرى في أوروبا.' },
    { month: 8, day: 17, year: '358هـ', fullDate: '17 شعبان 358هـ', text: 'تأسيس القائد جوهر الصقلي مدينة القاهرة سنة 358هـ، لتصبح عاصمة الدولة الفاطمية.' },
    { month: 8, day: 22, year: '492هـ', fullDate: '22 شعبان 492هـ', text: 'سقوط بيت المقدس بيد الحملة الصليبية الأولى سنة 492هـ، وبقي تحت احتلالهم قرابة تسعين عامًا حتى استرده صلاح الدين الأيوبي.' },
    // رمضان
    { month: 9, day: 1, year: '96هـ', fullDate: '1 رمضان 96هـ', text: 'مقتل القائد قتيبة بن مسلم الباهلي سنة 96هـ في فتنة داخلية بين جنده.' },
    { month: 9, day: 1, year: '865هـ', fullDate: '1 رمضان 865هـ', text: 'فتح السلطان محمد الفاتح إمبراطورية طرابزون سنة 865هـ، آخر بقايا الدولة البيزنطية في الأناضول.' },
    { month: 9, day: 1, year: '428هـ', fullDate: '1 رمضان 428هـ', text: 'وفاة الطبيب والفيلسوف ابن سينا سنة 428هـ، الملقب بالشيخ الرئيس، صاحب موسوعة "القانون في الطب" التي ظلت مرجعًا في أوروبا لقرون.' },
    { month: 9, day: 2, year: '702هـ', fullDate: '2 رمضان 702هـ', text: 'معركة مرج الصُّفَّر قرب دمشق سنة 702هـ، حقق فيها السلطان الناصر محمد بن قلاوون نصرًا حاسمًا أنهى أطماع المغول في بلاد الشام.' },
    { month: 9, day: 7, year: '567هـ', fullDate: '7 رمضان 567هـ', text: 'إسقاط صلاح الدين الأيوبي للخلافة الفاطمية في مصر سنة 567هـ، وإعادتها إلى الخلافة العباسية، وقيام الدولة الأيوبية.' },
    { month: 9, day: 7, year: '361هـ', fullDate: '7 رمضان 361هـ', text: 'افتتاح الجامع الأزهر للصلاة بالقاهرة سنة 361هـ، بعد أن أمر بإنشائه القائد جوهر الصقلي، ليصبح من أقدم الجوامع والمنارات العلمية في العالم الإسلامي.' },
    { month: 9, day: 8, year: '21هـ', fullDate: '8 رمضان 21هـ', text: 'معركة نهاوند "فتح الفتوح" بين المسلمين والفرس سنة 21هـ، أنهت بها قوة الفرس نهائيًا.' },
    { month: 9, day: 10, year: '485هـ', fullDate: '10 رمضان 485هـ', text: 'اغتيال الوزير نظام الملك السلجوقي سنة 485هـ، بعد أن خدم الدولة السلجوقية عقودًا طويلة.' },
    { month: 9, day: 10, year: '', text: 'وفاة أم المؤمنين خديجة بنت خويلد رضي الله عنها، في العام الذي عُرف بعام الحزن لوفاتها ووفاة عمّ النبي أبي طالب.' },
    { month: 9, day: 15, year: '549هـ', fullDate: '15 رمضان 549هـ', text: 'دخول نور الدين محمود زنكي مدينة دمشق سنة 549هـ، فوحّد بها الشام تمهيدًا لمواجهة الصليبيين.' },
    { month: 9, day: 17, year: '2هـ', fullDate: '17 رمضان 2هـ', text: 'غزوة بدر الكبرى سنة 2هـ، أول معركة فاصلة بين المسلمين والمشركين، وانتصر فيها المسلمون رغم قلة عددهم وعتادهم.' },
    { month: 9, day: 17, year: '58هـ', fullDate: '17 رمضان 58هـ', text: 'وفاة أم المؤمنين عائشة بنت أبي بكر رضي الله عنها سنة 58هـ، ودُفنت بالبقيع.' },
    { month: 9, day: 18, year: '21هـ', fullDate: '18 رمضان 21هـ', text: 'وفاة القائد خالد بن الوليد رضي الله عنه سنة 21هـ في حمص، الذي لقّبه النبي صلى الله عليه وسلم بسيف الله المسلول، ولم يُهزم في معركة قط.' },
    { month: 9, day: 19, year: '40هـ', fullDate: '19 رمضان 40هـ', text: 'إصابة أمير المؤمنين علي بن أبي طالب رضي الله عنه سنة 40هـ، ثم استشهاده بعدها بأيام قليلة.' },
    { month: 9, day: 20, year: '8هـ', fullDate: '20 رمضان 8هـ', text: 'فتح مكة المكرمة سنة 8هـ، ودخل الناس في دين الله أفواجًا بعد هذا الفتح العظيم.' },
    { month: 9, day: 22, year: '273هـ', fullDate: '22 رمضان 273هـ', text: 'وفاة الإمام محمد بن يزيد بن ماجه سنة 273هـ، صاحب "سنن ابن ماجه" أحد كتب الحديث الستة المعتمدة.' },
    { month: 9, day: 25, year: '658هـ', fullDate: '25 رمضان 658هـ', text: 'معركة عين جالوت سنة 658هـ، وفيها انتصر المسلمون بقيادة سيف الدين قطز على جيوش المغول.' },
    { month: 9, day: 25, year: '808هـ', fullDate: '25 رمضان 808هـ', text: 'وفاة المؤرخ والعلامة عبد الرحمن ابن خلدون سنة 808هـ بالقاهرة، صاحب "المقدمة" الشهيرة التي عُدّ بها رائدًا لعلم الاجتماع.' },
    { month: 9, day: 27, year: '114هـ', fullDate: '27 رمضان 114هـ', text: 'استشهاد القائد عبد الرحمن الغافقي في معركة بلاط الشهداء (تور) سنة 114هـ، بعد أن قاد الفتوحات الإسلامية إلى عمق فرنسا.' },
    // شوال
    { month: 10, day: 1, year: '485هـ', fullDate: '1 شوال 485هـ', text: 'وفاة السلطان ملك شاه السلجوقي سنة 485هـ، الذي بلغت الدولة السلجوقية في عهده أقصى اتساعها.' },
    { month: 10, day: 1, year: '256هـ', fullDate: '1 شوال 256هـ', text: 'وفاة الإمام محمد بن إسماعيل البخاري ليلة عيد الفطر سنة 256هـ، صاحب "صحيح البخاري" الذي يُعدّ أصح كتاب بعد كتاب الله عند جمهور العلماء.' },
    { month: 10, day: 5, year: '5هـ', fullDate: '5 شوال 5هـ', text: 'غزوة الخندق (الأحزاب) سنة 5هـ، حفر فيها المسلمون خندقًا حول المدينة بمشورة سلمان الفارسي رضي الله عنه.' },
    { month: 10, day: 6, year: '8هـ', fullDate: '6 شوال 8هـ', text: 'غزوة حنين بعد فتح مكة سنة 8هـ، انتصر فيها المسلمون على قبيلتي هوازن وثقيف بعد ابتلاء أول بالفرار.' },
    { month: 10, day: 7, year: '3هـ', fullDate: '7 شوال 3هـ', text: 'غزوة أُحد سنة 3هـ، وفيها استشهد سيد الشهداء حمزة بن عبد المطلب رضي الله عنه.' },
    { month: 10, day: 9, year: '926هـ', fullDate: '9 شوال 926هـ', text: 'تولي السلطان سليمان القانوني عرش الدولة العثمانية سنة 926هـ، في عصر بلغت فيه الدولة أوج اتساعها.' },
    { month: 10, day: 11, year: '569هـ', fullDate: '11 شوال 569هـ', text: 'وفاة القائد نور الدين محمود زنكي سنة 569هـ، الذي وحّد الشام تمهيدًا لتحرير بيت المقدس.' },
    { month: 10, day: 15, year: '86هـ', fullDate: '15 شوال 86هـ', text: 'وفاة الخليفة عبد الملك بن مروان سنة 86هـ، الذي أعاد توحيد الدولة الأموية بعد الفتنة.' },
    { month: 10, day: 16, year: '275هـ', fullDate: '16 شوال 275هـ', text: 'وفاة الإمام أبي داود السجستاني سنة 275هـ بالبصرة، صاحب "سنن أبي داود" أحد كتب الحديث الستة المعتمدة.' },
    { month: 10, day: 21, year: '926هـ', fullDate: '21 شوال 926هـ', text: 'وفاة السلطان سليم الأول سنة 926هـ، الذي ضم مصر والشام والحجاز إلى الدولة العثمانية وأنهى دولة المماليك.' },
    // ذو القعدة
    { month: 11, day: 1, year: '43هـ', fullDate: '1 ذو القعدة 43هـ', text: 'وفاة القائد عمرو بن العاص رضي الله عنه فاتح مصر سنة 43هـ.' },
    { month: 11, day: 4, year: '647هـ', fullDate: '4 ذو القعدة 647هـ', text: 'معركة المنصورة في مصر سنة 647هـ، هزم فيها المسلمون الحملة الصليبية السابعة بقيادة لويس التاسع، ووقع في الأسر.' },
    { month: 11, day: 5, year: '133هـ', fullDate: '5 ذو القعدة 133هـ', text: 'معركة نهر طلاس بين المسلمين والصينيين سنة 133هـ، انتصر فيها المسلمون وامتد بها الإسلام إلى آسيا الوسطى.' },
    { month: 11, day: 10, year: '6هـ', fullDate: '10 ذو القعدة 6هـ', text: 'صلح الحديبية بين المسلمين وقريش سنة 6هـ، الذي كان فتحًا مبينًا مهّد لفتح مكة.' },
    { month: 11, day: 10, year: '658هـ', fullDate: '10 ذو القعدة 658هـ', text: 'مقتل السلطان سيف الدين قطز غيلة بعد عودته منتصرًا من عين جالوت سنة 658هـ، وتولى الحكم من بعده الظاهر بيبرس.' },
    { month: 11, day: 13, year: '932هـ', fullDate: '13 ذو القعدة 932هـ', text: 'معركة موهاكش في المجر سنة 932هـ، حقق فيها السلطان سليمان القانوني نصرًا ساحقًا فتح به أبواب أوروبا الوسطى.' },
    { month: 11, day: 15, year: '463هـ', fullDate: '15 ذو القعدة 463هـ', text: 'معركة ملاذكرد بين السلاجقة بقيادة السلطان ألب أرسلان والروم البيزنطيين سنة 463هـ، ففتحت أبواب الأناضول أمام المسلمين.' },
    { month: 11, day: 20, year: '728هـ', fullDate: '20 ذو القعدة 728هـ', text: 'وفاة شيخ الإسلام ابن تيمية سنة 728هـ سجينًا في قلعة دمشق، بعد حياة حافلة بالعلم والتصنيف والمناظرة.' },
    // ذو الحجة
    { month: 12, day: 1, year: '929هـ', fullDate: '1 ذو الحجة 929هـ', text: 'فتح جزيرة رودس من فرسان القديس يوحنا سنة 929هـ على يد السلطان سليمان القانوني.' },
    { month: 12, day: 6, year: '798هـ', fullDate: '6 ذو الحجة 798هـ', text: 'معركة نيقوبولس في البلقان سنة 798هـ، هزم فيها السلطان بايزيد الأول تحالفًا صليبيًا أوروبيًا كبيرًا.' },
    { month: 12, day: 18, year: '35هـ', fullDate: '18 ذو الحجة 35هـ', text: 'استشهاد ذي النورين عثمان بن عفان رضي الله عنه سنة 35هـ.' },
    { month: 12, day: 25, year: '35هـ', fullDate: '25 ذو الحجة 35هـ', text: 'بيعة أمير المؤمنين علي بن أبي طالب رضي الله عنه بالخلافة بعد استشهاد عثمان بن عفان رضي الله عنه سنة 35هـ، ليصبح رابع الخلفاء الراشدين.' },
    { month: 12, day: 26, year: '23هـ', fullDate: '26 ذو الحجة 23هـ', text: 'إصابة الفاروق عمر بن الخطاب رضي الله عنه بطعنة غادرة أثناء صلاة الفجر سنة 23هـ، واستشهد رضي الله عنه بعدها بأيام قليلة.' },
    { month: 12, day: 29, year: '922هـ', fullDate: '29 ذو الحجة 922هـ', text: 'معركة الريدانية قرب القاهرة سنة 922هـ، أتم فيها السلطان سليم الأول فتح مصر وضمها للدولة العثمانية.' }
];

let currentUpcomingOccasions = [];
let countdownModalInterval = null;

function escapeJs(str) { return String(str).replace(/'/g, "\\'"); }

function hijriToApproxGregorian(hYear, hMonth, hDay) {
    // تقريب لتحويل تاريخ هجري إلى ميلادي عبر البحث التكراري باستخدام Intl
    let guess = new Date();
    for (let i = 0; i < 400; i++) {
        const parts = getHijriParts(guess);
        if (parts.year === hYear && parts.month === hMonth && parts.day === hDay) return guess;
        if (parts.year < hYear || (parts.year === hYear && parts.month < hMonth) || (parts.year === hYear && parts.month === hMonth && parts.day < hDay)) {
            guess = new Date(guess.getTime() + 86400000);
        } else {
            guess = new Date(guess.getTime() - 86400000);
        }
    }
    return guess;
}

// أقرب أيام بيض قادمة (13-15 من كل شهر هجري)
function getNextWhiteDaysOccasion(now, currentHijri) {
    let targetMonth = currentHijri.month;
    let targetYear = currentHijri.year;
    if (currentHijri.day > 15) {
        targetMonth += 1;
        if (targetMonth > 12) { targetMonth = 1; targetYear += 1; }
    }
    const estDate = hijriToApproxGregorian(targetYear, targetMonth, 13);
    return { id: 'white-days', name: 'الأيام البيض (13-15 ' + hijriMonthNames[targetMonth - 1] + ')', icon: 'fa-circle-half-stroke', targetDate: estDate };
}

// بداية الشهر الهجري القادم
function getNextHijriMonthStartOccasion(now, currentHijri) {
    let targetMonth = currentHijri.month + 1;
    let targetYear = currentHijri.year;
    if (targetMonth > 12) { targetMonth = 1; targetYear += 1; }
    const estDate = hijriToApproxGregorian(targetYear, targetMonth, 1);
    return { id: 'next-hijri-month', name: 'بداية شهر ' + hijriMonthNames[targetMonth - 1], icon: 'fa-calendar-plus', targetDate: estDate };
}

function renderUpcomingOccasions() {
    const now = new Date();
    const currentHijri = getHijriParts(now);
    const list = document.getElementById('upcoming-occasions-list');
    list.innerHTML = '';

    const fixedOccasions = islamicOccasions.map(occ => {
        let targetYear = currentHijri.year;
        let estDate = hijriToApproxGregorian(targetYear, occ.month, occ.day);
        if (estDate < now) {
            estDate = hijriToApproxGregorian(targetYear + 1, occ.month, occ.day);
        }
        return { ...occ, targetDate: estDate };
    });

    const dynamicOccasions = [getNextWhiteDaysOccasion(now, currentHijri), getNextHijriMonthStartOccasion(now, currentHijri)];

    const reminders = JSON.parse(localStorage.getItem('occasionReminders') || '{}');

    const upcoming = [...fixedOccasions, ...dynamicOccasions]
        .map(occ => ({ ...occ, diffDays: Math.ceil((occ.targetDate - now) / 86400000) }))
        .sort((a, b) => a.diffDays - b.diffDays)
        .slice(0, 6);

    currentUpcomingOccasions = upcoming;

    upcoming.forEach((occ, idx) => {
        const item = document.createElement('div');
        item.className = 'occasion-item';
        item.onclick = () => openOccasionModal(idx);
        const remainingText = occ.diffDays <= 0 ? 'اليوم' : `بعد ${occ.diffDays} يوم`;
        const bellActive = reminders[occ.id] ? 'active-reminder' : '';
        const canGreet = occasionHasGreetingCard(occ.id);
        const wrap = document.createElement('div');
        wrap.innerHTML = `
            <span class="occasion-name"><i class="fa-solid ${occ.icon}"></i>${occ.name}</span>
            <div class="occasion-actions">
                <button class="occasion-icon-btn ${bellActive}" title="تفعيل تذكير"><i class="fa-solid fa-bell"></i></button>
                ${canGreet ? `<button class="occasion-icon-btn" title="بطاقة تهنئة"><i class="fa-solid fa-share-nodes"></i></button>` : ''}
                <span class="occasion-remaining">${remainingText}</span>
            </div>
        `;
        while (wrap.firstChild) item.appendChild(wrap.firstChild);
        const bellBtn = item.querySelector('.occasion-icon-btn[title="تفعيل تذكير"]');
        const shareBtn = item.querySelector('.occasion-icon-btn[title="بطاقة تهنئة"]');
        bellBtn.onclick = (e) => { e.stopPropagation(); toggleOccasionReminder(occ.id, bellBtn); };
        if (shareBtn) shareBtn.onclick = (e) => { e.stopPropagation(); openGreetingCard(occ.name); };
        list.appendChild(item);
    });

    checkDueReminders(upcoming);
}

/* ---------- عداد تنازلي لحظي لمناسبة محددة ---------- */
function openOccasionModal(idx) {
    const occ = currentUpcomingOccasions[idx];
    if (!occ) return;
    const modalBox = document.getElementById('app-modal-box');
    modalBox.innerHTML = `
        <div class="app-modal-header">
            <h3><i class="fa-solid ${occ.icon}"></i> ${occ.name}</h3>
            <button class="app-modal-close" onclick="closeAppModal()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="app-modal-body">
            <div class="countdown-live-grid">
                <div class="countdown-live-unit"><span class="countdown-live-num" id="cd-days">--</span><span class="countdown-live-label">يوم</span></div>
                <div class="countdown-live-unit"><span class="countdown-live-num" id="cd-hours">--</span><span class="countdown-live-label">ساعة</span></div>
                <div class="countdown-live-unit"><span class="countdown-live-num" id="cd-minutes">--</span><span class="countdown-live-label">دقيقة</span></div>
                <div class="countdown-live-unit"><span class="countdown-live-num" id="cd-seconds">--</span><span class="countdown-live-label">ثانية</span></div>
            </div>
            ${occ.link ? `<button class="btn-primary" style="width:100%; margin-top:18px; justify-content:center;" id="occasion-link-btn"><i class="fa-solid fa-arrow-left"></i> ${occ.link.label}</button>` : ''}
            <div class="app-modal-actions" style="margin-top:16px;">
                ${occasionHasGreetingCard(occ.id) ? `<button class="btn-action" id="occ-greeting-btn"><i class="fa-solid fa-share-nodes"></i> بطاقة تهنئة</button>` : ''}
                <button class="btn-action" id="occ-reminder-toggle-btn"><i class="fa-solid fa-bell"></i> <span id="occ-reminder-toggle-text">تفعيل التذكير</span></button>
            </div>
        </div>
    `;
    document.getElementById('app-modal-overlay').classList.add('open');

    if (occ.link) {
        document.getElementById('occasion-link-btn').onclick = () => { closeAppModal(); occ.link.action(); };
    }
    const greetingBtn = document.getElementById('occ-greeting-btn');
    if (greetingBtn) greetingBtn.onclick = () => openGreetingCard(occ.name);
    const reminderBtn = document.getElementById('occ-reminder-toggle-btn');
    reminderBtn.onclick = () => toggleOccasionReminder(occ.id, reminderBtn, true);
    updateReminderButtonState(occ.id, reminderBtn, true);

    updateOccasionCountdown(occ.targetDate);
    if (countdownModalInterval) clearInterval(countdownModalInterval);
    countdownModalInterval = setInterval(() => updateOccasionCountdown(occ.targetDate), 1000);
}

function updateOccasionCountdown(targetDate) {
    const now = new Date();
    let diff = Math.max(0, targetDate - now);
    const days = Math.floor(diff / 86400000);
    diff -= days * 86400000;
    const hours = Math.floor(diff / 3600000);
    diff -= hours * 3600000;
    const minutes = Math.floor(diff / 60000);
    diff -= minutes * 60000;
    const seconds = Math.floor(diff / 1000);
    const dEl = document.getElementById('cd-days');
    if (!dEl) return;
    dEl.textContent = days;
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

function closeAppModal() {
    document.getElementById('app-modal-overlay').classList.remove('open');
    if (countdownModalInterval) { clearInterval(countdownModalInterval); countdownModalInterval = null; }
}

function closeAppModalOnOverlay(e) {
    if (e.target.id === 'app-modal-overlay') closeAppModal();
}

/* ---------- تنبيهات الإشعارات الذكية ---------- */
function toggleOccasionReminder(occId, btnEl, isModal) {
    const key = 'occasionReminders';
    let reminders = JSON.parse(localStorage.getItem(key) || '{}');
    if (reminders[occId]) {
        delete reminders[occId];
        localStorage.setItem(key, JSON.stringify(reminders));
        showToast('تم إلغاء التذكير');
        updateReminderButtonState(occId, btnEl, isModal);
        return;
    }
    if (!('Notification' in window)) { showToast('المتصفح لا يدعم الإشعارات'); return; }
    const activate = () => {
        reminders = JSON.parse(localStorage.getItem(key) || '{}');
        reminders[occId] = true;
        localStorage.setItem(key, JSON.stringify(reminders));
        showToast('تم تفعيل التذكير، سنُذكرك قبل المناسبة بأيام قليلة');
        updateReminderButtonState(occId, btnEl, isModal);
    };
    if (Notification.permission === 'granted') {
        activate();
    } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(perm => {
            if (perm === 'granted') activate();
            else showToast('يجب السماح بالإشعارات لتفعيل التذكير');
        });
    } else {
        showToast('الإشعارات محظورة من إعدادات المتصفح');
    }
}

function updateReminderButtonState(occId, btnEl, isModal) {
    const reminders = JSON.parse(localStorage.getItem('occasionReminders') || '{}');
    const active = !!reminders[occId];
    if (isModal) {
        const txt = document.getElementById('occ-reminder-toggle-text');
        if (txt) txt.textContent = active ? 'إلغاء التذكير' : 'تفعيل التذكير';
    }
    if (btnEl) btnEl.classList.toggle('active-reminder', active);
}

function checkDueReminders(upcomingList) {
    const reminders = JSON.parse(localStorage.getItem('occasionReminders') || '{}');
    if (Object.keys(reminders).length === 0) return;
    if (!('Notification' in window) || Notification.permission !== 'granted') return;
    const shownKey = 'shownReminderNotifs';
    let shown = JSON.parse(sessionStorage.getItem(shownKey) || '{}');
    upcomingList.forEach(occ => {
        if (reminders[occ.id] && occ.diffDays <= 7 && occ.diffDays >= 0 && !shown[occ.id]) {
            try { new Notification('تذكير من منصة القرآن والسنة', { body: `${occ.name} تبدأ بعد ${occ.diffDays} يوم` }); } catch (e) {}
            shown[occ.id] = true;
            sessionStorage.setItem(shownKey, JSON.stringify(shown));
        }
    });
}

/* ---------- إشعارات الدفع (Web Push) — تصل حتى لو كان التطبيق مغلقًا ----------
   يختلف هذا تمامًا عن التذكيرات المحلية أعلاه (والتي تعمل فقط أثناء فتح
   التبويب). هنا نُنشئ اشتراكًا فريدًا لهذا الجهاز عبر متصفحه لدى خدمة
   Push الخاصة بالمتصفح (FCM لكروم، Mozilla لفايرفوكس...)، ثم نُرسل بيانات
   هذا الاشتراك لتُخزَّن في خادمنا الخلفي. لاحقًا، عندما يريد صاحب الموقع
   إرسال إشعار جديد (مثلًا عند إضافة محتوى)، يقوم الخادم بإرسال رسالة Push
   إلى كل الأجهزة المخزَّنة دفعة واحدة، فتظهر كإشعار نظام حتى لو كان
   المتصفح/التطبيق مغلقًا تمامًا (بفضل استمرار عمل الـ Service Worker
   في الخلفية). يتطلب هذا وجود مفتاح VAPID عام هنا يطابق مفتاحًا خاصًا
   مطابقًا له على الخادم — راجع تعليمات الخادم المرفقة لتوليدهما معًا. */
const VAPID_PUBLIC_KEY = "BH8VNj5gymLUDwL3qjpl1Iy2htTQBKrKG_LhZvAwaYB4X4WvmVxmwcRXiPi7C0b4N3pH6-gqoBQ0xA6l5w8tQCY";

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
    const rawData = atob(base64);
    return Uint8Array.from([...rawData].map(c => c.charCodeAt(0)));
}

// يتحقق هل مفتاح الاشتراك الحالي (إن وجد) يطابق VAPID_PUBLIC_KEY الحالي.
// ضروري لأن أي اشتراك أُنشئ بمفتاح عام قديم (قبل تغيير مفاتيح VAPID على
// الخادم) يظل "صالحًا" من ناحية المتصفح، لكن أي إشعار يُرسل له لاحقًا
// يُرفض بخطأ 403 من خدمة الدفع لأن المفتاحين لم يعودا متطابقين.
function subscriptionKeyMatches(subscription) {
    try {
        const currentKeyBytes = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
        const subKeyBytes = new Uint8Array(subscription.options.applicationServerKey);
        if (currentKeyBytes.length !== subKeyBytes.length) return false;
        return currentKeyBytes.every((b, i) => b === subKeyBytes[i]);
    } catch (e) {
        // بعض المتصفحات القديمة لا تعرض options.applicationServerKey؛
        // في هذه الحالة لا يمكننا التأكد فنفترض التطابق ونترك الأمر
        // للخادم يكتشف الخطأ عند الإرسال إن وُجد (يُحذف تلقائيًا هناك)
        return true;
    }
}

function updatePushSubscribeUI(isSubscribed) {
    const btn = document.getElementById('push-subscribe-btn');
    const btnText = document.getElementById('push-subscribe-btn-text');
    const desc = document.getElementById('push-status-desc');
    if (!btn || !btnText || !desc) return;
    if (isSubscribed) {
        btnText.textContent = 'الإشعارات مُفعّلة على هذا الجهاز';
        btn.classList.add('active-reminder');
        desc.textContent = 'سيصلك إشعار فوري على هذا الجهاز عند إضافة محتوى جديد أو صدور تحديث للمنصة.';
    } else {
        btnText.textContent = 'تفعيل إشعارات التحديثات';
        btn.classList.remove('active-reminder');
        desc.textContent = 'فعّل الإشعارات لتصلك رسالة فورية على جهازك عند إضافة محتوى جديد أو تحديث للمنصة، حتى لو كان التطبيق مغلقًا.';
    }
}

async function subscribeToPushNotifications() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        showToast('الإشعارات غير مدعومة على هذا الجهاز/المتصفح');
        return;
    }
    if (VAPID_PUBLIC_KEY.startsWith('REPLACE-WITH')) {
        showToast('لم يتم إعداد الإشعارات من قِبل مالك الموقع بعد');
        return;
    }
    try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
            showToast('يجب السماح بالإشعارات لتفعيل هذه الميزة');
            return;
        }
        const reg = await navigator.serviceWorker.ready;
        let subscription = await reg.pushManager.getSubscription();
        if (subscription && !subscriptionKeyMatches(subscription)) {
            // اشتراك قديم بمفتاح VAPID سابق: يجب إلغاؤه أولًا وإلا فستفشل
            // محاولة الاشتراك بالمفتاح الجديد (المتصفح يسمح باشتراك واحد فقط)
            await subscription.unsubscribe();
            subscription = null;
        }
        if (!subscription) {
            subscription = await reg.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
            });
        }
        await fetch(BACKEND_BASE_URL + '/api/push/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
        });
        updatePushSubscribeUI(true);
        showToast('تم تفعيل إشعارات التحديثات بنجاح');
    } catch (e) {
        console.warn('تعذر تفعيل إشعارات الدفع', e);
        showToast('حدث خطأ أثناء تفعيل الإشعارات، حاول لاحقًا');
    }
}

// عند تحميل الصفحة: تحقق بصمت هل هذا الجهاز مشترك أصلًا لتحديث شكل الزر فورًا.
// كذلك: إن كان الاشتراك الموجود مرتبطًا بمفتاح VAPID قديم (تغيّر على
// الخادم بعد اشتراك هذا الجهاز)، نعيد الاشتراك تلقائيًا بصمت بالمفتاح
// الصحيح — طالما الإذن (Notification permission) ممنوح أصلًا، هذا لا
// يتطلب أي تفاعل جديد من المستخدم، ويمنع تكرار خطأ 403 مستقبلًا.
(function checkExistingPushSubscription() {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;
    navigator.serviceWorker.ready.then(async (reg) => {
        let sub = await reg.pushManager.getSubscription();
        if (sub && !subscriptionKeyMatches(sub)) {
            try {
                await sub.unsubscribe();
                sub = await reg.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
                });
                await fetch(BACKEND_BASE_URL + '/api/push/subscribe', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(sub)
                });
            } catch (e) {
                console.warn('تعذر تجديد اشتراك الإشعارات القديم', e);
                sub = null;
            }
        }
        if (sub) updatePushSubscribeUI(true);
    }).catch(() => {});
})();

/* ---------- بطاقة التهنئة السريعة ---------- */
const greetingTemplates = [
    { bg: ['#10b981', '#059669'], label: 'زمردي' },
    { bg: ['#d97706', '#b45309'], label: 'ذهبي' },
    { bg: ['#8b5cf6', '#7c3aed'], label: 'بنفسجي' },
    { bg: ['#06b6d4', '#0891b2'], label: 'سماوي' }
];
let currentGreetingTemplateIndex = 0;
let currentGreetingOccasionName = '';

function openGreetingCard(occasionName) {
    currentGreetingOccasionName = occasionName;
    currentGreetingTemplateIndex = 0;
    const modalBox = document.getElementById('app-modal-box');
    modalBox.innerHTML = `
        <div class="app-modal-header">
            <h3><i class="fa-solid fa-champagne-glasses"></i> بطاقة تهنئة</h3>
            <button class="app-modal-close" onclick="closeAppModal()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="app-modal-body">
            <input type="text" id="greeting-name-input" class="greeting-name-input" placeholder="اكتب اسمك هنا (اختياري)">
            <div class="greeting-template-row" id="greeting-template-row"></div>
            <canvas id="greeting-canvas" width="800" height="800" class="greeting-card-canvas"></canvas>
            <div class="app-modal-actions" style="margin-top:14px;">
                <button class="btn-primary" id="greeting-download-btn"><i class="fa-solid fa-download"></i> تنزيل</button>
                <button class="btn-action" id="greeting-share-btn"><i class="fa-solid fa-share-nodes"></i> مشاركة</button>
            </div>
        </div>
    `;
    document.getElementById('app-modal-overlay').classList.add('open');
    document.getElementById('greeting-name-input').oninput = () => renderGreetingCard();
    document.getElementById('greeting-download-btn').onclick = downloadGreetingCard;
    document.getElementById('greeting-share-btn').onclick = shareGreetingCard;
    if (countdownModalInterval) { clearInterval(countdownModalInterval); countdownModalInterval = null; }
    renderGreetingTemplateButtons();
    renderGreetingCard();
}

function renderGreetingTemplateButtons() {
    const row = document.getElementById('greeting-template-row');
    row.innerHTML = '';
    greetingTemplates.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.className = 'greeting-template-btn' + (i === currentGreetingTemplateIndex ? ' active' : '');
        btn.style.background = `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]})`;
        btn.title = t.label;
        btn.onclick = () => { currentGreetingTemplateIndex = i; renderGreetingTemplateButtons(); renderGreetingCard(); };
        row.appendChild(btn);
    });
}

function wrapCanvasText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    const lines = [];
    words.forEach(word => {
        const testLine = line ? line + ' ' + word : word;
        if (ctx.measureText(testLine).width > maxWidth && line) {
            lines.push(line);
            line = word;
        } else {
            line = testLine;
        }
    });
    if (line) lines.push(line);
    const startY = y - ((lines.length - 1) * lineHeight) / 2;
    lines.forEach((l, i) => ctx.fillText(l, x, startY + i * lineHeight));
}

function renderGreetingCard() {
    const canvas = document.getElementById('greeting-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const tpl = greetingTemplates[currentGreetingTemplateIndex];
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, tpl.bg[0]);
    grad.addColorStop(1, tpl.bg[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(120, 120, 160, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w - 100, h - 140, 200, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    ctx.textAlign = 'center';
    ctx.direction = 'rtl';
    ctx.fillStyle = '#ffffff';
    ctx.font = "900 46px Cairo, sans-serif";
    wrapCanvasText(ctx, currentGreetingOccasionName, w / 2, h / 2 - 60, w - 140, 56);

    const name = (document.getElementById('greeting-name-input')?.value || '').trim();
    if (name) {
        ctx.font = "700 32px Cairo, sans-serif";
        wrapCanvasText(ctx, `تهنئة خاصة إلى: ${name}`, w / 2, h / 2 + 100, w - 160, 40);
    }

    ctx.font = "500 24px Cairo, sans-serif";
    ctx.globalAlpha = 0.85;
    ctx.fillText('كل عام وأنتم بخير', w / 2, h - 90);
    ctx.globalAlpha = 1;
}

function downloadGreetingCard() {
    const canvas = document.getElementById('greeting-canvas');
    const link = document.createElement('a');
    link.download = 'بطاقة-تهنئة.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('تم تنزيل البطاقة بنجاح');
}

function shareGreetingCard() {
    const canvas = document.getElementById('greeting-canvas');
    canvas.toBlob(blob => {
        const file = new File([blob], 'بطاقة-تهنئة.png', { type: 'image/png' });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: currentGreetingOccasionName, text: 'كل عام وأنتم بخير' }).catch(() => {});
        } else {
            downloadGreetingCard();
        }
    });
}

/* ---------- مشاركة الآيات ---------- */
const ayahImageTemplates = [
    { bg: ['#0f766e', '#134e4a'], label: 'زمردي' },
    { bg: ['#92400e', '#451a03'], label: 'ذهبي' },
    { bg: ['#1e3a8a', '#0f172a'], label: 'ليلي' },
    { bg: ['#7c2d12', '#3f0d0d'], label: 'ياقوتي' }
];
let ayahImageTemplateIndex = 0;
let currentShareAyahText = '';

function openShareAyahModal(text) {
    currentShareAyahText = text;
    const modalBox = document.getElementById('app-modal-box');
    modalBox.innerHTML = `
        <div class="app-modal-header">
            <h3><i class="fa-solid fa-share-nodes"></i> مشاركة الآية</h3>
            <button class="app-modal-close" onclick="closeAppModal()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="app-modal-body">
            <div class="share-ayah-preview">${text}</div>
            <div class="share-ayah-options">
                <button class="share-ayah-option-btn design-option" id="share-ayah-design-btn"><i class="fa-solid fa-palette"></i> صمم الآية كصورة</button>
                <button class="share-ayah-option-btn instagram-option" id="share-ayah-instagram-btn"><i class="fa-brands fa-instagram"></i> إنستغرام</button>
                <button class="share-ayah-option-btn whatsapp-option" id="share-ayah-whatsapp-btn"><i class="fa-brands fa-whatsapp"></i> واتساب</button>
                <button class="share-ayah-option-btn twitter-option" id="share-ayah-twitter-btn"><i class="fa-brands fa-x-twitter"></i> تويتر</button>
            </div>
        </div>
    `;
    document.getElementById('app-modal-overlay').classList.add('open');
    document.getElementById('share-ayah-design-btn').onclick = openAyahImageDesigner;
    document.getElementById('share-ayah-whatsapp-btn').onclick = () => shareAyahExternal('whatsapp');
    document.getElementById('share-ayah-twitter-btn').onclick = () => shareAyahExternal('twitter');
    document.getElementById('share-ayah-instagram-btn').onclick = () => shareAyahExternal('instagram');
}

function shareAyahExternal(platform) {
    const fullText = currentShareAyahText + '\n\nمنصة القرآن والسنة';
    if (platform === 'whatsapp') {
        window.open(`https://wa.me/?text=${encodeURIComponent(fullText)}`, '_blank');
    } else if (platform === 'twitter') {
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(fullText)}`, '_blank');
    } else if (platform === 'instagram') {
        navigator.clipboard.writeText(fullText).then(() => {
            showToast('تم نسخ الآية، افتح إنستغرام وأضفها إلى قصتك أو منشورك');
        }).catch(() => showToast('تعذّر نسخ النص'));
    }
}

function openAyahImageDesigner() {
    const modalBox = document.getElementById('app-modal-box');
    modalBox.innerHTML = `
        <div class="app-modal-header">
            <h3><i class="fa-solid fa-image"></i> تصميم الآية كصورة</h3>
            <button class="app-modal-close" onclick="closeAppModal()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="app-modal-body">
            <button class="share-ayah-back-btn" onclick="openShareAyahModal(currentShareAyahText)"><i class="fa-solid fa-arrow-right"></i> رجوع لخيارات المشاركة</button>
            <div class="greeting-template-row" id="ayah-template-row"></div>
            <div class="ayah-image-canvas-wrap">
                <canvas id="ayah-image-canvas" width="800" height="1000"></canvas>
            </div>
            <div class="app-modal-actions">
                <button class="btn-primary" id="ayah-image-download-btn"><i class="fa-solid fa-download"></i> تنزيل الصورة</button>
                <button class="btn-action" id="ayah-image-share-btn"><i class="fa-solid fa-share-nodes"></i> مشاركة الصورة</button>
            </div>
        </div>
    `;
    document.getElementById('app-modal-overlay').classList.add('open');
    document.getElementById('ayah-image-download-btn').onclick = downloadAyahImage;
    document.getElementById('ayah-image-share-btn').onclick = shareAyahImage;
    renderAyahTemplateButtons();
    renderAyahImage();
}

function renderAyahTemplateButtons() {
    const row = document.getElementById('ayah-template-row');
    row.innerHTML = '';
    ayahImageTemplates.forEach((t, i) => {
        const btn = document.createElement('button');
        btn.className = 'greeting-template-btn' + (i === ayahImageTemplateIndex ? ' active' : '');
        btn.style.background = `linear-gradient(135deg, ${t.bg[0]}, ${t.bg[1]})`;
        btn.title = t.label;
        btn.onclick = () => { ayahImageTemplateIndex = i; renderAyahTemplateButtons(); renderAyahImage(); };
        row.appendChild(btn);
    });
}

function renderAyahImage() {
    const canvas = document.getElementById('ayah-image-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width, h = canvas.height;
    const tpl = ayahImageTemplates[ayahImageTemplateIndex];

    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, tpl.bg[0]);
    grad.addColorStop(1, tpl.bg[1]);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);

    ctx.globalAlpha = 0.08;
    ctx.fillStyle = '#ffffff';
    ctx.beginPath(); ctx.arc(90, 110, 190, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(w - 70, h - 150, 230, 0, Math.PI * 2); ctx.fill();
    ctx.globalAlpha = 1;

    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 2;
    ctx.strokeRect(34, 34, w - 68, h - 68);
    ctx.strokeStyle = 'rgba(255,255,255,0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(46, 46, w - 92, h - 92);

    ctx.textAlign = 'center';
    ctx.direction = 'rtl';

    // هلال زخرفي أعلى الصورة
    ctx.fillStyle = 'rgba(255,255,255,0.9)';
    ctx.beginPath(); ctx.arc(w / 2, 112, 17, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath(); ctx.arc(w / 2 + 9, 105, 15, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';

    ctx.strokeStyle = 'rgba(255,255,255,0.5)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(w / 2 - 60, 155); ctx.lineTo(w / 2 + 60, 155); ctx.stroke();

    ctx.globalAlpha = 0.12;
    ctx.fillStyle = '#ffffff';
    ctx.font = "900 220px Georgia, serif";
    ctx.fillText('”', w / 2, 430);
    ctx.globalAlpha = 1;

    ctx.fillStyle = '#ffffff';
    ctx.font = "700 42px 'Cairo', sans-serif";
    wrapCanvasText(ctx, currentShareAyahText, w / 2, h / 2 - 20, w - 180, 62);

    ctx.strokeStyle = 'rgba(255,255,255,0.4)';
    ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(w / 2 - 90, h - 140); ctx.lineTo(w / 2 + 90, h - 140); ctx.stroke();
    ctx.font = "700 24px 'Cairo', sans-serif";
    ctx.globalAlpha = 0.9;
    ctx.fillText('منصة القرآن والسنة', w / 2, h - 95);
    ctx.globalAlpha = 1;
}

function downloadAyahImage() {
    const canvas = document.getElementById('ayah-image-canvas');
    const link = document.createElement('a');
    link.download = 'آية-قرآنية.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
    showToast('تم تنزيل صورة الآية بنجاح');
}

function shareAyahImage() {
    const canvas = document.getElementById('ayah-image-canvas');
    canvas.toBlob(blob => {
        const file = new File([blob], 'آية-قرآنية.png', { type: 'image/png' });
        if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
            navigator.share({ files: [file], title: 'آية قرآنية', text: currentShareAyahText }).catch(() => {});
        } else {
            downloadAyahImage();
        }
    });
}

/* ---------- محول التاريخ الهجري/الميلادي وحدث في مثل هذا اليوم ---------- */
let currentOtdIndex = 0;
let currentOtdHijri = null;

function showOnThisDayEvent(match) {
    document.getElementById('on-this-day-text').textContent = match.text;
    const card = document.getElementById('on-this-day-card');
    if (card) {
        const bgIndex = ((match.day - 1) % 6) + 1;
        card.className = 'otd-card dm-bg-' + bgIndex;
    }
    const badge = document.getElementById('on-this-day-badge');
    if (badge) {
        // نعرض التاريخ الهجري الكامل الحقيقي للحدث من fullDate
        const approxGregorian = hijriToApproxGregorian(parseInt(match.year.replace('هـ', '')), match.month, match.day);
        badge.innerHTML =
            `<i class="fa-solid fa-moon"></i> ${match.fullDate}`
            + `<span style="opacity:.6;">•</span>`
            + `<i class="fa-regular fa-calendar"></i> ${gregorianFullFormatter.format(approxGregorian)}م`;
    }
}

function renderOnThisDay() {
    const now = new Date();
    const h = getHijriParts(now);
    currentOtdHijri = h;

    const exactMatch = islamicHistoryEvents.find(e => e.month === h.month && e.day === h.day);
    if (exactMatch) {
        currentOtdIndex = islamicHistoryEvents.indexOf(exactMatch);
    } else {
        // اختيار عشوائي في كل زيارة/تحديث للصفحة حتى لا يبقى القسم ثابتًا على حدث واحد
        currentOtdIndex = Math.floor(Math.random() * islamicHistoryEvents.length);
    }
    showOnThisDayEvent(islamicHistoryEvents[currentOtdIndex]);
}

function nextOnThisDayEvent() {
    currentOtdIndex = (currentOtdIndex + 1) % islamicHistoryEvents.length;
    showOnThisDayEvent(islamicHistoryEvents[currentOtdIndex]);
}
document.getElementById('on-this-day-next-btn')?.addEventListener('click', nextOnThisDayEvent);

/* ---------- الرسالة اليومية ---------- */
const dailyMessages = [
    { text: 'من صبر ظفر، فاجعل صبرك عبادة وثقتك بالله يقينًا لا يتزعزع.', bg: 1 },
    { text: 'اطمئن، فما قسمه الله لك لن يخطئك، وما لم يقسمه لك لن يصيبك.', bg: 2 },
    { text: 'ابتسامتك في وجه أخيك صدقة، فلا تُقلل من شأن معروف يسير.', bg: 3 },
    { text: 'ذكر الله طمأنينة القلوب، فأكثر منه في سرك وجهرك.', bg: 4 },
    { text: 'من رضي عن الله بالقليل رضي الله عنه بالكثير.', bg: 5 },
    { text: 'الدعاء سلاح المؤمن، فلا تستبطئ الإجابة وأحسن الظن بربك.', bg: 6 },
    { text: 'خير الناس أنفعهم للناس، فابحث عن فرصتك اليوم لتنفع أحدًا.', bg: 1 },
    { text: 'العافية تاج على رؤوس الأصحاء لا يراه إلا المرضى، فاشكر الله عليها.', bg: 2 },
    { text: 'من ترك شيئًا لله عوّضه الله خيرًا منه.', bg: 3 },
    { text: 'القناعة كنز لا يفنى، فارضَ بما قسم الله واسعَ بجد.', bg: 4 }
];

function renderDailyMessage() {
    const idx = Math.floor(Math.random() * dailyMessages.length);
    const msg = dailyMessages[idx];
    const card = document.getElementById('daily-message-card');
    card.className = 'daily-message-card dm-bg-' + msg.bg;
    document.getElementById('daily-message-text').textContent = msg.text;
    document.getElementById('daily-message-badge').textContent = 'رسالة اليوم • ' + gregorianFullFormatter.format(new Date());
}

/* ---------- دعم PWA (تطبيق ويب تقدمي) ---------- */
if ('serviceWorker' in navigator) {
    // نُسجّل هل كان هناك Service Worker متحكّم بالصفحة أصلًا *قبل*
    // التسجيل، لنميّز بين: (أ) أول زيارة على الإطلاق [لا حاجة لإعادة
    // تحميل، فالمحتوى المعروض فعلاً هو الأحدث]، و(ب) تفعيل نسخة
    // محدَّثة أثناء وجود المستخدم على الصفحة [هنا نُعيد التحميل تلقائيًا
    // مرة واحدة حتى لا يبقى عالقًا على واجهة قديمة].
    let hadControllerBefore = !!navigator.serviceWorker.controller;
    let swReloadTriggered = false;

    navigator.serviceWorker.addEventListener('controllerchange', () => {
        if (!hadControllerBefore) {
            hadControllerBefore = true;
            return;
        }
        if (swReloadTriggered) return;
        swReloadTriggered = true;
        window.location.reload();
    });

    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./sw.js')
            .then((reg) => {
                // نتحقق يدويًا من وجود نسخة أحدث كلما عاد المستخدم إلى
                // التبويب، حتى تُكتشف التحديثات بسرعة أكبر بدل انتظار
                // فحص المتصفح التلقائي (الذي قد يتأخر حتى 24 ساعة أحيانًا)
                document.addEventListener('visibilitychange', () => {
                    if (document.visibilityState === 'visible') reg.update().catch(() => {});
                });
            })
            .catch(() => {});
    });
}

let deferredPwaPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPwaPrompt = e;
    document.getElementById('pwa-install-banner').classList.add('show');
});

function installPwaApp() {
    document.getElementById('pwa-install-banner').classList.remove('show');
    if (!deferredPwaPrompt) return;
    deferredPwaPrompt.prompt();
    deferredPwaPrompt.userChoice.finally(() => { deferredPwaPrompt = null; });
}

function dismissPwaBanner() {
    document.getElementById('pwa-install-banner').classList.remove('show');
}

/* ---------- بانر إرشادي لتثبيت التطبيق على آيفون/آيباد ----------
   متصفح Safari على iOS لا يطلق حدث beforeinstallprompt إطلاقًا (قيد
   من أبل نفسها)، فلا يمكن إظهار إشعار تثبيت تلقائي حقيقي هناك مهما
   كتبنا من كود. البديل المتاح الوحيد هو توضيح خطوات الإضافة اليدوية
   عبر "المشاركة ← إضافة إلى الشاشة الرئيسية" لمن يستخدم جهاز آيفون/آيباد. */
function isIosDevice() {
    const ua = window.navigator.userAgent;
    const isAppleMobile = /iPad|iPhone|iPod/.test(ua) && !window.MSStream;
    // آيباد بنظام iPadOS 13 فأحدث يُعرّف نفسه كـ Mac، لذا نميّزه بدعم اللمس
    const isIpadOS13Plus = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
    return isAppleMobile || isIpadOS13Plus;
}

function isRunningAsInstalledApp() {
    return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

window.addEventListener('load', () => {
    try {
        if (isIosDevice() && !isRunningAsInstalledApp() && !localStorage.getItem('ios-install-banner-dismissed')) {
            setTimeout(() => {
                document.getElementById('ios-install-banner')?.classList.add('show');
            }, 1800);
        }
    } catch (e) {}
});

function dismissIosBanner() {
    document.getElementById('ios-install-banner').classList.remove('show');
    try { localStorage.setItem('ios-install-banner-dismissed', '1'); } catch (e) {}
}

/* ---------- الخدمات الإسلامية الحديثة ---------- */

function toggleServicePanel(service) {
    const panelIds = ['zakat', 'tasbih'];
    panelIds.forEach(id => {
        const panel = document.getElementById(`panel-${id}`);
        const card = document.querySelector(`.modern-service-card[data-service="${id}"]`);
        if (id === service) {
            const willOpen = !panel.classList.contains('open');
            panel.classList.toggle('open', willOpen);
            card.classList.toggle('active', willOpen);
            if (willOpen) panel.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        } else {
            panel.classList.remove('open');
            card.classList.remove('active');
        }
    });
}

// حاسبة الزكاة
function calculateZakat() {
    const cash = sanitizeNumberInput(document.getElementById('zakat-cash').value);
    const gold = sanitizeNumberInput(document.getElementById('zakat-gold').value);
    const trade = sanitizeNumberInput(document.getElementById('zakat-trade').value);
    const debts = sanitizeNumberInput(document.getElementById('zakat-debts').value);

    const total = Math.max(0, (cash + gold + trade) - debts);
    const zakat = total * 0.025;
    document.getElementById('zakat-result-value').textContent = zakat.toLocaleString('ar-EG', { maximumFractionDigits: 2 });
}

// السبحة الإلكترونية
const tasbihPhrases = [
    { text: 'سُبْحَانَ اللَّهِ', target: 33 },
    { text: 'الْحَمْدُ لِلَّهِ', target: 33 },
    { text: 'اللَّهُ أَكْبَرُ', target: 34 },
    { text: 'أَسْتَغْفِرُ اللَّهَ', target: 100 },
    { text: 'لَا إِلَهَ إِلَّا اللَّهُ', target: 100 }
];
let tasbihIndex = 0;
let tasbihCount = 0;

function renderTasbihSelector() {
    const row = document.getElementById('tasbih-select-row');
    row.innerHTML = '';
    tasbihPhrases.forEach((p, i) => {
        const btn = document.createElement('button');
        btn.textContent = p.text;
        if (i === tasbihIndex) btn.classList.add('active');
        btn.onclick = () => {
            tasbihIndex = i;
            tasbihCount = 0;
            updateTasbihDisplay();
            renderTasbihSelector();
        };
        row.appendChild(btn);
    });
}

function updateTasbihDisplay() {
    document.getElementById('tasbih-current-text').textContent = tasbihPhrases[tasbihIndex].text;
    document.getElementById('tasbih-target').textContent = tasbihPhrases[tasbihIndex].target;
    document.getElementById('tasbih-count').textContent = tasbihCount;
}

function incrementTasbih() {
    tasbihCount++;
    if (tasbihCount >= tasbihPhrases[tasbihIndex].target) {
        showToast('أتممت العدد، تقبل الله منك');
        if (navigator.vibrate) navigator.vibrate(80);
    }
    updateTasbihDisplay();
}

function resetTasbih() {
    tasbihCount = 0;
    updateTasbihDisplay();
}

document.getElementById('mini-cal-prev')?.addEventListener('click', () => shiftMiniCalendarMonth(-1));
document.getElementById('mini-cal-next')?.addEventListener('click', () => shiftMiniCalendarMonth(1));

