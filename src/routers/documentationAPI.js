import { Router } from 'express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'API REST e-Commerce',
      description: 'Express-based API developed to support an e-commerce platform.',
    },
  },
  apis: ['./docs/**/*.yaml'],
}

const specs = swaggerJsdoc(options)

export const documentationRouter = Router()

documentationRouter.use('/', swaggerUi.serve, swaggerUi.setup(specs))