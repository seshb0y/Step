import { Order } from "./Order"

export interface User {
    id: string,
    username: string,
    role: UserRole,
    email: string,
    isEmailConfirmed: boolean
    createdAt: Date,
    orders: Order[]
}

export enum UserRole
{
    Admin,
    Manager
}