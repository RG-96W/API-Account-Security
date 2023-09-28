// import app from "./src/app.js";
// import express from 'express';
// import cors from 'cors';

// const PORT = 5000;

// app.use(cors());

// app.listen(PORT, () => {
//   console.log("Servidor online!");
// });
import app from "./src/app.js";
import express from 'express';
import cors from 'cors';

const PORT = 5000;
const server = express();

server.use(cors()); // Configuração do CORS aqui

server.use("/", app);

server.listen(PORT, () => {
  console.log("Servidor online na porta " + PORT);
});
