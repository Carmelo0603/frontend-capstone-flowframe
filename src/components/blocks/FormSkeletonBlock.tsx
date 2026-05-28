import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function FormSkeletonBlock({ data }: { data?: any }) {
  const deviceMode = useSelector((state: RootState) => state.project.deviceMode);

  const fieldCount = data?.fieldCount ?? 3;
  const hasTextarea = data?.hasTextarea ?? false;
  const hasCheckbox = data?.hasCheckbox ?? true;
  const buttonAlign = data?.buttonAlign || "left";

  const isMobile = deviceMode === "mobile";
  const paddingY = isMobile ? "py-8 px-6" : "py-12 px-12";
  const alignClass = buttonAlign === "center" ? "items-center" : buttonAlign === "right" ? "items-end" : "items-start";

  return (
    <div className={`w-full bg-white flex flex-col justify-center border-b border-neutral-100 transition-all duration-300 ${paddingY}`}>
      <div className={`w-full ${isMobile ? "max-w-full" : "max-w-xl"} mx-auto flex flex-col gap-4`}>
        {/* Intestazione del Form */}
        <div className="h-6 w-1/3 bg-neutral-800 mb-2"></div>
        <div className="h-2 w-2/3 bg-neutral-200 mb-6"></div>

        {/* Campi Input Standard */}
        {Array.from({ length: fieldCount }).map((_, i) => (
          <div key={i} className="flex flex-col gap-2">
            <div className="h-2 w-16 bg-neutral-300"></div>
            <div className="h-10 w-full border-2 border-neutral-200 bg-neutral-50 flex items-center px-3">
              <div className="h-2 w-24 bg-neutral-200"></div>
            </div>
          </div>
        ))}

        {/* Area di Testo */}
        {hasTextarea && (
          <div className="flex flex-col gap-2 mt-2">
            <div className="h-2 w-24 bg-neutral-300"></div>
            <div className="h-24 w-full border-2 border-neutral-200 bg-neutral-50 flex px-3 pt-3">
              <div className="h-2 w-32 bg-neutral-200"></div>
            </div>
          </div>
        )}

        {/* Checkbox Legale */}
        {hasCheckbox && (
          <div className="flex items-center gap-3 mt-4">
            <div className="h-4 w-4 border-2 border-neutral-300 shrink-0"></div>
            <div className="flex flex-col gap-1 w-full">
              <div className="h-1.5 w-full bg-neutral-200"></div>
              <div className="h-1.5 w-3/4 bg-neutral-200"></div>
            </div>
          </div>
        )}

        {/* Bottone Submit */}
        <div className={`mt-6 flex flex-col ${alignClass}`}>
          <div className={`h-12 bg-neutral-900 flex items-center justify-center ${isMobile || buttonAlign === "fill" ? "w-full" : "w-48"}`}>
            <div className="h-2 w-16 bg-neutral-500"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function FormSkeletonInspector({ settings, onSettingChange }: { settings: any; onSettingChange: (key: string, value: any) => void }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Campi del Form</label>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-neutral-900 uppercase">Input Standard</span>
          <input
            type="number"
            min="1"
            max="8"
            value={settings?.fieldCount ?? 3}
            onChange={(e) => onSettingChange("fieldCount", parseInt(e.target.value) || 0)}
            className="w-16 text-xs p-1 border border-neutral-300 rounded-sm text-center"
          />
        </div>

        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] font-bold text-neutral-900 uppercase">Textarea Estesa</span>
          <input
            type="checkbox"
            checked={settings?.hasTextarea ?? false}
            onChange={(e) => onSettingChange("hasTextarea", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] font-bold text-neutral-900 uppercase">Checkbox Privacy</span>
          <input
            type="checkbox"
            checked={settings?.hasCheckbox ?? true}
            onChange={(e) => onSettingChange("hasCheckbox", e.target.checked)}
            className="accent-neutral-900"
          />
        </div>
      </div>

      <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-sm">
        <label className="block text-[10px] font-bold text-neutral-500 mb-2 uppercase tracking-widest">Azione (Submit)</label>
        <select
          value={settings?.buttonAlign || "left"}
          onChange={(e) => onSettingChange("buttonAlign", e.target.value)}
          className="w-full text-xs p-2 border border-neutral-300 rounded-sm outline-none"
        >
          <option value="left">Allinea a Sinistra</option>
          <option value="center">Centrato</option>
          <option value="right">Allinea a Destra</option>
          <option value="fill">Larghezza Piena</option>
        </select>
      </div>
    </div>
  );
}
