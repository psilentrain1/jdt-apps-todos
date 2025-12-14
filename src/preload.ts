import { contextBridge, ipcRenderer } from "electron";
import { App, Tasks } from "./types/bridge.types";

declare global {
  interface Window {
    app: App;
    tasks: Tasks;
  }
}

contextBridge.exposeInMainWorld("app", {
  appClose: () => ipcRenderer.invoke("appClose"),
  appMinimize: () => ipcRenderer.invoke("appMinimize"),
});

contextBridge.exposeInMainWorld("tasks", {
  getTasks: () => ipcRenderer.invoke("getTasks"),
  addTask: (id: string, content: string) =>
    ipcRenderer.invoke("addTask", id, content),
  modifyTask: (id: string, content: string) =>
    ipcRenderer.invoke("modifyTask", id, content),
  completeTask: (id: string) => ipcRenderer.invoke("completeTask", id),
  deleteTask: (id: string) => ipcRenderer.invoke("deleteTask", id),
});
