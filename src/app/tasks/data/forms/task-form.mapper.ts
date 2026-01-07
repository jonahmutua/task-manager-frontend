import { FormControl, FormGroup } from "@angular/forms";
import { Task } from "../models/task.model";
import { TaskFormModel } from "./task-form.model";
import { TaskFormValue } from "./task-form.value";

export function mapTaskToFormModel(task: Task) : FormGroup<TaskFormModel> {
    return new FormGroup<TaskFormModel>({
        title: new FormControl(task.title, { nonNullable: true }),
        description: new FormControl(task.description??  null),
        status: new FormControl(task.status, { nonNullable: true }),
        priority: new FormControl(task.priority, {nonNullable: true}),
        isActive: new FormControl(task.isActive, { nonNullable: true }),
        dueDate: new FormControl(task.dueDate?? null),
    });         
}

export function mapFormValueToTask(formValue: TaskFormValue, existingTask: Task | undefined): Task {
   
   if(existingTask){
        return { 
            ...existingTask,
            id: existingTask.id,
            title: formValue.title,
            description: formValue.description ?? undefined,
            priority: formValue.priority,
            status: formValue.status?? 'pending',
            dueDate: formValue.dueDate ?? undefined,
        
        }
    }

     return { 
        title: formValue.title,
        description: formValue.description ?? undefined,
        status: formValue.status?? 'pending',
        priority: formValue.priority,
        dueDate: formValue.dueDate ?? undefined,
        createdAt: new Date(),
        isActive: formValue.isActive,
    }
}