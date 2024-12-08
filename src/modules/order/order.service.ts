import { Types } from 'mongoose';
import { IError } from '../../utils/CustomError';
import { Order } from './order.model';

import { IOrder } from './order.interface';

const createOrderService = async ({
    email,
    product,
    quantity,
    totalPrice,
}: IOrder) => {
    try {
        const newOrder = new Order({ email, product, quantity, totalPrice });
        const result = await newOrder.save();
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// get all products
const getOrderService = async (): Promise<IOrder[] | null> => {
    try {
        const result = await Order.find();
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// delete a order
const deleteOrderService = async (id: string): Promise<IOrder | null> => {
    try {
        console.log('25 ', id);
        const objectId = new Types.ObjectId(id);
        const result = await Order.findByIdAndDelete({ _id: objectId });
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// export here
export { createOrderService, getOrderService, deleteOrderService };
