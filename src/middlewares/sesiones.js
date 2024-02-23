import session from 'express-session';
import connectMongo from 'connect-mongo';
import { MONGODB, SESSION_SECRET } from '../config/config.js';

const store = connectMongo.create({
  mongoUrl: MONGODB,
  ttl: 60 * 60 * 24, // 1d
});

export const sesiones = session({
  store,
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
