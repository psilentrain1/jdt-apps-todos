import { task } from "../types/data.types";
import { dbLoc, db } from "../index";

/**
 * Creates a new Database file in the specified database location
 * and initializes the necessary tables and default values.
 */
export function createDB() {
  const taskDBQuery = `CREATE TABLE tasks (
    id TEXT PRIMARY KEY,
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
export function addTask(id: string, content: string): boolean {
  const stmt = db.prepare(
    "INSERT INTO tasks (id, content, modified) VALUES (?, ?, ?);",
  );
  const now = new Date().toISOString();

  const result = stmt.run(id, content, now);

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
export function modifyTask(id: string, content: string): boolean {
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

/**
 * Mark task as completed.
 * @param id The task id.
 * @returns Success boolean.
 */
export function completeTask(id: string): boolean {
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
export function deleteTask(id: string): boolean {
  const stmt = db.prepare("UPDATE tasks SET deleted = ? WHERE id = ?;");
  const now = new Date().toISOString();

  const result = stmt.run(now, id);

  if (result.changes > 0) {
    return true;
  }

  return false;
}
