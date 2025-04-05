import { In } from "typeorm";
import AppDataSource from "../config/db.js";
import { Events } from "../entities/events.js";
import { Ievent, IEventDb, IupdateEvent } from "../validators/eventValidators.js";
import { User } from "../entities/users.js";
import { NotFoundError, UnauthorizedError } from "../errorHandlers /errors.js";

const eventModel = AppDataSource.getRepository(Events)

class EventDatasource {
    async createEvent(data: Ievent){

        const create = eventModel.create(data)
        return await eventModel.save(create)
    }

    async getEventById(eventId: string){
        return await eventModel.findOne({ where: {id: eventId }, relations:['attendees', 'requestToAttend', 'invitedUsers', 'createdBy']})
    }

    async getEventByUser(user: User, eventId: string){
        return await eventModel.findOne({ where: { createdBy: user, id: eventId}, relations: ['requestToAttend', 'attendees', 'invitedUsers', 'createdBy']})
    }

    async getAllEvents(){
        return eventModel.findBy({privacyType: In(['public', 'protected'])})
    }

    async gethByTitle(title: string){
        return await eventModel
        .createQueryBuilder("event")
        .where("event.title ILIKE :title", { title: `%${title}%` })
        .andWhere("event.privacyType = :privacyType", { privacyType: 'public' })
        .getMany();
    }

    async getEventsByKeyword(keyword: string){
        return await eventModel
        .createQueryBuilder("event")
        .where(
          `(event.title ILIKE :keyword OR 
            event.description ILIKE :keyword OR 
            event.location ILIKE :keyword OR 
            event.eventTime ILIKE :keyword)`,
          { keyword: `%${keyword}%` }
        )
        .andWhere("event.privacyType = :privacyType", { privacyType: 'public' })
        .getMany();
    }

    async updateEvent(data: IupdateEvent ){
        return await eventModel.update({id: data.id}, data.data)
    }

    async deleteEvent(id: string){
        return await eventModel.delete(id)
    }

    async requestToAttend(user: User, event: IEventDb){
       event?.requestToAttend?.push(user)
       console.log(event.requestToAttend)
       await eventModel.save(event);
    }

    async AttendEvent(user: User, event: IEventDb){
        event?.attendees?.push(user)
       await eventModel.save(event);
    }

    async sendInvite(user: User, event: IEventDb){
        event.invitedUsers?.push(user)
       return  await eventModel.save(event)

    }

    async acceptUserRequest(user: User, event: IEventDb){
        const index = event.requestToAttend?.findIndex(user => user.id === user.id) as number
      
        if (index !== -1) {
            event.requestToAttend?.splice(index, 1);
            event.attendees.push(user)
          return  await eventModel.save(event)
        }
        
        throw new NotFoundError("user is not in your request")
    }

    async acceptEventInvite(user: User, event: IEventDb){
        const index = event.invitedUsers?.findIndex(user => user.id === user.id) as number
        
        if (index !== -1) {
            event.attendees.push(user)
            return await eventModel.save(event)
        }
        
        throw new UnauthorizedError("you were not invited to this event")
    }
}

export default EventDatasource