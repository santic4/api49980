import { Router } from "express";
import { passportAuth } from "../middlewares/passport.js";
import { usersOnly } from "../middlewares/authorizationUserAdmin.js";
import { chatController } from '../controllers/chatController.js'

export const chatRouter = Router();

chatRouter.post('/mensaje',
    passportAuth,
    usersOnly,
    chatController 
);