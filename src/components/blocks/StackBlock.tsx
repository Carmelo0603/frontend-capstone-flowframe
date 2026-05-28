import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

// Riceve i children come array piatto dal Workspace
export function StackBlock({ data, childrenBlocks }: { data?: any; childrenBlocks?: React.ReactNode[] }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const direction = data?.direction || "col";
  const align = data?.align || "center";
  const justify = data?.justify || "start";
  const gap = data?.gap || "4";
  const padding = data?.padding || "4";

  const isMobile = deviceMode === "mobile";

  const flexDir = direction === "row" && isMobile ? "flex-col" : direction === "row" ? "flex-row" : "flex-col";

  const alignClass = `items-${align}`;
  const justifyClass = justify === "between" ? "justify-between" : `justify-${justify}`;
  const gapClass = `gap-${gap}`;
  const padClass = `p-${padding}`;

  return (
    <div className={`w-full bg-transparent border-2 border-dashed border-blue-300 relative transition-all duration-300 min-h-[100px] ${padClass}`}>
      <span className="absolute -top-3 left-2 bg-blue-50 px-2 text-[8px] font-black text-blue-600 uppercase tracking-widest rounded-sm border border-blue-200">
        ⚡ AUTO-LAYOUT
      </span>

      <div className={`flex w-full h-full ${flexDir} ${alignClass} ${justifyClass} ${gapClass}`}>
        {childrenBlocks ? (
          childrenBlocks
        ) : (
          <div className="w-full py-4 flex items-center justify-center text-[10px] font-mono text-blue-400 uppercase tracking-widest opacity-50">
            [ Vuoto - Inserisci Atomi ]
          </div>
        )}
      </div>
    </div>
  );
}

export function StackInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-blue-600 mb-2 uppercase tracking-widest">Regole Flexbox (Auto-Layout)</label>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-[9px] font-bold text-neutral-500 uppercase">Direzione</label>
            <select
              value={settings?.direction || "col"}
              onChange={(e) => onSettingChange("direction", e.target.value)}
              className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
            >
              <option value="col">⬇ Verticale (Col)</option>
              <option value="row">➡ Orizzontale (Row)</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-bold text-neutral-500 uppercase">Spaziatura</label>
            <select
              value={settings?.gap || "4"}
              onChange={(e) => onSettingChange("gap", e.target.value)}
              className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
            >
              <option value="2">Stretta (8px)</option>
              <option value="4">Media (16px)</option>
              <option value="8">Larga (32px)</option>
              <option value="12">XL (48px)</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-[9px] font-bold text-neutral-500 uppercase">Allineamento (Asse X)</label>
            <select
              value={settings?.align || "center"}
              onChange={(e) => onSettingChange("align", e.target.value)}
              className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
            >
              <option value="start">Sinistra</option>
              <option value="center">Centro</option>
              <option value="end">Destra</option>
              <option value="stretch">Riempi</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-bold text-neutral-500 uppercase">Giustifica (Asse Y)</label>
            <select
              value={settings?.justify || "start"}
              onChange={(e) => onSettingChange("justify", e.target.value)}
              className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
            >
              <option value="start">Inizio</option>
              <option value="center">Centro</option>
              <option value="between">Spaziato</option>
              <option value="end">Fine</option>
            </select>
          </div>
        </div>

        <label className="text-[9px] font-bold text-neutral-500 uppercase mt-2">Padding Interno</label>
        <select
          value={settings?.padding || "4"}
          onChange={(e) => onSettingChange("padding", e.target.value)}
          className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="0">Nessuno</option>
          <option value="4">Standard (16px)</option>
          <option value="8">Ampio (32px)</option>
        </select>
      </div>
    </div>
  );
}
