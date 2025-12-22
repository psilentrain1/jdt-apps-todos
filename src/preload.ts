import { contextBridge, ipcRenderer } from "electron";
import { App, Tasks } from "./types/bridge.types";
import { task } from "./types/data.types";

declare global {
  interface Window {
    app: App;
    tasks: Tasks;
  }
}

contextBridge.exposeInMainWorld("app", {
  appClose: () => ipcRenderer.invoke("appClose"),
  appMinimize: () => ipcRenderer.invoke("appMinimize"),
  appOpenSettings: () => ipcRenderer.invoke("appOpenSettings"),
});

contextBridge.exposeInMainWorld("tasks", {
  getTasks: () => ipcRenderer.invoke("getTasks"),
  addTask: (task: task) => ipcRenderer.invoke("addTask", task),
  modifyTask: (id: string, content: string, modified: string) =>
    ipcRenderer.invoke("modifyTask", id, content, modified),
  completeTask: (id: string, completed: string) =>
    ipcRenderer.invoke("completeTask", id, completed),
  deleteTask: (id: string) => ipcRenderer.invoke("deleteTask", id),
});
