import AuthDatasouce from "../datasource/auth.js";
import EventDatasource from "../datasource/events.js";
import ReviewDatasource from "../datasource/reviews.js";
import { ForbiddenError, NotFoundError } from "../errorHandlers /errors.js";
import { Iuser } from "../validators/authValidator.js";

class ReviewService extends ReviewDatasource {

    async newReviewService(eventId: string, user: Iuser, review: string){

       try {

        const { id } = user
        const findUser = await new AuthDatasouce().findById(id)
        if(!findUser) throw new NotFoundError('user does not exist')

        const findEvent = await new EventDatasource().getEventById(eventId);
        if(!findEvent) throw new NotFoundError('event does not exist')
            
        const eventDate = new Date(findEvent.eventTime);
        const now = new Date();
        if (eventDate > now) {
          throw new ForbiddenError("You can't perform this action — the event has not happened.");
        }

        if(id == findEvent.createdBy.id) throw new ForbiddenError('you cannot perform this action')
        if(!findEvent.attendees.some(user => user.id === findUser.id)) throw new ForbiddenError('you did not attend this event')
        
        await this.newReview(findUser, review, findEvent)
        return { message: 'Review Posted Successfully'}

       } catch (error) {
        throw error
       }
    }

    async deleteReviewService(user: Iuser, reviewId: string){

       try {
        
        const { id } = user
        const findReview = await this.getReviewById(reviewId)
        if(!findReview) throw new NotFoundError('review does not exist')

        if(findReview.reviewBy.id != id) throw new ForbiddenError('you cannot perform this action')
        return await this.deleteReview(reviewId)

       } catch (error) {
        throw error
       }
    }
}

export default ReviewService