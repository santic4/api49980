import { Router } from 'express'

//controllers
import { registerUser, getCurrentUser, getAllUsers, passwordforgot, passwordReset, changeUserRole, deleteUsersIn, uploadDocuments, deleteUserId } from '../controllers/usersController.js'

// passport
import { passportAuth, passportLocalRegister } from '../middlewares/passport.js'
import { adminsOnly, premiumOnly, usersOnly } from '../middlewares/authorizationUserAdmin.js'
import { upload } from '../middlewares/multer.js'

export const usersRouter = Router()

// Create user
usersRouter.post('/',
    passportLocalRegister,
    registerUser
)

usersRouter.get('/current', 
    passportAuth,
    usersOnly,
    getCurrentUser
)

// Admins
usersRouter.get('/',
    passportAuth,
    adminsOnly,
    getAllUsers
)

usersRouter.post('/forgotPassword',
    passwordforgot
);

usersRouter.post('/resetPassword/:token',
    passwordReset
)

usersRouter.post('/current/documents',
    passportAuth,
    upload.fields([
        { name: 'identification', maxCount: 1 },
        { name: 'address_proof', maxCount: 1 },
        { name: 'bank_statement', maxCount: 1 }
    ]),
    uploadDocuments
);

usersRouter.post('/premium/:uid',
    passportAuth,
    changeUserRole
);

usersRouter.delete('/delete',
    passportAuth,
    adminsOnly,
    deleteUsersIn
);

usersRouter.delete('/delete/:uid',
    passportAuth,
    adminsOnly,
    deleteUserId
);
