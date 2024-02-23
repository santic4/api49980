import { userDao } from "../DAO/userDao.js"
import { AuthenticationError } from "../models/errors/authenticationError.js"

class UsersRepository {
    async createUser(userData) {
        try {
            const user = await userDao.createUser(userData)

            return user
        } catch (error) {
            throw new AuthenticationError()
        }
    }

    async findUserByUsername({username}){
        try {

            const user = await userDao.findUserByUsername({ username })

            return user
        } catch (error) {
            throw new AuthenticationError()
        }
    }

    async findAllUsers(){
        try {
            const user = await userDao.findAllUsers()

            return user
        } catch (error) {
            throw new AuthenticationError()
        }
    }

    async resetPass(email, passUpd) {
        try{
          const userUpd = await userDao.resetPass(email, passUpd)

          return userUpd
        }catch(error){
          throw new AuthenticationError()
        }
    }

    async readOne(criterio) {
        const result = await userDao.readOne(criterio)

        return result
    }
}

export const usersRepository = new UsersRepository()