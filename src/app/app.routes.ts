import { Routes } from '@angular/router';
import { TaskFormComponent } from './tasks/ui/task-form/task-form.component';
import { TaskPageComponent } from './tasks/pages/task-page/task-page.component';

export const routes: Routes = [
    {
        path: 'tasks',
        //component: () => import('./tasks/pages/task-page/task-page.component').then(m => m.TaskPageComponent)   
        component: TaskPageComponent
    },
    {
        path: '',
        redirectTo: 'tasks',
        pathMatch: 'full'
    }
];
