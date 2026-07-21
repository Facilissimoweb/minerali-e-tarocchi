import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Sparkles, User, HelpCircle, AlertCircle, RefreshCw } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface ChatMessage {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      parts: [
        {
          text: "Salute, ricercatore. Sono il tuo interlocutore in **Mineralosofia** e **Psicologia Immaginale**. Qui possiamo dialogare sulla natura animica dei 22 Arcani Maggiori e dei loro corrispondenti mineralogici terrestri.\n\nChiedimi pure come il **Fattore Materiale, Spirituale e Immaginale** interagiscono nelle pietre, o seleziona una delle domande suggerite qui sotto per iniziare l'esplorazione!"
        }
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    "Cos'è la Mineralosofia?",
    "Come influisce il Fattore Immaginale?",
    "Spiegami l'analogia tra la Pirite e il Bagatto.",
    "Quale cristallo mi aiuta per l'equilibrio interiore?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;

    setError(null);
    const userMessage: ChatMessage = {
      role: 'user',
      parts: [{ text: textToSend }]
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: textToSend,
          // Exclude the initial greeting from the history to keep context clean
          history: messages.slice(1)
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Impossibile connettersi al Daimon dei minerali.");
      }

      const data = await response.json();
      
      const modelMessage: ChatMessage = {
        role: 'model',
        parts: [{ text: data.text }]
      };

      setMessages(prev => [...prev, modelMessage]);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Errore di connessione. Riprova più tardi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(input);
  };

  const handleClearHistory = () => {
    if (window.confirm("Sei sicuro di voler riavviare il dialogo?")) {
      setMessages([
        {
          role: 'model',
          parts: [
            {
              text: "Salute, ricercatore. Il cerchio si riapre. Quale nuovo aspetto della Mineralosofia desideri approfondire?"
            }
          ]
        }
      ]);
      setError(null);
    }
  };

  return (
    <div id="chat-tab-container" className="flex flex-col h-[calc(100vh-140px)] max-w-4xl mx-auto w-full gap-4 px-2 sm:px-4">
      {/* Header Info */}
      <div id="chat-header" className="glass-panel p-4 rounded-2xl border border-white/5 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 border border-blue-500/20">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h2 className="text-lg font-serif font-semibold text-slate-100 tracking-wide">Dialogo con il Daimon</h2>
            <p className="text-xs text-slate-400">Consultazione filosofica sui tre fattori d'incidenza</p>
          </div>
        </div>
        <button
          onClick={handleClearHistory}
          title="Ricomincia Conversazione"
          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 transition-all border border-white/5 active:scale-95"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Messages area */}
      <div id="chat-messages-scroll" className="flex-1 glass-panel rounded-2xl p-4 overflow-y-auto border border-white/5 flex flex-col gap-4 shadow-inner min-h-[300px]">
        {messages.map((msg, index) => {
          const isModel = msg.role === 'model';
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className={`flex gap-3 max-w-[85%] ${isModel ? 'self-start' : 'self-end flex-row-reverse'}`}
            >
              <div className={`p-2.5 rounded-xl h-fit border shrink-0 ${
                isModel 
                  ? 'bg-blue-950/30 border-blue-500/20 text-blue-400' 
                  : 'bg-emerald-950/30 border-emerald-500/20 text-emerald-400'
              }`}>
                {isModel ? <Sparkles className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>

              <div className={`rounded-2xl p-4 text-sm leading-relaxed border shadow-md ${
                isModel 
                  ? 'bg-white/[0.03] border-white/5 text-slate-200 rounded-tl-none' 
                  : 'bg-emerald-500/5 border-emerald-500/10 text-emerald-100 rounded-tr-none'
              }`}>
                <div className="markdown-body prose prose-invert max-w-none text-slate-200">
                  <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                </div>
              </div>
            </motion.div>
          );
        })}

        {isLoading && (
          <div className="flex gap-3 max-w-[85%] self-start">
            <div className="p-2.5 rounded-xl bg-blue-950/30 border border-blue-500/20 text-blue-400 shrink-0">
              <Sparkles className="w-4 h-4 animate-spin" />
            </div>
            <div className="rounded-2xl p-4 bg-white/[0.02] border border-white/5 text-slate-400 rounded-tl-none text-sm flex items-center gap-2">
              <span className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></span>
              </span>
              <span className="font-serif italic text-xs">Il Daimon sta consultando le trame sottili...</span>
            </div>
          </div>
        )}

        {error && (
          <div className="p-3 bg-red-950/20 border border-red-500/20 text-red-300 rounded-xl text-xs flex items-center gap-2 self-center max-w-md my-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested suggestions / Inputs */}
      <div id="chat-input-controls" className="flex flex-col gap-3">
        {messages.length === 1 && !isLoading && (
          <div className="flex flex-wrap gap-2 justify-center">
            {suggestedQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(q)}
                className="text-xs bg-white/[0.02] hover:bg-white/[0.06] text-slate-300 hover:text-white px-3 py-2 rounded-xl border border-white/5 transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer shadow-sm"
              >
                <HelpCircle className="w-3.5 h-3.5 text-blue-400" />
                {q}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleFormSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            placeholder="Chiedi al Daimon sulla psicologia immaginale dei minerali..."
            className="flex-1 bg-white/[0.02] border border-white/10 rounded-xl px-4 py-3 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/50 text-sm transition-all shadow-inner disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl transition-all font-medium flex items-center justify-center border border-emerald-500/20 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-emerald-950/20 active:scale-95"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
