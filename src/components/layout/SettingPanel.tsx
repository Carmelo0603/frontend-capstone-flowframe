import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../../store/store";
import { updateBlockSettings, deleteBlock, setBlockParent } from "../../store/projectSlice";
import { BlockComponents } from "../blocks/BlockRegistry";

export function SettingPanel() {
  const dispatch = useDispatch();
  const { blueprint, selectedBlockId } = useSelector((state: RootState) => state.project);

  const activeBlock = blueprint.find((b) => b.id === selectedBlockId);

  if (!activeBlock) {
    return (
      <aside className="w-80 bg-white border-l border-neutral-200 flex flex-col shadow-sm z-10 p-6 text-neutral-400 text-sm font-mono items-center justify-center shrink-0">
        [ SELEZIONA UN BLOCCO ]
      </aside>
    );
  }

  const handleSettingChange = (key: string, value: any) => {
    dispatch(
      updateBlockSettings({
        id: activeBlock.id,
        settings: { [key]: value },
      }),
    );
  };

  // Funzione che lancia il comando di demolizione
  const handleDeleteClick = () => {
    if (window.confirm("Sicuro di voler eliminare definitivamente questo blocco dal wireframe?")) {
      dispatch(deleteBlock(activeBlock.id));
    }
  };

  const registryEntry = BlockComponents[activeBlock.type];
  const InspectorComponent = registryEntry?.Inspector;

  return (
    <aside className="w-80 bg-white border-l border-neutral-200 flex flex-col shadow-sm z-10 shrink-0 h-full">
      {/* Header Inspector */}
      <div className="p-6 border-b border-neutral-200">
        <h2 className="text-lg font-bold tracking-tight">Inspector</h2>
        <p className="text-xs text-neutral-500 mt-1 uppercase tracking-wider font-semibold">{activeBlock.type} BLOCK</p>
      </div>
      {/* GLOBAL POSITIONING (LOGIC-FIRST NESTING) */}
      <div className="p-4 border-b border-neutral-200 bg-neutral-100/50">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Posizione nel Layout</label>
        <select
          value={activeBlock.parentId ? `${activeBlock.parentId}|${activeBlock.slot}` : "root"}
          onChange={(e) => {
            const val = e.target.value;
            if (val === "root") {
              dispatch(setBlockParent({ id: activeBlock.id, parentId: null, slot: undefined }));
            } else {
              const [pId, slot] = val.split("|");
              dispatch(setBlockParent({ id: activeBlock.id, parentId: pId, slot }));
            }
          }}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none focus:ring-1 focus:ring-neutral-900"
        >
          <option value="root">Canvas Principale (Root)</option>
          {blueprint
            .filter((b) => b.type === "COLUMNS" && b.id !== activeBlock.id)
            .map((col) => (
              <optgroup key={col.id} label={`Colonne (ID: ${col.id.slice(0, 4)})`}>
                <option value={`${col.id}|left`}>↳ In Colonna Sinistra</option>
                <option value={`${col.id}|right`}>↳ In Colonna Destra</option>
              </optgroup>
            ))}
          {blueprint
            .filter((b) => b.type === "STACK" && b.id !== activeBlock.id)
            .map((stack) => (
              <option key={stack.id} value={`${stack.id}|flat`}>
                ⚡ In Auto-Layout (ID: {stack.id.slice(0, 4)})
              </option>
            ))}
        </select>
      </div>

      {/* Area Controlli Dinamici dei blocchi */}
      <div className="p-6 flex flex-col gap-4 overflow-y-auto flex-1">
        {InspectorComponent ? (
          <InspectorComponent settings={activeBlock.settings} onSettingChange={handleSettingChange} />
        ) : (
          <div className="text-xs text-neutral-400 font-mono">[ NESSUN CONTROLLO ]</div>
        )}
      </div>

      {/* DANGER ZONE - Pulsante di eliminazione fisso in fondo */}
      <div className="p-4 border-t border-neutral-200 bg-neutral-50 shrink-0">
        <button
          onClick={handleDeleteClick}
          className="w-full bg-red-50 border border-red-200 text-red-600 hover:bg-red-600 hover:text-white transition-colors py-2.5 text-xs font-bold uppercase tracking-wider rounded-sm cursor-pointer"
        >
          Elimina Blocco
        </button>
      </div>
    </aside>
  );
}
