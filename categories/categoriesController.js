//Local onde irá ficar toda a lógica da parte de categorias
const express = require("express");
const router = express.Router();
const Modal = require("./CategoriesModel");
const slugifi = require("slugify");

router.get("/admin/categorias/novo",(req,resp)=>{
    resp.render("admin/categories/new");
})

router.post("/admin/categorias/salvar",(req,resp)=>{
    let slug = req.body.titulo.replace(" ", "-");
    let title = req.body.titulo;
    if(title !== undefined && title !== ""){
    Modal.create({
        title: title,
        slug: slugifi(title),
    }).then(()=>{
        console.log("Salva com sucesso")
        resp.redirect("/")
    }).catch((erro)=>{
        console.log("Erro: "+erro);
    })
}else{
    resp.redirect("/admin/categorias/novo");
}
})

router.get("/",(req,resp)=>{
    Modal.findAll({raw:true}).then((card)=>{
        resp.render("index",
        {
            resposta:card
        });
    })
})
router.get("/admin/painel",(req,resp)=>{
    Modal.findAll({raw:true}).then((card)=>{
        resp.render("admin/categories/panel",
        {
            resposta:card
        });
    })
})
router.post("/admin/removercategoria",(req,resp)=>{
    
})


module.exports = router;