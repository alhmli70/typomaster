import { Exercise } from './types';

export const EXERCISES: Exercise[] = [
  // --- Coding Exercises ---
  {
    id: 'code-1',
    title: 'أساسيات المتغيرات في JavaScript',
    language: 'code',
    level: 'beginner',
    collection: 'JavaScript Basics',
    order: 1,
    content: "const name = 'Ahmed';\nlet age = 25;\nconsole.log(name, age);"
  },
  {
    id: 'code-2',
    title: 'دالة Arrow Function',
    language: 'code',
    level: 'medium',
    collection: 'JavaScript Basics',
    order: 2,
    content: "const calculateSpeed = (strokes, minutes) => {\n  return (strokes / 5) / minutes;\n};"
  },
  {
    id: 'code-3',
    title: 'الرموز الخاصة والأقواس',
    language: 'code',
    level: 'medium',
    collection: 'JavaScript Basics',
    order: 3,
    content: "function test() { return [1, 2, 3].map(x => x * 2); }"
  },
  {
    id: 'code-4',
    title: 'React Hooks Basic',
    language: 'code',
    level: 'advanced',
    collection: 'React & TypeScript',
    order: 4,
    content: "const [count, setCount] = useState(0);\nuseEffect(() => {\n  document.title = `Count: ${count}`;\n}, [count]);"
  },
  {
    id: 'code-5',
    title: 'TypeScript Interface',
    language: 'code',
    level: 'medium',
    collection: 'React & TypeScript',
    order: 5,
    content: "interface User {\n  id: string;\n  email: string;\n  isAdmin?: boolean;\n}\n"
  },
  {
    id: 'code-6',
    title: 'Python List Comprehension',
    language: 'code',
    level: 'medium',
    collection: 'Python',
    order: 6,
    content: "squares = [x**2 for x in range(10) if x % 2 == 0]\nprint(squares)"
  },
  
  // --- English Exercises ---
  {
    id: 'type-en-1',
    title: 'الأحرف الأساسية (Home Row)',
    language: 'en',
    level: 'beginner',
    collection: 'Key Rows',
    order: 1,
    content: "asdf jkl; asdf jkl; asdf jkl; a s d f j k l ;"
  },
  {
    id: 'type-en-2',
    title: 'الصف العلوي (Top Row)',
    language: 'en',
    level: 'beginner',
    collection: 'Key Rows',
    order: 2,
    content: "qwer uiop qwer uiop q w e r u i o p"
  },
  {
    id: 'type-en-3',
    title: 'الصف السفلي (Bottom Row)',
    language: 'en',
    level: 'beginner',
    collection: 'Key Rows',
    order: 3,
    content: "zxcv m,. zxcv m,. z x c v m , ."
  },
  {
    id: 'type-en-4',
    title: 'جمل إنجليزية قصيرة',
    language: 'en',
    level: 'medium',
    collection: 'English Sentences',
    order: 4,
    content: "The quick brown fox jumps over the lazy dog."
  },
  {
    id: 'type-en-5',
    title: 'نص متقدم - التكنولوجيا',
    language: 'en',
    level: 'advanced',
    collection: 'English Sentences',
    order: 5,
    content: "Programming is the process of creating a set of instructions that tell a computer how to perform a task. It requires logic, patience, and continuous learning."
  },
  {
    id: 'type-en-6',
    title: 'نص متقدم - الفضاء',
    language: 'en',
    level: 'advanced',
    collection: 'English Sentences',
    order: 6,
    content: "Space exploration has always fascinated humanity. From the first moon landing to modern rovers on Mars, our quest to understand the universe drives technological innovation."
  },

  // --- Arabic Exercises ---
  {
    id: 'type-ar-1',
    title: 'صف الارتكاز (Home Row)',
    language: 'ar',
    level: 'beginner',
    collection: 'الحروف العربية',
    order: 1,
    content: "كمنت ب ي س ش ك م ن ت ب ي س ش"
  },
  {
    id: 'type-ar-2',
    title: 'الصف العلوي (Top Row)',
    language: 'ar',
    level: 'beginner',
    collection: 'الحروف العربية',
    order: 2,
    content: "ضصثق ف غ ع ه خ ح ج د"
  },
  {
    id: 'type-ar-3',
    title: 'الصف السفلي (Bottom Row)',
    language: 'ar',
    level: 'beginner',
    collection: 'الحروف العربية',
    order: 3,
    content: "ظزوة ى لا ر ؤ ء ئ"
  },
  {
    id: 'type-ar-4',
    title: 'كلمات عربية أساسية',
    language: 'ar',
    level: 'medium',
    collection: 'جمل عربية',
    order: 4,
    content: "شمس قمر بحر جبل سماء أرض ليل نهار يمين يسار"
  },
  {
    id: 'type-ar-5',
    title: 'جمل عربية متقدمة',
    language: 'ar',
    level: 'advanced',
    collection: 'جمل عربية',
    order: 5,
    content: "العقل السليم في الجسم السليم، والقراءة غذاء الروح. من طلب العلا سهر الليالي، والوقت كالسيف إن لم تقطعه قطعك."
  },
  {
    id: 'type-ar-6',
    title: 'نص متقدم - الذكاء الاصطناعي',
    language: 'ar',
    level: 'advanced',
    collection: 'جمل عربية',
    order: 6,
    content: "يشهد العالم ثورة حقيقية في مجال الذكاء الاصطناعي الذي بات يتدخل في شتى مناحي الحياة، من الرعاية الصحية وحتى استكشاف الفضاء العميق."
  }
];

