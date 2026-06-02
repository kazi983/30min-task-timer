export type Priority = 'NOW' | 'SOONER' | 'ANYTIME';

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
