import { PermissionsError } from "../models/errors/permissionsError.js";

export async function authorizeRoles(req, res, next, allowedRoles) {
    if (!allowedRoles.includes(req.user['rol'])) {
      return next(new PermissionsError());
    }
    next();
  }
  
  export async function authorizeUser(req, res, next) {
    const listOfRoles = ['user', 'admin', 'premium'];
    authorizeRoles(req, res, next, listOfRoles);
  }
  
  export async function authorizeAdmin(req, res, next) {
    const listOfRoles = ['admin'];
    authorizeRoles(req, res, next, listOfRoles);
  }

  export async function authorizePremium(req, res, next) {
    const listOfRoles =  ['premium', 'admin']
    authorizeRoles(req, res, next, listOfRoles);
  }