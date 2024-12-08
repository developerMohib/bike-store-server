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
exports.deleteProduct = exports.updateOneProduct = exports.getSingleProduct = exports.getProduct = exports.createProduct = void 0;
const bike_service_1 = require("./bike.service");
const CustomError_1 = require("../../utils/CustomError");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body.productData;
        if (!productData) {
            throw new CustomError_1.CustomError('Product data is required', 400, 'name');
        }
        const result = yield (0, bike_service_1.createProductService)(productData);
        res.status(200).json({
            success: true,
            message: 'Product is created successfully!',
            data: result,
        });
    }
    catch (error) {
        // next(error);
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
});
exports.createProduct = createProduct;
// get all products
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, bike_service_1.getProductService)();
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
});
exports.getProduct = getProduct;
// get single product
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const result = yield (0, bike_service_1.getSingleProductService)(productId);
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
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
});
exports.getSingleProduct = getSingleProduct;
// update single product
const updateOneProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        const newData = req.body.newData;
        const result = yield (0, bike_service_1.updateProductService)(productId, newData);
        res.status(200).json({
            success: true,
            message: 'Product updated successfully',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
});
exports.updateOneProduct = updateOneProduct;
// delete single product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productId = req.params.productId;
        yield (0, bike_service_1.deleteProductService)(productId);
        res.status(200).json({
            success: true,
            message: 'Bike deleted successfully',
            data: {},
        });
    }
    catch (error) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                error: error.message,
            });
        }
        else {
            // In case error is not an instance of Error
            res.status(500).json({
                success: false,
                message: 'An unknown error occurred',
                error: String(error),
            });
        }
    }
});
exports.deleteProduct = deleteProduct;
