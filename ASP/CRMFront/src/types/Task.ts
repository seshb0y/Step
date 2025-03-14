import { Order } from "./Order"
import { User } from "./User"

export interface Task {
    taskId: number
    id: number
    title: string,
    description: string,
    taskStatus: TaskStatus
    dueDate: Date
    order: Order
    userTasks: { user: User }[];
}


export enum TaskStatus
{
    New,
    InProgress,
    Completed
}