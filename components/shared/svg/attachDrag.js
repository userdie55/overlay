export function attachDrag(rect, state, updateHandle, { enabled = true } = {}) {
  if (!enabled) return;

  let dragging = false;
  let startX, startY, startRectX, startRectY;

  rect.addEventListener("mousedown", (e) => {
    if (e.button !== 1) return;
    e.preventDefault();

    dragging = true;
    startX = e.clientX;
    startY = e.clientY;
    startRectX = state.x;
    startRectY = state.y;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });

  function onMove(e) {
    if (!dragging) return;

    state.x = startRectX + (e.clientX - startX);
    state.y = startRectY + (e.clientY - startY);

    rect.setAttribute("x", state.x);
    rect.setAttribute("y", state.y);
    updateHandle();
  }

  function onUp() {
    dragging = false;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  }
}
