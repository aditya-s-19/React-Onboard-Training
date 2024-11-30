import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task, TasksState } from "../Types/Tasks";
import { localTasksKey } from "../utility/task";

const initialState: TasksState = {
  value: [],
};

const getLocalTasks = (): Task[] => {
  let localTasks: Task[] = [];
  const localTasksString: string | null = localStorage.getItem(localTasksKey);
  if (localTasksString && localTasksString.length > 0) {
    localTasks = JSON.parse(localTasksString);
  }
  return localTasks;
};

const setLocalTasks = (updatedTasks: Task[]): void => {
  localStorage.setItem(localTasksKey, JSON.stringify(updatedTasks));
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    getTasksFromLocalStorage: (state): void => {
      state.value = getLocalTasks();
    },

    addTask: (state, action: PayloadAction<Task>): void => {
      state.value.push({
        ...action.payload,
        isDone: false,
      });
      setLocalTasks(state.value);
    },

    removeTask: (state, action: PayloadAction<Task>) => {
      state.value = state.value.filter((task) => task.id !== action.payload.id);
      setLocalTasks(state.value);
    },

    updateTask: (state, action: PayloadAction<Task>) => {
      state.value = state.value.map((task) => (task.id === action.payload.id ? action.payload : task));
      setLocalTasks(state.value);
    },

    toggleTaskIsDone: (state, action: PayloadAction<Task>) => {
      const givenTask = state.value.find((task) => task.id === action.payload.id);
      if (givenTask) {
        givenTask.isDone = !givenTask.isDone;
        setLocalTasks(state.value);
      }
    },
  },
});

export const { getTasksFromLocalStorage, addTask, removeTask, updateTask, toggleTaskIsDone } = tasksSlice.actions;
export default tasksSlice.reducer;
