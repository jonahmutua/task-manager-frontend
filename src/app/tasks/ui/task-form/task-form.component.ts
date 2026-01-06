import { Component, EventEmitter, input, Input, output, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TaskFormModel } from '../../data/forms/task-form.model';
import { TaskFormValue } from '../../data/forms/task-form.value';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'tm-task-form',
  standalone: true,
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css',
  imports: [MatCardModule, MatListModule, MatDatepickerModule, MatNativeDateModule, MatFormFieldModule, MatSelectModule, MatCheckboxModule, ReactiveFormsModule, MatInputModule],
})
export class TaskFormComponent {

  form = input.required<FormGroup<TaskFormModel>>();  

  save = output<TaskFormValue>();
  
  cancel = output<void>();

  onSave() {
    this.save.emit(this.form().getRawValue());
  }

  onCancel() {
    this.cancel.emit();
  }

}