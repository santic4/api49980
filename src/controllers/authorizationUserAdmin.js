export async function authorizeRoles(req, res, next, allowedRoles) {
    if (!allowedRoles.includes(req.user['rol'])) {
      return next(new Error('Not authorized'));
    }
  
    next();
  }
  
  export async function authorizeUser(req, res, next) {
    const listOfRoles = ['user', 'admin'];
    authorizeRoles(req, res, next, listOfRoles);
  }
  
  export async function authorizeAdmin(req, res, next) {
    const listOfRoles = ['admin'];
    authorizeRoles(req, res, next, listOfRoles);
  }