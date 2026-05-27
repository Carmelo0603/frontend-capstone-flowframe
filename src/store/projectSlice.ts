import { createSlice, type PayloadAction, current } from "@reduxjs/toolkit";

export interface Block {
  id: string;
  type: string;
  order: number;
  settings?: any;
  parentId?: string | null;
  slot?: string;
}

interface ProjectState {
  blueprint: Block[];
  past: Block[][]; // <-- STORICO: Le foto del passato
  future: Block[][]; // <-- STORICO: Le foto del futuro (per il Redo)
  selectedBlockId: string | null;
  currentProjectId: string | null;
  currentProjectTitle: string;
  deviceMode: "desktop" | "tablet" | "mobile";
}

const initialState: ProjectState = {
  blueprint: [],
  past: [],
  future: [],
  selectedBlockId: null,
  currentProjectId: null,
  currentProjectTitle: "Nuovo Wireframe",
  deviceMode: "desktop",
};

// Utility interna per salvare lo snapshot prima di ogni modifica distruttiva
const saveSnapshot = (state: ProjectState) => {
  // Salviamo una copia esatta del blueprint attuale nel passato
  state.past.push(current(state.blueprint));
  // Limitiamo la memoria a 50 step per non far esplodere il browser
  if (state.past.length > 50) {
    state.past.shift();
  }
  // Se facciamo una nuova azione, il futuro alternativo collassa (come in Ritorno al Futuro)
  state.future = [];
};

const projectSlice = createSlice({
  name: "project",
  initialState,
  reducers: {
    // --- AZIONI DI CRONOLOGIA ---
    undo: (state) => {
      if (state.past.length === 0) return; // Niente da annullare

      const previous = state.past.pop(); // Peschiamo l'ultimo stato dal passato
      if (previous) {
        state.future.push(current(state.blueprint)); // Salviamo il presente nel futuro
        state.blueprint = previous; // Il passato diventa il nuovo presente
        state.selectedBlockId = null; // Resettiamo la selezione per evitare bug visivi
      }
    },
    redo: (state) => {
      if (state.future.length === 0) return; // Niente da ripristinare

      const next = state.future.pop(); // Peschiamo il primo stato dal futuro
      if (next) {
        state.past.push(current(state.blueprint)); // Salviamo il presente nel passato
        state.blueprint = next; // Il futuro diventa il nuovo presente
        state.selectedBlockId = null;
      }
    },

    // --- AZIONI STANDARD (Ora con salvataggio snapshot) ---
    addBlock: (state, action: PayloadAction<Block>) => {
      saveSnapshot(state);
      state.blueprint.push(action.payload);
    },
    reorderBlocks: (state, action: PayloadAction<{ activeId: string; overId: string }>) => {
      saveSnapshot(state);
      const oldIndex = state.blueprint.findIndex((b) => b.id === action.payload.activeId);
      const newIndex = state.blueprint.findIndex((b) => b.id === action.payload.overId);
      const [movedBlock] = state.blueprint.splice(oldIndex, 1);
      state.blueprint.splice(newIndex, 0, movedBlock);
      state.blueprint.forEach((b, index) => {
        b.order = index;
      });
    },
    selectBlock: (state, action: PayloadAction<string>) => {
      // NON salviamo snapshot qui, cliccare non altera il progetto
      state.selectedBlockId = action.payload;
    },
    updateBlockSettings: (state, action: PayloadAction<{ id: string; settings: any }>) => {
      saveSnapshot(state);
      const block = state.blueprint.find((b) => b.id === action.payload.id);
      if (block) {
        block.settings = { ...block.settings, ...action.payload.settings };
      }
    },
    loadProject: (state, action: PayloadAction<{ id: string; title: string; blueprint: Block[] }>) => {
      state.currentProjectId = action.payload.id;
      state.currentProjectTitle = action.payload.title;
      state.blueprint = action.payload.blueprint;
      state.past = []; // Resettiamo lo storico quando si carica un progetto
      state.future = [];
      state.selectedBlockId = null;
    },
    resetProject: (state) => {
      state.currentProjectId = null;
      state.currentProjectTitle = "Nuovo Wireframe";
      state.blueprint = [];
      state.past = [];
      state.future = [];
      state.selectedBlockId = null;
    },
    deleteBlock: (state, action: PayloadAction<string>) => {
      saveSnapshot(state);
      state.blueprint = state.blueprint.filter((b) => b.id !== action.payload);
      if (state.selectedBlockId === action.payload) {
        state.selectedBlockId = null;
      }
      state.blueprint.forEach((b, index) => {
        b.order = index;
      });
    },
    setDeviceMode: (state, action: PayloadAction<"desktop" | "tablet" | "mobile">) => {
      // NON salviamo snapshot per il cambio vista
      state.deviceMode = action.payload;
    },
    setBlockParent: (state, action: PayloadAction<{ id: string; parentId: string | null; slot?: string }>) => {
      saveSnapshot(state);
      const block = state.blueprint.find((b) => b.id === action.payload.id);
      if (block) {
        block.parentId = action.payload.parentId;
        block.slot = action.payload.slot;
      }
    },
    updateProjectTitle: (state, action: PayloadAction<string>) => {
      state.currentProjectTitle = action.payload;
    },
  },
});

export const {
  addBlock,
  reorderBlocks,
  selectBlock,
  updateBlockSettings,
  loadProject,
  resetProject,
  setDeviceMode,
  deleteBlock,
  setBlockParent,
  undo,
  redo,
  updateProjectTitle,
} = projectSlice.actions;

export default projectSlice.reducer;
