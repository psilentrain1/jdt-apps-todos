import { task } from "./data.types";

export interface App {
  appClose: () => Promise<void>;
  appMinimize: () => Promise<void>;
}

export interface Tasks {
  getTasks: () => Promise<task[]>;
  addTask: (content: string) => Promise<task[]>;
  modifyTask: (id: number, content: string) => Promise<task[]>;
  completeTask: (id: number) => Promise<task[]>;
  deleteTask: (id: number) => Promise<task[]>;
}
