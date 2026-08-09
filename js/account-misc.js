/* ============================================================
   حساب المستخدم: تسجيل / دخول / خروج، ومزامنة (آخر سورة، آخر
   حديث، المفضلة، الملاحظات) مع الخادم الخلفي عبر ACCOUNT_API_ENDPOINT.
   يعمل الموقع بشكل طبيعي كاملًا دون تسجيل دخول أيضًا (وضع بلا حساب)؛
   هذا القسم إضافة اختيارية فوق كل الميزات الحالية ولا يُبطل شيئًا منها.
============================================================ */
let accountToken = null;
let accountUser = null; // { id, name, email }
let accountData = { favorites: [], notes: [], lastSurah: null, lastHadith: null };
let accountSyncTimer = null;

try {
    accountToken = localStorage.getItem('account_token') || null;
    accountUser = JSON.parse(localStorage.getItem('account_user') || 'null');
} catch (e) {}

function accountHeaders() {
    const h = { 'Content-Type': 'application/json' };
    if (accountToken) h['Authorization'] = 'Bearer ' + accountToken;
    return h;
}

function isLoggedIn() { return !!accountToken; }

async function initAccountSystem() {
    updateAccountButtonUI();
    if (!isLoggedIn()) { renderAccountPage(); return; }
    try {
        const res = await fetch(ACCOUNT_API_ENDPOINT + '/data', { headers: accountHeaders() });
        if (res.status === 401) { accountLogout(true); return; }
        const parsed = await res.json();
        if (res.ok && parsed) {
            accountData = {
                favorites: parsed.favorites || [],
                notes: parsed.notes || [],
                lastSurah: parsed.lastSurah || null,
                lastHadith: parsed.lastHadith || null
            };
        }
    } catch (e) {
        console.log('account-data-fetch-failed', e);
    }
    renderAccountPage();
    updateFavoriteButtonsState();
}

function updateAccountButtonUI() {
    const btn = document.getElementById('account-btn');
    if (!btn) return;
    btn.classList.toggle('logged-in', isLoggedIn());
    btn.title = isLoggedIn() ? ('حسابي: ' + (accountUser?.name || '')) : 'تسجيل الدخول / إنشاء حساب';
}

/* ---------- نافذة تسجيل الدخول / إنشاء الحساب (تستخدم نظام app-modal العام) ---------- */
function openAccountModal() {
    const modalBox = document.getElementById('app-modal-box');
    if (isLoggedIn()) {
        modalBox.innerHTML = `
            <div class="app-modal-header">
                <h3><i class="fa-solid fa-user"></i> حسابي</h3>
                <button class="app-modal-close" onclick="closeAppModal()"><i class="fa-solid fa-xmark"></i></button>
            </div>
            <div class="app-modal-body">
                <div class="account-profile-card">
                    <div class="account-avatar"><i class="fa-solid fa-user"></i></div>
                    <div>
                        <div class="account-name">${escapeHtml(accountUser?.name || '')}</div>
                        <div class="account-email">${escapeHtml(accountUser?.email || '')}</div>
                    </div>
                </div>
                <div class="app-modal-actions">
                    <button class="btn-primary" onclick="closeAppModal(); switchPage('account', null)"><i class="fa-solid fa-gauge"></i> عرض حسابي بالكامل</button>
                    <button class="btn-action" onclick="accountLogout()"><i class="fa-solid fa-right-from-bracket"></i> تسجيل الخروج</button>
                </div>
            </div>`;
        document.getElementById('app-modal-overlay').classList.add('open');
        return;
    }
    modalBox.innerHTML = `
        <div class="app-modal-header">
            <h3><i class="fa-solid fa-user"></i> حسابي</h3>
            <button class="app-modal-close" onclick="closeAppModal()"><i class="fa-solid fa-xmark"></i></button>
        </div>
        <div class="app-modal-body">
            <div class="account-tabs">
                <div class="account-tab active" id="account-tab-login" onclick="switchAccountTab('login')">تسجيل الدخول</div>
                <div class="account-tab" id="account-tab-register" onclick="switchAccountTab('register')">حساب جديد</div>
            </div>
            <form class="account-form" id="account-form-login" onsubmit="return handleAccountLogin(event)">
                <input type="email" id="login-email" placeholder="البريد الإلكتروني" required autocomplete="email">
                <input type="password" id="login-password" placeholder="كلمة المرور" required autocomplete="current-password">
                <div class="account-error" id="login-error"></div>
                <button class="btn-primary" type="submit" style="justify-content:center;"><i class="fa-solid fa-right-to-bracket"></i> دخول</button>
            </form>
            <form class="account-form" id="account-form-register" style="display:none;" onsubmit="return handleAccountRegister(event)">
                <input type="text" id="register-name" placeholder="الاسم" required minlength="2" maxlength="60">
                <input type="email" id="register-email" placeholder="البريد الإلكتروني" required autocomplete="email">
                <input type="password" id="register-password" placeholder="كلمة المرور (٦ أحرف على الأقل)" required minlength="6" autocomplete="new-password">
                <div class="account-error" id="register-error"></div>
                <button class="btn-primary" type="submit" style="justify-content:center;"><i class="fa-solid fa-user-plus"></i> إنشاء حساب</button>
            </form>
        </div>`;
    document.getElementById('app-modal-overlay').classList.add('open');
}

