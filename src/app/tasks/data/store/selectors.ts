import { createFeatureSelector, createSelector } from "@ngrx/store"
import { ITaskState } from "../models/task.model"

export const TASK_FEATURE_KEY = 'tasks'

export const selectTaskState = createFeatureSelector<ITaskState>(TASK_FEATURE_KEY);

export const selectTasks = createSelector(selectTaskState, state => state.tasks);
export const selectNotification = createSelector(selectTaskState, state => state.notification);
export const selectError = createSelector(selectTaskState, state => state.error);

