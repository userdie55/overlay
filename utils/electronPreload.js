const { contextBridge, ipcRenderer } = require('electron');

console.log('Preload script loaded');

// Безопасное экспортирование API в renderer процесс
contextBridge.exposeInMainWorld("layoutAPI", {
  load: () => {
    console.log('layoutAPI.load called');
    return ipcRenderer.invoke("layout:load");
  },
  save: (layout) => {
    console.log('layoutAPI.save called with:', layout);
    return ipcRenderer.invoke("layout:save", layout);
  },
});

console.log('layoutAPI exposed to main world');

