import joi from 'joi'
import { ValidationError } from '../errorHandlers /errors';

interface Ireview {
    eventId: string
    review: string
}


const newReviewSchema = joi.object({
    eventId: joi.string().guid({ version: ['uuidv4'] }).required().messages({
        'any.required': 'eventId is required',
        'string.guid': 'eventId must be a valid UUID'
    }),
    review: joi.string().required().messages({
        'any.required': 'please provide review'
    })
});


export const newReviewValidator = (data: Ireview)=>{
    const { error, value } = newReviewSchema.validate(data, {abortEarly: false})
    if (error) {
        throw new ValidationError(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    return value
}