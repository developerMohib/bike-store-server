import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>({
    email: {
        type: String,
        unique: true,
        trim: true,
        required: [true, 'Provide your Email, Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
    },
    brand: {
        type: String,
        required: [true, 'Product brand name is required'],
        trim: true,
    },
    product: {
        type: String,
        required: [true, 'Product name is required'],
        trim: true,
    },
    quantity: {
        type: Number,
        required: [true, 'Quantity is required'],
        min: [0, 'Quantity should be a positive number'],
        trim: true,
    },
    totalPrice: {
        type: Number,
        required: [true, 'Total Price is required'],
        min: [0, 'Price Price should be a positive number'],
        trim: true,
    },
});

const Order = model<IOrder>('Order', orderSchema);

export { Order };
