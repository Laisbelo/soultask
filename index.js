require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");

//Configuração do app do express
const app = express();
app.use(express.json());

//Configuração(conexão) do banco de dados
mongoose.connect(process.env.MONGODB_URL);
const Tarefa = require("./models/tarefa")

//Rotas



const tarefasRouter = require("./routes/tarefas");
const produtosRouter = require("./routes/produtos")
app.use(tarefasRouter);
app.use(produtosRouter);

//Escuta de eventos

app.listen(3000, () => {
    console.log("Servidor rodando em http://localhost:3000/")
})

//1) Conexão com o Mongo usando a URL
//2) Criar o model de Tarefa
//3) As rotas GET, POST, PUT e DELETE