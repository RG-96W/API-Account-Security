import Express from "express";
import accountController from "../controllers/accountController.js";

const routes = Express.Router();

routes.get("/account", accountController.accountList);
routes.post("/account", accountController.accountRegister);

export default routes
