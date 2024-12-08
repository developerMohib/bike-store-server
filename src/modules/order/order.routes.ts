import { Router } from 'express';
import {
    createOrder,
    deleteOrder,
    getOrders,
    revenueCalculate,
} from './order.controller';

const router = Router();

router.post('/api/orders', createOrder);
router.get('/api/orders', getOrders);
router.delete('/api/orders/:id', deleteOrder);

// revenue
router.get('/revenue', revenueCalculate);

// Export the router
export const orderRouter = router;
