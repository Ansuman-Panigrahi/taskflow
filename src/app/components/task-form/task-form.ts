import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskPriority } from '../../models/task.model';
import { validateTaskTitle } from '../../utils/task.utils';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  template: `
    <form class="task-form" (ngSubmit)="onSubmit()">
      <div class="input-row">
        <input
          type="text"
          name="title"
          [(ngModel)]="title"
          placeholder="What needs to be done?"
          aria-label="Task title"
          class="title-input"
        />
        <select
          name="priority"
          [(ngModel)]="priority"
          aria-label="Task priority"
          class="priority-select"
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        <button type="submit" class="add-btn">Add Task</button>
      </div>
      @if (validationError()) {
        <p class="error-text" role="alert">{{ validationError() }}</p>
      }
    </form>
  `,
  styles: `
    .task-form {
      margin-bottom: 1.5rem;
    }
    .input-row {
      display: flex;
      gap: 0.5rem;
    }
    .title-input {
      flex: 1;
      padding: 0.625rem 0.75rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      font-size: 0.95rem;
    }
    .priority-select {
      padding: 0.625rem 0.5rem;
      border: 1px solid #d1d5db;
      border-radius: 0.375rem;
      background: #fff;
    }
    .add-btn {
      padding: 0.625rem 1rem;
      background: #2563eb;
      color: #fff;
      border: none;
      border-radius: 0.375rem;
      font-weight: 500;
      cursor: pointer;
    }
    .add-btn:hover {
      background: #1d4ed8;
    }
    .error-text {
      color: #dc2626;
      font-size: 0.85rem;
      margin: 0.4rem 0 0;
    }
  `,
})
export class TaskForm {
  readonly taskAdded = output<{ title: string; priority: TaskPriority }>();

  title = '';
  priority: TaskPriority = 'medium';
  readonly validationError = signal<string | null>(null);

  onSubmit(): void {
    const error = validateTaskTitle(this.title);
    if (error) {
      this.validationError.set(error);
      return;
    }

    this.validationError.set(null);
    this.taskAdded.emit({ title: this.title.trim(), priority: this.priority });
    this.title = '';
    this.priority = 'medium';
  }
}
