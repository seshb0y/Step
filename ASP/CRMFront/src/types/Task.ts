import { Order } from "./Order"
import { User } from "./User"

export interface Task {
    taskId: number
    id: number
    title: string,
    description: string,
    status: TaskStatus
    dueDate: Date
    order: Order
    userTasks: { user: User }[];
    username: string
    orderId: string
}

export interface CreateTask{
    title: string,
    description: string,
    endDate: Date,
    userName: string,
    orderId: number,
}

export enum TaskStatus
{
    New,
    InProgress,
    Completed
}