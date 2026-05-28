import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function TextSkeletonBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const lines = data?.lines || 3;
  const alignment = data?.alignment || "left";
  const hasHeading = data?.hasHeading ?? true;

  const isMobile = deviceMode === "mobile";

  const alignClass = alignment === "center" ? "items-center" : alignment === "right" ? "items-end" : "items-start";
  const paddingY = isMobile ? "py-12 px-6" : "py-16 px-12";

  return (
    <div className={`w-full bg-white flex flex-col justify-center border-b border-neutral-100 transition-all duration-300 ${paddingY} ${alignClass}`}>
      {hasHeading && <div className={`h-8 bg-neutral-800 mb-6 transition-all duration-300 ${isMobile ? "w-3/4" : "w-1/2"}`}></div>}
      <div className={`flex flex-col gap-3 w-full transition-all duration-300 ${isMobile ? "max-w-full" : "max-w-3xl"} ${alignClass}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className={`h-3 bg-neutral-200 ${
              i === lines - 1 && alignment === "left" ? "w-2/3" : i === lines - 1 && alignment === "center" ? "w-1/2" : "w-full"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
}

export function TextSkeletonInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Struttura Testo</label>
        <div className="flex items-center justify-between mb-3">
          <label className="text-[10px] font-bold text-neutral-900 uppercase">Intestazione H1</label>
          <input
            type="checkbox"
            checked={settings?.hasHeading ?? true}
            onChange={(e) => onSettingChange("hasHeading", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest mt-2">Linee Paragrafo</label>
        <input
          type="number"
          min="0"
          max="10"
          value={settings?.lines ?? 3}
          onChange={(e) => onSettingChange("lines", parseInt(e.target.value) || 0)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-2"
        />
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest mt-2">Allineamento</label>
        <select
          value={settings?.alignment || "left"}
          onChange={(e) => onSettingChange("alignment", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="left">Sinistra</option>
          <option value="center">Centro</option>
          <option value="right">Destra</option>
        </select>
      </div>
    </div>
  );
}
