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

  const settingsDBQuery = `CREATE TABLE settings (
      id INTEGER PRIMARY KEY AUTOINCREMEMNT,
      name TEXT NOT NULL,
      value TEXT
    );`;

  db.prepare(taskDBQuery).run();
  db.prepare(settingsDBQuery).run();

  // TODO: Initialize settings DB with default values
}

/**
 * Gets all tasks in task list
 * @returns List of tasks.
 */
export function getTasks(): task[] {
  const stmt = db.prepare("SELECT * FROM tasks WHERE deleted IS NULL;");

  const result = stmt.all() as task[];
  return result;
}

/**
 * Add a task to the database.
 * @param content The string content of the task.
 * @returns Success boolean.
 */
export function addTask(task: task): boolean {
  const stmt = db.prepare(
    "INSERT INTO tasks (id, content, modified) VALUES (?, ?, ?);",
  );

  const result = stmt.run(task.id, task.content, task.modified);

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
export function modifyTask(
  id: string,
  content: string,
  modified: string,
): boolean {
  const stmt = db.prepare(
    "UPDATE tasks SET content = ?, modified = ? WHERE id = ?;",
  );

  const result = stmt.run(content, modified, id);

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
export function completeTask(id: string, completed: string): boolean {
  const stmt = db.prepare("UPDATE tasks SET completed = ? WHERE id = ?;");

  const result = stmt.run(completed, id);

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

export function cleanupTasks() {
  const daysToKeep = 7;

  const getStmt = db.prepare("SELECT * FROM tasks WHERE deleted IS NOT NULL;");
  const delStmt = db.prepare("DELETE FROM tasks WHERE id = ?;");

  const deletedTasks = getStmt.all() as task[];

  function readyToPurge(date: string, purgeDays: number = daysToKeep) {
    const currentDate = new Date();
    const taskDate = new Date(date);
    const daysAgoTimestamp =
      currentDate.getTime() - purgeDays * 24 * 60 * 60 * 1000;
    return taskDate.getTime() < daysAgoTimestamp;
  }

  for (let i = 0; i < deletedTasks.length; i++) {
    if (deletedTasks[i].deleted && readyToPurge(deletedTasks[i].deleted)) {
      try {
        delStmt.run(deletedTasks[i].id);
      } catch (error) {
        console.log("Purge task failed: ", error);
      }
    }
  }
}