export const generateMoreExercises = (): Exercise[] => {
   const generated: Exercise[] = [...EXERCISES];
   const baseEn = EXERCISES.filter(e => e.language === 'en').length;
   const baseAr = EXERCISES.filter(e => e.language === 'ar').length;
   const baseCode = EXERCISES.filter(e => e.language === 'code').length;
   
   // Generate ~70 En exercises
   const enWords = ["the", "quick", "brown", "fox", "jumps", "over", "lazy", "dog", "hello", "world", "typing", "fast", "speed", "accuracy", "code", "react", "keyboard", "practice", "focus", "flow"];
   for (let i=0; i<70; i++) {
     let content = "";
     for(let w=0; w<15; w++) { content += enWords[Math.floor(Math.random()*enWords.length)] + " "; }
     generated.push({ id: `gen-en-${i}`, title: `تمرين إنجليزي #${i+7}`, language: 'en', level: 'medium', collection: 'English Sentences', order: baseEn + i + 1, content: content.trim() });
   }

   // Generate ~70 Ar exercises
   const arWords = ["السلام", "عليكم", "نحن", "نحب", "الطباعة", "العربية", "لغة", "الضاد", "تدريب", "سرعة", "دقة", "احتراف", "تعلم", "مستمر", "تطور", "نجاح", "عمل", "مستقبل", "برمجة", "حاسوب"];
   for (let i=0; i<70; i++) {
     let content = "";
     for(let w=0; w<12; w++) { content += arWords[Math.floor(Math.random()*arWords.length)] + " "; }
     generated.push({ id: `gen-ar-${i}`, title: `تمرين عربي #${i+7}`, language: 'ar', level: 'medium', collection: 'جمل عربية', order: baseAr + i + 1, content: content.trim() });
   }

   // Generate ~70 Code exercises
   const codeSnippets = [
     "const x = 5;", "let y = 10;", "function add(a, b) { return a + b; }", "export default App;", 
     "import React from 'react';", "<ul><li>Item</li></ul>", "flex justify-between items-center", 
     "console.error('Error block');", "if (x > y) return true;", "map((item) => <div key={item.id}>{item}</div>)"
   ];
   for (let i=0; i<70; i++) {
     let content = "";
     for(let w=0; w<3; w++) { content += codeSnippets[Math.floor(Math.random()*codeSnippets.length)] + "\n"; }
     generated.push({ id: `gen-code-${i}`, title: `تمرين كود #${i+7}`, language: 'code', level: 'medium', collection: i % 2 === 0 ? 'JavaScript Basics' : 'متنوع', order: baseCode + i + 1, content: content.trim() });
   }

   return generated;
};
