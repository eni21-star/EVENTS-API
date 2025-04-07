import { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import express from "express";
import router from './routes/routes.js'
import { CustomError } from "./errorHandlers /errors.js";
import { Iuser } from "./validators/authValidator.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from 'fs'
import apiLimiter from "./middleware/apiLimiter.js";
import cors from "cors";
// @ts-ignore
import xss from "xss-clean";
import helmet from "helmet";



const app: Application = express()
//documentation
const swaggerPath = path.resolve("src/docs/swagger.yaml"); 
const swaggerFile = fs.readFileSync(swaggerPath, "utf8");
const swaggerDocument = YAML.parse(swaggerFile);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.use(express.json()) 
app.use('/api/v1', router)

// security
app.use("/api/v1", apiLimiter);
app.use(cors());
app.use(xss())
app.use(helmet());


declare global {
    type LeanDocument<T> = T & Document;

    namespace Express {
        interface Request {
            user?: Iuser;
        }

        interface cookies {
            cookies?:  { [key: string]: string };
        }
    }
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
        if(err instanceof CustomError){
             res.status(err.statusCode).json({message: err.message})
             return
        }

        const e = err as Error
        console.error(e.stack)
        console.error(e.message)
        res.status(500).json({message: "Server error, please try again Later"})
};

app.use(errorHandler);

export default app
