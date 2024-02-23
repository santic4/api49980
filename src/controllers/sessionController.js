import { usersOnly } from "../middlewares/authorizationUserAdmin.js";
import { logger } from "../utils/logger.js";
import { appendJwtAsCookie, removeJwtFromCookies } from "./authentication.js";

export const loginUser = async (req, res, next) => {
  try {
    logger.info('Sesion de usuario abierta:', req.user);
    appendJwtAsCookie,
    res.successfullPost(req.user);

  } catch (err) {
    next(err);
  }
};


export const getCurrentSessionUser = async (req, res, next) => {
  try {
    usersOnly,
    res.successfullGet(req.user);
  } catch (err) {
    
    next(err);
  }
};


export const logoutSession = async (req, res, next) => {
  try {
    removeJwtFromCookies,

    res.successfullDelete();
  } catch (err) {
    next(err);
  }
};

