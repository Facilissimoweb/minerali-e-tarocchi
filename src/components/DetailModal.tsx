import { ArcanoMineral } from '../types';
import { X, Gem, Microscope, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DetailModalProps {
  item: ArcanoMineral | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  return (
    <AnimatePresence>
      {item && (
        <div 
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-2xl bg-slate-950/95 backdrop-blur-lg rounded-2xl border border-amber-500/30 p-6 md:p-8 space-y-6 shadow-2xl my-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-colors border border-slate-800"
              aria-label="Chiudi"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Header */}
            <div className="space-y-3 border-b border-slate-800/80 pb-5 pr-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-amber-500/15 text-amber-300 font-serif font-bold text-xs md:text-sm border border-amber-500/30 shadow-sm">
                  Arcano {item.roman} ({item.number})
                </span>
                <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[11px] md:text-xs font-semibold border border-slate-800">
                  Sistema: {item.system}
                </span>
              </div>
              
              <h2 className="font-serif text-3xl md:text-4xl font-extrabold text-slate-100 tracking-wide">
                {item.arcanaName}
              </h2>
              
              <h3 className="text-base md:text-lg font-bold text-amber-400 flex items-center gap-2">
                <Gem className="w-4 h-4 text-amber-500" /> 
                <span>{item.mineralName}</span> 
                {item.subTitle && (
                  <span className="text-slate-400 text-xs md:text-sm font-normal">
                    ({item.subTitle})
                  </span>
                )}
              </h3>
            </div>

            {/* Quick Physics Badges Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 shadow-inner">
                <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider mb-1">Formula Chimica</span>
                <span className="font-mono font-bold text-cyan-300 text-sm md:text-base">{item.formula}</span>
              </div>
              
              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 shadow-inner">
                <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider mb-1">Durezza di Mohs</span>
                <span className="font-bold text-amber-400 text-sm md:text-base flex items-center gap-1.5">
                  <span>{item.hardness}</span>
                  <span className="text-xs text-slate-500 font-normal">/ 10</span>
                </span>
              </div>
              
              <div className="p-3.5 bg-slate-900/80 rounded-xl border border-slate-800 shadow-inner col-span-2 md:col-span-1">
                <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider mb-1">Categoria Chimica</span>
                <span className="font-semibold text-slate-200 text-xs md:text-sm">{item.category}</span>
              </div>
            </div>

            {/* Scientific Foundation */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Microscope className="w-4 h-4 text-amber-500" /> 
                <span>Fondamento Scientifico & Archetipale</span>
              </h4>
              <div className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 shadow-inner">
                {item.scientificBasis}
              </div>
            </div>

            {/* Optics & Physical Properties */}
            <div className="space-y-2.5">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" /> 
                <span>Proprietà Ottiche & Meccaniche</span>
              </h4>
              <div className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-900/40 p-4 rounded-xl border border-slate-800/80 shadow-inner">
                {item.opticsPhysical}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-2">
              {item.tags.map(t => (
                <span 
                  key={t}
                  className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-slate-900 text-slate-300 border border-slate-800 hover:border-amber-500/30 transition-colors"
                >
                  #{t}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
