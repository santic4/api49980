import { chatDao } from '../DAO/chatDao.js'

export const chatController = async (req, res, next) => { 

    try {       
      // Lógica para enviar un mensaje al chat
      const savedMessage = await chatDao.saveMessage(req.body);

      res.json(savedMessage);
    } catch (error) {
      next(error)
    }

}