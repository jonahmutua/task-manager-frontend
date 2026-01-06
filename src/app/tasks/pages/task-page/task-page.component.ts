import { Component, computed, DestroyRef, effect, inject, OnInit, Signal, signal } from '@angular/core';
import { TaskService } from '../../data/services/task.service';
import { TaskFormValue } from '../../data/forms/task-form.value';
import { Task } from '../../data/models/task.model';
import { EditTaskContainerComponent } from "../../containers/edit-task-container/edit-task-container.component";
import { TaskFormMode } from '../../data/forms/task-form.mode';
import { TaskListContainerComponent } from "../../containers/task-list-container/task-list-container.component";
import { mapFormValueToTask } from '../../data/forms/task-form.mapper';
import { SnackBarService } from '../../../snackbar/snackbar.service';
import { TaskNgrxService } from '../../data/services/task.ngrx.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { selectError, selectNotification, selectTasks } from '../../data/store/selectors';
import * as TaskActions from "../../data/store/actions"
import { catchError, tap, throwError } from 'rxjs';

@Component({
selector: 'tm-task-page',
standalone: true,
imports: [ EditTaskContainerComponent, TaskListContainerComponent],
templateUrl: './task-page.component.html',
styleUrl: './task-page.component.css',

})
export class TaskPageComponent implements OnInit {

	private taskService = inject(TaskNgrxService);

	private snackbarService = inject(SnackBarService);
	private destroyRef = inject(DestroyRef);

	// SIMPLE state management 
	// tasks = this.taskService.tasks;
	// notification = this.taskService.notification;
	// error = this.taskService.error;

	// NGRX state management 
	store = inject(Store<AppState>);
	tasks = this.store.selectSignal(selectTasks);
	notification = this.store.selectSignal( selectNotification);
	error = this.store.selectSignal(selectError);


	private selectedTaskState = signal<Task | null>(null);
	selectedTask = computed(() => this.selectedTaskState());


	private formModeState = signal<TaskFormMode>('create');
	formMode = computed<TaskFormMode>(() =>this.formModeState());

	private notiEffect = effect( () => {
			const notif = this.notification()
			if(!notif )  return;
			this.snackbarService.info( notif );     
		})  ;

	private errorEffect = effect( ()=>{
		const err = this.error();
		if( !err ) return;
		this.snackbarService.error( err);
	})

	ngOnInit() {
		// NGRX state management 
		this.store.dispatch(TaskActions.loadTasks());

		//simple state management - signals
		//this.taskService.loadTasks(); 

		// simulate getTaskById()
		this.taskService.getTaskById('1').pipe(
			tap( task => console.log("Task wid id 1: ", JSON.stringify(task))),
			catchError( err => {
				console.log(`${err}`);
				return throwError( () => err)
			})
		).subscribe();

	}

	handleSave(formValue: TaskFormValue) {  
		// Handle form save logic here
		console.log('Form Saved', formValue);
		if( this.formMode() === 'edit'  ) {
			const updatedTask = mapFormValueToTask(formValue, this.selectedTask() ?? undefined);
			//this.taskService.updateTask(mapFormValueToTask(formValue, this.selectedTask()?? undefined));  //Simple State management 
			this.store.dispatch(TaskActions.updateTask({task: updatedTask}));
		} else {
			const newTask = mapFormValueToTask(formValue, undefined);
			//this.taskService.createTask(newTask);  // Simple State management ( service owns & manages app state)
			this.store.dispatch(TaskActions.createTask({task: newTask}))
		} 

		this.selectedTaskState.set(null);
		this.formModeState.set('create');
	}

	handleCancel() {
		this.selectedTaskState.set(null);
		this.formModeState.set('create');

		this.taskService.getTaskById('1').pipe(
			tap( task => console.log("Task wid id 1: ", JSON.stringify(task))),
			catchError( err => {
				console.log(`${err}`);
				return throwError( () => err)
			})
		).subscribe();

	}

	handleEditTask(task: Task) {
		this.formModeState.set('edit');
		this.selectedTaskState.set(task);
	}

	handleDeleteTask(task:  Task) {
		const id = task.id;
		if( !id ) return;
		//this.taskService.deleteTask( id ); // simple task state management 
		this.store.dispatch(TaskActions.deleteTask({id}));
	}

	
}