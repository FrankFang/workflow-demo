import { MaterialList } from "./material-list";
import { WorkflowCanvas } from "./workflow-canvas";

export function HomePage() {
  return (
    <div className="h-screen flex flex-col border border-red-500 border-solid">
      <h1>Hello World</h1>
      <div className="flex h-full">
        <aside className="shrink-0 grow-0 border border-solid bolor">
          <MaterialList />
        </aside>
        <main className="shrink grow border border-solid bolor flex flex-col">
          <WorkflowCanvas className="grow-1 h-full" />
        </main>
      </div>
    </div>
  );
}
