import { contextBridge, ipcRenderer } from "electron";
import { App } from "./types/bridge.types";

declare global {
  interface Window {
    app: App;
  }
}

contextBridge.exposeInMainWorld("app", {
  appClose: () => ipcRenderer.invoke("appClose"),
  appMinimize: () => ipcRenderer.invoke("appMinimize"),
});
