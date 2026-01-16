import { createRectState } from "./svg/rectState.js";
import { createRect } from "./svg/createRect.js";
import { createResizeHandle } from "./svg/createResizeHandle.js";
import { attachDrag } from "./svg/attachDrag.js";
import { attachResize } from "./svg/attachResize.js";
import { attachSerializer } from "./svg/serializer.js";

export function makeResizableRect(config, options = {}) {
  const state = createRectState(config);

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const rect = createRect(state, options);
  const { handle, update } = createResizeHandle(state, options);

  function notifyChange() {
    onChange?.({
      x: state.x,
      y: state.y,
      w: state.width,
      h: state.height,
    });
  }

  attachDrag(
    rect,
    state,
    () => {
      console.log("MAKE RESIZABLE RECT onEnd", state);
      update();
      notifyChange();
    },
    options
  );
  attachResize(
    handle,
    state,
    rect,
    () => {
      update();
      notifyChange();
    },
    options
  );
  attachSerializer(group, state);

  group.append(rect, handle);
  return group;
}
