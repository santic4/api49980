import { AuthenticationError } from "../models/errors/authenticationError.js";
import { usersManager } from "../models/index.js";

class UserDao {

    async createUser(userData) {
        try {
          
          const user = await usersManager.create(userData)

          return user.toObject()
        } catch (error) {
          console.log(error)
          //throw new Error('Error creating user', error);
        }
    };

    async findUserByUsername({username}) {
      try {
        const user = await usersManager.findOne({ username })

        return user.toObject() 

      } catch (error) {
        throw new AuthenticationError()
      }
    };

    async findAllUsers() {
      try {
        return await usersManager.find({}, { password: 0 }).lean();
      } catch (error) {
        throw new AuthenticationError()
      }
    };

    async resetPass(email, passUpd) {
      try{
        const userUpd = await usersManager.findOneAndUpdate(
          { email },
          { $set: { password: passUpd } },
          { new: true }
        ).lean()

        return userUpd
      }catch(error){
        throw new AuthenticationError()
      }

    }

    async readOne(criterio) {
      const result = await usersManager.findOne(criterio).lean()
        if (!result) throw new Error('NOT FOUND')
        return result
    }
}

export const userDao = new UserDao()

