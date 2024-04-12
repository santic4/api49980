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



// //CORS
//app.use(cors({
//    origin: 'https://api49980.onrender.com',
//    credentials: true 
//}));
//app.use((req, res, next) => {
//    res.header('Access-Control-Allow-Origin', 'https://api49980.onrender.com');
//    res.header('Access-Control-Allow-Credentials', 'true');
//    next();
//});

import { fileURLToPath } from 'url';


const __filename = fileURLToPath(import.meta.url);


const __dirname = path.dirname(__filename);


console.log(path.join('public', 'build', 'index.html'));
console.log('locura locura')
app.use(express.static(path.join('public', 'build')));

//// Configura la ruta comodín para servir index.html
//app.get('*', (req, res) => {
//    res.sendFile(path.join(__dirname, 'public', 'build', 'index.html'));
//});
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



