import { NextFunction, Request, Response } from "express";
import AuthService from "../services/auth.js";
import { loginValidator, registerValidator } from "../validators/authValidator.js";


class AuthController extends AuthService {

    async RegisterController(req: Request, res: Response, next: NextFunction){
        
        try {

            const data = req.body
            registerValidator(data)
            const response = await this.register(data)
            if(!response) throw new Error('registeration error')
            return res.status(response!.status).json({message: response!.message})
            
        } catch (error) {
            next(error)
        }
    }

    async LoginController(req: Request, res: Response, next: NextFunction){

        try {

            const data = req.body
            loginValidator(data)
            const response = await this.Login(data)
            if(!response) throw new Error('registeration error')
            return res.status(response!.status).json({token: response!.token})
            
        } catch (error) {
            next(error)
        }
    }
}

export default AuthController