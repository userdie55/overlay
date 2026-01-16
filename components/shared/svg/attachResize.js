export function attachResize(handle, state, rect, updateHandle, { enabled = true } = {}) {
  if (!enabled) return;

  let resizing = false;
  let startX, startY, startW, startH;

  handle.addEventListener("mousedown", (e) => {
    e.preventDefault();
    e.stopPropagation();

    resizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startW = state.width;
    startH = state.height;

    document.addEventListener("mousemove", onMove);
    document.addEventListener("mouseup", onUp);
  });

  function onMove(e) {
    if (!resizing) return;

    state.width = Math.max(10, startW + (e.clientX - startX));
    state.height = Math.max(10, startH + (e.clientY - startY));

    rect.setAttribute("width", state.width);
    rect.setAttribute("height", state.height);
    updateHandle();
  }

  function onUp() {
    resizing = false;
    document.removeEventListener("mousemove", onMove);
    document.removeEventListener("mouseup", onUp);
  }
}
