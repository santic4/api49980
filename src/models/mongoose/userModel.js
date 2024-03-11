import { Schema, model } from 'mongoose'
import { randomUUID } from 'crypto'

const schema = new Schema({
  _id: { type: String, default: randomUUID },
  first_name:{ type: String, required: true },
  last_name:{ type: String, required: true },
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true },
  age: { type: Number, required: true },
  password: { type: String, required: true },
  resetPasswordToken: {type: String},
  resetPasswordExpires: {type: Date},
  cart: { type: String, default: '' },
  rol: { type: String, default: 'user' },
  orders: {
    type: [
      {
        type: String,
        ref: 'orders'
      }
    ],
    default: []
  }
}, {
  versionKey: false,
  strict: 'throw',
})

export const usersManager = model('users', schema)