import  mongoose from 'mongoose';

const chatSchema = new mongoose.Schema({
  user: {
    type: String,
    //ferencia al modelo de usuario (asegúrate de tener un modelo de usuario definido)
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

export const Chat = mongoose.model('chats', chatSchema);
