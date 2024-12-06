import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { errorHandler } from './middlewares/errorHandler';
import { bikeRouter } from './modules/products/bike.routes';

const app: Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// route for my functionality --> start

app.use('/create',bikeRouter)
app.use('/get',bikeRouter)
app.use('/update',bikeRouter)
app.use('/delete',bikeRouter)


// route for my functionality --> end




// Root route
app.get('/', (req: Request, res: Response): void => {
    res.send('Bike shop server is ready!✌');
});

// Global route error handler
app.all('*', (req: Request, res: Response): void => {
    res.status(400).json({
        success: false,
        message: 'Route Not Found 🤦',
    });
});

// Global error handler middleware
app.use(errorHandler);
// Export the app
export default app;
