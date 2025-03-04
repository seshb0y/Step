import { Order } from "./Order"

export interface Client {
    userName: string,
    email: string,
    isEmailConfirmed: boolean,
    phone: string,
    address: string,
    createdAt: string
    orders: Order[]
}
