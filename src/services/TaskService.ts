import type { Task, AddTaskInput, UpdateTaskInput } from '../models/Task';

const STORAGE_KEY = 'tasks';

export class TaskService {
  getTasks(filter: {
    deleted?: boolean;
    completed?: boolean;
    lastSelected?: boolean;
  }): Task[] {
    const tasks = this.loadTasks();

    return tasks.filter((task) => {
      if (filter.deleted !== undefined && task.deleted !== filter.deleted) {
        return false;
      }

      if (filter.completed !== undefined && task.completed !== filter.completed) {
        return false;
      }

      if (
        filter.lastSelected !== undefined &&
        task.lastSelected !== filter.lastSelected
      ) {
        return false;
      }

      return true;
    });
  }

  addTask(data: AddTaskInput): Task {
    if (!data.name.trim()) {
      throw new Error('タスク名が空です');
    }

    const tasks = this.loadTasks();

    const task: Task = {
      id: crypto.randomUUID(),
      name: data.name.trim(),
      memo: data.memo,
      completed: false,
      priority: data.priority,
      createdAt: new Date().toISOString(),
      lastSelected: false,
      deleted: false,
    };

    tasks.push(task);

    this.saveTasks(tasks);

    return task;
  }

  updateTask(taskId: string, data: UpdateTaskInput) {
    if (!data.name.trim()) {
      throw new Error('タスク名が空です');
    }

    const tasks = this.loadTasks();

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      throw new Error('Task not found');
    }

    task.name = data.name.trim();
    task.priority = data.priority;
    task.memo = data.memo;

    this.saveTasks(tasks);
  }

  completeTask(taskId: string) {
    const tasks = this.loadTasks();

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    task.completed = true;

    this.saveTasks(tasks);
  }

  deleteTask(taskId: string) {
    const tasks = this.loadTasks();

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    task.deleted = true;

    this.saveTasks(tasks);
  }

  setLastSelectedTask(taskId: string) {
    const tasks = this.loadTasks();

    tasks.forEach((task) => {
      task.lastSelected = task.id === taskId;
    });

    this.saveTasks(tasks);
  }

  private loadTasks(): Task[] {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
      return [];
    }

    try {
      const raw = JSON.parse(json) as Task[];
      return raw.map(this.normalizeTask);
    } catch {
      return [];
    }
  }

  private saveTasks(tasks: Task[]) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  private normalizeTask(task: any): Task {
    return {
      id: task.id,
      name: task.name ?? '',
      memo: task.memo ?? '',
      priority: task.priority,
      completed: Boolean(task.completed),
      deleted: Boolean(task.deleted),
      lastSelected: Boolean(task.lastSelected),
      createdAt: task.createdAt ?? new Date().toISOString(),
    };
  }
}
