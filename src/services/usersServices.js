import { hasheadasSonIguales, hashear } from '../utils/cryptografia.js'
import { UserDTO } from '../dto/dto.js'
import { usersRepository } from '../repository/usersRepository.js'
import { AuthenticationError } from '../models/errors/authenticationError.js'
import { JWT_PRIVATE_KEY } from '../config/config.js'
import jwt from 'jsonwebtoken';

class UsersServices {
    async createUser(userData){
        try {
            //const username = 'santito'

           // await usersRepository.findUserByUsername({username})

            userData.password = hashear(userData.password)
            const user = await usersRepository.createUser(userData)
            
            return user
        } catch (error) {
            console.log(error)
            throw new Error('Error al crear usuario', error)
        }
    }

    async getCurrentUser(userData){
        const userDTO = new UserDTO(userData)
        
        return userDTO
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

    async generateResetToken(email) {

      const user = await usersRepository.findOne(email);
      console.log(user,' pase aca')

      const resetToken = jwt.sign({ email }, JWT_PRIVATE_KEY, { expiresIn: '1h' });

      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hora en milisegundos

      await user.save();

      return resetToken;
    }



    async resetPassword(token, newPassword){
        try {
          const user = await usersRepository.findOnetoken({
            resetPasswordToken: token,
            resetPasswordExpires: { $gt: Date.now() }
          });
      
          if (!user) {
            return { error: 'Token no válido o expirado' };
          }

          console.log('NEW PASS', newPassword)
          console.log(user,'useR PASSSSSSS')
      
          // Verificar que la nueva contraseña no sea igual a la anterior
          const isSamePassword = await hasheadasSonIguales({
            recibida: newPassword,
            almacenada: user.password
          });

          if (isSamePassword) {
            return { error: 'No puedes usar la misma contraseña anterior' };
          }
      
          // Restablecer la contraseña y eliminar el token
          user.password = await hashear(newPassword);
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
      
          await user.save();
      
          return { message: 'Contraseña restablecida con éxito' };
        } catch (error) {
          console.error(error);
          throw new Error('Error al actualizar contraseña', error)
        }
    };

    async changeRol(userId, newRol) {
      if (newRol !== 'user' && newRol !== 'premium') {
        throw new Error('El rol proporcionado no es válido');
      }

      const updatedUser = await usersRepository.changeRol(userId, newRol);

      return updatedUser;
    }
    
}

export const usersServices = new UsersServices()