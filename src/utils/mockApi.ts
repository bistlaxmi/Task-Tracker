const TASKS_KEY = "tasks";

export const getTasks = (): Promise<any[]> =>
  new Promise((resolve) => {
    setTimeout(() => {
      const tasks = JSON.parse(localStorage.getItem(TASKS_KEY) || "[]");
      resolve(tasks);
    }, 300);
  });

export const saveTasks = (tasks: any[]): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
      resolve();
    }, 300);
  });

export const addTask = async (task: any) => {
  const tasks = await getTasks();
  const newTask = { ...task, id: Date.now() };
  tasks.push(newTask);
  await saveTasks(tasks);
  return newTask;
};

export const updateTask = async (task: any) => {
  const tasks = await getTasks();
  const updated = tasks.map((t: any) => (t.id === task.id ? task : t));
  await saveTasks(updated);
  return task;
};

export const deleteTask = async (id: number) => {
  const tasks = await getTasks();
  const updated = tasks.filter((t: any) => t.id !== id);
  await saveTasks(updated);
};
