import { Request, Response } from 'express';
import {
    createProductService,
    getProductService,
    getSingleProductService,
    updateProductService,
} from './bike.service';

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData = req.body.productData;
        const result = await createProductService(productData);
        res.status(200).json({
            success: true,
            message: 'Product created successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong to find data',
            error,
        });
    }
};

// get all products
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
            error,
        });
    }
};

// get single product
const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const result = await getSingleProductService(productId);
        res.status(200).json({
            success: true,
            message: 'Product retrive successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong to find data',
            error,
        });
    }
};

// get single product
const updateOneProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const newData = req.body.newData;
        const result = await updateProductService(productId, newData);
        res.status(200).json({
            success: true,
            message: 'Product retrive successfully',
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'something went wrong to find data',
            error,
        });
    }
};

export { createProduct, getProduct, getSingleProduct, updateOneProduct };
