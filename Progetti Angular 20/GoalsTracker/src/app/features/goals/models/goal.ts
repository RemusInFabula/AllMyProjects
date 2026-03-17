import { Task } from "./task";
export interface Goal {
  id: number;
  title: string;
  tasks: Task[];
}