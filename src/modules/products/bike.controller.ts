import { Request, Response } from 'express';
import {
    createProductService,
    deleteProductService,
    getProductService,
    getSingleProductService,
    updateProductService,
} from './bike.service';
import { IBike } from './bike.interface';

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData: IBike = req.body.productData;
        const result = await createProductService(productData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
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

// get all products
const getProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const result = await getProductService();
        res.status(200).json({
            success: true,
            message: 'All product retrive successfully',
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

// get single product
const getSingleProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const result = await getSingleProductService(productId);
        res.status(200).json({
            success: true,
            message: 'Your product retrive successfully',
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

// update single product
const updateOneProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        const newData = req.body.newData;
        const result = await updateProductService(productId, newData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
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

// delete single product
const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productId = req.params.productId;
        await deleteProductService(productId);
        res.status(200).json({
            success: true,
            message: 'Bike deleted successfully',
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

// export here
export {
    createProduct,
    getProduct,
    getSingleProduct,
    updateOneProduct,
    deleteProduct,
};
