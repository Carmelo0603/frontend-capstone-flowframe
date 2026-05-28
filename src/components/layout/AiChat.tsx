import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { addBlock } from "../../store/projectSlice";
import { generateAiAction } from "../../services/ai";

export function AiChat() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = useDispatch();
  const blueprint = useSelector((state: RootState) => state.project.blueprint);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!prompt.trim()) return;

    setIsLoading(true);
    try {
      const actions = await generateAiAction(prompt, blueprint);

      actions.forEach((act: any) => {
        if (act.action === "ADD") {
          dispatch(
            addBlock({
              // Se l'AI fornisce un ID (per il nesting), usiamolo, altrimenti generiamolo
              id: act.id || crypto.randomUUID(),
              type: act.type,
              order: blueprint.length,
              settings: act.settings || {},
              // Passiamo i riferimenti relazionali per il Logic-First
              parentId: act.parentId || null,
              slot: act.slot || undefined,
            }),
          );
        }
      });

      setPrompt("");
    } catch (error) {
      console.error(error);
      alert("Errore di decodifica AI. Riprova con un prompt più chiaro.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col border-t border-neutral-200 bg-white mt-auto">
      <div className="bg-neutral-900 text-white p-3 font-bold tracking-tight text-xs uppercase flex justify-between items-center">
        <span>FLOWFRAME LOGIC</span>
        {isLoading && <span className="animate-pulse w-2 h-2 bg-white rounded-full"></span>}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Es: Aggiungi una navbar e una hero..."
          className="w-full h-24 text-sm p-2 border border-neutral-300 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 outline-none resize-none font-mono text-neutral-700"
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !prompt.trim()}
          className="w-full bg-neutral-100 border border-neutral-900 text-neutral-900 font-bold uppercase text-xs py-2 hover:bg-neutral-900 hover:text-white transition-colors disabled:opacity-50"
        >
          GENERA
        </button>
      </form>
    </div>
  );
}
