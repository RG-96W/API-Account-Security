// account.js
import mongoose from 'mongoose';

const accountSchema = new mongoose.Schema({
  login: String,
  password: String,
  // Outros campos da conta, se necessário
});

const account = mongoose.model('Account', accountSchema);

export default account;