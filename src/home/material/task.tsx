import type { HTMLAttributes } from "react";
import { useDrag } from "src/shared/use-drag.tsx";

interface Props extends HTMLAttributes<HTMLDivElement> {}
export function Task(_props: Props) {
  const { listeners, attributes } = useDrag();
  return (
    <x-task
      class="block min-w-[4em] px-3 py-2 text-center rounded-md border-solid border cursor-grab"
      {...listeners}
      {...attributes}
    >
      <div className="">hi</div>
    </x-task>
  );
}
