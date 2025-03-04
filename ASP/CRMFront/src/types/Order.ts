import { Task } from "./Task";

export interface Order {
    orderId: string,
    totalAmount: string,
    createdAt: Date,
    tasks: Task
}