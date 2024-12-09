"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductService = exports.updateProductService = exports.getSingleProductService = exports.getProductQueryService = exports.createProductService = void 0;
const mongoose_1 = require("mongoose");
const bike_model_1 = require("./bike.model");
// Service to create a new product
const createProductService = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newProduct = new bike_model_1.Product(data); // Create a new product instance with the provided data
        const result = yield newProduct.save(); // Save the product to the database
        return result; // Return the saved product
    }
    catch (error) {
        throw new Error(error.message); // Throw an error if something goes wrong
    }
});
exports.createProductService = createProductService;
// Service to fetch all products with an optional search term
const getProductQueryService = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
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
        const products = yield bike_model_1.Product.find(query); // Fetch products matching the query from the database
        return products; // Return the fetched products
    }
    catch (error) {
        throw new Error(error.message); // Throw an error if something goes wrong
    }
});
exports.getProductQueryService = getProductQueryService;
// Service to fetch a single product by its ID
const getSingleProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.Types.ObjectId(id); // Convert the string ID to a MongoDB ObjectId
        const result = yield bike_model_1.Product.aggregate([{ $match: { _id: objectId } }]); // Use aggregation to fetch the product by ID
        return result; // Return the matched product
    }
    catch (error) {
        throw new Error(error.message); // Throw an error if something goes wrong
    }
});
exports.getSingleProductService = getSingleProductService;
// Service to update a product by its ID
const updateProductService = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.Types.ObjectId(id); // Convert the string ID to a MongoDB ObjectId
        const result = yield bike_model_1.Product.findByIdAndUpdate({ _id: objectId }, // Match the product by ID
        data, // Update the product with the provided data
        {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators on the updated fields
        });
        return result; // Return the updated product
    }
    catch (error) {
        throw new Error(error.message); // Throw an error if something goes wrong
    }
});
exports.updateProductService = updateProductService;
// Service to mark a product as deleted by its ID
const deleteProductService = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const objectId = new mongoose_1.Types.ObjectId(id); // Convert the string ID to a MongoDB ObjectId
        const result = yield bike_model_1.Product.findOneAndUpdate({ _id: objectId }, // Match the product by ID
        { isDeleted: true }, // Mark the product as deleted
        {
            new: true, // Return the updated document
            runValidators: true, // Run Mongoose validators on the updated fields
        });
        return result; // Return the updated product
    }
    catch (error) {
        throw new Error(error.message); // Throw an error if something goes wrong
    }
});
exports.deleteProductService = deleteProductService;
