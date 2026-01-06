import { computed, DestroyRef, inject, Injectable, signal } from "@angular/core";
import { Task, ITaskState } from "../models/task.model";
import { HttpClient, } from "@angular/common/http";
import { catchError, EMPTY, Observable, of, pipe, shareReplay, Subject, switchMap, tap, throwError, timeout } from "rxjs";
import { takeUntilDestroyed, } from "@angular/core/rxjs-interop";
import { ITaskService } from "./task.service.interface";

// Simple state management in the servie 
// The service owns the state, - only  service can update state - No external components can update state directly
// ensuring a single source of truth
// Exposes substates as reactive signals 

@Injectable({
  providedIn: 'root'
})
export class TaskService implements ITaskService {

	destroyRef = inject(DestroyRef);
	http = inject(HttpClient);
	private apiUrl = '/api/tasks';

	// Global state 
	private taskState = signal<ITaskState>({
		tasks: [], 
		isLoading:false, 
		error: null, 
		notification: null});

	// expose substates as signals 
	tasks = computed<Task[]>(() => this.taskState().tasks);
    notification = computed<string | null>(()=> this.taskState().notification);
    error = computed<string | null>(()=> this.taskState().error);

	// One - off Operations - Fine to have these not tracked in Gloabl state
	private _task = signal<Task | undefined>( undefined);
    task = computed(()=> this._task());

	// load tasks uses subject to ensure Tasks are shared among subscribers 
	private loadTasksTrigger$ = new Subject<void>;
	private loadTasks$  = this.loadTasksTrigger$.pipe(
		switchMap(()=> 
			this.http.get<Task[]>(this.apiUrl).pipe(
				// timeout(200), // uncomment and set responses Delay in DB - simulates error
				tap( tasks => 
					this.patchState({
						tasks,
						notification: `"Retreived tasks successfully"`
					})
				),
				catchError( err => {
					this.patchState({ error: `Failed to load tasks`});
					return of([]); 
				}),						
			)
		), 
		shareReplay(1) // cache the last emitted Tasks for any subscriber
	)

	constructor() {
		this.loadTasks$.pipe(takeUntilDestroyed()).subscribe(); // ensure the observable is Hot and auto unsubscribe when service is destroyed
	}

	loadTasks(): Observable<Task[]> {
		this.patchState({
			notification: null,
			error: null,
			isLoading: false
		})

		this.loadTasksTrigger$.next();
		return this.loadTasks$;
	}

	// One - off operation - Fine to keep state local and let consumer subscribe manually.
	getTaskById(id: string): Observable<Task> {
		return  this.http.get<Task>(`${this.apiUrl}/{id}`).pipe(
			 tap( task => this._task.set( task)),
			 catchError( err =>  throwError(()=> err))
			 );
	}
	
	createTask(task: Task): Observable<Task> {
		const request$ =  this.http.post<Task>(this.apiUrl, task).pipe(
			tap( newTask => 
				this.patchState({
					tasks: [...this.taskState().tasks, newTask],
					notification: `New task "${newTask?.title}" created`
				})
			),
			catchError( err => {
				this.patchState({error: err.error?.message?? `Failed to create "${task.title}" task`});
				return throwError(()=> err)
			})
		)

		request$.subscribe()
		return request$;
	}

	updateTask(task: Task): Observable<Task> {
		this.patchState({error: null, notification: null});

        const request$ = this.http.put<Task>(`${this.apiUrl}/${task.id}`, task).pipe(
                tap(() => {
                    this.patchState({
						tasks: this.taskState().tasks.map(t=> t.id === task?.id? task : t),
						notification: `Updated "${task?.title}" successfully!`})
                }),
                catchError(err => {
					this.patchState({error: err.error?.message?? `Failed  to update "${task?.title}" task`});
                    return EMPTY;
                })
            );

           request$.subscribe();
		   return request$;
	}

	deleteTask(id: string): Observable<void> {
		this.patchState({error: null, notification: null});

        const request$ = this.http.delete<void>(`${this.apiUrl}/${id}`)
            .pipe(
                tap(() => {
                	this.patchState({
						tasks: this.taskState().tasks.filter(task=> task.id !== id), 
						notification: `Deleted task successfully`});   
                }),

				catchError( err => {
					this.patchState({
						error: err.error?.message?? `Failed to delete '${id}" id`,
						notification: null,
					})
					return EMPTY;
				})
            )
            
		request$.subscribe();
		return request$;
	}

	private patchState(partial: Partial<ITaskState>): void {
		this.taskState.update((current)=>({
			...current,
			...partial
		}))
		console.log("Tasks: ", this.taskState().tasks);
	}

}