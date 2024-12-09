import dotenv from 'dotenv';
import path from 'path';
dotenv.config({ path: path.join(process.cwd(), '.env') });

interface Config {
    port: number | undefined;
    database_url: string | undefined;
}
const config: Config = {
    port: process.env.PORT ? parseInt(process.env.PORT, 10) : undefined,
    database_url: process.env.MONGODB_URL,
};

export default config;
