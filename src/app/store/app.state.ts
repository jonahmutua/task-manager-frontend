import { ITaskState } from "../tasks/data/models/task.model";
import { ActionReducerMap } from "@ngrx/store";
import { taskReducer } from "../tasks/data/store/reducer";

export interface AppState {
    tasks: ITaskState;
}

export const reducers: ActionReducerMap<AppState> = {
    tasks: taskReducer,
}
