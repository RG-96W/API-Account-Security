import express from "express";
import dbconnecting from "../src/config/dbconnect.js";
import routes from "./router/index.js"

const conexao = await dbconnecting();

conexao.on("error", (erro) => {
    console.error("Erro de conexão com banco de dados.", erro);
});

conexao.once("open", () => {
    console.log("Conxão com banco de dados realizada com sucesso!")
})

const app = express();
routes(app);
app.use(express.json());


export default app;