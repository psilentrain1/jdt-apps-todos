import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { MdAdd, MdCheck, MdCreate, MdDelete, MdSend } from "react-icons/md";
import type { task, newItem } from "../types/data.types";

export function Tasks() {
  const [taskList, setTaskList] = useState<task[]>([]);
  const [newItemInput, setNewItemInput] = useState<newItem>({
    id: "new",
    content: "",
  });

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
    console.log(newTask);

    console.log("taskList", taskList);

    // if (taskList) {
    //   console.log("taskList exists");
    //   // setTaskList((prev) => [...(prev || []), newTask]);
    //   console.log("taskList", taskList);
    // } else {
    //   // const newArray = [];
    //   // newArray.push(newTask);
    //   // setTaskList(newArray);
    //   console.log("taskList didn't exist");
    // }

    // try {
    //   await window.tasks.addTask(newTask);
    // } catch (error) {
    //   console.log("There was an error in the catch block");
    //   // setTaskList((prev) => prev.filter((task) => task.id !== newTask.id));
    // }
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

  function handleUpdateNewItem(event: React.ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    setNewItemInput((prev) => ({
      ...prev,
      content: value,
    }));
  }

  function handleSendButton() {
    if (newItemInput.content.length > 0) {
      if (newItemInput.id === "new") {
        handleAddTask(newItemInput.content);
      } else {
        handleModifyTask(newItemInput.id, newItemInput.content);
      }
    }
  }

  useEffect(() => {
    handleGetAllTasks();
  }, []);

  return (
    <>
      <div className="task-page">
        <ul className="task-list">
          {taskList &&
            taskList.length > 0 &&
            taskList.map((item) => (
              <li className="task">
                <span className={`task__name ${item.completed && "completed"}`}>
                  {item.content}
                </span>
                <div className="task__buttons">
                  <button
                    className="ui-button"
                    onClick={() => handleCompleteTask(item.id)}
                  >
                    <MdCheck />
                  </button>
                  <button className="ui-button">
                    <MdCreate />
                  </button>
                  <button
                    className="ui-button"
                    onClick={() => handleRemoveTask(item.id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </li>
            ))}
        </ul>
        <div className="add-item">
          <span className="add-item-field">
            <input
              type="text"
              className=""
              value={newItemInput.content}
              onChange={handleUpdateNewItem}
            />
            <button className="ui-button" onClick={handleSendButton}>
              {newItemInput.id === "new" ? <MdAdd /> : <MdSend />}
            </button>
          </span>
        </div>
      </div>
    </>
  );
}
