import { usersServices } from "../services/usersServices.js";
import { logger } from "../utils/logger.js";
import { appendJwtAsCookie } from "./authentication.js";
import { adminsOnly} from '../middlewares/authorizationUserAdmin.js'


export const registerUser = async (req, res, next) => {
  try {
      appendJwtAsCookie,
      res.successfullPost(req.user); // Utiliza el método successfullPost definido en metodosPersonalizados
      logger.info('Usuario registrado correctamente:', req.user);
  } catch (error) {
      next(error);
  }
};


export const getCurrentUser = async (req, res, next) => {
  try {
    logger.info('Entro a current')
    const user = await usersServices.getCurrentUser(req.user)

    res.successfullGet(user)

  } catch (error) {
      req.logger.error('Error al obtener información del usuario:'+ error.message);
      next(error);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {

    const users = await usersServices.findAllUsers();

    res.successfullGet(users);
     
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
      const userUpd = await usersServices.resetPass(req.body.email, req.body.password)
      res.successfullPut(userUpd)
    } catch (error) {
      next(error)
    }

}