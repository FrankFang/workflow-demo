import { createId } from "src/shared/common";
import { createImmerPersistStore as createPersistImmerStore } from "src/shared/store-helper";

type MaterialType = "task" | "decision" | "transformer";

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
  material: Material | null;
  offset: { x: number; y: number } | null;
}

interface MainState {
  dragging: Dragging | null;
  materialList: Material[];
  pushMaterial: (material: Material) => void;
  createMaterial: (type: MaterialType) => Material;
  updateDragging: (dragging: Partial<Dragging> | null) => void;
}

export const useMainStore = createPersistImmerStore<MainState>(
  "workflow",
  (set) => ({
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
    defaultDragging,
    createMaterial,
  }),
);

function createMaterial(type: "task" | "decision" | "transformer"): Material {
  const common = { id: createId(), x: 0, y: 0 };
  switch (type) {
    case "task":
      return { type, name: "", ...common };
    case "decision":
      return { type, condition: "", ...common };
    case "transformer":
      return { type, action: "", ...common };
  }
}

function defaultDragging(): Dragging {
  return {
    material: null,
    offset: { x: 0, y: 0 },
  };
}
