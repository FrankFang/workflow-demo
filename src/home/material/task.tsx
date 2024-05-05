import classNames from "classnames";
import { Draggable } from "src/shared/draggable";
import { useMainStore } from "src/store/use-main-store";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  materialId?: string;
}
export function Task(props: Props) {
  const { materialId, className, children, ...rest } = props;
  const { updateDragging, createMaterial } = useMainStore();
  const onStart = (
    _e: React.DragEvent,
    extra: { offset: { x: number; y: number } },
  ) => {
    updateDragging({
      material: createMaterial({ type: "task", id: materialId }),
      offset: extra.offset,
    });
  };
  const onEnd = () => {
    updateDragging(null);
  };

  return (
    <Draggable
      {...rest}
      className={classNames("c-task", className)}
      onStart={onStart}
      onEnd={onEnd}
    >
      <div className="">{children ?? "Task"}</div>
    </Draggable>
  );
}
