import { useState } from 'react';
import { TabId, ArcanoMineral } from './types';
import { ARCANA_DATA } from './data';
import Explorer from './components/Explorer';
import DailyDraw from './components/DailyDraw';
import AffinityTest from './components/AffinityTest';
import Compare from './components/Compare';
import { Chat } from './components/Chat';
import DetailModal from './components/DetailModal';
import { Gem, Grid, Sparkles, Compass, Columns, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>('explorer');
  const [selectedItem, setSelectedItem] = useState<ArcanoMineral | null>(null);

  const handleSelectItem = (item: ArcanoMineral) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="bg-[#090d16] text-slate-200 font-sans min-h-screen pb-24 md:pb-12 selection:bg-amber-500 selection:text-slate-950 relative overflow-x-hidden">
      
      {/* Background Ambient Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-950/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-amber-950/15 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 left-1/3 w-96 h-96 bg-emerald-950/25 rounded-full blur-3xl"></div>
      </div>

      {/* Header Section */}
      <header className="sticky top-0 z-40 bg-[#090d16]/75 backdrop-blur-md border-b border-slate-900/80 px-4 py-3.5 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-600 via-purple-600 to-emerald-500 p-[1px] shadow-lg shadow-purple-950/40 flex items-center justify-center">
              <div className="w-full h-full bg-[#090d16] rounded-[11px] flex items-center justify-center">
                <Gem className="w-5 h-5 text-amber-400 animate-pulse" />
              </div>
            </div>
            <div>
              <h1 className="font-serif font-extrabold text-base md:text-xl tracking-wider bg-gradient-to-r from-amber-200 via-amber-400 to-amber-100 bg-clip-text text-transparent">
                ARCANA MINERALIA
              </h1>
              <p className="text-[9px] md:text-xs text-slate-400 font-semibold tracking-wider uppercase">
                Corrispondenze Scientifiche &amp; Cristallografiche
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1.5 bg-slate-950/90 p-1 rounded-xl border border-slate-900">
            <button 
              onClick={() => setActiveTab('explorer')} 
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${activeTab === 'explorer' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Grid className="w-4 h-4" />
              <span>Esplora (22)</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('draw')} 
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${activeTab === 'draw' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Estrazione del Giorno</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('quiz')} 
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${activeTab === 'quiz' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Compass className="w-4 h-4" />
              <span>Test Affinità</span>
            </button>
            
            <button 
              onClick={() => setActiveTab('compare')} 
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${activeTab === 'compare' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <Columns className="w-4 h-4" />
              <span>Confronta</span>
            </button>

            <button 
              onClick={() => setActiveTab('chat')} 
              className={`px-4 py-2 rounded-lg text-xs font-semibold flex items-center space-x-2 transition-all cursor-pointer ${activeTab === 'chat' ? 'bg-amber-500/15 text-amber-300 border border-amber-500/20 shadow-sm' : 'text-slate-400 hover:text-slate-200'}`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Dialogo Daimon</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 pt-6 md:px-8 z-10 relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'explorer' && (
              <Explorer 
                arcanaData={ARCANA_DATA} 
                onSelectItem={handleSelectItem} 
              />
            )}
            {activeTab === 'draw' && (
              <DailyDraw 
                arcanaData={ARCANA_DATA} 
                onSelectItem={handleSelectItem} 
              />
            )}
            {activeTab === 'quiz' && (
              <AffinityTest 
                arcanaData={ARCANA_DATA} 
                onSelectItem={handleSelectItem} 
              />
            )}
            {activeTab === 'compare' && (
              <Compare 
                arcanaData={ARCANA_DATA} 
                onSelectItem={handleSelectItem} 
              />
            )}
            {activeTab === 'chat' && (
              <Chat />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Mobile Bottom Navigation Bar (Meticulously Mobile-First) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090d16]/95 backdrop-blur-lg border-t border-slate-900/80 px-2 py-2.5 flex items-center justify-around text-[10px] font-semibold shadow-2xl">
        <button 
          onClick={() => setActiveTab('explorer')} 
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeTab === 'explorer' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Grid className="w-5 h-5" />
          <span>Esplora</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('draw')} 
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeTab === 'draw' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Sparkles className="w-5 h-5" />
          <span>Estrazione</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('quiz')} 
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeTab === 'quiz' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Compass className="w-5 h-5" />
          <span>Affinità</span>
        </button>
        
        <button 
          onClick={() => setActiveTab('compare')} 
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeTab === 'compare' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <Columns className="w-5 h-5" />
          <span>Confronta</span>
        </button>

        <button 
          onClick={() => setActiveTab('chat')} 
          className={`flex flex-col items-center gap-1 transition-colors cursor-pointer ${activeTab === 'chat' ? 'text-amber-400' : 'text-slate-500 hover:text-slate-300'}`}
        >
          <MessageSquare className="w-5 h-5" />
          <span>Daimon</span>
        </button>
      </nav>

      {/* Detail Modal Layer */}
      <DetailModal 
        item={selectedItem} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}
