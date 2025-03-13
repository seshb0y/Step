import { Client } from "./Client"
import { Order } from "./Order"

export interface User {
    username: string
    id: string,
    userName: string,
    role: UserRole,
    email: string,
    isEmailConfirmed: boolean
    createdAt: Date,
    orders: Order[]
    clients: Client[],
}

export enum UserRole
{
    Admin,
    Manager
}