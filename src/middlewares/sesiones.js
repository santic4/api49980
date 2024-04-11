import session from 'express-session';
import connectMongo from 'connect-mongo';
import { MONGODB } from '../config/config.js';

const store = connectMongo.create({
  mongoUrl: MONGODB,
  ttl: 60 * 60 * 24, // 1d
});

export const sesiones = session({
  store,
  secret: 'SecretCoder',
  resave: false,
  saveUninitialized: false,
  cookie: {
      httpOnly: true, 
      secure: true, 
      sameSite: "lax", 
      maxAge: 60 * 60 * 24 * 1000 
  }
});
