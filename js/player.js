function syncGlobalPlayerVisibility() {
    if (audioSessionActive && isQuranPageActive()) {
        globalAudioPlayer.classList.add('player-visible');
        document.body.classList.add('audio-active');
    } else {
        globalAudioPlayer.classList.remove('player-visible');
        document.body.classList.remove('audio-active');
    }
}

function showGlobalPlayer() {
    audioSessionActive = true;
    syncGlobalPlayerVisibility();
}
function hideGlobalPlayer() {
    audioSessionActive = false;
    syncGlobalPlayerVisibility();
}

playBtn.addEventListener('click', () => {
    if (!audio.src) return showToast("اختر سورة أو إذاعة للبدء");
    if (audio.paused) {
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    } else {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }
});

document.getElementById('stop-btn').addEventListener('click', () => {
    audio.pause();
    audio.currentTime = 0;
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    hideGlobalPlayer();
});

document.getElementById('forward-btn').addEventListener('click', () => {
    if (audio.duration) audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
});

document.getElementById('backward-btn').addEventListener('click', () => {
    if (audio.duration) audio.currentTime = Math.max(audio.currentTime - 10, 0);
});

audio.addEventListener('timeupdate', () => {
    if (audio.duration) {
        const pct = (audio.currentTime / audio.duration) * 100;
        progressFill.style.width = pct + '%';
        document.getElementById('current-time').textContent = formatTime(audio.currentTime);
        document.getElementById('total-duration').textContent = formatTime(audio.duration);
    }
});

progressBar.addEventListener('click', (e) => {
    if (!audio.duration) return;
    const rect = progressBar.getBoundingClientRect();
    const pos = 1 - ((e.clientX - rect.left) / rect.width);
    audio.currentTime = pos * audio.duration;
});

/* ============================================================
   سحب شريط التقدّم بالماوس أو باللمس للتقديم/التأخير بسلاسة
   (بالإضافة إلى النقر المباشر الموجود مسبقًا أعلاه)
============================================================ */
let isDraggingProgress = false;

function seekFromPointer(e, commit) {
    if (!audio.duration || !isFinite(audio.duration)) return;
    const rect = progressBar.getBoundingClientRect();
    const clientX = (e.touches && e.touches.length) ? e.touches[0].clientX : e.clientX;
    const pos = 1 - Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    progressFill.style.width = (pos * 100) + '%';
    document.getElementById('current-time').textContent = formatTime(pos * audio.duration);
    if (commit) audio.currentTime = pos * audio.duration;
}

progressBar.addEventListener('mousedown', (e) => {
    isDraggingProgress = true;
    progressBar.classList.add('seeking');
    seekFromPointer(e, true);
});
progressBar.addEventListener('touchstart', (e) => {
    isDraggingProgress = true;
    progressBar.classList.add('seeking');
    seekFromPointer(e, true);
}, { passive: true });

window.addEventListener('mousemove', (e) => {
    if (isDraggingProgress) seekFromPointer(e, true);
});
window.addEventListener('touchmove', (e) => {
    if (isDraggingProgress) seekFromPointer(e, true);
}, { passive: true });

window.addEventListener('mouseup', () => {
    isDraggingProgress = false;
    progressBar.classList.remove('seeking');
});
window.addEventListener('touchend', () => {
    isDraggingProgress = false;
    progressBar.classList.remove('seeking');
});

