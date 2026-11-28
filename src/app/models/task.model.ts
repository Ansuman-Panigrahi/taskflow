export type TaskPriority = 'low' | 'medium' | 'high';

export type TaskFilter = 'all' | 'active' | 'completed';

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: TaskPriority;
  createdAt: string;
}

export interface TaskCounts {
  total: number;
  active: number;
  completed: number;
}
