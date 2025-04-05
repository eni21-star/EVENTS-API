import { strict } from 'assert'
import dotenv from 'dotenv'
dotenv.config()


const config = {
    PORT: process.env.PORT as string,
    ACCESS_SECRETKEY: process.env.ACCESS_SECRETKEY as string
}

export default config