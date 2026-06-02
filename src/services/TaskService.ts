import type { Task, Priority } from '../models/Task';

const STORAGE_KEY = 'tasks';

export class TaskService {
  getAllTasks(): Task[] {
    return this.loadTasks();
  }

  getIncompleteTasks(): Task[] {
    return this.loadTasks().filter((task) => !task.completed);
  }

  getLastSelectedTasks(): Task[] {
    return this.loadTasks().filter((task) => task.lastSelected);
  }

  addTask(name: string, priority: Priority, memo: string = ''): Task {
    if (!name.trim()) {
      throw new Error('タスク名が空です');
    }
    console.log('name :>> ', name);

    const tasks = this.loadTasks();

    const task: Task = {
      id: crypto.randomUUID(),
      name,
      memo,
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
      lastSelected: false,
      deleted: false,
    };

    tasks.push(task);

    this.saveTasks(tasks);

    return task;
  }

  editTask(taskId: string, name: string, priority: Priority, memo: string = '') {
    console.log('name :>> ', name);

    const tasks = this.loadTasks();

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    task.name = name;
    task.priority = priority;
    task.memo = memo;

    console.log('saving..');
    this.saveTasks(tasks);
  }

  markTaskAsComplete(taskId: string) {
    const tasks = this.loadTasks();

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    task.completed = true;

    this.saveTasks(tasks);
  }

  markTaskAsDelete(taskId: string) {
    const tasks = this.loadTasks();

    const task = tasks.find((task) => task.id === taskId);

    if (!task) {
      return;
    }

    task.deleted = true;

    this.saveTasks(tasks);
  }

  markTaskAsLastSelected(taskId: string) {
    const tasks = this.loadTasks();

    tasks.forEach((task) => {
      task.lastSelected = false;
    });

    const task = tasks.find((task) => task.id === taskId);

    if (task) {
      task.lastSelected = true;
    }

    this.saveTasks(tasks);
  }

  private loadTasks(): Task[] {
    const json = localStorage.getItem(STORAGE_KEY);

    if (!json) {
      return [];
    }

    try {
      const tasks = JSON.parse(json) as Task[];

      return tasks.filter((task) => !task.deleted);
    } catch {
      return [];
    }
  }

  private saveTasks(tasks: Task[]) {
    console.log('saving...');
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }
}
