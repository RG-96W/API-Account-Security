import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId },
  login: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9]{4,}$/.test(value),
      message: "O login deve conter pelo menos 4 caracteres alfanuméricos.",
    },
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9]{4,}$/.test(value),
      message: "A senha deve conter pelo menos 4 caracteres alfanuméricos.",
    },
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (value) => /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value),
      message: "Informe um endereço de e-mail válido.",
    },

  },

  level: {
    type: Number,
    default: 1, // Define o valor padrão como 1
  },
  data: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

const account = mongoose.model("account", accountSchema);

export default account;
