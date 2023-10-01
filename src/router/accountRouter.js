import Express from "express";
import accountController from "../controllers/accountController.js";

const routes = Express.Router();

routes.get("/account", accountController.accountList);
routes.post("/account", accountController.accountRegister);
routes.post('/get-password', accountController.getPasswordByEmail);
routes.post('/login', accountController.login);

export default routes
