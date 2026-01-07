// Task Form Model For Form Controls
import { FormControl } from "@angular/forms";

export type TaskFormModel = {
  title: FormControl<string>;
  description: FormControl<string | null>;
  status: FormControl<'pending' | 'in-progress' | 'completed'>;
  priority: FormControl<'Low' | 'Medium' | 'High'>;
  isActive: FormControl<boolean>;
  dueDate: FormControl<Date | null>;
};