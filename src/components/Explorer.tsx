import { useState, ChangeEvent } from 'react';
import { ArcanoMineral } from '../types';
import { Search, SlidersHorizontal, Gem, ChevronRight, CornerDownRight, RotateCcw } from 'lucide-react';
import { motion } from 'motion/react';

interface ExplorerProps {
  arcanaData: ArcanoMineral[];
  onSelectItem: (item: ArcanoMineral) => void;
}

export default function Explorer({ arcanaData, onSelectItem }: ExplorerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [systemFilter, setSystemFilter] = useState('ALL');
  const [sortOption, setSortOption] = useState('NUM_ASC');

  // Filter systems list
  const systemOptions = [
    { value: 'ALL', label: 'Tutti i Sistemi Cristallini' },
    { value: 'Trigonale', label: 'Trigonale' },
    { value: 'Cubico', label: 'Cubico' },
    { value: 'Monoclinico', label: 'Monoclinico' },
    { value: 'Esagonale', label: 'Esagonale' },
    { value: 'Amorfo', label: 'Amorfo / Vetro' },
    { value: 'Mineraloide', label: 'Mineraloide' },
    { value: 'Roccia', label: 'Roccia / Tettite' },
  ];

  // Handler for system selection
  const handleSystemChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSystemFilter(e.target.value);
  };

  // Handler for sort selection
  const handleSortChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSortOption(e.target.value);
  };

  // Filter & sort logic
  const filteredData = arcanaData.filter(item => {
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = 
      item.arcanaName.toLowerCase().includes(query) ||
      item.mineralName.toLowerCase().includes(query) ||
      item.formula.toLowerCase().includes(query) ||
      item.scientificBasis.toLowerCase().includes(query) ||
      item.tags.some(tag => tag.toLowerCase().includes(query));

    let matchesSystem = false;
    if (systemFilter === 'ALL') {
      matchesSystem = true;
    } else if (systemFilter === 'Amorfo') {
      matchesSystem = item.system.includes('Amorfo') || item.system.includes('Vetro');
    } else if (systemFilter === 'Mineraloide') {
      matchesSystem = item.system.includes('Mineraloide');
    } else if (systemFilter === 'Roccia') {
      matchesSystem = item.system.includes('Roccia') || item.system.includes('Tettite');
    } else {
      matchesSystem = item.system === systemFilter;
    }

    return matchesSearch && matchesSystem;
  });

  // Apply sorting
  const sortedData = [...filteredData];
  if (sortOption === 'NUM_ASC') {
    sortedData.sort((a, b) => a.number - b.number);
  } else if (sortOption === 'NUM_DESC') {
    sortedData.sort((a, b) => b.number - a.number);
  } else if (sortOption === 'HARDNESS_DESC') {
    sortedData.sort((a, b) => b.hardness - a.hardness);
  } else if (sortOption === 'NAME_ASC') {
    sortedData.sort((a, b) => a.mineralName.localeCompare(b.mineralName));
  }

  const resetFilters = () => {
    setSearchQuery('');
    setSystemFilter('ALL');
    setSortOption('NUM_ASC');
  };

  return (
    <div className="space-y-6">
      {/* Hero Description Banner */}
      <div className="glass-panel p-5 md:p-6 rounded-2xl relative overflow-hidden border border-amber-500/15 shadow-xl">
        <div className="absolute top-0 right-0 transform translate-x-8 -translate-y-8 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 max-w-3xl">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-3">
            <SlidersHorizontal className="w-3.5 h-3.5" /> Rigore Scientifico & Mineralogia
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold text-slate-100 mb-2 leading-tight">
            I 22 Arcani Maggiori &amp; La Matrice Cristallina
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Un'associazione strutturata basata sulla chimica dei solidi, sistemi cristallini, fenomeni ottici (adularescenza, asterismo, giostra cromatica) e proprietà fisiche (piezoelettricità, magnetismo, durezza di Mohs).
          </p>
        </div>
      </div>

      {/* Controls: Search & Filters */}
      <div className="flex flex-col gap-4">
        {/* Search Input */}
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cerca arcano, minerale, formula o proprietà chimica..." 
            className="w-full pl-11 pr-4 py-3 bg-slate-900/85 border border-slate-800 rounded-xl text-xs md:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500/60 focus:ring-1 focus:ring-amber-500/60 transition-all shadow-inner"
          />
        </div>

        {/* Filters and Sort */}
        <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {/* System select filter */}
            <select 
              value={systemFilter} 
              onChange={handleSystemChange}
              className="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-[11px] md:text-xs font-medium text-slate-300 focus:outline-none focus:border-amber-500/60 cursor-pointer min-w-[170px]"
            >
              {systemOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>

            {/* Sort order select */}
            <select 
              value={sortOption} 
              onChange={handleSortChange}
              className="bg-slate-900/90 border border-slate-800 rounded-xl px-3 py-2 text-[11px] md:text-xs font-medium text-slate-300 focus:outline-none focus:border-amber-500/60 cursor-pointer min-w-[170px]"
            >
              <option value="NUM_ASC">Ordine Tradizionale (0 - XXI)</option>
              <option value="NUM_DESC">Ordine Inverso (XXI - 0)</option>
              <option value="HARDNESS_DESC">Durezza Mohs (Decrescente)</option>
              <option value="NAME_ASC">Nome Minerale (A-Z)</option>
            </select>
          </div>

          {/* Results count & Clear */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs text-slate-400">
            <span>Trovati: <strong className="text-amber-400 font-bold">{sortedData.length}</strong></span>
            {(searchQuery || systemFilter !== 'ALL' || sortOption !== 'NUM_ASC') && (
              <button 
                onClick={resetFilters}
                className="text-slate-400 hover:text-amber-400 transition-colors flex items-center gap-1 px-2 py-1 rounded bg-slate-900/50 hover:bg-slate-900 border border-slate-800"
              >
                <RotateCcw className="w-3.5 h-3.5" /> Ripristina
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {sortedData.length > 0 ? (
          sortedData.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              key={item.number}
              onClick={() => onSelectItem(item)}
              className="glass-card rounded-2xl p-4 flex flex-col justify-between cursor-pointer group relative overflow-hidden"
            >
              {/* Custom background gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${item.colorGradient} opacity-30 group-hover:opacity-60 transition-opacity duration-300 pointer-events-none`}></div>
              
              <div className="relative z-10 space-y-3.5">
                {/* Header Row */}
                <div className="flex items-center justify-between">
                  <span className="font-serif text-[11px] font-bold px-2 py-0.5 rounded bg-slate-950/80 border border-amber-500/30 text-amber-300">
                    {item.roman}
                  </span>
                  <span className="text-[9px] font-bold text-slate-400 px-2 py-0.5 rounded-full bg-slate-950/40 border border-slate-800 tracking-wider uppercase">
                    {item.system}
                  </span>
                </div>

                {/* Names */}
                <div>
                  <h3 className="font-serif font-bold text-base md:text-lg text-slate-100 group-hover:text-amber-300 transition-colors duration-200">
                    {item.arcanaName}
                  </h3>
                  <p className="text-xs font-bold text-amber-400 flex items-center gap-1 mt-0.5">
                    <Gem className="w-3 h-3 text-amber-500" /> {item.mineralName}
                  </p>
                </div>

                {/* Technical data */}
                <div className="flex items-center gap-2 text-[10px] font-mono">
                  <span className="px-2 py-0.5 rounded bg-slate-950/70 border border-slate-900 text-cyan-300 font-medium">
                    {item.formula}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-slate-950/70 border border-slate-900 text-amber-400 font-medium">
                    Mohs {item.hardness}
                  </span>
                </div>

                {/* Description */}
                <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                  {item.scientificBasis}
                </p>
              </div>

              {/* Bottom tag / detail prompt */}
              <div className="relative z-10 pt-3 mt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px]">
                <span className="text-slate-500 font-semibold tracking-wide uppercase">{item.category}</span>
                <span className="text-amber-400/80 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                  Dettagli <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16 bg-slate-950/50 rounded-2xl border border-slate-800/80 p-8">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center mx-auto mb-3 border border-slate-800">
              <CornerDownRight className="w-6 h-6 text-slate-500" />
            </div>
            <p className="text-slate-400 text-sm font-semibold">Nessun Arcano o Minerale corrisponde ai criteri di ricerca.</p>
            <button 
              onClick={resetFilters}
              className="mt-4 px-4 py-2 rounded-xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 text-xs font-bold text-amber-400 transition-colors"
            >
              Mostra tutti i 22 Minerali
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
