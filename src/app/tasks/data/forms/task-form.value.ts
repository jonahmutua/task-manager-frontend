// Task Form Values for Task Form
export type TaskFormValue = {
    title: string;
    description: string | null;
    status: 'pending' | 'in-progress' | 'completed';
    isActive: boolean;
    dueDate: Date | null;
};