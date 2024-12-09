import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { bikeRouter } from './modules/products/bike.routes';
import { orderRouter } from './modules/order/order.routes';

// Create an instance of the Express application
const app: Application = express();

// Middleware to parse incoming JSON requests
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// ---------------------- Routes for application functionality ----------------------

// Bike-related routes
// These routes handle creating, retrieving, updating, and deleting bikes
app.use('/create', bikeRouter); // Route to create a bike
app.use('/get', bikeRouter); // Route to retrieve bikes
app.use('/update', bikeRouter); // Route to update a bike
app.use('/delete', bikeRouter); // Route to delete a bike

// Order-related routes
// These routes handle creating, retrieving, and deleting orders
app.use('/create', orderRouter); // Route to create an order
app.use('/get', orderRouter); // Route to retrieve orders
app.use('/delete', orderRouter); // Route to delete an order

// Additional route for revenue-related functionality
// Example route: Fetching all orders for revenue calculations
app.use('/api/orders', orderRouter);

// ---------------------- End of routes for application functionality ----------------------

// Root route to check if the server is running
app.get('/', (req: Request, res: Response): void => {
    res.send('Bike shop server is ready!✌');
});

// Handle requests to undefined routes
// This middleware catches all requests to undefined routes and returns a 400 error
app.all('*', (req: Request, res: Response): void => {
    res.status(400).json({
        success: false,
        message: 'Route Not Found 🤦',
    });
});

// Global error handler middleware
// Handles errors occurring in the application
// This replaces the commented-out error handler for flexibility
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    errorHandler(error, req, res, next);
});

// Export the Express app instance for use in the server entry point
export default app;
