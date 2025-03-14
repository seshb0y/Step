import { Client } from "./Client";
import { Task } from "./Task";
import { User } from "./User";

export interface Order {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: number;
    orderId: number,
    totalAmount: string,
    createdAt: Date,
    tasks: Task[],
    status: OrderStatus;
    orderStatus: OrderStatus,
    users: User[],
    client: Client,
}

export enum OrderStatus
{
    New,
    Processing,
    Completed
}