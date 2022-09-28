const { application } = require("express");
const sequelize = require("sequelize");
const connection = new sequelize("blog","root","junior123",{
   host: "localhost",
   dialect: "mysql",
});


connection.authenticate().then(()=>{
   console.log("Conectado ao banco com sucesso");
}).catch((erro)=>{
   console.log("Erro ao conectar com o banco: "+ erro);
})

module.exports = connection