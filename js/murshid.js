/* ============================================================
   مرشد: المساعد الصوتي/النصي الذكي (Smart Islamic Companion)
   يتصل بخادم خلفي محلي آمن (fatwa_api_server.py) يحتفظ بمفتاح
   OpenRouter API سرًا على الخادم، بدل كشفه داخل كود المتصفح.
============================================================ */
const MURSHID_API_ENDPOINT = BACKEND_BASE_URL + "/api/murshid";
const MURSHID_SYSTEM_PROMPT = `أنت "مرشد"، مساعد إسلامي يجيب حصرًا اعتمادًا على القرآن الكريم والسنة النبوية الصحيحة وكتب الفقه المعتمدة عند أهل السنة، بأسلوب واضح ومختصر ومطمئن.
عند سؤالك عن حكم شرعي اذكر الحكم ثم دليله باختصار. عند طلب خطة عبادية (مثل ختم القرآن) اعرضها كخطوات عملية مرقمة. لا تفتِ في مسائل شخصية دقيقة تحتاج تفصيل حالة فردية بل وجّه لمراجعة عالم موثوق.
أجب بنص عادي دون Markdown ودون تنسيق زائد، بحد أقصى فقرة أو فقرتين.`;

function murshidAppendMessage(role, html) {
    const wrap = document.getElementById('murshid-chat-wrap');
    const div = document.createElement('div');
    div.className = `murshid-msg ${role === 'user' ? 'user' : ''}`;
    div.innerHTML = `<div class="murshid-avatar"><i class="fa-solid ${role === 'user' ? 'fa-user' : 'fa-star-and-crescent'}"></i></div><div class="murshid-bubble">${html}</div>`;
    wrap.appendChild(div);
    div.scrollIntoView({ behavior: 'smooth', block: 'end' });
    return div.querySelector('.murshid-bubble');
}

async function sendMurshidMessage() {
    const input = document.getElementById('murshid-input');
    const query = sanitizeTextInput(input.value, 500);
    if (!query) return;

    input.value = '';
    murshidAppendMessage('user', escapeHtml(query));
    const bubble = murshidAppendMessage('assistant', '<i class="fa-solid fa-wand-magic-sparkles fa-spin"></i> جارٍ التفكير في إجابة دقيقة...');

    try {
        const response = await fetch(MURSHID_API_ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ question: query, system: MURSHID_SYSTEM_PROMPT })
        });
        const parsed = await response.json();
        if (!response.ok || parsed.error) throw new Error(parsed.error || 'request-failed');
        // نعقّم إجابة الخادم أيضًا قبل عرضها: حتى لو كان الخادم موثوقًا
        // عادة، فلا ينبغي الوثوق بأي محتوى خارجي يُدرج داخل innerHTML.
        bubble.innerHTML = parsed.answer ? escapeHtml(parsed.answer).replace(/\n/g, '<br>') : 'تعذّر الحصول على إجابة الآن، حاول مرة أخرى.';
    } catch (err) {
        console.error('murshid-api-error:', err);
        const code = err && err.message;
        let displayMsg = 'تعذّر الحصول على إجابة الآن، تحقق من اتصالك وحاول مرة أخرى.';
        if (code === 'Failed to fetch' || code === 'NetworkError when attempting to fetch resource.' || code === 'Load failed') {
            displayMsg = BACKEND_BASE_URL.includes('localhost')
                ? 'تعذّر الوصول إلى خدمة "مرشد" المحلية على ' + MURSHID_API_ENDPOINT + '. تأكد أن ملف fatwa_api_server.py يعمل فعليًا (شغّله بالأمر: python fatwa_api_server.py) قبل استخدام هذا القسم.'
                : 'تعذّر الوصول إلى خدمة "مرشد" حاليًا (' + MURSHID_API_ENDPOINT + '). قد يكون الخادم نائمًا مؤقتًا (شائع في الاستضافة المجانية) أو غير متصل، حاول مرة أخرى بعد لحظات.';
        } else if (code === 'missing_api_key') {
            displayMsg = 'الخادم يعمل لكن لم يتم ضبط مفتاح OPENROUTER_API_KEY فيه. راجع ملف .env.example لمعرفة كيفية ضبطه.';
        } else if (code === 'upstream_error') {
            displayMsg = 'حدث خطأ أثناء اتصال الخادم بواجهة OpenRouter API، تأكد من صحة المفتاح واتصال الإنترنت ثم حاول مرة أخرى.';
        } else if (code === 'empty_question') {
            displayMsg = 'يبدو أن السؤال وصل فارغًا، أعد كتابته وحاول مجددًا.';
        }
        bubble.innerHTML = displayMsg;
    }
}

function quickMurshidMessage(text) {
    document.getElementById('murshid-input').value = text;
    sendMurshidMessage();
}

document.getElementById('murshid-input')?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') sendMurshidMessage();
});

