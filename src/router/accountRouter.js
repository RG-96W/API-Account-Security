import Express from "express";
import accountController from "../controllers/accountController.js";
import { verifyJWT } from '../config/jwt.js';

const routes = Express.Router();

routes.get("/account", verifyJWT, (req, res) => {
  accountController.accountList(req, res); // Chame o método usando a instância criada
});



// routes.get("/account", verifyJWT, (req, res) => {
//     // Se você chegou aqui, a autenticação JWT foi bem-sucedida.
//     // O usuário autenticado está acessando esta rota.
//     res.json(accountController.accountList);
//   });  
// routes.get("/account", verifyJWT, accountController.accountList);
routes.post("/account", accountController.accountRegister);
routes.post('/get-password', accountController.getPasswordByEmail);
routes.post('/login', accountController.login);

export default routes
