import { Router } from 'express';
import {
    createProduct,
    deleteProduct,
    getProductQuery,
    getSingleProduct,
    updateOneProduct,
} from './bike.controller';

const router = Router();

router.post('/products', createProduct);
router.get('/products', getProductQuery);
router.get('/products/:productId', getSingleProduct);
router.put('/products/:productId', updateOneProduct);
router.delete('/products/:productId', deleteProduct);

// Export the router
export const bikeRouter = router;
