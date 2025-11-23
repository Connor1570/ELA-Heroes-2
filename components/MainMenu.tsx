import React from 'react';
import { StudentProfile } from '../types';
import Button from './Button';
import HeroRenderer from './HeroRenderer';

interface MainMenuProps {
  profiles: StudentProfile[];
  onSelectProfile: (profile: StudentProfile) => void;
  onCreateNew: () => void;
  onDeleteProfile: (id: string) => void;
}

const MainMenu: React.FC<MainMenuProps> = ({ profiles, onSelectProfile, onCreateNew, onDeleteProfile }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8 space-y-8 animate-fade-in pb-24">
      <div className="text-center space-y-2">
        <h1 className="text-6xl font-extrabold text-yellow-400 drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)] stroke-black tracking-wider">
          ELA HEROES
        </h1>
        <p className="text-xl text-blue-200">Select your Hero to begin the mission!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-6xl">
        {profiles.map((profile) => (
          <div 
            key={profile.id} 
            className="bg-slate-800 rounded-2xl p-6 border-4 border-blue-500 flex flex-col items-center relative hover:bg-slate-750 transition-colors shadow-lg"
          >
            <div className="bg-white rounded-full p-4 mb-4 border-4 border-black shadow-inner">
               <HeroRenderer config={profile.hero} name={profile.name} size={120} />
            </div>
            
            <h2 className="text-2xl font-bold mb-1">{profile.name}</h2>
            <p className="text-gray-400 mb-4">Grade {profile.gradeLevel}</p>
            
            <div className="flex gap-2 w-full">
              <Button 
                variant="success" 
                className="flex-1"
                onClick={() => onSelectProfile(profile)}
              >
                PLAY
              </Button>
              <Button 
                variant="danger" 
                size="md"
                className="px-4"
                onClick={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                  if(window.confirm(`Are you sure you want to retire ${profile.name}?`)) {
                    onDeleteProfile(profile.id);
                  }
                }}
                aria-label={`Delete ${profile.name}`}
              >
                🗑
              </Button>
            </div>
          </div>
        ))}

        <div className="bg-slate-800/50 rounded-2xl p-6 border-4 border-dashed border-gray-600 flex flex-col items-center justify-center min-h-[300px] hover:bg-slate-800/80 transition-colors cursor-pointer" onClick={onCreateNew}>
          <Button variant="primary" size="lg" onClick={(e) => { e.stopPropagation(); onCreateNew(); }}>
            + NEW HERO
          </Button>
        </div>
      </div>
      
      <div className="fixed bottom-4 right-4 text-gray-500 text-sm font-semibold select-none z-10">
        Created by Natalie and Connor Murphy
      </div>
    </div>
  );
};

export default MainMenu;