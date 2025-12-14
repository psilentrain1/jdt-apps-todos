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

    setTaskList((prev) => [...prev, newTask]);

    try {
      await window.tasks.addTask(newTask);
    } catch (error) {
      setTaskList((prev) => prev.filter((task) => task.id !== newTask.id));
    }
  }

  async function handleModifyTask(id: string, content: string) {
    const tasks = await window.tasks.modifyTask(id, content);
  }

  async function handleCompleteTask(id: string) {
    const tasks = await window.tasks.completeTask(id);
  }

  async function handleRemoveTask(id: string) {
    const deletedTask: task = taskList.filter((task) => task.id === id)[0];
    setTaskList((prev) => prev.filter((task) => task.id !== id));
    try {
      await window.tasks.deleteTask(id);
    } catch (error) {
      setTaskList((prev) => [...prev, deletedTask]);
    }
  }

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return <></>;
}
