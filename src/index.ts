import express, { Application, Request, Response } from 'express';
import cors from 'cors';

const app :Application = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Root route
app.get('/', (req: Request, res: Response): void => {
    res.send('Bike shop server is ready!');
});

// Health check route
app.get('/health', (req: Request, res: Response): void => {
    res.status(200).send({ status: 'UP' });
});

// Export the app
export default app;
