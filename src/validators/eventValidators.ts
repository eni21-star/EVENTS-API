import joi, { string } from 'joi'
import { ValidationError } from '../errorHandlers /errors.js';
import { Iuser } from './authValidator.js';
import { User } from '../entities/users.js';
import { Reviews } from '../entities/reviews.js';
import { privacyType } from '../entities/events.js';


export interface Ievent {
    title: string;
    description: string;
    location: string;
    eventTime: string;
    contactPhone: string;
    privacyType?: string;
    capacity: number;
    createdBy: User
}

export interface IupdateEvent {
   readonly id: string
    data: {
    title?: string;
    description?: string;
    location?: string;
    eventTime?: string;
    eventCapacity?: string
    }
}


export interface IEventDb {
    readonly id: string;
    title: string;
    description: string;
    location: string;
    contactPhone: string;
    capacity: number;
    eventTime: string;
    privacyType: string;
    reviews: Reviews[];
    attendees: User[];
    requestToAttend?: User[];
    invitedUsers?: User[]
    createdBy: User;
    createdAt: Date;
    updatedAt: Date;
}

const eventSchema = joi.object({
    title: joi.string().required().messages({
        'any.required': 'please provide event title'
    }),

    description: joi.string().required().messages({
        'any.required': 'please provide event description'
    }),

    location: joi.string().required().messages({
        'any.required': 'please provide event location'
    }),

    eventTime: joi.date().required().messages({
        'any.required': 'please provide event time'
    }),

    contactPhone: joi.string().required().messages({
        'any.required': 'please provide contact person phone'
    }),

    privacyType: joi.string().valid('public', 'private', 'protected').required().messages({
        'any.only': 'privacyType must be one of [public, private, protected]',
        'any.required': 'please provide a privacyType'
    }),

    capacity: joi.number().required().messages({
        'any.required': 'please provide contact person phone'
    }),
})

export const createEventValidator = (data: Ievent)=>{
    const { error, value } = eventSchema.validate(data, {abortEarly: false})
    if (error) {
        throw new ValidationError(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    return value
}

const idSchema = joi.object({
    id: joi.string().guid({ version: ['uuidv4'] }).required().messages({
        'any.required': 'ID is required',
        'string.guid': 'ID must be a valid UUID'
    })
});

export const idValidator = (id: string)=>{
    const { error, value } = idSchema.validate({id}, {abortEarly: false})
    if (error) {
        throw new ValidationError(`Validation error: ${error.details.map(x => x.message).join(', ')}`);
    }
    return value
}


export const updateEventSchema = joi.object({
    id: joi.string().guid({ version: ['uuidv4'] }).required().messages({
        'any.required': 'ID is required',
        'string.guid': 'ID must be a valid UUID',
    }),
    data: joi.object({
        title: joi.string().optional().messages({
            'string.base': 'Title must be a string',
        }),
        description: joi.string().optional().messages({
            'string.base': 'Description must be a string',
        }),
        location: joi.string().optional().messages({
            'string.base': 'Location must be a string',
        }),
        eventTime: joi.string().optional().messages({
            'string.base': 'Event time must be a string',
        }),
        eventCapacity: joi.number().optional().messages({
            'string.base': 'Event capacity must be a string',
        }),
    }).required().messages({
        'any.required': 'Data object is required',
    }),
});


export const updateEventValidator = (input: IupdateEvent) => {
    const { error, value } = updateEventSchema.validate(input, { abortEarly: false });
    if (error) {
        throw new Error(`Validation error: ${error.details.map((x) => x.message).join(', ')}`);
    }
    return value;
};
