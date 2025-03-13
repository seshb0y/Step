import { Order } from "./Order"
import { User } from "./User"

export interface Task {
    id: number
    title: string,
    description: string,
    status: TaskStatus
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