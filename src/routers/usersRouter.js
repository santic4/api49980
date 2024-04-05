import { Router } from 'express'

//controllers
import { registerUser, getCurrentUser, getAllUsers, passwordforgot, passwordReset, changeUserRole, deleteUsersIn } from '../controllers/usersController.js'

// passport
import { passportAuth, passportLocalRegister } from '../middlewares/passport.js'
import { adminsOnly, premiumOnly, usersOnly } from '../middlewares/authorizationUserAdmin.js'


export const usersRouter = Router()

// Create user
usersRouter.post('/',
    passportLocalRegister,
    registerUser
)

// User ya logueado con session ( ya que session le mete la cookie que hay que extraer aca)
 usersRouter.get('/current', 
    passportAuth,
    usersOnly,
    getCurrentUser
)

// Admins
usersRouter.get('/',
    passportAuth,
    premiumOnly,
    getAllUsers
)

usersRouter.post('/forgotPassword',
    passwordforgot
);

usersRouter.post('/resetPassword/:token',
    passwordReset
);

usersRouter.post('/premium/:uid',
    changeUserRole
);

usersRouter.delete('/delete',
    passportAuth,
    adminsOnly,
    deleteUsersIn
);
