export function createRectState({ x, y, w, h }) {
  if (w == null || h == null) {
    throw new Error("Expected layout rect format { x, y, w, h }");
  }
  return { x, y, width: w, height: h };
}
