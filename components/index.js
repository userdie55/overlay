import { SVG_NS } from "./shared/svg/constants.js";
import { makeResizableRect } from "./shared/makeResizableRect.js";

let saveTimer;
function saveLayout(layout) {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(() => {
    window.layoutAPI.save(layout);
    console.log("layout saved");
  }, 300);
}

export function createMaskA(layout) {
  const el = document.createElement("div");

  el.className = "mask";
  el.style.background = "rgba(0,0,0,0.1)";

  const svg = document.createElementNS(SVG_NS, "svg");

  svg.setAttribute("width", "100%");
  svg.setAttribute("height", "100%");
  svg.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  svg.style.pointerEvents = "auto";

  const openForm = layout.commonOrder.orderOpenForm;

  Object.entries(openForm).forEach(([key, cfg]) => {
    svg.appendChild(
      makeResizableRect(cfg, {
        onChange: (coords) => {
          openForm[key] = {
            ...openForm[key],
            ...coords,
          };

          saveLayout(layout);
        },
      })
    );
  });

  el.appendChild(svg);
  return el;
}
