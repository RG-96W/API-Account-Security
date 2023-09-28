import account from "../models/accounts.js"

class accountController {

    static async accountList (req, res) {
        try {
            const accountList = await account.find({});
            res.status(200).json(accountList);
          } catch (erro) {
            res.status(500).json({ message: `${erro.message} - falha na requisição` });
          }
        };
        static async accountRegister(req, res) {
          try {
            const newAccount = await account.create(req.body);
            res.status(201).json({ message: "Cadastrado com sucesso", account: newAccount });
          } catch (error) {
            console.error('Erro ao processar a solicitação POST:', error);
            // Envie uma resposta de erro
            res.status(500).send('Erro interno do servidor.');
          }
        }
        
    static async getPasswordByEmail(req, res) {
        try {
          const { email } = req.body;
          console.log(`Email recebido na solicitação: ${email}`);
    
          const accountInfo = await account.findOne({ email });
    
          if (!accountInfo) {
            console.log("Conta não encontrada no banco de dados");
            return res.status(404).json({ message: "Conta não encontrada" });
          }
    
          const { password } = accountInfo;
          console.log(`Senha encontrada: ${password}`);
          res.status(200).json({ password });
        } catch (error) {
          console.error(`Erro ao buscar senha pelo email: ${error.message}`);
          res.status(500).json({ message: `Falha na requisição` });
        }
      }

}

export default accountController;