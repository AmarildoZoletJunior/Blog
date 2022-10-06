const express = require("express");
const router = express.Router();



router.get("/admin/usuarios",(req,resp)=>{
    resp.send("teste");
});

router.get("/cadastrar",(req,resp)=>{
    resp.render("admin/user/register")
})


module.exports = router;