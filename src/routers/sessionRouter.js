import { Router } from "express"
import { appendJwtAsCookie, removeJwtFromCookies } from "../controllers/authentication.js"
import { passportAuth, passportLogin } from "../middlewares/passport.js"
import { logoutSession, loginUser, getCurrentSessionUser } from "../controllers/sessionController.js"

export const sessionRouter = Router()

// login
sessionRouter.post('/', 
    passportLogin,
    appendJwtAsCookie,
    loginUser
)

// view
sessionRouter.get('/current', 
    passportAuth,
    getCurrentSessionUser
)

// logout
sessionRouter.delete('/current', 
    removeJwtFromCookies,
    logoutSession
)