const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());
const PORT = 3000;

const User = mongoose.model("Usuario", {
  user_name: String,
  email: String,
  senha: String,
});

// REQ dados que recebo do front e RES a que vou mandar para o front
app.get("/", async (req, res) => {
  const usuarios = await User.find();
  return res.send(usuarios);
});

app.delete("/:id", async (req, res) => {
  const usuario = await User.findByIdAndDelete(req.params.id);
  return res.send(usuario);
});

app.put("/:id", async (req, res) => {
  const usuario = await User.findByIdAndUpdate(
    req.params.id,
    {
      user_name: req.body.usuario,
      email: req.body.email,
      senha: req.body.senha,
    },
    {
      new: true,
    }
  );

  return res.send(usuario);
});

app.post("/", async (req, res) => {
  const newUser = new User({
    user_name: req.body.usuario,
    email: req.body.email,
    senha: req.body.senha,
  });

  await newUser.save();
  return res.send(newUser);
});

// Aplicação vai escutar na porta 3000, então essa api vai ficar escutando qualquer requisição que chegar
app.listen(PORT, () => {
  mongoose.connect(
    "mongodb+srv://castilho:01001101@castilhocluster0.hpr3m.mongodb.net/?retryWrites=true&w=majority&appName=CastilhoCluster0"
  );
  console.log(`localhost:${PORT}`);
});
