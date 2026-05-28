export function ButtonAtomBlock({ data }: { data?: any }) {
  // Configurazione
  const label = data?.label || "CLICK ME";
  const style = data?.style || "solid"; // solid, outline, ghost
  const size = data?.size || "md"; // sm, md, lg
  const width = data?.width || "auto"; // auto, full

  // Classi base di struttura e flexbox
  let baseClass = "font-bold uppercase tracking-widest flex items-center justify-center transition-all shrink-0 cursor-pointer ";

  // Gestione Larghezza
  if (width === "full") baseClass += "w-full ";
  else baseClass += "w-fit "; // w-fit impedisce al flexbox genitore di stirarlo

  // Gestione Dimensioni (Padding e Testo)
  if (size === "sm") baseClass += "text-[10px] px-4 py-2 ";
  else if (size === "lg") baseClass += "text-sm px-8 py-4 ";
  else baseClass += "text-xs px-6 py-3 ";

  // Gestione Stile Visivo
  if (style === "outline") baseClass += "border-2 border-neutral-900 text-neutral-900 hover:bg-neutral-100 ";
  else if (style === "ghost") baseClass += "text-neutral-500 hover:text-neutral-900 underline ";
  else baseClass += "bg-neutral-900 text-white hover:bg-neutral-800 border-2 border-transparent ";

  return <div className={baseClass}>{label}</div>;
}

export function ButtonAtomInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Atomo: Bottone</label>

        <input
          type="text"
          value={settings?.label || ""}
          placeholder="Etichetta"
          onChange={(e) => onSettingChange("label", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-3 font-mono outline-none focus:ring-1 focus:ring-neutral-900"
        />

        <div className="grid grid-cols-2 gap-2 mb-2">
          <div>
            <label className="text-[9px] font-bold text-neutral-500 uppercase">Stile</label>
            <select
              value={settings?.style || "solid"}
              onChange={(e) => onSettingChange("style", e.target.value)}
              className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
            >
              <option value="solid">Riempito</option>
              <option value="outline">Bordato</option>
              <option value="ghost">Testo</option>
            </select>
          </div>
          <div>
            <label className="text-[9px] font-bold text-neutral-500 uppercase">Taglia</label>
            <select
              value={settings?.size || "md"}
              onChange={(e) => onSettingChange("size", e.target.value)}
              className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
            >
              <option value="sm">Piccolo</option>
              <option value="md">Medio</option>
              <option value="lg">Grande</option>
            </select>
          </div>
        </div>

        <div>
          <label className="text-[9px] font-bold text-neutral-500 uppercase">Larghezza</label>
          <select
            value={settings?.width || "auto"}
            onChange={(e) => onSettingChange("width", e.target.value)}
            className="w-full text-xs p-1.5 border border-neutral-300 rounded-sm outline-none"
          >
            <option value="auto">Adatta al Testo (Auto)</option>
            <option value="full">Larghezza Piena (100%)</option>
          </select>
        </div>
      </div>
    </div>
  );
}
