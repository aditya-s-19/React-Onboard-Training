import { createContext, useEffect, useState } from "react";
import "./App.css";
import Todo from "./components/Todo/Todo";
import { Task, TasksContext } from "./Types/Tasks";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const defaultContext = {
  tasks: [],
  addTask: () => {},
  removeTask: () => {},
  updateTask: () => {},
  toggleTaskIsDone: () => {},
};

export const tasksContext = createContext<TasksContext>(defaultContext);

const App = () => {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const localTasksString = localStorage.getItem("tasks");
    const localTasks: Task[] | undefined = localTasksString && JSON.parse(localTasksString);
    if (localTasks && localTasks.length > 0) {
      setTasks(localTasks);
    }
  }, []);

  const addTask = (newTask: Task): void => {
    let modifiedTasks: Task[] = [];
    setTasks((prevTasks) => {
      modifiedTasks = [...prevTasks, newTask];
      return modifiedTasks;
    });
    localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
  };

  const removeTask = (removedTask: Task): void => {
    let modifiedTasks: Task[] = [];
    setTasks((prevTasks) => {
      modifiedTasks = [...prevTasks.filter((task) => task.id !== removedTask.id)];
      return modifiedTasks;
    });
    localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
  };

  const toggleTaskIsDone = (toggleTask: Task): void => {
    let modifiedTasks: Task[] = [];
    toggleTask.isDone = !toggleTask.isDone;
    setTasks((prevTasks) => {
      modifiedTasks = [...prevTasks.map((task) => (task.id === toggleTask.id ? toggleTask : task))];
      return modifiedTasks;
    });
    localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
  };

  const updateTask = (updatedTask: Task): void => {
    let modifiedTasks: Task[] = [];
    setTasks((prevTasks) => {
      modifiedTasks = [...prevTasks.map((task) => (task.id === updatedTask.id ? updatedTask : task))];
      return modifiedTasks;
    });
    localStorage.setItem("tasks", JSON.stringify(modifiedTasks));
  };

  return (
    <tasksContext.Provider value={{ tasks, addTask, removeTask, updateTask, toggleTaskIsDone }}>
      <div className="container">
        <Todo></Todo>
      </div>
      <ToastContainer position="top-right" autoClose={2000} />
    </tasksContext.Provider>
  );
};

export default App;
