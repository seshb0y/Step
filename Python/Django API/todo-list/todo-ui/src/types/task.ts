export interface Task {
  id: number;
  title: string;
  is_completed: boolean;
  order: number;
  created_at: string;
  updated_at: string;
}

export interface CreateTaskData {
  title: string;
}

export interface UpdateTaskData {
  title?: string;
  is_completed?: boolean;
}

export interface ReorderTaskData {
  id: number;
  order: number;
}

export type TaskStatus = 'all' | 'done' | 'todo';

