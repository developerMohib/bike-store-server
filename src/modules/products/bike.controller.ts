import { Request, Response } from 'express';
import { createProductService, getProductService } from './bike.service';

const createProduct = async (req: Request, res: Response): Promise<void> => {
    const productData = req.body;
    const result = await createProductService(productData);
    res.status(200).json({
        success: true,
        message: 'Product created successfully',
        data: result,
    });
};
const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getProductService();
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong to find data',
            error
        });
    }
};

export { createProduct, getProduct };
