import { useState, useEffect, ChangeEvent } from 'react';
import { ArcanoMineral } from '../types';
import { GitCompare, Gem, Columns, HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface CompareProps {
  arcanaData: ArcanoMineral[];
  onSelectItem: (item: ArcanoMineral) => void;
}

export default function Compare({ arcanaData, onSelectItem }: CompareProps) {
  const [select1, setSelect1] = useState(0);
  const [select2, setSelect2] = useState(1);

  const m1 = arcanaData.find(a => a.number === select1) || arcanaData[0];
  const m2 = arcanaData.find(a => a.number === select2) || arcanaData[1];

  const handleSelect1Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect1(parseInt(e.target.value));
  };

  const handleSelect2Change = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelect2(parseInt(e.target.value));
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20 shadow-sm">
          <GitCompare className="w-3.5 h-3.5" /> Analisi Comparativa
        </span>
        <h2 className="font-serif text-3xl font-bold text-slate-100 tracking-wide">
          Confronto Minerale Affiancato
        </h2>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          Seleziona due Arcani Maggiori per confrontare istantaneamente le loro differenze chimiche, i rispettivi reticoli cristallini, indici di durezza e ruoli simbolici.
        </p>
      </div>

      {/* Selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-4xl mx-auto">
        <div className="glass-panel p-4 rounded-xl border border-slate-900 space-y-2">
          <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Primo Arcano / Minerale</label>
          <select 
            value={select1} 
            onChange={handleSelect1Change} 
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {arcanaData.map(item => (
              <option key={item.number} value={item.number}>
                {item.roman} - {item.arcanaName} ({item.mineralName})
              </option>
            ))}
          </select>
        </div>
        
        <div className="glass-panel p-4 rounded-xl border border-slate-900 space-y-2">
          <label className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block">Secondo Arcano / Minerale</label>
          <select 
            value={select2} 
            onChange={handleSelect2Change} 
            className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2.5 text-xs md:text-sm text-slate-200 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            {arcanaData.map(item => (
              <option key={item.number} value={item.number}>
                {item.roman} - {item.arcanaName} ({item.mineralName})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Card 1 */}
          <motion.div 
            layoutId={`compare-card-${m1.number}`}
            className="bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-850 p-5 md:p-6 space-y-4 shadow-xl"
          >
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] text-amber-400 font-serif font-bold uppercase tracking-widest block mb-1">Arcano {m1.roman}</span>
              <h4 className="font-serif font-extrabold text-xl text-slate-100">{m1.arcanaName}</h4>
              <p className="text-amber-300 font-bold text-sm mt-1 flex items-center gap-1">
                <Gem className="w-3.5 h-3.5 text-amber-500" />
                <span>{m1.mineralName}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Formula</span>
                <span className="font-mono text-cyan-300">{m1.formula}</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Sistema Cristallino</span>
                <span className="text-slate-200 font-semibold">{m1.system}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Durezza Mohs</span>
                <span className="text-amber-400 font-bold text-sm">{m1.hardness} / 10</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Categoria</span>
                <span className="text-slate-300 font-medium">{m1.category}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-slate-500 uppercase font-bold text-[10px] block">Fondamento Scientifico</span>
              <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-850">{m1.scientificBasis}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-slate-500 uppercase font-bold text-[10px] block">Proprietà Fisiche &amp; Ottiche</span>
              <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-850">{m1.opticsPhysical}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-slate-500 uppercase font-bold text-[10px] block">Chakra Associato</span>
              <p className="text-amber-200 font-medium bg-slate-900/40 p-2.5 rounded-lg border border-slate-850/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                <span>{m1.chakraName}</span>
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => onSelectItem(m1)} 
                className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Apri scheda completa
              </button>
            </div>
          </motion.div>

          {/* Card 2 */}
          <motion.div 
            layoutId={`compare-card-${m2.number}`}
            className="bg-slate-950/80 backdrop-blur-md rounded-2xl border border-slate-850 p-5 md:p-6 space-y-4 shadow-xl"
          >
            <div className="border-b border-slate-800 pb-3">
              <span className="text-[10px] text-amber-400 font-serif font-bold uppercase tracking-widest block mb-1">Arcano {m2.roman}</span>
              <h4 className="font-serif font-extrabold text-xl text-slate-100">{m2.arcanaName}</h4>
              <p className="text-amber-300 font-bold text-sm mt-1 flex items-center gap-1">
                <Gem className="w-3.5 h-3.5 text-amber-500" />
                <span>{m2.mineralName}</span>
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Formula</span>
                <span className="font-mono text-cyan-300">{m2.formula}</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Sistema Cristallino</span>
                <span className="text-slate-200 font-semibold">{m2.system}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Durezza Mohs</span>
                <span className="text-amber-400 font-bold text-sm">{m2.hardness} / 10</span>
              </div>
              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-850">
                <span className="text-slate-500 text-[10px] uppercase font-bold block mb-0.5">Categoria</span>
                <span className="text-slate-300 font-medium">{m2.category}</span>
              </div>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-slate-500 uppercase font-bold text-[10px] block">Fondamento Scientifico</span>
              <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-850">{m2.scientificBasis}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-slate-500 uppercase font-bold text-[10px] block">Proprietà Fisiche &amp; Ottiche</span>
              <p className="text-slate-300 leading-relaxed bg-slate-900/50 p-3 rounded-lg border border-slate-850">{m2.opticsPhysical}</p>
            </div>

            <div className="space-y-1.5 text-xs">
              <span className="text-slate-500 uppercase font-bold text-[10px] block">Chakra Associato</span>
              <p className="text-amber-200 font-medium bg-slate-900/40 p-2.5 rounded-lg border border-slate-850/80 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse shadow-[0_0_8px_rgba(251,191,36,0.6)]" />
                <span>{m2.chakraName}</span>
              </p>
            </div>

            <div className="pt-2 flex justify-end">
              <button 
                onClick={() => onSelectItem(m2)} 
                className="text-[11px] font-bold text-amber-400 hover:underline flex items-center gap-1 cursor-pointer"
              >
                Apri scheda completa
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
}
