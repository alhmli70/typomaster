import React, { useState } from 'react';
import { Settings as SettingsIcon, Monitor, Keyboard, Palette, Bell, Sparkles, Sliders, Volume2, Globe, Layout, MousePointer2, RefreshCw, Type, Maximize, ScanSearch, Glasses, Eye, Music, AlertTriangle, Activity, Lock, ZoomIn, Play, Pause, SkipForward, User, Code, Cpu, Award, Phone, Mail, MapPin, Briefcase, GraduationCap, Globe as GlobeIcon, ExternalLink, Quote } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { clearAllSettings } from '../database/repositories/settingsRepository';
import { useSound } from '../contexts/SoundContext';
import { motion, AnimatePresence } from 'motion/react';

type Tab = 'appearance' | 'keyboard' | 'interaction' | 'sound' | 'about' | 'advanced';

export const Settings: React.FC = () => {
  const { settings, updateSettings, playClickSound } = useSettings();
  const sound = useSound();
  const [activeTab, setActiveTab] = useState<Tab>('appearance');

  const handleToggle = (key: keyof typeof settings) => {
    updateSettings({ [key]: !(settings[key] as boolean) });
    playClickSound();
  };

  const handleSelect = (key: keyof typeof settings, value: any) => {
    updateSettings({ [key]: value });
    playClickSound();
  };

  const handleSlider = (key: keyof typeof settings, value: number) => {
    updateSettings({ [key]: value });
  };

  const Toggle = ({ id, label, description, icon: Icon }: { id: keyof typeof settings, label: string, description: string, icon: React.ElementType }) => (
    <div className="flex justify-between items-center py-3 px-4 bg-white/5 border border-app-border rounded-2xl hover:bg-white/10 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-app-accent/10 flex items-center justify-center text-app-accent group-hover:scale-110 transition-transform shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">{label}</h4>
          <p className="text-app-text-muted text-xs mt-0.5">{description}</p>
        </div>
      </div>
      <label className="relative inline-flex items-center cursor-pointer shrink-0">
        <input type="checkbox" checked={settings[id] as boolean} onChange={() => handleToggle(id)} className="sr-only peer" />
        <div className="w-11 h-5.5 bg-black/40 rounded-full peer peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[18px] after:w-[18px] after:transition-all peer-checked:bg-app-accent" style={{ height: '22px', width: '44px' }}></div>
      </label>
    </div>
  );

  const Select = ({ id, label, description, options, icon: Icon }: { id: keyof typeof settings, label: string, description: string, options: {value: string, label: string}[], icon: React.ElementType }) => (
    <div className="flex justify-between items-center py-3 px-4 bg-white/5 border border-app-border rounded-2xl hover:bg-white/10 transition-colors group">
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-app-accent/10 flex items-center justify-center text-app-accent group-hover:scale-110 transition-transform shrink-0">
          <Icon size={18} />
        </div>
        <div>
          <h4 className="font-bold text-white text-sm">{label}</h4>
          <p className="text-app-text-muted text-xs mt-0.5">{description}</p>
        </div>
      </div>
      <select value={settings[id] as string} onChange={(e) => handleSelect(id, e.target.value)} className="bg-black/40 text-white font-bold border border-app-border rounded-xl px-3 py-1.5 outline-none focus:border-app-accent min-w-[120px] text-xs cursor-pointer transition-colors" dir="rtl">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  );

  const Slider = ({ id, label, description, min, max, step = 1, icon: Icon }: { id: keyof typeof settings, label: string, description: string, min: number, max: number, step?: number, icon: React.ElementType }) => (
    <div className="flex flex-col py-3 px-4 bg-white/5 border border-app-border rounded-2xl hover:bg-white/10 transition-colors group">
      <div className="flex items-center justify-between gap-3 mb-2">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-app-accent/10 flex items-center justify-center text-app-accent group-hover:scale-110 transition-transform shrink-0">
            <Icon size={18} />
          </div>
          <div>
            <h4 className="font-bold text-white text-sm">{label}</h4>
            <p className="text-app-text-muted text-xs mt-0.5">{description}</p>
          </div>
        </div>
        <div className="bg-black/40 text-app-accent font-bold px-2.5 py-1 rounded-lg text-xs border border-app-border">
          {settings[id]}
        </div>
      </div>
      <input type="range" min={min} max={max} step={step} value={settings[id] as number} onChange={(e) => handleSlider(id, Number(e.target.value))} className="w-full accent-app-accent h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer" dir="ltr" />
    </div>
  );

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: 'appearance', label: 'المظهر', icon: <Palette size={18} /> },
    { id: 'keyboard', label: 'لوحة المفاتيح', icon: <Keyboard size={18} /> },
    { id: 'interaction', label: 'التفاعل', icon: <Bell size={18} /> },
    { id: 'sound', label: 'الصوت والموسيقى', icon: <Music size={18} /> },
    { id: 'about', label: 'من نحن', icon: <User size={18} /> },
    { id: 'advanced', label: 'متقدمة', icon: <Sliders size={18} /> },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'appearance':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
            <Select id="theme" label="الثيم العام" description="اختر النمط اللوني المفضل" icon={Palette} options={[
              {value: 'dark', label: 'الداكن (الرسمي)'},
              {value: 'indigo-dark', label: 'نيلي عميق'},
              {value: 'ruby-dark', label: 'ياقوتي غامق'},
              {value: 'navy-dark', label: 'بحري أنيق'},
              {value: 'forest-dark', label: 'غابي كثيف'},
              {value: 'charcoal-dark', label: 'فحمي كهربائي'},
              {value: 'clean-light', label: 'نظيف مشرق'},
              {value: 'peach-light', label: 'خوخي ناعم'},
              {value: 'sky-light', label: 'سماوي منعش'},
              {value: 'mint-light', label: 'نعناعي فاتح'},
              {value: 'gray-light', label: 'رمادي لطيف'}
            ]} />
            <Select id="fontFamily" label="نوع الخط" description="تغيير الخط المستخدم" icon={Type} options={[
              {value: 'cairo', label: 'القاهرة (Cairo)'},
              {value: 'system', label: 'النظام (System)'}
            ]} />
            <Slider id="fontSizeOffset" label="حجم الخط" description="تكبير أو تصغير النصوص" min={-4} max={4} step={1} icon={Maximize} />
            <Select id="layoutWidth" label="عرض المحتوى" description="تحديد عرض مربعات التعلم" icon={Layout} options={[
              {value: 'narrow', label: 'ضيق (Narrow)'},
              {value: 'normal', label: 'طبيعي (Normal)'},
              {value: 'wide', label: 'عريض (Wide)'},
              {value: 'full', label: 'كامل (Full)'}
            ]} />
            <Select id="uiScale" label="حجم العناصر" description="تكبير أو تصغير الواجهة" icon={ZoomIn} options={[
              {value: 'small', label: 'صغير (Small)'},
              {value: 'medium', label: 'متوسط (Medium)'},
              {value: 'large', label: 'كبير (Large)'},
              {value: 'xlarge', label: 'كبير جداً (X-Large)'}
            ]} />
            <Select id="sidebarMode" label="وضع الشريط الجانبي" description="تغيير نمط القائمة الجانبية" icon={Layout} options={[
              {value: 'full', label: 'واسع (Full)'},
              {value: 'compact', label: 'مضغوط (Compact)'},
              {value: 'auto', label: 'تلقائي (Auto)'}
            ]} />
            <Toggle id="glowEffect" label="تأثيرات التوهج" description="إضافة وهج خلف الأزرار" icon={Sparkles} />
            <Toggle id="glassmorphism" label="تأثير الزجاج" description="جعل الأسطح شفافة" icon={Glasses} />
            <Select id="appLanguage" label="لغة الواجهة" description="تغيير لغة القوائم" icon={Globe} options={[
              {value: 'ar', label: 'العربية (Arabic)'},
              {value: 'en', label: 'English'}
            ]} />
          </motion.div>
        );
      case 'keyboard':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
            <Toggle id="showKeyboard" label="إظهار الكيبورد" description="عرض لوحة مفاتيح على الشاشة" icon={Monitor} />
            <Select id="keyboardLayout" label="شكل الكيبورد" description="النمط البصري للأزرار" icon={Layout} options={[
              {value: 'modern', label: 'حديث (Modern)'},
              {value: 'mechanical', label: 'ميكانيكي (Mechanical)'},
              {value: 'flat', label: 'مسطح (Flat)'}
            ]} />
            <Select id="keyboardSize" label="حجم الكيبورد" description="تغيير مقاسات الأزرار" icon={Maximize} options={[
              {value: 'small', label: 'صغير (Small)'},
              {value: 'medium', label: 'متوسط (Medium)'},
              {value: 'large', label: 'كبير (Large)'}
            ]} />
            <Slider id="keyboardTransparency" label="شفافية الكيبورد" description="تخفيف وضوح الخلفية" min={20} max={100} step={1} icon={Eye} />
            <Toggle id="showFingerHints" label="تلميحات الأصابع" description="تلوين الأزرار حسب الإصبع" icon={MousePointer2} />
            <Toggle id="highlightNextKey" label="تمييز الزر القادم" description="نبض إضاءة على الحرف المطلوب" icon={ScanSearch} />
            <Toggle id="showKeyLetters" label="الأحرف على الأزرار" description="إلغاء للتدريب المتقدم" icon={Type} />
            <Select id="keyClickFeedback" label="تأثير الضغط" description="الحركة عند الضغط" icon={Activity} options={[
              {value: 'none', label: 'بدون تأثير'},
              {value: 'scale', label: 'تصغير (Scale)'},
              {value: 'ripple', label: 'تموج (Ripple)'}
            ]} />
          </motion.div>
        );
      case 'interaction':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
            <Toggle id="enableSounds" label="تفعيل الأصوات" description="أصوات عند النقر والخطأ" icon={Volume2} />
            <Slider id="soundVolume" label="مستوى الصوت" description="قوة أصوات الكتابة" min={0} max={100} step={5} icon={Volume2} />
            <Select id="soundType" label="نوع الصوت" description="التأثير الصوتي للمفاتيح" icon={Music} options={[
              {value: 'modern', label: 'حديث (Modern)'},
              {value: 'typewriter', label: 'آلة كاتبة (Typewriter)'},
              {value: 'mechanical', label: 'ميكانيكي (Mechanical)'}
            ]} />
            <Toggle id="errorShakeEffect" label="اهتزاز عند الخطأ" description="تنبيه حركي للخطأ" icon={AlertTriangle} />
            <Slider id="animationSpeed" label="سرعة الأنيميشن" description="تعديل سرعة المؤثرات" min={0.5} max={2} step={0.1} icon={RefreshCw} />
            <Toggle id="showAIQuickTips" label="نصائح ذكية" description="تلميحات لتسريع التعلم" icon={Sparkles} />
          </motion.div>
        );
      case 'sound':
        return (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
              <div className="bg-app-accent/5 border border-app-accent/15 rounded-xl p-4 mb-1">
                <h4 className="text-sm font-black text-white mb-1">الموسيقى الهادئة</h4>
                <p className="text-xs text-app-text-muted mb-3">10 مقطوعات موسيقية للاسترخاء أثناء التدريب</p>
                <div className="flex items-center gap-2">
                  <button
                    onClick={sound.toggleMusic}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
                      sound.musicPlaying
                        ? 'bg-app-accent text-black'
                        : 'bg-white/5 text-app-text-muted hover:text-white border border-app-border'
                    }`}
                  >
                    {sound.musicPlaying ? <Pause size={16} /> : <Play size={16} />}
                    {sound.musicPlaying ? 'إيقاف' : 'تشغيل'}
                  </button>
                  {sound.musicPlaying && (
                    <button onClick={() => sound.playMusic(((sound.currentTrack || 1) % 10) + 1)} className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5 border border-app-border text-app-text-muted hover:text-white transition-all text-sm font-bold">
                      <SkipForward size={14} /> التالي
                    </button>
                  )}
                </div>
                {sound.musicPlaying && sound.currentTrack && (
                  <div className="mt-3 flex items-center gap-2 bg-black/30 rounded-xl px-3 py-2">
                    <span className="text-lg">{sound.tracks.find(t => t.id === sound.currentTrack)?.icon}</span>
                    <span className="text-xs font-bold text-white">{sound.tracks.find(t => t.id === sound.currentTrack)?.nameAr}</span>
                  </div>
                )}
              </div>
              <div className="flex flex-col gap-2 py-3 px-4 bg-white/5 border border-app-border rounded-2xl group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-app-accent/10 flex items-center justify-center text-app-accent shrink-0"><Volume2 size={18} /></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">مستوى الموسيقى</h4>
                    <p className="text-app-text-muted text-xs mt-0.5">تحكم في صوت الموسيقى الخلفية</p>
                  </div>
                  <span className="bg-black/40 text-app-accent font-bold px-2.5 py-1 rounded-lg text-xs border border-app-border">{Math.round(sound.musicVolume * 100)}</span>
                </div>
                <input type="range" min={0} max={100} value={Math.round(sound.musicVolume * 100)} onChange={e => sound.setMusicVolume(Number(e.target.value) / 100)} className="w-full accent-app-accent h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="flex flex-col gap-2 py-3 px-4 bg-white/5 border border-app-border rounded-2xl group">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-app-accent/10 flex items-center justify-center text-app-accent shrink-0"><Volume2 size={18} /></div>
                  <div className="flex-1">
                    <h4 className="font-bold text-white text-sm">مستوى المؤثرات</h4>
                    <p className="text-app-text-muted text-xs mt-0.5">تحكم في أصوات النقر والتنقل</p>
                  </div>
                  <span className="bg-black/40 text-app-accent font-bold px-2.5 py-1 rounded-lg text-xs border border-app-border">{Math.round(sound.sfxVolume * 100)}</span>
                </div>
                <input type="range" min={0} max={100} value={Math.round(sound.sfxVolume * 100)} onChange={e => sound.setSfxVolume(Number(e.target.value) / 100)} className="w-full accent-app-accent h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer" />
              </div>
              <div className="grid grid-cols-2 gap-3 mt-1">
                {sound.tracks.map(track => (
                  <button
                    key={track.id}
                    onClick={() => sound.playMusic(track.id)}
                    className={`flex items-center gap-2 p-3 rounded-xl border text-right transition-all ${
                      sound.currentTrack === track.id && sound.musicPlaying
                        ? 'bg-app-accent/10 border-app-accent/30 text-app-accent'
                        : 'bg-white/5 border-app-border/50 text-app-text-muted hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <span className="text-xl">{track.icon}</span>
                    <div className="min-w-0">
                      <p className="text-xs font-bold truncate">{track.nameAr}</p>
                      <p className="text-[10px] opacity-60 truncate">{track.name}</p>
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          );
      case 'about':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-5">

            {/* Profile Hero */}
            <div className="relative bg-gradient-to-br from-app-accent/10 via-app-surface/40 to-blue-500/5 border border-app-border rounded-2xl p-5 md:p-8 overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-app-accent/10 blur-[80px] rounded-full pointer-events-none" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-500/8 blur-[60px] rounded-full pointer-events-none" />
              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6">
                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-28 h-28 md:w-32 md:h-32 rounded-2xl bg-gradient-to-br from-app-accent to-app-accent-2 p-[3px] shadow-[0_0_40px_rgba(255,200,0,0.2)]">
                    <div className="relative w-full h-full rounded-2xl bg-app-surface overflow-hidden">
                      <img
                        src="https://image.pollinations.ai/prompt/professional_yemeni_engineer_programmer_portrait_middle_eastern_man_modern_tech_cinematic_lighting_high_quality"
                        alt="المهندس الحسن يحيى الحملي"
                        className="w-full h-full object-cover relative z-10"
                        onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = 'none'; }}
                      />
                      <svg viewBox="0 0 128 128" className="absolute inset-0 w-full h-full">
                        <rect width="128" height="128" fill="var(--app-accent, #FFC800)" rx="16"/>
                        <text x="64" y="82" textAnchor="middle" fontFamily="Arial" fontSize="52" fontWeight="900" fill="var(--app-surface, #0F111A)">AH</text>
                      </svg>
                    </div>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-400 rounded-full border-[3px] border-app-surface shadow-[0_0_12px_rgba(74,222,128,0.5)]" />
                </div>

                {/* Info */}
                <div className="text-center md:text-right flex-1">
                  <h3 className="text-2xl md:text-3xl font-black text-white">المهندس <span className="text-app-accent">الحسن يحيى الحملي</span></h3>
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mt-2">
                    <span className="px-3 py-1 bg-app-accent/10 text-app-accent text-xs font-bold rounded-full border border-app-accent/20">مهندس ميكترونكس</span>
                    <span className="px-3 py-1 bg-blue-500/10 text-blue-400 text-xs font-bold rounded-full border border-blue-500/20">مبرمج</span>
                    <span className="px-3 py-1 bg-purple-500/10 text-purple-400 text-xs font-bold rounded-full border border-purple-500/20">خبرة 8 سنوات</span>
                    <span className="px-3 py-1 bg-green-500/10 text-green-400 text-xs font-bold rounded-full border border-green-500/20">اليمن</span>
                  </div>
                  <p className="text-app-text-muted text-sm mt-4 leading-relaxed max-w-xl">
                    مهندس ميكاترونكس ومبرمج شغوف بتطوير الحلول التقنية المبتكرة. أمتلك خبرة تمتد لـ 8 سنوات في مجال البرمجة
                    والأنظمة المدمجة، وأعمل على تحويل الأفكار إلى منتجات رقمية متكاملة تجمع بين الإبداع الهندسي والدقة البرمجية.
                  </p>
                </div>
              </div>
            </div>

            {/* Quote */}
            <div className="relative bg-app-accent/5 border-r-4 border-app-accent rounded-xl p-4 md:p-5">
              <Quote size={24} className="text-app-accent/30 absolute top-3 right-3" />
              <p className="text-sm md:text-base text-white/80 italic leading-relaxed pr-8">
                "البرمجة ليست مجرد كتابة أكواد، بل هي فن حل المشكلات وصناعة المستقبل. كل سطر أكتبه هو خطوة نحو عالم أفضل."
              </p>
              <p className="text-xs text-app-accent font-bold mt-2 pr-8">— المهندس الحسن يحيى الحملي</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { icon: Briefcase, label: 'الخبرة', value: '8+ سنوات', color: 'text-app-accent', bg: 'bg-app-accent/10' },
                { icon: Code, label: 'مشاريع', value: '50+', color: 'text-blue-400', bg: 'bg-blue-500/10' },
                { icon: Award, label: 'شهادات', value: 'متعددة', color: 'text-purple-400', bg: 'bg-purple-500/10' },
                { icon: GraduationCap, label: 'التخصص', value: 'ميكاترونكس', color: 'text-green-400', bg: 'bg-green-500/10' },
              ].map((stat, i) => (
                <div key={i} className="flex flex-col items-center justify-center p-4 bg-white/5 border border-app-border rounded-2xl hover:bg-white/10 transition-colors">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-2`}>
                    <stat.icon size={20} />
                  </div>
                  <span className="text-lg font-black text-white">{stat.value}</span>
                  <span className="text-xs text-app-text-muted">{stat.label}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <div className="bg-white/5 border border-app-border rounded-2xl p-5">
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <User size={16} className="text-app-accent" />
                نبذة تعريفية
              </h4>
              <p className="text-sm text-app-text-muted leading-relaxed">
                مهندس ميكاترونكس ومبرمج يمني، أمتلك خبرة تمتد لأكثر من 8 سنوات في مجال البرمجة وتطوير الأنظمة.
                عملت على العديد من المشاريع في مجالات الأنظمة المدمجة، تطوير التطبيقات، والبرمجة بشكل عام.
                أتمتع بمهارات تحليلية قوية وقدرة على تحويل المتطلبات المعقدة إلى حلول برمجية فعالة.
                أؤمن بأن التعلم المستمر هو مفتاح النجاح في عالم التقنية، وأسعى دائماً لتطوير مهاراتي
                ومواكبة أحدث التقنيات في المجال. هذه المنصة هي ثمرة شغفي بتعليم الآخرين وتعزيز مهاراتهم
                في الطباعة والبرمجة بأسلوب تفاعلي ممتع.
              </p>
            </div>

            {/* Skills */}
            <div className="bg-white/5 border border-app-border rounded-2xl p-5">
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <Cpu size={16} className="text-app-accent" />
                المهارات والتقنيات
              </h4>
              <div className="flex flex-wrap gap-2">
                {['Python', 'JavaScript/TypeScript', 'React', 'Node.js', 'C/C++', 'Arduino', 'Raspberry Pi', 'SQL', 'Embedded Systems', 'IoT', 'AI & ML', 'UI/UX Design', 'Git', 'Docker', 'Linux', 'Figma', 'Tauri', 'Electron'].map((skill, i) => (
                  <span key={i} className="px-3 py-1.5 bg-app-accent/8 text-app-text-muted hover:text-app-accent hover:bg-app-accent/15 border border-app-border/50 rounded-lg text-xs font-bold transition-all cursor-default">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div className="bg-white/5 border border-app-border rounded-2xl p-5">
              <h4 className="text-sm font-black text-white mb-3 flex items-center gap-2">
                <Phone size={16} className="text-app-accent" />
                معلومات التواصل
              </h4>
              <div className="flex flex-col gap-3">
                <a href="tel:+967779113770" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-app-accent/10 border border-app-border/50 hover:border-app-accent/30 rounded-xl transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-green-500/10 flex items-center justify-center text-green-400 group-hover:scale-110 transition-transform">
                    <Phone size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-app-text-muted">رقم الهاتف</p>
                    <p className="text-sm font-bold text-white group-hover:text-app-accent transition-colors" dir="ltr">+967 779 113 770</p>
                  </div>
                  <ExternalLink size={14} className="text-app-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <a href="mailto:alhmli70@gmail.com" className="flex items-center gap-3 p-3 bg-white/5 hover:bg-app-accent/10 border border-app-border/50 hover:border-app-accent/30 rounded-xl transition-all group">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                    <Mail size={16} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-app-text-muted">البريد الإلكتروني</p>
                    <p className="text-sm font-bold text-white group-hover:text-app-accent transition-colors" dir="ltr">alhmli70@gmail.com</p>
                  </div>
                  <ExternalLink size={14} className="text-app-text-muted opacity-0 group-hover:opacity-100 transition-opacity" />
                </a>
                <div className="flex items-center gap-3 p-3 bg-white/5 border border-app-border/50 rounded-xl">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400">
                    <GlobeIcon size={16} />
                  </div>
                  <div>
                    <p className="text-xs text-app-text-muted">الدولة</p>
                    <p className="text-sm font-bold text-white">اليمن 🇾🇪</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center py-4">
              <p className="text-xs text-app-text-muted">جميع الحقوق محفوظة © {new Date().getFullYear()} — المهندس الحسن يحيى الحملي</p>
              <p className="text-[10px] text-app-text-muted/50 mt-1">Built with ❤️ from Yemen</p>
            </div>

          </motion.div>
        );
      case 'advanced':
        return (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="flex flex-col gap-3">
            <Toggle id="showRealtimeMetrics" label="إظهار الإحصائيات" description="عرض السرعة والدقة أثناء الطباعة" icon={Activity} />
            <Toggle id="strictMode" label="الوضع المتشدد" description="منع مواصلة الكتابة عند الخطأ" icon={Lock} />
            <div className="flex items-center justify-between p-4 bg-red-500/5 border border-red-500/15 rounded-xl mt-2">
              <div className="flex items-center gap-3">
                <AlertTriangle size={20} className="text-red-400 shrink-0" />
                <div>
                  <p className="text-sm font-bold text-red-400">إعادة تعيين</p>
                  <p className="text-xs text-red-400/70">مسح جميع البيانات وإعادة التشغيل</p>
                </div>
              </div>
              <button onClick={async () => { if(confirm("هل أنت متأكد من مسح جميع الإعدادات وإعادتها للافتراضي؟")) { await clearAllSettings(); window.location.reload(); } }} className="bg-red-500 hover:bg-red-600 text-white font-bold py-1.5 px-4 rounded-lg transition-colors text-xs shadow-lg shadow-red-500/20">
                <RefreshCw size={14} />
              </button>
            </div>
          </motion.div>
        );
    }
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 w-full pb-8">

      <div className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-5 md:p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-app-accent/8 blur-[60px] rounded-full pointer-events-none" />
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-app-accent/15 flex items-center justify-center text-app-accent shrink-0">
            <SettingsIcon size={26} />
          </div>
          <div>
            <h2 className="text-xl md:text-2xl font-black text-white">الإعدادات</h2>
            <p className="text-app-text-muted text-sm mt-0.5">تحكم في شكل المنصة وتفاعلاتها</p>
          </div>
        </div>
      </div>

      <div className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-4 md:p-6 flex flex-col md:flex-row gap-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-app-accent/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

        <div className="flex md:flex-col gap-2 overflow-x-auto md:w-48 shrink-0 pb-1 md:pb-0 z-10 no-scrollbar">
          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => { setActiveTab(tab.id); playClickSound(); }} className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl transition-all font-bold whitespace-nowrap text-sm ${
              activeTab === tab.id ? 'bg-app-accent text-black shadow-[0_4px_20px_rgba(255,200,0,0.3)]' : 'text-app-text-muted hover:bg-white/5 hover:text-white'
            }`}>
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex-1 min-w-0 z-10 w-full">
          <AnimatePresence mode="wait">
            <div key={activeTab}>
              {renderTabContent()}
            </div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
