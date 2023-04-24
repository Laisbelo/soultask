const { model, Schema } = require("mongoose");

const Produtos = model(
    "produto", 
    new Schema({
        nome: {
            type: String, //String,number,boolean
            required: true,
        },
        descricao: {
            type: String,
            required: true,
        },
        quantidade : {
            type: Number,
            required: true,
        },
        preco : {
            type: Number,
            required: true,
        },
        desconto : {
            type: String,
        },
        dataDesconto : {
            type: Date,
        },
        categoria : {
            type: String,
            required: true,
        },
        imagemProduto : {
            type: String,
        },
    }));
//no model, temos:
//nome do modelo, base da coleção
//schema: validação do documento (titulo, descrição,status)

module.exports = Produtos;