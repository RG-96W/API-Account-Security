import account from "../models/accounts.js"
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY_SECURE = process.env.SECRET_KEY;

class accountController {



  static async accountId(req, res) {
    try {
      const accountId = req.params.id;
      // Assumindo que você está usando algum mecanismo para acessar o banco de dados (por exemplo, MongoDB)
      const accounts = await account.findOne({ _id: accountId });
  
      if (!accounts) {
        return res.status(404).json({ message: 'Conta não encontrada' });
      }
  
      res.status(200).json(accounts);
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisição` });
    }
  };

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
            
            // Retorne a senha como parte da resposta JSON
            res.status(200).json({ password });
          } catch (error) {
            console.error(`Erro ao buscar senha pelo email: ${error.message}`);
            res.status(500).json({ message: `Falha na requisição` });
          }
        }

        static async login(req, res) {
          try {
            const { login, password } = req.body;
      
            // Faça a lógica de autenticação aqui
            // Consulte o banco de dados para verificar se o usuário existe e se a senha está correta
      
            // Por exemplo, consulte o banco de dados para encontrar o usuário
            const user = await account.findOne({ login, password });
      
            if (!user) {
              return res.status(401).json({ message: 'Credenciais inválidas' });
            }
      

            // Se a autenticação for bem-sucedida, você pode simplesmente retornar uma resposta de sucesso
            const token = jwt.sign({ login }, SECRET_KEY_SECURE, { expiresIn: '1h' });

            res.status(200).json({ auth: true, token, login, level: user.level });
            // res.status(200).json({ message: 'Autenticação bem-sucedida' });

          } catch (error) {
            console.error('Erro ao processar a solicitação de login:', error);
            res.status(500).json({ message: 'Erro interno do servidor' });
          }
        }


        static async accountUpdate(req, res) {
          try {
            const newAccount = await account.create(req.body);
            res.status(201).json({ message: "Cadastrado com sucesso", account: newAccount });
          } catch (error) {
            console.error('Erro ao processar a solicitação POST:', error);
            // Envie uma resposta de erro
            res.status(500).send('Erro interno do servidor.');
          }
        }

        static async accountLogin(req, res) {
          let updateUser = req.body;
          try {
            const login = req.params.login;
            
            if (!login) {
              return res.status(400).json({ message: 'Parâmetro de login ausente na rota' });
            }
        
            const user = await account.findOneAndUpdate({ login }, updateUser, { new: true });
        
            if (!user) {
              return res.status(400).json({ message: 'Erro nos parâmetros do usuário!' });
            }
        
        
            if (!updateUser) {
              return res.status(400).json({ message: 'Erro na requisição!' });
            }
        
            // Atualize o usuário no banco de dados com os dados em updateUser
            // Esta parte está faltando no seu código atual
        
            res.status(200).json({ message: 'Login atualizado com sucesso', updateUser });
          } catch (error) {
            res.status(500).json({ message: 'Erro interno do servidor', error: error.message });
          }
        }
      }

export default accountController;