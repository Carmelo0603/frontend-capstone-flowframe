import { toPng } from "html-to-image";
import jsPDF from "jspdf";
import { useState } from "react";
import { useSelector } from "react-redux";
import { type RootState } from "../../store/store";

export function ExportPanel() {
  const [isExporting, setIsExporting] = useState(false);

  const blueprint = useSelector((state: RootState) => state.project.blueprint);

  const getCanvasElement = () => document.getElementById("flowframe-canvas-area");

  const handleExportPNG = async () => {
    const el = getCanvasElement();
    if (!el) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(el, { backgroundColor: "#ffffff", pixelRatio: 2 });
      const link = document.createElement("a");
      link.download = "flowframe-wireframe.png";
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Errore esportazione PNG:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportPDF = async () => {
    const el = getCanvasElement();
    if (!el) return;
    try {
      setIsExporting(true);
      const dataUrl = await toPng(el, { backgroundColor: "#ffffff", pixelRatio: 2 });
      const pdf = new jsPDF({
        orientation: el.offsetWidth > el.offsetHeight ? "landscape" : "portrait",
        unit: "px",
        format: [el.offsetWidth, el.offsetHeight],
      });
      pdf.addImage(dataUrl, "PNG", 0, 0, el.offsetWidth, el.offsetHeight);
      pdf.save("flowframe-wireframe.pdf");
    } catch (err) {
      console.error("Errore esportazione PDF:", err);
    } finally {
      setIsExporting(false);
    }
  };

  const handleExportJSON = () => {
    // Prepariamo un payload pulito, aggiungendo magari dei metadati utili
    const exportData = {
      projectType: "Flowframe Logic-First Architecture",
      version: "1.0",
      timestamp: new Date().toISOString(),
      nodes: blueprint,
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "flowframe-figma-schema.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="flex gap-2 items-center">
      <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-widest mr-2">{isExporting ? "Render in corso..." : ""}</span>

      {/* Esportazioni Visive */}
      <div className="flex gap-1 border-r border-neutral-300 pr-2">
        <button
          onClick={handleExportPNG}
          disabled={isExporting}
          className="px-3 py-1.5 bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-neutral-800 transition-colors disabled:opacity-50"
        >
          PNG
        </button>
        <button
          onClick={handleExportPDF}
          disabled={isExporting}
          className="px-3 py-1.5 bg-red-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-red-500 transition-colors disabled:opacity-50"
        >
          PDF
        </button>
      </div>

      {/* Esportazione Strutturale */}
      <button
        onClick={handleExportJSON}
        title="Esporta il codice strutturale per Figma/Sviluppatori"
        className="px-3 py-1.5 bg-blue-600 text-white text-[10px] font-bold uppercase tracking-wider rounded-sm hover:bg-blue-500 transition-colors shadow-sm flex items-center gap-1"
      >
        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
        </svg>
        SCHEMA JSON (FIGMA)
      </button>
    </div>
  );
}
