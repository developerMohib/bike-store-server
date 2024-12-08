"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middlewares/errorHandler");
const bike_routes_1 = require("./modules/products/bike.routes");
const order_routes_1 = require("./modules/order/order.routes");
const app = (0, express_1.default)();
// Middleware to parse JSON bodies
app.use(express_1.default.json());
// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use((0, cors_1.default)());
// route for my functionality --> start
// products routes
app.use('/create', bike_routes_1.bikeRouter);
app.use('/get', bike_routes_1.bikeRouter);
app.use('/update', bike_routes_1.bikeRouter);
app.use('/delete', bike_routes_1.bikeRouter);
// order routes
app.use('/create', order_routes_1.orderRouter);
app.use('/get', order_routes_1.orderRouter);
app.use('/delete', order_routes_1.orderRouter);
// revenue
app.use('/api/orders', order_routes_1.orderRouter);
// route for my functionality --> end
// Root route
app.get('/', (req, res) => {
    res.send('Bike shop server is ready!✌');
});
// Global route error handler
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route Not Found 🤦',
    });
});
// Global error handler middleware
// app.use(errorHandler);
app.use((error, req, res, next) => {
    (0, errorHandler_1.errorHandler)(error, req, res, next);
});
// Export the app
exports.default = app;
