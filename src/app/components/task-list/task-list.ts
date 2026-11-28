import { Component, computed, inject, signal } from '@angular/core';
import { TaskFilter, TaskPriority } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { filterTasks, getTaskCounts } from '../../utils/task.utils';
import { TaskForm } from '../task-form/task-form';
import { TaskItem } from '../task-item/task-item';

@Component({
  selector: 'app-task-list',
  imports: [TaskForm, TaskItem],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css',
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
