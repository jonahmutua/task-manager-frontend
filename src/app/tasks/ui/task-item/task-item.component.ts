import { Component, EventEmitter, input, Input, output, Output, } from '@angular/core';
import { Task } from '../../data/models/task.model';
import { MatListItem, MatListItemIcon } from "@angular/material/list";
import { CommonModule } from '@angular/common';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'tm-task-item',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './task-item.component.html',
  styleUrl: './task-item.component.css',
})
export class TaskItemComponent {

  task = input.required<Task>();

  editTask = output<Task>();
  deleteTask = output<Task>();

  onEdit() {
    this.editTask.emit(this.task());
  }

  onDelete() {
    this.deleteTask.emit(this.task());
  }
}

