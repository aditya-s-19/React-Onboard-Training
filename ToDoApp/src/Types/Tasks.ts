export type Task = {
  id: string;
  name: string;
  isDone: boolean;
  dueDate: string;
};

export type TasksContext ={
  tasks:Task[],
  addTask:(newTask:Task)=>void,
  removeTask:(removedTask:Task)=>void,
  updateTask:(updatedTask:Task)=>void,
  toggleTaskIsDone:(toggleTask:Task)=>void
}