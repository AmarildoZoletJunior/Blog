const express = require("express");
const router = express.Router();



router.get("/admin/usuarios",(req,resp)=>{
    resp.send("teste");
});



module.exports = router;