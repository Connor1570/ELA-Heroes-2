import React, { useState, useEffect } from 'react';
import { AppScreen, GameModule, StudentProfile } from './types';
import MainMenu from './components/MainMenu';
import HeroBuilder from './components/HeroBuilder';
import MissionSelect from './components/MissionSelect';
import GameSession from './components/GameSession';
import AIHelp from './components/AIHelp';

const STORAGE_KEY = 'ela_heroes_profiles';

const App: React.FC = () => {
  const screenState = useState<AppScreen>(AppScreen.MAIN_MENU);
  const screen = screenState[0];
  const setScreen = screenState[1];

  const profilesState = useState<StudentProfile[]>([]);
  const profiles = profilesState[0];
  const setProfiles = profilesState[1];

  const activeProfileState = useState<StudentProfile | null>(null);
  const activeProfile = activeProfileState[0];
  const setActiveProfile = activeProfileState[1];

  const activeModuleState = useState<GameModule | null>(null);
  const activeModule = activeModuleState[0];
  const setActiveModule = activeModuleState[1];

  // Load from LocalStorage on mount
  useEffect(() => {
    // Cast localStorage to any to bypass type errors with getItem
    const stored = (localStorage as any).getItem(STORAGE_KEY);
    if (stored) {
      try {
        setProfiles(JSON.parse(stored));
      } catch (e) {
        console.error("Failed to load profiles", e);
      }
    }
  }, []);

  // Save to LocalStorage whenever profiles change
  useEffect(() => {
    // Cast localStorage to any to bypass type errors with setItem
    (localStorage as any).setItem(STORAGE_KEY, JSON.stringify(profiles));
  }, [profiles]);

  const handleCreateProfile = (newProfile: StudentProfile) => {
    setProfiles(prev => [...prev, newProfile]);
    setActiveProfile(newProfile);
    setScreen(AppScreen.MISSION_SELECT);
  };

  const handleDeleteProfile = (id: string) => {
    setProfiles(prev => prev.filter(p => p.id !== id));
  };

  const handleSelectProfile = (profile: StudentProfile) => {
    setActiveProfile(profile);
    setScreen(AppScreen.MISSION_SELECT);
  };

  const handleStartMission = (module: GameModule) => {
    setActiveModule(module);
    setScreen(AppScreen.GAMEPLAY);
  };

  const handleExitGame = () => {
    setActiveModule(null);
    setScreen(AppScreen.MISSION_SELECT);
  };

  return (
    <div className="min-h-screen bg-slate-900 text-white font-sans selection:bg-yellow-400 selection:text-black">
      {screen === AppScreen.MAIN_MENU && (
        <MainMenu 
          profiles={profiles} 
          onSelectProfile={handleSelectProfile}
          onCreateNew={() => setScreen(AppScreen.HERO_BUILDER)}
          onDeleteProfile={handleDeleteProfile}
        />
      )}

      {screen === AppScreen.HERO_BUILDER && (
        <HeroBuilder 
          onSave={handleCreateProfile}
          onCancel={() => setScreen(AppScreen.MAIN_MENU)}
        />
      )}

      {screen === AppScreen.MISSION_SELECT && activeProfile && (
        <MissionSelect 
          profile={activeProfile}
          onSelectModule={handleStartMission}
          onBack={() => setScreen(AppScreen.MAIN_MENU)}
        />
      )}

      {screen === AppScreen.GAMEPLAY && activeModule && activeProfile && (
        <GameSession 
          module={activeModule}
          profile={activeProfile}
          onExit={handleExitGame}
        />
      )}

      <AIHelp screen={screen} module={activeModule} />
    </div>
  );
};

export default App;