import { Router } from 'express';
import { createProduct, getProduct } from './bike.controller';

const router = Router();

router.post('/api/products', createProduct);
router.get('/api/products', getProduct);

// Export the router
export const bikeRouter = router;
