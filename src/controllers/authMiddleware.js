const jwt = require('jsonwebtoken');

const jwtSecret = process.env.JWT_SECRET || 'seuSegredoAqui';

function authMiddleware(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ message: 'Token não fornecido. Acesso não autorizado.' });
  }

  try {
    const decoded = jwt.verify(token, jwtSecret);
    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).json({ message: 'Token inválido. Acesso não autorizado.' });
  }
}

module.exports = authMiddleware;
