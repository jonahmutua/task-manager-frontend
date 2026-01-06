import { Observable } from "rxjs";
import { Task } from "../models/task.model";

export interface ITaskService {
    loadTasks() : Observable<Task[]>;
    getTaskById(id:string): Observable<Task>
    createTask(task: Task): Observable<Task>;
    updateTask(task: Task): Observable<Task>;
    deleteTask(id: string): Observable<void>;
}