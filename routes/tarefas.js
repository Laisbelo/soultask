const {Router} = require("express");
const Tarefa = require("../models/tarefa")

const router = Router();

//Inserção de Tarefas (POST)
router.post("/tarefas", async(req,res) =>{
    try {
        //criando o novo documento do Mongo
        const { titulo, descricao, status } = req.body;
        const tarefa = new Tarefa({titulo,descricao,status});
        //save -> inserir o documento na coleção tarefas
        await tarefa.save();
        res.status(201).json(tarefa);
} catch (err) {
    console.log(err);
    res.status(500).json({message: "Um erro aconteceu." })
}
});
//Listagem de todas as Tarefas (GET)
router.get("/tarefas", async (req,res)=>{
//realiza uma busca cde todos os documentos na coleção
const tarefas = await Tarefa.find();
res.json(tarefas);
})

//Listagem de uma Tarefa (GET)
router.get("/tarefas/:id", async (req,res)=>{
try{
    const {id} = req.params;
    //realiza uma busca específica por um documento
    const tarefaExistente = await Tarefa.findById(id);
    if(tarefaExistente){
        res.status(200).json(tarefaExistente);
    } else {
        res.status(404).json({message:"Tarefa não encontrada."})
    }
} catch (err){
    console.log(err);
    res.status(500).json({message: "Um erro aconteceu." })
}
});

//Atualização de uma Tarefa (PUT)
router.put("/tarefas/:id", async (req,res)=>{
try{
    const {id} = req.params;
    const { titulo, descricao, status } = req.body;

    //caso encontre o id, realiza a atualização
    //retorna o objeto
    const tarefaExistente = await Tarefa.findByIdAndUpdate(id, {titulo, descricao, status});
    if(tarefaExistente){
        res.json({message: "Tarefa editada."})
    } else {
        res.status(404).json({message: "Tarefa não encontrada."})
    }
} catch(err) {
    console.log(err);
    res.status(500).json({message: "Um erro aconteceu." })
}
});

//Remoção de uma Tarefa (DELETE)
router.delete("/tarefas/:id", async (req,res)=>{
try{
    const {id} = req.params;
    const tarefaExistente = await Tarefa.findByIdAndRemove(id)

    if(tarefaExistente){
        res.json({message:"Tarefa excluida."})
    } else {
        res.status(404).json({message: "Tarefa não encontrada."})
    }
} catch(err){
    console.log(err);
    res.status(500).json({message: "Um erro aconteceu." })
}
});

module.exports = router;