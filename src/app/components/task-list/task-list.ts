import { Component, computed, inject, signal } from '@angular/core';
import { TaskFilter, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { filterTasks, getTaskCounts } from '../../utils/task.utils';
import { TaskForm } from '../task-form/task-form';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskForm, TaskItem],
  template: `
    <section class="task-list-container">
      <app-task-form (taskAdded)="onAddTask($event)" />

      @if (taskService.error()) {
        <div class="error-banner" role="alert">
          <span>{{ taskService.error() }}</span>
          <button type="button" (click)="taskService.clearError()">Dismiss</button>
        </div>
      }

      <div class="toolbar">
        <div class="filters" role="group" aria-label="Filter tasks">
          @for (f of filters; track f) {
            <button
              type="button"
              class="filter-btn"
              [class.active]="filter() === f"
              (click)="filter.set(f)"
            >
              {{ f }}
            </button>
          }
        </div>

        <div class="counts">
          <span>{{ counts().active }} active</span>
          <span>{{ counts().completed }} completed</span>
          @if (counts().completed > 0) {
            <button
              type="button"
              class="clear-btn"
              (click)="taskService.clearCompleted()"
            >
              Clear completed
            </button>
          }
        </div>
      </div>

      @if (taskService.loading()) {
        <p class="status-text">Loading tasks...</p>
      } @else if (filteredTasks().length === 0) {
        <p class="status-text empty">No tasks to display.</p>
      } @else {
        <ul class="task-list">
          @for (task of filteredTasks(); track task.id) {
            <app-task-item
              [task]="task"
              (toggle)="taskService.toggleTask($event)"
              (delete)="taskService.deleteTask($event)"
              (update)="onUpdateTask($event)"
            />
          }
        </ul>
      }
    </section>
  `,
  styles: `
    .task-list-container {
      max-width: 640px;
      margin: 0 auto;
    }
    .error-banner {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      margin-bottom: 1rem;
      background: #fee2e2;
      color: #b91c1c;
      border-radius: 0.375rem;
    }
    .toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-bottom: 1rem;
    }
    .filters {
      display: flex;
      gap: 0.4rem;
    }
    .filter-btn {
      padding: 0.35rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: #fff;
      text-transform: capitalize;
      cursor: pointer;
    }
    .filter-btn.active {
      background: #2563eb;
      color: #fff;
      border-color: #2563eb;
    }
    .counts {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      font-size: 0.875rem;
      color: #4b5563;
    }
    .clear-btn {
      padding: 0.25rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      background: #f9fafb;
      cursor: pointer;
      font-size: 0.8rem;
    }
    .task-list {
      list-style: none;
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
    .status-text {
      text-align: center;
      color: #6b7280;
      padding: 2rem 0;
    }
  `,
})
export class TaskList {
  readonly taskService = inject(TaskService);
  readonly filters: TaskFilter[] = ['all', 'active', 'completed'];
  readonly filter = signal<TaskFilter>('all');

  readonly filteredTasks = computed(() =>
    filterTasks(this.taskService.tasks(), this.filter())
  );

  readonly counts = computed(() => getTaskCounts(this.taskService.tasks()));

  onAddTask(event: { title: string; priority: TaskPriority }): void {
    this.taskService.addTask(event.title, event.priority);
  }

  onUpdateTask(event: { id: string; title: string; priority: TaskPriority }): void {
    this.taskService.updateTask(event.id, event.title, event.priority);
  }
}
