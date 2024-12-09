import { Types } from 'mongoose';
import { IBike } from './bike.interface';
import { Product } from './bike.model';
import { IError } from '../../utils/CustomError';

// Service to create a new product
const createProductService = async (data: IBike): Promise<IBike> => {
    try {
        const newProduct = new Product(data); // Create a new product instance with the provided data
        const result = await newProduct.save(); // Save the product to the database
        return result; // Return the saved product
    } catch (error) {
        throw new Error((error as IError).message); // Throw an error if something goes wrong
    }
};

// Service to fetch all products with an optional search term
const getProductQueryService = async (
    searchTerm?: string
): Promise<IBike[] | null> => {
    try {
        let query = {}; // Initialize an empty query object
        if (searchTerm) {
            // If a search term is provided, construct a query to match the term in name, brand, or category fields
            query = {
                $or: [
                    { name: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in 'name'
                    { brand: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in 'brand'
                    { category: { $regex: searchTerm, $options: 'i' } }, // Case-insensitive search in 'category'
                ],
            };
        }

        const products = await Product.find(query); // Fetch products matching the query from the database
        return products; // Return the fetched products
    } catch (error) {
        throw new Error((error as IError).message); // Throw an error if something goes wrong
    }
};

// Service to fetch a single product by its ID
const getSingleProductService = async (id: string): Promise<IBike[] | null> => {
    try {
        const objectId = new Types.ObjectId(id); // Convert the string ID to a MongoDB ObjectId
        const result = await Product.aggregate([{ $match: { _id: objectId } }]); // Use aggregation to fetch the product by ID
        return result; // Return the matched product
    } catch (error) {
        throw new Error((error as IError).message); // Throw an error if something goes wrong
    }
};

// Service to update a product by its ID
const updateProductService = async (
    id: string,
    data: IBike
): Promise<IBike | null> => {
    try {
        const objectId = new Types.ObjectId(id); // Convert the string ID to a MongoDB ObjectId
        const result = await Product.findByIdAndUpdate(
            { _id: objectId }, // Match the product by ID
            data, // Update the product with the provided data
            {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validators on the updated fields
            }
        );

        return result; // Return the updated product
    } catch (error) {
        throw new Error((error as IError).message); // Throw an error if something goes wrong
    }
};

// Service to mark a product as deleted by its ID
const deleteProductService = async (id: string): Promise<IBike | null> => {
    try {
        const objectId = new Types.ObjectId(id); // Convert the string ID to a MongoDB ObjectId
        const result = await Product.findOneAndUpdate(
            { _id: objectId }, // Match the product by ID
            { isDeleted: true }, // Mark the product as deleted
            {
                new: true, // Return the updated document
                runValidators: true, // Run Mongoose validators on the updated fields
            }
        );
        return result; // Return the updated product
    } catch (error) {
        throw new Error((error as IError).message); // Throw an error if something goes wrong
    }
};

// Exporting the services for external use
export {
    createProductService,
    getProductQueryService,
    getSingleProductService,
    updateProductService,
    deleteProductService,
};
