import { Router } from 'express';
import {
    createOrder,
    deleteOrder,
    getOrders,
    revenueCalculate,
} from './order.controller';

const router = Router();

router.post('/orders', createOrder);
router.get('/orders', getOrders);
router.delete('/orders/:id', deleteOrder);

// revenue
router.get('/revenue', revenueCalculate);

// Export the router
export const orderRouter = router;
