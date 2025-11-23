import React, { useState, useEffect, useCallback } from 'react';
import { GameModule, StudentProfile } from '../types';
import { EDUCATIONAL_DATA } from '../constants';
import Button from './Button';
import HeroRenderer from './HeroRenderer';
import { Star, ArrowLeft, RefreshCw, CheckCircle } from 'lucide-react';

interface GameSessionProps {
  module: GameModule;
  profile: StudentProfile;
  onExit: () => void;
}

const GameSession: React.FC<GameSessionProps> = ({ module, profile, onExit }) => {
  const scoreState = useState(0);
  const score = scoreState[0];
  const setScore = scoreState[1];

  const questionIndexState = useState(0);
  const questionIndex = questionIndexState[0];
  const setQuestionIndex = questionIndexState[1];
  
  // Track state of buttons for current question: 'neutral', 'correct', 'incorrect'
  const optionStatesState = useState<Record<string, 'neutral' | 'correct' | 'incorrect'>>({});
  const optionStates = optionStatesState[0];
  const setOptionStates = optionStatesState[1];

  const showSuccessOverlayState = useState(false);
  const showSuccessOverlay = showSuccessOverlayState[0];
  const setShowSuccessOverlay = showSuccessOverlayState[1];
  
  const spellingInputState = useState<string[]>([]);
  const spellingInput = spellingInputState[0];
  const setSpellingInput = spellingInputState[1];
  
  // Data for the current grade
  const gradeData = EDUCATIONAL_DATA[profile.gradeLevel] || EDUCATIONAL_DATA[1];

  // Helper to bypass TS error on Math.random
  const getRandom = () => (Math as any).random();

  // Logic to get current question data
  const getCurrentQuestion = useCallback(() => {
    if (module === GameModule.SIGHT_WORDS) {
      const target = gradeData.sightWords[questionIndex % gradeData.sightWords.length];
      // Generate distractors
      const distractors = gradeData.sightWords
        .filter(w => w !== target)
        .sort(() => 0.5 - getRandom())
        .slice(0, 2);
      const options = [target, ...distractors].sort(() => 0.5 - getRandom());
      return { target, options, type: 'text' };
    } 
    else if (module === GameModule.RHYMING) {
      const q = gradeData.rhymes[questionIndex % gradeData.rhymes.length];
      // Options are target match and distractor
      const options = [q.match, q.distractor].sort(() => 0.5 - getRandom());
      return { target: q.target, options, correctAnswer: q.match, type: 'rhyme' };
    }
    else {
      // Spelling
      const target = gradeData.spelling[questionIndex % gradeData.spelling.length];
      const shuffledLetters = target.split('').sort(() => 0.5 - getRandom());
      // Add a couple extra random letters for difficulty
      const extra = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('').sort(() => 0.5 - getRandom()).slice(0, 3);
      const pool = [...shuffledLetters, ...extra].sort(() => 0.5 - getRandom());
      return { target, pool, type: 'spell' };
    }
  }, [module, gradeData, questionIndex]);

  const currentQState = useState<any>(getCurrentQuestion());
  const currentQ = currentQState[0];
  const setCurrentQ = currentQState[1];

  // Reset state when question changes
  useEffect(() => {
    setSpellingInput([]);
    setOptionStates({});
    setShowSuccessOverlay(false);
    setCurrentQ(getCurrentQuestion());
  }, [questionIndex, getCurrentQuestion]);

  const handleAnswer = (answer: string) => {
    if (showSuccessOverlay) return;
    if (optionStates[answer] === 'incorrect') return;

    let isCorrect = false;

    if (module === GameModule.SIGHT_WORDS) {
      isCorrect = answer === currentQ.target;
    } else if (module === GameModule.RHYMING) {
      isCorrect = answer === currentQ.correctAnswer;
    }

    if (isCorrect) {
      // Visual feedback on button first
      setOptionStates(prev => ({ ...prev, [answer]: 'correct' }));
      setScore(s => s + 100);
      
      // Delay success overlay slightly to let them see the green button
      setTimeout(() => {
        setShowSuccessOverlay(true);
        setTimeout(() => {
          setQuestionIndex(i => i + 1);
        }, 2000);
      }, 500);
    } else {
      // Gentle negative feedback: just dim the button, no harsh sounds or red screens
      setOptionStates(prev => ({ ...prev, [answer]: 'incorrect' }));
    }
  };

  const handleSpellingLetter = (letter: string, index: number) => {
     // Prevent multiple clicks on same index if we wanted, 
     // but here just appending logic
     const newInput = [...spellingInput, letter];
     setSpellingInput(newInput);
     
     if (newInput.length === currentQ.target.length) {
       if (newInput.join('') === currentQ.target) {
         setScore(s => s + 150);
         setShowSuccessOverlay(true);
         setTimeout(() => setQuestionIndex(i => i + 1), 2000);
       } else {
         // Gentle reset for spelling
         setTimeout(() => setSpellingInput([]), 1000);
       }
     }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden">
      {/* HUD */}
      <div className="flex justify-between items-center p-4 bg-slate-800 border-b-4 border-slate-700 relative z-20">
        <Button size="sm" variant="secondary" onClick={onExit} className="flex gap-2">
          <ArrowLeft /> ABORT
        </Button>
        <div className="text-2xl font-black text-yellow-400 flex items-center gap-2">
          SCORE: {score} <Star fill="currentColor" />
        </div>
      </div>

      {/* Main Game Area */}
      <div className="flex-1 flex flex-col items-center justify-center p-8 relative">
        
        {/* Success Overlay - Fun and Positive */}
        {showSuccessOverlay && (
          <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in">
             <div className="flex flex-col items-center animate-bounce-in">
               <div className="bg-green-500 text-white text-6xl font-black p-12 rounded-3xl border-8 border-white shadow-2xl transform -rotate-3 mb-8 flex items-center gap-4">
                 <CheckCircle size={64} /> EXCELLENT!
               </div>
               <div className="animate-bounce">
                 <HeroRenderer config={profile.hero} name={profile.name} size={250} />
               </div>
             </div>
          </div>
        )}

        {/* Content */}
        <div className="w-full max-w-5xl flex flex-col items-center gap-12">
          
          {/* Prompt */}
          <div className="bg-white rounded-3xl p-12 w-full text-center border-b-8 border-gray-300 shadow-xl relative">
             {module === GameModule.SIGHT_WORDS && (
               <h1 className="text-8xl font-black text-slate-800 tracking-wider">{currentQ.target}</h1>
             )}
             
             {module === GameModule.RHYMING && (
               <div className="space-y-4">
                 <p className="text-2xl text-gray-500 font-bold uppercase">Which word rhymes with...</p>
                 <h1 className="text-7xl font-black text-blue-600 underline decoration-4 decoration-yellow-400 underline-offset-8">
                   {currentQ.target}
                 </h1>
               </div>
             )}

             {module === GameModule.SPELLING && (
               <div className="space-y-6">
                 <p className="text-xl text-gray-500 font-bold uppercase">Spell the word:</p>
                 <h2 className="text-5xl font-bold text-slate-400 italic">"{currentQ.target}"</h2>
                 
                 <div className="flex gap-4 justify-center min-h-[100px]">
                   {Array.from({length: currentQ.target.length}).map((_, i) => (
                     <div key={i} className="w-20 h-24 bg-slate-100 rounded-lg border-b-4 border-slate-300 flex items-center justify-center text-5xl font-bold text-black shadow-inner">
                       {spellingInput[i] || ''}
                     </div>
                   ))}
                 </div>
               </div>
             )}
          </div>

          {/* Controls */}
          <div className="w-full">
            {(module === GameModule.SIGHT_WORDS || module === GameModule.RHYMING) && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {currentQ.options.map((opt: string, idx: number) => {
                  const state = optionStates[opt] || 'neutral';
                  
                  let buttonStyle = "bg-blue-600 hover:bg-blue-500 border-blue-800 text-white"; // default
                  if (state === 'correct') buttonStyle = "bg-green-500 border-green-700 text-white scale-105 z-10 shadow-[0_0_30px_rgba(34,197,94,0.6)]";
                  if (state === 'incorrect') buttonStyle = "bg-slate-600 border-slate-700 text-gray-400 opacity-50 cursor-not-allowed scale-95";

                  return (
                    <button
                      key={idx}
                      onClick={() => handleAnswer(opt)}
                      disabled={state === 'incorrect' || showSuccessOverlay}
                      className={`text-4xl font-bold py-10 rounded-3xl border-b-8 active:border-b-0 active:translate-y-2 transition-all shadow-xl ${buttonStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            )}

            {module === GameModule.SPELLING && (
               <div className="flex flex-wrap gap-4 justify-center">
                 {currentQ.pool.map((char: string, idx: number) => (
                   <button
                     key={idx}
                     onClick={() => handleSpellingLetter(char, idx)}
                     className="bg-yellow-400 hover:bg-yellow-300 text-black text-4xl font-black w-24 h-24 rounded-2xl border-b-8 border-yellow-600 active:border-b-0 active:translate-y-1 transition-all shadow-lg"
                   >
                     {char}
                   </button>
                 ))}
                 <button 
                   onClick={() => setSpellingInput([])} 
                   className="bg-slate-600 hover:bg-slate-500 text-white p-6 rounded-2xl font-bold border-b-8 border-slate-800 active:translate-y-1 active:border-b-0"
                   aria-label="Reset Spelling"
                 >
                   <RefreshCw size={32} />
                 </button>
               </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default GameSession;