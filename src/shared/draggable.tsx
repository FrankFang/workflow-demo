import { useRef } from "react";
import { useDrag } from "./use-drag";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  onStart?: (
    e: React.DragEvent,
    extra: { offset: { x: number; y: number } },
  ) => void;
  onEnd?: (e: React.DragEvent) => void;
}
export function Draggable(props: Props) {
  const { onStart, onEnd, children, ...rest } = props;
  const div = useRef<HTMLDivElement>(null);
  const { listeners, attributes } = useDrag({
    start: (e) => {
      if (!div.current) return;
      const rect = div.current.getBoundingClientRect();
      const { left, top } = rect;
      const { clientX, clientY } = e;
      onStart?.(e, {
        offset: { x: clientX - left, y: clientY - top },
      });
    },
    end: (e) => {
      onEnd?.(e);
    },
  });
  return (
    <div ref={div} {...listeners} {...attributes} {...rest}>
      {children}
    </div>
  );
}
