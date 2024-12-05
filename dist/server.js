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
const config_1 = __importDefault(require("./config"));
const index_1 = __importDefault(require("./index"));
const mongoose_1 = __importDefault(require("mongoose"));
const port = config_1.default.port;
const database_url = config_1.default.database_url;
let server;
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect(database_url);
            console.log('Database connected successfully.🤞');
            server = index_1.default.listen(port, () => {
                console.log(`Bike shop server is listening on port ${port} 🏃`);
            });
        }
        catch (error) {
            console.error(`Failed to start the server: ${error}`);
            process.exit(1);
        }
        process.on('unhandledRejection', (reason, promise) => {
            console.error('Unhandled Rejection at:', promise, 'reason:', reason);
            if (server) {
                server.close(() => {
                    process.exit(1);
                });
            }
            else {
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
            }
            else {
                process.exit(0); // Exit if server is not running
            }
        });
    });
}
main();
