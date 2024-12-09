import { Types } from 'mongoose';
import { IBike } from './bike.interface';
import { Product } from './bike.model';
import { IError } from '../../utils/CustomError';

const createProductService = async (data: IBike): Promise<IBike> => {
    try {
        const newProduct = new Product(data);
        const result = await newProduct.save();
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};


// get all products
const getProductQueryService = async (searchTerm?: string): Promise<IBike[] | null> => {
    try {
        let query = {};
        if (searchTerm) {
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } },
                    { brand: { $regex: searchTerm, $options: 'i' } },
                    { category: { $regex: searchTerm, $options: 'i' } },
                ],
            };
        }

        // Fetch products from the database
        const products = await Product.find(query);

        // Send success response
        return products;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// get single product
const getSingleProductService = async (id: string): Promise<IBike[] | null> => {
    try {
        const objectId = new Types.ObjectId(id);
        const result = await Product.aggregate([{ $match: { _id: objectId } }]);

        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// update a product
const updateProductService = async (
    id: string,
    data: IBike
): Promise<IBike | null> => {
    try {
        const objectId = new Types.ObjectId(id);
        const result = await Product.findByIdAndUpdate(
            { _id: objectId },
            data,
            {
                new: true,
                runValidators: true,
            }
        );

        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// delete single product
const deleteProductService = async (id: string): Promise<IBike | null> => {
    try {
        const objectId = new Types.ObjectId(id);
        const result = await Product.findOneAndUpdate(
            { _id: objectId },
            { isDeleted: true },
            {
                new: true,
                runValidators: true,
            }
        );
        return result;
    } catch (error) {
        throw new Error((error as IError).message);
    }
};

// export here
export {
    createProductService,
    getProductQueryService,
    getSingleProductService,
    updateProductService,
    deleteProductService,
};
