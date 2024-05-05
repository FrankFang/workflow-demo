import { create, StateCreator } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export function createImmerStore<T extends object>(
  fn: StateCreator<T, [["zustand/immer", never]], [], T>,
) {
  return create<T>()(immer(fn));
}
export function createImmerPersistStore<T extends object>(
  name: string,
  fn: StateCreator<
    T,
    [["zustand/immer", never], ["zustand/persist", unknown]],
    [],
    T
  >,
) {
  return create<T>()(immer(persist(fn, { name })));
}
