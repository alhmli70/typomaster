import React from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Keyboard, TerminalSquare, Gamepad2, User, Settings, FileEdit, BookOpen } from 'lucide-react';
import { useSettings } from '../contexts/SettingsContext';
import { useSound } from '../contexts/SoundContext';
import { Logo } from './Logo';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const menuItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
  { id: 'dashboard', label: 'لوحة القيادة', icon: <LayoutDashboard size={20} /> },
  { id: 'lessons', label: 'الدروس النظرية', icon: <BookOpen size={20} /> },
  { id: 'typing', label: 'تمرين الطباعة', icon: <Keyboard size={20} /> },
  { id: 'coding', label: 'تمرين الأكواد', icon: <TerminalSquare size={20} /> },
  { id: 'games', label: 'ألعاب الطباعة', icon: <Gamepad2 size={20} /> },
  { id: 'manager', label: 'إدارة التمارين', icon: <FileEdit size={20} /> },
];

const bottomItems: { id: ViewState; label: string; icon: React.ReactNode }[] = [
  { id: 'profile', label: 'الملف الشخصي', icon: <User size={20} /> },
  { id: 'settings', label: 'الإعدادات', icon: <Settings size={20} /> },
];

function NavButton({ item, currentView, onClick, compact }: {
  item: typeof menuItems[0];
  currentView: ViewState;
  onClick: () => void;
  compact: boolean;
}) {
  const active = currentView === item.id;
  return (
    <button
      onClick={onClick}
      title={compact ? item.label : undefined}
      className={`group relative flex items-center ${compact ? 'justify-center w-full' : 'justify-start px-4'} gap-3 py-3 rounded-xl transition-all duration-200 ${
        active
          ? 'bg-app-accent/15 text-app-accent border border-app-accent/25 shadow-sm'
          : 'text-app-text-muted hover:bg-white/5 hover:text-white border border-transparent'
      }`}
    >
      {active && <div className="absolute right-0 top-2 bottom-2 w-0.5 bg-app-accent rounded-full shadow-[0_0_8px_rgba(255,200,0,0.7)]" />}
      <div className={`shrink-0 transition-transform duration-200 ${active ? 'scale-110' : 'group-hover:scale-110'}`}>
        {item.icon}
      </div>
      {!compact && (
        <span className="text-sm font-semibold whitespace-nowrap transition-opacity duration-200">{item.label}</span>
      )}
    </button>
  );
}

export const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const { settings } = useSettings();
  const { sfx } = useSound();
  const mode = settings.sidebarMode || 'full';

  const isFull = mode === 'full';
  const isAuto = mode === 'auto';
  const isCompact = mode === 'compact';

  const width = isFull ? 'w-[220px]' : isAuto ? 'w-[68px] hover:w-[220px]' : 'w-[68px]';
  const padX = isFull ? 'px-4' : 'px-3';
  const brandPad = isFull ? 'px-1' : 'justify-center';

  return (
    <aside className={`flex flex-col bg-app-surface/70 backdrop-blur-2xl border border-white/[0.06] m-2 rounded-2xl h-[calc(100vh-1rem)] sticky top-2 py-5 z-50 transition-all duration-300 ease-out shadow-2xl ${width} ${padX} ${isAuto ? 'group' : ''}`}>
      {/* Brand */}
      <div className={`flex items-center ${brandPad} gap-3 mb-8 transition-all`}>
        <Logo size={40} />
        {(isFull || (isAuto && !isCompact)) ? (
          <div className="flex flex-col overflow-hidden transition-all duration-300">
            <span className="font-black tracking-tight text-white leading-none" style={{ fontSize: 30 }}>Typo</span>
            <span className="font-black tracking-tight text-app-accent leading-none" style={{ fontSize: 20 }}>Master</span>
          </div>
        ) : null}
      </div>

      {/* Nav */}
      <nav className="flex-1 flex flex-col gap-1.5">
        {menuItems.map((item) => (
          <NavButton key={item.id} item={item} currentView={currentView} onClick={() => { sfx.playNavigate(); onChangeView(item.id); }} compact={!isFull && !(isAuto && !isCompact)} />
        ))}
      </nav>

      {/* Bottom */}
      <div className="flex flex-col gap-1.5 mt-auto pt-4 border-t border-white/[0.06]">
        {bottomItems.map((item) => (
          <NavButton key={item.id} item={item} currentView={currentView} onClick={() => { sfx.playNavigate(); onChangeView(item.id); }} compact={!isFull && !(isAuto && !isCompact)} />
        ))}
      </div>
    </aside>
  );
};
