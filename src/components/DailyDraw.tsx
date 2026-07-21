import { useState } from 'react';
import { ArcanoMineral } from '../types';
import { Sparkles, RefreshCw, Gem, ArrowRight, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DailyDrawProps {
  arcanaData: ArcanoMineral[];
  onSelectItem: (item: ArcanoMineral) => void;
}

export default function DailyDraw({ arcanaData, onSelectItem }: DailyDrawProps) {
  const [isDrawing, setIsDrawing] = useState(false);
  const [drawnCard, setDrawnCard] = useState<ArcanoMineral | null>(null);

  const drawCard = () => {
    if (isDrawing) return;
    setIsDrawing(true);
    setDrawnCard(null);

    // Play a brief 1-second shuffle simulation
    setTimeout(() => {
      const randomIndex = Math.floor(Math.random() * arcanaData.length);
      setDrawnCard(arcanaData[randomIndex]);
      setIsDrawing(false);
    }, 950);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20 shadow-sm">
          <Sparkles className="w-3.5 h-3.5" /> Sincronicità Minerale
        </span>
        <h2 className="font-serif text-3xl font-bold text-slate-100 tracking-wide">
          Estrazione del Giorno
        </h2>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          Concentrati sul tuo momento attuale, su un dubbio teorico o un quesito strutturale. Estrai una carta per rivelare il principio fisico-archetipico e la sua espressione cristallografica guida.
        </p>
      </div>

      {/* Deck Shuffle Area */}
      <div className="flex flex-col items-center justify-center py-8">
        <div 
          className="relative w-52 h-76 cursor-pointer perspective-1000 group mb-8 select-none"
          onClick={drawCard}
        >
          {/* Deck background stack effects */}
          <div className="absolute inset-0 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl transform rotate-3 translate-x-2.5 translate-y-2 opacity-50 transition-transform group-hover:translate-x-3 group-hover:translate-y-2.5"></div>
          <div className="absolute inset-0 bg-slate-900 rounded-2xl border border-slate-800 shadow-2xl transform -rotate-2 -translate-x-1.5 translate-y-1 opacity-75 transition-transform group-hover:-translate-x-2 group-hover:translate-y-1.5"></div>
          
          {/* Main Top Deck Card */}
          <motion.div 
            animate={isDrawing ? { 
              scale: [1, 1.05, 0.95, 1],
              rotateY: [0, 180, 360, 0],
              y: [0, -20, 0]
            } : {}}
            transition={{ duration: 0.9, ease: "easeInOut" }}
            className="absolute inset-0 bg-slate-950 rounded-2xl border-2 border-amber-500/40 p-4 flex flex-col justify-between shadow-2xl group-hover:border-amber-400 transition-all duration-300 select-none"
          >
            <div className="w-full flex justify-between items-center text-amber-500/40">
              <span className="font-mono text-[9px] uppercase tracking-widest">Crystallo</span>
              <Gem className="w-4 h-4 text-amber-500/50" />
            </div>

            <div className="w-20 h-20 rounded-full border border-amber-500/10 flex items-center justify-center bg-amber-500/5 group-hover:scale-105 transition-transform duration-300">
              <Sparkles className={`w-8 h-8 text-amber-400/80 ${isDrawing ? 'animate-spin' : 'animate-pulse'}`} />
            </div>

            <div className="text-center">
              <p className="text-xs font-serif text-amber-300 font-semibold tracking-wider uppercase">
                {isDrawing ? "Mescolando..." : "Tocca per Estrarre"}
              </p>
              <p className="text-[10px] text-slate-500 mt-1">22 Strutture in Attesa</p>
            </div>
          </motion.div>
        </div>

        <button 
          onClick={drawCard}
          disabled={isDrawing}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 disabled:from-slate-800 disabled:to-slate-850 disabled:text-slate-500 disabled:cursor-not-allowed text-slate-950 font-bold text-sm shadow-lg shadow-amber-500/15 flex items-center gap-2 transition-all cursor-pointer hover:scale-102"
        >
          <RefreshCw className={`w-4 h-4 ${isDrawing ? 'animate-spin' : ''}`} />
          {isDrawing ? "Estrazione..." : "Estrai un Minerale Arcano"}
        </button>
      </div>

      {/* Drawn Card Result Area */}
      <AnimatePresence>
        {drawnCard && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="max-w-2xl mx-auto bg-slate-950/80 backdrop-blur-md p-6 rounded-2xl border border-amber-500/30 shadow-2xl space-y-4"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" /> Sincronicità Attiva
                </span>
                <span className="font-serif text-xs font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/20">
                  Arcano {drawnCard.roman}
                </span>
              </div>

              <div className="flex flex-col md:flex-row gap-4 items-start">
                <div className="flex-1 space-y-3">
                  <h3 className="font-serif text-2xl font-extrabold text-slate-100 tracking-wide">
                    {drawnCard.arcanaName}
                  </h3>
                  
                  <h4 className="text-sm font-bold text-amber-400 flex items-center gap-1.5">
                    <Gem className="w-4 h-4 text-amber-500" /> 
                    <span>{drawnCard.mineralName}</span>
                    <span className="text-mono text-xs text-cyan-300 bg-slate-900 px-2 py-0.5 rounded border border-slate-800 ml-2">
                      {drawnCard.formula}
                    </span>
                  </h4>

                  <p className="text-xs md:text-sm text-slate-300 leading-relaxed pt-1">
                    {drawnCard.scientificBasis}
                  </p>
                </div>
              </div>

              {/* Technical insights summary */}
              <div className="p-3.5 bg-slate-900/90 rounded-xl border border-slate-800/80 text-xs text-slate-400 space-y-1.5">
                <p className="leading-relaxed">
                  <strong className="text-slate-200">Applicazione Ottica/Fisica:</strong> {drawnCard.opticsPhysical}
                </p>
              </div>

              <div className="pt-2 flex justify-between items-center">
                <div className="flex flex-wrap gap-1">
                  {drawnCard.tags.slice(0, 2).map(tag => (
                    <span key={tag} className="text-[10px] text-slate-500 bg-slate-900 px-2 py-0.5 rounded border border-slate-900">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <button 
                  onClick={() => onSelectItem(drawnCard)} 
                  className="text-xs font-bold text-amber-400 hover:text-amber-300 flex items-center gap-1.5 transition-colors group cursor-pointer"
                >
                  <span>Sfoglia Scheda Completa</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
