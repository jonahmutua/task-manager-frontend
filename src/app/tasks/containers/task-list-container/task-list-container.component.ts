import { Component, EventEmitter, input, output, Output } from '@angular/core';
import { MatCard, MatCardTitle, MatCardContent, MatCardHeader } from "@angular/material/card";
import { ITaskStatistics, Task } from '../../data/models/task.model';
import { TaskItemComponent } from '../../ui/task-item/task-item.component';
import { MatIcon } from '@angular/material/icon';
import { TaskStatComponent } from '../../ui/task-stat/task-stat.component';

@Component({
  selector: 'tm-task-list-container',
  imports: [MatCard, MatCardTitle, MatCardContent, TaskItemComponent, MatCardHeader, MatIcon, TaskStatComponent],
  templateUrl: './task-list-container.component.html',
  styleUrl: './task-list-container.component.css',
})
export class TaskListContainerComponent {

  tasks = input.required<Task[]>();
  taskStats = input.required<ITaskStatistics>();

  editTask = output<Task>();
  deleteTask = output<Task>();


  handleDeleteTask(task: Task) {
    this.deleteTask.emit(task);
  }

  handleEditTask(task: Task) {
    this.editTask.emit(task);
  }

}
