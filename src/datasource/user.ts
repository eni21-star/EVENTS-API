import { userModel } from "./auth.js"



class UserDataSource { 

    async getUserAttendedEvents(userId: string){
        return await userModel.find({ where: {id: userId}, select: ['eventsAttended'], relations: ['eventsAttended']})
    }


    async getUserInvitedEvents(userId: string){
        return await userModel.find({ where: {id: userId}, select: ['eventsInvited'], relations: ['eventsInvited']})
    }
}

export default UserDataSource