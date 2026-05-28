import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function FeaturesBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const title = data?.title || "FEATURES";
  const count = data?.count || 3;
  const columns = data?.columns || 3;

  const isMobile = deviceMode === "mobile";
  const isTablet = deviceMode === "tablet";

  let gridClass = columns === 2 ? "grid-cols-2" : columns === 4 ? "grid-cols-4" : "grid-cols-3";
  if (isMobile) gridClass = "grid-cols-1";
  else if (isTablet && columns > 2) gridClass = "grid-cols-2";

  const paddingY = isMobile ? "py-12 px-6" : "py-24 px-8";
  const titleSize = isMobile ? "text-2xl mb-8" : "text-3xl mb-12";

  return (
    <div className={`w-full bg-white flex flex-col items-center justify-center border-b border-neutral-200 ${paddingY}`}>
      <h2 className={`${titleSize} font-bold tracking-tight text-neutral-900 uppercase transition-all duration-300`}>{title}</h2>
      <div className={`grid ${gridClass} gap-4 w-full max-w-5xl transition-all duration-300`}>
        {Array.from({ length: count }).map((_, i) => (
          <div
            key={i}
            className="h-40 bg-neutral-100 rounded-sm border border-neutral-200 flex items-center justify-center text-neutral-400 font-mono text-sm hover:border-neutral-800 transition-colors"
          >
            [ CARD {i + 1} ]
          </div>
        ))}
      </div>
    </div>
  );
}

export function FeaturesInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Intestazione</label>
        <input
          type="text"
          value={settings?.title || ""}
          placeholder="Features"
          onChange={(e) => onSettingChange("title", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm font-mono"
        />
      </div>
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm grid grid-cols-2 gap-2">
        <div>
          <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Cards</label>
          <input
            type="number"
            min="1"
            max="12"
            value={settings?.count || 3}
            onChange={(e) => onSettingChange("count", parseInt(e.target.value) || 0)}
            className="w-full text-xs p-2 border border-neutral-300 rounded-sm"
          />
        </div>
        <div>
          <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Colonne</label>
          <select
            value={settings?.columns || 3}
            onChange={(e) => onSettingChange("columns", parseInt(e.target.value))}
            className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
          >
            <option value={2}>2 Col</option>
            <option value={3}>3 Col</option>
            <option value={4}>4 Col</option>
          </select>
        </div>
      </div>
    </div>
  );
}
