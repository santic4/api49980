import express from 'express'
import { loggerInRequest } from '../middlewares/logger.js'
//import cors from 'cors'
import { apiRouter } from '../routers/apiRouter.js'
import { metodosPersonalizados } from '../middlewares/respuestasMejoradas.js'
import { passportInitialize } from '../middlewares/authentication.js'
import { cookies } from '../middlewares/cookie.js'
import { sesiones } from '../middlewares/sesiones.js'
import path from 'path';

export const app = express()

// CORS
//app.use(cors({
//    origin: 'https://pf-santiago-front.onrender.com',
//    credentials: true 
//}));

//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', 'https://pf-santiago-front.onrender.com');
//    res.header('Access-Control-Allow-Credentials', 'true');
//    next();
//});


app.use(express.static(path.join(process.cwd(), 'public', 'build')));


app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), 'public', 'build', 'index.html'));
});

app.use(passportInitialize)

app.use(metodosPersonalizados)

// Cookies
app.use(cookies)
app.use(sesiones)

// LOGGER
app.use(loggerInRequest)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Routers
app.use('/api', apiRouter)

// IMGS
app.use('/static', express.static('./static'))



