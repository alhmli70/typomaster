const tipsAr: Record<string, string[]> = {
  'ar-lesson-1': [
    'نصيحة الخبير: ركز على وضع أصابعك بشكل صحيح على صف الارتكاز قبل البدء.',
    'نصيحة الخبير: لا تنظر إلى لوحة المفاتيح! ثق بذاكرتك العضلية.',
    'نصيحة الخبير: خذ نفساً عميقاً واسترخِ كتفيك قبل البدء بالتمرين.'
  ],
  'ar-lesson-2': [
    'نصيحة الخبير: اليد اليمنى هي المسيطرة لدى معظم الناس، لكن لا تهملها بالتدريب.',
    'نصيحة الخبير: تأكد من أن معصمك مستقيم وغير ملتوٍ أثناء الكتابة.',
    'نصيحة الخبير: اختبر نفسك بتغطية اليد اليسرى والتركيز فقط على اليمنى.'
  ],
  'ar-lesson-3': [
    'نصيحة الخبير: اليد اليسرى تحتاج صبراً إضافياً. تدرب ببطء وركز على الدقة.',
    'نصيحة الخبير: حرك أصابعك بشكل مستقل، لا ترفع اليد كلها عند الضغط.',
    'نصيحة الخبير: التكرار هو أم المهارة. أعد الحركة 10 مرات حتى تتقنها.'
  ],
  'ar-lesson-4': [
    'نصيحة الخبير: السبابتان هما أذكى الأصابع. دربهما جيداً لأنهما الأكثر استخداماً.',
    'نصيحة الخبير: تخيل أن بين كل حرف وآخر جسراً صغيراً تعبره أصابعك.',
    'نصيحة الخبير: لا تجهد سبابتيك بالتمدد المفرط. الحركة القصيرة السريعة هي الأفضل.'
  ]
};

const tipsEn: Record<string, string[]> = {
  'en-lesson-1': [
    'Expert tip: Keep your fingers curved and relaxed, like holding a small ball.',
    'Expert tip: Focus on accuracy first, speed will come naturally with practice.',
    'Expert tip: Take regular breaks every 20 minutes to prevent fatigue.'
  ],
  'en-lesson-2': [
    'Expert tip: The home row is your anchor. Always return to it after each keystroke.',
    'Expert tip: Sit up straight with your screen at eye level for best results.',
    'Expert tip: Practice with a rhythm - slow and steady builds muscle memory.'
  ]
};

let fallbackCounter = 0;

export function getOfflineTip(lessonId: string, language: 'ar' | 'en'): string {
  const tips = language === 'ar' ? tipsAr : tipsEn;
  const lessonTips = tips[lessonId] || tips[Object.keys(tips)[0]] || [
    language === 'ar'
      ? 'نصيحة الخبير: استمر في التدريب ولا تستسلم. كل محترف كان مبتدئاً يوماً ما.'
      : 'Expert tip: Keep practicing and never give up. Every pro was once a beginner.'
  ];
  const tip = lessonTips[fallbackCounter % lessonTips.length];
  fallbackCounter++;
  return tip;
}

export function getRandomOfflineTip(language: 'ar' | 'en'): string {
  const allTips = language === 'ar'
    ? Object.values(tipsAr).flat()
    : Object.values(tipsEn).flat();
  if (allTips.length === 0) {
    return language === 'ar'
      ? 'نصيحة الخبير: الدقة أهم من السرعة. أبطئ وركز على كل حرف.'
      : 'Expert tip: Accuracy is more important than speed. Slow down and focus.';
  }
  return allTips[Math.floor(Math.random() * allTips.length)];
}
