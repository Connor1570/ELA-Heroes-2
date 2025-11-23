import React from 'react';
import { GameModule, StudentProfile } from '../types';
import Button from './Button';
import HeroRenderer from './HeroRenderer';
import { Eye, Music, Type } from 'lucide-react';

interface MissionSelectProps {
  profile: StudentProfile;
  onSelectModule: (module: GameModule) => void;
  onBack: () => void;
}

const MissionSelect: React.FC<MissionSelectProps> = ({ profile, onSelectModule, onBack }) => {
  return (
    <div className="flex flex-col min-h-screen bg-slate-900 p-8">
      {/* Top Bar */}
      <div className="flex items-center justify-between mb-12">
        <Button variant="secondary" onClick={onBack}>Change Hero</Button>
        <div className="flex items-center gap-4 bg-slate-800 px-6 py-2 rounded-full border-2 border-slate-600">
          <div className="bg-white rounded-full p-1 w-12 h-12 overflow-hidden border-2 border-black">
             <HeroRenderer config={profile.hero} name={profile.name} size={40} className="mt-1" />
          </div>
          <div className="text-right">
             <div className="font-bold text-white text-lg">{profile.name}</div>
             <div className="text-xs text-yellow-400 font-bold uppercase">Grade {profile.gradeLevel}</div>
          </div>
        </div>
      </div>

      <div className="text-center mb-12">
        <h2 className="text-5xl font-black text-white mb-4">MISSION SELECT</h2>
        <p className="text-xl text-blue-200">Choose your training module, Hero!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto w-full">
        {/* Sight Words */}
        <button 
          onClick={() => onSelectModule(GameModule.SIGHT_WORDS)}
          className="group bg-red-600 hover:bg-red-500 rounded-3xl p-8 border-b-8 border-red-800 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-6"
        >
          <div className="bg-white/20 p-6 rounded-full">
            <Eye size={64} className="text-white" />
          </div>
          <h3 className="text-3xl font-black text-white">SIGHT WORDS</h3>
          <p className="text-red-200 font-bold text-center">Identify high-frequency words instantly!</p>
        </button>

        {/* Rhyming */}
        <button 
          onClick={() => onSelectModule(GameModule.RHYMING)}
          className="group bg-blue-600 hover:bg-blue-500 rounded-3xl p-8 border-b-8 border-blue-800 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-6"
        >
          <div className="bg-white/20 p-6 rounded-full">
            <Music size={64} className="text-white" />
          </div>
          <h3 className="text-3xl font-black text-white">RHYMING</h3>
          <p className="text-blue-200 font-bold text-center">Find matching sounds and patterns!</p>
        </button>

        {/* Spelling */}
        <button 
          onClick={() => onSelectModule(GameModule.SPELLING)}
          className="group bg-green-600 hover:bg-green-500 rounded-3xl p-8 border-b-8 border-green-800 active:border-b-0 active:translate-y-2 transition-all flex flex-col items-center gap-6"
        >
          <div className="bg-white/20 p-6 rounded-full">
            <Type size={64} className="text-white" />
          </div>
          <h3 className="text-3xl font-black text-white">SPELLING</h3>
          <p className="text-green-200 font-bold text-center">Assemble letters to build words!</p>
        </button>
      </div>
    </div>
  );
};

export default MissionSelect;
