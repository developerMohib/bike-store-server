import { ObjectId } from 'mongoose';

export interface IOrder {
    email: string;
    brand: string;
    product: ObjectId;
    quantity: number;
    totalPrice: boolean;
}
