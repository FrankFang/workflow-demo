import { useState } from "react";
import React from "react";

type Options = {
  start?: (e: React.DragEvent<HTMLElement>) => void;
  end?: (e: React.DragEvent<HTMLElement>) => void;
};
export function useDrag(options?: Options) {
  const onDragStart = (e: React.DragEvent<HTMLElement>) => {
    options?.start?.(e);
  };
  const onDragEnd = (e: React.DragEvent<HTMLElement>) => {
    options?.end?.(e);
  };
  const [draggable] = useState(true);

  return {
    listeners: {
      onDragStart,
      onDragEnd,
    },
    attributes: {
      draggable,
    },
  };
}
