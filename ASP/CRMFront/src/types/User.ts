import { Client } from "./Client"
import { Order } from "./Order"
import { Task } from "./Task"

export interface User {
    userId: string,
    username: string,
    role: number,
    email: string,
    isEmailConfirmed: boolean,
    createdAt: Date,
    orders: Order[],
    clients: Client[],
    tasks: Task[]
}

export const UserRole = {
    Admin: 0,
    Manager: 1
} as const;