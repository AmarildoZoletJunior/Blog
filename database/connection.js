const { application } = require("express");
const sequelize = require("sequelize");
const connection = new sequelize("blog","root","Junior123",{
   host: "localhost",
   dialect: "mysql",
   timezone: "-03:00"
});


connection.authenticate().then(()=>{
   console.log("Conectado ao banco com sucesso");
}).catch((erro)=>{
   console.log("Erro ao conectar com o banco: "+ erro);
})

module.exports = connection