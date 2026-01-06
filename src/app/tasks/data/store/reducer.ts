import { createReducer, on } from "@ngrx/store";
import { ITaskState } from "../models/task.model";
import * as TaskActions from "./actions"

export const initialState: ITaskState = {
    tasks: [],
    isLoading: false,
    notification: null,
    error: null
}

export const taskReducer = createReducer(
    initialState,
    on(TaskActions.loadTasks, state => ({
        ...state,
         isLoading: true,
         notification: null,
         error: null
        })
    ),

    on(TaskActions.loadTasksSuccess, (state, {tasks, notification}) => ({
        ...state,
        tasks,
        isLoading:false,
        notification: notification?? null,
        error: null
    })),

    on(TaskActions.loadTasksFailure, (state, {error}) => ({
        ...state,
        error: error?? `Failed to load tasks`
    })),

    on(TaskActions.createTask, (state, {task})=> ({
        ...state,
        isLoading: false,
        notification: null,
        error: null
    })),

    on(TaskActions.createTaskSuccess, (state, {task, notification})=> ({
        ...state,
        tasks: [...state.tasks, task],
        notification: notification?? null,
    })),

    on(TaskActions.createTaskFailure, (state, {error})=> ({
        ...state,
        error: error?? `Unexpected error: Failed to create new task`
    })),

    on(TaskActions.updateTask, (state, {task})=> ({
        ...state,
        isLoading: false,
        notification: null,

    })),

    on(TaskActions.updateTaskSuccess, (state, {task, notification})=>({
        ...state,
        tasks: state.tasks.map( current => current.id === task.id ? task : current),
        notification,
        isLoading: false,
        error: null
    })),

    on(TaskActions.updateTaskFailure,(state, {error})=>({
        ...state,
        error
    })),

    on(TaskActions.deleteTask, (state)=>({
        ...state,
        isLoading: false,
        error: null,
        notification: null
    })),

    on(TaskActions.deleteTaskSuccess, (state, {id, notification}) => ({
        ...state, 
        tasks: state.tasks.filter( currentTask => currentTask.id !== id ),
        notification
    })),

    on(TaskActions.deleteTaskFailure, (state, {error}) => ({
        ...state,
        error
    }))
)