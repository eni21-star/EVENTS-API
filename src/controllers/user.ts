import { UnauthorizedError } from "../errorHandlers /errors.js";
import UserService from "../services/user.js";
import {Request, Response, NextFunction} from 'express'
import { idValidator } from "../validators/eventValidators.js";

class UserController extends UserService {

    async getUserAttendedEventsController(req: Request, res: Response, next: NextFunction) {
        try {
          const user = req.user;
          if (!user) throw new UnauthorizedError('please login to proceed');
      
          const response = await this.getUserAttendedEventsService(user);
          return res.status(200).json(response);
      
        } catch (error) {
          next(error);
        }
      }
      
      async getUserInvitedEventsController(req: Request, res: Response, next: NextFunction) {
        try {
          const user = req.user;
          if (!user) throw new UnauthorizedError('please login to proceed');
      
          const response = await this.getUserIinvitedEventsService(user);
          return res.status(200).json(response);
      
        } catch (error) {
          next(error);
        }
      }

      async downloadEventDataController(req: Request, res: Response, next: NextFunction){
        try {
            const id = req.query.eventId as string
            idValidator(id)
            const response = await this.downloadEventDataService(id)

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader(
              'Content-Disposition',
              `attachment; filename="${response.title.replace(/\s+/g, '_')}_Details.pdf"`
            );
          
            res.send(Buffer.from(response.pdfBytes));
            
        } catch (error) {
            
        }
      }
      

}

export default UserController