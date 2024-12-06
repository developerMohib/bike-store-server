import { Router } from 'express';
import { createProduct, getProduct, getSingleProduct, updateOneProduct } from './bike.controller';

const router = Router();

router.post('/api/products', createProduct);
router.get('/api/products', getProduct);
router.get('/api/products/:productId', getSingleProduct);
router.put('/api/products/:productId', updateOneProduct);

// Export the router
export const bikeRouter = router;
