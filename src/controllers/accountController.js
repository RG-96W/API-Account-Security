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
    static async accountRegister (req, res) {
        try {
            const newAccount = await account.create(req.body);
            res.status(201).json({ message: "Cadastrado com sucesso", account: newAccount})
        }   catch (erro) {
            res.status(500).json({ message: `${erro.message} - Falha ao cadastrar conta`})
        }
    }

}

export default accountController;