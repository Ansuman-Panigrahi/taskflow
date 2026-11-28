import { Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskPriority } from '../../models/task.model';
import { validateTaskTitle } from '../../utils/task.utils';

@Component({
  selector: 'app-task-form',
  imports: [FormsModule],
  templateUrl: './task-form.html',
  styleUrl: './task-form.css',
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
