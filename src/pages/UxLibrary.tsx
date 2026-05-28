import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { flowframeApi } from "../services/api";
import { generateUxSummary } from "../services/ai";

interface Resource {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  url: string;
  category: string;
}

export const UxLibrary: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [loadingSummaryId, setLoadingSummaryId] = useState<number | null>(null);
  const [aiSummaries, setAiSummaries] = useState<Record<number, string>>({});

  const categories = ["All", "Structure", "Atomic Design", "AI Strategy"];

  const currentProjectContext =
    "Sto creando una piattaforma SaaS per la gestione di flussi finanziari con una forte componente di grafici interattivi e filtri avanzati.";

  useEffect(() => {
    const fetchResources = async () => {
      setIsLoading(true);
      try {
        const data = await flowframeApi.getUxResources(selectedCategory);
        setResources(data);
      } catch (error) {
        console.error("Errore di rete:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, [selectedCategory]);

  const fetchAiSummary = async (resource: Resource) => {
    setLoadingSummaryId(resource.id);
    try {
      const prompt = `Sei un Senior UX Design Assistant. Spiega in massimo 3 righe perché l'articolo '${resource.title}' (che parla di: ${resource.description}) è utile per il progetto dell'utente che consiste in: '${currentProjectContext}'. Sii estremamente tecnico, diretto e orientato alla struttura logica. Rispondi solo con il testo del sommario.`;

      const aiResponse = await generateUxSummary(prompt);

      setAiSummaries((prev) => ({
        ...prev,
        [resource.id]: aiResponse,
      }));
    } catch (error) {
      console.error("Errore Gemini:", error);
      setAiSummaries((prev) => ({
        ...prev,
        [resource.id]: "Connessione neurale interrotta. Controlla la tua API Key di Gemini o riprova più tardi.",
      }));
    } finally {
      setLoadingSummaryId(null);
    }
  };

  return (
    <div className="flex-1 bg-white py-16 px-8 max-w-7xl mx-auto w-full">
      {/* HEADER */}
      <div className="border-b border-neutral-200 pb-8 mb-12">
        <h1 className="text-4xl font-black tracking-tighter uppercase text-neutral-900 mb-2">UX Pattern Library</h1>
        <p className="text-neutral-500 text-sm max-w-xl">
          Risorse selezionate per l'architettura dell'informazione. Attiva l'intelligenza artificiale per scoprire come applicare ogni concetto al tuo progetto
          attivo.
        </p>
      </div>

      {/* FILTRI */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors border ${
              selectedCategory === cat
                ? "bg-neutral-900 text-white border-neutral-900"
                : "bg-white text-neutral-500 border-neutral-200 hover:text-neutral-900 hover:border-neutral-900"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* STATO DI CARICAMENTO */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-20 text-neutral-400">
          <RefreshCw className="w-8 h-8 animate-spin mb-4 text-neutral-300" />
          <p className="font-mono text-sm tracking-widest uppercase">Estrazione blocchi logici...</p>
        </div>
      ) : (
        /* GRID DELLE CARD */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {resources.map((resource) => (
              <motion.div
                key={resource.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="border border-neutral-200 flex flex-col bg-white overflow-hidden group hover:border-neutral-900 transition-colors"
              >
                <div className="aspect-video w-full bg-neutral-100 border-b border-neutral-200 overflow-hidden relative">
                  <img
                    src={resource.imageUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                  />
                  <span className="absolute top-3 left-3 bg-white border border-neutral-900 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-neutral-900">
                    {resource.category}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="font-bold text-lg leading-tight text-neutral-900 mb-2 uppercase tracking-tight">{resource.title}</h3>
                  <p className="text-neutral-500 text-xs leading-relaxed mb-6 flex-1">{resource.description}</p>

                  <div className="bg-neutral-50 border border-neutral-200 p-4 mb-6 relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-400 flex items-center gap-1.5">
                        <Sparkles className="w-3 h-3 text-neutral-900" /> AI Project Insight
                      </span>
                      {!aiSummaries[resource.id] && (
                        <button
                          onClick={() => fetchAiSummary(resource)}
                          disabled={loadingSummaryId !== null}
                          className="text-[10px] font-bold uppercase tracking-wider text-neutral-900 underline hover:text-neutral-600 disabled:opacity-50"
                        >
                          {loadingSummaryId === resource.id ? (
                            <span className="flex items-center gap-1">
                              <Loader2 className="w-3 h-3 animate-spin" /> Analisi...
                            </span>
                          ) : (
                            "Analizza utilità"
                          )}
                        </button>
                      )}
                    </div>

                    {aiSummaries[resource.id] ? (
                      <p className="text-neutral-700 text-xs leading-relaxed font-medium italic">"{aiSummaries[resource.id]}"</p>
                    ) : (
                      <p className="text-neutral-400 text-[11px] italic">Scansiona la risorsa per vedere come applicarla al tuo lavoro corrente.</p>
                    )}
                  </div>

                  <a
                    href={resource.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-auto pt-4 border-t border-neutral-100 flex items-center justify-between text-xs font-bold uppercase tracking-widest text-neutral-900 hover:text-neutral-600 transition-colors"
                  >
                    <span>Leggi Risorsa</span>
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};
