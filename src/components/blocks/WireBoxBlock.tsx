import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function WireBoxBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const height = data?.height || "medium";
  const showCross = data?.showCross ?? true;
  const isMobile = deviceMode === "mobile";

  let heightClass = "h-64";
  if (height === "small") heightClass = isMobile ? "h-32" : "h-48";
  if (height === "large") heightClass = isMobile ? "h-96" : "h-[500px]";

  return (
    <div
      className={`w-full bg-neutral-200 border-b border-neutral-300 relative overflow-hidden flex items-center justify-center transition-all duration-300 ${heightClass}`}
    >
      {showCross && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[200%] h-0.5 bg-neutral-300 rotate-45 transform origin-center"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[200%] h-0.5 bg-neutral-300 -rotate-45 transform origin-center"></div>
          </div>
        </>
      )}
      <div className="absolute bottom-4 right-4 bg-white/80 px-2 py-1 text-[10px] font-mono text-neutral-500 font-bold uppercase border border-neutral-300 backdrop-blur-sm z-10">
        Media Placeholder
      </div>
    </div>
  );
}

export function WireBoxInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Altezza Media</label>
        <select
          value={settings?.height || "medium"}
          onChange={(e) => onSettingChange("height", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none mb-3"
        >
          <option value="small">Piccola</option>
          <option value="medium">Media</option>
          <option value="large">Grande (Hero)</option>
        </select>
        <div className="flex items-center justify-between">
          <label className="text-[10px] font-bold text-neutral-900 uppercase">Croce Media (X)</label>
          <input
            type="checkbox"
            checked={settings?.showCross ?? true}
            onChange={(e) => onSettingChange("showCross", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>
      </div>
    </div>
  );
}
