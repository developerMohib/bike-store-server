import { Request, Response } from 'express';
import {
    createOrderService,
    deleteOrderService,
    getOrderService,
} from './order.service';

const createOrder = async (req: Request, res: Response): Promise<void> => {
    try {
        // here will be functionality
        const { email, product, quantity, totalPrice } = req.body;
        if (!email || !product || !quantity || !totalPrice) {
            res.status(400).json({
                status: false,
                message:
                    'Missing required fields: email, product, quantity or totalPrice',
            });
            return;
        }

        const result = await createOrderService({
            email,
            product,
            quantity,
            totalPrice,
        });

        res.status(201).json({
            status: true,
            message: 'Order created successfully',
            data: result,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        } else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
};

// get all orders
const getOrders = async (req: Request, res: Response) => {
    try {
        const result = await getOrderService();
        res.status(200).json({
            success: true,
            message: 'All order retrive successfully',
            data: result,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        } else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
};

// delete order
const deleteOrder = async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        console.log('50 ', id);

        const result = await deleteOrderService(id);
        res.status(200).json({
            success: true,
            message: 'User deleted successfully',
            data: result,
        });
    } catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        } else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
};

export { createOrder, getOrders, deleteOrder };
