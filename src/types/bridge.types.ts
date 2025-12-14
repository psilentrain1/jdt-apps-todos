import { task } from "./data.types";

export interface App {
  appClose: () => Promise<void>;
  appMinimize: () => Promise<void>;
}

export interface Tasks {
  getTasks: () => Promise<task[]>;
  addTask: (content: string) => Promise<task[]>;
  modifyTask: (id: string, content: string) => Promise<task[]>;
  completeTask: (id: string) => Promise<task[]>;
  deleteTask: (id: string) => Promise<task[]>;
}
