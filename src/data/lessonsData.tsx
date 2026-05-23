import React from 'react';
import { Lesson } from '../types';
import { KeyboardVisualizer } from '../components/KeyboardVisualizer';
import { HandSVG } from '../components/HandSVG';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle, Keyboard, Compass, Target, Lightbulb, Sparkles } from 'lucide-react';

export const lessonsData: Lesson[] = [
  {
    id: 'ar-lesson-1',
    title: 'الدرس الأول',
    description: `أهلاً بك يا صديقي في خطوتك الأولى نحو الاحتراف! تخيل أن لوحة المفاتيح هي منزلك الخاص، وهناك صف في المنتصف يُسمى "صف الارتكاز" (Home Row). هذا الصف هو المكان الذي تستريح فيه أصابعك دائماً كأنها في سريرها المريح. في هذا الدرس التأسيسي، سنتعلم معاً كيف نضع أيدينا بشكل صحيح على لوحة المفاتيح لأول مرة. صف الارتكاز هو حجر الأساس لكل ما ستتعلمه لاحقاً. إذا أتقنت هذا الدرس، فقد قطعت 50% من مشوار التعلم!

لماذا صف الارتكاز مهم جداً؟ ببساطة، لأن كل أصابعك لها مكان محدد عليها. عندما تتعود على هذا الوضع، ستتمكن من الوصول إلى أي حرف على لوحة المفاتيح دون أن تنظر إليها. هذه هي مهارة "الطباعة باللمس" (Touch Typing) التي يمتلكها المحترفون. في اللغة العربية، يتكون صف الارتكاز من الحروف التالية: لليد اليمنى (ك، م، ن، ت) ولليد اليسرى (ش، س، ي، ب). بينهما يوجد حرفا (ا) و (ل) وتحتلهما السبابتان. في الأسفل، إبهاماك مسؤولان عن زر المسافة (Space).

أثناء التمرين، ركز على ثلاثة أمور أساسية: أولاً، حافظ على استرخاء كتفيك وذراعيك بشكل تام. ثانياً، ابق أصابعك مقوسة قليلاً كما لو كنت تمسك كرة تنس خفيفة. ثالثاً، والأهم، لا تنظر إلى لوحة المفاتيح إطلاقاً! ثق بذاكرتك العضلية وتعلم الشعور بالحروف دون النظر. تذكر دائماً أن الدقة أهم بكثير من السرعة في هذه المرحلة. السرعة ستأتي مع الوقت والتكرار الطبيعي. خذ وقتك واستمتع بكل خطوة في رحلة التعلم هذه. مع الممارسة اليومية المنتظمة، ستلاحظ تحسناً ملحوظاً في غضون أيام قليلة فقط.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 1,
    iconType: 'book',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.01</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الأول
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               رحلة البداية - اكتشاف صف الارتكاز (القلب النابض)
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              أهلاً بك يا صديقي في خطوتك الأولى نحو الاحتراف! تخيل أن لوحة المفاتيح هي منزلك الخاص، وهناك صف في المنتصف يسمى 'صف الارتكاز'. هذا الصف هو المكان الذي تستريح فيه أصابعك دائماً كأنها في سريرها المريح.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            لا تضغط على أي زر الآن! فقط ضع أصابع يدك اليمنى برفق على الحروف: (ك، م، ن، ت).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الآن ضع أصابع يدك اليسرى على الحروف: (ش، س، ي، ب).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            اجعل إبهاميك يستريحان بشكل طبيعي جداً فوق الزر الطويل في الأسفل (المسافة Space). هنيئاً لك! أنت الآن في وضعية الارتكاز الصحيحة تماماً.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ك
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              م
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ن
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ت
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ب
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ي
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              س
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ش
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             السر العظيم هنا: لا تحرك يدك بالكامل أثناء الكتابة! فقط الإصبع المسؤول عن الحرف هو الذي يمتد ليضغط عليه، ثم يعود فوراً إلى مكانه.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ك', 'م', 'ن', 'ت', 'ا', 'ل', 'ب', 'ي', 'س', 'ش']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-2',
    title: 'الدرس الثاني',
    description: `ممتاز! أنت الآن تعرف صف الارتكاز. في هذا الدرس، سنركز على تدريب اليد اليمنى فقط. لا تتعجل، اعتبر هذه الحروف أصدقاءك الجدد وعليك حفظ أماكنهم عن ظهر قلب دون أن تنظر إليهم. اليد اليمنى تتحكم بأربعة حروف أساسية هي (ك، م، ن، ت) بالإضافة إلى حرف (ا) الذي يشارك فيه السبابة اليمنى بتمدد إلى اليسار.

لنبدأ بالتفصيل الدقيق: إصبع الخنصر (الإصبع الصغير) في اليد اليمنى يستقر على حرف (ك). بجانبه، البنصر الأيمن يستقر على حرف (م). الإصبع الوسطى في اليد اليمنى يستقر على حرف (ن). أما السبابة اليمنى فتستقر على حرف (ت) وتمتد أيضاً لتضرب حرف (ا) المجاور على اليسار ثم تعود فوراً.

من المهم جداً أن تفهم فلسفة عمل الأصابع: كل إصبع له منطقة مسؤولية محددة لا يتعداها. الخنصر مسؤول عن حرف (ك) فقط في صف الارتكاز. البنصر مسؤول عن (م) حصراً. الوسطى مسؤولة عن (ن). السبابة هي الأكثر نشاطاً، فهي مسؤولة عن (ت) في وضع الراحة، وعن (ا) بالتمدد إلى اليسار.

التدريب الذهني هو سلاحك السري: أغمض عينيك وتخيل مكان كل حرف. قل في نفسك: الخنصر يلمس (ك)، البنصر يلمس (م)، الوسطى تلمس (ن)، السبابة تلمس (ت). كرر هذا التسلسل ذهنياً 10 مرات يومياً. هذا التمرين العقلي البسيط سيسرع تعلمك بشكل هائل لأنه يبني مسارات عصبية جديدة في دماغك. تذكر، العقل السليم يبني مهارة سليمة!`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 2,
    iconType: 'book',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.02</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الثاني
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               التركيز على اليد اليمنى - أسرار التحكم
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              أنت الآن تعرف 'صف الارتكاز'. في هذا الدرس، سوف ندرب اليد اليمنى فقط. لا تتعجل، اعتبر هذه الحروف أصدقاءك الجدد وعليك حفظ أماكنهم عن ظهر قلب دون أن تنظر إليهم.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الخنصر الأيمن (الإصبع الصغير جداً) مكانه الدائم فوق حرف (ك). جرب أن تضغط عليه برفق شديد.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            البنصر الأيمن (الإصبع الذي يليه) مكانه الدائم فوق حرف (م).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الوسطى اليمنى (الإصبع الطويل) مكانه الدائم فوق حرف (ن). والسبابة مكانه فوق حرف (ت).
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ك
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر (يستقر ولا يتحرك)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              م
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر (الاستقرار الثاني)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ن
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى (أطول إصبع)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ت
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (إصبع التوجيه)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             أغمض عينيك للحظة، وحاول أن تستشعر مكان حرف (ن) وحرف (ت). العبث والضغط العشوائي لا يفيد، الهدوء والتخيل هو مفتاح العبقرية هنا!
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ك', 'م', 'ن', 'ت']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-3',
    title: 'الدرس الثالث',
    description: `ممتاز جداً! الآن دور اليد اليسرى. اليد اليسرى غالباً ما تكون أقل استخداماً لدى البعض (خاصة الأشخاص الذين يستخدمون اليد اليمنى بشكل أساسي)، لذا كن صبوراً ولطيفاً مع نفسك. عضلاتك تتعلم شيئاً جديداً تماماً. اليد اليسرى تتحكم بأربعة حروف أساسية هي (ش، س، ي، ب) بالإضافة إلى حرف (ل) الذي تشارك فيه السبابة اليسرى بتمدد إلى اليمين.

تفصيل الأصابع بالكامل: الخنصر الأيسر (الإصبع الصغير) يستقر على حرف (ش) في أقصى يمين الصف. البنصر الأيسر يستقر على حرف (س) بجانبه. الوسطى اليسرى تستقر على حرف (ي). السبابة اليسرى تستقر على حرف (ب) وتمتد أيضاً لتضرب حرف (ل) المجاور على اليمين ثم تعود فوراً.

التحدي الأكبر في اليد اليسرى هو أن الخنصر والبنصر عادة ما يكونان أضعف الأصابع وأقلها تنسيقاً. هذا طبيعي تماماً ولاحظه جميع من تعلم الطباعة قبلك! لا تقلق إذا شعرت أن يدك اليسرى أبطأ من اليمنى في البداية. مع التمرين المستمر والمنتظم، ستزداد قوة هذه الأصابع وسرعتها بشكل ملحوظ. تمرين مهم: ضع يدك اليسرى في وضع الارتكاز وحاول النقر بكل إصبع على حدة دون تحريك بقية الأصابع. ابدأ بالخنصر (ش)، ثم البنصر (س)، ثم الوسطى (ي)، ثم السبابة (ب). كرر هذا التمرين 20 مرة يومياً، وستلاحظ تحسناً كبيراً بعد أسبوع واحد فقط.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 3,
    iconType: 'book',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.03</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الثالث
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               التركيز على اليد اليسرى - تناغم الحركات
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              ممتاز جداً! الآن دور اليد اليسرى. اليد اليسرى غالباً ما تكون أقل استخداماً لدى البعض، لذا كن صبوراً ولطيفاً مع نفسك. عضلاتك تتعلم شيئاً جديداً تماماً.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الخنصر الأيسر (الصغير) يستقر فوق حرف (ش).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            البنصر الأيسر يستقر فوق حرف (س)، والوسطى فوق (ي).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            السبابة اليسرى تستقر فوق حرف (ب). الإبهام كما نعلم مستريح على زر المسافة.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ب
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ي
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              س
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ش
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             لا تشنج أعصاب يدك. ابق أصابعك مقوسة قليلاً وكأنك تمسك بكرة تنس خفيفة جداً. الاسترخاء يضاعف سرعة التعلم.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ب', 'ي', 'س', 'ش']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-4',
    title: 'الدرس الرابع',
    description: `هل لاحظت شيئاً غريباً؟ تركنا حرفي (أ) و (ل) في المنتصف فارغين! هذا ليس خطأ، بل هو تصميم ذكي. هذه هي مهمة السبابتين الحصريتين - أصبعي السبابة - وهما الأصبعان الأكثر مرونة ونشاطاً وقوة على الإطلاق. السبابتان هما نجما العرض الحقيقيان في عالم الطباعة باللمس، وتعلم حركاتهما بدقة هو مفتاح السرعة والاحترافية.

السبابة اليمنى: تستقر في وضع الراحة على حرف (ت) في صف الارتكاز. لكنها لا تكتفي بذلك! هي تمتد إلى اليسار بمقدار بسيط لتضرب حرف (أ)، ثم تعود فوراً إلى مكانها الأصلي (ت). تخيل أن (ت) هو منزلك الدائم، و(أ) هي زيارة سريعة للجار المجاور. الحركة يجب أن تكون سريعة ودقيقة: تذهب وتعود في أقل من جزء من الثانية.

السبابة اليسرى: تستقر في وضع الراحة على حرف (ب). وتمتد إلى اليمين لتضرب حرف (ل)، ثم تعود فوراً إلى (ب). نفس المبدأ الذهبي: (ب) هو المنزل و(ل) هي الزيارة.

الحركة الصحيحة فنياً: عندما تضرب السبابة حرفاً ليس في وضع راحتها، يجب أن يتحرك الإصبع فقط من مفصل القاعدة (مفصل راحة اليد)، وليس من مفصل الإصبع الأوسط أو العليا. هذا يحافظ على استقرار بقية اليد ويقلل الإجهاد بشكل كبير. إذا شعرت بألم في معصمك، فأنت تتحرك بطريقة خاطئة. صحح وضعيتك فوراً واسترخِ.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 4,
    iconType: 'book',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.04</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الرابع
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               السبابتان المغامرتان (الألف واللام)
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              لاحظت شيئاً غريباً؟ تركنا حرفي (أ) و (ل) في المنتصف فارغين! هذه هي مهمة السبابتين (الأصابع التي نشير بها). السبابتان هما الأنشط والأكثر حركة.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            السبابة اليمنى تنطلق من نقطة استراحتها (ت) وتذهب يساراً لتضرب حرف (أ)، ثم تعود فوراً إلى (ت).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            السبابة اليسرى تنطلق من (ب) وتذهب يميناً لتضرب حرف (ل)، ثم تعود إلى (ب).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            جرب هذه الحركة ذهنياً: 'ت' أذهب لـ 'أ' وأعود. 'ب' أذهب لـ 'ل' وأعود.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              أ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (تمدد لليسار وتعود)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ت
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (مقر الاستراحة الأيمن)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ل
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (تمدد لليمين وتعود)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ب
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (مقر الاستراحة الأيسر)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             قاعدة ذهبية: لا تترك إصبعك أبداً على (أ) أو (ل). يجب أن تعود السبابة دائماً إلى المنزل (ت أو ب) بعد الضرب. هذا ما يمنع الضياع في اللوحة!
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ا', 'ل', 'ت', 'ب']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-5',
    title: 'الدرس الخامس',
    description: `تخيل أن صف الارتكاز هو الطابق الأرضي، والآن نحن على وشك الصعود للطابق الأول الرائع (الصف العلوي)! هذه خطوة كبيرة ومثيرة في رحلتك. الصف العلوي هو المكان الذي تجد فيه حروفاً جديدة تماماً تحتاج أصابعك أن تتعلم الوصول إليها بثقة ودقة. في هذا الدرس سنتعرف على الحروف التي تقع أعلى صف الارتكاز مباشرة.

الحروف التي سنتعلمها اليوم تشمل اليد اليمنى واليسرى معاً. لليد اليمنى: (ث، ص، ض، ف، ق). لليد اليسرى: (غ، ع، ه، خ، ح، ج، د). هذه الحروف تمثل خطوة مهمة نحو توسيع مساحة تحكمك على لوحة المفاتيح.

المبدأ الأساسي: كل إصبع يمتد إلى الأعلى من مكانه في صف الارتكاز ليضغط على الحرف المقابل في الصف العلوي، ثم يعود فوراً. لا ترفع يدك بالكامل! فقط مد الإصبع المعني. مثلاً، الخنصر الأيمن يستقر على (ك) ويمتد للأعلى ليضرب (ث). البنصر الأيمن من (م) إلى (ص). الوسطى اليمنى من (ن) إلى (ض). السبابة اليمنى من (ت) إلى (ف) و (ق).

نصيحة ذهبية: تدرب على الانتقال من الحرف السفلي إلى العلوي والعكس ببطء شديد. ركز على الإحساس بالمسافة التي يقطعها كل إصبع. مع الوقت، ستصبح هذه الحركات تلقائية تماماً. تذكر، السرعة تأتي مع التكرار والدقة أولاً.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 5,
    iconType: 'book',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.05</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الخامس
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               الانطلاق نحو الأعلى - استكشاف الصف العلوي
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              تخيل أن صف الارتكاز هو الطابق الأرضي، والآن نريد الصعود للطابق الأول (الصف العلوي). هنا تصبح الطباعة أكثر متعة وتحدياً. لا تخف، الطريق سهل جداً إذا اتبعنا القاعدة.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            السر هو 'تمديد الإصبع'. يدك تبقى ثابتة في مكانها، فقط أصابعك تتمدد للأعلى، تضغط الحرف، وتعود لصف الارتكاز.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            لا ترفع معصميك (رسغ اليد) عن الطاولة بشكل مبالغ فيه. دعهما قريبين، واستخدم مرونة مفاصل أصابعك.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            سنبدأ قريباً في الدروس القادمة بتخصيص كل إصبع لحرفه العلوي، استعد لهذه المغامرة الممتعة.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              د، ج، ح، خ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="thumb" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">مجموعة أصابع اليد اليمنى</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ف، ق، ث، ص، ض
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="thumb" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">مجموعة أصابع اليد اليسرى</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             إذا شعرت أنك ترفع يدك كلها للكتابة في الصف العلوي، فأنت تفعل ذلك بشكل خاطئ! اعتمد حصرياً على حركة مد الإصبع، كما تمد قدمك لصعود درجة سلم واحدة.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['د', 'ج', 'ح', 'خ', 'ه', 'ع', 'غ', 'ف', 'ق', 'ث', 'ص', 'ض']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-6',
    title: 'الدرس السادس',
    description: `حان الوقت الرائع لتعليم اليد اليمنى كيف تصعد السلالم ببراعة! في هذا الدرس، سنركز حصراً على تدريب اليد اليمنى على الوصول إلى الصف العلوي. اليد اليمنى ستتعلم كيفية التمدد للأعلى بدقة وسرعة.

تفصيل حركات اليد اليمنى للصف العلوي:
- الخنصر الأيمن: يستقر على (ك) ويمتد للأعلى ليضرب حرف (ث). هذه أصغر حركة وأسهلها.
- البنصر الأيمن: يستقر على (م) ويمتد للأعلى ليضرب حرف (ص).
- الوسطى اليمنى: يستقر على (ن) ويمتد للأعلى ليضرب حرف (ض).
- السبابة اليمنى: هي الأكثر نشاطاً! تستقر على (ت) وتمتد للأعلى لتضرب حرفين: (ف) بتمدد بسيط و (ق) بتمدد أطول قليلاً، ثم تعود إلى (ت).

السر المهني: أعلى أصابع اليد اليمنى يصعد كأنه يقفز قفزة خفيفة جداً. لا تشد عضلات الساعد أبداً. الحركة تأتي من قاعدة الأصابع وليس من المعصم. حافظ على معصمك مسترخياً وثابتاً.

تمرين سريع: اكتب التسلسل التالي ببطء شديد 10 مرات يومياً: (ك ث ك ث ك ث)، (م ص م ص م ص)، (ن ض ن ض ن ض)، (ت ف ت ف ت ف)، (ت ق ت ق ت ق). ثم جرب مزجها: (ك م ن ت ف ق ض ص ث).`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 6,
    iconType: 'keyboard',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.06</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس السادس
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               اليد اليمنى في الصف العلوي - دقة التوجيه
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              حان الوقت لنعلماليد اليمنى كيف تصعد الدرج! سنتعرف على الجيران في الطابق العلوي: (د، ج، ح، خ، ه، ع، غ).
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الخنصر يصعد من (ك) ليضرب حرف (د) أو (ج).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            البنصر يصعد من (م) ليضرب حرف (ح). والوسطى تصعد من (ن) لضرب حرف (خ).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            أما بطلة المسافات، السبابة اليمنى، فتصعد من (ت) لتضرب إما (هـ) أو (ع) أو (غ)!
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              د , ج
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر (يصعد ويرجع لـ ك)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ح
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر (يصعد ويرجع لـ م)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              خ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى (تصعد وترجع لـ ن)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              هـ,ع,غ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (تمتد للعلوي وترجع لـ ت)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             استهدف الحرف بعينك على الشاشة وليس على لوحة المفاتيح. اعتمد على إحساس الامتداد. تذكر: بعد أي ضربة علوية، اسحب إصبعك للأسفل ليرتاح في منزله (صف الارتكاز).
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['د', 'ج', 'ح', 'خ', 'ه', 'ع', 'غ']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-7',
    title: 'الدرس السابع',
    description: `الآن دور اليد اليسرى المذهلة لتستكشف الطابق العلوي! اليد اليسرى ستتعلم الوصول إلى الحروف التالية: (غ، ع، ه، خ، ح، ج، د). لاحظ أن عدد الحروف هنا أكبر قليلاً لأن اليد اليسرى في العربية أكثر ازدحاماً في الصف العلوي.

تفصيل حركات اليد اليسرى للصف العلوي:
- الخنصر الأيسر: يستقر على (ش) ويمتد للأعلى ليضرب حرف (غ) بتمدد طويل بعض الشيء.
- البنصر الأيسر: يستقر على (س) ويمتد للأعلى ليضرب حرف (ع).
- الوسطى اليسرى: يستقر على (ي) ويمتد للأعلى ليضرب حرف (ه).
- السبابة اليسرى: هي الأكثر ازدحاماً! تستقر على (ب) وتمتد للأعلى لتضرب ثلاث حروف: (خ) بتمدد متوسط، (ح) بتمدد أبعد، (ج) بتمدد أطول، وأيضاً (د) بتمدد إلى اليمين قليلاً للأعلى.

التحدي الحقيقي هنا هو تنسيق حركات اليد اليسرى لأنها مسؤولة عن عدد أكبر من الحروف. تدرب ببطء شديد. ركز على شعور كل إصبع وهو يمتد ويعود. الخنصر الأيسر سيجد صعوبة في البداية مع حرف (غ) لأنه أبعد نقطة، وهذا طبيعي تماماً.

تمرين سريع: (ش غ ش غ ش غ)، (س ع س ع س ع)، (ي ه ي ه ي ه)، (ب خ ب خ ب خ)، (ب ح ب ح ب ح)، (ب ج ب ج ب ج)، (ب د ب د ب د). استمر 10 دقائق يومياً.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 7,
    iconType: 'keyboard',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.07</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس السابع
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               اليد اليسرى في الصف العلوي - تناسق مذهل
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              الأن دور اليد اليسرى لتستكشف الطابق العلوي: (ف، ق، ث، ص، ض). لاحظ أن عدد الحروف هنا أقل بقليل.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            السبابة اليسرى هي المسؤولة عن الصعود من (ب) لضرب حرف (ف) أو حرف (ق).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الوسطى تصعد من (ي) لتضغط (ث). البنصر يصعد من (س) ليضغط (ص).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الخنصر الأيسر الصغير يصعد من (ش) ليضغط (ض).
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ف , ق
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (تصعد وترجع لـ ب)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ث
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى (تصعد وترجع لـ ي)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ص
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر (يصعد ويرجع لـ س)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ض
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر (يصعد ويرجع لـ ش)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             في البداية ستشعر أن الخنصر الأيسر ضعيف جداً ولا يستطيع الوصول لـ (ض) بسهولة. دعني أطمئنك: هذا طبيعي جداً! مع التكرار البطيء ستصبح عضلته أقوى بكثير.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ف', 'ق', 'ث', 'ص', 'ض']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-8',
    title: 'الدرس الثامن',
    description: `بعدما استكشفنا الطابق العلوي ببراعة، حان وقت المغامرة المثيرة للنزول إلى القبو! (الصف السفلي). النزول للأسفل يتطلب من أصابعك أن تتمدد إلى الأسفل بدلاً من الأعلى. هذا تغيير في الاتجاه يتطلب تركيزاً إضافياً.

الحروف في الصف السفلي هي: لليد اليمنى (ظ، ط، ز، و، ة، ى) ولليد اليسرى (ر، ؤ، ء، ئ). في هذا الدرس سنبدأ باستكشاف الصف السفلي بشكل عام.

الفرق الحركي: عندما تمد إصبعك للأسفل، فأنت تستخدم مجموعة مختلفة قليلاً من العضلات مقارنة بالمد للأعلى. لذلك قد تشعر بغرابة في البداية. الأصابع الأقصر (الخنصر والبنصر) ستجد صعوبة أكبر في الوصول للأسفل، وهذا طبيعي.

المبدأ التوجيهي: حافظ على راحة يدك ثابتة относительно. فقط الأصابع هي التي تتحرك للأسفل. تخيل أن كل إصبع هو مكبس صغير يضغط على الزر في الأسفل ثم يعود فوراً لمكانه.

نصيحة مهمة: الصف السفلي يتطلب مسافة حركة أطول قليلاً من الصف العلوي. لذا تدرب على رفع إصبعك قليلاً قبل تمديده للأسفل لتجنب الاحتكاك بالحروف المجاورة.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 8,
    iconType: 'keyboard',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.08</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الثامن
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               الغوص للأسفل - استكشاف الصف السفلي بصمت
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              بعدما استكشفنا الطابق العلوي، حان الوقت لنزول القبو! (الصف السفلي). النزول للأسفل يتطلب انثناء الأصابع للخلف قليلاً، وهو أمر جديد على عضلات يدك.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            للوصول للصف السفلي، يدك لا تنزل! بل تنثني أصابعك باتجاه راحة اليد (لترجع للوراء).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الحروف هنا قريبة جداً وضيقة، مما يتطلب دقة أعلى وتركيزاً أكبر.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            لا تحاول استخدام قوة كبيرة، اللمس الخفيف جداً يكفي لتسجيل الحرف.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ط،ظ،ز،و
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="thumb" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">اليد اليمنى للصف السفلي</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ر،ؤ،ء،ئ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="thumb" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">اليد اليسرى للصف السفلي</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             أكثر خطأ شائع للمبتدئين هو تحريك المعصم كله للأسفل للوصول للصف السفلي وتخريب وضعية الارتكاز. انتبه! اثنِ أصابعك فقط.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ظ', 'ط', 'ز', 'و', 'ة', 'ى', 'لا', 'ر', 'ؤ', 'ء', 'ئ']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-9',
    title: 'الدرس التاسع',
    description: `لنتدرب بالتفصيل على نزول أصابع اليد اليمنى للصف السفلي بشكل احترافي. اليد اليمنى مسؤولة عن الحروف التالية في الصف السفلي: (ظ، ط، ز، و، ة، ى).

التفصيل الكامل لليد اليمنى في الصف السفلي:
- الخنصر الأيمن: يستقر على (ك) ويمتد للأسفل ليضرب حرف (ظ) بتمدد طويل.
- البنصر الأيمن: يستقر على (م) ويمتد للأسفل ليضرب حرف (ط).
- الوسطى اليمنى: يستقر على (ن) ويمتد للأسفل ليضرب حرف (ز).
- السبابة اليمنى: هي الأكثر ازدحاماً في الأسفل أيضاً! تستقر على (ت) وتمتد للأسفل لتضرب ثلاثة حروف: (و) بتمدد قليل لليسار للأسفل، (ة) بتمدد للأسفل، (ى) بتمدد أبعد للأسفل.

تمارين أساسية: ابدأ ببطء شديد: (ك ظ ك ظ ك ظ)، (م ط م ط م ط)، (ن ز ن ز ن ز). ثم (ت و ت و ت و)، (ت ة ت ة ت ة)، (ت ى ت ى ت ى). لا تتسرع أبداً.

لاحظ أن حرف (و) هو من أكثر الحروف استخداماً في اللغة العربية، لذا إتقان الوصول إليه من أعلى أولوية. السبابة اليمنى يجب أن تتدرب على (و) بشكل مكثف لأنه سيظهر في كل جملة تقريباً.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 9,
    iconType: 'keyboard',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.09</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس التاسع
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               اليد اليمنى في الصف السفلي - حركة رشيقة
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              لنتدرب على نزول أصابع اليد اليمنى للصف السفلي: (ظ، ط، ز، و، ة، ى).
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            السبابة اليمنى تنزل من (ت) لتتكفل بحرفي (ة) و (ى).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الوسطى تنزل من (ن) لتضرب (و). والبنصر ينزل من (م) ليضرب (ز).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الخنصر الأيمن النشيط ينزل ليضرب (ط) أو (ظ).
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ط , ظ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر (ينزلويرجع لـ ك)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ز
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر (ينزل ويرجع لـ م)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              و
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى (تنزل وترجع لـ ن)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ة , ى
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (تنزل وترجع لـ ت)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             حرفي الواو (و) والتاء المربوطة (ة) من أكثر الحروف استخداماً في اللغة العربية. أتقن حركة السبابة والوسطى هنا وستلاحظ قفزة مذهلة في سرعتك!
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ظ', 'ط', 'ز', 'و', 'ة', 'ى']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-10',
    title: 'الدرس العاشر',
    description: `اليد اليسرى في الصف السفلي لديها حروف أقل عدداً لكنها غريبة الاستخدام قليلاً: (ر، ؤ، ء، ئ). وحرف الـ (ر) بالتحديد من أكثر الحروف استخداماً في اللغة العربية!

التفصيل الكامل لليد اليسرى في الصف السفلي:
- الخنصر الأيسر: يستقر على (ش) ويمتد للأسفل ليضرب حرف (ر). هذا الحرف يحتاج لتمدد طويل نسبياً.
- البنصر الأيسر: يستقر على (س) ويمتد للأسفل ليضرب حرف (ؤ).
- الوسطى اليسرى: يستقر على (ي) ويمتد للأسفل ليضرب حرف (ء).
- السبابة اليسرى: تستقر على (ب) وتمتد للأسفل لتضرب حرف (ئ).

حرف (ر) هو الأهم هنا لأنه من أكثر خمسة حروف استخداماً في اللغة العربية. تدرب على كتابة كلمات مثل (رجل، رمل، ربيع، طريق، سرير، مدرسة). تخيل أن الخنصر الأيسر هو المسؤول عن هذا الحرف المهم.

التحدي: حرف (ؤ) وحرف (ئ) نادراً ما يستخدمان لكن وجودهما في الصف السفلي يجعل الوصول إليهما صعباً. تدرب على كتابة كلمات مثل (مؤمن، ممؤونة، شيء، مليء).

تمرين التحدي: حاول كتابة الجملة التالية: (رأيت رجلاً يسير بسرعة في الطريق المؤدي إلى المدرسة القديمة).`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 10,
    iconType: 'keyboard',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.10</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس العاشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               اليد اليسرى في الصف السفلي - مرونة فائقة
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              اليد اليسرى في الصف السفلي لديها حروف غريبة الاستخدام قليلاً: (ر، ؤ، ء، ئ). وحرف (لا) الذي يكتب ككتلة واحدة.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            السبابة اليسرى تتراجع من (ب) لتضغط على (ر) و (لا).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الوسطى تتراجع من (ي) للضغط على (ؤ).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            البنصر يتراجع لـ (ء) والخنصر لـ (ئ).
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ر , لا
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة (تنزل وترجع لـ ب)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ؤ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى (تنزل وترجع لـ ي)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ء
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر (ينزل ويرجع لـ س)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ئ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر (ينزل ويرجع لـ ش)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             حرف الراء (ر) مستخدم بكثافة هائلة! احرص على تمرين السبابة اليسرى لضرب الراء والعودة السريعة للباء دون فقدان التوازن.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['لا', 'ر', 'ؤ', 'ء', 'ئ']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-11',
    title: 'الدرس الحادي عشر',
    description: `الأرقام تقع في الصف الرابع العلوي البعيد جداً من لوحة المفاتيح! للوصول للأرقام تحتاج أصابعك أن تتمدد لأقصى مدى لها. هذه مهارة متقدمة تتطلب قوة ومرونة في الأصابع.

خريطة الأرقام للأصابع:
- الخنصر الأيسر: يصل للأرقام (1، 2) بتمدد طويل.
- البنصر الأيسر: يصل للرقم (3).
- الوسطى اليسرى: تصل للرقم (4).
- السبابة اليسرى: تصل للأرقام (5، 6).
- السبابة اليمنى: تصل للأرقام (7، 8).
- الوسطى اليمنى: تصل للرقم (9).
- البنصر الأيمن: يصل للرقم (0).
- الخنصر الأيمن: يصل للرمز (-) أو (=) بجانب الصفر.

تذكر دائماً: الأرقام تحتاج لأطول مد للأصابع. ارفع يدك قليلاً لتعطي أصابعك مساحة أكبر للتمدد، لكن لا ترفع راحة اليد بأكملها. الأصابع هي التي تفعل كل العمل.

الاستخدام العملي: ستستخدم الأرقام كثيراً في كلمات المرور والتواريخ والأرقام الحسابية. تدرب على كتابة تاريخ ميلادك وأرقام هواتف مهمة بدون النظر إلى لوحة المفاتيح.

التدريب الذهني: أغمض عينيك وتخيل صف الأرقام بكامل امتداده. تدرب على العد التنازلي من 10 إلى 1 بدون النظر.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 11,
    iconType: 'finger',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.11</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الحادي عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               لغة الأرقام - الوصول للصف الرياضي ببراعة
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              الأرقام تقع في الصف الرابع العلوي البعيد جداً! للوصول للأرقام نحتاج لمد الأصابع لأقصى درجة، وقد نضطر أحياناً لرفع اليد قليلاً مؤقتاً، ولكن بسرية واحترافية.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            اليد اليسرى تتكفل بالأرقام من 1 إلى 5. واليد اليمنى تتكفل بالأرقام من 6 إلى 0.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            استخدم السبابتين للأرقام الوسطى (4, 5, 6, 7). والوسطى لـ (3, 8).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            البنصر لـ (2, 9). والخنصر لـ (1, 0).
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ١, ٠
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر الأيمن / الأيسر</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ٢, ٩
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر الأيمن / الأيسر</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ٣, ٨
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الوسطى</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ٤..٧
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابتان (أكثر مرونة)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             لا تنظر أبداً للأرقام! ضع يدك في صف الارتكاز، ثم مد إصبعك لأقصى حد ولاحظ أي رقم نقرت. الدماغ يحفظ المسافات بالتدريج المبهر المستمر.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '٠']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-12',
    title: 'الدرس الثاني عشر',
    description: `مرحباً بك في مرحلة السحر الحقيقية! مفتاح (Shift) الموجود على يمين ويسار لوحة المفاتيح هو أحد أهم المفاتيح وأكثرها استخداماً. وظيفته الأساسية هي تحويل الحرف من صغير إلى كبير (Capital)، لكن في العربية هو المسؤول عن إظهار الحروف العلوية في بعض المفاتيح التي تحتوي على حرفين.

كيفية استخدام Shift بالطريقة الصحيحة:
- اليد اليمنى تضغط Shift الأيسر عندما تريد كتابة حرف باليد اليمنى.
- اليد اليسرى تضغط Shift الأيمن عندما تريد كتابة حرف باليد اليسرى.
- هذا المبدأ يضمن أن يداً واحدة تفعل الشيء الوحيد الذي تستطيع فعله في اللحظة.

لماذا هذا مهم؟ لأن الضغط على Shift باليد الخاطئة يبطئك ويجعل حركاتك غير متناسقة. تخيل أنك تريد كتابة حرف (Q) الكبير بالإنجليزية. اليد اليمنى تضغط Shift والأيسر تضغط Q. بدون هذا التنسيق، ستجد صعوبة في الكتابة بسرعة.

في العربية: Shift مسؤول عن إظهار الأحرف البديلة مثل (أ، إ، آ) وأيضاً الرموز مثل (، . ؟ !) وغيرها. التدرب على Shift هو ما يميز المبتدئ عن المحترف.

تمرين سريع: اكتب الجملة التالية: (أنا أتعلم الطباعة بسرعة! هل أنت مستعد للتحدي؟).`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 12,
    iconType: 'finger',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.12</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الثاني عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               القوة الخفية - سر مفتاح (Shift) والتنوين
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              مرحباً بك في مرحلة السحر! مفتاح (Shift) الموجود على يمين ويسار اللوحة ليس مجرد زر عادي، إنه 'مفتاح التحول'. في العربية نستخدمه لكتابة التنوين.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            القاعدة الذهبية الصارمة: إذا أردت حرفاً باليد اليمنى، يجب أن تضغط مفتاح الشفت الأيسر بيدك اليسرى! والعكس صحيح.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            مثال: لكتابة تنوين الفتح (ً) والموجود على حرف (ص)، نضغط شفت الأيمن بخنصر اليمين، ونضغط (ص) ببنصر اليسار.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            هذه الحيلة تسمى (حيلة التبادل الإيقاعي)، وهي ما يميز المحترف عن المبتدئ.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              Shift ی
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر الأيمن</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              Shift ي
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">الخنصر الأيسر</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ً
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">السبابة اليمنى مع Shift أيسر</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             لا تحاول استخدام نفس اليد لضغط Shift والحرف معاً! هذا يكسر وضعية الارتكاز ويسبب إلتواءً مزعجاً وبطيئاً جداً في اليد.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ص', 'ق', 'س', 'Shift']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-13',
    title: 'الدرس الثالث عشر',
    description: `التشكيل هو روح الكتابة العربية وجمالها! الحركات القصيرة (الفتحة، الضمة، الكسرة، السكون، الشدة) تضفي على النص العربي وضوحاً وجمالاً لا يضاهى. في هذا الدرس سنتعلم كيفية إضافة التشكيل بسرعة أثناء الطباعة.

التشكيل في لوحة المفاتيح العربية:
- الضمة (ُ): Shift + حرف (ب) أو مفتاح مخصص حسب لوحة المفاتيح.
- الفتحة (َ): Shift + حرف (س).
- الكسرة (ِ): Shift + حرف (ي).
- السكون (ْ): Shift + حرف (ش).
- الشدة (ّ): Shift + حرف (د).
- المدة (آ): Shift + حرف (أ).

التحدي: التشكيل يتطلب ضغط زرين معاً (Shift + حرف التشكيل) ثم كتابة الحرف المشكل. هذا يتطلب تنسيقاً عالياً بين اليدين.

الاستخدام المهني: في الكتابات الرسمية والكتب والمقالات، التشكيل ضروري للوضوح. حتى في الرسائل اليومية، التشكيل يمنع اللبس. مثلاً: (كتب) بدون تشكيل قد تعني (كَتَبَ) أو (كُتُب) حسب السياق.

التركيز على الدقة: تدرب ببطء. اكتب كلمات مشكلة مثل (مُدَرِّسَة، كِتَاب، جَمِيل).`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 13,
    iconType: 'finger',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.13</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الثالث عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               عالم الحركات - الفتحة، الضمة، الكسرة
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              التشكيل يضفي جمالاً على الكتابة العربية. الآن سنتعلم أهم ثلاث حركات: الفتحة (ش)، الضمة (ث)، الكسرة (ش + خنصر، عذراً الكسرة تختلف باختلاف اللوحة ولكن عادة على ش أو س).
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الفتحة غالباً تقع مع حرف (ض). نضغط شفت الأيمن بخنصر اليمين، ثم حرف الضاد.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الضمة تقع على حرف (ث). الكسرة على حرف (ش). أصبحت أصابع اليد اليسرى هي رسامة اللوحات للتشكيل.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            تدرب على تشكيل الحرف فور كتابته، وليس بعد الانتهاء من الكلمة لتوفير الوقت.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              َ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift يمين + خنصر أيسر يعلو لـ ض</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ُ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift يمين + وسطى يسرى تعلو لـ ث</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ِ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="pinky" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift يمين + بنصر أيسر يعلو لـ ش</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             كتابة التشكيل بسرعة تبدو صعبة في اليوم الأول، لكنها كالقيادة؛ تصبح لا إرادية قريباً. لا تستسلم.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ث', 'ش', 'Shift']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-14',
    title: 'الدرس الرابع عشر',
    description: `الهمزات بأنواعها المختلفة تحتل مكانة خاصة في الكتابة العربية. لدينا الهمزة على الألف (أ، إ)، والهمزة على الواو (ؤ)، والهمزة على الياء (ئ)، والهمزة بمفردها (ء). هذا التنوع يجعل اللغة العربية غنية لكنه يتطلب إتقاناً خاصاً على لوحة المفاتيح.

خريطة الهمزات:
- الهمزة على الألف (أ): مفتاح آخر حرف في الصف العلوي العلوي.
- الهمزة تحت الألف (إ): تأتي مع Shift + مفتاح الألف.
- الهمزة على الواو (ؤ): في الصف السفلي تحت سيطرة البنصر الأيسر.
- الهمزة على الياء (ئ): في الصف السفلي تحت سيطرة السبابة اليسرى.
- الهمزة المفردة (ء): في الصف السفلي أيضاً.

التحدي الأكبر: التبديل بين أنواع الهمزات المختلفة بسرعة. الكلمات مثل (مؤمن، مأمون، مئزر، مآرب) تظهر الفرق بوضوح.

سر المحترفين: الهمزات هي من أكثر الأخطاء الكتابية شيوعاً حتى بين المحترفين. إتقان الهمزات سيجعلك كاتباً متميزاً حقاً.

مراقبة التقدم: تدرب على كتابة آيات قرآنية قصيرة أو أشعار عربية. هذه النصوص تحتوي على جميع أنواع الهمزات وستختبر مهاراتك بشكل كامل.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 14,
    iconType: 'finger',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.14</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الرابع عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               عائلة الهمزات (أ، إ، آ، ئ، ؤ)
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              الهمزات كثيرة في لغتنا: الألف بهمزة عليا (أ) أو سفلى (إ) أو ممدودة (آ). هذا التنوع يحتاج دقة.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            حرف (أ) يقع مكان الألف (ا) ولكن مع ضغط Shift باليد اليسرى.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            حرف (إ) يقع مع حرف (غ) ولكن مع Shift.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الممدودة (آ) تقع مع حرف (ى) ولكن مع Shift.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              أ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift أيسر + سبابة يمنى (ا)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              إ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift أيسر + سبابة يمنى لأسفل (غ)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              آ
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="index" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift أيسر + سبابة يمنى لأسفل (ى)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             حطّم قاعدة الخوف من الأزرار المزدوجة بإنشاء وتيرة موسيقية في ذهنك: 'كليك-كليك' (Shift ثم الحرف) لتكون حركتك متناغمة وليست متقطعة.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ا', 'غ', 'ى', 'ي', 'و', 'Shift']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-15',
    title: 'الدرس الخامس عشر',
    description: `النصوص بلا علامات ترقيم كالمتحدث الذي لا يتنفس! علامات الترقيم مثل الفاصلة (،) والنقطة (.) والفاصلة المنقوطة (؛) وعلامة الاستفهام (؟) وعلامة التعجب (!) وعلامات الاقتباس ("") والشرطة (-) وغيرها هي أدواتك لجعل النص واضحاً ومنظماً.

خريطة علامات الترقيم:
- الفاصلة (،): مفتاح (و) مع Shift.
- النقطة (.): مفتاح (ز) في أسفل اليمين.
- الفاصلة المنقوطة (؛): مفتاح (ح) أو مفتاح مخصص.
- علامة الاستفهام (؟): مفتاح (ظ) مع Shift أو مفتاح مخصص.
- علامة التعجب (!): مفتاح (1) مع Shift.
- النقطتان الرأسيتان (:): مفتاح (ت) أو مفتاح مخصص.
- علامات الاقتباس (""): مفتاح (ط) مع Shift.
- الشرطة (-): مفتاح خاص فوق الصف العلوي.

الأهمية: الترقيم الصحيح يجعل كتابتك احترافية وسهلة القراءة. لاحظ الفرق بين: (أكلنا ثم ذهبنا للنوم) و (أكلنا. ثم ذهبنا للنوم).

تمرين شامل: اكتب فقرة كاملة عن موضوع تفضله مع استخدام جميع علامات الترقيم بشكل صحيح. تدرب على ذلك 10 دقائق يومياً.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 15,
    iconType: 'finger',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.15</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الخامس عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               لمسات فنية - علامات الترقيم (الفاصلة والنقطة)
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              النصوص بلا علامات ترقيم كالمتحدث الذي لا يتنفس! الفاصلة (،) والنقطة (.) والفاصلة المنقوطة (؛) ضرورية جداً.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            النقطة (.) غالباً على حرف (ز). الفاصلة (،) العربية المميزة غالباً موجودة مع الزر (ن) في بعض اللوحات و لوحات الاخرى تجدها مع Shift + (ن).
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            استخدم يد واحدة لعلامة الترقيم، وعُد سريعاً لصف الارتكاز.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            تعوّد ألا تترك مسافة قبل علامة الترقيم، بل اترك مسافة (Space) بعدها مباشرة.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              .
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">البنصر الأيمن للأسفل (ز)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ،
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="middle" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift أيسر + الوسطى (ن)</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              ؛
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="ring" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">Shift أيمن + البنصر العالي (ح)</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             عند الانتهاء من الجملة، نقرة النقطة (.) يتبعها بكسر ثانية نقرة المسافة بالإبهام بشكل آلي ورشيق.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['.', '،', ':', '؛', 'Shift']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-16',
    title: 'الدرس السادس عشر',
    description: `وصلت لمرحلة متقدمة جداً من التدريب! أنت الآن تسيطر على يدك اليمنى باحترافية. في هذا الدرس سنقوم بتمارين متقدمة تدمج بين الصفوف الثلاثة (العلوي، الارتكاز، السفلي) لليد اليمنى فقط. الهدف هو بناء سرعة وتلقائية كاملة.

تمارين متقدمة لليد اليمنى:
1. تدرب على التسلسل الرأسي: ك (ار)، م (ص)، ن (ض)، ت (ف، ق)، ثم للأسفل: ت (و، ة، ى)، ن (ز)، م (ط)، ك (ظ).
2. تدرب على كلمات كاملة: (كتاب، مكتب، نافذة، قلم، ورق، مقلمة، تلاميذ، مدرسة، تلفاز، ميكروفون، قاعة، نهر، ظل، طاولة).
3. جمل متقدمة: (يكتب التلميذ في كراسته الجديدة بقلمه الأزرق).

التحدي: حاول كتابة 10 جمل مختلفة بدون النظر إلى لوحة المفاتيح. خذ وقتك. الدقة أهم من السرعة. إذا أخطأت، ابدأ من جديد. التكرار هو مفتاح الإتقان.

قياس التقدم: سجل عدد الكلمات في الدقيقة (WPM) يومياً. توقع تحسناً بنسبة 10-20% كل أسبوع مع الممارسة المنتظمة لمدة 15 دقيقة يومياً.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 16,
    iconType: 'zap',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.16</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس السادس عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               تناغم اليد اليمنى - دمج الصفوف الثلاثة
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              وصلت لمرحلة متقدمة جداً! أنت الآن مايسترو اليد اليمنى. سنقوم بتمارين تدمج بين القفز للأعلى (د، ج...) والغوص للأسفل (ط، ظ...).
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            يدك اليمنى الآن مسؤولة عن أكثر من 16 حرفاً ورمزاً. تحرك بسلاسة ولا تضرب المفاتيح بعنف.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            تخيل أن أصابعك تطير فوق اللوحة. اللمس الخفيف جداً هو السر، المفاتيح لا تحتاج للقصف!
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            عند كتابة كلمة (حكيم)، تنتقل من العلوي للارتكاز بثبات وهدوء.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              انسجام
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="right" activeFinger="thumb" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">كل أصابع اليد اليمنى بانسجام</span>
               <span className="text-sm text-app-text-muted">اليد: اليمنى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             كلما كتبنا بهدوء وبطء أكثر في البداية، كلما تبرمج العقل الباطن بشكل أسرع وأدق. البطء المدروس هو أب السرعة المذهلة.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ك', 'م', 'ن', 'ت', 'د', 'ج', 'ح', 'خ', 'ه', 'ع', 'غ', 'ظ', 'ط', 'ز', 'و', 'ة', 'ى']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-17',
    title: 'الدرس السابع عشر',
    description: `أنت الآن تسيطر على يديك اليسرى واليمنى معاً. في هذا الدرس سنربط الصفوف العلوية بالارتكاز والسفلية بمرونة وذكاء عاليين. الهدف النهائي هو الطباعة بطلاقة دون أي توقف أو تفكير.

تمارين شاملة:
1. ابدأ ببطء: اكتب الحروف العربية بالترتيب من الألف إلى الياء 3 مرات يومياً.
2. اكتب كلمات من 3 حروف: (كتب، درس، قلم، بيت، باب، نهر).
3. كلمات من 5 حروف: (مدرسة، تلميذ، نافذة، حقيبة، مغامرة).
4. كلمات من 7+ حروف: (استقبال، تقدم مذهل، حاسوب محمول).
5. جمل كاملة: اكتب فقرة من 50 كلمة عن موضوع بسيط.

التقنية الدقيقة: انتبه لموضع بداية ونهاية كل حركة. الأصابع يجب أن تكون مثل النوابض: تمتد وتضرب وتعود فوراً. حركة واحدة نظيفة أفضل من 10 حركات سريعة فوضوياً.

تحدي السرعة: اختر فقرة من 50 كلمة وسجل وقتك. حاول تقليل الوقت 3 ثوان كل يوم. لكن تذكر: الدقة القصوى أولاً!`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 17,
    iconType: 'zap',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.17</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس السابع عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               تناغم اليد اليسرى - دمج الصفوف الثلاثة
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              أنت الآن مايسترو اليد اليسرى. لنربط الصفوف العلوية بالارتكاز والسفلية بمرونة وذكاء.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            تبديل الصفوف باليد اليسرى أثناء كتابة كلمات مثل (بشر، قصر، صقر) يتطلب لياقة عالية للأصابع.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            ركز جداً على الخنصر الأيسر الصغير (يضرب الشين والضاد)، عامله بلطف واصبر على بطئه المبدئي.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            خذ نفساً عميقاً، استرخاء العضلات يقلل نسبة الأخطاء بنسبة 70% المائة.
          </p>
        </motion.div>
      </div>

      
      <div className="bg-app-surface/60 rounded-3xl border border-white/5 overflow-hidden shadow-2xl relative mt-4">
         <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-50"></div>
         <div className="p-6 bg-app-surface/80 border-b border-white/5">
            <h3 className="text-2xl font-black text-white flex items-center gap-3">
              <BookOpen className="text-app-accent" size={28} />
              جدول خريطة الأصابع الاحترافية
            </h3>
            <p className="text-app-text-muted mt-2">تعرف على مسؤولية كل إصبع تجاه هذه المجموعة من الحروف.</p>
         </div>
         <div className="overflow-x-auto">
           <table className="w-full text-right" dir="rtl">
             <thead>
               <tr className="bg-black/30 border-b border-white/10 text-app-text-muted font-bold text-sm">
                 <th className="p-4 text-center font-bold">الحرف/الرمز</th>
                 <th className="p-4 text-center font-bold">اليد والوضع</th>
                 <th className="p-4 text-right font-bold w-1/2">السلوك</th>
               </tr>
             </thead>
             <tbody>
               
        <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
          <td className="p-4 text-center">
            <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-app-surface border border-white/10 flex items-center justify-center text-xl md:text-3xl font-black text-white mx-auto shadow-inner shadow-black/50">
              انسجام
            </div>
          </td>
          <td className="p-4 text-center">
             <div className="flex flex-col items-center justify-center gap-2">
                <HandSVG hand="left" activeFinger="thumb" size={40} className="drop-shadow-lg" />
             </div>
          </td>
          <td className="p-4 text-right">
             <div className="flex flex-col gap-1">
               <span className="font-bold text-white text-lg">التناغم العضلي الكامل لليسار</span>
               <span className="text-sm text-app-text-muted">اليد: اليسرى</span>
             </div>
          </td>
        </tr>
      
             </tbody>
           </table>
         </div>
      </div>
    

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             الخطأ أثناء التطبيق ليس فشلاً، إنه رسالة عصبية لتعديل المسار. عندما تخطئ، لا تنفعل، امسح الخطأ ولاحظ أين ذهب إصبعك بالخطأ وقومه بصمت.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ش', 'س', 'ي', 'ب', 'ل', 'ف', 'ق', 'ث', 'ص', 'ض', 'ر', 'ؤ', 'ء', 'ئ']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-18',
    title: 'الدرس الثامن عشر',
    description: `السرعة الحقيقية لا تأتي من سرعة حركة الأصابع وحدها، بل من (الكلمات المحفوظة عضلياً). هذا هو السر الأعظم للطباعة السريعة: دماغك لا يفكر بكل حرف على حدة، بل بمقاطع كاملة أو كلمات كاملة.

كيف تبني الذاكرة العضلية:
1. تدرب على نفس الكلمات يومياً حتى تصبح تلقائية.
2. ركز على الكلمات الشائعة مثل (من، في، على، إلى، عن، كان، هذا، ذلك، ثم، أن).
3. تدرب على مقاطع شائعة مثل (ال، لل، من، على، والتي، الذي، التي).
4. تدرب على كلمات متصلة مثل (بالنسبة، الاستقبال، المحترفون، المدرسة).

تقنية الـ (Word Chunks): بدلاً من التفكير (م - ن) بشكل منفصل، فكر فيهما كقطعة واحدة (من). هذا يضاعف سرعتك.

التدريب الموصى به: استخدم موقع typingclub.com أو أي موقع مشابه للتدرب على الكلمات الشائعة. 10 دقائق من التدرب على المقاطع والكلمات الشائعة أفضل من ساعة من الكتابة العشوائية.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 18,
    iconType: 'zap',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.18</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس الثامن عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               رقصة الأصابع - كلمات قصيرة وسريعة جداً
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              السرعة الحقيقية لا تأتي من سرعة حركة الأصابع، بل من (الكلمات المحفوظة عضلياً). هناك كلمات نكتبها ككتلة متصلة لا كحروف منفصلة.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            كلمات مثل: (في، من، على، أن، إلى، السلام) هذه كلمات تتكرر مئات المرات يومياً.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            عندما تتدرب عليها، ستجد أنك تنقر حروفها بضربة إيقاعية واحدة سريعة جداً كالمتتالية الموسيقية.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            هذا هو سر الطباعة بسرعة 100 كلمة بالدقيقة وأكثر! إنهم يكتبون الكلمات وليس الحروف.
          </p>
        </motion.div>
      </div>

      

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             لا تفكر في الحرف ومكانه، فكر في الكلمة ككل. اسحب عينيك عن لوحة المفاتيح ودع سحر العقل الباطن يتولى القيادة كلياً.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['Space', 'م', 'ن', 'ا', 'ل', 'ي', 'و', 'ة']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-19',
    title: 'الدرس التاسع عشر',
    description: `أنت الآن محترف حقيقي في الطباعة. ولكن هل تعلم أن صحتك الجسدية هي سر استمرار إنتاجيتك وإبداعك؟ إصابات الإجهاد المتكرر (RSI) هي العدو الأكبر للكاتب المحترف. في هذا الدرس سنتعلم كيفية حماية أنفسنا.

أساسيات الصحة للكاتب المحترف:
1. وضعية الجلوس: استقامة الظهر بنسبة 90-100 درجة. القدمين مسطحتين على الأرض.
2. ارتفاع الكرسي: يجب أن يكون فخذاك موازيين للأرض.
3. موقع لوحة المفاتيح: على ارتفاع يسمح لذراعيك بأن تكونا بزاوية 90 درجة.
4. مستوى الشاشة: يجب أن يكون أعلى قليلاً من مستوى العينين.
5. الإضاءة: إضاءة كافية من الخلف أو الجانب، ليس أمام الشاشة.

تمارين الاسترخاء:
- كل 30 دقيقة، خذ استراحة 5 دقائق.
- مدد أصابعك للخلف بلطف لمدة 10 ثوان.
- أدر معصميك في دوائر بطيئة.
- ارفع كتفيك لأعلى ثم أرخِهما.
- أغمض عينيك لمدة 30 ثانية.

الوقاية هي العلاج: لا تنتظر حتى تشعر بالألم. اعتن بجسمك الآن، فهو أداتك الثمينة.`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 19,
    iconType: 'zap',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.19</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس التاسع عشر
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               أسرار المحترفين - كيف تزيد سرعتك دون إرهاق ونظريات التعلم
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              أنت الآن محترف. لنتحدث عن صحتك الجسدية التي هي سر استمرار الإنتاجية والإبداع. الإرهاق يقتل السرعة والتركيز.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            اجلس وظهرك مستقيم، مدعوم بشكل جيد. اجعل الشاشة في مستوى نظرك.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            اجعل ذراعيك ومرفقيك بزاوية 90 درجة قريبة من جسدك. لا تمد ذراعيك بعيداً.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            افرد معصميك (رسغ اليد)، لا تكسرهما للأسفل وللأعلى لكي لا تلتهب أوتار يدك الثمينة.
          </p>
        </motion.div>
      </div>

      

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             نظرية التعلم تنص على: تدريب 15 دقيقة يومياً بتركيز، يولد نتائج أضخم بـ 10 أضعاف من تدريب 3 ساعات متواصلة مرة واحدة في الأسبوع.
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={[]} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'ar-lesson-20',
    title: 'الدرس العشرون',
    description: `مرحباً بك في القمة أيها البطل المحترف! أنت الآن تمتلك مهارة ثمينة ستخدمك لبقية حياتك. الطباعة باللمس ليست مجرد مهارة تقنية، بل هي مفتاح يفتح لك أبواب الإنتاجية والإبداع.

ما الذي أنجزته بالضبط؟
- تعلمت وضع الأصابع الصحيح على صف الارتكاز.
- أتقنت الوصول إلى الصف العلوي (QWE...).
- أتقنت الوصول إلى الصف السفلي.
- تعلمت استخدام Shift والأرقام والتشكيل والهمزات.
- طورت سرعتك وذاكرتك العضلية.
- فهمت أساسيات الصحة والوضعية السليمة.

نصيحتي الأخيرة لك: استمر في التدرب يومياً. المهارة مثل العضلة، إن لم تستخدمها تضمر. خصص 10 دقائق يومياً للطباعة. اكتب يومياتك، رسائلك، مقالاتك، كل شيء بالطباعة باللمس.

الخطوات التالية:
- استهدف سرعة 40-60 كلمة في الدقيقة في البداية.
- استهدف 80-100 كلمة للمستوى المتوسط.
- المحترفون يصلون إلى 120 كلمة فأكثر!

تهانينا الحارة! رحلتك بدأت الآن للتو، والسماء هي الحدود. اطبع أحلامك! 🎉`,
    content: 'يرجى تفعيل وضع الجرافيكس لرؤية هذه الدروس',
    language: 'ar',
    order: 20,
    iconType: 'zap',
    targetCollection: 'أساسيات صف الارتكاز',
    contentNode: (

    <div className="flex flex-col gap-10">
      
      {/* Intro Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-app-surface to-[#0a0a0c] border border-white/10 rounded-3xl p-8 lg:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 rounded-full blur-[80px] group-hover:bg-app-accent/20 transition-all duration-700"></div>
        <div className="relative z-10 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="bg-gradient-to-b from-app-accent to-app-accent-2 p-5 rounded-2xl shadow-xl shadow-app-accent/20 rotate-3 group-hover:rotate-6 transition-transform">
            <span className="text-black font-black text-4xl">د.20</span>
          </div>
          <div>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight">
              الدرس العشرون
            </h2>
            <h3 className="text-xl md:text-2xl text-app-accent font-bold mb-4">
               التحدي الأخير - إتقان لوحة المفاتيح كاملاً كالخبراء
            </h3>
            <p className="text-lg md:text-xl text-app-text-muted leading-relaxed max-w-3xl border-r-4 border-app-text-muted/20 pr-4">
              مرحباً بك في القمة أيها البطل المحترف. أنت الآن تمتلك مفاتيح العالم بأسره تحت أطراف أصابعك البارعة. المهارة التي تعلمتها الآن ستوفر لك آلاف الساعات في حياتك المهنية.
            </p>
          </div>
        </div>
      </div>

      {/* Step by Step Guide for Weakest Minds */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-blue-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-blue-400 font-black text-xl leading-none">1</span>
          </div>
          <CheckCircle className="text-blue-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الأولى</h4>
          <p className="text-app-text-muted text-center leading-loose">
            الآن العقل واليد أصبحا كياناً واحداً. لا يوجد صف ارتكاز وصف علوي، فقط لوحة كاملة أمام عقلك.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-12 h-12 bg-emerald-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-emerald-400 font-black text-xl leading-none">2</span>
          </div>
          <Compass className="text-emerald-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثانية</h4>
          <p className="text-app-text-muted text-center leading-loose">
            ستبدأ بملاحظة أنك تستطيع الحديث أو الاستماع والتفكير بينما يدك تكتب ما تسمعه أو تفكر فيه دون وعي منك للمفاتيح.
          </p>
        </motion.div>

        <motion.div whileHover={{ y: -5 }} className="bg-app-surface/60 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 relative overflow-hidden">
           <div className="absolute top-0 left-0 w-12 h-12 bg-purple-500/10 rounded-br-3xl flex items-start justify-start p-3">
             <span className="text-purple-400 font-black text-xl leading-none">3</span>
          </div>
          <Target className="text-purple-400 self-center w-12 h-12 mt-2 opacity-80" />
          <h4 className="text-white text-xl font-bold text-center mt-2">الخطوة الثالثة</h4>
          <p className="text-app-text-muted text-center leading-loose">
            حافظ على وضعية الارتكاز دون تفكير كعادتك اليومية الأبدية.
          </p>
        </motion.div>
      </div>

      

      {/* Secret Tips / Pro Tips Pro */}
      <div className="bg-gradient-to-r from-app-surface to-[#221c08] border border-yellow-500/20 p-8 rounded-3xl flex flex-col md:flex-row items-center gap-8 shadow-2xl relative overflow-hidden group mt-4">
         <div className="absolute -right-10 opacity-5 scale-150 rotate-12 group-hover:rotate-45 transition-transform duration-[2000ms]">
           <Sparkles size={300} />
         </div>
         <div className="bg-yellow-500/20 p-6 rounded-full border border-yellow-500/30 flex-shrink-0 animate-pulse-slow">
           <Lightbulb className="text-yellow-400" size={48} />
         </div>
         <div className="z-10">
           <h3 className="text-2xl font-black text-yellow-400 mb-3 tracking-tight">سر المحترفين (لا تخبر به أحداً!)</h3>
           <p className="text-xl text-yellow-100/80 leading-loose border-r-4 border-yellow-500/30 pr-5">
             أنت حققت ما يتهرب منه 90% من الناس لأنه متعب في بدايته، كسر حاجز المبتدئ هو أروع انتصار. استمتع الآن بقدرتك الفائقة وانطلق لكسر الأرقام القياسية!
           </p>
         </div>
      </div>

      {/* Visualizer Section */}
      <div className="flex flex-col items-center gap-8 bg-black/40 p-8 md:p-12 rounded-3xl border border-white/5 shadow-inner mt-4">
        <div className="text-center">
          <h3 className="text-3xl font-black text-white mb-3 flex items-center justify-center gap-3">
            <Keyboard className="text-app-accent" size={32} />
            الخريطة البصرية (حاول أن تنظر هنا فقط!)
          </h3>
          <p className="text-app-text-muted text-lg">
            الأزرار المضيئة بالأسفل هي مجال تركيزك في هذا الدرس. اطبع الصورة في عقلك.
          </p>
        </div>
        <KeyboardVisualizer highlightedKeys={['ك', 'م', 'ن', 'ت', 'ا', 'ل', 'ب', 'ي', 'س', 'ش', 'د', 'ج', 'ح', 'خ', 'ه', 'ع', 'غ', 'ف', 'ق', 'ث', 'ص', 'ض', 'ظ', 'ط', 'ز', 'و', 'ة', 'ى', 'لا', 'ر', 'ؤ', 'ء', 'ئ']} />
      </div>
      
      {/* Ready Button area visually enhanced */}
      <div className="bg-app-accent/5 p-10 rounded-3xl border border-app-accent/20 flex flex-col items-center justify-center text-center relative overflow-hidden mt-4 shadow-[0_0_40px_rgba(255,200,0,0.05)] text-app-bg transition-colors hover:bg-app-accent/10">
        <h3 className="text-4xl font-black text-white mb-4">هل أنت مستعد للتحدي؟</h3>
        <p className="text-app-text-muted/90 text-xl max-w-2xl leading-relaxed">
          تذكر، الدقة أهم بمليون مرة من السرعة في هذه المرحلة. انتقل للوضع العملي وابدأ بناء الذاكرة العضلية!
        </p>
      </div>
    </div>
  
    )
  },
  {
    id: 'en-lesson-1',
    title: 'Introduction to English Touch Typing',
    description: 'Welcome to English touch typing! Learn the QWERTY home row layout (A S D F J K L ;). Proper posture, finger placement, and daily practice are keys to success. Master the home row first before moving on. Focus on accuracy not speed!',
    content: '# Introduction\nEnglish touch typing basics...',
    language: 'en',
    order: 1,
    iconType: 'book',
    targetCollection: 'English Home Row'
  },
  {
    id: 'en-lesson-2',
    title: 'Mastering keys G and H',
    description: 'Master keys G and H using your index fingers. From F (left) reach right for G. From J (right) reach left for H. Practice slowly: F G F G, J H J H. Keep fingers curved and return to home row after each keystroke. Accuracy builds speed.',
    content: '# Mastering G and H\nThe index fingers reach for G and H...',
    language: 'en',
    order: 2,
    iconType: 'finger',
    targetCollection: 'English Home Row'
  },
  {
    id: 'en-lesson-3',
    title: 'Top Row (QWERTY)',
    description: 'Learn the QWERTY top row: Q W E R T Y U I O P. Each finger reaches up from home row. Left pinky: Q, ring: W, middle: E, index: R T. Right index: Y U, middle: I, ring: O, pinky: P. Keep wrists still, let fingers do the reaching!',
    content: '# Top Row\nMoving up to QWERTY...',
    language: 'en',
    order: 3,
    iconType: 'star',
    targetCollection: 'English Top Row'
  },
  {
    id: 'en-lesson-4',
    title: 'Top Row Left Hand (Q W E R T)',
    description: 'Focus on the left hand top row keys: Q, W, E, R, T. Your left pinky reaches up for Q, ring finger for W, middle for E, index for R and T. The key is minimal finger extension from home row. Keep your wrist still. Return each finger to home position after every keystroke. Practice sequences like Q W E R T repeatedly until the movement feels natural and fluid.',
    content: '# Top Row Left Hand\nMastering Q W E R T...',
    language: 'en',
    order: 4,
    iconType: 'keyboard',
    targetCollection: 'English Top Row'
  },
  {
    id: 'en-lesson-5',
    title: 'Top Row Right Hand (Y U I O P)',
    description: 'Master the right hand top row keys: Y, U, I, O, P. Your right index reaches up for Y and U, middle for I, ring for O, pinky for P. The reach distance increases toward the edges. Practice Y U I O P slowly and deliberately. Focus on the Y key as it is the farthest stretch for the right index. Build accuracy before speed with these keys.',
    content: '# Top Row Right Hand\nMastering Y U I O P...',
    language: 'en',
    order: 5,
    iconType: 'keyboard',
    targetCollection: 'English Top Row'
  },
  {
    id: 'en-lesson-6',
    title: 'Bottom Row Left Hand (Z X C V B)',
    description: 'Descend to the bottom row with your left hand! Keys: Z, X, C, V, B. Left pinky reaches down for Z, ring for X, middle for C, index for V and B. The bottom row requires more finger extension than the top row. Keep your palm steady and let your fingers do the reaching. Practice Z X C V B in sequence. These keys appear in many common English words.',
    content: '# Bottom Row Left Hand\nMastering Z X C V B...',
    language: 'en',
    order: 6,
    iconType: 'keyboard',
    targetCollection: 'English Bottom Row'
  },
  {
    id: 'en-lesson-7',
    title: 'Bottom Row Right Hand (N M , . /)',
    description: 'Master the right hand bottom row: N, M, comma, period, forward slash. Right index reaches down for N and M, middle for comma, ring for period, pinky for slash. The comma and period are the most frequently used punctuation marks in English. Practice typing sentences that use these keys. Keep movements small and precise.',
    content: '# Bottom Row Right Hand\nMastering N M , . /...',
    language: 'en',
    order: 7,
    iconType: 'keyboard',
    targetCollection: 'English Bottom Row'
  },
  {
    id: 'en-lesson-8',
    title: 'Numbers Row (1 2 3 4 5)',
    description: 'Time to reach for the numbers! Left hand covers 1 through 5. Left pinky stretches up for 1, ring for 2, middle for 3, index for 4 and 5. This is the longest reach your fingers will make. Lift your palm slightly to give fingers more room. Practice 1 2 3 4 5 slowly. Numbers are essential for passwords, dates, and data entry.',
    content: '# Numbers Row\nMastering 1 2 3 4 5...',
    language: 'en',
    order: 8,
    iconType: 'finger',
    targetCollection: 'English Number Row'
  },
  {
    id: 'en-lesson-9',
    title: 'Numbers Row (6 7 8 9 0)',
    description: 'Continue with the right hand numbers: 6, 7, 8, 9, 0. Right index reaches up for 6 and 7, middle for 8, ring for 9, pinky for 0. The reach for 0 with your pinky is the farthest stretch on the keyboard. Lift your palm for better access. Practice alternating between top row letters and numbers to build coordination.',
    content: '# Numbers Row Right\nMastering 6 7 8 9 0...',
    language: 'en',
    order: 9,
    iconType: 'finger',
    targetCollection: 'English Number Row'
  },
  {
    id: 'en-lesson-10',
    title: 'Shift Key and Capitalization',
    description: 'The Shift key is your gateway to capital letters and symbols. Use the opposite hand rule: press Shift with the hand NOT typing the letter. Left hand letter? Use right Shift. Right hand letter? Use left Shift. This coordination between hands is what separates beginners from advanced typists. Practice capitalizing the first word of every sentence.',
    content: '# Shift Key\nMastering capitalization...',
    language: 'en',
    order: 10,
    iconType: 'finger',
    targetCollection: 'English Symbols'
  },
  {
    id: 'en-lesson-11',
    title: 'Punctuation Marks',
    description: 'Punctuation gives structure to writing. Master period (.), comma (,), question mark (?), exclamation (!), colon (:), semicolon (;), apostrophe (\'), and quotation marks ("). Each punctuation key has a specific finger and requires Shift for the upper symbol. Punctuation slows most typists down, so drill these keys until they become automatic.',
    content: '# Punctuation\nMastering punctuation marks...',
    language: 'en',
    order: 11,
    iconType: 'finger',
    targetCollection: 'English Symbols'
  },
  {
    id: 'en-lesson-12',
    title: 'Special Characters (@ # $ % ^ & *)',
    description: 'Special characters are essential for email addresses, hashtags, prices, and programming. Each requires Shift + a number key. @ is Shift+2, # is Shift+3, $ is Shift+4, % is Shift+5, ^ is Shift+6, & is Shift+7, * is Shift+8. These combinations demand precise hand coordination. Practice the reach and return motion until it feels natural.',
    content: '# Special Characters\nMastering @ # $ % ^ & *...',
    language: 'en',
    order: 12,
    iconType: 'finger',
    targetCollection: 'English Symbols'
  },
  {
    id: 'en-lesson-13',
    title: 'Common Letter Combinations',
    description: 'Speed comes from typing letter groups, not individual keys. Common English bigrams: th, he, in, er, an, on, at, en, nd, ti, es, or, te, of, ed. Common trigrams: the, and, ing, ion, tio, for, ent, tha, nth, oft. Practice these combinations as single fluid movements. Your fingers will learn these patterns and your speed will double.',
    content: '# Common Combinations\nMastering bigrams and trigrams...',
    language: 'en',
    order: 13,
    iconType: 'star',
    targetCollection: 'English Speed'
  },
  {
    id: 'en-lesson-14',
    title: 'Right Hand Speed Drills',
    description: 'Dedicated right hand exercises to build speed and accuracy. Focus on words that use mostly right hand letters: you, put, look, oil, up, pull, loop, ploy, polio, poll, pull, puppy, lollipop. Write each word repeatedly. The right hand handles many common vowels and consonants. Build muscle memory through repetition. Time yourself and track improvement.',
    content: '# Right Hand Drills\nBuilding right hand speed...',
    language: 'en',
    order: 14,
    iconType: 'zap',
    targetCollection: 'English Speed'
  },
  {
    id: 'en-lesson-15',
    title: 'Left Hand Speed Drills',
    description: 'Left hand exercises to match your right hand speed. Left hand words: was, sad, fast, grass, star, test, read, tree, stare, dress, treat, street, water, rest. The left hand handles many consonants in English. These fingers may feel weaker initially, especially the pinky and ring. Consistent practice will strengthen them. Drill for 10 minutes daily.',
    content: '# Left Hand Drills\nBuilding left hand speed...',
    language: 'en',
    order: 15,
    iconType: 'zap',
    targetCollection: 'English Speed'
  },
  {
    id: 'en-lesson-16',
    title: 'Typing Rhythm and Flow',
    description: 'Great typing has a rhythm. Your keystrokes should be evenly spaced like a metronome. Practice typing to a steady beat. Common rhythm exercises: alternate hands (the, and, for, was, but), same hand (look, poll, test, rest), and mixed (quick, brown, fox, jumps, lazy). Find your natural pace and lock into it. Rhythm prevents fatigue and errors.',
    content: '# Rhythm and Flow\nMastering typing rhythm...',
    language: 'en',
    order: 16,
    iconType: 'star',
    targetCollection: 'English Speed'
  },
  {
    id: 'en-lesson-17',
    title: 'Muscle Memory and Automaticity',
    description: 'True typing mastery means your fingers know what to do without conscious thought. This is muscle memory. Build it by drilling the same high-frequency words until they become automatic. English top words: the, be, to, of, and, a, in, that, have, I, it, for, not, on, with, he, as, you, do, at. Write each 20 times without looking at the keyboard.',
    content: '# Muscle Memory\nBuilding automatic typing...',
    language: 'en',
    order: 17,
    iconType: 'star',
    targetCollection: 'English Speed'
  },
  {
    id: 'en-lesson-18',
    title: 'Common English Words Drill',
    description: 'Practice the most frequently used English words until they flow effortlessly. Focus on: about, all, also, am, an, and, any, are, as, at, be, because, but, by, can, come, could, day, do, even, find, first, for, from, get, give, go, have, he, her, here, him, his, how, I, if, in, into, it, its, just, know, like, look, make, man, many, me, more, my, new, no, not, now, of, on, one, only, or, other, our, out, over, people, say, see, she, so, some, take, tell, than, that, them, then, there, these, they, thing, think, this, time, up, upon, us, use, very, want, way, we, well, what, when, which, who, will, with, would, year, you, your. These 100 words make up 50% of all written English!',
    content: '# Common Words Drill\nMastering the top 100 words...',
    language: 'en',
    order: 18,
    iconType: 'zap',
    targetCollection: 'English Speed'
  },
  {
    id: 'en-lesson-19',
    title: 'Ergonomics and Health',
    description: 'Your body is your most important typing tool. Proper ergonomics prevent repetitive strain injuries (RSI) and carpal tunnel syndrome. Essential rules: sit with back straight at 90 degrees, feet flat on floor, elbows at 90 degrees, wrists straight and level, monitor at eye level an arm length away. Take a 5-minute break every 30 minutes. Stretch your fingers, wrists, shoulders, and neck. Do not type through pain. Your long-term health matters more than any typing speed record.',
    content: '# Ergonomics\nProtecting your body while typing...',
    language: 'en',
    order: 19,
    iconType: 'book',
    targetCollection: 'English Speed'
  },
  {
    id: 'en-lesson-20',
    title: 'Congratulations! The Journey Ahead',
    description: 'You have completed all 20 English typing lessons! You now possess a skill that will serve you for life. Touch typing opens doors to productivity, creativity, and professional communication. Your journey does not end here. Set goals: 40 WPM is good, 60 WPM is very good, 80+ WPM is professional. Practice 15 minutes daily using typing websites or by writing journal entries. The sky is the limit. Congratulations, master typist!',
    content: '# Congratulations!\nYour typing journey continues...',
    language: 'en',
    order: 20,
    iconType: 'zap',
    targetCollection: 'English Speed'
  }
];
