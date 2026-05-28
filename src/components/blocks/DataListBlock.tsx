import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function DataListBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const rowCount = data?.rowCount ?? 4;
  const hasAvatar = data?.hasAvatar ?? true;
  const linesPerRow = data?.linesPerRow ?? 2;

  const isMobile = deviceMode === "mobile";
  const paddingY = isMobile ? "py-6 px-4" : "py-12 px-8";

  return (
    <div className={`w-full bg-white flex flex-col justify-center border-b border-neutral-100 transition-all duration-300 ${paddingY}`}>
      <div className={`w-full ${isMobile ? "max-w-full" : "max-w-3xl"} mx-auto flex flex-col`}>
        {/* Intestazione Lista */}
        <div className="flex justify-between items-end mb-6 border-b-2 border-neutral-900 pb-2">
          <div className="h-4 w-32 bg-neutral-800"></div>
          <div className="h-2 w-16 bg-neutral-300"></div>
        </div>

        {/* Righe Generate */}
        <div className="flex flex-col gap-4">
          {Array.from({ length: rowCount }).map((_, i) => (
            <div key={i} className="flex items-center gap-4 p-3 border border-neutral-200 bg-neutral-50 hover:bg-neutral-100 transition-colors">
              {/* Media/Avatar Placeholder */}
              {hasAvatar && (
                <div className="h-12 w-12 bg-neutral-200 border border-neutral-300 shrink-0 relative flex items-center justify-center overflow-hidden rounded-sm">
                  <div className="absolute w-[200%] h-px bg-neutral-300 rotate-45"></div>
                  <div className="absolute w-[200%] h-px bg-neutral-300 -rotate-45"></div>
                </div>
              )}

              {/* Dati Strutturati */}
              <div className="flex flex-col gap-2 w-full">
                <div className="h-2.5 w-1/3 bg-neutral-800"></div>
                {linesPerRow > 1 && <div className="h-1.5 w-1/2 bg-neutral-400"></div>}
                {linesPerRow > 2 && <div className="h-1.5 w-3/4 bg-neutral-300"></div>}
              </div>

              {/* Azione di riga finta */}
              <div className="h-6 w-6 bg-neutral-200 rounded-sm shrink-0 ml-auto"></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function DataListInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Struttura Lista</label>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-neutral-900 uppercase">Numero di Righe</span>
          <input
            type="number"
            min="1"
            max="20"
            value={settings?.rowCount ?? 4}
            onChange={(e) => onSettingChange("rowCount", parseInt(e.target.value) || 0)}
            className="w-16 text-xs p-1 border border-neutral-300 rounded-sm text-center"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-neutral-900 uppercase">Mostra Media (Avatar)</span>
          <input
            type="checkbox"
            checked={settings?.hasAvatar ?? true}
            onChange={(e) => onSettingChange("hasAvatar", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>

        <label className="block text-[10px] font-bold text-neutral-500 mb-1 uppercase tracking-widest mt-2">Dati per Riga</label>
        <select
          value={settings?.linesPerRow || 2}
          onChange={(e) => onSettingChange("linesPerRow", parseInt(e.target.value))}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value={1}>1 Linea (Solo Titolo)</option>
          <option value={2}>2 Linee (Titolo + Sub)</option>
          <option value={3}>3 Linee (Dettaglio Esteso)</option>
        </select>
      </div>
    </div>
  );
}
