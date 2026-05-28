import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function FooterBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const brand = data?.brand || "FLOWFRAME";
  const alignment = data?.alignment || "center";
  const darkMode = data?.darkMode ?? true;
  const showYear = data?.showYear ?? true;

  const isMobile = deviceMode === "mobile";
  const currentYear = new Date().getFullYear();

  const bgClass = darkMode ? "bg-neutral-900 text-neutral-400" : "bg-neutral-100 text-neutral-500 border-t border-neutral-200";
  const layoutClass = alignment === "center" || isMobile ? "flex-col justify-center gap-2 text-center" : "flex-row justify-between items-center px-12";
  const paddingY = isMobile ? "py-8" : "py-12";

  return (
    <div className={`w-full flex text-sm font-mono transition-all duration-300 ${bgClass} ${layoutClass} ${paddingY}`}>
      <div className={`font-bold tracking-widest uppercase text-current transition-all ${isMobile ? "text-xs" : "text-sm"}`}>{brand}</div>
      {showYear && <div className={`opacity-70 transition-all ${isMobile ? "text-[10px]" : "text-xs"}`}>© {currentYear} ALL RIGHTS RESERVED.</div>}
    </div>
  );
}

export function FooterInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Brand Name</label>
        <input
          type="text"
          value={settings?.brand || ""}
          placeholder="es: FLOWFRAME"
          onChange={(e) => onSettingChange("brand", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-2 font-mono"
        />
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest mt-2">Layout</label>
        <select
          value={settings?.alignment || "center"}
          onChange={(e) => onSettingChange("alignment", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="center">Centrato</option>
          <option value="split">Split (Sinistra/Destra)</option>
        </select>
      </div>
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-neutral-900 uppercase">Dark Mode</label>
          <input
            type="checkbox"
            checked={settings?.darkMode ?? true}
            onChange={(e) => onSettingChange("darkMode", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-neutral-900 uppercase">Mostra Copyright</label>
          <input
            type="checkbox"
            checked={settings?.showYear ?? true}
            onChange={(e) => onSettingChange("showYear", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>
      </div>
    </div>
  );
}
