import { useEffect, useState } from "react";
import type { task } from "../types/data.types";

export function Tasks() {
  const [taskList, setTaskList] = useState<task[]>();

  async function handleGetAllTasks() {
    const tasks = await window.tasks.getTasks();
    setTaskList(tasks);
  }

  async function handleAddTask(content: string) {
    const tasks = await window.tasks.addTask(content);
  }

  async function handleModifyTask(id: number, content: string) {
    const tasks = await window.tasks.modifyTask(id, content);
  }

  async function handleCompleteTask(id: number) {
    const tasks = await window.tasks.completeTask(id);
  }

  async function handleRemoveTask(id: number) {
    const tasks = await window.tasks.deleteTask(id);
  }

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return <></>;
}
