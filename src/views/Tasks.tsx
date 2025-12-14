import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { task } from "../types/data.types";

export function Tasks() {
  const [taskList, setTaskList] = useState<task[]>();

  async function handleGetAllTasks() {
    const tasks = await window.tasks.getTasks();
    setTaskList(tasks);
  }

  async function handleAddTask(content: string) {
    const newTask: task = {
      id: uuidv4(),
      content: content,
      modified: new Date().toISOString(),
    };
    const tasks = await window.tasks.addTask(newTask);
  }

  async function handleModifyTask(id: string, content: string) {
    const tasks = await window.tasks.modifyTask(id, content);
  }

  async function handleCompleteTask(id: string) {
    const tasks = await window.tasks.completeTask(id);
  }

  async function handleRemoveTask(id: string) {
    const tasks = await window.tasks.deleteTask(id);
  }

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return <></>;
}
