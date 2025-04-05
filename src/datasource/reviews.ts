import AppDataSource from "../config/db.js";
import { Events } from "../entities/events.js";
import { Reviews } from "../entities/reviews.js";
import { User } from "../entities/users.js";

const reviewModel =  AppDataSource.getRepository(Reviews)
class ReviewDatasource {

    async newReview(user: User, review: string, event: Events){
        const create = reviewModel.create({ review, reviewBy: user, event })
        return reviewModel.save(create)
    }

    async getReviewById(id: string){
        return await reviewModel.findOne({ where: {id}, select: ['id', 'reviewBy']})
    }

    //Allowing users to update reviews can compromise the integrity of feedback thus i did not include it

    async deleteReview(reviewId: string){
       return await reviewModel.delete({id: reviewId})
    }
}

export default ReviewDatasource