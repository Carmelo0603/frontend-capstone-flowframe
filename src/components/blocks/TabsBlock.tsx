import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function TabsBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const tabCount = data?.tabCount ?? 3;
  const activeTab = data?.activeTab ?? 1;
  const alignment = data?.alignment || "left";

  const isMobile = deviceMode === "mobile";
  const paddingY = isMobile ? "py-8 px-4" : "py-12 px-12";

  let justifyClass = "justify-start";
  if (alignment === "center") justifyClass = "justify-center";
  if (alignment === "fill" || isMobile) justifyClass = "justify-between";

  return (
    <div className={`w-full bg-white flex flex-col justify-center border-b border-neutral-100 transition-all duration-300 ${paddingY}`}>
      <div className={`w-full ${isMobile ? "max-w-full" : "max-w-4xl"} mx-auto flex flex-col`}>
        {/* Navigazione a Schede */}
        <div className={`flex border-b-2 border-neutral-200 mb-6 gap-2 ${justifyClass}`}>
          {Array.from({ length: tabCount }).map((_, i) => {
            const isActive = i + 1 === activeTab;
            return (
              <div
                key={i}
                className={`px-4 py-3 border-b-2 -mb-[2px] transition-colors ${isActive ? "border-neutral-900 bg-neutral-50" : "border-transparent opacity-50"} ${alignment === "fill" || isMobile ? "flex-1 flex justify-center" : ""}`}
              >
                <div className={`h-2 ${isMobile ? "w-12" : "w-20"} ${isActive ? "bg-neutral-900" : "bg-neutral-400"}`}></div>
              </div>
            );
          })}
        </div>

        {/* Contenuto Fittizio della Tab Attiva */}
        <div className="w-full bg-neutral-50 border border-neutral-200 p-8 min-h-[200px] flex flex-col gap-4">
          <div className="h-4 w-1/4 bg-neutral-800 mb-4"></div>
          <div className="h-2 w-full bg-neutral-200"></div>
          <div className="h-2 w-5/6 bg-neutral-200"></div>
          <div className="h-2 w-4/6 bg-neutral-200"></div>
        </div>
      </div>
    </div>
  );
}

export function TabsInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  const maxTabs = settings?.tabCount ?? 3;

  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Configurazione Tabs</label>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-neutral-900 uppercase">Numero di Tabs</span>
          <input
            type="number"
            min="2"
            max="6"
            value={settings?.tabCount ?? 3}
            onChange={(e) => {
              const newCount = parseInt(e.target.value) || 2;
              onSettingChange("tabCount", newCount);
              if ((settings?.activeTab ?? 1) > newCount) onSettingChange("activeTab", 1);
            }}
            className="w-16 text-xs p-1 border border-neutral-300 rounded-sm text-center"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-neutral-900 uppercase">Tab Attiva</span>
          <input
            type="number"
            min="1"
            max={maxTabs}
            value={settings?.activeTab ?? 1}
            onChange={(e) => onSettingChange("activeTab", parseInt(e.target.value) || 1)}
            className="w-16 text-xs p-1 border border-neutral-300 rounded-sm text-center"
          />
        </div>

        <label className="block text-[10px] font-bold text-neutral-500 mb-1 uppercase tracking-widest mt-2">Allineamento</label>
        <select
          value={settings?.alignment || "left"}
          onChange={(e) => onSettingChange("alignment", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="left">Sinistra</option>
          <option value="center">Centro</option>
          <option value="fill">Distribuzione Uniforme</option>
        </select>
      </div>
    </div>
  );
}
