import React from "react";
import { motion } from "framer-motion";
import { Layers, Zap, Bot } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const Home: React.FC = () => {
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  return (
    <div className="flex-1 bg-white flex flex-col items-center justify-center py-24 px-6">
      <motion.div className="max-w-5xl w-full" variants={containerVariants} initial="hidden" animate="visible">
        {/* HERO SECTION */}
        <motion.div variants={itemVariants} className="text-center mb-32">
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-neutral-900 mb-6 uppercase">
            Logic First. <br className="hidden md:block" />
            <span className="text-neutral-400">Structure Second.</span> <br className="hidden md:block" />
            Decoration Last.
          </h1>
          <p className="text-lg text-neutral-500 max-w-2xl mx-auto mb-10 font-medium">
            Un ambiente di sviluppo strutturale per l'architettura dell'informazione. Costruisci wireframe logici, genera strutture da sketch, raffina con
            intelligenza artificiale.
          </p>
          <button
            onClick={() => navigate("/workspace")}
            className="bg-neutral-900 text-white px-8 py-4 text-sm font-bold uppercase tracking-widest hover:bg-neutral-800 transition-colors focus:outline-none"
          >
            Start new project / Inizia ora
          </button>
        </motion.div>

        {/* FEATURES GRID */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-12 border-t border-neutral-200 pt-16">
          <div className="flex flex-col items-start">
            <div className="bg-neutral-100 p-4 mb-6">
              <Layers className="w-6 h-6 text-neutral-900" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-3">Logic Stack</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Costruisci la struttura della pagina componendo sezioni logiche. Riordina, aggiungi, modifica con drag & drop.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-neutral-100 p-4 mb-6">
              <Zap className="w-6 h-6 text-neutral-900" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-3">Live Structure</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Visualizza in tempo reale il wireframe generato. L'IA interpreta la tua logica e crea la struttura visuale.
            </p>
          </div>

          <div className="flex flex-col items-start">
            <div className="bg-neutral-100 p-4 mb-6">
              <Bot className="w-6 h-6 text-neutral-900" />
            </div>
            <h3 className="text-lg font-bold uppercase tracking-wide text-neutral-900 mb-3">Human Refinement</h3>
            <p className="text-neutral-500 text-sm leading-relaxed">
              Raffina con comandi naturali. Chiedi modifiche specifiche e l'IA aggiorna la struttura istantaneamente.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};
