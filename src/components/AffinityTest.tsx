import { useState, FormEvent } from 'react';
import { ArcanoMineral } from '../types';
import { Fingerprint, Gem, CornerDownRight, RotateCcw, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AffinityTestProps {
  arcanaData: ArcanoMineral[];
  onSelectItem: (item: ArcanoMineral) => void;
}

export default function AffinityTest({ arcanaData, onSelectItem }: AffinityTestProps) {
  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [result, setResult] = useState<ArcanoMineral | null>(null);

  const calculateResult = (e: FormEvent) => {
    e.preventDefault();
    if (!q1 || !q2 || !q3) return;

    let resultArcana = arcanaData[0]; // fallback

    if (q1 === 'STABILITY' || q2 === 'HARDNESS') {
      resultArcana = arcanaData.find(a => a.number === 21) || arcanaData[21]; // Diamante
    } else if (q1 === 'TRANSFORMATION' || q3 === 'CHANGE') {
      resultArcana = arcanaData.find(a => a.number === 16) || arcanaData[16]; // Fulgurite
    } else if (q2 === 'ENERGY') {
      resultArcana = arcanaData.find(a => a.number === 13) || arcanaData[13]; // Tormalina Nera
    } else if (q2 === 'OPTICS') {
      resultArcana = arcanaData.find(a => a.number === 10) || arcanaData[10]; // Opale
    } else if (q2 === 'MAGNETISM') {
      resultArcana = arcanaData.find(a => a.number === 15) || arcanaData[15]; // Magnetite
    } else if (q3 === 'LOGIC') {
      resultArcana = arcanaData.find(a => a.number === 11) || arcanaData[11]; // Fluorite
    } else if (q3 === 'INTROSPECTION') {
      resultArcana = arcanaData.find(a => a.number === 9) || arcanaData[9]; // Ossidiana
    } else if (q3 === 'GROWTH') {
      resultArcana = arcanaData.find(a => a.number === 3) || arcanaData[3]; // Smeraldo
    }

    setResult(resultArcana);
  };

  const handleReset = () => {
    setQ1('');
    setQ2('');
    setQ3('');
    setResult(null);
  };

  return (
    <div className="space-y-6">
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 shadow-sm">
          <Fingerprint className="w-3.5 h-3.5" /> Profilazione Minerale
        </span>
        <h2 className="font-serif text-3xl font-bold text-slate-100 tracking-wide">
          Test di Affinità Cristallografica
        </h2>
        <p className="text-xs md:text-sm text-slate-400 leading-relaxed">
          Rispondi a 3 quesiti strutturali e attitudinali per scoprire quale minerale terrestre e quale Arcano Maggiore riflette fedelmente la tua configurazione energetica attuale.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-slate-950/70 backdrop-blur-md p-6 rounded-2xl border border-slate-900 shadow-xl" id="quizContainer">
        {!result ? (
          <form onSubmit={calculateResult} className="space-y-6">
            {/* Q1 */}
            <div className="space-y-3">
              <label className="block text-xs md:text-sm font-bold text-amber-300 tracking-wide uppercase">
                1. Quale stato o comportamento strutturale ti descrive meglio?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q1 === 'STABILITY' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="STABILITY" 
                    checked={q1 === 'STABILITY'}
                    onChange={() => setQ1('STABILITY')}
                    className="mt-0.5 accent-amber-500" 
                    required 
                  />
                  <span>Massima stabilità, ordine perfetto e simmetria (Es. Cubico/Invariante)</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q1 === 'TRANSFORMATION' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="TRANSFORMATION" 
                    checked={q1 === 'TRANSFORMATION'}
                    onChange={() => setQ1('TRANSFORMATION')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>Trasformazione rapida, shock termico e impatto (Es. Vetro/Tettite)</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q1 === 'FLUIDITY' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="FLUIDITY" 
                    checked={q1 === 'FLUIDITY'}
                    onChange={() => setQ1('FLUIDITY')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>Trasparenza fluida, rifrazione e sensibilità ottica (Es. Selenite/Acqua)</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q1 === 'FREE' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q1" 
                    value="FREE" 
                    checked={q1 === 'FREE'}
                    onChange={() => setQ1('FREE')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>Svincolato da schemi fissi, potenziale puro (Es. Quarzo Ialino)</span>
                </label>
              </div>
            </div>

            {/* Q2 */}
            <div className="space-y-3">
              <label className="block text-xs md:text-sm font-bold text-amber-300 tracking-wide uppercase">
                2. Quale proprietà fisica/meccanica apprezzi maggiormente?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q2 === 'HARDNESS' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="HARDNESS" 
                    checked={q2 === 'HARDNESS'}
                    onChange={() => setQ2('HARDNESS')}
                    className="mt-0.5 accent-amber-500" 
                    required 
                  />
                  <span>Elevata durezza Mohs (Incorruttibile, resistenza strutturale)</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q2 === 'ENERGY' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="ENERGY" 
                    checked={q2 === 'ENERGY'}
                    onChange={() => setQ2('ENERGY')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>Piezoelettricità e risposta rapida a impulsi/pressioni</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q2 === 'OPTICS' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="OPTICS" 
                    checked={q2 === 'OPTICS'}
                    onChange={() => setQ2('OPTICS')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>Fenomeni ottici complessi (Iridescenza, asterismo, gatteggiamento)</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q2 === 'MAGNETISM' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q2" 
                    value="MAGNETISM" 
                    checked={q2 === 'MAGNETISM'}
                    onChange={() => setQ2('MAGNETISM')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>Magnetismo e forza di attrazione viscerale instancabile</span>
                </label>
              </div>
            </div>

            {/* Q3 */}
            <div className="space-y-3">
              <label className="block text-xs md:text-sm font-bold text-amber-300 tracking-wide uppercase">
                3. Nel tuo approccio ai problemi quotidiani preferisci:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q3 === 'LOGIC' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="LOGIC" 
                    checked={q3 === 'LOGIC'}
                    onChange={() => setQ3('LOGIC')}
                    className="mt-0.5 accent-amber-500" 
                    required 
                  />
                  <span>L'equilibrio rigoroso, la logica geometrica ed il principio di simmetria</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q3 === 'INTROSPECTION' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="INTROSPECTION" 
                    checked={q3 === 'INTROSPECTION'}
                    onChange={() => setQ3('INTROSPECTION')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>L'introspezione profonda, il silenzio meditativo e l'analisi interiore</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q3 === 'GROWTH' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="GROWTH" 
                    checked={q3 === 'GROWTH'}
                    onChange={() => setQ3('GROWTH')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>La crescita rigogliosa, la vitalità generatrice e l'attività organica</span>
                </label>
                <label className={`p-3.5 bg-slate-900/80 border rounded-xl flex items-start gap-2.5 cursor-pointer transition-all ${q3 === 'CHANGE' ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800 hover:border-slate-700'}`}>
                  <input 
                    type="radio" 
                    name="q3" 
                    value="CHANGE" 
                    checked={q3 === 'CHANGE'}
                    onChange={() => setQ3('CHANGE')}
                    className="mt-0.5 accent-amber-500" 
                  />
                  <span>L'adattamento continuo, la resilienza e l'unione dei cicli imprevedibili</span>
                </label>
              </div>
            </div>

            <button 
              type="submit" 
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-sm shadow-lg shadow-emerald-500/15 hover:brightness-110 active:scale-[0.99] transition-all cursor-pointer"
            >
              Calcola la tua Affinità Mineralogica
            </button>
          </form>
        ) : (
          <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            className="space-y-5"
          >
            <div className="p-5 bg-emerald-950/20 border border-emerald-500/30 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                  <Compass className="w-3.5 h-3.5" /> Risultato Affinità
                </span>
                <span className="font-serif text-xs font-bold text-amber-300">
                  Arcano {result.roman}
                </span>
              </div>
              
              <div className="space-y-1.5">
                <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Il tuo minerale risonante è:</p>
                <h3 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-100 tracking-wide">
                  {result.mineralName} <span className="font-sans font-bold text-amber-400 text-lg md:text-xl">— {result.arcanaName}</span>
                </h3>
              </div>

              <p className="text-xs md:text-sm text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-900/60">
                {result.scientificBasis}
              </p>

              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="px-2.5 py-1 rounded bg-slate-900 text-cyan-300 font-mono text-[10px] border border-slate-800">
                  {result.formula}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 text-amber-400 font-medium text-[10px] border border-slate-800">
                  Mohs {result.hardness}
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 text-slate-400 font-medium text-[10px] border border-slate-800">
                  {result.system}
                </span>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
                <button 
                  onClick={handleReset}
                  className="px-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-semibold text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center gap-1.5 cursor-pointer bg-slate-900/40"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Ripeti il Test
                </button>
                
                <button 
                  onClick={() => onSelectItem(result)}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-amber-500/10"
                >
                  <span>Analisi Cristallografica Completa</span>
                  <CornerDownRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
