import { Component, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Task, TaskPriority } from '../../models/task.model';
import { validateTaskTitle } from '../../utils/task.utils';

@Component({
  selector: 'app-task-item',
  imports: [FormsModule],
  templateUrl: './task-item.html',
  styleUrl: './task-item.css',
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
