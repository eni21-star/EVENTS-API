import jwt from 'jsonwebtoken'
import { BadreqError, UnauthorizedError } from '../errorHandlers /errors'
import config from '../config/config'
import { NextFunction, Request, Response } from 'express';



const verifyJwt = (req: Request, res: Response, next: NextFunction)=>{

    try {
        
        const token:string | null = (req?.headers?.authorization?.startsWith('Bearer ') ? req.headers.authorization.substring(7) : null)
        if(!token) throw new BadreqError('please pass authorization token in header')

        jwt.verify(token, config.ACCESS_SECRETKEY as string, (err: unknown, user: any)=>{
            if(err) throw new UnauthorizedError("you are not authorized to make this request please sign in again")
                req.user = user
                next()
        })

    } catch (error) {
        const e = error as Error
        if(e.name = 'TokenExpiredError') throw new BadreqError('token has expired')
        throw error
    }

}

export default verifyJwt