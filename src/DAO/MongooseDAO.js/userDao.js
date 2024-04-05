import { UserDTO } from "../../dto/dto.js";
import { AuthenticationError } from "../../models/errors/authenticationError.js";
import { usersManager } from "../../models/index.js";
import { logger } from "../../utils/logger.js";

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

        user.lastLogin = new Date();
        await user.save();

        return user.toObject() 

      } catch (error) {
        throw new AuthenticationError()
      }
    };

    async findAllUsers() {
      const users = await usersManager.find({}, { password: 0 }).lean();
      const usersDTO = users.map(user => new UserDTO(user));

      return usersDTO;
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

    async deleteUsers(twoDaysAgo) {
      console.log(twoDaysAgo,'ahoraa')
      const deletedUsers = await usersManager.deleteMany({
        rol: 'user',
        lastLogin: { $lt: twoDaysAgo }
    });

    logger.info(deletedUsers.deletedCount > 0 && `Se eliminaron ${deletedUsers.deletedCount} usuarios.`)

    return deletedUsers;
    }
}

export const userDao = new UserDao()

