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
    const originalList: task[] = taskList;
    const modified = new Date().toISOString();

    const updatedTasks = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, content: content, modified: modified };
      }
      return task;
    });

    setTaskList(updatedTasks);

    try {
      await window.tasks.modifyTask(id, content, modified);
    } catch (error) {
      setTaskList(originalList);
    }
  }

  async function handleCompleteTask(id: string) {
    const originalList: task[] = taskList;
    const completed = new Date().toISOString();

    const updatedTasks = taskList.map((task) => {
      if (task.id === id) {
        return { ...task, completed: completed };
      }
      return task;
    });

    setTaskList(updatedTasks);

    try {
      await window.tasks.completeTask(id, completed);
    } catch (error) {
      setTaskList(originalList);
    }
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
