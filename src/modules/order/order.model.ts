import { model, Schema } from 'mongoose';
import { IOrder } from './order.interface';

const orderSchema = new Schema<IOrder>(
    {
        email: {
            type: String,
            unique: true,
            trim: true,
            lowercase: true,
            required: [true, 'Provide your Email, Email is required'],
            match: [/^\S+@\S+\.\S+$/, 'Invalid email format'],
            immutable: true,
        },
        product: {
            type: Schema.Types.ObjectId, // Reference to Product model
            ref: 'Product',
            trim: true,
            required: [true, 'Product name is required'],
        },
        quantity: {
            type: Number,
            required: [true, 'Quantity is required'],
            min: [1, 'Quantity must be at least 1'],
        },
        totalPrice: {
            type: Number,
            required: [true, 'Total Price is required'],
            min: [0, 'Price should be a positive number'],
        },
    },
    {
        timestamps: true,
    }
);

const Order = model<IOrder>('Order', orderSchema);

export { Order };
