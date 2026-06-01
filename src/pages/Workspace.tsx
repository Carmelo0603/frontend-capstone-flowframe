import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type RootState } from "../store/store";
import { flowframeApi } from "../services/api";
import { addBlock, reorderBlocks, selectBlock, setDeviceMode, undo, redo, updateProjectTitle, loadProject } from "../store/projectSlice";
import { BlockComponents, BlockCategories } from "../components/blocks/BlockRegistry";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, type DragEndEvent } from "@dnd-kit/core";
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { SortableBlock } from "../components/blocks/SortableBlock";
import { SettingPanel } from "../components/layout/SettingPanel";
import { AiChat } from "../components/layout/AiChat";
import { ExportPanel } from "../components/layout/ExportPanel";
import { Joyride, STATUS } from "react-joyride";
import type { Step } from "react-joyride";

export function Workspace() {
  const dispatch = useDispatch();
  const [isSaving, setIsSaving] = useState(false);

  const [runTour, setRunTour] = useState(() => !localStorage.getItem("flowframe_tutorial_seen"));
  const [tourKey, setTourKey] = useState(0);

  const { blueprint, selectedBlockId, deviceMode, past, future, currentProjectTitle, currentProjectId } = useSelector((state: RootState) => state.project);
  const token = useSelector((state: RootState) => state.auth?.token);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates }),
  );

  const handleJoyrideCallback = (data: { status: string }) => {
    const { status } = data;
    const finishedStatuses: string[] = [STATUS.FINISHED, STATUS.SKIPPED];

    if (finishedStatuses.includes(status)) {
      setRunTour(false);
      localStorage.setItem("flowframe_tutorial_seen", "true");
    }
  };

  const tourSteps: Step[] = [
    {
      target: ".tour-sidebar",
      title: "Libreria Componenti",
      content: "Qui trovi tutti i blocchi Lo-Fi suddivisi per categoria. Clicca su un componente per aggiungerlo istantaneamente al tuo canvas.",
      placement: "right",
    },
    {
      target: ".tour-controls",
      title: "Barra di Controllo",
      content: "Nomina il progetto, cambia la visualizzazione (Mobile, Tablet, Desktop), naviga nella cronologia (Undo/Redo) e salva sul Database.",
      placement: "bottom",
    },
    {
      target: "#flowframe-canvas-area",
      title: "Il Canvas",
      content: "Il tuo spazio di lavoro Logic-First. Trascina i blocchi per riordinarli (Drag & Drop) e cliccali per selezionarli.",
      placement: "auto",
    },
    {
      target: ".tour-settings",
      title: "Pannello Ispettore",
      content: "Quando selezioni un blocco nel Canvas, le sue impostazioni appariranno qui. Modifica testi, stili e dati in tempo reale.",
      placement: "left",
    },
  ];

  const handleAddBlock = (type: string) => {
    const newBlock = {
      id: crypto.randomUUID(),
      type,
      order: blueprint.length,
      settings: {},
      parentId: null,
    };
    dispatch(addBlock(newBlock));
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over && active.id !== over.id) {
      const activeBlock = blueprint.find((b) => b.id === active.id);
      const overBlock = blueprint.find((b) => b.id === over.id);

      if (activeBlock && overBlock && activeBlock.parentId === overBlock.parentId && activeBlock.slot === overBlock.slot) {
        dispatch(reorderBlocks({ activeId: active.id as string, overId: over.id as string }));
      }
    }
  };

  const handleSaveProject = async () => {
    if (!token) return;

    try {
      setIsSaving(true);
      let targetProjectId = currentProjectId;

      if (!targetProjectId) {
        const newProject = await flowframeApi.createProject(currentProjectTitle, token);
        targetProjectId = newProject.id || newProject.idProgetto;

        dispatch(
          loadProject({
            id: targetProjectId!,
            title: currentProjectTitle,
            blueprint: blueprint,
          }),
        );
      }

      await flowframeApi.updateBlueprint(targetProjectId!, JSON.stringify(blueprint), token);
    } catch (error) {
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="flex h-[calc(100vh-4rem)] w-full bg-neutral-100 text-neutral-900 font-sans overflow-hidden relative">
      <Joyride
        key={tourKey}
        steps={tourSteps}
        run={runTour}
        continuous
        onEvent={handleJoyrideCallback}
        options={{
          zIndex: 99999,
          primaryColor: "#171717",
          textColor: "#171717",
          backgroundColor: "#ffffff",
          arrowColor: "#ffffff",
          buttons: ["back", "close", "primary", "skip"],
          skipBeacon: true,
        }}
        styles={{
          tooltip: {
            borderRadius: "0px",
            maxWidth: "320px",
            padding: "24px",
          },
          buttonNext: {
            borderRadius: "0px",
            fontSize: "12px",
            fontWeight: "bold",
            textTransform: "uppercase",
            letterSpacing: "0.05em",
          },
          buttonBack: {
            color: "#737373",
          },
          buttonSkip: {
            color: "#737373",
            fontSize: "12px",
          },
        }}
      />

      <aside className="tour-sidebar w-64 bg-white border-r border-neutral-200 flex flex-col shadow-sm z-10 shrink-0">
        <div className="p-6 border-b border-neutral-200 flex justify-between items-center">
          <h2 className="text-sm font-black tracking-wider text-neutral-400 uppercase">Componenti Lo-Fi</h2>
          <button
            onClick={() => {
              setRunTour(true);
              setTourKey((prev) => prev + 1);
            }}
            className="text-[10px] font-bold text-neutral-400 hover:text-neutral-900 uppercase underline"
          >
            Help
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {Object.entries(BlockCategories).map(([categoryName, blocks]) => (
            <div key={categoryName} className="mb-4">
              <div className="px-4 py-2 bg-neutral-100 text-[10px] font-black tracking-widest uppercase text-neutral-500 border-y border-neutral-200">
                {categoryName}
              </div>
              <div className="p-3 flex flex-col gap-2">
                {blocks.map((block) => (
                  <div
                    key={block.type}
                    onClick={() => handleAddBlock(block.type)}
                    className="p-2 border border-dashed border-neutral-300 rounded-sm text-center text-xs font-bold text-neutral-600 hover:border-neutral-900 hover:bg-neutral-50 hover:text-neutral-900 transition-colors cursor-pointer select-none"
                  >
                    + {block.label}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <AiChat />
      </aside>

      <main className="flex-1 bg-neutral-200 overflow-y-auto flex flex-col items-center p-8 pb-32 relative">
        <div className="tour-controls flex gap-6 mb-6 shrink-0 items-center">
          <div className="flex">
            <input
              type="text"
              value={currentProjectTitle}
              onChange={(e) => dispatch(updateProjectTitle(e.target.value))}
              placeholder="NOME PROGETTO"
              className="bg-white border border-neutral-200 px-3 py-1.5 text-xs font-bold tracking-tight uppercase rounded-sm outline-none focus:ring-1 focus:ring-neutral-900 w-48 font-mono shadow-sm transition-all"
            />
            <button
              onClick={handleSaveProject}
              disabled={isSaving || blueprint.length === 0}
              className={`px-4 py-1.5 text-[10px] font-black uppercase tracking-wider rounded-sm shadow-sm transition-all flex items-center gap-1.5 border ${
                isSaving
                  ? "bg-neutral-100 text-neutral-400 border-neutral-200 cursor-wait"
                  : blueprint.length === 0
                    ? "bg-neutral-50 text-neutral-300 border-neutral-200 cursor-not-allowed"
                    : "bg-emerald-600 text-white border-transparent hover:bg-emerald-500 cursor-pointer"
              }`}
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                ></path>
              </svg>
              {isSaving ? "Salvataggio..." : "Salva DB"}
            </button>
          </div>
          <div className="flex gap-1 bg-white p-1.5 shadow-sm border border-neutral-200 rounded-sm">
            <button
              onClick={() => dispatch(setDeviceMode("mobile"))}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors ${deviceMode === "mobile" ? "bg-neutral-900 text-white" : "text-neutral-400 hover:bg-neutral-100"}`}
            >
              Mobile
            </button>
            <button
              onClick={() => dispatch(setDeviceMode("tablet"))}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors ${deviceMode === "tablet" ? "bg-neutral-900 text-white" : "text-neutral-400 hover:bg-neutral-100"}`}
            >
              Tablet
            </button>
            <button
              onClick={() => dispatch(setDeviceMode("desktop"))}
              className={`px-3 py-1.5 text-[10px] font-black uppercase tracking-wider transition-colors ${deviceMode === "desktop" ? "bg-neutral-900 text-white" : "text-neutral-400 hover:bg-neutral-100"}`}
            >
              Desktop
            </button>
          </div>
          <div className="flex gap-1 bg-white p-1.5 shadow-sm border border-neutral-200 rounded-sm font-mono">
            <button
              onClick={() => dispatch(undo())}
              disabled={past.length === 0}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all border border-transparent ${past.length === 0 ? "text-neutral-200 cursor-not-allowed select-none" : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"}`}
            >
              [ ↰ Undo ]
            </button>
            <button
              onClick={() => dispatch(redo())}
              disabled={future.length === 0}
              className={`px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-all border border-transparent ${future.length === 0 ? "text-neutral-200 cursor-not-allowed select-none" : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-950 cursor-pointer"}`}
            >
              [ Redo ↱ ]
            </button>
          </div>

          <ExportPanel />
        </div>

        <div
          id="flowframe-canvas-area"
          className={`w-full bg-white shadow-xl border border-neutral-200 min-h-[800px] h-fit flex flex-col p-0 overflow-hidden transition-all duration-300 ease-in-out shrink-0 ${deviceMode === "mobile" ? "max-w-[375px]" : deviceMode === "tablet" ? "max-w-[768px]" : "max-w-5xl"}`}
        >
          {blueprint.length === 0 ? (
            <div className="w-full h-[800px] flex items-center justify-center text-neutral-400 font-mono text-sm border-2 border-dashed border-neutral-200">
              [ CANVAS VUOTO - AGGIUNGI COMPONENTI LO-FI ]
            </div>
          ) : (
            <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
              <SortableContext items={blueprint.filter((b) => !b.parentId).map((b) => b.id)} strategy={verticalListSortingStrategy}>
                {blueprint
                  .filter((b) => !b.parentId)
                  .map((block) => {
                    const registryEntry = BlockComponents[block.type];
                    if (!registryEntry) return null;
                    const Component = registryEntry.Component;
                    const isSelected = block.id === selectedBlockId;

                    let childrenProps: Record<string, unknown> | undefined = undefined;

                    const renderChild = (child: any) => {
                      const childEntry = BlockComponents[child.type];
                      const ChildComponent = childEntry?.Component;
                      if (!ChildComponent) return null;
                      const isChildSelected = child.id === selectedBlockId;
                      return (
                        <div
                          key={child.id}
                          onClick={(e) => {
                            e.stopPropagation();
                            dispatch(selectBlock(child.id));
                          }}
                          className={`relative transition-all w-full h-full ${isChildSelected ? "ring-2 ring-neutral-900 z-10" : "hover:ring-2 hover:ring-neutral-400 z-0"}`}
                        >
                          <SortableBlock id={child.id}>
                            <ChildComponent data={child.settings} />
                          </SortableBlock>
                        </div>
                      );
                    };

                    if (block.type === "COLUMNS") {
                      const leftChildren = blueprint.filter((b) => b.parentId === block.id && b.slot === "left");
                      const rightChildren = blueprint.filter((b) => b.parentId === block.id && b.slot === "right");

                      childrenProps = {
                        left: (
                          <SortableContext items={leftChildren.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                            {leftChildren.map(renderChild)}
                          </SortableContext>
                        ),
                        right: (
                          <SortableContext items={rightChildren.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                            {rightChildren.map(renderChild)}
                          </SortableContext>
                        ),
                      };
                    }

                    if (block.type === "STACK") {
                      const stackChildren = blueprint.filter((b) => b.parentId === block.id);
                      if (stackChildren.length > 0) {
                        childrenProps = {
                          children: (
                            <SortableContext items={stackChildren.map((b) => b.id)} strategy={verticalListSortingStrategy}>
                              {stackChildren.map(renderChild)}
                            </SortableContext>
                          ),
                        };
                      }
                    }

                    return (
                      <div
                        key={block.id}
                        onClick={() => dispatch(selectBlock(block.id))}
                        className={`transition-all relative ${isSelected ? "ring-2 ring-neutral-900 z-10" : "hover:ring-2 hover:ring-neutral-300 hover:z-10"}`}
                      >
                        <SortableBlock id={block.id}>
                          <Component data={block.settings} childrenBlocks={childrenProps} />
                        </SortableBlock>
                      </div>
                    );
                  })}
              </SortableContext>
            </DndContext>
          )}
        </div>
      </main>

      <div className="tour-settings shrink-0">
        <SettingPanel />
      </div>
    </div>
  );
}
