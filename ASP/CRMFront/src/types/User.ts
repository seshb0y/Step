import { Client } from "./Client"
import { Order } from "./Order"
import { Task } from "./Task"

export interface User {
    userId: string,
    username: string
    // userName: string,
    userRole: UserRole,
    email: string,
    isEmailConfirmed: boolean
    createdAt: Date,
    orders: Order[]
    clients: Client[],
    tasks: Task[]
}

export enum UserRole
{
    Admin,
    Manager
}