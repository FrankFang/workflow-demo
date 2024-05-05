import classNames from "classnames";
import { HTMLAttributes } from "react";
import { useDrop } from "src/shared/use-drop";
import { useMainStore } from "src/store/use-main-store";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function WorkflowCanvas(props: Props) {
  const { dragging, pushMaterial, materialList } = useMainStore();
  const { className, ...rest } = props;
  const { listeners } = useDrop({
    onDrop: () => {
      if (dragging === null) return;
      if (dragging.material) {
        pushMaterial(dragging.material);
      }
    },
  });
  return (
    <div
      {...rest}
      {...listeners}
      className={classNames("border border-blue-500 border-solid", className)}
    >
      {materialList.map((m) => (
        <div key={m.id}>{m.type}</div>
      ))}
    </div>
  );
}
