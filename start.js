const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const CategorieModel = require("./categories/CategoriesModel");
const ArticleModel = require("./articles/articlesModel");
const categories = require("./categories/categoriesController");
const articles = require("./articles/articlesController");

//Configuração de engine 
app.set("view engine", "ejs");

//Utilização de arquivos estáticos
app.use(express.static("public"));


//Utilização de bodyParser para conversão de dados
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//Aplicação de controles de rotas
app.use("/",categories);
app.use("/",articles);

//Rota principal



//Configuração iniciar servidor
app.listen(3000,"192.168.0.103",(()=>{
    try{
        console.log("Servidor iniciado com sucesso. 192.168.0.100");
    }catch(erro){
        console.log("Ocorreu um erro ao iniciar o servidor, erro: " + erro);
    }
}))









