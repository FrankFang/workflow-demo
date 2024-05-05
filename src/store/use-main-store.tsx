import { assign, createId } from "src/shared/common";
import { createImmerPersistStore as createPersistImmerStore } from "src/shared/store-helper";

type Material = {
  id: string;
  x: number;
  y: number;
} & (
  | {
      type: "task";
      name: string;
    }
  | {
      type: "decision";
      condition: string;
    }
  | {
      type: "transformer";
      action: string;
    }
);

interface Dragging {
  material: Material;
  offset: { x: number; y: number };
}

interface MainState {
  dragging: Dragging | null;
  materialList: Material[];
  pushMaterial: (material: Material) => void;
  findMaterial: (id: string) => Material | undefined;
  createMaterial: (attrs: Partial<Material>) => Material;
  updateMaterial: (id: string, material: Partial<Material>) => void;
  updateDragging: (dragging: Partial<Dragging> | null) => void;
}

export const useMainStore = createPersistImmerStore<MainState>(
  "workflow",
  (set, get) => ({
    dragging: null,
    materialList: [],
    pushMaterial: (material) => {
      set((state) => {
        state.materialList.push(material);
      });
    },
    updateDragging: (dragging) => {
      set((state) => {
        if (dragging === null) {
          state.dragging = null;
        } else {
          state.dragging = state.dragging || defaultDragging();
          Object.assign(state.dragging, dragging);
        }
      });
    },
    findMaterial: (id) => {
      return get().materialList.find((m) => m.id === id);
    },
    updateMaterial: (id, material) => {
      set((state) => {
        const found = state.materialList.find((m) => m.id === id);
        if (found) {
          Object.assign(found, material);
        }
      });
    },
    defaultDragging,
    createMaterial,
  }),
);

function createMaterial(attrs: Partial<Material>): Material {
  let m: Material;
  const type = attrs.type || "task";
  const id = attrs.id || createId();
  switch (type) {
    case "task":
      m = {
        id,
        x: 0,
        y: 0,
        type: "task",
        name: "Task",
      };
      break;
    case "decision":
      m = {
        id,
        x: 0,
        y: 0,
        type: "decision",
        condition: "Condition",
      };
      break;
    case "transformer":
      m = {
        id,
        x: 0,
        y: 0,
        type: "transformer",
        action: "Action",
      };
      break;
  }
  return assign(m, attrs);
}

function defaultDragging(): Dragging {
  return {
    material: createMaterial({ type: "task" }),
    offset: { x: 0, y: 0 },
  };
}
