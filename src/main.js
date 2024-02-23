import { app } from "./app/app.js";
import { MONGODB, PORT } from "./config/config.js";
import { logger } from "./utils/logger.js";
import mongoose from 'mongoose'

await mongoose.connect(MONGODB)

logger.info('Conectado a DB MONGO')

app.listen(PORT, () => { logger.info(`escuchando en puerto ${PORT}`) })

