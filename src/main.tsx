import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { SettingsProvider } from './contexts/SettingsContext';
import { ExerciseProvider } from './contexts/ExerciseContext';
import { SessionProvider } from './contexts/SessionContext';
import { SoundProvider } from './contexts/SoundContext';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SettingsProvider>
      <ExerciseProvider>
        <SessionProvider>
          <SoundProvider>
            <App />
          </SoundProvider>
        </SessionProvider>
      </ExerciseProvider>
    </SettingsProvider>
  </StrictMode>,
);
