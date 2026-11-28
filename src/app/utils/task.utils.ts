import { Task, TaskCounts, TaskFilter } from '../models/task.model';

const MIN_TITLE_LENGTH = 2;
const MAX_TITLE_LENGTH = 100;

export function validateTaskTitle(title: string): string | null {
  const trimmed = title.trim();
  if (!trimmed) {
    return 'Task title is required.';
  }
  if (trimmed.length < MIN_TITLE_LENGTH) {
    return `Task title must be at least ${MIN_TITLE_LENGTH} characters.`;
  }
  if (trimmed.length > MAX_TITLE_LENGTH) {
    return `Task title must be at most ${MAX_TITLE_LENGTH} characters.`;
  }
  return null;
}

export function filterTasks(tasks: Task[], filter: TaskFilter): Task[] {
  if (filter === 'active') {
    return tasks.filter((task) => !task.completed);
  }
  if (filter === 'completed') {
    return tasks.filter((task) => task.completed);
  }
  return tasks;
}

export function getTaskCounts(tasks: Task[]): TaskCounts {
  const completed = tasks.filter((task) => task.completed).length;
  return {
    total: tasks.length,
    active: tasks.length - completed,
    completed,
  };
}
