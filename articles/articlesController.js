//Local onde irá ficar toda a lógica da parte de artigos
const express = require("express");
const router = express.Router();


router.get("/artigos",(req,resp)=>{
    resp.send("rotas")
})



module.exports = router;