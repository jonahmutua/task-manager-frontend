import { Component, computed, effect, EventEmitter, input, Input, output, Output, signal } from '@angular/core';
import { MatCard, MatCardContent, MatCardTitle, MatCardHeader } from '@angular/material/card';
import { TaskFormComponent } from '../../ui/task-form/task-form.component';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { TaskFormModel } from '../../data/forms/task-form.model';
import { TaskFormValue } from '../../data/forms/task-form.value';
import { Task } from '../../data/models/task.model';
import { mapTaskToFormModel } from '../../data/forms/task-form.mapper';
import { map } from 'rxjs';
import { TaskFormMode } from '../../data/forms/task-form.mode';

@Component({
  selector: 'tm-edit-task-container',
  templateUrl: './edit-task-container.component.html',
  styleUrl: './edit-task-container.component.css',
  imports: [MatCard, MatCardContent, TaskFormComponent, MatCardTitle, MatCardHeader],
})
export class EditTaskContainerComponent {

  task = input<Task | null>(null);
  mode =  input<TaskFormMode>( 'create' );

  taskFormTitleLabel = computed<string>(() => {
    return this.mode() === 'edit' ? 'Edit Task' : 'New Task';
  })

  taskForm =  signal<FormGroup<TaskFormModel>>(this.buildEmptyForm());

  save = output<TaskFormValue>();
  cancel = output<void>();

  constructor() {
    effect(()=>{
      const currentTask = this.task();
      const currentForm = this.taskForm();
      const currentFormMode = this.mode();

      if( currentFormMode === 'edit' && currentTask ) { 
        currentForm.patchValue(currentTask);
      }else if( currentFormMode === 'create' ) {
        this.resetForm();
        
      }
    });
    
  }
 
  private buildEmptyForm() : FormGroup<TaskFormModel> {
    return new FormGroup<TaskFormModel>({
       title: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
       description: new FormControl( null ), 
       status: new FormControl('pending', { nonNullable: true }),
       priority: new FormControl('Medium', {nonNullable: true}), 
       isActive: new FormControl( true, { nonNullable: true }), 
       dueDate: new FormControl( null),  
    });
  }

  private resetForm() {
    const currentForm = this.taskForm();
    currentForm.reset(
      {
        title: '',
        description: null,
        status: 'pending',
        priority: 'Medium',
        isActive: true,
        dueDate: null,
      }
    );
    
    
  }


  onSave(formValue: TaskFormValue) {
    this.save.emit(formValue);
  }

  onCancel() {
    this.resetForm()
    this.cancel.emit();
  }
    
}
