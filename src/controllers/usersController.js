import { emailService } from "../services/email/emailServices.js";
import { usersServices } from "../services/usersServices.js";
import { logger } from "../utils/logger.js";
import { appendJwtAsCookie } from "./authentication.js";


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

export const passwordforgot= async (req, res, next)=>{
  try {
    const { email } = req.body;
    console.log(email);
    const resetToken = await usersServices.generateResetToken(email);

    // Construir el enlace de restablecimiento
    const resetLink = `http://localhost:8080/api/users/resetPassword/${resetToken}`;
    console.log(resetLink, 'RESET LINK')
    
    // Configurar el correo
    const asunto = 'Restablecimiento de Contraseña';
    const mensaje = `Haz clic en el siguiente enlace para restablecer tu contraseña: ${resetLink}`;

    // Enviar el correo
    await emailService.send(email, asunto, mensaje);

    return res.json({ message: 'Correo enviado con éxito' });
  } catch (error) {
    next(error)
  }
}

export const passwordReset = async (req, res, next) => {
  try {
    const { token } = req.params;
    const { newPassword } = req.body;

    const result = await usersServices.resetPassword(token, newPassword);

    if (result.error) {
      return res.status(400).json({ message: result.error });
    }

    return res.json({ message: result.message });
  } catch (error) {
    next(error)
  }
};

export const changeUserRole= async(req, res, next)=> {
  try {
    const userId = req.params.uid;
    const newRol = req.body.rol; // El nuevo rol, puede ser 'premium' o 'user'

    const updatedUser = await usersServices.changeRol(userId, newRol);

    res.json(updatedUser);
  } catch (error) {
    next(error)
  }
}
