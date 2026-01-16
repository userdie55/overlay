import { SVG_NS } from "./constants.js";

export function createRect(state, { stroke = "red" } = {}) {
  const rect = document.createElementNS(SVG_NS, "rect");

  rect.setAttribute("x", state.x);
  rect.setAttribute("y", state.y);
  rect.setAttribute("width", state.width);
  rect.setAttribute("height", state.height);
  rect.setAttribute("fill", "rgba(255,0,0,0.01)");
  rect.setAttribute("stroke", stroke);
  rect.setAttribute("stroke-width", "0.5");
  rect.style.cursor = "move";

  return rect;
}
