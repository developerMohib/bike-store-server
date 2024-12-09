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
// Create an instance of the Express application
const app = (0, express_1.default)();
// Middleware to parse incoming JSON requests
app.use(express_1.default.json());
// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use((0, cors_1.default)());
// ---------------------- Routes for application functionality ----------------------
// Bike-related routes
// These routes handle creating, retrieving, updating, and deleting bikes
app.use('/api', bike_routes_1.bikeRouter); // Route to create a bike
// Order-related routes
// These routes handle creating, retrieving, and deleting orders
app.use('/api', order_routes_1.orderRouter); // Route to create an order
// Additional route for revenue-related functionality
// Example route: Fetching all orders for revenue calculations
app.use('/api/orders', order_routes_1.orderRouter);
// ---------------------- End of routes for application functionality ----------------------
// Root route to check if the server is running
app.get('/', (req, res) => {
    res.send('Bike shop server is ready!✌');
});
// Handle requests to undefined routes
// This middleware catches all requests to undefined routes and returns a 400 error
app.all('*', (req, res) => {
    res.status(400).json({
        success: false,
        message: 'Route Not Found 🤦',
    });
});
// Global error handler middleware
// Handles errors occurring in the application
// This replaces the commented-out error handler for flexibility
app.use((error, req, res, next) => {
    (0, errorHandler_1.errorHandler)(error, req, res, next);
});
// Export the Express app instance for use in the server entry point
exports.default = app;
