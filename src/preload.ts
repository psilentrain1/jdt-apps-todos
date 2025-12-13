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
  addTask: (content: string) => ipcRenderer.invoke("addTask", content),
  modifyTask: (id: number, content: string) =>
    ipcRenderer.invoke("modifyTask", id, content),
  completeTask: (id: number) => ipcRenderer.invoke("completeTask", id),
  deleteTask: (id: number) => ipcRenderer.invoke("deleteTask", id),
});
