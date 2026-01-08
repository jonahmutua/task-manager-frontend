// Task Form Model For Form Controls
import { FormControl } from "@angular/forms";
import { TaskPriority } from "../models/task-priority";
import { TaskProgess } from "../models/task-progress";

export type TaskFormModel = {
  title: FormControl<string>;
  description: FormControl<string | null>;
  status: FormControl<TaskProgess>;
  priority: FormControl<TaskPriority>;
  isActive: FormControl<boolean>;
  dueDate: FormControl<Date | null>;
};