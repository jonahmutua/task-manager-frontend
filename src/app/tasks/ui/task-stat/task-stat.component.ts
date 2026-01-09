import { Component, input } from '@angular/core';
import { ITaskStatistics } from '../../data/models/task.model';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'tm-task-stat',
  imports: [MatIcon],
  templateUrl: './task-stat.component.html',
  styleUrl: './task-stat.component.css',
  
})
export class TaskStatComponent {
  
  taskStats = input.required<ITaskStatistics>();

}
