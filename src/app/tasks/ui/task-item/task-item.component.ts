import { Component, computed, EventEmitter, input, Input, output, Output, } from '@angular/core';
import {  Task } from '../../data/models/task.model';
import { TASK_PRIORITY_CONFIG, TaskPriority } from '../../data/models/task-priority'
import { CommonModule, DatePipe } from '@angular/common';
import {MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TASK_PROGRESS_CONFIG, TaskProgess } from '../../data/models/task-progress';

@Component({
  selector: 'tm-task-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, DatePipe],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})

export class TaskItemComponent {

  task = input.required<Task>();
  
  
  editTask = output<Task>();
  deleteTask = output<Task>();

  priority = computed(() => this.task().priority as TaskPriority);
  priorityConfig = TASK_PRIORITY_CONFIG;

  status = computed(() => this.task().status as TaskProgess);
  progressConfig = TASK_PROGRESS_CONFIG;

  

  onEdit() {
    this.editTask.emit(this.task());
  }

  onDelete() {
    this.deleteTask.emit(this.task());
  }
}

