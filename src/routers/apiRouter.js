import { Router } from 'express'
import { errorHandlerLogger } from '../utils/errorsLogger.js'
import { errorHandler } from '../middlewares/errorHandler.js'
import { metodosPersonalizados } from '../middlewares/respuestasMejoradas.js'
import { usersRouter } from './usersRouter.js'
import { sessionRouter } from './sessionRouter.js'
import { carritoRouter } from './carritoRouter.js'
import { productsRouter } from './productsRouter.js'
import { chatRouter } from './chatRouter.js'
import { documentationRouter } from './documentationAPI.js'

export const apiRouter = Router()

apiRouter.use(metodosPersonalizados)

// END POINTS
apiRouter.use('/docs', documentationRouter)
apiRouter.use('/users', usersRouter)
apiRouter.use('/session', sessionRouter)
apiRouter.use('/carts', carritoRouter)
apiRouter.use('/products', productsRouter)
apiRouter.use('/chat', chatRouter)

// MIDDLEWARES

apiRouter.use(errorHandlerLogger)
apiRouter.use(errorHandler)