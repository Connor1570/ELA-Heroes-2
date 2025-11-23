import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { AppScreen, GameModule } from '../types';
import { HelpCircle, X, Loader } from 'lucide-react';

interface AIHelpProps {
  screen: AppScreen;
  module: GameModule | null;
}

const AIHelp: React.FC<AIHelpProps> = ({ screen, module }) => {
  const isOpenState = useState(false);
  const isOpen = isOpenState[0];
  const setIsOpen = isOpenState[1];

  const loadingState = useState(false);
  const loading = loadingState[0];
  const setLoading = loadingState[1];

  const helpTextState = useState('');
  const helpText = helpTextState[0];
  const setHelpText = helpTextState[1];

  // Reset help text when context changes
  useEffect(() => {
    setHelpText('');
    setIsOpen(false);
  }, [screen, module]);

  const getHelp = async () => {
    setIsOpen(true);
    if (helpText) return; 
    
    setLoading(true);
    try {
      // Initialize Gemini client with environment key
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      
      let prompt = `You are a friendly, encouraging guide for a child with autism using an educational app called "ELA Heroes". 
      The user is currently on the "${screen}" screen.`;
      
      if (screen === AppScreen.GAMEPLAY && module) {
        prompt += ` They are playing the "${module}" learning module.`;
      } else if (screen === AppScreen.HERO_BUILDER) {
        prompt += ` They are customizing their superhero avatar.`;
      } else if (screen === AppScreen.MAIN_MENU) {
        prompt += ` They are at the start screen where they can pick a profile.`;
      }
      
      prompt += ` Explain simply and kindly what they can do here. Limit to 1-2 short sentences. Use simple words.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
      });
      
      setHelpText(response.text || "Click the buttons to explore!");
    } catch (error) {
      console.error("AI Help Error:", error);
      setHelpText("I'm having trouble connecting, but you're doing great! Try clicking the big buttons.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <button 
        onClick={getHelp}
        className="fixed bottom-6 left-6 bg-yellow-400 hover:bg-yellow-300 text-black p-4 rounded-full shadow-[0_4px_0_rgba(0,0,0,1)] border-4 border-black z-50 transition-transform active:translate-y-1 active:shadow-none"
        aria-label="Get Help"
        title="Ask for Help"
      >
        <HelpCircle size={36} strokeWidth={3} />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white rounded-3xl border-4 border-black p-8 max-w-lg w-full shadow-2xl relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute -top-6 -right-6 bg-red-500 text-white p-3 rounded-full border-4 border-black hover:bg-red-600 shadow-md transition-transform hover:scale-110"
            >
              <X size={28} strokeWidth={3} />
            </button>
            
            <h3 className="text-2xl font-black text-blue-600 mb-6 flex items-center gap-3">
              <HelpCircle className="text-yellow-500 fill-black" size={32} /> 
              HERO HELPER
            </h3>
            
            {loading ? (
              <div className="flex flex-col items-center py-8 gap-4">
                <Loader className="animate-spin text-blue-500" size={56} />
                <p className="font-bold text-gray-400">Thinking...</p>
              </div>
            ) : (
              <p className="text-2xl font-bold text-slate-800 leading-snug">
                {helpText}
              </p>
            )}
            
            <div className="mt-8 flex justify-center">
               <button 
                 onClick={() => setIsOpen(false)}
                 className="bg-green-500 text-white font-bold py-3 px-8 rounded-xl border-b-4 border-green-700 hover:bg-green-400 active:border-b-0 active:translate-y-1"
               >
                 GOT IT!
               </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AIHelp;