import { authorizeUser, authorizeAdmin, authorizePremium } from '../controllers/authorizationUserAdmin.js'

export const usersOnly = authorizeUser;
export const adminsOnly = authorizeAdmin;
export const premiumOnly = authorizePremium;