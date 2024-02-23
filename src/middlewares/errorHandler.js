import { errorsTypes } from "../models/errors/errorsTypes.js";

export function errorHandler(error, req, res, next) {
  let statusCode = 500; // Por defecto, establece el código de estado a 500 para otros tipos de errores
  
  if (error.type === errorsTypes.AUTH_ERROR) { 
    statusCode = 401;
  } else if (error.type === errorsTypes.CART_ERROR) {
    statusCode = 404;
  } else if (error.type === errorsTypes.NOT_FOUND_ERROR) {
    statusCode = 404; 
  }
  
  res.status(statusCode).json({
    status: 'error',
    message: error.message,
  });
}


/*
export function errorHandler(error, req, res, next) {
  let statusCode = 500; // Por defecto, establece el código de estado a 500 para otros tipos de errores
  
  if (error.type === errorsTypes.AUTH_ERROR) { 
    statusCode = 401;
  } else if (error.type === errorsTypes.CART_ERROR) {
    statusCode = 404;
  } else if (error.message === 'not found') {
    statusCode = 404; 
  }
  
  res.status(statusCode).json({
    status: 'error',
    message: error.message,
  });
}*/
