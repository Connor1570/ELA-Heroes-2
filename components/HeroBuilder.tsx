import React, { useState } from 'react';
import { HeroConfig, MaskType, StudentProfile } from '../types';
import HeroRenderer from './HeroRenderer';
import Button from './Button';
import { COLORS, MASK_OPTIONS } from '../constants';
import { ArrowLeft, Dices } from 'lucide-react';

interface HeroBuilderProps {
  onSave: (profile: StudentProfile) => void;
  onCancel: () => void;
}

const HeroBuilder: React.FC<HeroBuilderProps> = ({ onSave, onCancel }) => {
  const nameState = useState('');
  const name = nameState[0];
  const setName = nameState[1];

  const gradeState = useState<number>(1);
  const grade = gradeState[0];
  const setGrade = gradeState[1];

  const configState = useState<HeroConfig>({
    suitColor: COLORS.suit[1],
    capeColor: COLORS.cape[1],
    maskColor: COLORS.mask[0],
    maskType: MaskType.BANDIT,
    skinTone: COLORS.skin[0]
  });
  const config = configState[0];
  const setConfig = configState[1];

  const handleSave = () => {
    if (!name.trim()) {
      alert("Please give your hero a name!");
      return;
    }

    // Fix for missing randomUUID definition in Crypto type
    const generateId = () => {
      if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) {
        return (crypto as any).randomUUID();
      }
      return (Date as any).now().toString(36) + (Math as any).random().toString(36).slice(2);
    };

    const newProfile: StudentProfile = {
      id: generateId(),
      name: name.trim(),
      gradeLevel: grade,
      hero: config,
      stats: {}
    };
    onSave(newProfile);
  };

  const handleRandomize = () => {
    const randomItem = <T,>(arr: T[]): T => arr[(Math as any).floor((Math as any).random() * arr.length)];
    
    setConfig({
      suitColor: randomItem(COLORS.suit),
      capeColor: randomItem(COLORS.cape),
      maskColor: randomItem(COLORS.mask),
      maskType: randomItem(MASK_OPTIONS),
      skinTone: randomItem(COLORS.skin)
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-900 animate-fade-in pb-24">
      {/* Header */}
      <div className="bg-slate-800 p-4 shadow-lg border-b border-slate-700 flex items-center justify-between">
        <button onClick={onCancel} className="text-white hover:text-yellow-400 flex items-center gap-2 font-bold">
           <ArrowLeft /> Back to HQ
        </button>
        <h2 className="text-3xl font-bold text-yellow-400">HERO BUILDER</h2>
        <div className="w-24"></div> {/* Spacer for centering */}
      </div>

      <div className="flex flex-col lg:flex-row flex-1 p-4 lg:p-12 gap-12 justify-center items-start">
        
        {/* Preview Panel */}
        <div className="flex flex-col items-center bg-white/5 rounded-3xl p-8 border-4 border-slate-700 shadow-2xl w-full lg:w-1/3">
          <div className="bg-blue-100 rounded-full p-8 border-8 border-white shadow-inner mb-6 relative">
            <HeroRenderer config={config} name={name} size={300} />
            
            <button 
              onClick={handleRandomize}
              className="absolute bottom-0 right-0 bg-purple-600 hover:bg-purple-500 text-white p-4 rounded-full border-4 border-white shadow-xl transition-transform active:rotate-180"
              title="Randomize Hero"
              aria-label="Randomize Hero Appearance"
            >
              <Dices size={32} />
            </button>
          </div>
          <h3 className="text-4xl font-bold text-white mb-2">{name || "Unknown Hero"}</h3>
          <span className="px-4 py-1 bg-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">
            Grade {grade}
          </span>
        </div>

        {/* Controls Panel */}
        <div className="flex-1 bg-slate-800 rounded-3xl p-8 border border-slate-700 w-full max-w-2xl space-y-8">
          
          {/* Identity Section */}
          <div className="space-y-4">
            <label className="block text-xl font-bold text-blue-300">Secret Identity</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input 
                type="text" 
                placeholder="Hero Name"
                className="w-full p-4 rounded-xl text-black font-bold text-xl border-4 border-transparent focus:border-yellow-400 outline-none"
                value={name}
                onChange={e => setName((e.target as HTMLInputElement).value)}
                maxLength={12}
              />
              <div className="flex items-center gap-4 bg-slate-900 p-2 rounded-xl">
                 <span className="text-gray-400 font-bold ml-2">Grade:</span>
                 <input 
                   type="range" 
                   min="1" 
                   max="6" 
                   value={grade} 
                   onChange={e => setGrade(Number((e.target as HTMLInputElement).value))}
                   className="flex-1 h-4 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                 />
                 <span className="text-2xl font-bold w-8 text-center">{grade}</span>
              </div>
            </div>
          </div>

          {/* Customization Grid */}
          <div className="space-y-6">
             {/* Suit Color */}
             <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Suit Color</label>
                <div className="flex flex-wrap gap-3">
                  {COLORS.suit.map(c => (
                    <button 
                      key={c} 
                      className={`w-12 h-12 rounded-full border-4 ${config.suitColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80'}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setConfig({...config, suitColor: c})}
                    />
                  ))}
                </div>
             </div>

             {/* Cape Color */}
             <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Cape Color</label>
                <div className="flex flex-wrap gap-3">
                  {COLORS.cape.map(c => (
                    <button 
                      key={c} 
                      className={`w-12 h-12 rounded-full border-4 ${config.capeColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80'}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setConfig({...config, capeColor: c})}
                    />
                  ))}
                </div>
             </div>

             {/* Skin Tone */}
             <div>
                <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Skin Tone</label>
                <div className="flex flex-wrap gap-3">
                  {COLORS.skin.map(c => (
                    <button 
                      key={c} 
                      className={`w-12 h-12 rounded-full border-4 ${config.skinTone === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80'}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setConfig({...config, skinTone: c})}
                    />
                  ))}
                </div>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Mask Type */}
                <div>
                   <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Mask Style</label>
                   <div className="grid grid-cols-2 gap-2">
                      {MASK_OPTIONS.map(m => (
                        <button
                          key={m}
                          className={`p-3 rounded-lg border-2 font-bold text-sm ${config.maskType === m ? 'bg-blue-600 border-white text-white' : 'bg-slate-700 border-slate-600 text-gray-400'}`}
                          onClick={() => setConfig({...config, maskType: m})}
                        >
                          {m}
                        </button>
                      ))}
                   </div>
                </div>

                {/* Mask Color */}
                <div>
                  <label className="block text-sm font-bold text-gray-400 mb-2 uppercase">Mask Color</label>
                  <div className="flex flex-wrap gap-3">
                    {COLORS.mask.map(c => (
                      <button 
                        key={c} 
                        className={`w-10 h-10 rounded-full border-4 ${config.maskColor === c ? 'border-white scale-110 shadow-lg' : 'border-transparent opacity-80'}`}
                        style={{ backgroundColor: c }}
                        onClick={() => setConfig({...config, maskColor: c})}
                      />
                    ))}
                  </div>
                </div>
             </div>
          </div>

          <div className="pt-8 border-t border-slate-700">
            <Button variant="success" size="xl" className="w-full" onClick={handleSave}>
              SAVE & START MISSION
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default HeroBuilder;