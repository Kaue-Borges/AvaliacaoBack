import express from "express";
import db from './Repository/index.js'
const app = express();

app.use(express.json())

app.post("/api/lista", (req, res) => {

    const {id, descricao, data, concluido} = req.body

    if(!id || !descricao || !data || !concluido){
        res.send({message: "Envia tudo as informação pra cadastrar"})
        return
    }

    db.push({id, descricao, data, concluido})

    res.status(201).send({message: "tarefa cadastrada com sucesso"})
})

app.get("/api/lista", (req, res) => {

    res.status(200).send(db);
})

app.get("/api/lista/:id", (req, res) => {

    const id = Number(req.params.id)
    const tarefa = db.find(item => item.id === id)

    if(!tarefa){
        returnres.status(404).send({
            message: "não encontrei essa tarefa"
        })
    }

    res.status(200).send(tarefa);
})

app.put("/api/lista/:id", (req, res) => {

    const id = Number(req.params.id)
    const tarefa = db.find(item => item.id === id)

    if(!tarefa){
        res.status(404).send({message: "não encontrei essa tarefa"})
        return
    }

    const {descricao, data} = req.body || {}

    if(!descricao || !data){
        res.status(400).send({message: "Envie a descricao e a data"})
        return
    }

    tarefa.descricao = descricao
    tarefa.data = data

    res.status(200).send({message: "Tarefa atualizada"})
})

app.delete("/api/lista/:id", (req, res) => {

    const id = Number(req.params.id)
    const index = db.findIndex(item => item.id === id)

    if(index === -1){
        return res.status(404).send({message: "não achei essa tarefa"})
    }

    db.splice(index, 1)

    res.status(200).send({message: "Tarefa excluida"})
})

app.put("/api/lista/:id/concluido", (req, res) => {

    const id = Number(req.params.id)
    const tarefa = db.find(item => item.id == id)

    if(!tarefa){
        return res.send({message: "não encontrei a tarefa"})
    }

    tarefa.concluido = !tarefa.concluido

    res.send(tarefa)
})

app.get("/api/lista/:id/pendente", (req, res) => {

    const id = Number(req.params.id)
    const tarefa = db.find(item => item.id === id)

    if(!tarefa){
        return res.send({message: "não encontrei a tarefa"})
    }

    if(tarefa.concluido == false){
        res.send(tarefa)
    } else {
        res.send({message: "essa tarefa ja foi feita"})
    }
})

app.listen(3004, () => {
    console.log("http://localhost:3004");
});
