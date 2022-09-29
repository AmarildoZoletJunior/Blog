//Local onde irá ficar toda a lógica da parte de categorias
const express = require("express");
const router = express.Router();

router.use(express.static("../../public"));

router.get("/admin/categorias/novo",(req,resp)=>{
    resp.render("admin/categories/new");
})



module.exports = router;