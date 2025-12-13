export interface App {
  appClose: () => Promise<void>;
  appMinimize: () => Promise<void>;
}
