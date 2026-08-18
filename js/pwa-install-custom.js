/* ============================================================
   إضافة مستقلة: تثبيت الموقع (PWA) — منصة القرآن والسنة
   ------------------------------------------------------------
   ملف واحد مستقل تمامًا (كود + تنسيقات مُضمّنة ذاتيًا)، لا يعدّل
   ولا يحذف ولا يستبدل أي سطر من الأكواد الحالية في المشروع
   (index.html / core.js / home-services.js / css/style.css ...)
   بما في ذلك قسم "المواعظ" وكل الأقسام الأخرى — تبقى كما هي 100%.

   طريقة التضمين (سطر واحد فقط يُضاف قبل إغلاق </body>، بعد باقي
   الأسكربتات، بدون حذف أو تعديل أي سطر موجود):

       <script src="js/pwa-install-custom.js" defer></script>

   ما الذي يفعله:
   • أندرويد 11 فأحدث : بانر "تثبيت التطبيق" يظهر فورًا عند فتح
                        الصفحة، وزر "تثبيت" يشغّل مربع التثبيت
                        الأصلي (تطبيق ويب PWA حقيقي).
   • أندرويد 10 فأقل  : بانر إرشادي فقط "إضافة اختصار للموقع" — لا
                        يُشغّل تثبيت PWA/WebAPK إطلاقًا، بل يستبدل
                        (في المتصفح وقت التشغيل فقط، دون لمس ملف
                        manifest.json الأصلي) وضع العرض إلى "browser"
                        كي تُنشئ "إضافة إلى الشاشة الرئيسية" اختصارًا
                        عاديًا يفتح داخل المتصفح، وليس تطبيقًا مستقلًا.
   • تمييز الإصدار (11+ أو 10 فأقل) يعتمد على User-Agent Client
     Hints (الإصدار الحقيقي للنظام)، وليس على User-Agent النصي وحده
     لأن Chrome الحديث "يُجمّد" رقم الإصدار داخله لأسباب خصوصية.
   • حاسوب (Desktop)  : زر أيقونة صغير يظهر فورًا عند فتح الصفحة
                        (بدون بانر نصي جانبي).
   • آيفون / آيباد    : بانر إرشادي بخطوات "مشاركة ← إضافة للشاشة".
   • الإشعار/البانر يظهر في كل مرة تُفتح فيها الصفحة، إلى أن يتم
     التثبيت فعليًا.
   • جميع العناصر متجاوبة بالكامل (Fully Responsive) عبر media
     queries و clamp() لأي حجم شاشة، ومع مسافة آمنة لأجهزة الشق
     السفلي (safe-area-inset-bottom).

   ملاحظة هامة: نظرًا لوجود بانر تثبيت عام قديم في الكود الحالي
   (#pwa-install-banner) لا يفرّق بين أندرويد/حاسوب/إصدارات، ولتفادي
   ظهور بانرين معًا لنفس الحدث، يقوم هذا الملف بإخفائه *بصريًا فقط*
   عبر CSS (دون حذف أو تعديل أي سطر من كوده الأصلي في index.html
   أو home-services.js أو style.css — تبقى شغّالة تمامًا كما هي).
   إن رغبتم بإبقاء البانر القديم ظاهرًا أيضًا، يكفي حذف السطر الذي
   يحتوي على "إخفاء البانر العام القديم" أدناه فقط.
============================================================ */
(function () {
    'use strict';

    if (window.__pwaInstallCustomInit) return;
    window.__pwaInstallCustomInit = true;

    var LS = {
        androidApp: 'pwaCustom_dismiss_androidApp',
        androidShortcut: 'pwaCustom_dismiss_androidShortcut',
        ios: 'pwaCustom_dismiss_ios',
        desktop: 'pwaCustom_dismiss_desktop'
    };

    /* بحسب الطلب: يظهر الإشعار في كل مرة يُفتح فيها الموقع (كل تحميل/
       دخول للمتصفح)، وليس مرة واحدة فقط — إلى أن يتم التثبيت فعليًا.
       زر الإغلاق (X) يُخفي الإشعار للجلسة الحالية فقط، ولا يحفظ أي
       تفضيل دائم يمنع ظهوره في المرة القادمة. */
    function isDismissed() { return false; }
    function setDismissed() {}

    function isStandaloneApp() {
        return window.matchMedia('(display-mode: standalone)').matches ||
            window.navigator.standalone === true;
    }

    function detectPlatform() {
        var ua = navigator.userAgent || '';
        var isIpadOS13Plus = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
        var isIOS = (/iPad|iPhone|iPod/.test(ua) && !window.MSStream) || isIpadOS13Plus;
        var androidMatch = ua.match(/Android\s+([0-9]+)/i);
        var isAndroid = /Android/i.test(ua);
        var androidVersion = androidMatch ? parseInt(androidMatch[1], 10) : null;
        var isMobileUA = /Mobi|Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(ua);
        var isDesktop = !isIOS && !isAndroid && !isMobileUA;
        return { isIOS: isIOS, isAndroid: isAndroid, androidVersion: androidVersion, isDesktop: isDesktop };
    }

    /* Chrome الحديث على أندرويد "يُجمّد" رقم إصدار النظام داخل
       navigator.userAgent (يُظهر غالبًا "10" ثابتة بصرف النظر عن
       الإصدار الحقيقي، لأسباب خصوصية User-Agent Reduction). لذلك
       لا يمكن الاعتماد على الـ UA النصي وحده لتمييز أندرويد 11+ عن
       10 فأقل بدقة. الحل: طلب الإصدار الحقيقي عبر User-Agent Client
       Hints (navigator.userAgentData) عندما تكون متوفرة (Chromium)،
       والرجوع للـ UA النصي فقط كحل احتياطي إن لم تكن متوفرة. */
    function getAccurateAndroidVersion() {
        return new Promise(function (resolve) {
            try {
                if (navigator.userAgentData && typeof navigator.userAgentData.getHighEntropyValues === 'function') {
                    navigator.userAgentData.getHighEntropyValues(['platformVersion']).then(function (data) {
                        if (navigator.userAgentData.platform === 'Android' && data && data.platformVersion) {
                            var v = parseInt(String(data.platformVersion).split('.')[0], 10);
                            resolve(isNaN(v) ? null : v);
                        } else {
                            resolve(null);
                        }
                    }).catch(function () { resolve(null); });
                } else {
                    resolve(null);
                }
            } catch (e) { resolve(null); }
        });
    }

    var platform = detectPlatform();

    /* ---------------- الأنماط (CSS) — مُضمّنة ذاتيًا داخل الملف ---------------- */
    function injectStyles() {
        if (document.getElementById('pwa-install-custom-style')) return;
        var css = ''
            /* إخفاء البانر العام القديم بصريًا فقط لتفادي ظهور بانرين معًا
               (لا حذف ولا تعديل لأي سطر من كوده الأصلي) */
            + '#pwa-install-banner,#ios-install-banner{display:none !important;}'
            + '.pwaic-banner{position:fixed;left:12px;right:12px;bottom:-200px;z-index:99999;'
            + 'max-width:520px;margin:0 auto;box-sizing:border-box;'
            + 'background:var(--bg-glass,rgba(15,23,42,.92));backdrop-filter:blur(14px);'
            + '-webkit-backdrop-filter:blur(14px);border:1px solid var(--primary,#10b981);'
            + 'border-radius:16px;padding:14px 16px;display:flex;align-items:center;'
            + 'gap:12px;box-shadow:var(--shadow,0 8px 32px rgba(0,0,0,.35));'
            + 'font-family:var(--font-main,"Cairo",sans-serif);color:var(--text-main,#f1f5f9);'
            + 'transition:bottom .4s cubic-bezier(.175,.885,.32,1.275);'
            + 'padding-bottom:calc(14px + env(safe-area-inset-bottom,0px));}'
            + '.pwaic-banner.pwaic-show{bottom:16px;}'
            + '.pwaic-icon{flex-shrink:0;width:34px;height:34px;border-radius:10px;'
            + 'display:flex;align-items:center;justify-content:center;font-size:1.1rem;'
            + 'background:var(--glow,rgba(16,185,129,.2));color:var(--primary,#10b981);}'
            + '.pwaic-body{flex:1 1 auto;min-width:0;}'
            + '.pwaic-title{font-size:clamp(.78rem,2.6vw,.9rem);font-weight:800;line-height:1.5;}'
            + '.pwaic-sub{font-size:clamp(.68rem,2.2vw,.78rem);color:var(--text-muted,#94a3b8);'
            + 'margin-top:2px;line-height:1.6;}'
            + '.pwaic-actions{display:flex;align-items:center;gap:8px;flex-shrink:0;}'
            + '.pwaic-btn{border:none;cursor:pointer;border-radius:10px;font-weight:800;'
            + 'font-family:inherit;font-size:clamp(.72rem,2.2vw,.82rem);padding:8px 14px;'
            + 'background:var(--primary,#10b981);color:#fff;white-space:nowrap;}'
            + '.pwaic-btn:active{transform:scale(.96);}'
            + '.pwaic-close{background:none;border:none;cursor:pointer;color:var(--text-muted,#94a3b8);'
            + 'font-size:1rem;width:26px;height:26px;flex-shrink:0;display:flex;'
            + 'align-items:center;justify-content:center;}'
            + '@media (max-width:480px){'
            + '.pwaic-banner{flex-wrap:wrap;text-align:center;justify-content:center;left:8px;right:8px;padding:12px;position:fixed;}'
            + '.pwaic-body{flex-basis:100%;order:1;}'
            + '.pwaic-icon{order:0;}'
            + '.pwaic-actions{order:2;flex-basis:100%;justify-content:center;margin-top:4px;}'
            + '.pwaic-close{position:absolute;top:6px;insetInlineStart:6px;left:6px;}'
            + '}'
            /* زر تثبيت الحاسوب: أيقونة صغيرة فقط، بلا نص إشعاري جانبي */
            + '.pwaic-desktop-btn{position:fixed;bottom:20px;left:20px;z-index:99999;'
            + 'width:48px;height:48px;border-radius:50%;border:1px solid var(--border-color,rgba(255,255,255,.12));'
            + 'background:var(--bg-glass,rgba(15,23,42,.92));backdrop-filter:blur(10px);'
            + 'color:var(--primary,#10b981);font-size:1.15rem;display:flex;align-items:center;'
            + 'justify-content:center;cursor:pointer;box-shadow:var(--shadow,0 8px 24px rgba(0,0,0,.3));'
            + 'opacity:0;transform:translateY(12px) scale(.9);pointer-events:none;'
            + 'transition:opacity .35s ease,transform .35s ease;}'
            + '.pwaic-desktop-btn.pwaic-show{opacity:1;transform:translateY(0) scale(1);pointer-events:auto;}'
            + '.pwaic-desktop-btn:hover{color:#fff;background:var(--primary,#10b981);}'
            + '@media (max-width:640px){.pwaic-desktop-btn{display:none;}}'
            + '.pwaic-ios .pwaic-title{line-height:1.7;}'
            /* توست إرشادي مؤقت عند الضغط على زر التثبيت قبل جاهزية مربع
               التثبيت الأصلي من المتصفح */
            + '.pwaic-toast{position:fixed;left:12px;right:12px;bottom:-120px;'
            + 'max-width:480px;margin:0 auto;z-index:100000;box-sizing:border-box;'
            + 'background:var(--bg-glass,rgba(15,23,42,.95));color:var(--text-main,#f1f5f9);'
            + 'border:1px solid var(--primary,#10b981);border-radius:14px;'
            + 'padding:12px 16px;font-family:var(--font-main,"Cairo",sans-serif);'
            + 'font-size:clamp(.72rem,2.2vw,.82rem);font-weight:700;text-align:center;'
            + 'line-height:1.7;box-shadow:var(--shadow,0 8px 32px rgba(0,0,0,.35));'
            + 'transition:bottom .35s ease;'
            + 'padding-bottom:calc(12px + env(safe-area-inset-bottom,0px));}'
            + '.pwaic-toast.pwaic-show{bottom:16px;}';
        var style = document.createElement('style');
        style.id = 'pwa-install-custom-style';
        style.textContent = css;
        document.head.appendChild(style);
    }

    function showEl(el) { requestAnimationFrame(function () { el.classList.add('pwaic-show'); }); }
    function hideEl(el) { el.classList.remove('pwaic-show'); }

    function buildBanner(opts) {
        var wrap = document.createElement('div');
        wrap.id = opts.id;
        wrap.className = 'pwaic-banner' + (opts.extraClass ? ' ' + opts.extraClass : '');
        wrap.setAttribute('role', 'dialog');
        wrap.setAttribute('aria-live', 'polite');
        wrap.innerHTML =
            '<div class="pwaic-icon"><i class="fa-solid ' + opts.icon + '"></i></div>' +
            '<div class="pwaic-body">' +
                '<div class="pwaic-title">' + opts.title + '</div>' +
                (opts.sub ? '<div class="pwaic-sub">' + opts.sub + '</div>' : '') +
            '</div>' +
            '<div class="pwaic-actions">' +
                (opts.btnText ? '<button type="button" class="pwaic-btn" data-action="install">' + opts.btnText + '</button>' : '') +
                '<button type="button" class="pwaic-close" aria-label="إغلاق"><i class="fa-solid fa-xmark"></i></button>' +
            '</div>';
        document.body.appendChild(wrap);

        wrap.querySelector('.pwaic-close').addEventListener('click', function () {
            hideEl(wrap);
            setDismissed(opts.dismissKey);
        });
        if (opts.btnText) {
            wrap.querySelector('[data-action="install"]').addEventListener('click', function () {
                hideEl(wrap);
                setDismissed(opts.dismissKey);
                if (typeof opts.onInstall === 'function') opts.onInstall();
            });
        }
        return wrap;
    }

    /* ---------------- منطق التثبيت الفعلي عبر المتصفح ---------------- */
    var deferredPrompt = null;

    window.addEventListener('beforeinstallprompt', function (e) {
        e.preventDefault();
        /* نلتقط حدث المتصفح فقط لتفعيل زر "تثبيت" الحقيقي متى ما توفر،
           لكن ظهور البانر نفسه لا يعتمد على هذا الحدث إطلاقًا (انظر
           أدناه) — فالبانر يظهر فورًا عند فتح الصفحة في كل الحالات. */
        if (platform.isDesktop || (platform.isAndroid && (platform.androidVersion === null || platform.androidVersion >= 11))) {
            deferredPrompt = e;
        }
    });

    window.addEventListener('appinstalled', function () {
        deferredPrompt = null;
        ['pwaic-android-app', 'pwaic-android-shortcut', 'pwaic-desktop-btn'].forEach(function (id) {
            var el = document.getElementById(id);
            if (el) el.remove();
        });
    });

    /* ---------------- توست إرشادي مؤقت (عندما لا يتوفر بعد مربع
       التثبيت الأصلي من المتصفح لحظة الضغط، فنوجّه المستخدم يدويًا) ---------------- */
    function showFallbackToast(message) {
        injectStyles();
        var old = document.getElementById('pwaic-toast');
        if (old) old.remove();
        var toast = document.createElement('div');
        toast.id = 'pwaic-toast';
        toast.className = 'pwaic-toast';
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(function () { toast.classList.add('pwaic-show'); });
        setTimeout(function () {
            toast.classList.remove('pwaic-show');
            setTimeout(function () { toast.remove(); }, 400);
        }, 4200);
    }

    function triggerNativePrompt(fallbackMessage) {
        if (deferredPrompt) {
            var p = deferredPrompt;
            deferredPrompt = null;
            p.prompt();
            p.userChoice.finally(function () { deferredPrompt = null; });
        } else {
            showFallbackToast(fallbackMessage);
        }
    }

    function showAndroidAppBanner() {
        if (isDismissed(LS.androidApp) || document.getElementById('pwaic-android-app')) return;
        var el = buildBanner({
            id: 'pwaic-android-app',
            icon: 'fa-mobile-screen-button',
            title: 'ثبّت تطبيق «القرآن والسنة» على جهازك',
            sub: 'تصفح أسرع وتجربة كاملة تعمل حتى دون اتصال بالإنترنت',
            btnText: 'تثبيت التطبيق',
            dismissKey: LS.androidApp,
            onInstall: function () {
                triggerNativePrompt('افتح قائمة المتصفح (⋮) ثم اختر "تثبيت التطبيق" أو "إضافة إلى الشاشة الرئيسية"');
            }
        });
        showEl(el);
    }

    /* لأندرويد 10 فأقل فقط: نستبدل رابط الـ manifest المُحمَّل في
       المتصفح مؤقتًا (في الذاكرة فقط، عبر JS — دون أي تعديل لملف
       manifest.json الأصلي على القرص) بنسخة "اختصار" بسيطة
       (display:"browser") بدل النسخة الأصلية (display:"standalone").
       هذا يضمن أن خيار "إضافة إلى الشاشة الرئيسية" من قائمة المتصفح
       ينشئ اختصارًا عاديًا يفتح الموقع داخل المتصفح (وليس تطبيقًا
       مستقلًا بواجهة خاصة)، ويتفادى أي مشاكل تشغيل قد تحدث مع وضع
       "standalone" على بعض الأجهزة القديمة. */
    function useShortcutManifestForOldAndroid() {
        try {
            var link = document.querySelector('link[rel="manifest"]');
            if (!link || link.dataset.pwaicShortcutApplied) return;
            var pageTitle = (document.title || 'الموقع').trim();
            var shortcutManifest = {
                name: pageTitle,
                short_name: pageTitle,
                start_url: location.origin + location.pathname + location.search,
                display: 'browser',
                icons: [
                    { src: new URL('icon-192.png', document.baseURI).href, sizes: '192x192', type: 'image/png' },
                    { src: new URL('icon-512.png', document.baseURI).href, sizes: '512x512', type: 'image/png' }
                ]
            };
            var blobUrl = URL.createObjectURL(new Blob([JSON.stringify(shortcutManifest)], { type: 'application/json' }));
            link.setAttribute('href', blobUrl);
            link.dataset.pwaicShortcutApplied = '1';
        } catch (e) {}
    }

    /* بانر إرشادي فقط لأندرويد 10 فأقل — لا يُشغّل تثبيت PWA/WebAPK
       إطلاقًا، ولا يستخدم deferredPrompt/beforeinstallprompt نهائيًا،
       بل يوجّه المستخدم لإضافة اختصار للموقع يدويًا عبر قائمة المتصفح،
       بشكل متوافق مع جميع المتصفحات والهواتف القديمة. */
    function showAndroidShortcutBanner() {
        if (isDismissed(LS.androidShortcut) || document.getElementById('pwaic-android-shortcut')) return;
        useShortcutManifestForOldAndroid();
        var el = buildBanner({
            id: 'pwaic-android-shortcut',
            icon: 'fa-link',
            title: 'أضف اختصار الموقع إلى شاشتك الرئيسية',
            sub: 'اضغط زر قائمة المتصفح (⋮) أعلى الشاشة، ثم اختر "إضافة إلى الشاشة الرئيسية"',
            dismissKey: LS.androidShortcut,
            extraClass: 'pwaic-ios'
        });
        setTimeout(function () { showEl(el); }, 1200);
    }

    function initLegacyAndroidBanner() {
        if (!platform.isAndroid) return;
        if (platform.androidVersion !== null && platform.androidVersion >= 11) return;
        if (isStandaloneApp()) return;
        injectStyles();
        showAndroidShortcutBanner();
    }

    function initAndroidAppBanner() {
        if (!platform.isAndroid) return;
        if (platform.androidVersion !== null && platform.androidVersion < 11) return;
        if (isStandaloneApp()) return;
        injectStyles();
        showAndroidAppBanner();
    }

    function showDesktopButton() {
        if (isDismissed(LS.desktop) || document.getElementById('pwaic-desktop-btn')) return;
        var btn = document.createElement('button');
        btn.id = 'pwaic-desktop-btn';
        btn.type = 'button';
        btn.className = 'pwaic-desktop-btn';
        btn.title = 'تثبيت الموقع كتطبيق على جهازك';
        btn.setAttribute('aria-label', 'تثبيت الموقع كتطبيق');
        btn.innerHTML = '<i class="fa-solid fa-download"></i>';
        document.body.appendChild(btn);
        btn.addEventListener('click', function () {
            triggerNativePrompt('اضغط أيقونة التثبيت ⊕ في شريط عنوان المتصفح، أو افتح القائمة (⋮) واختر "تثبيت الموقع"');
        });
        showEl(btn);
    }

    function initDesktopButton() {
        if (!platform.isDesktop) return;
        if (isStandaloneApp()) return;
        injectStyles();
        showDesktopButton();
    }

    /* ---------------- آيفون / آيباد: بانر إرشادي يدوي ---------------- */
    function initIosBanner() {
        if (!platform.isIOS) return;
        if (isStandaloneApp()) return;
        if (isDismissed(LS.ios)) return;
        injectStyles();
        var el = buildBanner({
            id: 'pwaic-ios',
            icon: 'fa-arrow-up-from-bracket',
            title: 'لتثبيت التطبيق: اضغط زر المشاركة',
            sub: 'ثم اختر "إضافة إلى الشاشة الرئيسية" لفتح الموقع كتطبيق مستقل',
            dismissKey: LS.ios,
            extraClass: 'pwaic-ios'
        });
        setTimeout(function () { showEl(el); }, 1500);
    }

    window.addEventListener('load', function () {
        injectStyles();
        initIosBanner();
        initDesktopButton();

        if (platform.isAndroid) {
            getAccurateAndroidVersion().then(function (accurateVersion) {
                if (accurateVersion !== null) {
                    /* استبدال الإصدار المُستخرج من UA النصي (قد يكون
                       "مجمّدًا" غير دقيق) بالإصدار الحقيقي من Client Hints */
                    platform.androidVersion = accurateVersion;
                }
                initLegacyAndroidBanner();
                initAndroidAppBanner();
            });
        }
    });
})();
