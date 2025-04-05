import { Application, Request, Response, NextFunction, ErrorRequestHandler } from "express";
import express from "express";
import router from './routes/routes.js'
import { CustomError } from "./errorHandlers /errors.js";
import { Iuser } from "./validators/authValidator.js";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import fs from 'fs'



const app: Application = express()
const swaggerPath = path.resolve("src/docs/swagger.yaml"); // adjust if file is inside `src/docs`
const swaggerFile = fs.readFileSync(swaggerPath, "utf8");
const swaggerDocument = YAML.parse(swaggerFile);


app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(express.json()) // change
app.use('/api/v1', router)



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
        console.log(e.stack)
        res.status(500).json({message: "Server error, please try again Later"})
};

app.use(errorHandler);

export default app