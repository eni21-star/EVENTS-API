import { NextFunction, Request, Response } from "express";
import ReviewService from "../services/reviews.js";
import { newReviewValidator } from "../validators/reviewValidator.js";
import { UnauthorizedError, ValidationError } from "../errorHandlers /errors.js";
import { idValidator } from "../validators/eventValidators.js";


class ReviewController extends ReviewService {

    async newReviewController(req: Request, res: Response, next: NextFunction){
        try {

            const data = req.body
            newReviewValidator(data)
            const { eventId, review } = data
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.newReviewService(eventId, user, review)
            return res.status(202).json(response)

        } catch (error) {
            next(error)
        }
    }

    async deleteReviewController(req: Request, res: Response, next: NextFunction){
        try {

            const id = req.query.reviewId as string
            idValidator(id)
            const user = req.user
            if(!user) throw new UnauthorizedError('please login to proceed')
            const response = await this.deleteReviewService(user, id)
            return res.status(202).json(response)
            
        } catch (error) {
            next(error)
        }
    }
}

export default ReviewController