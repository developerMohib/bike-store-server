import { Server } from 'http';
import config from './config';
import app from './index';
import mongoose from 'mongoose';

const port = config.port;
const database_url = config.database_url;
let server: Server;
async function main() {
    try {
        await mongoose.connect(database_url as string);
        console.log('Database connected successfully.🤞');
        server = app.listen(port, () => {
            console.log(`Bike shop server is listening on port ${port} 🏃`);
        });
    } catch (error) {
        console.error(`Failed to start the server: ${error}`);
        process.exit(1);
    }

    process.on('unhandledRejection', (reason, promise) => {
        console.error('Unhandled Rejection at:', promise, 'reason:', reason);
        if (server) {
            server.close(() => {
                process.exit(1);
            });
        } else {
            process.exit(1);
        }
    });

    process.on('SIGINT', () => {
        console.log('SIGINT is received!');
        if (server) {
            server.close(() => {
                console.log('Server closed gracefully.');
                process.exit(0); // Exit with successful status
            });
        } else {
            process.exit(0); // Exit if server is not running
        }
    });
}
main();
