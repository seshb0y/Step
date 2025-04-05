import { Client } from "./Client";
import { Task } from "./Task";
import { User } from "./User";

export enum OrderStatus {
    New = "New",
    InProgress = "InProgress",
    Completed = "Completed"
}

export interface Order {
    id?: number;
    orderId: string;
    totalAmount: number;
    createdAt?: Date;
    tasks?: Task[];
    status: OrderStatus;
    users?: User[];
    client?: Client;
    callRecordingUrl?: string;
    username?: string;
    budget?: number;
    description?: string;
}

export interface CreateOrder {
    totalAmount: number;
    clientEmail: string;
    userEmail: string;
    userId: number;
}

