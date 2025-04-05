import config from "../config/config.js";
import AuthDatasouce from "../datasource/auth.js";
import { ConflictError, NotFoundError, UnauthorizedError } from "../errorHandlers /errors.js";
import { Ilogin, Iregister } from "../validators/authValidator.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

class AuthService extends AuthDatasouce {

    async register(data: Iregister){

        try {

        let { email, username, password } = data
        const userExist = await this.findByEmail(email)

        if(userExist) throw new ConflictError('A user with this email already exist')
        password = await this.genHash(password) 
        const createAccount = await this.createAccount({email, username, password})
        if(createAccount) return { status: 201, message: "account created successfully"}
        
        } catch (error) {
            throw error
        }
        
    }

    async Login(data: Ilogin){

        try {
            
            let { email, password} = data
            const userExist = await this.findByEmail(email)
            if(!userExist) throw new NotFoundError('user with this email not found')
      
            const comparePassword = await this.comparePassword(password, userExist.password)
            if(!comparePassword) throw new UnauthorizedError('invalid login credentials')
            const token = await this.signToken(userExist.id)

            return { status: 200, token }

        } catch (error) {
            throw error
        }

    }

    async genHash(password: string): Promise <string> {
        return await bcrypt.hash(password, 12)
    }

    async comparePassword(password: string, hash: string){
        return await bcrypt.compare(password, hash)
    }

    async signToken(id: string){
        return jwt.sign({id}, config.ACCESS_SECRETKEY, {expiresIn: '1d'})
    }
}

export default AuthService