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
exports.revenueCalculate = exports.deleteOrder = exports.getOrders = exports.createOrder = void 0;
const order_service_1 = require("./order.service");
const bike_model_1 = require("../products/bike.model");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // here will be functionality
        const { email, product, quantity, totalPrice } = req.body;
        if (!email || !product || !quantity || !totalPrice) {
            res.status(400).json({
                status: false,
                message: 'Missing required fields: email, product, quantity or totalPrice',
            });
            return;
        }
        const existProduct = yield bike_model_1.Product.findById(product);
        if (!existProduct) {
            res.status(404).json({
                message: 'Product not found',
                status: false,
            });
            return;
        }
        if (existProduct.quantity < quantity) {
            res.status(400).json({
                message: 'Insufficient stock',
                status: false,
            });
            return;
        }
        const result = yield (0, order_service_1.createOrderService)({
            email,
            product,
            quantity,
            totalPrice,
        });
        res.status(201).json({
            status: true,
            message: 'Order created successfully',
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
exports.createOrder = createOrder;
// get all orders
const getOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield (0, order_service_1.getOrderService)();
        res.status(200).json({
            success: true,
            message: 'All order retrive successfully',
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
exports.getOrders = getOrders;
// delete order
const deleteOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.params.id;
        yield (0, order_service_1.deleteOrderService)(id);
        res.status(200).json({
            success: true,
            message: 'Order deleted successfully',
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
exports.deleteOrder = deleteOrder;
// total revenue
const revenueCalculate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // here code
        const totalRevenue = yield (0, order_service_1.revenueCalculateService)();
        res.status(200).json({
            message: 'Revenue calculated successfully',
            status: true,
            data: {
                totalRevenue,
            },
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
exports.revenueCalculate = revenueCalculate;
