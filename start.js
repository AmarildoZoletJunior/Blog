//Configs
const express = require("express");
const app = express();
const ejs = require("ejs");
const bodyParser = require("body-parser");
const connection = require("./database/connection");
const session = require("express-session");

//Model
const CategorieModel = require("./categories/CategoriesModel");
const ArticleModel = require("./articles/articlesModel");
const UserModel = require("./user/userModel");

//Controller
const categories = require("./categories/categoriesController");
const articles = require("./articles/articlesController");
const user = require("./user/userController");

//Configuração de engine 
app.set("view engine", "ejs");


//Configuração de sessões
app.use(session({
    secret: "qualquercoisa", cookie: {
        maxAge: 120000000
    }

}))


//Utilização de arquivos estáticos
app.use(express.static("public"));


//Utilização de bodyParser para conversão de dados
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json())

//Aplicação de controles de rotas
app.use("/",user);
app.use("/",categories);
app.use("/",articles);




//Configuração iniciar servidor
app.listen(3000,"192.168.0.103",(()=>{
    try{
        console.log("Servidor iniciado com sucesso. 192.168.0.103");
    }catch(erro){
        console.log("Ocorreu um erro ao iniciar o servidor, erro: " + erro);
    }
}))