function switchAccountTab(tab) {
    document.getElementById('account-tab-login').classList.toggle('active', tab === 'login');
    document.getElementById('account-tab-register').classList.toggle('active', tab === 'register');
    document.getElementById('account-form-login').style.display = tab === 'login' ? 'flex' : 'none';
    document.getElementById('account-form-register').style.display = tab === 'register' ? 'flex' : 'none';
}

async function handleAccountLogin(e) {
    e.preventDefault();
    const email = sanitizeTextInput(document.getElementById('login-email').value, 120);
    const password = document.getElementById('login-password').value;
    const errEl = document.getElementById('login-error');
    errEl.textContent = '';
    try {
        const res = await fetch(ACCOUNT_API_ENDPOINT + '/login', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const parsed = await res.json();
        if (!res.ok || !parsed.token) { errEl.textContent = parsed.error === 'invalid_credentials' ? 'البريد الإلكتروني أو كلمة المرور غير صحيحة' : 'تعذّر تسجيل الدخول، حاول مرة أخرى'; return false; }
        accountToken = parsed.token;
        accountUser = parsed.user;
        try { localStorage.setItem('account_token', accountToken); localStorage.setItem('account_user', JSON.stringify(accountUser)); } catch (e2) {}
        closeAppModal();
        showToast(`مرحبًا بك، ${accountUser.name}`);
        await initAccountSystem();
    } catch (err) {
        errEl.textContent = 'تعذّر الاتصال بالخادم، تحقق من اتصالك وحاول مرة أخرى';
    }
    return false;
}

async function handleAccountRegister(e) {
    e.preventDefault();
    const name = sanitizeTextInput(document.getElementById('register-name').value, 60);
    const email = sanitizeTextInput(document.getElementById('register-email').value, 120);
    const password = document.getElementById('register-password').value;
    const errEl = document.getElementById('register-error');
    errEl.textContent = '';
    if (password.length < 6) { errEl.textContent = 'كلمة المرور يجب ألا تقل عن ٦ أحرف'; return false; }
    try {
        const res = await fetch(ACCOUNT_API_ENDPOINT + '/register', {
            method: 'POST', headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password })
        });
        const parsed = await res.json();
        if (!res.ok || !parsed.token) { errEl.textContent = parsed.error === 'email_taken' ? 'هذا البريد الإلكتروني مستخدم من قبل' : 'تعذّر إنشاء الحساب، حاول مرة أخرى'; return false; }
        accountToken = parsed.token;
        accountUser = parsed.user;
        try { localStorage.setItem('account_token', accountToken); localStorage.setItem('account_user', JSON.stringify(accountUser)); } catch (e2) {}
        closeAppModal();
        showToast(`تم إنشاء حسابك بنجاح، مرحبًا بك ${accountUser.name}`);
        await initAccountSystem();
    } catch (err) {
        errEl.textContent = 'تعذّر الاتصال بالخادم، تحقق من اتصالك وحاول مرة أخرى';
    }
    return false;
}

