import { setting, task } from "./data.types";

export interface App {
  appClose: () => Promise<void>;
  appMinimize: () => Promise<void>;
  appOpenSettings: () => Promise<void>;
}

export interface Settings {
  getSettings: () => Promise<setting[]>;
  updateSetting: (name: string, value: string) => Promise<setting[]>;
}

export interface Tasks {
  getTasks: () => Promise<task[]>;
  addTask: (task: task) => Promise<task[]>;
  modifyTask: (
    id: string,
    content: string,
    modified: string,
  ) => Promise<task[]>;
  completeTask: (id: string, completed: string) => Promise<task[]>;
  deleteTask: (id: string) => Promise<task[]>;
}
