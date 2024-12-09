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
        const objectId = new Types.ObjectId(id);
        const result = await Order.findByIdAndDelete({ _id: objectId });
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

const revenueCalculateService = async () => {
    try {
        const calculateRevenue = await Order.aggregate([
            {
                $lookup: {
                    from: 'products',       // this the collection
                    localField: 'product',  // in local field i save id to product - local means order collection
                    foreignField: '_id',    // in product collection data save with _id
                    as: 'totalProducts',    // i save data by named products details
                },
            },
            // Unwind totalProducts => to access the price field
            { $unwind: '$totalProducts' },

            // Project price fields and calculate revenue per order
            {
                $project: {
                    email: 1,
                    product: 1,
                    quantity: 1,
                    productPrice: '$totalProducts.price',
                    orderRevenue: {
                        $multiply: ['$quantity', '$totalProducts.price'],
                    },
                },
            },

            // calculate total revenue and grouping
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$orderRevenue' },
                },
            },
        ]);
        const totalRevenue =
            calculateRevenue.length > 0 ? calculateRevenue[0].totalRevenue : 0;

        return totalRevenue;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// export here
export {
    createOrderService,
    getOrderService,
    deleteOrderService,
    revenueCalculateService,
};
