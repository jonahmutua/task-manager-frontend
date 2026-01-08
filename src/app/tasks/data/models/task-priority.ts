export  type TaskPriority = 'low' | 'medium' | 'high';

export interface ITaskPriorityConfig {
    icon: string;
    label: string;
    colorClass: string;
}

export const PRIORITY_ICON_MAP: Record<TaskPriority, string> = {
    low: 'check_circle',
    medium: 'remove',
    high: 'warning',
  };

export const TASK_PRIORITY_CONFIG: Record<TaskPriority, ITaskPriorityConfig> = {
    low: {
        icon: 'check_circle',
        label: 'Low',
        colorClass: 'low'
    },

    medium: {
        icon: 'remove',
        label: 'Medium',
        colorClass: 'medium'
    },

    high: {
        icon: 'warning',
        label: 'High',
        colorClass: 'high'  
    }

}

export const TASK_PRIORITY_LABELS: Record<TaskPriority, string> = {
    low: "Low",
    medium: "Medium",
    high: "High"
}