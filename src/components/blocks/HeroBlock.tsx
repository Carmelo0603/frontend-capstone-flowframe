import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function HeroBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const headline = data?.headline || "TITOLO EROE";
  const hasSubtitle = data?.hasSubtitle ?? true;
  const subtitle = data?.subtitle || "Sottotitolo strutturale per spiegare la value proposition.";
  const hasCta = data?.hasCta ?? true;
  const ctaText = data?.ctaText || "INIZIA ORA";
  const layout = data?.layout || "center";
  const spacing = data?.spacing || "normal";

  const isMobile = deviceMode === "mobile";

  let paddingY = "py-24";
  if (spacing === "tight") paddingY = isMobile ? "py-12 px-6" : "py-16 px-12";
  if (spacing === "normal") paddingY = isMobile ? "py-16 px-6" : "py-24 px-12";
  if (spacing === "relaxed") paddingY = isMobile ? "py-24 px-6" : "py-32 px-12";

  const isSplit = layout.includes("split") && !isMobile;
  const isReverse = layout === "split-right";

  return (
    <div className={`w-full bg-neutral-50 border-b border-neutral-200 transition-all duration-300 ${paddingY}`}>
      <div
        className={`max-w-6xl mx-auto flex ${isSplit ? (isReverse ? "flex-row-reverse items-center text-left" : "flex-row items-center text-left") : "flex-col items-center text-center"} gap-12`}
      >
        <div className={`flex flex-col ${isSplit ? "w-1/2 items-start" : "w-full items-center"} transition-all duration-300`}>
          <h1 className={`${isMobile ? "text-4xl" : "text-5xl"} font-black tracking-tighter text-neutral-900 mb-4 uppercase`}>{headline}</h1>
          {hasSubtitle && <p className={`${isMobile ? "text-sm mb-6" : "text-lg mb-8"} text-neutral-600 max-w-2xl font-medium`}>{subtitle}</p>}
          {hasCta && (
            <div
              className={`bg-neutral-900 text-white font-bold tracking-widest uppercase rounded-sm hover:bg-neutral-800 transition-colors cursor-pointer border-2 border-transparent hover:border-neutral-400 ${isMobile ? "text-[10px] px-6 py-3 w-full text-center" : "text-xs px-8 py-4"}`}
            >
              {ctaText}
            </div>
          )}
        </div>
        {isSplit && (
          <div className="w-1/2">
            <div className="w-full h-80 bg-neutral-200 border-2 border-neutral-300 relative flex items-center justify-center overflow-hidden transition-all duration-300">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[200%] h-0.5 bg-neutral-300 rotate-45 transform origin-center"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[200%] h-0.5 bg-neutral-300 -rotate-45 transform origin-center"></div>
              </div>
              <div className="absolute bg-white/80 px-2 py-1 text-[10px] font-mono text-neutral-500 font-bold uppercase border border-neutral-300 backdrop-blur-sm z-10">
                Media Slot
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export function HeroInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Layout & Spazi</label>
        <select
          value={settings?.layout || "center"}
          onChange={(e) => onSettingChange("layout", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-2 outline-none"
        >
          <option value="center">Centrato (Solo Testo)</option>
          <option value="split-left">Split (Testo Sx / Media Dx)</option>
          <option value="split-right">Split (Media Sx / Testo Dx)</option>
        </select>
        <select
          value={settings?.spacing || "normal"}
          onChange={(e) => onSettingChange("spacing", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="tight">Padding Ridotto</option>
          <option value="normal">Padding Standard</option>
          <option value="relaxed">Padding Abbondante</option>
        </select>
      </div>
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Contenuti</label>
        <input
          type="text"
          value={settings?.headline || ""}
          placeholder="Titolo Eroe"
          onChange={(e) => onSettingChange("headline", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-3 outline-none font-mono"
        />

        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-neutral-600 uppercase">Sottotitolo</span>
          <input
            type="checkbox"
            checked={settings?.hasSubtitle ?? true}
            onChange={(e) => onSettingChange("hasSubtitle", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>

        {(settings?.hasSubtitle ?? true) && (
          <textarea
            value={settings?.subtitle || ""}
            placeholder="Inserisci la didascalia..."
            onChange={(e) => onSettingChange("subtitle", e.target.value)}
            rows={2}
            className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-3 outline-none font-sans resize-none"
          />
        )}

        <div className="flex items-center justify-between mb-2">
          <span className="text-[10px] font-bold text-neutral-600 uppercase">Call to Action</span>
          <input
            type="checkbox"
            checked={settings?.hasCta ?? true}
            onChange={(e) => onSettingChange("hasCta", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>

        {(settings?.hasCta ?? true) && (
          <input
            type="text"
            value={settings?.ctaText || ""}
            placeholder="Testo Bottone"
            onChange={(e) => onSettingChange("ctaText", e.target.value)}
            className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-2 outline-none font-mono"
          />
        )}
      </div>
    </div>
  );
}