async function accountLogout(silent) {
    try { if (accountToken) await fetch(ACCOUNT_API_ENDPOINT + '/logout', { method: 'POST', headers: accountHeaders() }); } catch (e) {}
    accountToken = null;
    accountUser = null;
    accountData = { favorites: [], notes: [], lastSurah: null, lastHadith: null };
    try { localStorage.removeItem('account_token'); localStorage.removeItem('account_user'); } catch (e) {}
    updateAccountButtonUI();
    renderAccountPage();
    updateFavoriteButtonsState();
    if (!silent) showToast('تم تسجيل الخروج');
    closeAppModal();
}

/* ---------- مزامنة البيانات مع الخادم (مُهدَّأة/مؤجَّلة قليلًا لتقليل عدد الطلبات) ---------- */
function queueAccountSync() {
    if (!isLoggedIn()) return;
    if (accountSyncTimer) clearTimeout(accountSyncTimer);
    accountSyncTimer = setTimeout(async () => {
        try {
            await fetch(ACCOUNT_API_ENDPOINT + '/data', {
                method: 'PUT', headers: accountHeaders(), body: JSON.stringify(accountData)
            });
        } catch (e) { console.log('account-sync-failed', e); }
    }, 600);
}

/* ---------- المفضلة ---------- */
function isFavorited(type, id) {
    return accountData.favorites.some(f => f.type === type && f.id === id);
}

function toggleFavorite(type, id, title, meta) {
    if (!isLoggedIn()) { showToast('سجّل الدخول أولًا لإضافة عناصر إلى المفضلة'); openAccountModal(); return; }
    const idx = accountData.favorites.findIndex(f => f.type === type && f.id === id);
    if (idx >= 0) {
        accountData.favorites.splice(idx, 1);
        showToast('تمت الإزالة من المفضلة');
    } else {
        accountData.favorites.unshift({ type, id, title, meta: meta || '', addedAt: Date.now() });
        showToast('تمت الإضافة إلى المفضلة');
    }
    queueAccountSync();
    updateFavoriteButtonsState();
    renderAccountFavoritesList();
}

function toggleFavoriteCurrentSurah() {
    if (!accountData.lastSurah) return;
    const s = accountData.lastSurah;
    toggleFavorite('surah', 'surah-' + s.index, `سورة ${s.name}`, s.reciterName || '');
}

function toggleFavoriteCurrentHadith() {
    const titleEl = document.getElementById('hadith-title');
    if (!titleEl || !titleEl.textContent) return;
    const id = 'hadith-' + (document.getElementById('hadith-book-select')?.value || '') + '-' + (currentHadithNum || 1);
    toggleFavorite('hadith', id, titleEl.textContent, '');
}

function updateFavoriteButtonsState() {
    const playerBtn = document.getElementById('player-fav-btn');
    if (playerBtn) {
        if (accountData.lastSurah) {
            playerBtn.style.display = '';
            playerBtn.classList.toggle('active', isFavorited('surah', 'surah-' + accountData.lastSurah.index));
        } else {
            playerBtn.style.display = 'none';
        }
    }
    const hadithBtn = document.getElementById('hadith-fav-btn');
    if (hadithBtn) {
        const id = 'hadith-' + (document.getElementById('hadith-book-select')?.value || '') + '-' + (currentHadithNum || 1);
        hadithBtn.classList.toggle('active', isFavorited('hadith', id));
    }
    if (currentReciter && currentMoshaf && typeof renderSurahsGrid === 'function') {
        renderSurahsGrid(currentReciter, currentMoshaf);
    }
}

function removeFavoriteById(type, id) {
    accountData.favorites = accountData.favorites.filter(f => !(f.type === type && f.id === id));
    queueAccountSync();
    updateFavoriteButtonsState();
    renderAccountFavoritesList();
}

