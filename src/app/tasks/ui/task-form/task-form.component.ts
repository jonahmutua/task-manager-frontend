import { Component, input, output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskFormModel } from '../../data/forms/task-form.model';
import { TaskFormValue } from '../../data/forms/task-form.value';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { TASK_PROGRESS_LABELS, TaskProgess } from '../../data/models/task-progress';
import { TASK_PRIORITY_LABELS, TaskPriority } from '../../data/models/task-priority';

@Component({
  selector: 'tm-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  imports: [MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, MatInputModule, MatButtonModule],
})
export class TaskFormComponent {

  form = input.required<FormGroup<TaskFormModel>>();  

  save = output<TaskFormValue>();
  
  cancel = output<void>();

  readonly taskStatuses = Object.entries(TASK_PROGRESS_LABELS).map( ([value, label]) =>
    ({value, label})
  ) as readonly { value: TaskProgess; label: string}[];

  readonly taskPriorities = Object.entries(TASK_PRIORITY_LABELS).map(([value, label]) => 
    ({value, label})
  ) as readonly {value: TaskPriority; label: string}[];

  onSave() {
    this.save.emit(this.form().getRawValue());
  }

  onCancel() {
    this.cancel.emit();
  }

}