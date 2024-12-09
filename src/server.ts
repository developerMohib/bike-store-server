import { Server } from 'http'; // Importing the HTTP Server class
import config from './config'; // Importing configuration settings (port and database URL)
import app from './index'; // Importing the Express app instance
import mongoose from 'mongoose'; // Importing Mongoose for MongoDB connection

// Extracting port and database URL from the config file
const port = config.port;
const database_url = config.database_url;

let server: Server; // Variable to store the HTTP server instance

// Main function to start the server and handle database connection
async function main() {
    try {
        // Connecting to the MongoDB database
        await mongoose.connect(database_url as string);
        console.log('Database connected successfully.🤞');

        // Starting the Express server
        server = app.listen(port, () => {
            console.log(`Bike shop server is listening on port ${port} 🏃`);
        });
    } catch (error) {
        // Logging and exiting if server startup or database connection fails
        console.error(`Failed to start the server: ${error}`);
        process.exit(1); // Exit process with failure code
    }

    // Handling unhandled promise rejections
    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        if (server) {
            // Gracefully close the server if it's running
            server.close(() => {
                process.exit(1); // Exit process with failure code
            });
        } else {
            process.exit(1); // Exit immediately if server is not running
        }
    });

    // Handling termination signal (SIGINT) for graceful shutdown
    process.on('SIGINT', () => {
        console.log('SIGINT is received!');
        if (server) {
            // Gracefully close the server if it's running
            server.close(() => {
                console.log('Server closed gracefully.');
                process.exit(0); // Exit process with success code
            });
        } else {
            process.exit(0); // Exit immediately if server is not running
        }
    });
}

// Call the main function to start the server
main();
