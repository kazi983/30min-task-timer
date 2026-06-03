export type Priority = 'NOW' | 'SOONER' | 'ANYTIME' | 'SOMEDAY';

export type Task = {
  id: string;
  name: string;
  memo: string;
  completed: boolean;
  priority: Priority;
  createdAt: string;
  lastSelected: boolean;
  deleted: boolean;
};

export type AddTaskInput = {
  name: string;
  priority: Priority;
  memo: string;
};

export type UpdateTaskInput = {
  name: string;
  priority: Priority;
  memo: string;
};
