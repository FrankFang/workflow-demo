import classNames from "classnames";
import { HTMLAttributes } from "react";
import { useDrop } from "src/shared/use-drop";

interface Props extends HTMLAttributes<HTMLDivElement> {}

export function WorkflowCanvas(props: Props) {
  const { className, ...rest } = props;
  const { listeners } = useDrop({
    onDrop: (e: React.DragEvent) => {
      console.log(e);
    },
  });
  return (
    <div
      {...rest}
      {...listeners}
      className={classNames("border border-blue-500 border-solid", className)}
    >
      WorkflowCanvas
    </div>
  );
}
