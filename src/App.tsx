import React, { useState, lazy, Suspense } from 'react';
import { ViewState } from './types';
import { Sidebar } from './components/Sidebar';
import { Dashboard } from './components/Dashboard';
import { ExerciseSelection } from './components/ExerciseSelection';
import { GamesMenu } from './components/GamesMenu';
import { Settings } from './components/Settings';
import { Profile } from './components/Profile';
import { Lessons } from './components/Lessons';
import { MusicToggle } from './components/MusicToggle';
import { useSettings } from './contexts/SettingsContext';

const ExerciseManager = lazy(() => import('./components/ExerciseManager'));

function Loader() {
  return (
    <div className="flex items-center justify-center h-64">
      <div className="w-8 h-8 border-2 border-app-accent border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('dashboard');
  const [selectedCollection, setSelectedCollection] = useState<string | null>(null);
  const { settings } = useSettings();

  const navigateToExercise = (collection: string, language: 'ar' | 'en' | 'code') => {
    setSelectedCollection(collection);
    setCurrentView(language === 'code' ? 'coding' : 'typing');
  };

  const renderContent = () => {
    switch(currentView) {
      case 'dashboard':
        return <Dashboard />;
      case 'lessons':
        return <Lessons onNavigateToExercise={navigateToExercise} />;
      case 'typing':
        return <ExerciseSelection type="typing" initialCollection={selectedCollection} />;
      case 'coding':
        return <ExerciseSelection type="coding" initialCollection={selectedCollection} />;
      case 'games':
        return <GamesMenu />;
      case 'manager':
        return (
          <Suspense fallback={<Loader />}>
            <ExerciseManager />
          </Suspense>
        );
      case 'settings':
        return <Settings />;
      case 'profile':
        return <Profile />;
    }
  };

  return (
    <div className={`flex h-screen bg-app-bg text-app-text font-sans selection:bg-app-accent/25 selection:text-app-accent overflow-hidden ${settings.glassmorphism ? 'glassmorphism-enabled' : ''}`}>
      <Sidebar currentView={currentView} onChangeView={setCurrentView} />
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className="pointer-events-none fixed top-0 right-0 w-full h-64 bg-gradient-to-b from-app-surface/30 to-transparent -z-10" />
        <div className="w-full p-5 md:p-7 lg:p-8 transition-all duration-300">
          {renderContent()}
        </div>
        <MusicToggle />
      </main>
    </div>
  );
}
