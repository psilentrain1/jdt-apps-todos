import { task } from "./data.types";

export interface App {
  appClose: () => Promise<void>;
  appMinimize: () => Promise<void>;
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
