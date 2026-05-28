import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function ColumnsBlock({ data, childrenBlocks }: { data?: any; childrenBlocks?: React.ReactNode }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const layout = data?.layout || "50-50";
  const isMobile = deviceMode === "mobile";

  let gridClass = "grid-cols-2";
  if (layout === "30-70") gridClass = "grid-cols-[1fr_2fr]";
  if (layout === "70-30") gridClass = "grid-cols-[2fr_1fr]";

  if (isMobile) gridClass = "grid-cols-1";

  return (
    <div className={`w-full bg-white border-b border-neutral-200 py-8 px-8 transition-all duration-300`}>
      <div className={`max-w-6xl mx-auto grid ${gridClass} gap-8 w-full`}>
        {/* Colonna Sinistra */}
        <div className="flex flex-col min-h-[100px] border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-4 relative">
          <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-neutral-400 font-mono uppercase tracking-widest">Colonna SX</span>
          <div className="flex flex-col gap-4 w-full">
            {/* Renderizziamo i figli che il Workspace ci passa per lo slot sinistro */}
            {childrenBlocks && (childrenBlocks as any).left}
          </div>
        </div>

        {/* Colonna Destra */}
        <div className="flex flex-col min-h-[100px] border-2 border-dashed border-neutral-200 bg-neutral-50/50 p-4 relative">
          <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-neutral-400 font-mono uppercase tracking-widest">Colonna DX</span>
          <div className="flex flex-col gap-4 w-full">
            {/* Renderizziamo i figli che il Workspace ci passa per lo slot destro */}
            {childrenBlocks && (childrenBlocks as any).right}
          </div>
        </div>
      </div>
    </div>
  );
}

export function ColumnsInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Layout Colonne</label>
        <select
          value={settings?.layout || "50-50"}
          onChange={(e) => onSettingChange("layout", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="50-50">Equilibrate (50% - 50%)</option>
          <option value="30-70">Sidebar Sinistra (30% - 70%)</option>
          <option value="70-30">Sidebar Destra (70% - 30%)</option>
        </select>
      </div>
    </div>
  );
}
