const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("layoutAPI", {
  load: () => ipcRenderer.invoke("layout:load"),
  save: (layout) => ipcRenderer.invoke("layout:save", layout),
});
