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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config")); // Importing configuration settings (port and database URL)
const index_1 = __importDefault(require("./index")); // Importing the Express app instance
const mongoose_1 = __importDefault(require("mongoose")); // Importing Mongoose for MongoDB connection
// Extracting port and database URL from the config file
const port = config_1.default.port;
const database_url = config_1.default.database_url;
let server; // Variable to store the HTTP server instance
// Main function to start the server and handle database connection
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            // Connecting to the MongoDB database
            yield mongoose_1.default.connect(database_url);
            console.log('Database connected successfully.🤞');
            // Starting the Express server
            server = index_1.default.listen(port, () => {
                console.log(`Bike shop server is listening on port ${port} 🏃`);
            });
        }
        catch (error) {
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
            }
            else {
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
            }
            else {
                process.exit(0); // Exit immediately if server is not running
            }
        });
    });
}
// Call the main function to start the server
main();
