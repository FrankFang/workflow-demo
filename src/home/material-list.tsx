import { Decision } from "src/home/material/decision";
import { Task } from "src/home/material/task";
import { Transformer } from "./material/transformer";

export function MaterialList() {
  return (
    <div className="px-2 py-2.5 flex flex-col gap-y-2">
      <Task />
      <Decision />
      <Transformer />
    </div>
  );
}
