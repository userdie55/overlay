import { app, BrowserWindow, globalShortcut, screen, ipcMain  } from "electron";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;

app.whenReady().then(() => {
  const { width, height } = screen.getPrimaryDisplay().bounds;

  win = new BrowserWindow({
    width,
    height,
    x: 0,
    y: 0,

    frame: false,
    transparent: true,
    resizable: false,
    movable: false,
    fullscreen: false,

    alwaysOnTop: true,
    skipTaskbar: true,
    hasShadow: false,

    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      enableRemoteModule: false,
      webSecurity: true,
      preload: path.resolve(__dirname, "utils/electronPreload.js"),
    },
  });

  const layoutPath = path.join(app.getAppPath(), "layout.json");

  console.log("Layout path:", layoutPath);

  const preloadPath = path.resolve(__dirname, "utils/electronPreload.js");
  console.log("Preload path:", preloadPath);
  console.log("Preload exists:", fs.existsSync(preloadPath));

  // Проверяем содержимое preload файла
  try {
    const preloadContent = fs.readFileSync(preloadPath, 'utf8');
    console.log("Preload content length:", preloadContent.length);
  } catch (err) {
    console.error("Failed to read preload file:", err);
  }

  ipcMain.handle("layout:load", async () => {
    const raw = fs.readFileSync(layoutPath, "utf-8");
    return JSON.parse(raw);
  });

  ipcMain.handle("layout:save", async (_, layout) => {
    fs.writeFileSync(layoutPath, JSON.stringify(layout, null, 2), "utf-8");
    return true;
  });

  win.setIgnoreMouseEvents(true, { forward: true });
  win.setFocusable(false);

  win.loadFile("index.html");
    win.webContents.openDevTools({ mode: "detach" });

  win.setAlwaysOnTop(true, "screen-saver");

  globalShortcut.register("Escape", () => {
    app.quit();
  });
});

app.on("will-quit", () => {
  globalShortcut.unregisterAll();
});
