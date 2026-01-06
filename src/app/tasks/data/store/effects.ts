import { effect, inject, Injectable } from "@angular/core";
import { Actions, createEffect, ofType} from "@ngrx/effects"
import { TaskNgrxService } from "../services/task.ngrx.service";
import * as TaskActions from './actions';
import { catchError, concatMap, map, merge, mergeMap, of, pipe, switchMap, tap, timeout } from "rxjs";

@Injectable()
export class TaskEffects {
    private action$ = inject(Actions);
    private taskService = inject(TaskNgrxService);

    loadTask$ = createEffect(()=>
        this.action$.pipe(
            ofType(TaskActions.loadTasks),
            switchMap(()=>
                this.taskService.loadTasks().pipe(
                    map(tasks => TaskActions.loadTasksSuccess({
                        tasks, 
                        notification: `Loaded ${tasks.length} task(s) successfully.`})
                    ), 
                    catchError( error => 
                        of(TaskActions.loadTasksFailure({error: error.message}))
                    )
                )
            )
        )
    )

    createTask$ = createEffect(()=>
        this.action$.pipe(
            ofType(TaskActions.createTask),
            concatMap(({task})=>
                this.taskService.createTask(task).pipe(
                    map((task)=> TaskActions.createTaskSuccess({
                        task,
                        notification: `New task "${task.title}" created successfully`})
                    ),
                    catchError( (error)=> of(TaskActions.createTaskFailure({error: error.error?.message?? `Failed to create task`}))
                    ) 
                )
            )
        )
    )

    updateTask$ = createEffect(()=>
        this.action$.pipe(
            ofType(TaskActions.updateTask),
            concatMap(({task})=>
                this.taskService.updateTask(task).pipe(
                    map(task => 
                        TaskActions.updateTaskSuccess({
                            task,
                            notification: `Updated "${task.title}" task successfully`
                        })
                    ),
                    catchError( error =>
                        of(TaskActions.updateTaskFailure({error: error.error?.message?? `Failed to update task`}))
                    )
                )
            )
        )
    )

    deleteTask$ = createEffect(()=>
        this.action$.pipe(
            ofType(TaskActions.deleteTask),
            mergeMap(({id}) => 
                this.taskService.deleteTask(id).pipe(
                    map( () => 
                        TaskActions.deleteTaskSuccess({ 
                            id,
                            notification: `Task id "${id}" deleted successfuly`
                        })
                    ),
                    catchError( err => of(
                        TaskActions.deleteTaskFailure({error: err.error?.message?? `Failed to delete the task`}))
                    )
                )
            )
        )
    );
}