export interface Task {
  id?: string ;
  title: string;
  description?: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'Low' | 'Medium' | 'High';
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