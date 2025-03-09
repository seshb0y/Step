import { Order } from "./Order"
import { User } from "./User"

export interface Client {
    id?: string,
    name: string,
    email: string,
    isEmailConfirmed?: boolean,
    phone: string,
    address: string,
    createdAt: string,
    orders?: Order[],
    users?: User[]
}
