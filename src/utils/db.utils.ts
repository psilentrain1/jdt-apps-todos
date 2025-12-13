import { task } from "../types/data.types";
import { dbLoc, db } from "../index";

/**
 * Creates a new Database file in the specified database location
 * and initializes the necessary tables and default values.
 */
export function createDB() {
  const taskDBQuery = `CREATE TABLE tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT NOT NULL,
    modified TEXT NOT NULL,
    completed TEXT,
    deleted TEXT
    );`;

  db.prepare(taskDBQuery).run();
}

/**
 * Gets all tasks in task list
 * @returns List of tasks.
 */
export function getTasks(): task[] {
  const stmt = db.prepare("SELECT * FROM tasks WHERE deleted IS NULL;");

  const result = stmt.get() as task[];
  return result;
}

/**
 * Add a task to the database.
 * @param content The string content of the task.
 * @returns Success boolean.
 */
export function addTask(content: string): boolean {
  const stmt = db.prepare(
    "INSERT INTO tasks (content, modified) VALUES (?, ?);",
  );
  const now = new Date().toISOString();

  const result = stmt.run(content, now);

  if (result.changes > 0) {
    return true;
  }

  return false;
}

/**
 * Update a single task.
 * @param id ID of the task to be updated.
 * @param content New content for the task.
 * @returns Success boolean.
 */
export function modifyTask(id: number, content: string): boolean {
  const stmt = db.prepare(
    "UPDATE tasks SET content = ?, modified = ? WHERE id = ?;",
  );
  const now = new Date().toISOString();

  const result = stmt.run(content, now, id);

  if (result.changes > 0) {
    return true;
  }

  return false;
}

export function completeTask(id: number): boolean {
  const stmt = db.prepare("UPDATE tasks SET completed = ? WHERE id = ?;");
  const now = new Date().toISOString();

  const result = stmt.run(now, id);

  if (result.changes > 0) {
    return true;
  }

  return false;
}

/**
 * Delete a single task.
 * @param id ID of the date to delete.
 * @returns Success boolean.
 */
export function deleteTask(id: number): boolean {
  const stmt = db.prepare("UPDATE tasks SET deleted = ? WHERE id = ?;");
  const now = new Date().toISOString();

  const result = stmt.run(now, id);

  if (result.changes > 0) {
    return true;
  }

  return false;
}
