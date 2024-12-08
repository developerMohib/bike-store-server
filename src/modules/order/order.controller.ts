import { Request, Response } from 'express';
import {
    createOrderService,
    deleteOrderService,
    getOrderService,
    revenueCalculateService,
} from './order.service';
import { Product } from '../products/bike.model';

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

        const existProduct = await Product.findById(product);
        if (!existProduct) {
            res.status(404).json({
                message: 'Product not found',
                status: false,
            });
            return;
        }

        // instock availability
        if (existProduct.quantity < quantity) {
            res.status(400).json({
                message: 'Insufficient stock',
                status: false,
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
        await deleteOrderService(id);
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
            data: {},
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

// total revenue
const revenueCalculate = async (req: Request, res: Response) => {
    try {
        // here code

        const totalRevenue = await revenueCalculateService();

        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
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

export { createOrder, getOrders, deleteOrder, revenueCalculate };
