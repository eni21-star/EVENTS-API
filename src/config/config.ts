import { strict } from 'assert'
import dotenv from 'dotenv'
dotenv.config()


const config = {
    PORT: process.env.PORT as string,
    ACCESS_SECRETKEY: process.env.ACCESS_SECRETKEY as string
}
const requiredEnvVars = ['PORT', 'ACCESS_SECRETKEY'];
const missingEnvVars = requiredEnvVars.filter((key) => !process.env[key]);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:', missingEnvVars);
}

console.table(config);

export default config