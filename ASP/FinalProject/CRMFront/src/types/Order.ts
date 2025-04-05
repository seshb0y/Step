import { Client } from "./Client";
import { Task } from "./Task";
import { User } from "./User";

export enum OrderStatus {
  New = "New",
  InProgress = "InProgress",
  Completed = "Completed",
  Cancelled = "Cancelled"
}

export interface Order {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    id: number;
    orderId: number,
    totalAmount: number,
    createdAt: Date,
    tasks: Task[],
    status: OrderStatus;
    orderStatus: OrderStatus,
    users: User[],
    client: Client,
    callRecordingUrl?: string
    username: string
    budget: number;
    description: string;
}

export interface CreateOrder{
    totalAmount: number,
    clientEmail: string,
    userEmail: string,
    userId: number
}

