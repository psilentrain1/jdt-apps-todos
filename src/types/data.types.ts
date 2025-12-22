export interface task {
  id: string;
  content: string;
  modified: string;
  completed?: string;
  deleted?: string;
}

export interface newItem {
  id: "new" | string;
  content: string;
}

export interface setting {
  id: number;
  name: string;
  value: string;
}

export type settingState = Record<string, string>;
