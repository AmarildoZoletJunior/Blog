const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const connection = require("./database/connection");


app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

app.get("/",(req,resp)=>{
    resp.render("index");
})
connection.authenticate().then(()=>{
    console.log("Conectado ao banco com sucesso");
}).catch((erro)=>{
    console.log("Erro ao conectar com o banco: "+ erro);
})

app.listen(3000,"192.168.0.100",(()=>{
    try{
        console.log("Servidor iniciado com sucesso. 192.168.0.100");
    }catch(erro){
        console.log("Ocorreu um erro ao iniciar o servidor, erro: " + erro);
    }
}))