/* ---------- الملاحظات ---------- */
function accountAddNoteFromPage() {
    const input = document.getElementById('account-note-input');
    const text = sanitizeTextInput(input.value, 500);
    if (!text) return;
    if (!isLoggedIn()) { showToast('سجّل الدخول أولًا لإضافة ملاحظات'); openAccountModal(); return; }
    accountData.notes.unshift({ id: 'note-' + Date.now(), text, addedAt: Date.now() });
    input.value = '';
    queueAccountSync();
    renderAccountNotesList();
}

function deleteAccountNote(id) {
    accountData.notes = accountData.notes.filter(n => n.id !== id);
    queueAccountSync();
    renderAccountNotesList();
}

/* ---------- تتبّع "آخر ما تابعته" (يُستدعى من مشغّل السور ومن عارض الحديث) ---------- */
function recordLastSurah(index, name, reciterName) {
    accountData.lastSurah = { index, name, reciterName: reciterName || '', at: Date.now() };
    if (isLoggedIn()) queueAccountSync();
    updateFavoriteButtonsState();
    renderAccountLastRead();
}

function recordLastHadith(book, num, title) {
    accountData.lastHadith = { book, num, title, at: Date.now() };
    if (isLoggedIn()) queueAccountSync();
    updateFavoriteButtonsState();
    renderAccountLastRead();
}

function resumeLastSurah() {
    if (!accountData.lastSurah) return;
    switchPage('quran', null);
    showToast(`استكمل من صفحة القرآن اختيار سورة ${accountData.lastSurah.name}`);
}

function resumeLastHadith() {
    if (!accountData.lastHadith) return;
    switchPage('hadith', null);
    const bookSelect = document.getElementById('hadith-book-select');
    const numInput = document.getElementById('hadith-number-input');
    if (bookSelect) bookSelect.value = accountData.lastHadith.book;
    if (numInput) numInput.value = accountData.lastHadith.num;
    fetchHadithFromApi(accountData.lastHadith.num);
}

/* ---------- عرض صفحة "حسابي" ---------- */
function renderAccountPage() {
    const loggedOutEl = document.getElementById('account-page-logged-out');
    const loggedInEl = document.getElementById('account-page-logged-in');
    if (!loggedOutEl || !loggedInEl) return;
    if (!isLoggedIn()) {
        loggedOutEl.style.display = '';
        loggedInEl.style.display = 'none';
        return;
    }
    loggedOutEl.style.display = 'none';
    loggedInEl.style.display = '';
    document.getElementById('account-page-name').textContent = accountUser?.name || '';
    document.getElementById('account-page-email').textContent = accountUser?.email || '';
    renderAccountLastRead();
    renderAccountFavoritesList();
    renderAccountNotesList();
}

function renderAccountLastRead() {
    const surahVal = document.getElementById('account-last-surah-val');
    const hadithVal = document.getElementById('account-last-hadith-val');
    if (surahVal) surahVal.textContent = accountData.lastSurah ? `سورة ${accountData.lastSurah.name}` : 'لم تستمع إلى شيء بعد';
    if (hadithVal) hadithVal.textContent = accountData.lastHadith ? accountData.lastHadith.title : 'لم تقرأ حديثًا بعد';
}

function renderAccountFavoritesList() {
    const list = document.getElementById('account-favorites-list');
    if (!list) return;
    if (!accountData.favorites.length) {
        list.innerHTML = '<div class="account-empty">لا توجد عناصر في المفضلة بعد. اضغط أيقونة النجمة عند أي سورة أو حديث لإضافته هنا.</div>';
        return;
    }
    list.innerHTML = accountData.favorites.map(f => `
        <div class="account-list-item">
            <div>
                <div class="txt"><i class="fa-solid ${f.type === 'surah' ? 'fa-book-quran' : 'fa-scroll'}" style="color:var(--primary); margin-inline-end:6px;"></i>${escapeHtml(f.title)}</div>
                ${f.meta ? `<div class="sub">${escapeHtml(f.meta)}</div>` : ''}
            </div>
            <button class="del-btn" onclick="removeFavoriteById('${f.type}','${f.id}')" title="إزالة"><i class="fa-solid fa-trash"></i></button>
        </div>`).join('');
}

