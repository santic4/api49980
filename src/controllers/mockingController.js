import { generateUsers } from '../services/mockingServices.js'

export function generateUsersHandler(req, res) {
  
  const count = 100; // Generar 100 usuarios
  const users = generateUsers(count);

  res.json(users);

}