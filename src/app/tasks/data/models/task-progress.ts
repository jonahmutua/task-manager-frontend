export type TaskProgess = 'pending' | 'in-progress' | 'completed';

export interface ITaskProgress {
    icon: string;
    label: string;
    colorClass: string;
}

export const TASK_PROGRESS_CONFIG: Record<TaskProgess, ITaskProgress> = {
    pending: {
        icon: 'radio_button_unchecked',
        label: 'Pending',
        colorClass: 'status-pending'
    },
    
    "in-progress": {
        icon:'autorenew',
        label: 'In-Progress',
        colorClass: 'status-in-progress'
    },

    completed: {
        icon:'checked_circle',
        label: 'Completed',
        colorClass: 'status-completed'
    },

}

export const TASK_PROGRESS_LABELS: Record<TaskProgess, string> = {
    pending:        'Pending',
    "in-progress": 'In-progress',
    completed:     'Completed',
  
}