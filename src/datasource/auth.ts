import AppDataSource from "../config/db.js";
import { User } from "../entities/users.js";
import { Iregister } from "../validators/authValidator.js";

export const userModel = AppDataSource.getRepository(User)

class AuthDatasouce {

   async createAccount(data: Iregister){
        const newUser = userModel.create(data)
        return await userModel.save(newUser);
   }

   async findByEmail(email: string){
      return await userModel
      .createQueryBuilder("user")
      .addSelect("user.password") // explicitly include password
      .leftJoinAndSelect("user.eventsAttended", "eventsAttended") // 👈 corrected this
      .where("user.email = :email", { email })
      .getOne();
   }

   async findById(userid: string){
   // const user = id.toString()
    return await userModel.findOne({where: {id: userid}, select:['id', 'email', 'username']})
   }
}

export default AuthDatasouce