import dotenv from 'dotenv'

dotenv.config()

// LOCAL
export const PORT=8080

// NODE
export const NODE_ENV = process.env.NODE_ENV

// DB
export const MONGODB = process.env.MONGODB

// SECRETS WORDS
export const COOKIE_SECRET = process.env.COOKIE_SECRET
export const SESSION_SECRET = process.env.SESSION_SECRET
export const JWT_PRIVATE_KEY = process.env.JWT_PRIVATE_KEY

// Email Services
export const EMAIL_USER = 'ventadele1234@gmail.com'
export const EMAIL_PASS = ''
