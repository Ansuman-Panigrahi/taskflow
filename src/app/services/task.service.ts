import { Injectable, signal } from '@angular/core';
import { Task, TaskPriority } from '../models/task.model';
import { validateTaskTitle } from '../utils/task.utils';

const STORAGE_KEY = 'taskflow_tasks';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private readonly _tasks = signal<Task[]>([]);
  private readonly _loading = signal<boolean>(false);
  private readonly _error = signal<string | null>(null);

  readonly tasks = this._tasks.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor() {
    this.loadTasks();
  }

  loadTasks(): void {
    this._loading.set(true);
    this._error.set(null);
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: Task[] = raw ? JSON.parse(raw) : [];
      this._tasks.set(Array.isArray(parsed) ? parsed : []);
    } catch {
      this._error.set('Failed to load tasks from storage.');
      this._tasks.set([]);
    } finally {
      this._loading.set(false);
    }
  }

  addTask(title: string, priority: TaskPriority = 'medium'): boolean {
    const validationError = validateTaskTitle(title);
    if (validationError) {
      this._error.set(validationError);
      return false;
    }

    const newTask: Task = {
      id: crypto.randomUUID(),
      title: title.trim(),
      completed: false,
      priority,
      createdAt: new Date().toISOString(),
    };

    this._error.set(null);
    this.updateTasks([newTask, ...this._tasks()]);
    return true;
  }

  toggleTask(id: string): void {
    this.updateTasks(
      this._tasks().map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  }

  updateTask(id: string, title: string, priority: TaskPriority): boolean {
    const validationError = validateTaskTitle(title);
    if (validationError) {
      this._error.set(validationError);
      return false;
    }

    this._error.set(null);
    this.updateTasks(
      this._tasks().map((task) =>
        task.id === id ? { ...task, title: title.trim(), priority } : task
      )
    );
    return true;
  }

  deleteTask(id: string): void {
    this.updateTasks(this._tasks().filter((task) => task.id !== id));
  }

  clearCompleted(): void {
    this.updateTasks(this._tasks().filter((task) => !task.completed));
  }

  clearError(): void {
    this._error.set(null);
  }

  private updateTasks(tasks: Task[]): void {
    this._tasks.set(tasks);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    } catch {
      this._error.set('Failed to save tasks to storage.');
    }
  }
}
