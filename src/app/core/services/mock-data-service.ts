
import { Injectable } from '@angular/core';
import { Task } from '../../tasks/data/models/task.model';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';  
import { Observable } from 'rxjs';

// Mock In-Mm=emory Data Service for testing purposes
@Injectable({
  providedIn: 'root',
})
export class MockDataService implements InMemoryDbService {

    createDb(reqInfo?: RequestInfo): {} | Observable<{}> | Promise<{}> {
        const tasks: Task[] = [{
            id: '1',
            title: 'develop task manager app',
            description: 'This is a sample task description.',
            status: 'pending',
            priority: 'medium',
            isActive: true,
            createdAt: new Date(),
            dueDate: new Date()
        },
        {
            id: '2',
            title: 'Reafctor codebase',
            description: 'This is another task description.',
            status: 'in-progress',
            priority: 'high',
            isActive: true,
            createdAt: new Date(),
            dueDate: new Date()
        },
        {
            id: '3',
            title: 'Write documentation',
            description: 'This is yet another task description.',
            status: 'completed',
            priority: 'low',
            isActive: false,
            createdAt: new Date(),
            dueDate: new Date()     
        }

    ];
        return { tasks };

    }  

    genId(tasks: Task[]): string {
        return crypto.randomUUID();
    }

    // Force th web Db to parse id in the URL  as string instead of number . The Entity Model uses ID = string.
//     parseRequestUrl(url: string, utils: any): any {
//     const parsed = utils.parseRequestUrl(url);
    
//     // Keep ID as string, don't convert to number
//     if (parsed.id) {
//       parsed.id = String(parsed.id);
//     }
    
//     return parsed;
//   }

  // Force the Web Db to return the Updated item in the response Body (Defualt = status code 204- No Content)
    put(reqInfo: RequestInfo) {
    const body = reqInfo.utils.getJsonBody(reqInfo.req);
        return reqInfo.utils.createResponse$(() => ({
            body,
            status: 200
        }));
    }
}