import { Events } from "pg";
import EventDatasource from "../datasource/events.js";
import { ForbiddenError, NotFoundError } from "../errorHandlers /errors.js";
import { Iuser } from "../validators/authValidator.js";
import { Ievent, IupdateEvent } from "../validators/eventValidators.js";
import AuthDatasouce from "../datasource/auth.js";
import { User } from "../entities/users.js";


class EventService extends EventDatasource {

    async requestToAttendEventService(userId: Iuser, eventId: string){

        try {
            
            const { id } = userId
            const findEvent = await this.getEventById(eventId);
            if(!findEvent) throw new NotFoundError('event does not exist')

            const findUser = await new AuthDatasouce().findById(id)
            if(!findUser) throw new NotFoundError('user does not exist')
            
            
            if(id == findEvent.createdBy.id) throw new ForbiddenError('you cannot perform this action')
            if(findEvent.attendees.length == findEvent.capacity) throw new ForbiddenError('event is already at capacity')
            if(findEvent.privacyType == 'private') throw new ForbiddenError('you cannot carry out this action')
            if(findEvent.privacyType == 'protected') {
                await this.requestToAttend(findUser, findEvent);
                return { status: 200, message: "request to attend event sent"}
            }

            await this.AttendEvent(findUser, findEvent)
            return { status: 200, message: "you are now an attendee of this event"}
        } catch (error) {
            throw error
        }
    }

    async inviteUserToEventService(userId:Iuser, eventId: string, invitedUser: string){

        try {
            const { id } = userId

            const findInvitedUser = await new AuthDatasouce().findById(invitedUser)
            if(!findInvitedUser) throw new NotFoundError('invited user does not exist')

            const findUser = await new AuthDatasouce().findById(id)
            if(!findUser) throw new NotFoundError('user does not exist')

            const findEvent = await this.getEventByUser(findUser, eventId);
            if(!findEvent) throw new NotFoundError('event does not exist')

            if(invitedUser == findEvent.createdBy.id) throw new ForbiddenError('you cannot perform this action')
           
            if(findEvent.invitedUsers?.length == findEvent.capacity) throw new ForbiddenError('event is already at capacity')
            if(findEvent.privacyType != 'private') throw new ForbiddenError('only private events can send invites')
            return await this.sendInvite(findInvitedUser, findEvent)
            
        } catch (error) {
            throw error
        }
    }

    async acceptUserRequestService(userId: Iuser, eventId: string, requestUserId: string){

        try {
            const findInviteUser = await new AuthDatasouce().findById(requestUserId)
            if(!findInviteUser) throw new NotFoundError('user does not exist')
            
            const findUser = await new AuthDatasouce().findById(userId.id)
            if(!findUser) throw new NotFoundError('user does not exist')

            const findEvent = await this.getEventByUser(findUser, eventId);
            console.log(findEvent)
            console.log(findEvent?.requestToAttend)
            if(!findEvent) throw new NotFoundError('event does not exist')
            
            
            if(findEvent.privacyType != 'protected') throw new ForbiddenError('requested action is not allowed')
            return await this.acceptUserRequest(findInviteUser, findEvent)
        } catch (error) {
            throw error
        }
    }

    async acceptEventInviteService(userId: Iuser, eventId: string){

        try {
            const { id } = userId
            const findEvent = await this.getEventById(eventId);
            if(!findEvent) throw new NotFoundError('event does not exist')
            
            if(id == findEvent.createdBy.id) throw new ForbiddenError('you cannot perform this action')
            const findUser = await new AuthDatasouce().findById(id)
            if(!findUser) throw new NotFoundError('user does not exist')

            if(findEvent.privacyType != 'private') throw new ForbiddenError('requested action is not allowed')
                
            return await this.acceptEventInvite(findUser, findEvent)
        } catch (error) {
            throw error
        }
    }

    async newEventService(data: Ievent, user: Iuser){

        try {

            const {title, description, location, eventTime, contactPhone, privacyType} = data
            const findUser = await new AuthDatasouce().findById(user.id)
            if(!findUser) throw new NotFoundError('user does not exist')
            data.createdBy = findUser
            return await this.createEvent(data)
          
        } catch (error) {
            throw error 
        }
        
    }

    async getEventByIdService(id: string) {

        try {

            const find = await this.getEventById(id)
            if(!find) throw new NotFoundError('event with that id does not exist')
            return find;

        } catch (error) {
            throw error
        }
    }

    async getAllEventsService(){
        
        try {  
            return await this.getAllEvents()
        } catch (error) {
            throw error
        }
    }


    async getEventByTitleService(data: { title: string}) {

        try {
            
               const { title } = data
               return await this.gethByTitle(title)
          
        } catch (error) {
            throw error
        }
    }


    async getEventsByKeywordService( keyword: string) {

        try {
            return await this.getEventsByKeyword(keyword)
        } catch (error) {
            throw error
        }
    }

    async updateEventService(userId: Iuser, data: IupdateEvent){

        try {
            const { id } = userId
            const findUser = await new AuthDatasouce().findById(id)
            if(!findUser) throw new NotFoundError('user does not exist')

            const findEvent = await this.getEventByUser(findUser, data.id);
            if(!findEvent) throw new NotFoundError('event does not exist')
            return await this.updateEvent(data)
        } catch (error) {
            throw error
        }
    }


    async deleteEventService(data: { id: string}){

        try {
            const { id } = data
            return await this.deleteEvent(id)
        } catch( error ){
            throw error
        }
    }



}


export default EventService