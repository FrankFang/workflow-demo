interface Options {
  onDragOver?: (e: React.DragEvent) => void;
  onDrop?: (e: React.DragEvent) => void;
}
export function useDrop(options?: Options) {
  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    options?.onDragOver?.(e);
  };
  const onDrop = (e: React.DragEvent) => {
    options?.onDrop?.(e);
  };
  return {
    listeners: {
      onDragOver,
      onDrop,
    },
  };
}
