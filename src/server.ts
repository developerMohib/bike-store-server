import { Server } from 'http';
import config from './config';
import app from './index';

const port = config.port;
let server: Server;
async function main() {
    try {
        server = app.listen(port, () => {
            console.log(`Bike shop server is listening on port ${port}`);
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
