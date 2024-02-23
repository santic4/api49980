import express from 'express'
import { loggerInRequest } from '../middlewares/logger.js'
import cors from 'cors'
import { apiRouter } from '../routers/apiRouter.js'
import { metodosPersonalizados } from '../middlewares/respuestasMejoradas.js'
import { passportInitialize } from '../middlewares/authentication.js'
import { cookies } from '../middlewares/cookie.js'
import { sesiones } from '../middlewares/sesiones.js'

export const app = express()

// CORS
app.use(cors())

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



