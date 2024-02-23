import { authorizeUser, authorizeAdmin } from '../controllers/authorizationUserAdmin.js'

export const usersOnly = authorizeUser;
export const adminsOnly = authorizeAdmin;