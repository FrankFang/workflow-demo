import { useRef, type HTMLAttributes } from "react";
import { useDrag } from "src/shared/use-drag.tsx";
import { useMainStore } from "src/store/use-main-store";

interface Props extends HTMLAttributes<HTMLDivElement> {}
export function Task(_props: Props) {
  const { updateDragging, createMaterial } = useMainStore();
  const { listeners, attributes } = useDrag({
    start: (event) => {
      if (!task.current) return;
      const rect = task.current.getBoundingClientRect();
      const { left, top } = rect;
      const { clientX, clientY } = event;
      updateDragging({
        material: createMaterial("task"),
        offset: { x: clientX - left, y: clientY - top },
      });
    },
    end: () => {
      updateDragging(null);
    },
  });
  const task = useRef<HTMLDivElement>(null);
  return (
    <x-task
      class="block min-w-[4em] px-3 py-2 text-center rounded-md border-solid border cursor-grab"
      ref={task}
      {...listeners}
      {...attributes}
    >
      <div className="">hi</div>
    </x-task>
  );
}
