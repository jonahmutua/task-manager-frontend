import { createAction, props} from "@ngrx/store";
import { Task } from "../models/task.model";

export const taskActions = {
    loadTasks: "[Task] Load Tasks",
    loadTasksSuccess: "[Task] Load Tasks Success",
    loadTasksFailure: "[Task] Load Tasks Failure",
    createTask: "[Task] Create Task",
    createTaskSuccess: "[Task] Create Task Success",
    createTaskFailure: "[Task] Create Task Failure",
    updateTask: "[Task] Update Task",
    updateTaskSuccess: "[Task] Update Task Success",
    updateTaskFailure: "[Task] Update Task Failure",
    deleteTask: "[Task] DeleteTask",
    deleteTaskSuccess: "[Task] Delete Task Success",
    deleteTaskFailure: "[Task] Delete Task Failure"
}

export const loadTasks = createAction( taskActions.loadTasks);

export const loadTasksSuccess = createAction(
    taskActions.loadTasksSuccess,
    props<{tasks: Task[]; notification: string | null}>()
);

export const loadTasksFailure = createAction(
    taskActions.loadTasksFailure,
    props<{error: string | null}>()
);

export const createTask = createAction(
    taskActions.createTask,
    props<{task: Task}>()
);

export const createTaskSuccess = createAction(
    taskActions.createTaskSuccess,
    props<{task: Task; notification: string | null}>()
)
export const createTaskFailure = createAction(
    taskActions.createTaskFailure,
    props<{error: string | null}>()
)

export const updateTask = createAction(
    taskActions.updateTask,
    props<{task: Task}>()
);

export const updateTaskSuccess = createAction(
    taskActions.updateTaskSuccess,
    props<{task: Task; notification: string | null}>()
)
export const updateTaskFailure = createAction(
    taskActions.updateTaskFailure,
    props<{error: string | null}>()
)

export const deleteTask = createAction(
    taskActions.deleteTask,
    props<{id: string}>()
);

export const deleteTaskSuccess = createAction(
    taskActions.deleteTaskSuccess,
    props<{id: string , notification: string | null}>()
);

export const deleteTaskFailure = createAction(
    taskActions.deleteTaskFailure,
    props<{error: string | null}>()
);