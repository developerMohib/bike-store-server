import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProductQuery,
    getSingleProduct,
    updateOneProduct,
} from './bike.controller';

const router = Router();

router.post('/api/products', createProduct);
router.get('/api/products', getProductQuery);
router.get('/api/products/:productId', getSingleProduct);
router.put('/api/products/:productId', updateOneProduct);
router.delete('/api/products/:productId', deleteProduct);

// Export the router
export const bikeRouter = router;
