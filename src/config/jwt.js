import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();
const SECRET_KEY_SECURE = process.env.SECRET_KEY;

function verifyJWT(req, res, next) {
  const authorizationHeader = req.headers['authorization'];

  if (!authorizationHeader) {
    // Se o cabeçalho Authorization não estiver presente na solicitação, retorne um erro 401.
    return res.status(401).json({ message: 'Token de autenticação não fornecido' });
  }

  // O cabeçalho Authorization deve estar no formato 'Bearer TOKEN'.
  const [bearer, token] = authorizationHeader.split(' ');

  if (bearer !== 'Bearer' || !token) {
    // Se o formato não for 'Bearer TOKEN', retorne um erro 401.
    return res.status(401).json({ message: 'Formato de token inválido' });
  }

  jwt.verify(token, SECRET_KEY_SECURE, (err, decoded) => {
    if (err) {
      // Se houver um erro na verificação do token, retorne um erro 401.
      return res.status(401).json({ message: 'Falha na autenticação do token' });
    }

    // Se a verificação for bem-sucedida, você pode adicionar os dados decodificados do usuário ao objeto de solicitação (req).
    req.user = decoded;

    // Continue com a próxima função de middleware ou rota.
    next();
  });
}

export { verifyJWT };

