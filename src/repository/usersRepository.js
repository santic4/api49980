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

    async findById(id) {
        try {
            const user = await userDao.userById(id)

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

    async findOne(email) {
        try {
            return await userDao.findOne(email);
        } catch (error) {
            console.log(error, 'ERRRO DEFINITVO')
            throw new AuthenticationError()
        }
    }

    async findOnetoken(filter) {
        try {
            return await userDao.findOneToken(filter);
        } catch (error) {
            throw new AuthenticationError()
        }
    }

    async readOne(criterio) {
        try {
            const result = await userDao.readOne(criterio)

            return result
        } catch (error) {
            throw new AuthenticationError()
        }
    }

    async changeRol(userId, newRol) {
        try {
            const result = await userDao.changeRol(userId, newRol)

            return result
        } catch (error) {
            throw new AuthenticationError()
        }
    }
}

export const usersRepository = new UsersRepository()