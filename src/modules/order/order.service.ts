import { IError } from '../../utils/CustomError';
import { IOrder } from './order.interface';
import { Order } from './order.model';

const createOrderService = async (data: IOrder): Promise<IOrder> => {
    try {
        const newOrder = new Order(data);
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

// export here
export { createOrderService, getOrderService };
