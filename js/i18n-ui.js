/* ============================================================
   قاموس ترجمة واجهة الموقع (الترويسة، القائمة، عناوين الأقسام)
   يشمل النصوص الثابتة في واجهة الاستخدام فقط، ولا يشمل النصوص
   الدينية المصدرية (القرآن، الحديث، التفسير، الفتاوى، الأذكار)
   التي تبقى بالعربية حفاظًا على دقتها.
============================================================ */
const I18N_DICT = {
    ar: {
        page_title: "منصة القرآن والسنة | المنصة الإسلامية الشاملة",
        player_title: "منصة القرآن والسنة",
        logo_part1: "منصة", logo_part2: "القرآن والسنة",
        logo_subtitle: "المنصة الإسلامية الشاملة والمتطورة",
        nav_home: "الرئيسية", nav_quran: "القرآن الكريم", nav_tafseer: "التفسير",
        nav_hadith: "الحديث", nav_azkar: "الأذكار", nav_fatwa: "الفتاوى",
        nav_rafiq: "الرفيق الروحي", nav_murshid: "مرشد", nav_radio: "الإذاعات", nav_sounds: "مواعظ", nav_alerts: "التنبيهات", nav_about: "من نحن", nav_account: "حسابي",
        hero_badge: "المنصة الرقمية المتطورة لعام 2026",
        hero_title: "وَرَتِّلِ الْقُرْآنَ تَرْتِيلًا",
        hero_desc: "استمتع بتجربة إسلامية متكاملة تدمج أروع التلاوات الصوتية، موسوعة الأحاديث النبوية، الأذكار التفاعلية الذكية، ومواقيت الصلاة.",
        hero_btn: "ابدأ تلاوة القرآن",
        title_prayer_times: "مواقيت الصلاة اليومية والعداد المباشر",
        title_hadith_today: "حديث اليوم", title_daily_message: "الرسالة اليومية",
        title_calendar: "التقويم الهجري والميلادي", title_on_this_day: "حدث في مثل هذا اليوم الهجري",
        title_modern_services: "خدمات إسلامية حديثة",
        title_quran: "القرآن الكريم (جميع القراء والسور وأشهر القراءات)",
        title_tafseer: "موسوعة التفسير الشامل والتدبر",
        title_hadith_encyclopedia: "موسوعة الأحاديث النبوية الشريفة الشاملة",
        title_azkar: "حصن المسلم - الأذكار والأدعية الكاملة",
        title_fatwa: "فتاوى وأحكام شرعية", title_rafiq: "الرفيق الروحي التكيفي",
        title_murshid: "مرشد - مساعدك الإسلامي الذكي",
        title_radio: "إذاعات القرآن الكريم المباشرة", title_sounds: "مواعظ", title_alerts: "التنبيهات", title_about: "من نحن"
    },
    en: {
        page_title: "Quran & Sunnah Platform | The Comprehensive Islamic Platform",
        player_title: "Quran & Sunnah Platform",
        logo_part1: "Quran &", logo_part2: "Sunnah Platform",
        logo_subtitle: "The Comprehensive, Advanced Islamic Platform",
        nav_home: "Home", nav_quran: "The Noble Qur'an", nav_tafseer: "Tafseer",
        nav_hadith: "Hadith", nav_azkar: "Adhkar", nav_fatwa: "Fatwas",
        nav_rafiq: "Spiritual Companion", nav_murshid: "Murshid", nav_radio: "Radio Stations", nav_sounds: "Sermons", nav_alerts: "Alerts", nav_about: "About Us", nav_account: "My Account",
        hero_badge: "The Advanced Digital Platform for 2026",
        hero_title: "And recite the Qur'an with slow, measured recitation.",
        hero_desc: "Enjoy a complete Islamic experience combining beautiful recitations, an encyclopedia of Prophetic Hadith, smart interactive Adhkar, and prayer times.",
        hero_btn: "Start Reciting the Qur'an",
        title_prayer_times: "Daily Prayer Times & Live Countdown",
        title_hadith_today: "Hadith of the Day", title_daily_message: "Daily Message",
        title_calendar: "Hijri & Gregorian Calendar", title_on_this_day: "On This Day in Islamic History",
        title_modern_services: "Modern Islamic Services",
        title_quran: "The Noble Qur'an (All Reciters, Surahs & Popular Recitations)",
        title_tafseer: "Comprehensive Tafseer & Reflection Encyclopedia",
        title_hadith_encyclopedia: "Comprehensive Encyclopedia of Prophetic Hadith",
        title_azkar: "Fortress of the Muslim - Complete Adhkar & Supplications",
        title_fatwa: "Fatwas & Islamic Rulings", title_rafiq: "Adaptive Spiritual Companion",
        title_murshid: "Murshid - Your Smart Islamic Assistant",
        title_radio: "Live Qur'an Radio Stations", title_sounds: "Sermons", title_alerts: "Alerts", title_about: "About Us"
    },
    fr: {
        page_title: "Plateforme du Coran et de la Sunna | La plateforme islamique complète",
        player_title: "Plateforme du Coran et de la Sunna",
        logo_part1: "Plateforme du", logo_part2: "Coran et de la Sunna",
        logo_subtitle: "La plateforme islamique complète et avancée",
        nav_home: "Accueil", nav_quran: "Le Noble Coran", nav_tafseer: "Tafsir",
        nav_hadith: "Hadith", nav_azkar: "Invocations", nav_fatwa: "Fatwas",
        nav_rafiq: "Compagnon spirituel", nav_murshid: "Murshid", nav_radio: "Radios", nav_sounds: "Sermons", nav_alerts: "Alertes", nav_about: "À propos", nav_account: "Mon compte",
        hero_badge: "La plateforme numérique avancée pour 2026",
        hero_title: "Et récite le Coran lentement et clairement.",
        hero_desc: "Profitez d'une expérience islamique complète alliant de magnifiques récitations, une encyclopédie du Hadith prophétique, des invocations interactives intelligentes et les horaires de prière.",
        hero_btn: "Commencer la récitation du Coran",
        title_prayer_times: "Horaires de prière quotidiens et compte à rebours en direct",
        title_hadith_today: "Hadith du jour", title_daily_message: "Message du jour",
        title_calendar: "Calendrier hégirien et grégorien", title_on_this_day: "Ce jour dans l'histoire islamique",
        title_modern_services: "Services islamiques modernes",
        title_quran: "Le Noble Coran (tous les récitateurs, sourates et récitations populaires)",
        title_tafseer: "Encyclopédie complète du Tafsir et de la méditation",
        title_hadith_encyclopedia: "Encyclopédie complète du Hadith prophétique",
        title_azkar: "Forteresse du musulman - Invocations et supplications complètes",
        title_fatwa: "Fatwas et jugements islamiques", title_rafiq: "Compagnon spirituel adaptatif",
        title_murshid: "Murshid - Votre assistant islamique intelligent",
        title_radio: "Radios coraniques en direct", title_sounds: "Sermons", title_alerts: "Alertes", title_about: "À propos de nous"
    },
    es: {
        page_title: "Plataforma del Corán y la Sunna | La plataforma islámica integral",
        player_title: "Plataforma del Corán y la Sunna",
        logo_part1: "Plataforma del", logo_part2: "Corán y la Sunna",
        logo_subtitle: "La plataforma islámica integral y avanzada",
        nav_home: "Inicio", nav_quran: "El Sagrado Corán", nav_tafseer: "Tafsir",
        nav_hadith: "Hadiz", nav_azkar: "Adhkar", nav_fatwa: "Fatuas",
        nav_rafiq: "Compañero espiritual", nav_murshid: "Murshid", nav_radio: "Radios", nav_sounds: "Sermones", nav_alerts: "Alertas", nav_about: "Sobre nosotros", nav_account: "Mi cuenta",
        hero_badge: "La plataforma digital avanzada para 2026",
        hero_title: "Y recita el Corán con calma y claridad.",
        hero_desc: "Disfruta de una experiencia islámica completa que combina hermosas recitaciones, una enciclopedia del Hadiz profético, adhkar interactivos inteligentes y los horarios de oración.",
        hero_btn: "Comenzar a recitar el Corán",
        title_prayer_times: "Horarios de oración diarios y cuenta regresiva en vivo",
        title_hadith_today: "Hadiz del día", title_daily_message: "Mensaje diario",
        title_calendar: "Calendario hégira y gregoriano", title_on_this_day: "En este día en la historia islámica",
        title_modern_services: "Servicios islámicos modernos",
        title_quran: "El Sagrado Corán (todos los recitadores, suras y recitaciones populares)",
        title_tafseer: "Enciclopedia completa de Tafsir y reflexión",
        title_hadith_encyclopedia: "Enciclopedia completa del Hadiz profético",
        title_azkar: "Fortaleza del musulmán - Adhkar y súplicas completas",
        title_fatwa: "Fatuas y sentencias islámicas", title_rafiq: "Compañero espiritual adaptativo",
        title_murshid: "Murshid - Tu asistente islámico inteligente",
        title_radio: "Radios coránicas en vivo", title_sounds: "Sermones", title_alerts: "Alertas", title_about: "Sobre nosotros"
    },
    de: {
        page_title: "Koran- und Sunna-Plattform | Die umfassende islamische Plattform",
        player_title: "Koran- und Sunna-Plattform",
        logo_part1: "Koran- und", logo_part2: "Sunna-Plattform",
        logo_subtitle: "Die umfassende und fortschrittliche islamische Plattform",
        nav_home: "Startseite", nav_quran: "Der edle Koran", nav_tafseer: "Tafsir",
        nav_hadith: "Hadith", nav_azkar: "Adhkar", nav_fatwa: "Fatwas",
        nav_rafiq: "Spiritueller Begleiter", nav_murshid: "Murshid", nav_radio: "Radiosender", nav_sounds: "Predigten", nav_alerts: "Hinweise", nav_about: "Über uns", nav_account: "Mein Konto",
        hero_badge: "Die fortschrittliche digitale Plattform für 2026",
        hero_title: "Und trage den Koran in klarer, gemessener Weise vor.",
        hero_desc: "Genießen Sie ein umfassendes islamisches Erlebnis mit wunderschönen Rezitationen, einer Enzyklopädie der prophetischen Hadithe, intelligenten interaktiven Adhkar und Gebetszeiten.",
        hero_btn: "Koranrezitation beginnen",
        title_prayer_times: "Tägliche Gebetszeiten & Live-Countdown",
        title_hadith_today: "Hadith des Tages", title_daily_message: "Tägliche Botschaft",
        title_calendar: "Hidschri- und gregorianischer Kalender", title_on_this_day: "An diesem Tag in der islamischen Geschichte",
        title_modern_services: "Moderne islamische Dienste",
        title_quran: "Der edle Koran (alle Rezitatoren, Suren und beliebte Rezitationen)",
        title_tafseer: "Umfassende Enzyklopädie für Tafsir und Reflexion",
        title_hadith_encyclopedia: "Umfassende Enzyklopädie der prophetischen Hadithe",
        title_azkar: "Festung des Muslims - Vollständige Adhkar und Bittgebete",
        title_fatwa: "Fatwas und islamische Urteile", title_rafiq: "Adaptiver spiritueller Begleiter",
        title_murshid: "Murshid - Dein intelligenter islamischer Assistent",
        title_radio: "Live-Koran-Radiosender", title_sounds: "Predigten", title_alerts: "Hinweise", title_about: "Über uns"
    },
    zh: {
        page_title: "古兰经与圣训平台 | 全面的伊斯兰平台",
        player_title: "古兰经与圣训平台",
        logo_part1: "古兰经与", logo_part2: "圣训平台",
        logo_subtitle: "全面而先进的伊斯兰平台",
        nav_home: "首页", nav_quran: "古兰经", nav_tafseer: "古兰经注释",
        nav_hadith: "圣训", nav_azkar: "祈颂词", nav_fatwa: "教法判例",
        nav_rafiq: "心灵伙伴", nav_murshid: "穆尔希德", nav_radio: "电台", nav_sounds: "讲道", nav_alerts: "提醒", nav_about: "关于我们", nav_account: "我的账户",
        hero_badge: "2026年先进数字平台",
        hero_title: "你应当从容不迫地诵读古兰经。",
        hero_desc: "享受完整的伊斯兰体验,融合优美的诵读、圣训百科全书、智能互动祈颂词和礼拜时间。",
        hero_btn: "开始诵读古兰经",
        title_prayer_times: "每日礼拜时间与实时倒计时",
        title_hadith_today: "每日圣训", title_daily_message: "每日寄语",
        title_calendar: "伊斯兰历与公历日历", title_on_this_day: "伊斯兰历史上的今天",
        title_modern_services: "现代伊斯兰服务",
        title_quran: "古兰经(所有诵读者、章节及著名读法)",
        title_tafseer: "全面的古兰经注释与思考百科",
        title_hadith_encyclopedia: "全面的圣训百科全书",
        title_azkar: "穆斯林堡垒 - 完整的祈颂词与祈祷词",
        title_fatwa: "教法判例与伊斯兰裁决", title_rafiq: "自适应心灵伙伴",
        title_murshid: "穆尔希德 - 您的智能伊斯兰助手",
        title_radio: "古兰经实时电台", title_sounds: "讲道", title_alerts: "提醒", title_about: "关于我们"
    },
    ru: {
        page_title: "Платформа Корана и Сунны | Всеобъемлющая исламская платформа",
        player_title: "Платформа Корана и Сунны",
        logo_part1: "Платформа Корана", logo_part2: "и Сунны",
        logo_subtitle: "Всеобъемлющая и современная исламская платформа",
        nav_home: "Главная", nav_quran: "Благородный Коран", nav_tafseer: "Тафсир",
        nav_hadith: "Хадисы", nav_azkar: "Азкары", nav_fatwa: "Фетвы",
        nav_rafiq: "Духовный спутник", nav_murshid: "Муршид", nav_radio: "Радиостанции", nav_sounds: "Проповеди", nav_alerts: "Уведомления", nav_about: "О нас", nav_account: "Мой аккаунт",
        hero_badge: "Современная цифровая платформа на 2026 год",
        hero_title: "И читай Коран размеренно и чётко.",
        hero_desc: "Насладитесь всесторонним исламским опытом, объединяющим прекрасные чтения, энциклопедию пророческих хадисов, умные интерактивные азкары и время молитв.",
        hero_btn: "Начать чтение Корана",
        title_prayer_times: "Ежедневное время молитв и таймер обратного отсчёта",
        title_hadith_today: "Хадис дня", title_daily_message: "Послание дня",
        title_calendar: "Хиджри и григорианский календарь", title_on_this_day: "Этот день в исламской истории",
        title_modern_services: "Современные исламские услуги",
        title_quran: "Благородный Коран (все чтецы, суры и популярные чтения)",
        title_tafseer: "Полная энциклопедия тафсира и размышлений",
        title_hadith_encyclopedia: "Полная энциклопедия пророческих хадисов",
        title_azkar: "Крепость мусульманина - полные азкары и мольбы",
        title_fatwa: "Фетвы и исламские постановления", title_rafiq: "Адаптивный духовный спутник",
        title_murshid: "Муршид - ваш умный исламский помощник",
        title_radio: "Прямые трансляции коранических радиостанций", title_sounds: "Проповеди", title_alerts: "Уведомления", title_about: "О нас"
    }
};

