import { Request, Response } from 'express';
import {
    createProductService,
    deleteProductService,
    getProductQueryService,
    getSingleProductService,
    updateProductService,
} from './bike.service';
import { IBike } from './bike.interface';
import { CustomError } from '../../utils/CustomError';

const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const productData: IBike = req.body.productData;

        if (!productData) {
            throw new CustomError('Product data is required', 400, 'name');
        }

        const result = await createProductService(productData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
            data: result,
        });
    } catch (error: unknown) {
        // next(error);
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

// get all products with query
const getProductQuery = async (req: Request, res: Response): Promise<void> => {
    try {
        const { searchTerm } = req.query;
        const result = await getProductQueryService(searchTerm as string);
        if (!result || result.length === 0) {
            res.status(404).json({
                success: true,
                message: 'No data found',
                data: [],
            });
            return;
        }

        // data found when it more than 0
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

        if (!result || result.length === 0) {
            res.status(404).json({
                success: true,
                message: 'No data found',
                data: {},
            });
            return;
        }

        // if data is exist more than 0
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
    getProductQuery,
    getSingleProduct,
    updateOneProduct,
    deleteProduct,
};
