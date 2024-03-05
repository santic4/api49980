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
      return await usersManager.find({}, { password: 0 }).lean();
    };

    async findOne(email) {
      const user = await usersManager.findOne({email});
      if(!user){
        throw new Error('El usuario no existe')
      }

      return user
    }

    async findOneToken(filter) {
      const user = await usersManager.findOne(filter).exec();
      if(!user){
        throw new Error('El usuario no existe')
      }

      return user
    }

    async readOne(criterio) {
      const result = await usersManager.findOne(criterio).lean()

      return result
    }

    async userById(id){

      const result = await usersManager.findOne({ _id: id }).lean()

      return result
    }

    async changeRol(userId, newRol) {
      const result = await usersManager.findByIdAndUpdate(userId, { rol: newRol }, { new: true }).lean()

      console.log(result, 'RESULT')

      return result
    }
}

export const userDao = new UserDao()