function applyTranslations(lang) {
    const dict = I18N_DICT[lang] || I18N_DICT.ar;
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key]) el.textContent = dict[key];
    });
}

function changeLanguage(lang) {
    if (!I18N_DICT[lang]) lang = 'ar';
    // تغيير لغة المحتوى فقط - الاتجاه RTL يبقى ثابتاً دائماً
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', 'rtl'); // الواجهة ثابتة RTL دائماً
    applyTranslations(lang);
    try { localStorage.setItem('site-lang', lang); } catch (e) {}
    document.getElementById('lang-menu')?.classList.remove('show');
    setTimeout(() => { if (typeof refreshAllScrollHints === 'function') refreshAllScrollHints(); }, 150);
}

(function initLanguage() {
    let savedLang = 'ar';
    try { savedLang = localStorage.getItem('site-lang') || 'ar'; } catch (e) {}
    if (savedLang !== 'ar') changeLanguage(savedLang);
})();

function showToast(msg) {
    const toast = document.getElementById('toast');
    toast.textContent = msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 2500);
}

const audio = document.getElementById('audio-element');
const playBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const progressFill = document.getElementById('progress-fill');
const globalAudioPlayer = document.querySelector('.global-audio-player');

// إظهار شريط المشغل العائم فقط أثناء وجود مقطع صوتي قيد التشغيل أو الإيقاف المؤقت
// (يختفي تمامًا عند الإيقاف الكامل حتى تبقى الواجهة نظيفة وجميلة)
// + يظهر الشريط حصريًا داخل قسم "القرآن الكريم" فقط، حتى تبقى بقية صفحات
// الموقع نظيفة وواضحة (خاصة على شاشات الهواتف)، بينما يستمر الصوت بالتشغيل
// في الخلفية ويمكن التحكم به عبر عناصر التحكم في شاشة القفل (Media Session).
let audioSessionActive = false;

function isQuranPageActive() {
    const quranPage = document.getElementById('page-quran');
    const soundsPage = document.getElementById('page-sounds');
    const radioPage = document.getElementById('page-radio');
    return !!((quranPage && quranPage.classList.contains('active-page')) || (soundsPage && soundsPage.classList.contains('active-page')) || (radioPage && radioPage.classList.contains('active-page')));
}

