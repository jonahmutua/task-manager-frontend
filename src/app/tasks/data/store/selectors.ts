import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ITaskState, ITaskStatistics } from "../models/task.model"

export const TASK_FEATURE_KEY = 'tasks'

export const selectTaskState = createFeatureSelector<ITaskState>(TASK_FEATURE_KEY);

export const selectTasks = createSelector(selectTaskState, state => state.tasks);
export const selectNotification = createSelector(selectTaskState, state => state.notification);
export const selectError = createSelector(selectTaskState, state => state.error);

export const selectTaskStats = createSelector(
    selectTasks,
    tasks  => (
        {
            total: tasks.length,
            active: tasks.filter( task => task.status === 'pending' || task.status === 'completed').length,
            completed: tasks.filter(task => task.status === 'completed').length
        }
    ) as ITaskStatistics
);



