import Express from "express";
import accounts from "./accountRouter.js"

const routes = (app) => {
    app.route("/").get((req, res) => res.status(200).send
    ("XXX1"));

    app.use(Express.json(), accounts);

}

export default routes