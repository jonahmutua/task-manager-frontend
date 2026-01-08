import { TaskPriority } from "../models/task-priority";
import { TaskProgess } from "../models/task-progress";

// Task Form Values for Task Form
export type TaskFormValue = {
    title: string;
    description: string | null;
    status: TaskProgess;
    priority: TaskPriority;
    isActive: boolean;
    dueDate: Date | null;
};