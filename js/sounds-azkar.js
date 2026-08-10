/* ============================================================
   الصوتيات: مواعظ ومقاطع صوتية قصيرة ومختصرة
============================================================ */
const soundsData = [
    { title: "النداء الأخير أيها المسلمون أسمعوه", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0307.mp3" },
    { title: "نصائح لكل عاشق", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0182.mp3" },
    { title: "نعمة الهداية", sheikh: "الشيخ مشعل العتيبي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0027.mp3" },
    { title: "فضل الاستغفار", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0090.mp3" },
    { title: "كم آية تقرأ؟", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0091.mp3" },
    { title: "اكتبوها كثيرًا #الحمدلله", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0081.mp3" },
    { title: "ماذا أعددت للقاء الله؟", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0011.mp3" },
    { title: "الأم", sheikh: "الشيخ إبراهيم الدويش", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0017.mp3" },
    { title: "زوجة يتمناها كل رجل", sheikh: "الشيخ مشعل العتيبي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0030.mp3" },
    { title: "نجوم السماء", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0049.mp3" },
    { title: "اعرف اليهود", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0056.mp3" },
    { title: "تريد الهداية", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0066.mp3" },
    { title: "فضل الباقيات الصالحات", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0089.mp3" },
    { title: "يا تارك الصلاة", sheikh: "الشيخ محمد حسين يعقوب", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0103.mp3" },
    { title: "كيف تجعل قلبك سعيدًا؟", sheikh: "الشيخ خالد الجبير", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0110.mp3" },
    { title: "نداء أخير للنساء", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0150.mp3" },
    { title: "الوصفة السحرية للسعادة الزوجية", sheikh: "الشيخ عائض القرني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0200.mp3" },
    { title: "حقيقة حسن الظن بالله", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0211.mp3" },
    { title: "الله نور السموات والأرض", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0220.mp3" },
    { title: "بر الوالدين", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0221.mp3" },
    { title: "بادر إلى الأعمال الخفية", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0297.mp3" },
    { title: "فضل ذكر الله", sheikh: "الشيخ توفيق الصايغ", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0261.mp3" },
    { title: "يا من تبحث عن الحياة الطيبة", sheikh: "الشيخ محمد حسان", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0399.mp3" },
    { title: "بسم الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0059.mp3" },
    { title: "لا تحزن لعله خير", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0396.mp3" },
    { title: "وقفة محاسبة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0431.mp3" },
    { title: "باب التوبة مفتوح فماذا تنتظر", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0313.mp3" },
    { title: "هل تشتكي كثرة الهموم والغموم", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0321.mp3" },
    { title: "احفظ الله يحفظك", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0442-ihfad-allah-yahfadk-khaed-rashed.mp3" },
    { title: "بكاء الرسول صلى الله عليه وسلم", sheikh: "الشيخ عائض القرني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0201.mp3" },
    { title: "قصة فيروز الديلمي", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0215.mp3" },
    { title: "أقم صلاتك تسعد حياتك", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0308.mp3" },
    { title: "الطريق إلى الجنة", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0312.mp3" },
    { title: "فرصة مغفرة الذنوب في خمس دقائق", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0367.mp3" },
    { title: "خطر اللسان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0448-khatar-lisan.mp3" },
    { title: "فضل وعظمة الاستغفار", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0372.mp3" },
    { title: "نصيحة لكل مسلم قبل رمضان", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0409.mp3" },
    { title: "فضائل لا إله إلا الله", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0445-Mghamsi-fadl-lailahaillaallah.mp3" },
    { title: "وصايا قبل لقاء شهر رمضان", sheikh: "الشيخ محمد مختار الشنقيطي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0420.mp3" },
    { title: "كلمات لامست القلوب", sheikh: "الشيخ محمد المنجد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0443-kalima-tayba.mp3" },
    { title: "اللحظات الأخيرة", sheikh: "الشيخ محمد حسان", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0446-Mohammed-hassan_almout.mp3" },
    { title: "أحسن الكلام ما كان عن الله", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0001.mp3" },
    { title: "أدركوا يا شباب", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0009.mp3" },
    { title: "لمن الملك اليوم؟", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0012.mp3" },
    { title: "من هو الفائز في رمضان؟", sheikh: "الشيخ إبراهيم الدويش", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0019.mp3" },
    { title: "قصة المؤذن", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0043.mp3" },
    { title: "آخر إنسان يدخل الجنة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0053.mp3" },
    { title: "الجنة لا يدخلها إلا الطيبين", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0061.mp3" },
    { title: "قصة في الجناح الانفرادي", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0174.mp3" },
    { title: "من آداب يوم الجمعة", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0179.mp3" },
    { title: "أسباب الهم والغم", sheikh: "الشيخ عائض القرني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0197.mp3" },
    { title: "طعام أهل الجنة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0213.mp3" },
    { title: "ما الذي يجري من حولنا", sheikh: "الشيخ توفيق الصايغ", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0258.mp3" },
    { title: "أعظم كنوز بر الوالدين", sheikh: "الشيخ محمد الشنقيطي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0280.mp3" },
    { title: "وقفات مع النفس قبل يوم القيامة", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0324.mp3" },
    { title: "الوصية التي بحث عنها الكثير", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0356.mp3" },
    { title: "قصة وفاة رسول الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0377.mp3" },
    { title: "نصيحة أغلى من الذهب والألماس", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0406.mp3" },
    { title: "هل حمدت الله وشكرته على نعمه", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0416.mp3" },
    { title: "وجه خنزير (قصة مؤثرة)", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0016.mp3" },
    { title: "العبد الشكور", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0062.mp3" },
    { title: "لا تحقرن من المعروف شيئًا", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0069.mp3" },
    { title: "قصة عجيبة لأم صابرة مع ولدها المريض", sheikh: "الشيخ خالد الجبير", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0107.mp3" },
    { title: "لمن العزة؟", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0177.mp3" },
    { title: "لذة السجود", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0216.mp3" },
    { title: "اغتنم حياتك قبل مماتك", sheikh: "الشيخ محمد مختار الشنقيطي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0281.mp3" },
    { title: "المؤمن في الدنيا كالغريب", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0310.mp3" },
    { title: "يا شباب حان وقت التغيير والرجوع إلى الله", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0326.mp3" },
    { title: "نصيحة لكل شاب", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0410.mp3" },
    { title: "وصية اجعلها منهج حياتك", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0422.mp3" },
    { title: "وصية قبل شهر رمضان", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0430.mp3" },
    { title: "قصة من عجائب القصص وغرائبها", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0002.mp3" },
    { title: "باب يعبر منه كل الناس", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0004.mp3" },
    { title: "طبيب مع مريض مسن", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0042.mp3" },
    { title: "الهادي الله سبحانه وتعالى", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0063.mp3" },
    { title: "أشياء بسيطة تجعلك تُعتق من النار", sheikh: "الشيخ محمد حسين يعقوب", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0099.mp3" },
    { title: "يا دكتور لا تتعب نفسك", sheikh: "الشيخ خالد الجبير", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0111.mp3" },
    { title: "قصة في صلة الرحم وسعة الرزق", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0175.mp3" },
    { title: "من أسباب الستر يوم القيامة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0217.mp3" },
    { title: "نور على نور", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0231.mp3" },
    { title: "ما السبيل لحب الله لي؟", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0338.mp3" },
    { title: "وصية من أروع الوصايا", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0359.mp3" },
    { title: "كيف تكون عبدًا صالحًا", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0392.mp3" },
    { title: "من الأعمال التي تدخل الجنة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0403.mp3" },
    { title: "دقائق مع الله", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0003.mp3" },
    { title: "القرب من الله", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0007.mp3" },
    { title: "إنه الله العظيم", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0065.mp3" },
    { title: "فائدة الصلاة على النبي", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0082.mp3" },
    { title: "ثواب ختمة واحدة للقرآن في رمضان", sheikh: "الشيخ محمد حسين يعقوب", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0097.mp3" },
    { title: "كنز لا يعلمه كثير من الناس", sheikh: "الشيخ محمد حسين يعقوب", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0101.mp3" },
    { title: "كيف تجعل نومك عبادة", sheikh: "الشيخ خالد الجبير", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0112.mp3" },
    { title: "فضل الدعاء", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0193.mp3" },
    { title: "شرف بناء المساجد", sheikh: "الشيخ عائض القرني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0203.mp3" },
    { title: "السلامة من النفاق", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0209.mp3" },
    { title: "ادخر لنفسك يُدخر لك", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0219.mp3" },
    { title: "من هدي القرآن", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0228.mp3" },
    { title: "فضل القرآن في رمضان", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0368.mp3" },
    { title: "كيف نعظم محبة الله في القلب", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0393.mp3" },
    { title: "الوقوف أمام ربي", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0006.mp3" },
    { title: "احذر أن يأخذك الله وأنت في غفلة", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0008.mp3" },
    { title: "لا مفر من هذا المقر", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0013.mp3" },
    { title: "عليك بما يفيدك يوم التناد", sheikh: "الشيخ إبراهيم الدويش", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0022.mp3" },
    { title: "لله قوم أخلصوا", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0047.mp3" },
    { title: "أربع دقائق من ذهب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0054.mp3" },
    { title: "الخسوف والكسوف", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0057.mp3" },
    { title: "إنه الطيب سبحانه وتعالى", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0064.mp3" },
    { title: "لماذا نعصي الله في رمضان", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0083.mp3" },
    { title: "هل تريد أن تكون سعيدًا طوال حياتك", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0087.mp3" },
    { title: "عشرة أشياء لتمحيص ذنوبك", sheikh: "الشيخ محمد حسين يعقوب", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0098.mp3" },
    { title: "علاج الحب والعشق", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0192.mp3" },
    { title: "ما هو حق الحياء؟", sheikh: "الشيخ عائض القرني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0204.mp3" },
    { title: "ليلة القدر", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0206.mp3" },
    { title: "خذ وديعتك", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0223.mp3" },
    { title: "يا شاب يا شابة يا معافى يا صحيح أين أنت عن الله", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0010.mp3" },
    { title: "كيف تلقى الله؟", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0014.mp3" },
    { title: "كفى يا أخية", sheikh: "الشيخ إبراهيم الزيات", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0015.mp3" },
    { title: "قلب رباه القرآن", sheikh: "الشيخ مشعل العتيبي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0034.mp3" },
    { title: "من مثل عائشة!؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0048.mp3" },
    { title: "هذا الحبيب يا محب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0051.mp3" },
    { title: "أقبل على صلواتك الخمس", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0055.mp3" },
    { title: "حوريات الجنة", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0067.mp3" },
    { title: "هذا هو الله سبحانه وتعالى", sheikh: "الشيخ محمد بن قنة الشهراني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0068.mp3" },
    { title: "من أفضل هدايا رمضان", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0086.mp3" },
    { title: "اختر اسمك عند الله", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0093.mp3" },
    { title: "خطأ يقع فيه كثير من الناس عند التسبيح", sheikh: "الشيخ محمد حسين يعقوب", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0100.mp3" },
    { title: "من ترك شيئًا لله عوضه الله خيرًا منه", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0180.mp3" },
    { title: "وكان يأمر أهله بالصلاة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0207.mp3" },
    { title: "نداء للشباب", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0227.mp3" },
    { title: "جراح الشتاء", sheikh: "الشيخ إبراهيم الدويش", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0023.mp3" },
    { title: "الذنوب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0058.mp3" },
    { title: "هل تريد واسطة في يوم القيامة", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0088.mp3" },
    { title: "أجمل الحب", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0092.mp3" },
    { title: "أفضل طريقة تخفف المصائب", sheikh: "الشيخ طلال فاخر", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0095.mp3" },
    { title: "ركعتين وبس", sheikh: "الشيخ خالد الجبير", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0106.mp3" },
    { title: "شكر الله على النعمة", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0146.mp3" },
    { title: "حركة بسيطة قد تحرمك لذة القرآن", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0147.mp3" },
    { title: "هل تصلي أم تقيم الصلاة!؟", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0183.mp3" },
    { title: "يمهل ولا يهمل", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0187.mp3" },
    { title: "أظلم شهادة في التاريخ", sheikh: "الشيخ عائض القرني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0198.mp3" },
    { title: "سريرتك هي برزخك", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0224.mp3" },
    { title: "إخوانكم خولكم", sheikh: "الشيخ توفيق الصايغ", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0259.mp3" },
    { title: "الغفلة", sheikh: "الشيخ توفيق الصايغ", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0260.mp3" },
    { title: "أي طاعة ندعي", sheikh: "الشيخ مشعل العتيبي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0025.mp3" },
    { title: "من لنا غير الله", sheikh: "الشيخ مشعل العتيبي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0026.mp3" },
    { title: "التوبة حال المؤمن", sheikh: "الشيخ مشعل العتيبي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0029.mp3" },
    { title: "قصة أم عقيل", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0050.mp3" },
    { title: "الشيطان يعظ", sheikh: "الشيخ خالد الجبير", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0104.mp3" },
    { title: "الأم مدرسة", sheikh: "الشيخ سلطان الدغيلبي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0113.mp3" },
    { title: "نعمة تخفى على كثير منا", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0149.mp3" },
    { title: "الصبر على دعوة الآخرين", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0155.mp3" },
    { title: "ادعه ولا تقلق", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0184.mp3" },
    { title: "حفيد أيوب", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0190.mp3" },
    { title: "إلى متى نظل نجهل سيرته!؟", sheikh: "الشيخ عائض القرني", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0199.mp3" },
    { title: "عرش بلقيس", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0225.mp3" },
    { title: "كيف أخشع في صلاتي؟", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0329.mp3" },
    { title: "هل تعرف أروع العبادات وأحبها عند الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0412.mp3" },
    { title: "رمضان", sheikh: "الشيخ أنس بن سعيد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0071.mp3" },
    { title: "سهام الليل", sheikh: "الشيخ أنس بن سعيد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0072.mp3" },
    { title: "لماذا لم أعد أبكي من خشية الله", sheikh: "الشيخ توفيق الصايغ", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0073.mp3" },
    { title: "اسمع وأعلنها توبة", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0148.mp3" },
    { title: "لا ترفع وبقلبك شيء", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0154.mp3" },
    { title: "على ماذا نقول ربنا ولك الحمد", sheikh: "الشيخ عبد المحسن الأحمد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0160.mp3" },
    { title: "السبيل لقول لا إله إلا الله عند الموت", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0286.mp3" },
    { title: "حياتك بدلها", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0306.mp3" },
    { title: "تقول أرى المتبرجات فكيف أنصحهن؟", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0333.mp3" },
    { title: "ما حكم سماع الأناشيد؟", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0337.mp3" },
    { title: "ما هو السبيل للتخلص من الضعف والفتنة؟", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0339.mp3" },
    { title: "ما هي الأمور التي ترقق القلب؟", sheikh: "الشيخ خالد الراشد", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0340.mp3" },
    { title: "فضل الوضوء في البيت والذهاب للمسجد", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0369.mp3" },
    { title: "مساكين الذين يصلون في البيت (فضل الجماعة)", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0401.mp3" },
    { title: "هل تعرف الابتسامة الحلال والابتسامة الحرام؟", sheikh: "الشيخ محمد العريفي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0413.mp3" },
    { title: "أجر قرض المؤمن", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/010-.mp3" },
    { title: "الإخلاص أعظم ما يرتفع إلى السماء", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/019--.mp3" },
    { title: "الزهد في العلم", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/025--.mp3" },
    { title: "الزوجة الصالحة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/026--.mp3" },
    { title: "اليمين تنعقد على ثلاث أضرب", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/037-.mp3" },
    { title: "أين همة الشباب من همة الصحابة رضي الله عنهم؟", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/061-.mp3" },
    { title: "فضل سورة الكهف يوم الجمعة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/095--.mp3" },
    { title: "فضل صيام يوم عرفة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/096-.mp3" },
    { title: "قيام الليل من هدي النبوة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/106--.mp3" },
    { title: "كيف الخشوع في الصلاة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/110-.mp3" },
    { title: "ليلة النصف من شعبان", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/117-.mp3" },
    { title: "نصيحة لمن يريد حفظ القرآن الكريم", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/160-.mp3" },
    { title: "نصيحة مؤثرة لكل حزين ومهموم", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/168-.mp3" },
    { title: "نصيحة مؤثرة لمن يتكاسل عن قيام الليل", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/171--.mp3" },
    { title: "وقفة مع قيام الليل في رمضان", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/188--.mp3" },
    { title: "أحداث معجزة الإسراء", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/012-.mp3" },
    { title: "أسباب الرحمة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/013--.mp3" },
    { title: "أسباب توجب الجنة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/014--.mp3" },
    { title: "أعظم العدل", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/016-.mp3" },
    { title: "أعظم المنجيات", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/017--.mp3" },
    { title: "أيام الحج", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/041-.mp3" },
    { title: "بما خوف الله عباده؟", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/063-.mp3" },
    { title: "حديث باب الجنة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/077-.mp3" },
    { title: "عبر وعظات من قصة أصحاب الأخدود", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/090-.mp3" },
    { title: "فوائد جليلة من سيرة نبينا: فضل القرآن وقيام الليل", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/097-.mp3" },
    { title: "كم عدد الجنان؟", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/109-.mp3" },
    { title: "كيف تتشبه بالملائكة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/111-.mp3" },
    { title: "كيف تنال الخاتمة الحسنة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/113-.mp3" },
    { title: "منزلة الأم في الإسلام", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/154--.mp3" },
    { title: "يوم عرفة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/191-.mp3" },
    { title: "إجلال الله تعالى", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/011-.mp3" },
    { title: "ألا يستحي العبد أن يبارز الله بالمعاصي", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/018--.mp3" },
    { title: "الطريق إلى حسن الخاتمة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/029-.mp3" },
    { title: "الكرم والبخل", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/033--.mp3" },
    { title: "بين موسى وهارون", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/064-.mp3" },
    { title: "تعظيم الله", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/068-.mp3" },
    { title: "رحلة الإسراء والمعراج", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/083--.mp3" },
    { title: "غزوة أحد", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/093--.mp3" },
    { title: "قصة أبو لبابة مع بني قريظة", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/100--.mp3" },
    { title: "محبة الله عز وجل", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/123--.mp3" },
    { title: "الصدق مع الله", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/140--.mp3" },
    { title: "من هدي النبي في سنة الفجر والظهر", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/153--.mp3" },
    { title: "نصيحة غالية: كيف نتأثر بالقرآن الكريم", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/161---.mp3" },
    { title: "نصيحة هامة: كيف نستقبل رمضان؟", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/170-...mp3" },
    { title: "وصف حملة العرش", sheikh: "الشيخ صالح المغامسي", url: "https://archive.org/download/Mghamsi_Mawsoa-ma9ati3-mp3/181--.mp3" },

    /* مواعظ إضافية للشيخ نبيل العوضي */
    { title: "قصة لفتاة وشاب في الجامعة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0039.mp3" },
    { title: "صدقك وهو كذوب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0040.mp3" },
    { title: "صدقوا ما عاهدوا الله عليه", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0041.mp3" },
    { title: "قصة لفتاة غرر بها ذئب بشري", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0044.mp3" },
    { title: "قصة: اخرج مع هذه المرأة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0045.mp3" },
    { title: "قصة: ما كنت عوراء إلا لأجلك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0046.mp3" },
    { title: "هل نحن مستعدون للتضحية في سبيل مقدساتنا؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0052.mp3" },
    { title: "شهر عسل في أفريقيا", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0060.mp3" },
    { title: "الحقيقة الخطيرة لعيد الحب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0285.mp3" },
    { title: "رسالة لكل شارب وبائع خمر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0350.mp3" },
    { title: "غيّر حياتك وحقق أحلامك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0364.mp3" },
    { title: "قصة أغرب من الخيال، اسمع واعتبر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0376.mp3" },
    { title: "قصص الأنبياء: لوط عليه السلام", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0378.mp3" },
    { title: "كيف تتخلص من مشاكل وهموم الحب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0383.mp3" },
    { title: "الجنة - الجزء الثاني", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0405.mp3" },
    { title: "وصايا مهمة لكل المسلمين قبل رمضان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/0421.mp3" },
    { title: "نداء قبل فوات الأوان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/muslim_up_by_ayoub-islam/452_nabil_askbeforfawat-.mp3" },

    /* محاضرات إضافية من الموسوعة الصوتية الكاملة للشيخ نبيل العوضي */
    { title: "الأرض المباركة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0049-.mp3" },
    { title: "الأم نواة الأسرة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0057-.mp3" },
    { title: "الأنفاس الأخيرة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0060-.mp3" },
    { title: "أين السعادة؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0210-.mp3" },
    { title: "تصوّر أنت في الجنة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0231-.mp3" },
    { title: "حقيقة الموت", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0270-.mp3" },
    { title: "عذاب القبر ونعيمه", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0360-.mp3" },
    { title: "علامات الساعة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0367-.mp3" },
    { title: "قصة أصحاب الكهف", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0411-.mp3" },
    { title: "قصة الخضر عليه السلام", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0412-.mp3" },
    { title: "قصة حب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0416-.mp3" },
    { title: "لا تهجروا القرآن", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0450-.mp3" },
    { title: "لمحات من حياة الرسول صلى الله عليه وسلم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0461-.mp3" },
    { title: "من أسباب دخول الجنة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0498-.mp3" },
    { title: "نعمة الهداية", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0548-.mp3" },
    { title: "هذا الحبيب يا محب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0562-.mp3" },
    { title: "وفاة الرسول صلى الله عليه وسلم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0587-.mp3" },

    /* دفعة أخرى من محاضرات الشيخ نبيل العوضي */
    { title: "أحسنكم أخلاقا", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0005-.mp3" },
    { title: "أسباب هلاك الأمم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0017-.mp3" },
    { title: "أعظم العلوم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0025-.mp3" },
    { title: "البيت السعيد", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0065-.mp3" },
    { title: "التوبة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0077-.mp3" },
    { title: "الجنة والنار", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0085-.mp3" },
    { title: "الصديق أبو بكر رضي الله عنه", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0131-.mp3" },
    { title: "الموت والقبر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0167-.mp3" },
    { title: "أهوال القيامة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0201-.mp3" },
    { title: "تعاطي المخدرات", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0232-.mp3" },
    { title: "حصن المسلم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0258-.mp3" },
    { title: "رحمة للعالمين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0303-.mp3" },
    { title: "فضل الصيام", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0397-.mp3" },
    { title: "قيام الليل", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0430-.mp3" },
    { title: "لماذا لا نتوب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0459-.mp3" },

    /* دفعة ثالثة من محاضرات الشيخ نبيل العوضي */
    { title: "الأرقام تتكلم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0050-.mp3" },
    { title: "الأقليات الإسلامية في بلاد الغرب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0056-.mp3" },
    { title: "التربية العبادية للنفس", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0070-.mp3" },
    { title: "التوحيد", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0078-.mp3" },
    { title: "الجهاد", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0086-.mp3" },
    { title: "الحياء كله خير", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0091-.mp3" },
    { title: "الخوف من الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0101-.mp3" },
    { title: "الرحمة المهداة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0107-.mp3" },
    { title: "السحر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0116-.mp3" },
    { title: "الصبر على الطاعة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0128-.mp3" },
    { title: "العظمة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0143-.mp3" },
    { title: "اللؤلؤة: كيف تحفظ نفسها؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0158-.mp3" },
    { title: "الوقت والفراغ في حياتنا", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0173-.mp3" },
    { title: "أمراض القلوب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0185-.mp3" },
    { title: "إن الله يقبل التوبة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0190-.mp3" },

    /* دفعة رابعة من محاضرات الشيخ نبيل العوضي */
    { title: "الدموع الغالية", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0104-.mp3" },
    { title: "الرحمة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0109-.mp3" },
    { title: "السر المكنون", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0119-.mp3" },
    { title: "الشجاعة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0123-.mp3" },
    { title: "الصبر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0129-.mp3" },
    { title: "الظلم وأثره في هلاك الأمم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0136-.mp3" },
    { title: "القلوب القاسية", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0154-.mp3" },
    { title: "الله مولانا ولا مولى لهم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0157-.mp3" },
    { title: "النار: رؤية من الداخل", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0169-.mp3" },
    { title: "إلى النساء", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0175-.mp3" },
    { title: "إما شاكرا وإما كفورا", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0183-.mp3" },
    { title: "إن أكرمكم عند الله أتقاكم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0189-.mp3" },
    { title: "أهل النار", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0199-.mp3" },
    { title: "أين المصير؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0211-.mp3" },
    { title: "بين الجنة والنار", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0223-.mp3" },

    /* دفعة خامسة من محاضرات الشيخ نبيل العوضي */
    { title: "بيوت القراءة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0226-.mp3" },
    { title: "تجارب من الواقع", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0229-.mp3" },
    { title: "جاهلية الزمان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0241-.mp3" },
    { title: "حاسب نفسك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0245-.mp3" },
    { title: "حرمة العلماء", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0254-.mp3" },
    { title: "حقوق الأخوة في الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0262-.mp3" },
    { title: "حقوق المرأة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0265-.mp3" },
    { title: "حياة السعداء", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0278-.mp3" },
    { title: "حياؤك إيمانك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0280-.mp3" },
    { title: "دعوة للجنة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0292-.mp3" },
    { title: "رجل قلبه معلق بالمساجد", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0298-.mp3" },
    { title: "رسالة إلى صانعة الأجيال", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0304-.mp3" },
    { title: "رمضان روضة المحبين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0309-.mp3" },
    { title: "سكارى", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0319-.mp3" },
    { title: "سوء الخاتمة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0322-.mp3" },

    /* دفعة سادسة من محاضرات الشيخ نبيل العوضي */
    { title: "شاب نشأ في عبادة الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0324-.mp3" },
    { title: "شكر النعم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0328-.mp3" },
    { title: "صفات المنافقين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0334-.mp3" },
    { title: "صفة الجنة والنار", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0337-.mp3" },
    { title: "صلاتك احرص عليها", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0341-.mp3" },
    { title: "طالوت وجالوت", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0344-.mp3" },
    { title: "عاقبة الظالمين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0349-.mp3" },
    { title: "عالم الجن والشياطين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0352-.mp3" },
    { title: "عَبرة وعِبرة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0358-.mp3" },
    { title: "عقوق الوالدين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0366-.mp3" },
    { title: "علو الهمة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0370-.mp3" },
    { title: "فتاة لا تعجبني", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0384-.mp3" },
    { title: "فرصة للتوبة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0393-.mp3" },
    { title: "فليتنافس المتنافسون", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0401-.mp3" },
    { title: "في رحاب الجنة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0403-.mp3" },

    /* دفعة سابعة من محاضرات الشيخ نبيل العوضي */
    { title: "في ظل العرش", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0406-.mp3" },
    { title: "قرة العيون", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0409-.mp3" },
    { title: "قصة السامري", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0413-.mp3" },
    { title: "قصة سبأ", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0417-.mp3" },
    { title: "قضايا تهم المرأة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0425-.mp3" },
    { title: "قلوب الأحبة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0427-.mp3" },
    { title: "قلوب بيضاء", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0428-.mp3" },
    { title: "قوم صالح", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0429-.mp3" },
    { title: "كفى بالموت واعظاً", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0432-.mp3" },
    { title: "كل نفس ذائقة الموت", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0433-.mp3" },
    { title: "كلنا مذنبون", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0436-.mp3" },
    { title: "كم نشتاق إليه: الفاروق عمر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0437-.mp3" },
    { title: "لا تحاسدوا", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0449-.mp3" },
    { title: "لحظة لا بد منها", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0451-.mp3" },
    { title: "لذة الطاعة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0452-.mp3" },

    /* دفعة ثامنة من محاضرات الشيخ نبيل العوضي */
    { title: "للمتزوجين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0455-.mp3" },
    { title: "للنساء فقط", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0457-.mp3" },
    { title: "لنخرج العباد من عبادة العباد", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0463-.mp3" },
    { title: "ما أجمل الطاعات", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0465-.mp3" },
    { title: "مشاكل وحلول", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0477-.mp3" },
    { title: "مع الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0481-.mp3" },
    { title: "مفاتيح السعادة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0484-.mp3" },
    { title: "مفهوم الحب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0485-.mp3" },
    { title: "مكارم الأخلاق", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0494-.mp3" },
    { title: "من الطارق؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0530-.mp3" },
    { title: "نصيحة للشباب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0547-.mp3" },
    { title: "نعيم الجنة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0550-.mp3" },
    { title: "نكهة الطاعة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0552-.mp3" },
    { title: "هموم الشباب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0568-.mp3" },
    { title: "ولدي", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0596-.mp3" },

    /* دفعة تاسعة من محاضرات الشيخ نبيل العوضي */
    { title: "لقاء الأحبة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0453-.mp3" },
    { title: "ليالي رمضان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0464-.mp3" },
    { title: "ما الخلاص", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0466-.mp3" },
    { title: "مسؤوليتك في المجتمع", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0476-.mp3" },
    { title: "مشاهد القيامة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0478-.mp3" },
    { title: "مشكلات وحلول", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0480-.mp3" },
    { title: "أتدرون من المفلس؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0489-.mp3" },
    { title: "فضل الأم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0492-.mp3" },
    { title: "من أسباب دخول الجنة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0529-.mp3" },
    { title: "من روائع القرآن", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0532-.mp3" },
    { title: "ميزان الآخرة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0538-.mp3" },
    { title: "نسائم رمضان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0544-.mp3" },
    { title: "نفحات إيمانية", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0551-.mp3" },
    { title: "نهاية العام ومحاسبة النفس", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0556-.mp3" },
    { title: "وقفات مع الشباب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0592-.mp3" },

    /* دفعة عاشرة من محاضرات الشيخ نبيل العوضي */
    { title: "للمرأة قصص وعبر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0456-.mp3" },
    { title: "لمن الملك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0462-.mp3" },
    { title: "ما الهم الذي تحمله؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0467-.mp3" },
    { title: "معذرةً إلى ربكم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0483-.mp3" },
    { title: "أفلا يتدبرون القرآن", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0488-.mp3" },
    { title: "ملوك الحرية", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0496-.mp3" },
    { title: "من لهؤلاء المظلومين؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0534-.mp3" },
    { title: "منطلق القوة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0535-.mp3" },
    { title: "نصرة المسلمين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0546-.mp3" },
    { title: "نماذج من أحوال السلف", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0553-.mp3" },
    { title: "هذا الحبيب صلى الله عليه وسلم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0560-.mp3" },
    { title: "هل وجدتم السعادة؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0564-.mp3" },
    { title: "وسائل تقوية الإيمان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0583-.mp3" },
    { title: "وقفات رمضانية", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0589-.mp3" },
    { title: "يا عبادي", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0599-.mp3" },

    /* دفعة حادية عشرة من محاضرات الشيخ نبيل العوضي */
    { title: "اجتهاد السلف في العبادة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0002-.mp3" },
    { title: "احذر الصغائر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0004-.mp3" },
    { title: "أحوال الناس يوم الحساب", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0006-.mp3" },
    { title: "اذكر الله يذكرك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0012-.mp3" },
    { title: "أربعة فضائل", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0014-.mp3" },
    { title: "استثمار الأوقات", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0018-.mp3" },
    { title: "أصحاب محمد صلى الله عليه وسلم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0022-.mp3" },
    { title: "أعظم جريمة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0026-.mp3" },
    { title: "ألا تحبون أن يغفر الله لكم؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0034-.mp3" },
    { title: "الإخلاص", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0045-.mp3" },
    { title: "الأمر بالمعروف والنهي عن المنكر", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0058-.mp3" },
    { title: "البشارة العظيمة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0063-.mp3" },
    { title: "التائبون", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0068-.mp3" },
    { title: "الترغيب بالحج", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0072-.mp3" },
    { title: "الجرأة على الدين", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0084-.mp3" },
    { title: "الجود والكرم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0087-.mp3" },
    { title: "الحسبة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0090-.mp3" },
    { title: "الخوف من الله عز وجل", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0099-.mp3" },
    { title: "الدين نصفان", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0105-.mp3" },
    { title: "الرشوة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0113-.mp3" },
    { title: "الشباب والقرآن الكريم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0121-.mp3" },
    { title: "الصابرون على الحق", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0126-.mp3" },
    { title: "العائدون إلى الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0139-.mp3" },
    { title: "المسابقة الدولية للقرآن الكريم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0161-.mp3" },
    { title: "أمسك عليك لسانك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0186-.mp3" },
    { title: "أولياء الله", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0204-.mp3" },
    { title: "أيام الفاروق عمر رضي الله عنه", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0209-.mp3" },
    { title: "تاج الوقار", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0227-.mp3" },
    { title: "تأملات في سورة يوسف", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0228-.mp3" },
    { title: "ثمرة الفضيلة", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0240-.mp3" },
    { title: "أفلا يتدبرون القرآن؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0488-.mp3" },
    { title: "أتدرون من المفلس؟", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0489-.mp3" },
    { title: "فكر اليوم في لسانك وحاسب نفسك", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0493-.mp3" },
    { title: "عزة المسلم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0364-.mp3" },
    { title: "مرض العصر: الهم", sheikh: "الشيخ نبيل العوضي", url: "https://archive.org/download/Nabil-3awadi_Mawsoa-mp3/0475-.mp3" },
];

// تسخين مبكر للاتصال بخادم الصوتيات (archive.org) عند فتح قسم "المواعظ":
// نفتح اتصالًا شبكيًا خفيفًا فور دخول المستخدم للقسم بدل انتظار ضغطه على
// "تشغيل"، فتكتمل خطوات DNS/TLS مسبقًا ويبدأ الصوت فورًا عند الضغط الفعلي.
// نستخدم mode: 'no-cors' لأن الهدف فتح الاتصال فقط دون الحاجة لقراءة المحتوى،
// ونكتفي بمحاولة واحدة لكل جلسة تصفح حتى لا نستهلك بيانات المستخدم دون داع.
let soundsWarmupDone = false;
function warmupSoundsConnection() {
    if (soundsWarmupDone || !soundsData.length) return;
    soundsWarmupDone = true;
    try {
        // مهم: نستخدم HEAD وليس GET هنا. طلب GET بلا قراءة محتواه لا يوقف
        // التنزيل فعليًا في أغلب المتصفحات، فكان الكود القديم يُحمّل ملف
        // الصوت الأول كاملاً في الخلفية بمجرد فتح قسم "المواعظ"، فيستهلك
        // جزءًا من نطاق الشبكة (خصوصًا على الجوال) ويبطئ أي تشغيل فعلي
        // يضغط عليه المستخدم بعدها مباشرة. HEAD يفتح نفس الاتصال
        // (DNS + TLS) دون تنزيل أي بايت من جسم الملف.
        fetch(soundsData[0].url, { method: 'HEAD', mode: 'no-cors' }).catch(() => {});
    } catch (e) { /* التسخين اختياري وليس حرجًا، يمكن تجاهل أي خطأ هنا بأمان */ }
}

let soundsOfflineUrlsCache = null;

function renderSoundsGrid(list) {
    const grid = document.getElementById('sounds-grid');
    if (!grid) return;
    grid.innerHTML = '';
    const offlineUrls = soundsOfflineUrlsCache || new Set();

    if (!list.length) {
        grid.innerHTML = `<p style="color:var(--text-muted); padding: 20px;">لا توجد نتائج مطابقة لبحثك.</p>`;
        return;
    }

    list.forEach(s => {
        const isSaved = offlineUrls.has(s.url);
        const card = document.createElement('div');
        card.className = 'sound-item-card glass-panel';
        card.innerHTML = `
            <div class="sound-card-info">
                <strong>${escapeHtml(s.title)}</strong>
                <div style="font-size:0.8rem; color:var(--text-muted); margin-top:4px;">${escapeHtml(s.sheikh)}</div>
                <div class="offline-badge" style="${isSaved ? '' : 'display:none;'}"><i class="fa-solid fa-check-circle"></i> متاح بدون إنترنت</div>
            </div>
            <div class="sound-card-actions">
                <button class="surah-download-btn" title="تحميل مباشر إلى الهاتف">
                    <i class="fa-solid fa-download"></i>
                </button>
                <button class="offline-save-btn ${isSaved ? 'is-saved' : ''}" title="${isSaved ? 'محفوظ - اضغط للحذف' : 'حفظ للاستماع بدون نت'}">
                    <i class="fa-solid ${isSaved ? 'fa-check' : 'fa-cloud-arrow-down'}"></i>
                </button>
                <button class="btn-primary" style="padding: 8px 15px;"><i class="fa-solid fa-play"></i> استماع</button>
            </div>`;

        const downloadBtn = card.querySelector('.surah-download-btn');
        downloadBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            downloadAudioFile(s.url, `${s.title} - ${s.sheikh}.mp3`);
        });

        const offlineBtn = card.querySelector('.offline-save-btn');
        const offlineBadge = card.querySelector('.offline-badge');
        offlineBtn.addEventListener('click', async (e) => {
            e.stopPropagation();
            await toggleSoundOffline(s, offlineBtn);
            offlineBadge.style.display = offlineBtn.classList.contains('is-saved') ? 'flex' : 'none';
        });

        card.querySelector('.btn-primary').addEventListener('click', (e) => {
            e.stopPropagation();
            playSoundSmart(s);
        });

        // النقر في أي مكان على بطاقة الموعظة يشغّلها مباشرة دون الحاجة للضغط على الزر بدقة
        card.style.cursor = 'pointer';
        card.addEventListener('click', () => playSoundSmart(s));
        grid.appendChild(card);
    });
}

async function loadSounds() {
    soundsOfflineUrlsCache = await listOfflineSoundUrls();
    renderSoundsGrid(soundsData);
}
// تنبيه أداء: كانت loadSounds() تُستدعى هنا مباشرة عند تحميل الصفحة، فتُنشئ
// 218 بطاقة (كل بطاقة معها تأثير ضبابي backdrop-filter + عدة مستمعي أحداث)
// فور فتح الموقع، حتى لو لم يزر المستخدم قسم "مواعظ" إطلاقًا. هذا يستهلك
// وقت المعالج الرئيسي أثناء التحميل الأول وقد يجعل أولى عمليات التنقل في
// الموقع تبدو أبطأ. الآن يتم بناء القائمة فقط عند فتح القسم فعليًا تمامًا
// كما هو معمول به أصلاً مع "القرآن الكريم" و"الإذاعات" — الخدمة والمحتوى
// المعروض للمستخدم يبقيان كما هما دون أي تغيير.
let soundsLoadStarted = false;
function ensureSoundsLoaded() {
    if (soundsLoadStarted) return;
    soundsLoadStarted = true;
    buildSheikhFilter();
    loadSounds();
}

// تعبئة قائمة "تصفية حسب الشيخ" (عنصرها موجود في index.html) بأسماء
// الشيوخ الفريدة المستخرجة من soundsData، مرة واحدة فقط.
let sheikhFilterBuilt = false;
function buildSheikhFilter() {
    if (sheikhFilterBuilt) return;
    const select = document.getElementById('sounds-sheikh-filter');
    if (!select) return;

    const sheikhs = [...new Set(soundsData.map(s => s.sheikh))]
        .sort((a, b) => a.localeCompare(b, 'ar'));

    select.innerHTML = `<option value="">كل الشيوخ</option>` +
        sheikhs.map(sh => `<option value="${escapeHtml(sh)}">${escapeHtml(sh)}</option>`).join('');

    sheikhFilterBuilt = true;
}

// البحث عن موعظة بالعنوان أو الشيخ (نصيًا أو صوتيًا)، مع إمكانية حصر
// النتائج بشيخ محدد عبر القائمة المنسدلة، داخل قسم المواعظ
function searchSounds() {
    const input = document.getElementById('sounds-search-input');
    const query = sanitizeTextInput(input ? input.value : '', 200).trim();

    const sheikhSelect = document.getElementById('sounds-sheikh-filter');
    const selectedSheikh = sheikhSelect ? sheikhSelect.value : '';

    let results = soundsData;
    if (selectedSheikh) {
        results = results.filter(s => s.sheikh === selectedSheikh);
    }
    if (query) {
        results = results.filter(s => s.title.includes(query) || s.sheikh.includes(query));
    }

    renderSoundsGrid(results);

    if (!results.length && (query || selectedSheikh)) {
        showFatwaToast(`لا توجد موعظة مطابقة لـ "${query || selectedSheikh}"`);
    }
}

function startSoundsVoiceSearch() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const btn = document.getElementById('sounds-mic-btn');
    if (!SpeechRecognition) {
        showFatwaToast('البحث الصوتي غير مدعوم في هذا المتصفح');
        return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = 'ar-SA';
    recognition.interimResults = false;

    btn.classList.add('listening');
    recognition.start();

    recognition.onresult = (e) => {
        const text = e.results[0][0].transcript;
        document.getElementById('sounds-search-input').value = text;
        searchSounds();
    };
    recognition.onend = () => btn.classList.remove('listening');
    recognition.onerror = () => btn.classList.remove('listening');
}

document.getElementById('sounds-search-input')?.addEventListener('keyup', (e) => {
    if (e.key === 'Enter') searchSounds();
});

// --- أذكار الصباح المحدثة بالكامل والشاملة مع الفضل ---
const azkarData = {
    sabah: [
        {
            text: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ. [آية الكرسى - البقرة 255].",
            count: 1,
            desc: "من قالها حين يصبح أُجير من الجن حتى يمسى."
        },
        {
            text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.",
            count: 3,
            desc: "من قالها حين يصبح وحين يمسى كفته من كل شىء (الإخلاص والمعوذتين)."
        },
        {
            text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
            count: 3,
            desc: "تُقْرأ مع الإخلاص والناس ثلاث مرات كفايَةً وحفظاً."
        },
        {
            text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.",
            count: 3,
            desc: "تعوذ من شر وسواس الخناس."
        },
        {
            text: "أَصْـبَحْنا وَأَصْـبَحَ المُـلْكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذا اليوم وَخَـيرَ ما بَعْـدَه ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذا اليوم وَشَرِّ ما بَعْـدَه، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر.",
            count: 1,
            desc: "استعاذة بخير اليوم وبركته وطلب العوذ من شر ما فيه."
        },
        {
            text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ .",
            count: 1,
            desc: "سيد الاستغفار: من قالها موقناً بها ومات في يومه قبل أن يمسى دخل الجنة."
        },
        {
            text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً.",
            count: 3,
            desc: "من قالها كان حقاً على الله أن يرضيه يوم القيامة."
        },
        {
            text: "اللّهُـمَّ إِنِّـي أصبحتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك.",
            count: 4,
            desc: "من قالها أربعة أطراف النهار أعتقه الله من النار."
        },
        {
            text: "اللّهُـمَّ ما أصبح بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر.",
            count: 1,
            desc: "من قالها حين يصبح أدى شكر يومه."
        },
        {
            text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.",
            count: 7,
            desc: "من قالها كفاه الله ما أهمه من أمر الدنيا والآخرة."
        },
        {
            text: "بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم.",
            count: 3,
            desc: "لم يضره من الله شيء طوال يومه."
        },
        {
            text: "اللّهُـمَّ بِكَ أَصْـبَحْنا وَبِكَ أَمْسَـينا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ النُّشُورُ.",
            count: 1,
            desc: "الاعتماد على الله سبحانه في الصباح."
        },
        {
            text: "أَصْبَحْنَا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ.",
            count: 1,
            desc: "الثبات على دين الإسلام."
        },
        {
            text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه.",
            count: 3,
            desc: "أجر عظيم يضاعف أضعاف التسبيح العادي."
        },
        {
            text: "اللّهُـمَّ عافِـني في بَدَنـي ، اللّهُـمَّ عافِـني في سَمْـعي ، اللّهُـمَّ عافِـني في بَصَـري ، لا إلهَ إلاّ أَنْـتَ.",
            count: 3,
            desc: "سؤال العافية والسلامة."
        },
        {
            text: "اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ.",
            count: 3,
            desc: "الاستعاذة من الكفر والفقر وعذاب القبر."
        },
        {
            text: "اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي ، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي ، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِنْ خَلْفـي وَعَن يَمـيني وَعَن شِمـالي ، وَمِن فَوْقـي ، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـي.",
            count: 1,
            desc: "الحفظ والأمان والعافية الشاملة."
        },
        {
            text: "يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ.",
            count: 3,
            desc: "تفويض الأمر لله وعدم التوكل على النفس."
        },
        {
            text: "أَصْبَحْنَا وَأَصْبَحَ الْمُلْكُ للهِ رَبِّ الْعَالَمَيْنِ، اللَّهُمَّ إِنَّي أسْأَلُكَ خَيْرَ هَذَه اليَوْمِ فَتْحَهَا ونَصْرَهَا، ونُوْرَهَا وبَرَكَتهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فيهِا وَشَرَّ مَا بَعْدَهَا.",
            count: 1,
            desc: "استجلاب البركة والخير لليوم القادم."
        },
        {
            text: "اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه ، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت ، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِرْكِهِ ، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم.",
            count: 1,
            desc: "الحماية من شر النفس والشيطان والشرور."
        },
        {
            text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق.",
            count: 3,
            desc: "حماية تامة من كل مخلوق يؤذي."
        },
        {
            text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد.",
            count: 10,
            desc: "من صلى على حين يصبح وحين يمسى أدركته شفاعتي يوم القيامة."
        },
        {
            text: "اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ.",
            count: 3,
            desc: "الاستعاذة من الشرك الاصغر والاكبر."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ.",
            count: 3,
            desc: "الاستعاذة من الهموم والديون وضعف النفس."
        },
        {
            text: "أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ.",
            count: 3,
            desc: "طلب المغفرة والتوبة."
        },
        {
            text: "يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ.",
            count: 3,
            desc: "التحميد والثناء على الله بما يليق بجلاله."
        },
        {
            text: "لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ.",
            count: 10,
            desc: "من قالها عشر مرات كان كمن أعرق أربعة أنفس من ولد إسماعيل."
        }
    ],
    masa: [
        {
            text: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nاللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ لاَ تَأْخُذُهُ سِنَةٌ وَلاَ نَوْمٌ لَّهُ مَا فِي السَّمَاوَاتِ وَمَا فِي الأَرْضِ مَن ذَا الَّذِي يَشْفَعُ عِنْدَهُ إِلاَّ بِإِذْنِهِ يَعْلَمُ مَا بَيْنَ أَيْدِيهِمْ وَمَا خَلْفَهُمْ وَلاَ يُحِيطُونَ بِشَيْءٍ مِّنْ عِلْمِهِ إِلاَّ بِمَا شَاء وَسِعَ كُرْسِيُّهُ السَّمَاوَاتِ وَالأَرْضَ وَلاَ يَؤُودُهُ حِفْظُهُمَا وَهُوَ الْعَلِيُّ الْعَظِيمُ. [آية الكرسى - البقرة 255].",
            count: 1,
            desc: "من قالها حين يمسى أُجير من الجن حتى يصبح."
        },
        {
            text: "أَعُوذُ بِاللهِ مِنْ الشَّيْطَانِ الرَّجِيمِ\nآمَنَ الرَّسُولُ بِمَا أُنْزِلَ إِلَيْهِ مِنْ رَبِّهِ وَالْمُؤْمِنُونَ ۚ كُلٌّ آمَنَ بِاللَّهِ وَمَلَائِكَتِهِ وَكُتُبِهِ وَرُسُلِهِ لَا نُفَرِّقُ بَيْنَ أَحَدٍ مِنْ رُسُلِهِ ۚ وَقَالُوا سَمِعْنَا وَأَطَعْنَا ۖ غُفْرَانَكَ رَبَّنَا وَإِلَيْكَ الْمَصِيرُ. لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا لَهَا مَا كَسَبَتْ وَعَلَيْهَا مَا اكْتَسَبَتْ رَبَّنَا لَا تُؤَاخِذْنَا إِنْ نَّسِينَآ أَوْ أَخْطَأْنَا رَبَّنَا وَلَا تَحْمِلْ عَلَيْنَا إِصْرًا كَمَا حَمَلْتَهُ عَلَى الَّذِينَ مِنْ قَبْلِنَا رَبَّنَا وَلَا تُحَمِّلْنَا مَا لَا طَاقَةَ لَنَا بِهِ وَاعْفُ عَنَّا وَاغْفِرْ لَنَا وَارْحَمْنَا أَنْتَ مَوْلَانَا فَانْصُرْنَا عَلَى الْقَوْمِ الْكَافِرِينَ. [البقرة 285 - 286].",
            count: 1,
            desc: "من قرأ آيتين من آخر سورة البقرة في ليلة كفتاه."
        },
        {
            text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ هُوَ ٱللَّهُ أَحَدٌ، ٱللَّهُ ٱلصَّمَدُ، لَمْ يَلِدْ وَلَمْ يُولَدْ، وَلَمْ يَكُن لَّهُۥ كُفُوًا أَحَدٌۢ.",
            count: 3,
            desc: "من قالها حين يصبح وحين يمسى كفته من كل شىء."
        },
        {
            text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلْفَلَقِ، مِن شَرِّ مَا خَلَقَ، وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ، وَمِن شَرِّ ٱلنَّفَّٰثَٰتِ فِى ٱلْعُقَدِ، وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ.",
            count: 3,
            desc: "حماية من الشرور والحسد."
        },
        {
            text: "بِسْمِ اللهِ الرَّحْمنِ الرَّحِيم\nقُلْ أَعُوذُ بِرَبِّ ٱلنَّاسِ، مَلِكِ ٱلنَّاسِ، إِلَٰهِ ٱلنَّاسِ، مِن شَرِّ ٱلْوَسْوَاسِ ٱلْخَنَّاسِ، ٱلَّذِى يُوَسْوِسُ فِى صُدُورِ ٱلنَّاسِ، مِنَ ٱلْجِنَّةِ وَٱلنَّاسِ.",
            count: 3,
            desc: "حماية من الوساوس."
        },
        {
            text: "أَمْسَيْـنا وَأَمْسـى المـلكُ لله وَالحَمدُ لله ، لا إلهَ إلاّ اللّهُ وَحدَهُ لا شَريكَ لهُ، لهُ المُـلكُ ولهُ الحَمْـد، وهُوَ على كلّ شَيءٍ قدير ، رَبِّ أسْـأَلُـكَ خَـيرَ ما في هـذهِ اللَّـيْلَةِ وَخَـيرَ ما بَعْـدَهـا ، وَأَعـوذُ بِكَ مِنْ شَـرِّ ما في هـذهِ اللَّـيْلةِ وَشَرِّ ما بَعْـدَهـا ، رَبِّ أَعـوذُبِكَ مِنَ الْكَسَـلِ وَسـوءِ الْكِـبَر ، رَبِّ أَعـوذُ بِكَ مِنْ عَـذابٍ في النّـارِ وَعَـذابٍ في القَـبْر.",
            count: 1,
            desc: "أذكار دخول المساء وطلب الخير والتبرك."
        },
        {
            text: "اللّهـمَّ أَنْتَ رَبِّـي لا إلهَ إلاّ أَنْتَ ، خَلَقْتَنـي وَأَنا عَبْـدُك ، وَأَنا عَلـى عَهْـدِكَ وَوَعْـدِكَ ما اسْتَـطَعْـت ، أَعـوذُبِكَ مِنْ شَـرِّ ما صَنَـعْت ، أَبـوءُ لَـكَ بِنِعْـمَتِـكَ عَلَـيَّ وَأَبـوءُ بِذَنْـبي فَاغْفـِرْ لي فَإِنَّـهُ لا يَغْـفِرُ الذُّنـوبَ إِلاّ أَنْتَ .",
            count: 1,
            desc: "من قالها موقناً بها حين يمسى ومات من ليلته دخل الجنة."
        },
        {
            text: "رَضيـتُ بِاللهِ رَبَّـاً وَبِالإسْلامِ ديـناً وَبِمُحَـمَّدٍ صلى الله عليه وسلم نَبِيّـاً.",
            count: 3,
            desc: "من قالها كان حقاً على الله أن يرضيه يوم القيامة."
        },
        {
            text: "اللّهُـمَّ إِنِّـي أَمسيتُ أُشْـهِدُك ، وَأُشْـهِدُ حَمَلَـةَ عَـرْشِـك ، وَمَلَائِكَتَكَ ، وَجَمـيعَ خَلْـقِك ، أَنَّـكَ أَنْـتَ اللهُ لا إلهَ إلاّ أَنْـتَ وَحْـدَكَ لا شَريكَ لَـك ، وَأَنَّ مُحَمّـداً عَبْـدُكَ وَرَسـولُـك.",
            count: 4,
            desc: "من قالها أربعة أطراف النهار أعتقه الله من النار."
        },
        {
            text: "اللّهُـمَّ ما أَمسى بي مِـنْ نِعْـمَةٍ أَو بِأَحَـدٍ مِـنْ خَلْـقِك ، فَمِـنْكَ وَحْـدَكَ لا شريكَ لَـك ، فَلَـكَ الْحَمْـدُ وَلَـكَ الشُّكْـر.",
            count: 1,
            desc: "من قالها حين يمسى أدى شكر ليلته."
        },
        {
            text: "حَسْبِـيَ اللّهُ لا إلهَ إلاّ هُوَ عَلَـيهِ تَوَكَّـلتُ وَهُوَ رَبُّ العَرْشِ العَظـيم.",
            count: 7,
            desc: "من قالها كفاه الله ما أهمه من أمر الدنيا والآخرة."
        },
        {
            text: "بِسـمِ اللهِ الذي لا يَضُـرُّ مَعَ اسمِـهِ شَيءٌ في الأرْضِ وَلا في السّمـاءِ وَهـوَ السّمـيعُ العَلـيم.",
            count: 3,
            desc: "لم يضره من الله شيء طوال ليلته."
        },
        {
            text: "اللّهُـمَّ بِكَ أَمْسَـينا وَبِكَ أَصْـبَحْنا، وَبِكَ نَحْـيا وَبِكَ نَمُـوتُ وَإِلَـيْكَ الْمَصِيرُ.",
            count: 1,
            desc: "الاعتماد على الله سبحانه."
        },
        {
            text: "أَمْسَيْنَا عَلَى فِطْرَةِ الإسْلاَمِ، وَعَلَى كَلِمَةِ الإِخْلاَصِ، وَعَلَى دِينِ نَبِيِّنَا مُحَمَّدٍ صَلَّى اللهُ عَلَيْهِ وَسَلَّمَ، وَعَلَى مِلَّةِ أَبِينَا إبْرَاهِيمَ حَنِيفاً مُسْلِماً وَمَا كَانَ مِنَ المُشْرِكِينَ.",
            count: 1,
            desc: "الثبات على دين الإسلام."
        },
        {
            text: "سُبْحـانَ اللهِ وَبِحَمْـدِهِ عَدَدَ خَلْـقِه ، وَرِضـا نَفْسِـه ، وَزِنَـةَ عَـرْشِـه ، وَمِـدادَ كَلِمـاتِـه.",
            count: 3,
            desc: "أجر عظيم يضاعف أضعاف التسبيح العادي."
        },
        {
            text: "اللّهُـمَّ عافِـني في بَدَنـي ، اللّهُـمَّ عافِـني في سَمْـعي ، اللّهُـمَّ عافِـني في بَصَـري ، لا إلهَ إلاّ أَنْـتَ.",
            count: 3,
            desc: "سؤال العافية والسلامة."
        },
        {
            text: "اللّهُـمَّ إِنّـي أَعـوذُ بِكَ مِنَ الْكُـفر ، وَالفَـقْر ، وَأَعـوذُ بِكَ مِنْ عَذابِ القَـبْر ، لا إلهَ إلاّ أَنْـتَ.",
            count: 3,
            desc: "الاستعاذة من الكفر والفقر وعذاب القبر."
        },
        {
            text: "اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في الدُّنْـيا وَالآخِـرَة ، اللّهُـمَّ إِنِّـي أسْـأَلُـكَ العَـفْوَ وَالعـافِـيةَ في ديني وَدُنْـيايَ وَأهْـلي وَمالـي ، اللّهُـمَّ اسْتُـرْ عـوْراتي وَآمِـنْ رَوْعاتـي ، اللّهُـمَّ احْفَظْـني مِن بَـينِ يَدَيَّ وَمِنْ خَلْفـي وَعَن يَمـيني وَعَن شِمـالي ، وَمِن فَوْقـي ، وَأَعـوذُ بِعَظَمَـتِكَ أَن أُغْـتالَ مِن تَحْتـي.",
            count: 1,
            desc: "الحفظ والأمان والعافية الشاملة."
        },
        {
            text: "يَا حَيُّ يَا قيُّومُ بِرَحْمَتِكَ أسْتَغِيثُ أصْلِحْ لِي شَأنِي كُلَّهُ وَلاَ تَكِلْنِي إلَى نَفْسِي طَـرْفَةَ عَيْنٍ.",
            count: 3,
            desc: "تفويض الأمر لله وعدم التوكل على النفس."
        },
        {
            text: "أَمْسَيْنا وَأَمْسَى الْمُلْكُ للهِ رَبِّ الْعَالَمَيْنِ، اللَّهُمَّ إِنَّي أسْأَلُكَ خَيْرَ هَذَه اللَّيْلَةِ فَتْحَهَا ونَصْرَهَا، ونُوْرَهَا وبَرَكَتهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فيهِا وَشَرَّ مَا بَعْدَهَا.",
            count: 1,
            desc: "استجلاب البركة والخير لليلة القادمة."
        },
        {
            text: "اللّهُـمَّ عالِـمَ الغَـيْبِ وَالشّـهادَةِ فاطِـرَ السّماواتِ وَالأرْضِ رَبَّ كـلِّ شَـيءٍ وَمَليـكَه ، أَشْهَـدُ أَنْ لا إِلـهَ إِلاّ أَنْت ، أَعـوذُ بِكَ مِن شَـرِّ نَفْسـي وَمِن شَـرِّ الشَّيْـطانِ وَشِرْكِهِ ، وَأَنْ أَقْتَـرِفَ عَلـى نَفْسـي سوءاً أَوْ أَجُـرَّهُ إِلـى مُسْـلِم.",
            count: 1,
            desc: "الحماية من شر النفس والشيطان والشرور."
        },
        {
            text: "أَعـوذُ بِكَلِمـاتِ اللّهِ التّـامّـاتِ مِنْ شَـرِّ ما خَلَـق.",
            count: 3,
            desc: "حماية تامة من كل مخلوق يؤذي."
        },
        {
            text: "اللَّهُمَّ صَلِّ وَسَلِّمْ وَبَارِكْ على نَبِيِّنَا مُحمَّد.",
            count: 10,
            desc: "من صلى على حين يصبح وحين يمسى أدركته شفاعتي يوم القيامة."
        },
        {
            text: "اللَّهُمَّ إِنَّا نَعُوذُ بِكَ مِنْ أَنْ نُشْرِكَ بِكَ شَيْئًا نَعْلَمُهُ ، وَنَسْتَغْفِرُكَ لِمَا لَا نَعْلَمُهُ.",
            count: 3,
            desc: "الاستعاذة من الشرك الاصغر والاكبر."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنْ الْهَمِّ وَالْحَزَنِ، وَأَعُوذُ بِكَ مِنْ الْعَجْزِ وَالْكَسَلِ، وَأَعُوذُ بِكَ مِنْ الْجُبْنِ وَالْبُخْلِ، وَأَعُوذُ بِكَ مِنْ غَلَبَةِ الدَّيْنِ، وَقَهْرِ الرِّجَالِ.",
            count: 3,
            desc: "الاستعاذة من الهموم والديون وضعف النفس."
        },
        {
            text: "أسْتَغْفِرُ اللهَ العَظِيمَ الَّذِي لاَ إلَهَ إلاَّ هُوَ، الحَيُّ القَيُّومُ، وَأتُوبُ إلَيهِ.",
            count: 3,
            desc: "طلب المغفرة والتوبة."
        },
        {
            text: "يَا رَبِّ , لَكَ الْحَمْدُ كَمَا يَنْبَغِي لِجَلَالِ وَجْهِكَ , وَلِعَظِيمِ سُلْطَانِكَ.",
            count: 3,
            desc: "التحميد والثناء على الله بما يليق بجلاله."
        },
        {
            text: "لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ وَهُوَ عَلَى كُلِّ شَيْءِ قَدِيرِ.",
            count: 10,
            desc: "من قالها عشر مرات كان كمن أعرق أربعة أنفس من ولد إسماعيل."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ خَيْرَ هَذِهِ اللَّيْلَةِ، فَتْحَهَا، وَنَصْرَهَا، وَنُورَهَا، وَبَرَكَتَهَا، وَهُدَاهَا، وَأَعُوذُ بِكَ مِنْ شَرِّ مَا فِيهَا وَشَرِّ مَا بَعْدَهَا.",
            count: 1,
            desc: "دعاء استفتاح الليل بطلب الخير والبركة والاستعاذة من شره."
        },
        {
            text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ.",
            count: 1,
            desc: "استعاذة شاملة من شر النفس ووساوس الشيطان وشركه."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَمْسَيْتُ مِنْكَ فِي نِعْمَةٍ وَعَافِيَةٍ وَسِتْرٍ، فَأَتِمَّ عَلَيَّ نِعْمَتَكَ، وَعَافِيَتَكَ، وَسِتْرَكَ، فِي الدُّنْيَا وَالْآخِرَةِ.",
            count: 3,
            desc: "سؤال الله إتمام النعمة والعافية والستر في الدنيا والآخرة."
        },
        {
            text: "يَا مُقَلِّبَ الْقُلُوبِ ثَبِّتْ قَلْبِي عَلَى دِينِكَ.",
            count: 3,
            desc: "دعاء عظيم كان النبي صلى الله عليه وسلم يكثر منه، لطلب الثبات على الدين."
        },
        {
            text: "اللَّهُمَّ مُصَرِّفَ الْقُلُوبِ صَرِّفْ قُلُوبَنَا عَلَى طَاعَتِكَ.",
            count: 3,
            desc: "طلب توجيه القلب نحو طاعة الله وحده."
        },
        {
            text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ.",
            count: 100,
            desc: "من قالها مائة مرة حُطّت خطاياه وإن كانت مثل زبد البحر."
        },
        {
            text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.",
            count: 1,
            desc: "كنز من كنوز الجنة، تفويض كامل للأمر إلى الله وترك الحول والقوة إليه."
        },
        {
            text: "اللَّهُمَّ أَنْتَ خَلَقْتَنِي وَأَنْتَ تَهْدِينِي، وَأَنْتَ تُطْعِمُنِي وَتَسْقِينِي، وَأَنْتَ تُمِيتُنِي وَتُحْيِينِي.",
            count: 1,
            desc: "إقرار بربوبية الله الكاملة على العبد في كل أحواله."
        },
        {
            text: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَوَسِّعْ لِي فِي دَارِي، وَبَارِكْ لِي فِيمَا رَزَقْتَنِي.",
            count: 1,
            desc: "دعاء جامع لطلب المغفرة وسعة الرزق والبركة فيه."
        }
    ],
    sleep: [
        {
            text: "بِاسْمِكَ رَبِّي وَضَعْتُ جَنْبِي، وَبِكَ أَرْفَعُهُ، فَإِنْ أَمْسَكْتَ نَفْسِي فَارْحَمْهَا، وَإِنْ أَرْسَلْتَهَا فَاحْفَظْهَا، بِمَا تَحْفَظُ بِهِ عِبَادَكَ الصَّالِحِينَ.",
            count: 1,
            desc: "دعاء وضع الجنب"
        },
        {
            text: "اللَّهُمَّ إِنَّكَ خَلَقْتَ نَفْسِي وَأَنْتَ تَوَفَّاهَا، لَكَ مَمَاتُهَا وَمَحْيَاهَا، إِنْ أَحْيَيْتَهَا فَاحْفَظْهَا، وَإِنْ أَمَتَّهَا فَاغْفِرْ لَهَا، اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ.",
            count: 1,
            desc: "دعاء توفي النفس"
        },
        {
            text: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا.",
            count: 1,
            desc: "أذكار النوم المختصرة"
        },
        {
            text: "سُبْحَانَ اللَّهِ (33 مرة)، وَالْحَمْدُ لِلَّهِ (33 مرة)، وَاللَّهُ أَكْبَرُ (34 مرة).",
            count: 1,
            desc: "خير من خادم (عند الأخذ المضجع)"
        },
        {
            text: "اللَّهُمَّ قِنِي عَذَابَكَ يَوْمَ تَبْعَثُ عِبَادَكَ (ثلاث مرات).",
            count: 3,
            desc: "الوقاية من العذاب"
        },
        {
            text: "اللَّهُمَّ أَسْلَمْتُ نَفْسِي إِلَيْكَ، وَفَوَّضْتُ أَمْرِي إِلَيْكَ، وَوَجَّهْتُ وَجْهِي إِلَيْكَ، وَأَلْجَأْتُ ظَهْرِي إِلَيْكَ، رَغْبَةً وَرَهْبَةً إِلَيْكَ، لاَ مَلْجَأَ وَلاَ مَنْجَا مِنْكَ إِلاَّ إِلَيْكَ، آمَنْتُ بِكِتَابِكَ الَّذِي أَنْزَلْتَ، وَبِنَبِيِّكَ الَّذِي أَرْسَلْتَ.",
            count: 1,
            desc: "دعاء الاستسلام لله قبل النوم (من مات مات على الفطرة)"
        },
        {
            text: "اللَّهُمَّ رَبَّ السَّمَاوَاتِ وَرَبَّ الْأَرْضِ وَرَبَّ الْعَرْشِ الْعَظِيمِ، رَبَّنَا وَرَبَّ كُلِّ شَيْءٍ، فَالِقَ الْحَبِّ وَالنَّوَى، مُنْزِلَ التَّوْرَاةِ وَالْإِنْجِيلِ وَالْفُرْقَانِ، أَعُوذُ بِكَ مِنْ شَرِّ كُلِّ شَيْءٍ أَنْتَ آخِذٌ بِنَاصِيَتِهِ.",
            count: 1,
            desc: "الاستعاذة الشاملة قبل النوم"
        },
        {
            text: "اللَّهُمَّ أَنْتَ الْأَوَّلُ فَلَيْسَ قَبْلَكَ شَيْءٌ، وَأَنْتَ الْآخِرُ فَلَيْسَ بَعْدَكَ شَيْءٌ، وَأَنْتَ الظَّاهِرُ فَلَيْسَ فَوْقَكَ شَيْءٌ، وَأَنْتَ الْبَاطِنُ فَلَيْسَ دُونَكَ شَيْءٌ، اقْضِ عَنَّا الدَّيْنَ وَأَغْنِنَا مِنَ الْفَقْرِ.",
            count: 1,
            desc: "دعاء قضاء الدين والأغناء"
        },
        {
            text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا، وَكَفَانَا، وَآوَانَا، فَكَمْ مِمَّنْ لَا كَافِيَ لَهُ وَلَا مُؤْوِيَ.",
            count: 1,
            desc: "حمد الله على النعم عند المنام"
        },
        {
            text: "اللَّهُمَّ عَالِمَ الْغَيْبِ وَالشَّهَادَةِ فَاطِرَ السَّمَاوَاتِ وَالْأَرْضِ، رَبَّ كُلِّ شَيْءٍ وَمَلِيكَهُ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَعُوذُ بِكَ مِنْ شَرِّ نَفْسِي، وَمِنْ شَرِّ الشَّيْطَانِ وَشِرْكِهِ.",
            count: 1,
            desc: "الاستعاذة من الشيطان وشركه"
        },
        {
            text: "قراءة آية الكرسي: (اللّهُ لاَ إِلَـهَ إِلاَّ هُوَ الْحَيُّ الْقَيُّومُ...)، وفضلها ألا يزال عليه من الله حافظ ولا يقربه شيطان حتى يصبح.",
            count: 1,
            desc: "آية الكرسي للحفظ"
        },
        {
            text: "قراءة خواتيم سورة البقرة من قوله تعالى: (آمَنَ الرَّسُولُ بِمَا أُنزِلَ إِلَيْهِ مِن رَّبِّهِ...)، وفضلها أن من قرأهما في ليلة كفتاه.",
            count: 1,
            desc: "آخر آيتين من سورة البقرة"
        },
        {
            text: "جمع الكفين والنفث فيهما وقراءة سورة الإخلاص، والفلق، والناس (ثلاث مرات)، ثم مسح ما استطاع من الجسد يبدأ بهما على الرأس والوجه وما أقبل من الجسد.",
            count: 3,
            desc: "المعوذات الثلاث والنفث قبل النوم"
        }
    ],
    salah: [
        {
            text: "أستغفر الله، أستغفر الله، أستغفر الله.",
            count: 1,
            desc: "الاستغفار ثلاثاً بعد الانصراف من الصلاة."
        },
        {
            text: "اللهم أنت السلام ومنك السلام، تباركت يا ذا الجلال والإكرام.",
            count: 1,
            desc: "من أسباب الطمأنينة بعد الصلاة."
        },
        {
            text: "لا إله إلا الله وحده لا شريك له، له الملك وله الحمد، وهو على كل شيء قدير.",
            count: 1,
            desc: "تهليل دبر كل صلاة مكتوبة."
        },
        {
            text: "سُبْحَانَ اللَّهِ (33)، وَالْحَمْدُ لِلَّهِ (33)، وَاللَّهُ أَكْبَرُ (33)، وَالتَّمَامُ مِائَةً: لَا إلَه إلّا اللهُ وَحْدَهُ لَا شَرِيكَ لَهُ.",
            count: 1,
            desc: "غفرت خطاياه وإن كانت مثل زبد البحر."
        },
        {
            text: "اللَّهُمَّ لَا مَانِعَ لِمَا أَعْطَيْتَ، وَلَا مُعْطِيَ لِمَا مَنَعْتَ، وَلَا يَنْفَعُ ذَا الْجَدِّ مِنْكَ الْجَدُّ.",
            count: 1,
            desc: "كان النبي صلى الله عليه وسلم يقولها دبر كل صلاة مكتوبة، إقراراً بأن الأمر كله بيد الله."
        },
        {
            text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ، لَا إِلَهَ إِلَّا اللَّهُ، وَلَا نَعْبُدُ إِلَّا إِيَّاهُ، لَهُ النِّعْمَةُ وَلَهُ الْفَضْلُ وَلَهُ الثَّنَاءُ الْحَسَنُ، لَا إِلَهَ إِلَّا اللَّهُ مُخْلِصِينَ لَهُ الدِّينَ وَلَوْ كَرِهَ الْكَافِرُونَ.",
            count: 1,
            desc: "كان صلى الله عليه وسلم يهلل بها دبر كل صلاة مكتوبة."
        },
        {
            text: "اللَّهُمَّ أَعِنِّي عَلَى ذِكْرِكَ، وَشُكْرِكَ، وَحُسْنِ عِبَادَتِكَ.",
            count: 1,
            desc: "وصية النبي صلى الله عليه وسلم لمعاذ بن جبل أن يقولها دبر كل صلاة."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْجُبْنِ، وَأَعُوذُ بِكَ أَنْ أُرَدَّ إِلَى أَرْذَلِ الْعُمُرِ، وَأَعُوذُ بِكَ مِنْ فِتْنَةِ الدُّنْيَا، وَأَعُوذُ بِكَ مِنْ عَذَابِ الْقَبْرِ.",
            count: 1,
            desc: "من دعاء النبي صلى الله عليه وسلم بعد التشهد قبل السلام، استعاذة شاملة من شرور الدنيا والآخرة."
        },
        {
            text: "اللَّهُمَّ اغْفِرْ لِي مَا قَدَّمْتُ وَمَا أَخَّرْتُ، وَمَا أَسْرَرْتُ وَمَا أَعْلَنْتُ، وَمَا أَسْرَفْتُ، وَمَا أَنْتَ أَعْلَمُ بِهِ مِنِّي، أَنْتَ الْمُقَدِّمُ وَأَنْتَ الْمُؤَخِّرُ، لَا إِلَهَ إِلَّا أَنْتَ.",
            count: 1,
            desc: "من دعاء النبي صلى الله عليه وسلم في صلاة الليل، جامع لطلب المغفرة الشاملة."
        },
        {
            text: "قراءة آية الكرسي دبر كل صلاة مكتوبة.",
            count: 1,
            desc: "من قرأها دبر كل صلاة مكتوبة لم يمنعه من دخول الجنة إلا أن يموت."
        }
    ],
    praise: [
        {
            text: "سُبْحَانَ اللَّهِ وَبِحَمْدِهِ، سُبْحَانَ اللَّهِ الْعَظِيمِ.",
            count: 100,
            desc: "خفيفتان على اللسان، ثقيلتان في الميزان، حبيبتان إلى الرحمن."
        },
        {
            text: "لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.",
            count: 100,
            desc: "كنز من كنوز الجنة."
        },
        {
            text: "سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ.",
            count: 100,
            desc: "أحب الكلام إلى الله."
        },
        {
            text: "لا إله إلا أنت سبحانك إني كنت من الظالمين.",
            count: 100,
            desc: "دعوة ذي النون إذ دعا بها في بطن الحوت."
        }
    ],
    waking: [
        {
            text: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ.",
            count: 1,
            desc: "دعاء الاستيقاظ من النوم."
        },
        {
            text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ، سُبْحَانَ اللَّهِ، وَالْحَمْدُ لِلَّهِ، وَلَا إِلَهَ إِلَّا اللَّهُ، وَاللَّهُ أَكْبَرُ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ الْعَلِيِّ الْعَظِيمِ، رَبِّ اغْفِرْ لِي.",
            count: 1,
            desc: "من قالها حين يستيقظ غفر له، فإن دعا استجيب له، فإن قام فتوضأ ثم صلى قبلت صلاته."
        },
        {
            text: "الْحَمْدُ لِلَّهِ الَّذِي عَافَانِي فِي جَسَدِي، وَرَدَّ عَلَيَّ رُوحِي، وَأَذِنَ لِي بِذِكْرِهِ.",
            count: 1,
            desc: "دعاء عند الاستيقاظ من النوم."
        }
    ],
    misc: [
        {
            text: "لَا إِلَهَ إِلَّا اللَّهُ الْعَظِيمُ الْحَلِيمُ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ الْعَرْشِ الْعَظِيمِ، لَا إِلَهَ إِلَّا اللَّهُ رَبُّ السَّمَاوَاتِ وَرَبُّ الْأَرْضِ وَرَبُّ الْعَرْشِ الْكَرِيمِ.",
            count: 1,
            desc: "دعاء الكرب والهم."
        },
        {
            text: "اللَّهُمَّ إِنِّي عَبْدُكَ ابْنُ عَبْدِكَ ابْنُ أَمَتِكَ، نَاصِيَتِي بِيَدِكَ، مَاضٍ فِيَّ حُكْمُكَ، عَدْلٌ فِيَّ قَضَاؤُكَ، أَسْأَلُكَ بِكُلِّ اسْمٍ هُوَ لَكَ... أَنْ تَجْعَلَ الْقُرْآنَ رَبِيعَ قَلْبِي، وَنُورَ صَدْرِي، وَجَلَاءَ حُزْنِي، وَذَهَابَ هَمِّي.",
            count: 1,
            desc: "دعاء إذهاب الهم والحزن."
        },
        {
            text: "اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا، وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا.",
            count: 1,
            desc: "دعاء عند الشدة وطلب التيسير."
        },
        {
            text: "الْحَمْدُ لِلَّهِ عَلَى كُلِّ حَالٍ.",
            count: 1,
            desc: "يقال عند العطاس، ويرد عليه من سمعه: يرحمك الله، فيقول العاطس: يهديكم الله ويصلح بالكم."
        },
        {
            text: "لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ يُحْيِي وَيُمِيتُ وَهُوَ حَيٌّ لَا يَمُوتُ، بِيَدِهِ الْخَيْرُ وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
            count: 1,
            desc: "دعاء دخول السوق، ومن قالها كُتب له ألف ألف حسنة."
        },
        {
            text: "اللَّهُمَّ اغْفِرْ لِي ذَنْبِي، وَوَسِّعْ لِي فِي دَارِي، وَبَارِكْ لِي فِيمَا رَزَقْتَنِي.",
            count: 1,
            desc: "دعاء جامع للمغفرة وسعة الرزق والبركة."
        },
        {
            text: "سُبْحَانَكَ اللَّهُمَّ وَبِحَمْدِكَ، أَشْهَدُ أَنْ لَا إِلَهَ إِلَّا أَنْتَ، أَسْتَغْفِرُكَ وَأَتُوبُ إِلَيْكَ.",
            count: 1,
            desc: "كفارة المجلس، يقال عند القيام من المجلس."
        }
    ],
    mosque: [
        {
            text: "اللَّهُمَّ اجْعَلْ فِي قَلْبِي نُورًا، وَفِي لِسَانِي نُورًا، وَاجْعَلْ فِي سَمْعِي نُورًا، وَاجْعَلْ فِي بَصَرِي نُورًا، وَاجْعَلْ مِنْ خَلْفِي نُورًا، وَمِنْ أَمَامِي نُورًا، وَاجْعَلْ مِنْ فَوْقِي نُورًا، وَمِنْ تَحْتِي نُورًا، اللَّهُمَّ أَعْطِنِي نُورًا.",
            count: 1,
            desc: "دعاء الذهاب إلى المسجد."
        },
        {
            text: "أَعُوذُ بِاللَّهِ الْعَظِيمِ، وَبِوَجْهِهِ الْكَرِيمِ، وَسُلْطَانِهِ الْقَدِيمِ، مِنَ الشَّيْطَانِ الرَّجِيمِ. بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ. اللَّهُمَّ افْتَحْ لِي أَبْوَابَ رَحْمَتِكَ.",
            count: 1,
            desc: "دعاء دخول المسجد."
        },
        {
            text: "بِسْمِ اللَّهِ وَالصَّلَاةُ وَالسَّلَامُ عَلَى رَسُولِ اللَّهِ، اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنْ فَضْلِكَ، اللَّهُمَّ اعْصِمْنِي مِنَ الشَّيْطَانِ الرَّجِيمِ.",
            count: 1,
            desc: "دعاء الخروج من المسجد."
        }
    ],
    home: [
        {
            text: "بِسْمِ اللَّهِ وَلَجْنَا، وَبِسْمِ اللَّهِ خَرَجْنَا، وَعَلَى رَبِّنَا تَوَكَّلْنَا. ثُمَّ يُسَلِّمُ عَلَى أَهْلِهِ.",
            count: 1,
            desc: "دعاء دخول المنزل."
        },
        {
            text: "بِسْمِ اللَّهِ، تَوَكَّلْتُ عَلَى اللَّهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.",
            count: 1,
            desc: "دعاء الخروج من المنزل، يقال له: هُديت وكفيت ووقيت، وتنحى عنه الشيطان."
        }
    ],
    adhan: [
        {
            text: "يُرَدِّدُ الْمُسْتَمِعُ خَلْفَ الْمُؤَذِّنِ مِثْلَ مَا يَقُولُ، إِلَّا فِي (حَيَّ عَلَى الصَّلَاةِ، حَيَّ عَلَى الْفَلَاحِ) فَيَقُولُ: لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ.",
            count: 1,
            desc: "متابعة المؤذن أثناء الأذان."
        },
        {
            text: "اللَّهُمَّ رَبَّ هَذِهِ الدَّعْوَةِ التَّامَّةِ، وَالصَّلَاةِ الْقَائِمَةِ، آتِ مُحَمَّدًا الْوَسِيلَةَ وَالْفَضِيلَةَ، وَابْعَثْهُ مَقَامًا مَحْمُودًا الَّذِي وَعَدْتَهُ.",
            count: 1,
            desc: "الدعاء بعد الفراغ من إجابة الأذان، ومن قاله حلت له شفاعة النبي صلى الله عليه وسلم يوم القيامة."
        },
        {
            text: "الدُّعَاءُ بَيْنَ الْأَذَانِ وَالْإِقَامَةِ لَا يُرَدُّ، فَيُسْتَحَبُّ الْإِكْثَارُ مِنَ الدُّعَاءِ فِي هَذَا الْوَقْتِ.",
            count: 1,
            desc: "فضل الدعاء بين الأذان والإقامة."
        }
    ],
    khala: [
        {
            text: "اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ.",
            count: 1,
            desc: "دعاء دخول الخلاء (الحمام)."
        },
        {
            text: "غُفْرَانَكَ.",
            count: 1,
            desc: "دعاء الخروج من الخلاء."
        }
    ],
    food: [
        {
            text: "بِسْمِ اللَّهِ.",
            count: 1,
            desc: "التسمية قبل الطعام."
        },
        {
            text: "بِسْمِ اللَّهِ فِي أَوَّلِهِ وَآخِرِهِ.",
            count: 1,
            desc: "يقال إذا نسي التسمية في أول الطعام ثم تذكر أثناءه."
        },
        {
            text: "الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنِي هَذَا، وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ.",
            count: 1,
            desc: "دعاء بعد الفراغ من الطعام."
        },
        {
            text: "ذَهَبَ الظَّمَأُ، وَابْتَلَّتِ الْعُرُوقُ، وَثَبَتَ الْأَجْرُ إِنْ شَاءَ اللَّهُ.",
            count: 1,
            desc: "دعاء الصائم عند الإفطار."
        },
        {
            text: "اللَّهُمَّ بَارِكْ لَهُمْ فِيمَا رَزَقْتَهُمْ، وَاغْفِرْ لَهُمْ وَارْحَمْهُمْ.",
            count: 1,
            desc: "دعاء الضيف لأهل الطعام."
        },
        {
            text: "أَفْطَرَ عِنْدَكُمُ الصَّائِمُونَ، وَأَكَلَ طَعَامَكُمُ الْأَبْرَارُ، وَصَلَّتْ عَلَيْكُمُ الْمَلَائِكَةُ.",
            count: 1,
            desc: "دعاء الصائم إذا أفطر عند أهل بيت."
        }
    ],
    hajj: [
        {
            text: "لَبَّيْكَ اللَّهُمَّ لَبَّيْكَ، لَبَّيْكَ لَا شَرِيكَ لَكَ لَبَّيْكَ، إِنَّ الْحَمْدَ وَالنِّعْمَةَ لَكَ وَالْمُلْكَ، لَا شَرِيكَ لَكَ.",
            count: 1,
            desc: "التلبية في الحج والعمرة."
        },
        {
            text: "بِسْمِ اللَّهِ، وَاللَّهُ أَكْبَرُ.",
            count: 1,
            desc: "يقال عند استلام الحجر الأسود أو الإشارة إليه."
        },
        {
            text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً، وَفِي الْآخِرَةِ حَسَنَةً، وَقِنَا عَذَابَ النَّارِ.",
            count: 1,
            desc: "يقال بين الركن اليماني والحجر الأسود أثناء الطواف."
        },
        {
            text: "اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، اللَّهُ أَكْبَرُ، لَا إِلَهَ إِلَّا اللَّهُ وَحْدَهُ لَا شَرِيكَ لَهُ، لَهُ الْمُلْكُ وَلَهُ الْحَمْدُ، وَهُوَ عَلَى كُلِّ شَيْءٍ قَدِيرٌ.",
            count: 1,
            desc: "الذكر عند الوقوف على الصفا والمروة، مستقبلاً القبلة."
        },
        {
            text: "اللَّهُمَّ اغْفِرْ وَارْحَمْ، وَاعْفُ عَمَّا تَعْلَمُ، إِنَّكَ أَنْتَ الْأَعَزُّ الْأَكْرَمُ.",
            count: 1,
            desc: "من دعاء الوقوف بعرفة."
        }
    ],
    jawami: [
        {
            text: "رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ.",
            count: 1,
            desc: "من جوامع الدعاء في القرآن الكريم."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ الْعَافِيَةَ فِي الدُّنْيَا وَالْآخِرَةِ.",
            count: 1,
            desc: "دعاء جامع لطلب العافية."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ مِنَ الْخَيْرِ كُلِّهِ، عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ، وَأَعُوذُ بِكَ مِنَ الشَّرِّ كُلِّهِ، عَاجِلِهِ وَآجِلِهِ، مَا عَلِمْتُ مِنْهُ وَمَا لَمْ أَعْلَمْ.",
            count: 1,
            desc: "من أجمع الأدعية النبوية."
        },
        {
            text: "رَبِّ اشْرَحْ لِي صَدْرِي، وَيَسِّرْ لِي أَمْرِي.",
            count: 1,
            desc: "دعاء نبي الله موسى عليه السلام لطلب التيسير."
        },
        {
            text: "اللَّهُمَّ أَصْلِحْ لِي دِينِيَ الَّذِي هُوَ عِصْمَةُ أَمْرِي، وَأَصْلِحْ لِي دُنْيَايَ الَّتِي فِيهَا مَعَاشِي، وَأَصْلِحْ لِي آخِرَتِي الَّتِي فِيهَا مَعَادِي، وَاجْعَلِ الْحَيَاةَ زِيَادَةً لِي فِي كُلِّ خَيْرٍ، وَاجْعَلِ الْمَوْتَ رَاحَةً لِي مِنْ كُلِّ شَرٍّ.",
            count: 1,
            desc: "دعاء جامع لصلاح أمور الدين والدنيا والآخرة."
        },
        {
            text: "اللَّهُمَّ إِنِّي أَسْأَلُكَ حُبَّكَ، وَحُبَّ مَنْ يُحِبُّكَ، وَالْعَمَلَ الَّذِي يُبَلِّغُنِي حُبَّكَ.",
            count: 1,
            desc: "دعاء طلب محبة الله."
        }
    ],
    virtueDua: [
        {
            text: "الدُّعَاءُ هُوَ الْعِبَادَةُ.",
            count: 1,
            desc: "بيّن النبي صلى الله عليه وسلم أن الدعاء عبادة عظيمة، وتلا قوله تعالى: (وَقَالَ رَبُّكُمُ ادْعُونِي أَسْتَجِبْ لَكُمْ)."
        },
        {
            text: "لَيْسَ شَيْءٌ أَكْرَمَ عَلَى اللَّهِ تَعَالَى مِنَ الدُّعَاءِ.",
            count: 1,
            desc: "من فضائل الدعاء ومكانته عند الله عز وجل."
        },
        {
            text: "الدُّعَاءُ يَنْفَعُ مِمَّا نَزَلَ وَمِمَّا لَمْ يَنْزِلْ، فَعَلَيْكُمْ عِبَادَ اللَّهِ بِالدُّعَاءِ.",
            count: 1,
            desc: "بيان أن الدعاء سبب في دفع البلاء ورفعه."
        },
        {
            text: "يُسْتَجَابُ لِأَحَدِكُمْ مَا لَمْ يَعْجَلْ، يَقُولُ: دَعَوْتُ فَلَمْ يُسْتَجَبْ لِي.",
            count: 1,
            desc: "تحذير من استعجال الإجابة والقنوط منها."
        }
    ],
    virtueDhikr: [
        {
            text: "مَثَلُ الَّذِي يَذْكُرُ رَبَّهُ وَالَّذِي لَا يَذْكُرُ رَبَّهُ، مَثَلُ الْحَيِّ وَالْمَيِّتِ.",
            count: 1,
            desc: "بيان فضل الذكر وأن الغافل عنه كالميت."
        },
        {
            text: "أَلَا أُنَبِّئُكُمْ بِخَيْرِ أَعْمَالِكُمْ، وَأَزْكَاهَا عِنْدَ مَلِيكِكُمْ... ذِكْرُ اللَّهِ تَعَالَى.",
            count: 1,
            desc: "بيان أن ذكر الله من أفضل الأعمال وأزكاها."
        },
        {
            text: "مَنْ قَعَدَ مَقْعَدًا لَمْ يَذْكُرِ اللَّهَ فِيهِ كَانَتْ عَلَيْهِ مِنَ اللَّهِ تِرَةً، وَمَنِ اضْطَجَعَ مَضْجَعًا لَا يَذْكُرُ اللَّهَ فِيهِ كَانَتْ عَلَيْهِ مِنَ اللَّهِ تِرَةً.",
            count: 1,
            desc: "تحذير من الغفلة عن ذكر الله في المجالس."
        }
    ],
    virtueSurah: [
        {
            text: "اقْرَءُوا الْبَقَرَةَ فَإِنَّ أَخْذَهَا بَرَكَةٌ، وَتَرْكَهَا حَسْرَةٌ، وَلَا يَسْتَطِيعُهَا الْبَطَلَةُ.",
            count: 1,
            desc: "من فضائل سورة البقرة."
        },
        {
            text: "مَنْ قَرَأَ سُورَةَ الْكَهْفِ يَوْمَ الْجُمُعَةِ أَضَاءَ لَهُ مِنَ النُّورِ مَا بَيْنَ الْجُمُعَتَيْنِ.",
            count: 1,
            desc: "من فضائل سورة الكهف يوم الجمعة."
        },
        {
            text: "سُورَةٌ مِنَ الْقُرْآنِ ثَلَاثُونَ آيَةً، شَفَعَتْ لِصَاحِبِهَا حَتَّى غُفِرَ لَهُ، وَهِيَ سُورَةُ تَبَارَكَ.",
            count: 1,
            desc: "من فضائل سورة الملك."
        },
        {
            text: "قُلْ هُوَ اللَّهُ أَحَدٌ تَعْدِلُ ثُلُثَ الْقُرْآنِ.",
            count: 1,
            desc: "من فضائل سورة الإخلاص."
        },
        {
            text: "مَا قَرَأَ أَحَدٌ (قُلْ يَا أَيُّهَا الْكَافِرُونَ) فَهِيَ بَرَاءَةٌ مِنَ الشِّرْكِ.",
            count: 1,
            desc: "من فضائل سورة الكافرون."
        }
    ],
    virtueQuran: [
        {
            text: "خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ.",
            count: 1,
            desc: "بيان فضل تعلم القرآن وتعليمه."
        },
        {
            text: "مَنْ قَرَأَ حَرْفًا مِنْ كِتَابِ اللَّهِ فَلَهُ بِهِ حَسَنَةٌ، وَالْحَسَنَةُ بِعَشْرِ أَمْثَالِهَا، لَا أَقُولُ الم حَرْفٌ، وَلَكِنْ أَلِفٌ حَرْفٌ، وَلَامٌ حَرْفٌ، وَمِيمٌ حَرْفٌ.",
            count: 1,
            desc: "بيان عظيم الأجر في تلاوة القرآن حرفًا حرفًا."
        },
        {
            text: "اقْرَءُوا الْقُرْآنَ، فَإِنَّهُ يَأْتِي يَوْمَ الْقِيَامَةِ شَفِيعًا لِأَصْحَابِهِ.",
            count: 1,
            desc: "بيان شفاعة القرآن لأهله يوم القيامة."
        },
        {
            text: "الْمَاهِرُ بِالْقُرْآنِ مَعَ السَّفَرَةِ الْكِرَامِ الْبَرَرَةِ، وَالَّذِي يَقْرَأُ الْقُرْآنَ وَيَتَتَعْتَعُ فِيهِ وَهُوَ عَلَيْهِ شَاقٌّ لَهُ أَجْرَانِ.",
            count: 1,
            desc: "بيان أجر قارئ القرآن الماهر والمتعتع فيه."
        }
    ],
    names: [
        { text: "اللَّهُ", count: 1, desc: "الاسم الجامع لجميع صفات الألوهية." },
        { text: "الرَّحْمَنُ", count: 1, desc: "ذو الرحمة الواسعة الشاملة لجميع الخلق." },
        { text: "الرَّحِيمُ", count: 1, desc: "ذو الرحمة الخاصة بالمؤمنين." },
        { text: "الْمَلِكُ", count: 1, desc: "المالك لكل شيء المتصرف فيه." },
        { text: "الْقُدُّوسُ", count: 1, desc: "المنزه عن كل نقص وعيب." },
        { text: "السَّلَامُ", count: 1, desc: "السالم من كل عيب ونقص." },
        { text: "الْمُؤْمِنُ", count: 1, desc: "المصدق لرسله بالمعجزات، المؤمِّن لعباده من الظلم." },
        { text: "الْمُهَيْمِنُ", count: 1, desc: "الرقيب الحافظ الشاهد على كل شيء." },
        { text: "الْعَزِيزُ", count: 1, desc: "الغالب الذي لا يُغلب." },
        { text: "الْجَبَّارُ", count: 1, desc: "الذي يجبر الضعيف ويقهر الجبابرة." },
        { text: "الْمُتَكَبِّرُ", count: 1, desc: "المتعالي عن صفات الخلق." },
        { text: "الْخَالِقُ", count: 1, desc: "الذي أوجد الأشياء من العدم." },
        { text: "الْبَارِئُ", count: 1, desc: "الذي أنشأ الخلق بريئًا من التفاوت." },
        { text: "الْمُصَوِّرُ", count: 1, desc: "الذي صوّر جميع الموجودات بصورها الخاصة." },
        { text: "الْغَفَّارُ", count: 1, desc: "كثير المغفرة لذنوب عباده." },
        { text: "الْقَهَّارُ", count: 1, desc: "الغالب لكل شيء القاهر له." },
        { text: "الْوَهَّابُ", count: 1, desc: "كثير العطاء بلا مقابل." },
        { text: "الرَّزَّاقُ", count: 1, desc: "الذي يرزق جميع خلقه." },
        { text: "الْفَتَّاحُ", count: 1, desc: "الذي يفتح أبواب الرزق والرحمة والحكم." },
        { text: "الْعَلِيمُ", count: 1, desc: "المحيط علمه بكل شيء." },
        { text: "الْقَابِضُ", count: 1, desc: "الذي يقبض الأرزاق والأرواح بحكمته." },
        { text: "الْبَاسِطُ", count: 1, desc: "الذي يبسط الرزق لمن يشاء." },
        { text: "الْخَافِضُ", count: 1, desc: "الذي يخفض الجبابرة والمتكبرين." },
        { text: "الرَّافِعُ", count: 1, desc: "الذي يرفع أولياءه وأهل طاعته." },
        { text: "الْمُعِزُّ", count: 1, desc: "الذي يهب العزة لمن يشاء." },
        { text: "الْمُذِلُّ", count: 1, desc: "الذي يهب الذلة لمن يشاء." },
        { text: "السَّمِيعُ", count: 1, desc: "الذي يسمع كل شيء." },
        { text: "الْبَصِيرُ", count: 1, desc: "الذي يبصر كل شيء." },
        { text: "الْحَكَمُ", count: 1, desc: "الحاكم الفاصل بين الخلائق." },
        { text: "الْعَدْلُ", count: 1, desc: "الذي لا يجور في حكمه." },
        { text: "اللَّطِيفُ", count: 1, desc: "الرفيق بعباده العالم بدقائق الأمور." },
        { text: "الْخَبِيرُ", count: 1, desc: "العالم بحقائق الأمور وبواطنها." },
        { text: "الْحَلِيمُ", count: 1, desc: "الذي لا يعجل بالعقوبة مع قدرته." },
        { text: "الْعَظِيمُ", count: 1, desc: "الذي له العظمة الكاملة في ذاته وصفاته." },
        { text: "الْغَفُورُ", count: 1, desc: "الساتر لذنوب عباده الماحي لها." },
        { text: "الشَّكُورُ", count: 1, desc: "الذي يجازي على القليل من الطاعة بالكثير من الثواب." },
        { text: "الْعَلِيُّ", count: 1, desc: "المتعالي عن صفات الخلق." },
        { text: "الْكَبِيرُ", count: 1, desc: "الذي هو أكبر من كل شيء." },
        { text: "الْحَفِيظُ", count: 1, desc: "الذي يحفظ عباده وخلقه." },
        { text: "الْمُقِيتُ", count: 1, desc: "الذي يعطي أقوات الخلائق." },
        { text: "الْحَسِيبُ", count: 1, desc: "الكافي عباده، المحاسب لهم على أعمالهم." },
        { text: "الْجَلِيلُ", count: 1, desc: "الموصوف بصفات الجلال والعظمة." },
        { text: "الْكَرِيمُ", count: 1, desc: "كثير الخير، الجواد المعطي." },
        { text: "الرَّقِيبُ", count: 1, desc: "المطلع على خلقه لا يغيب عنه شيء." },
        { text: "الْمُجِيبُ", count: 1, desc: "الذي يجيب دعاء من دعاه." },
        { text: "الْوَاسِعُ", count: 1, desc: "الواسع الرحمة والعلم والفضل." },
        { text: "الْحَكِيمُ", count: 1, desc: "الذي يضع الأمور في مواضعها بحكمة." },
        { text: "الْوَدُودُ", count: 1, desc: "المحب لأوليائه المحبوب في قلوبهم." },
        { text: "الْمَجِيدُ", count: 1, desc: "ذو المجد والشرف الكامل." },
        { text: "الْبَاعِثُ", count: 1, desc: "الذي يبعث الخلق يوم القيامة." },
        { text: "الشَّهِيدُ", count: 1, desc: "المطلع على كل شيء الشاهد عليه." },
        { text: "الْحَقُّ", count: 1, desc: "الثابت الذي لا يزول، وكل ما سواه باطل يزول." },
        { text: "الْوَكِيلُ", count: 1, desc: "الذي يتولى أمور عباده المتوكلين عليه." },
        { text: "الْقَوِيُّ", count: 1, desc: "كامل القوة والقدرة." },
        { text: "الْمَتِينُ", count: 1, desc: "شديد القوة الذي لا يلحقه ضعف." },
        { text: "الْوَلِيُّ", count: 1, desc: "ناصر أوليائه ومحبيهم." },
        { text: "الْحَمِيدُ", count: 1, desc: "المحمود على كل حال، المستحق للحمد." },
        { text: "الْمُحْصِي", count: 1, desc: "الذي أحصى كل شيء عددًا." },
        { text: "الْمُبْدِئُ", count: 1, desc: "الذي بدأ الخلق من العدم." },
        { text: "الْمُعِيدُ", count: 1, desc: "الذي يعيد الخلق بعد الموت." },
        { text: "الْمُحْيِي", count: 1, desc: "الذي يهب الحياة." },
        { text: "الْمُمِيتُ", count: 1, desc: "الذي يقدّر الموت على خلقه." },
        { text: "الْحَيُّ", count: 1, desc: "الحياة الكاملة التي لا يعتريها زوال." },
        { text: "الْقَيُّومُ", count: 1, desc: "القائم بنفسه، القائم على غيره بتدبيره." },
        { text: "الْوَاجِدُ", count: 1, desc: "الغني الذي لا يفتقر." },
        { text: "الْمَاجِدُ", count: 1, desc: "الواسع الكرم العظيم المجد." },
        { text: "الْوَاحِدُ", count: 1, desc: "المتفرد بذاته وصفاته لا شريك له." },
        { text: "الصَّمَدُ", count: 1, desc: "الذي يُقصد في الحوائج، المستغني عن كل أحد." },
        { text: "الْقَادِرُ", count: 1, desc: "القادر على كل شيء." },
        { text: "الْمُقْتَدِرُ", count: 1, desc: "كامل القدرة نافذ المشيئة." },
        { text: "الْمُقَدِّمُ", count: 1, desc: "الذي يقدم من يشاء بفضله." },
        { text: "الْمُؤَخِّرُ", count: 1, desc: "الذي يؤخر من يشاء بحكمته." },
        { text: "الْأَوَّلُ", count: 1, desc: "الذي ليس قبله شيء." },
        { text: "الْآخِرُ", count: 1, desc: "الذي ليس بعده شيء." },
        { text: "الظَّاهِرُ", count: 1, desc: "الذي ظهر فوق كل شيء بقهره وقدرته." },
        { text: "الْبَاطِنُ", count: 1, desc: "الذي بطن كل شيء علمًا وخبرة." },
        { text: "الْوَالِي", count: 1, desc: "المالك للأشياء المتصرف فيها." },
        { text: "الْمُتَعَالِي", count: 1, desc: "المنزّه عن صفات الخلق ونقائصهم." },
        { text: "الْبَرُّ", count: 1, desc: "المحسن إلى خلقه العطوف عليهم." },
        { text: "التَّوَّابُ", count: 1, desc: "الذي يقبل توبة عباده مرة بعد أخرى." },
        { text: "الْمُنْتَقِمُ", count: 1, desc: "الذي ينتقم من العصاة بعدله." },
        { text: "الْعَفُوُّ", count: 1, desc: "الذي يمحو السيئات ويتجاوز عنها." },
        { text: "الرَّءُوفُ", count: 1, desc: "شديد الرحمة بعباده." },
        { text: "مَالِكُ الْمُلْكِ", count: 1, desc: "المتصرف في الملك كله يعطيه من يشاء وينزعه ممن يشاء." },
        { text: "ذُو الْجَلَالِ وَالْإِكْرَامِ", count: 1, desc: "صاحب العظمة والكرم الذي يستحق أن يُجَلّ ويُكرم." },
        { text: "الْمُقْسِطُ", count: 1, desc: "العادل في حكمه وقضائه." },
        { text: "الْجَامِعُ", count: 1, desc: "الذي يجمع الخلائق ليوم لا ريب فيه." },
        { text: "الْغَنِيُّ", count: 1, desc: "الغني عن كل ما سواه." },
        { text: "الْمُغْنِي", count: 1, desc: "الذي يغني من يشاء من عباده." },
        { text: "الْمَانِعُ", count: 1, desc: "الذي يمنع أسباب السوء والفساد عن عباده." },
        { text: "الضَّارُّ", count: 1, desc: "الذي يقدّر الضر بحكمته." },
        { text: "النَّافِعُ", count: 1, desc: "الذي يقدّر النفع لعباده." },
        { text: "النُّورُ", count: 1, desc: "الذي نور السماوات والأرض." },
        { text: "الْهَادِي", count: 1, desc: "الذي يهدي عباده إلى الحق." },
        { text: "الْبَدِيعُ", count: 1, desc: "الذي أوجد الخلق على غير مثال سابق." },
        { text: "الْبَاقِي", count: 1, desc: "الذي لا يلحقه فناء ولا زوال." },
        { text: "الْوَارِثُ", count: 1, desc: "الباقي بعد فناء الخلق، الوارث لكل شيء." },
        { text: "الرَّشِيدُ", count: 1, desc: "الذي أرشد الخلق إلى مصالحهم." },
        { text: "الصَّبُورُ", count: 1, desc: "الذي لا يعاجل العصاة بالعقوبة." }
    ],
    dead: [
        {
            text: "اللَّهُمَّ اغْفِرْ لَهُ وَارْحَمْهُ، وَعَافِهِ وَاعْفُ عَنْهُ، وَأَكْرِمْ نُزُلَهُ، وَوَسِّعْ مُدْخَلَهُ، وَاغْسِلْهُ بِالْمَاءِ وَالثَّلْجِ وَالْبَرَدِ، وَنَقِّهِ مِنَ الْخَطَايَا كَمَا نَقَّيْتَ الثَّوْبَ الْأَبْيَضَ مِنَ الدَّنَسِ.",
            count: 1,
            desc: "من دعاء صلاة الجنازة."
        },
        {
            text: "اللَّهُمَّ أَبْدِلْهُ دَارًا خَيْرًا مِنْ دَارِهِ، وَأَهْلًا خَيْرًا مِنْ أَهْلِهِ، وَأَدْخِلْهُ الْجَنَّةَ، وَأَعِذْهُ مِنْ عَذَابِ الْقَبْرِ وَعَذَابِ النَّارِ.",
            count: 1,
            desc: "من دعاء صلاة الجنازة."
        },
        {
            text: "اللَّهُمَّ اغْفِرْ لِحَيِّنَا وَمَيِّتِنَا، وَشَاهِدِنَا وَغَائِبِنَا، وَصَغِيرِنَا وَكَبِيرِنَا، وَذَكَرِنَا وَأُنْثَانَا، اللَّهُمَّ مَنْ أَحْيَيْتَهُ مِنَّا فَأَحْيِهِ عَلَى الْإِسْلَامِ، وَمَنْ تَوَفَّيْتَهُ مِنَّا فَتَوَفَّهُ عَلَى الْإِيمَانِ.",
            count: 1,
            desc: "دعاء جامع للأحياء والأموات في صلاة الجنازة."
        },
        {
            text: "اللَّهُمَّ إِنَّ فُلَانَ بْنَ فُلَانٍ فِي ذِمَّتِكَ، وَحَبْلِ جِوَارِكَ، فَقِهِ مِنْ فِتْنَةِ الْقَبْرِ وَعَذَابِ النَّارِ، وَأَنْتَ أَهْلُ الْوَفَاءِ وَالْحَقِّ.",
            count: 1,
            desc: "دعاء لتثبيت الميت عند وضعه في القبر."
        }
    ],
    ruqyah: [
        {
            text: "بِسْمِ اللَّهِ أَرْقِيكَ، مِنْ كُلِّ شَيْءٍ يُؤْذِيكَ، مِنْ شَرِّ كُلِّ نَفْسٍ أَوْ عَيْنِ حَاسِدٍ، اللَّهُ يَشْفِيكَ، بِسْمِ اللَّهِ أَرْقِيكَ.",
            count: 3,
            desc: "رقية شرعية عامة."
        },
        {
            text: "أَذْهِبِ الْبَأْسَ رَبَّ النَّاسِ، وَاشْفِ أَنْتَ الشَّافِي، لَا شِفَاءَ إِلَّا شِفَاؤُكَ، شِفَاءً لَا يُغَادِرُ سَقَمًا.",
            count: 1,
            desc: "دعاء الرقية عند عيادة المريض."
        },
        {
            text: "قراءة سورة الفاتحة كاملة، وهي من أعظم الرقى كما ثبت في حديث اللديغ.",
            count: 1,
            desc: "الرقية بالفاتحة."
        },
        {
            text: "قراءة آية الكرسي: (اللَّهُ لَا إِلَهَ إِلَّا هُوَ الْحَيُّ الْقَيُّومُ لَا تَأْخُذُهُ سِنَةٌ وَلَا نَوْمٌ...).",
            count: 1,
            desc: "من أعظم آيات الحفظ والرقية."
        },
        {
            text: "قراءة المعوذتين (سورة الفلق وسورة الناس) والإخلاص، والنفث في اليدين ومسح الجسد بهما.",
            count: 3,
            desc: "رقية النبي صلى الله عليه وسلم لنفسه عند مرضه."
        },
        {
            text: "أَعُوذُ بِكَلِمَاتِ اللَّهِ التَّامَّاتِ مِنْ شَرِّ مَا خَلَقَ.",
            count: 3,
            desc: "تعوذ من كل شر، ومن قالها حين ينزل منزلاً لم يضره شيء حتى يرتحل."
        }
    ]
};

/* ===== تكبير وتصغير خط نصوص الأذكار ===== */
const ZIKR_FONT_MIN = 0.7;
const ZIKR_FONT_MAX = 1.8;
const ZIKR_FONT_STEP = 0.1;

function applyZikrFontScale(scale) {
    const clamped = Math.min(ZIKR_FONT_MAX, Math.max(ZIKR_FONT_MIN, scale));
    document.documentElement.style.setProperty('--zikr-font-scale', clamped.toFixed(2));
    try { localStorage.setItem('zikrFontScale', clamped.toFixed(2)); } catch (e) {}
    const valueEl = document.getElementById('zikr-font-value');
    if (valueEl) valueEl.textContent = Math.round(clamped * 100) + '%';
    return clamped;
}

function changeZikrFontSize(direction) {
    const current = parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--zikr-font-scale')) || 1;
    applyZikrFontScale(current + (direction * ZIKR_FONT_STEP));
}

function resetZikrFontSize() {
    applyZikrFontScale(1);
}

(function initZikrFontScale() {
    let saved = 1;
    try {
        const stored = localStorage.getItem('zikrFontScale');
        if (stored) saved = parseFloat(stored);
    } catch (e) {}
    applyZikrFontScale(saved || 1);
})();

function switchAzkarCategory(category, event) {
    if (event) event.preventDefault();
    document.querySelectorAll('.azkar-tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) event.currentTarget.classList.add('active');

    const container = document.getElementById('azkar-container');
    container.innerHTML = '';

    const list = azkarData[category] || [];
    list.forEach((item, index) => {
        const card = document.createElement('div');
        card.className = 'zikr-card glass-panel';
        card.innerHTML = `
            <div>
                ${item.desc ? `<span class="zikr-desc">${item.desc}</span>` : ''}
                <div class="zikr-text" style="margin-top: 10px;">${item.text.replace(/\n/g, '<br>')}</div>
            </div>
            <div class="zikr-footer">
                <span style="font-size: 0.9rem; font-weight: 700; color: var(--text-muted);">التكرار: <span id="count-target-${category}-${index}">${item.count}</span></span>
                <button class="zikr-count-btn" id="btn-${category}-${index}" onclick="decrementZikr('${category}', ${index}, ${item.count})">
                    <i class="fa-solid fa-hand-pointer"></i> قرأت (<span>${item.count}</span>)
                </button>
            </div>
        `;
        container.appendChild(card);
    });

    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function decrementZikr(category, index, initialCount) {
    const btn = document.getElementById(`btn-${category}-${index}`);
    if (!btn || btn.classList.contains('completed')) return;

    let span = btn.querySelector('span');
    let current = parseInt(span.textContent) - 1;

    if (current > 0) {
        span.textContent = current;
    } else {
        span.textContent = 0;
        btn.innerHTML = '<i class="fa-solid fa-check"></i> تم الذكر';
        btn.classList.add('completed');
    }
}

