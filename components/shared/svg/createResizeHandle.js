import { SVG_NS, HANDLE_SIZE } from "./constants.js";

export function createResizeHandle(state, { stroke = "red" } = {}) {
  const handle = document.createElementNS(SVG_NS, "rect");

  handle.setAttribute("width", HANDLE_SIZE);
  handle.setAttribute("height", HANDLE_SIZE);
  handle.setAttribute("fill", stroke);
  handle.style.cursor = "nwse-resize";

  function update() {
    handle.setAttribute(
      "x",
      state.x + state.width - HANDLE_SIZE
    );
    handle.setAttribute(
      "y",
      state.y + state.height - HANDLE_SIZE
    );
  }

  update();

  return { handle, update };
}
