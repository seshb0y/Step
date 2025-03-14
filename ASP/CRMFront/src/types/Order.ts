import { Client } from "./Client";
import { Task } from "./Task";
import { User } from "./User";

export interface Order {
    id: number;
    orderId: number,
    totalAmount: string,
    createdAt: Date,
    tasks: Task[],
    orderStatus: OrderStatus,
    user: User[],
    client: Client,
}

export enum OrderStatus
{
    New,
    Processing,
    Completed
}