import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority } from '../../models/task.model';
import { validateTaskTitle } from '../../utils/task.utils';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  template: `
    <li class="task-item" [class.completed]="task().completed">
      @if (isEditing()) {
        <div class="edit-row">
          <input
            type="text"
            [(ngModel)]="editTitle"
            aria-label="Edit task title"
            class="edit-input"
          />
          <select
            [(ngModel)]="editPriority"
            aria-label="Edit task priority"
            class="edit-select"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
          <button type="button" class="btn save-btn" (click)="saveEdit()">Save</button>
          <button type="button" class="btn cancel-btn" (click)="cancelEdit()">Cancel</button>
        </div>
        @if (editError()) {
          <p class="error-text" role="alert">{{ editError() }}</p>
        }
      } @else {
        <label class="task-label">
          <input
            type="checkbox"
            [checked]="task().completed"
            (change)="toggle.emit(task().id)"
          />
          <span class="task-title">{{ task().title }}</span>
        </label>
        <div class="task-actions">
          <span class="priority-badge" [class]="task().priority">
            {{ task().priority }}
          </span>
          <button type="button" class="btn edit-btn" (click)="startEdit()">Edit</button>
          <button type="button" class="btn delete-btn" (click)="delete.emit(task().id)">
            Delete
          </button>
        </div>
      }
    </li>
  `,
  styles: `
    .task-item {
      display: flex;
      flex-direction: column;
      gap: 0.4rem;
      padding: 0.75rem;
      border: 1px solid #e5e7eb;
      border-radius: 0.375rem;
      background: #fff;
    }
    .task-item:not(.editing) {
      flex-direction: row;
      align-items: center;
      justify-content: space-between;
    }
    .task-label {
      display: flex;
      align-items: center;
      gap: 0.6rem;
      flex: 1;
      cursor: pointer;
    }
    .completed .task-title {
      text-decoration: line-through;
      color: #9ca3af;
    }
    .task-actions,
    .edit-row {
      display: flex;
      align-items: center;
      gap: 0.4rem;
    }
    .edit-row {
      width: 100%;
    }
    .edit-input {
      flex: 1;
      padding: 0.4rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
    }
    .edit-select {
      padding: 0.4rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
    }
    .priority-badge {
      font-size: 0.75rem;
      padding: 0.15rem 0.5rem;
      border-radius: 9999px;
      text-transform: capitalize;
      font-weight: 500;
    }
    .priority-badge.high {
      background: #fee2e2;
      color: #b91c1c;
    }
    .priority-badge.medium {
      background: #fef3c7;
      color: #b45309;
    }
    .priority-badge.low {
      background: #dcfce7;
      color: #15803d;
    }
    .btn {
      padding: 0.3rem 0.6rem;
      border: 1px solid #d1d5db;
      border-radius: 0.25rem;
      background: #f9fafb;
      cursor: pointer;
      font-size: 0.8rem;
    }
    .save-btn {
      background: #2563eb;
      color: #fff;
      border-color: #2563eb;
    }
    .delete-btn {
      color: #dc2626;
      border-color: #fecaca;
    }
    .error-text {
      color: #dc2626;
      font-size: 0.8rem;
      margin: 0;
    }
  `,
})
export class TaskItem {
  readonly task = input.required<Task>();
  readonly toggle = output<string>();
  readonly delete = output<string>();
  readonly update = output<{ id: string; title: string; priority: TaskPriority }>();

  readonly isEditing = signal(false);
  readonly editError = signal<string | null>(null);
  editTitle = '';
  editPriority: TaskPriority = 'medium';

  startEdit(): void {
    this.editTitle = this.task().title;
    this.editPriority = this.task().priority;
    this.editError.set(null);
    this.isEditing.set(true);
  }

  cancelEdit(): void {
    this.isEditing.set(false);
    this.editError.set(null);
  }

  saveEdit(): void {
    const error = validateTaskTitle(this.editTitle);
    if (error) {
      this.editError.set(error);
      return;
    }

    this.update.emit({
      id: this.task().id,
      title: this.editTitle.trim(),
      priority: this.editPriority,
    });
    this.isEditing.set(false);
  }
}
