import React, { useState, useMemo } from 'react';
import { useExercises } from '../contexts/ExerciseContext';
import { useSound } from '../contexts/SoundContext';
import { Exercise } from '../types';
import { Plus, Edit2, Trash2, Save, X, RotateCcw, Search, Filter, BookOpen, Clock, Code, Globe, Play, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const ExerciseManager: React.FC = () => {
  const { exercises, addExercise, updateExercise, deleteExercise, resetToDefaults } = useExercises();
  const { sfx } = useSound();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterLang, setFilterLang] = useState<string>('all');
  const [filterLevel, setFilterLevel] = useState<string>('all');

  const [formData, setFormData] = useState<Omit<Exercise, 'id'>>({
    title: '', content: '', language: 'ar', level: 'متوسط', collection: '', order: 0,
  });

  const filteredExercises = useMemo(() => {
    return exercises.filter(ex => {
      const matchSearch = ex.title.toLowerCase().includes(searchQuery.toLowerCase()) || ex.content.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLang = filterLang === 'all' || ex.language === filterLang;
      const matchLevel = filterLevel === 'all' || ex.level === filterLevel;
      return matchSearch && matchLang && matchLevel;
    });
  }, [exercises, searchQuery, filterLang, filterLevel]);

  const uniqueLevels = useMemo(() => Array.from(new Set(exercises.map(e => e.level))).filter(Boolean), [exercises]);

  const handleEdit = (ex: Exercise) => {
    setEditingId(ex.id);
    setFormData({ title: ex.title, content: ex.content, language: ex.language, level: ex.level || 'متوسط', collection: ex.collection || '', order: ex.order || 0 });
    setIsCreating(false);
  };

  const handleCancel = () => { setEditingId(null); setIsCreating(false); };

  const handleSave = async () => {
    if (!formData.title || !formData.content) return;
    try {
      if (isCreating) await addExercise(formData);
      else if (editingId) await updateExercise(editingId, formData);
      handleCancel();
    } catch (e) {
      alert('فشل حفظ التمرين. حاول مرة أخرى.');
      console.error('Save failed:', e);
    }
  };

  const handleCreateNew = () => {
    setIsCreating(true); setEditingId(null);
    setFormData({ title: '', content: '', language: 'ar', level: 'متوسط', collection: '', order: 0 });
  };

  const getLanguageIcon = (lang: string) => {
    if (lang === 'code') return <Code size={18} className="text-app-accent-2" />;
    if (lang === 'en') return <Globe size={18} className="text-blue-400" />;
    return <BookOpen size={18} className="text-app-accent" />;
  };

  const getLevelBadge = (level: string) => {
    const isBeg = level === 'beginner' || level === 'مبتدئ';
    const isMed = level === 'medium' || level === 'متوسط';
    const isAdv = level === 'advanced' || level === 'متقدم';
    const displayLevel = isBeg ? 'مبتدئ' : isMed ? 'متوسط' : isAdv ? 'متقدم' : level;
    return (
      <span className={`px-3 py-1 rounded-lg text-xs font-bold border ${
        isBeg ? 'bg-green-500/10 text-green-400 border-green-500/20' : 
        isMed ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' : 
        isAdv ? 'bg-red-500/10 text-red-400 border-red-500/20' :
        'bg-purple-500/10 text-purple-400 border-purple-500/20'
      }`}>
        {displayLevel}
      </span>
    );
  };

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col gap-6 w-full pb-8">

      <div className="bg-app-surface/40 backdrop-blur-xl border border-app-border rounded-2xl p-5 md:p-7 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-48 h-48 bg-app-accent/8 blur-[60px] rounded-full pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-blue-500/5 blur-[80px] rounded-full pointer-events-none" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 px-2.5 py-1 bg-app-accent/10 text-app-accent rounded-lg text-xs font-bold w-fit border border-app-accent/20 mb-3">
            <Sparkles size={12} /> الاستوديو
          </div>
          <h2 className="text-xl md:text-2xl font-black text-white">إدارة التمارين</h2>
          <p className="text-app-text-muted text-sm mt-1">تحكم كامل في مكتبة التمارين الخاصة بك</p>
        </div>
        <div className="relative z-10 flex gap-3 w-full md:w-auto">
          <button onClick={() => { sfx.playClick(); resetToDefaults(); }} className="flex-1 md:flex-none flex justify-center items-center gap-2 px-4 py-2.5 bg-app-surface/50 border border-red-500/30 text-red-400 hover:bg-red-500/10 rounded-xl transition-all font-bold text-sm">
            <RotateCcw size={15} /> استعادة
          </button>
          <button onClick={() => { sfx.playClick(); handleCreateNew(); }} className="flex-1 md:flex-none flex justify-center items-center gap-2 px-5 py-2.5 bg-gradient-to-l from-app-accent to-orange-400 text-black rounded-xl font-black hover:scale-[1.02] transition-all text-sm shadow-[0_5px_20px_rgba(var(--app-accent),0.25)]">
            <Plus size={18} /> تمرين جديد
          </button>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 items-center bg-app-surface/30 backdrop-blur-xl p-4 md:p-5 rounded-2xl border border-app-border">
        <div className="relative w-full lg:w-80">
          <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-app-text-muted" />
          <input type="text" placeholder="البحث في التمارين..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="w-full bg-black/30 text-white border border-app-border rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-app-accent focus:bg-black/50 transition-all placeholder:text-app-text-muted/50 text-sm" />
        </div>
        <div className="flex gap-3 w-full lg:w-auto flex-1 justify-end">
          <div className="flex-1 lg:flex-none flex items-center gap-2 bg-black/30 px-4 py-2.5 rounded-xl border border-app-border">
            <Filter size={15} className="text-app-text-muted" />
            <select value={filterLang} onChange={e => setFilterLang(e.target.value)} className="bg-transparent text-sm font-bold outline-none text-white w-full appearance-none cursor-pointer">
              <option value="all">كل اللغات</option>
              <option value="ar">العربية</option>
              <option value="en">English</option>
              <option value="code">Code</option>
            </select>
          </div>
          <div className="flex-1 lg:flex-none flex items-center gap-2 bg-black/30 px-4 py-2.5 rounded-xl border border-app-border">
            <Filter size={15} className="text-app-text-muted" />
            <select value={filterLevel} onChange={e => setFilterLevel(e.target.value)} className="bg-transparent text-sm font-bold outline-none text-white w-full appearance-none cursor-pointer">
              <option value="all">كل المستويات</option>
              <option value="beginner">مبتدئ</option>
              <option value="medium">متوسط</option>
              <option value="advanced">متقدم</option>
              {uniqueLevels.filter(lvl => !['beginner', 'medium', 'advanced'].includes(lvl)).map(lvl => (
                <option key={lvl} value={lvl}>{lvl}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        <AnimatePresence>
          {filteredExercises.map((ex) => (
            <motion.div layout initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} key={ex.id} className="group flex flex-col bg-app-surface/40 backdrop-blur-xl border border-app-border hover:border-app-accent/40 rounded-2xl p-5 transition-all duration-300 hover:shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-24 h-24 bg-app-accent/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-app-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="flex justify-between items-start mb-4 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-black/40 rounded-xl border border-app-border">
                    {getLanguageIcon(ex.language)}
                  </div>
                  <div>
                    <h3 className="font-bold text-white text-sm">{ex.title}</h3>
                    {ex.collection && <p className="text-xs text-app-text-muted">{ex.collection}</p>}
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button onClick={() => { sfx.playClick(); handleEdit(ex); }} className="p-2 rounded-lg bg-black/30 border border-app-border text-app-text-muted hover:text-white hover:border-white/20 transition-all">
                    <Edit2 size={14} />
                  </button>
                  <button onClick={async () => { sfx.playClick(); try { await deleteExercise(ex.id); } catch (e) { alert('فشل حذف التمرين'); console.error(e); } }} className="p-2 rounded-lg bg-black/30 border border-app-border text-red-400 hover:bg-red-500/20 hover:border-red-500/30 transition-all">
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <p className="text-xs text-app-text-muted/80 line-clamp-2 mb-4 font-mono leading-relaxed flex-1 relative z-10" dir={ex.language === 'en' ? 'ltr' : 'rtl'}>{ex.content}</p>

              <div className="flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-app-text-muted flex items-center gap-1"><Clock size={12} /> {ex.order || '-'}</span>
                  {getLevelBadge(ex.level)}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Edit/Create Modal */}
      <AnimatePresence>
        {(editingId || isCreating) && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => { sfx.playNavigate(); handleCancel(); }}>
            <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} className="bg-app-surface/90 backdrop-blur-2xl border border-app-border rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="p-5 md:p-6">
                <div className="flex items-center justify-between mb-5">
                  <h3 className="font-black text-white text-lg">{isCreating ? 'تمرين جديد' : 'تعديل التمرين'}</h3>
                  <button onClick={() => { sfx.playNavigate(); handleCancel(); }} className="p-2 rounded-lg bg-black/30 border border-app-border text-app-text-muted hover:text-white transition-all">
                    <X size={16} />
                  </button>
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-app-text-muted mb-1.5 block">العنوان</label>
                      <input type="text" value={formData.title} onChange={e => setFormData(p => ({ ...p, title: e.target.value }))} className="w-full bg-black/30 border border-app-border rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-app-accent transition-all" placeholder="عنوان التمرين" />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-app-text-muted mb-1.5 block">اللغة</label>
                      <select value={formData.language} onChange={e => setFormData(p => ({ ...p, language: e.target.value as 'ar' | 'en' | 'code' }))} className="w-full bg-black/30 border border-app-border rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-app-accent transition-all appearance-none cursor-pointer">
                        <option value="ar">العربية</option>
                        <option value="en">English</option>
                        <option value="code">Code</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-bold text-app-text-muted mb-1.5 block">المحتوى</label>
                    <textarea value={formData.content} onChange={e => setFormData(p => ({ ...p, content: e.target.value }))} rows={4} className="w-full bg-black/30 border border-app-border rounded-xl px-4 py-2.5 text-white text-sm font-mono outline-none focus:border-app-accent transition-all resize-none" placeholder="نص التمرين" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-bold text-app-text-muted mb-1.5 block">المستوى</label>
                      <select value={formData.level} onChange={e => setFormData(p => ({ ...p, level: e.target.value }))} className="w-full bg-black/30 border border-app-border rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-app-accent transition-all appearance-none cursor-pointer">
                        <option value="beginner">مبتدئ</option>
                        <option value="medium">متوسط</option>
                        <option value="advanced">متقدم</option>
                        <option value="mixed">متنوع</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-app-text-muted mb-1.5 block">التصنيف</label>
                      <input type="text" value={formData.collection || ''} onChange={e => setFormData(p => ({ ...p, collection: e.target.value }))} className="w-full bg-black/30 border border-app-border rounded-xl px-4 py-2.5 text-white text-sm outline-none focus:border-app-accent transition-all" placeholder="مثلاً: أساسيات" />
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => { sfx.playNavigate(); handleCancel(); }} className="flex-1 px-4 py-2.5 bg-black/30 border border-app-border rounded-xl text-sm font-bold text-app-text-muted hover:text-white transition-all">إلغاء</button>
                  <button onClick={() => { sfx.playClick(); handleSave(); }} className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-app-accent text-black rounded-xl text-sm font-black hover:shadow-lg hover:shadow-app-accent/20 transition-all">
                    <Save size={16} /> حفظ
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ExerciseManager;