function renderAccountNotesList() {
    const list = document.getElementById('account-notes-list');
    if (!list) return;
    if (!accountData.notes.length) {
        list.innerHTML = '<div class="account-empty">لا توجد ملاحظات بعد.</div>';
        return;
    }
    list.innerHTML = accountData.notes.map(n => `
        <div class="account-list-item">
            <div class="txt">${escapeHtml(n.text)}</div>
            <button class="del-btn" onclick="deleteAccountNote('${n.id}')" title="حذف"><i class="fa-solid fa-trash"></i></button>
        </div>`).join('');
}

window.addEventListener('DOMContentLoaded', () => {
    renderTodayDualDate();
    renderMiniCalendar();
    renderUpcomingOccasions();
    renderTasbihSelector();
    updateTasbihDisplay();
    renderOnThisDay();
    renderDailyMessage();
    renderRafiqAdaptiveSuggestion();
    renderRafiqHabits();
    renderRafiqStats();
    renderMoodGrid();
    const copyrightYearEl = document.getElementById('about-copyright-year');
    if (copyrightYearEl) copyrightYearEl.textContent = new Date().getFullYear();
    initScrollHints();
    initAccountSystem();
});

// ========= مؤشرات التمرير الخفيفة (سهم "يوجد المزيد") =========
// يبحث عن كل عنصر يحمل data-scroll-hint (شريط قابل للتمرير أفقيًا)، ثم يتحكم بظهور/اختفاء
// سهم لطيف متحرك بجانب تدرج شفاف بحسب: (أ) وجود محتوى فعلي مخفي فعلاً، (ب) موضع التمرير الحالي.
function initScrollHints() {
    const tracks = document.querySelectorAll('[data-scroll-hint]');

    tracks.forEach((track) => {
        const wrap = track.parentElement;
        if (!wrap) return;
        const arrow = wrap.querySelector('.scroll-hint-arrow');
        const fade = wrap.querySelector('.scroll-hint-fade');
        if (!arrow) return;

        const update = () => {
            const maxScroll = track.scrollWidth - track.clientWidth;
            const hasOverflow = maxScroll > 4;

            arrow.classList.toggle('is-visible', hasOverflow);
            if (fade) fade.classList.toggle('is-visible', hasOverflow);

            if (!hasOverflow) return;

            // نستخدم القيمة المطلقة لأن اتجاه scrollLeft في وضع RTL يختلف بين المتصفحات،
            // لكنه دائمًا يبدأ من الصفر (بداية القائمة) ويزداد بالقيمة المطلقة كلما تم كشف المزيد.
            const scrolled = Math.abs(track.scrollLeft);
            const reachedEnd = scrolled >= maxScroll - 4;
            arrow.classList.toggle('is-end', reachedEnd);
            if (fade) fade.classList.toggle('is-visible', hasOverflow && !reachedEnd);
        };

        track.addEventListener('scroll', update, { passive: true });
        update();

        // إعادة الحساب بعد اكتمال تحميل الخطوط/الصور وعند تغيّر حجم الشاشة أو اتجاه اللغة
        window.addEventListener('resize', update);
        setTimeout(update, 400);
        setTimeout(update, 1200);

        // تخزين دالة التحديث حتى تُستدعى يدويًا بعد تغيير اللغة أو الثيم إن لزم
        track.__refreshScrollHint = update;
    });
}

// يمكن استدعاؤها من أي مكان آخر بالكود (مثل تبديل اللغة RTL/LTR) لإعادة ضبط الأسهم فورًا
function refreshAllScrollHints() {
    document.querySelectorAll('[data-scroll-hint]').forEach((track) => {
        if (typeof track.__refreshScrollHint === 'function') track.__refreshScrollHint();
    });
}

