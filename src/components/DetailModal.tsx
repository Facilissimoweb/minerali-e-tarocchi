import { ArcanoMineral } from '../types';
import { X, Gem, Microscope, Sparkles, Printer, FileText, Compass, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Crystal3D } from './Crystal3D';

interface DetailModalProps {
  item: ArcanoMineral | null;
  onClose: () => void;
}

export default function DetailModal({ item, onClose }: DetailModalProps) {
  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {item && (
        <div 
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto"
          onClick={onClose}
        >
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
            className="relative w-full max-w-3xl bg-slate-950/95 backdrop-blur-lg rounded-2xl border border-amber-500/25 p-4 sm:p-6 md:p-8 space-y-6 shadow-2xl my-4 sm:my-8 max-h-[92vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Print Container Wrapper for Print Styling */}
            <div id="printable-card" className="space-y-6">
              
              {/* Close Button & Print Action - Hidden in print */}
              <div className="absolute top-4 right-4 flex items-center gap-2 print:hidden">
                <button 
                  onClick={handlePrint}
                  title="Esporta in PDF / Stampa"
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-amber-400 hover:text-amber-300 flex items-center justify-center transition-all border border-slate-800 active:scale-95"
                >
                  <Printer className="w-5 h-5" />
                </button>
                <button 
                  onClick={onClose} 
                  className="w-10 h-10 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-white flex items-center justify-center transition-all border border-slate-800"
                  aria-label="Chiudi"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Header */}
              <div className="space-y-3 border-b border-slate-800/80 pb-5 pr-16">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-amber-500/15 text-amber-300 font-serif font-bold text-xs border border-amber-500/35 shadow-sm">
                    Arcano {item.roman} ({item.number})
                  </span>
                  <span className="px-2.5 py-1 rounded-md bg-slate-900 text-slate-300 text-[11px] font-semibold border border-slate-800">
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

              {/* Reference Images: Image + 3D Crystal side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Real-world Reference Image */}
                <div className="relative rounded-xl overflow-hidden border border-white/5 bg-slate-900/50 flex flex-col h-56 group">
                  <img 
                    src={item.imageUrl} 
                    alt={item.mineralName}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3">
                    <span className="text-[11px] font-medium text-slate-200 bg-black/40 px-2.5 py-1 rounded-md backdrop-blur-md border border-white/10 flex items-center gap-1.5">
                      <Gem className="w-3.5 h-3.5 text-amber-400" />
                      Campione Minerale Naturale
                    </span>
                  </div>
                </div>

                {/* 3D Crystallographic Geometry */}
                <div className="relative rounded-xl border border-white/5 bg-slate-900/40 flex flex-col items-center justify-center h-56 overflow-hidden">
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-medium text-slate-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/10 flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-cyan-400" />
                      Reticolo Cristallino: {item.system}
                    </span>
                  </div>
                  <Crystal3D shape={item.crystalShape} color={item.accentColor} size={150} />
                </div>
              </div>

              {/* Quick Physics Badges Grid */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-white/5 shadow-inner">
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider mb-1">Formula Chimica</span>
                  <span className="font-mono font-bold text-cyan-300 text-sm md:text-base">{item.formula}</span>
                </div>
                
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-white/5 shadow-inner">
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider mb-1">Durezza di Mohs</span>
                  <span className="font-bold text-amber-400 text-sm md:text-base flex items-center gap-1.5">
                    <span>{item.hardness}</span>
                    <span className="text-xs text-slate-500 font-normal">/ 10</span>
                  </span>
                </div>
                
                <div className="p-3.5 bg-slate-900/60 rounded-xl border border-white/5 shadow-inner col-span-2 md:col-span-1">
                  <span className="text-[10px] text-slate-500 block font-semibold uppercase tracking-wider mb-1">Categoria Chimica</span>
                  <span className="font-semibold text-slate-200 text-xs md:text-sm">{item.category}</span>
                </div>
              </div>

              {/* 3 FACTORS OF INCIDENCE SECTION */}
              <div className="space-y-4">
                <h3 className="font-serif text-lg font-bold text-slate-200 border-b border-slate-800 pb-2 flex items-center gap-2">
                  <Award className="w-5 h-5 text-amber-500" />
                  <span>I Tre Fattori di Incidenza in Minerallosofia</span>
                </h3>

                <div className="grid grid-cols-1 gap-4">
                  
                  {/* 1. FATTORE MATERIALE */}
                  <div className="p-5 bg-gradient-to-br from-cyan-950/20 to-slate-900/40 rounded-xl border border-cyan-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-cyan-400">
                      <Microscope className="w-4.5 h-4.5" />
                      <h4 className="text-xs font-bold uppercase tracking-widest font-serif">1. Fattore Materiale (Chimico-Fisico)</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.materiale}
                    </p>
                  </div>

                  {/* 2. FATTORE SPIRITUALE */}
                  <div className="p-5 bg-gradient-to-br from-amber-950/20 to-slate-900/40 rounded-xl border border-amber-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-amber-400">
                      <Sparkles className="w-4.5 h-4.5" />
                      <h4 className="text-xs font-bold uppercase tracking-widest font-serif">2. Fattore Spirituale (Ideale-Archetipico)</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.spirituale}
                    </p>
                  </div>

                  {/* 3. FATTORE IMMAGINALE */}
                  <div className="p-5 bg-gradient-to-br from-purple-950/20 to-slate-900/40 rounded-xl border border-purple-500/10 space-y-2">
                    <div className="flex items-center gap-2 text-purple-400">
                      <FileText className="w-4.5 h-4.5" />
                      <h4 className="text-xs font-bold uppercase tracking-widest font-serif">3. Fattore Immaginale (Psico-Immaginale / Anima Mundi)</h4>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {item.immaginale}
                    </p>
                  </div>

                </div>
              </div>

              {/* Scientific Foundation - Additional Context */}
              <div className="space-y-2.5">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Compass className="w-4 h-4 text-slate-500" /> 
                  <span>Corrispondenza & Sintesi Geologica</span>
                </h4>
                <div className="text-xs sm:text-sm text-slate-400 leading-relaxed bg-white/[0.01] p-4 rounded-xl border border-white/5">
                  {item.scientificBasis}
                </div>
              </div>

              {/* Print Footer - Visible ONLY in print */}
              <div className="hidden print:block text-center text-[10px] text-gray-500 pt-8 border-t border-gray-200 mt-12">
                Documento generato dall'applicazione "Arcana Mineralia" • Minerallosofia & Psicologia Immaginale
              </div>

            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