function formatTime(secs) {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m < 10 ? '0' : ''}${m}:${s < 10 ? '0' : ''}${s}`;
}

/* ============================================================
   إدارة الصوتيات المتقدمة عبر Media Session API
   تتيح التحكم في التلاوة (تشغيل/إيقاف/تالي/سابق/تقديم/تأخير)
   من شاشة قفل الهاتف ولوحة الإشعارات ووسائط نظام التشغيل،
   حتى عندما لا تكون صفحة المتصفح مفتوحة على الشاشة.
============================================================ */
function updateNowPlaying(title, subtitle) {
    document.getElementById('current-track-title').textContent = title;
    document.getElementById('current-track-subtitle').style.display = 'block';
    document.getElementById('current-track-subtitle').textContent = subtitle;

    if ('mediaSession' in navigator) {
        navigator.mediaSession.metadata = new MediaMetadata({
            title: title,
            artist: subtitle,
            album: 'منصة القرآن والسنة',
            artwork: [
                // نسخة PNG أولاً: بعض إصدارات أندرويد/كروم لا تعرض أيقونة SVG بشكل
                // موثوق داخل إشعار الوسائط في الشريط العلوي، بينما PNG مدعومة دائمًا.
                { src: 'apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
                { src: 'icon.svg', sizes: '96x96', type: 'image/svg+xml' },
                { src: 'icon.svg', sizes: '192x192', type: 'image/svg+xml' },
                { src: 'icon.svg', sizes: '512x512', type: 'image/svg+xml' }
            ]
        });
    }
}

function initMediaSession() {
    if (!('mediaSession' in navigator)) return;

    navigator.mediaSession.setActionHandler('play', () => {
        if (!audio.src) return;
        audio.play();
        playBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
    });

    navigator.mediaSession.setActionHandler('pause', () => {
        audio.pause();
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    });

    navigator.mediaSession.setActionHandler('stop', () => {
        audio.pause();
        audio.currentTime = 0;
        playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    });

    navigator.mediaSession.setActionHandler('seekbackward', (details) => {
        audio.currentTime = Math.max(0, audio.currentTime - (details.seekOffset || 10));
    });

    navigator.mediaSession.setActionHandler('seekforward', (details) => {
        if (audio.duration) audio.currentTime = Math.min(audio.duration, audio.currentTime + (details.seekOffset || 10));
    });

    navigator.mediaSession.setActionHandler('seekto', (details) => {
        if (details.fastSeek && 'fastSeek' in audio) { audio.fastSeek(details.seekTime); return; }
        audio.currentTime = details.seekTime;
    });

    // التالي/السابق يعملان فقط أثناء تصفح السور (وليس أثناء بث إذاعي مباشر)
    navigator.mediaSession.setActionHandler('previoustrack', () => {
        if (playbackContext.index < 0) return;
        const prevIndex = playbackContext.index > 0 ? playbackContext.index - 1 : staticSurahNames.length - 1;
        playSurahAtIndex(playbackContext.server, prevIndex, playbackContext.reciter, playbackContext.moshaf);
    });

    navigator.mediaSession.setActionHandler('nexttrack', () => {
        if (playbackContext.index < 0) return;
        const nextIndex = (playbackContext.index + 1) % staticSurahNames.length;
        playSurahAtIndex(playbackContext.server, nextIndex, playbackContext.reciter, playbackContext.moshaf);
    });
}
initMediaSession();

// مزامنة حالة التشغيل (يشغّل/متوقف) وموضع التقدّم مع نظام التشغيل
// حتى تتحرك عناصر التحكم في شاشة القفل تلقائيًا مع الصوت.
audio.addEventListener('play', () => {
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'playing';
    showGlobalPlayer();
});
audio.addEventListener('pause', () => {
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
    // يبقى الشريط ظاهرًا أثناء الإيقاف المؤقت حتى يتمكن المستخدم من استئناف الاستماع بسهولة
});
audio.addEventListener('ended', () => {
    if ('mediaSession' in navigator) navigator.mediaSession.playbackState = 'paused';
    playBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    // ينتقل تلقائيًا للسورة التالية عند انتهاء التلاوة الحالية، إن وُجدت
    if (playbackContext.index >= 0) {
        const nextIndex = (playbackContext.index + 1) % staticSurahNames.length;
        playSurahAtIndex(playbackContext.server, nextIndex, playbackContext.reciter, playbackContext.moshaf);
    } else {
        hideGlobalPlayer();
    }
});
audio.addEventListener('loadedmetadata', () => {
    if ('mediaSession' in navigator && 'setPositionState' in navigator.mediaSession && audio.duration) {
        try {
            navigator.mediaSession.setPositionState({
                duration: audio.duration,
                playbackRate: audio.playbackRate,
                position: audio.currentTime
            });
        } catch (e) { /* بعض المتصفحات لا تدعم مواضع بث مباشر */ }
    }
});

document.getElementById('volume-toggle-btn').addEventListener('click', () => {
    document.getElementById('volume-slider-wrapper').classList.toggle('active');
});

let lastVolume = 1;
const volumeBar = document.getElementById('volume-bar');
const volumeFill = document.getElementById('volume-fill');
const volumeMuteBtn = document.getElementById('volume-mute-quick');
const volumeIcon = document.getElementById('volume-icon');

function updateVolumeDisplay(vol) {
    audio.volume = Math.max(0, Math.min(1, vol));
    volumeFill.style.width = (audio.volume * 100) + '%';

    if (audio.volume === 0) {
        if (volumeIcon) volumeIcon.className = "fa-solid fa-volume-xmark";
        if (volumeMuteBtn) volumeMuteBtn.className = "fa-solid fa-volume-xmark";
    } else if (audio.volume < 0.5) {
        if (volumeIcon) volumeIcon.className = "fa-solid fa-volume-low";
        if (volumeMuteBtn) volumeMuteBtn.className = "fa-solid fa-volume-low";
    } else {
        if (volumeIcon) volumeIcon.className = "fa-solid fa-volume-high";
        if (volumeMuteBtn) volumeMuteBtn.className = "fa-solid fa-volume-high";
    }
}

audio.volume = 1;
updateVolumeDisplay(1);

volumeBar.addEventListener('click', (e) => {
    const rect = volumeBar.getBoundingClientRect();
    const vol = (e.clientX - rect.left) / rect.width;
    updateVolumeDisplay(vol);
});

let isDraggingVolume = false;
volumeBar.addEventListener('mousedown', (e) => {
    isDraggingVolume = true;
    updateVolumeFromEvent(e);
});
window.addEventListener('mousemove', (e) => {
    if (isDraggingVolume) {
        updateVolumeFromEvent(e);
    }
});
window.addEventListener('mouseup', () => {
    isDraggingVolume = false;
});

function updateVolumeFromEvent(e) {
    const rect = volumeBar.getBoundingClientRect();
    const pos = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    updateVolumeDisplay(pos);
}

if (volumeMuteBtn) {
    volumeMuteBtn.addEventListener('click', () => {
        if (audio.volume > 0) {
            lastVolume = audio.volume;
            updateVolumeDisplay(0);
        } else {
            updateVolumeDisplay(lastVolume > 0 ? lastVolume : 1);
        }
    });
}

// أزرار رفع/خفض الصوت التدريجي داخل شريط التحكم — تعتمد على النقر (click)
// بدل السحب، لتعمل بشكل موثوق على جميع الهواتف واللمس بالإضافة للماوس.
const volumeUpBtn = document.getElementById('volume-up-btn');
const volumeDownBtn = document.getElementById('volume-down-btn');
if (volumeUpBtn) {
    volumeUpBtn.addEventListener('click', () => {
        updateVolumeDisplay(audio.volume + 0.1);
    });
}
if (volumeDownBtn) {
    volumeDownBtn.addEventListener('click', () => {
        updateVolumeDisplay(audio.volume - 0.1);
    });
}

let currentSelectedCity = "Al Mukalla,Yemen";
let prayerTimerInterval = null;
let prayerMidnightTimeout = null;
let useGeolocationForPrayer = false;
let userPrayerCoords = null; // { latitude, longitude }

// خريطة طريقة الحساب (Method) الأنسب لكل دولة، لأن زوايا الفجر
// والعشاء تختلف من هيئة لأخرى. القيم حسب توثيق Aladhan API.
const PRAYER_METHOD_BY_COUNTRY = {
    "Saudi Arabia": 4,      // أم القرى
    "United Arab Emirates": 16, // دبي
    "Kuwait": 9,             // الكويت
    "Qatar": 10,             // قطر
    "Bahrain": 8,            // رابطة الخليج
    "Oman": 8,               // رابطة الخليج
    "Egypt": 5,              // الهيئة المصرية العامة للمساحة
    "Jordan": 23,            // الأردن
    "Palestine": 23,         // الأردن (الأقرب جغرافيًا ومنهجيًا)
    "Morocco": 21,           // المغرب
    "Yemen": 3,              // رابطة العالم الإسلامي
    "Iraq": 3,
    "Syria": 3,
    "Lebanon": 3,
    "Sudan": 3,
    "Libya": 3,
    "Tunisia": 3,
    "Algeria": 3,
    "Mauritania": 3,
    "Somalia": 3,
    "Djibouti": 3,
    "Comoros": 3
};
const DEFAULT_PRAYER_METHOD = 3; // رابطة العالم الإسلامي كافتراضي عام

