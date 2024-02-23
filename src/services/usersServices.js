import { hasheadasSonIguales, hashear } from '../utils/cryptografia.js'
import { UserDTO } from '../dto/dto.js'
import { usersRepository } from '../repository/usersRepository.js'
import { AuthenticationError } from '../models/errors/authenticationError.js'

class UsersServices {
    async createUser(userData){
        try {
            userData.password = hashear(userData.password)
            const user = await usersRepository.createUser(userData)

            
            return user
        } catch (error) {
            // throw new Error('Error al crear usuario', error)
            console.log(error)
        }
    }

    async getCurrentUser(userData){
        try {
            
            const userDTO = new UserDTO(userData)
            
            return userDTO
        } catch (error) {
            console.log(error)
        }
    }

    async findUserByUsername({username, password}){
        try {
            const user = await usersRepository.findUserByUsername({username})
            
            if (!user) { throw new AuthenticationError() }

            if (!hasheadasSonIguales({
                recibida: password,
                almacenada: user.password
              })) {
                throw new AuthenticationError()
              }

            return user
        } catch (error) {
            throw new AuthenticationError()
        }
    }


    async findAllUsers(){
        try {
            const user = await usersRepository.findAllUsers()
            
            if (!user) { throw new AuthenticationError() }

            return user
        } catch (error) {
            throw new AuthenticationError()
        }
    }


    async resetPass(email, pass) {
        try{
          const newPassword = hashear(pass)

          const userUpd = await usersRepository.resetPass(email, newPassword)

          return userUpd
        }catch(error){
          throw new AuthenticationError()
        }
      }
}

export const usersServices = new UsersServices()