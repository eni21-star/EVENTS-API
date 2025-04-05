import joi from 'joi'
import { ValidationError } from '../errorHandlers /errors'
import { User } from '../entities/users'



export interface Iregister {
    username: string
    password: string
    email: string
}

export interface Ilogin {
    email: string
    password: string
}

export interface Iuser {
    id: string
    iat: number
    exp: number
}


const registerSchema = joi.object({
    username: joi.string().required().min(6).messages({
        'any.required': 'please provide username'
    }),

    password: joi.string().alphanum().required().min(6).messages({
        'any.required': 'please provide password'
    }),

    email: joi.string().email().required().messages({
        'any.required': 'please provide email'
    }),

})

export const registerValidator = (data: Iregister)=>{
    const { error, value } = registerSchema.validate(data, {abortEarly: false})
    if (error) {
        throw new ValidationError(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    return value
}


  const loginSchema = joi.object({
    email: joi.string().email().required().messages({
        'any.required': 'please provide email'
    }),

    password: joi.string().alphanum().required().min(6).messages({
        'any.required': 'please provide password'
    }),

})

export const loginValidator = (data: Ilogin)=>{
    const { error, value } = loginSchema.validate(data, {abortEarly: false})
    if (error) {
        throw new ValidationError(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    return value
}