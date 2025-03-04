import { Order } from "./Order"

export interface Task {
    title: string,
    description: string,
    status: TaskStatus
    dueTime: Date
    order: Order
}


export enum TaskStatus
{
    New,
    InProgress,
    Completed
}