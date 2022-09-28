//Local onde irá ficar toda a lógica da parte de categorias
const express = require("express");
const router = express.Router();


router.get("/new",(req,resp)=>{
    resp.send("rotas")
})



module.exports = router;