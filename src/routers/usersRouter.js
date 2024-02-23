import { Router } from 'express'

//controllers
import { registerUser, getCurrentUser, getAllUsers, resetPassword } from '../controllers/usersController.js'

// passport
import { passportAuth, passportLocalRegister } from '../middlewares/passport.js'


export const usersRouter = Router()

// Create user
usersRouter.post('/',
    passportLocalRegister,
    registerUser
)

// User ya logueado con session ( ya que session le mete la cookie que hay que extraer aca)
usersRouter.get('/current', 
    passportAuth,
    getCurrentUser
)

// Admins
usersRouter.get('/',
    passportAuth,
    getAllUsers
)

usersRouter.put('/', resetPassword)
