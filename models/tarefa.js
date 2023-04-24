const { model, Schema } = require("mongoose");

const Tarefa = model(
    "tarefa", 
    new Schema({
        titulo: {
            type: String, //String,number,boolean
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
        status : {
            type: String,
            default: "pendente", //finalizada
        },
    }));
//no model, temos:
//nome do modelo, base da coleção
//schema: validação do documento (titulo, descrição,status)

module.exports = Tarefa;