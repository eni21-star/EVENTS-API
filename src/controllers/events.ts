import { NextFunction, Request, Response } from "express";
import EventService from "../services/events.js";
import { createEventValidator, idValidator, updateEventValidator } from "../validators/eventValidators.js";
import { BadreqError, UnauthorizedError } from "../errorHandlers /errors.js";

class EventController extends EventService {

    async newEventController(req: Request, res: Response, next: NextFunction){
        try {
            
            const data = req.body
            createEventValidator(data)
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.newEventService(data, user)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async getAllEventsController(req: Request, res: Response, next: NextFunction){
        try {

            const response = await this.getAllEventsService()
            return res.status(200).json(response)
            
        } catch (error) {
            next(error)
        }
    }

    async getEventByIdController(req: Request, res: Response, next: NextFunction){
        try {
            
            const id = req.query.id as string
            idValidator(id)
            const response = await this.getEventByIdService(id)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async getEventByTitleController(req: Request, res: Response, next: NextFunction){
        try {
            
            const title = req.query.title as string
            if(!title) throw new BadreqError('please parse title in query')
            const response = await this.getEventByTitleService({title})
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async gethEventsByKeywordController(req: Request, res: Response, next: NextFunction){
        try {
            
            const keyword = req.query.keyword as string
            if(!keyword) throw new BadreqError('please parse title in query')
            const response = await this.getEventsByKeywordService(keyword)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async updateEventsController(req: Request, res: Response, next: NextFunction){
        try {
            
            const data = req.body
            updateEventValidator(data)
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.updateEventService(user, data)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }


    async reqtoAttendEventController(req: Request, res: Response, next: NextFunction){
        try {
            
            const data = req.body.id
            idValidator(data)
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.requestToAttendEventService(user, data)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }


    async inviteUserAttendEventController(req: Request, res: Response, next: NextFunction){
        try {
            
            const inviteUserId = req.body.inviteUserId
            const eventId = req.body.eventId
            idValidator(inviteUserId)
            idValidator(eventId)
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.inviteUserToEventService(user, eventId, inviteUserId)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async acceptUserRequestEventController(req: Request, res: Response, next: NextFunction){
        try {
            
            const inviteUserId = req.body.inviteUserId
            const eventId = req.body.eventId
            idValidator(inviteUserId)
            idValidator(eventId)
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.acceptUserRequestService(user, eventId, inviteUserId)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

    async acceptEventInviteController(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.body.eventId
            idValidator(id)
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.acceptEventInviteService(user, id)
            return res.status(200).json(response)

        } catch (error) {
            next(error)
        }
    }

}


export default EventController