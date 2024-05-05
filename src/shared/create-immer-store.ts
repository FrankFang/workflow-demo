import { create, StateCreator } from "zustand";
import { immer } from "zustand/middleware/immer";

export function createImmerStore<T extends object>(
  fn: StateCreator<T, [["zustand/immer", never]], [], T>,
) {
  return create<T>()(immer(fn));
}
