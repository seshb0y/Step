import { Task } from "./Task";

export interface Order {
    orderId: string,
    totalAmount: string,
    createdAt: Date,
    tasks: Task
    status: OrderStatus
}

export enum OrderStatus
{
    New,
    Processing,
    Completed
}