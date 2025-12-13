import { useEffect, useState } from "react";
import type { task } from "../types/data.types";

export function Tasks() {
  const [taskList, setTaskList] = useState<task[]>();

  function handleGetTasks() {}

  function handleAddTask() {}

  function handleRemoveTask() {}

  useEffect(() => {
    handleGetTasks();
  }, []);

  return <></>;
}
