import { inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Task } from "../models/task.model";
import { HttpClient, } from "@angular/common/http";
import { ITaskService } from "./task.service.interface";

@Injectable({
    providedIn: "root"
})
export class  TaskNgrxService implements ITaskService{

    private baseUrl: string = 'api/tasks';
    private http = inject(HttpClient);
    

    loadTasks(): Observable<Task[]> {
        return this.http.get<Task[]>(this.baseUrl);
    }

    getTaskById(id: string): Observable<Task> {
        return this.http.get<Task>(`${this.baseUrl}/${id}`);
    }

    createTask(task: Task): Observable<Task> {
        return this.http.post<Task>(this.baseUrl, task);
    } 

    updateTask(task: Task) {
        return this.http.put<Task>(`${this.baseUrl}/${task.id}`, task);
    }

    deleteTask(id: string ): Observable<void> {
        return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
}