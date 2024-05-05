import classNames from "classnames";
import { HTMLAttributes, useRef } from "react";
import { useDrop } from "src/shared/use-drop";
import { useMainStore } from "src/store/use-main-store";
import { Task } from "./material/task";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function WorkflowCanvas(props: Props) {
  const { dragging, pushMaterial, findMaterial, materialList, updateMaterial } =
    useMainStore();
  const { className, ...rest } = props;
  const { listeners } = useDrop({
    onDrop: (e) => {
      if (dragging === null) return;
      if (dragging.material) {
        const found = findMaterial(dragging.material.id);
        const { clientX, clientY } = e;
        const rect = wrapper.current!.getBoundingClientRect();
        const x = clientX - rect.left - (dragging.offset?.x ?? 0);
        const y = clientY - rect.top - (dragging.offset?.y ?? 0);
        const position = { x: Math.round(x), y: Math.round(y) };
        if (!found) {
          pushMaterial({
            ...dragging.material,
            ...position,
          });
        } else {
          updateMaterial(dragging.material.id, position);
        }
      }
    },
  });
  const wrapper = useRef<HTMLDivElement>(null);
  return (
    <div
      {...rest}
      {...listeners}
      className={classNames(
        "realtive border border-blue-500 border-solid",
        className,
      )}
      ref={wrapper}
    >
      {materialList.map((m) => (
        <Task
          className={classNames("absolute", {
            "c-task": m.type === "task",
            "c-decision": m.type === "decision",
            "c-transformer": m.type === "transformer",
          })}
          materialId={m.id}
          key={m.id}
          style={{ transform: `translate3d(${m.x}px,${m.y}px,0)` }}
        >
          {m.type} {m.x} {m.y}
        </Task>
      ))}
    </div>
  );
}
