import { TaskPriority } from "./task-priority";
import { TaskProgess } from "./task-progress";

export interface Task {
  id?: string ;
  title: string;
  description?: string;
  status: TaskProgess;
  priority: TaskPriority;
  dueDate?: Date;
  createdAt: Date;
  isActive: boolean;
}


export interface ITaskState {
    tasks: Task[];
    isLoading: boolean;
    notification: string | null;
    error : string | null;
}

export interface ITaskStatistics {
  total: number; 
  active: number;         /* tasks whose status is either 'pending' or 'in-progress' */
  completed: number;      /* tasks whose status is 'completed' */
}

