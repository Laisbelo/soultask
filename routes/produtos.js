const {Router} = require("express");
const Produtos = require("../models/produtos")

const router = Router();


//Inserção de Produto (POST)
router.post("/produtos", async(req,res)=>{
    try{
        const {nome, descricao, quantidade, preco, desconto,dataDesconto, categoria, imagemProduto} = req.body;
        const novoProduto = new Produtos({nome, descricao, quantidade, preco, desconto,dataDesconto, categoria, imagemProduto});
        await novoProduto.save();
        res.status(201).json(novoProduto);
    } catch(err){
        res.status(500).json({message:"Um erro aconteceu."})
        console.log(err)
    }
});

//Listar todos os produtos
router.get("/produtos", async(req,res)=>{
    const produtos = await Produtos.find();
    res.status(200).json(produtos);
});

//Listar um produto
router.get("/produtos/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const produto = await Produtos.findById(id);
        if(produto){
            res.status(200).json(produto)
        } else {
            res.status(404).json({message:"Produto não encontrado."})
        }
    } catch (err) {
        res.status(500).json({message:"Um erro aconteceu."})
        console.log(err)
    }
});

//Atualizar produto
router.put("/produtos/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const {nome, descricao, quantidade, preco, desconto,dataDesconto, categoria, imagemProduto} = req.body;
        const produtoExistente = await Produtos.findByIdAndUpdate(id,{nome, descricao, quantidade, preco, desconto,dataDesconto, categoria, imagemProduto});
        if(produtoExistente) {
            res.status(200).json({message:"Produto editado."});
        } else {
            res.status(404).json({message:"Produto não encontrado."})
        }
    } catch (err) {
        res.status(500).json({message:"Um erro aconteceu."})
        console.log(err)
    }
});

router.delete("/produtos/:id", async(req,res)=>{
    try{
        const {id} = req.params;
        const produtoExistente = await Produtos.findByIdAndDelete(id);
        if(produtoExistente){
            res.status(200).json({message: "Produto deletado."})
        } else {
            res.status(404).json({message:"Produto não encontrado."})
        }
    } catch (err) {
        res.status(500).json({message:"Um erro aconteceu."})
        console.log(err)
    }
});

module.exports = router;