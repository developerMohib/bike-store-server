import { Router } from 'express';
import { createOrder, deleteOrder, getOrders } from './order.controller';

const router = Router();

router.post('/api/orders', createOrder);
router.get('/api/orders', getOrders);
router.delete('/api/orders', deleteOrder);

// Export the router
export const orderRouter = router;
