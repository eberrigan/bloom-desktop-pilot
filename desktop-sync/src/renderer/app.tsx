import { createRoot } from "react-dom/client";

const container = document.getElementById("root") as HTMLElement;
const root = createRoot(container);
root.render(
  <div>
    <h1 className="font-bold text-2xl">💖 Hello World!</h1>
    <p>Welcome to your Electron application.</p>
  </div>
);
