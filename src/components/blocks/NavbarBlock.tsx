import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function NavbarBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const logoName = data?.logoName || "FLOWFRAME";
  const linksCount = data?.linksCount ?? 3;
  const buttonText = data?.buttonText || "INIZIA ORA";
  const logoPos = data?.logoPosition || "left";
  const linksPos = data?.linksPosition || "right";
  const buttonPos = data?.buttonPosition || "hidden";

  const isMobile = deviceMode === "mobile";

  const Logo = () => (
    <div className={`font-black tracking-tighter text-neutral-900 uppercase transition-all duration-300 ${isMobile ? "text-lg" : "text-xl"}`}>{logoName}</div>
  );
  const Links = () => (
    <div className="flex gap-6 items-center">
      {Array.from({ length: linksCount }).map((_, i) => (
        <div key={i} className="font-semibold text-neutral-500 hover:text-neutral-900 cursor-pointer text-xs uppercase tracking-widest">
          Link {i + 1}
        </div>
      ))}
    </div>
  );
  const MobileMenu = () => (
    <div className="font-mono text-[10px] font-bold text-neutral-900 tracking-widest border border-neutral-200 px-2 py-1 bg-neutral-50">[ MENU ]</div>
  );
  const Button = () => (
    <div className="bg-neutral-900 text-white px-4 py-2 text-[10px] font-bold uppercase tracking-widest cursor-pointer hover:bg-neutral-800">{buttonText}</div>
  );

  const getSlotItems = (slot: string) => {
    const items = [];
    if (logoPos === slot) items.push(<Logo key="logo" />);
    if (linksPos === slot) {
      if (isMobile) items.push(<MobileMenu key="menu" />);
      else items.push(<Links key="links" />);
    }
    if (buttonPos === slot && !isMobile) items.push(<Button key="btn" />);
    return items;
  };

  return (
    <div
      className={`w-full bg-white border-b border-neutral-200 grid grid-cols-3 items-center transition-all duration-300 ${isMobile ? "h-16 px-4" : "h-20 px-8"}`}
    >
      <div className="justify-self-start flex items-center gap-6">{getSlotItems("left")}</div>
      <div className="justify-self-center flex items-center gap-6">{getSlotItems("center")}</div>
      <div className="justify-self-end flex items-center gap-6">{getSlotItems("right")}</div>
    </div>
  );
}

export function NavbarInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Brand Logo</label>
        <input
          type="text"
          value={settings?.logoName || ""}
          placeholder="Nome Brand"
          onChange={(e) => onSettingChange("logoName", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-2 font-mono"
        />
        <select
          value={settings?.logoPosition || "left"}
          onChange={(e) => onSettingChange("logoPosition", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="left">Slot Sinistro</option>
          <option value="center">Slot Centrale</option>
          <option value="right">Slot Destro</option>
          <option value="hidden">Nascondi</option>
        </select>
      </div>
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Navigazione</label>
        <input
          type="number"
          min="0"
          max="6"
          value={settings?.linksCount ?? 3}
          onChange={(e) => onSettingChange("linksCount", parseInt(e.target.value) || 0)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-2"
        />
        <select
          value={settings?.linksPosition || "right"}
          onChange={(e) => onSettingChange("linksPosition", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="left">Slot Sinistro</option>
          <option value="center">Slot Centrale</option>
          <option value="right">Slot Destro</option>
          <option value="hidden">Nascondi</option>
        </select>
      </div>
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Call to Action</label>
        <input
          type="text"
          value={settings?.buttonText || ""}
          placeholder="Testo Bottone"
          onChange={(e) => onSettingChange("buttonText", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm mb-2 font-mono"
        />
        <select
          value={settings?.buttonPosition || "hidden"}
          onChange={(e) => onSettingChange("buttonPosition", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="left">Slot Sinistro</option>
          <option value="center">Slot Centrale</option>
          <option value="right">Slot Destro</option>
          <option value="hidden">Nascondi</option>
        </select>
      </div>
    </div>
  );
}
