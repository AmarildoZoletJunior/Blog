//Local onde irá ficar toda a lógica da parte de categorias
const express = require("express");
const router = express.Router();
const Modal = require("./CategoriesModel");
const slugifi = require("slugify");

router.get("/admin/categorias/novo",(req,resp)=>{
    resp.render("admin/categories/new");
})

router.post("/admin/categorias/salvar",(req,resp)=>{
    let title = req.body.titulo;
    if(title !== undefined && title !== ""){
    Modal.create({
        title: title,
        slug: slugifi(title),
    }).then(()=>{
        console.log("Salva com sucesso")
        resp.redirect("/admin/painel")
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
    Modal.findOne(({raw:true},{where: { id: req.body.id }})).then((resposta)=>{
        Modal.destroy({
            where:{ id: req.body.id},
        }).then(()=>{
            console.log("Removido com sucesso")
            resp.redirect("/admin/painel");
        })
    })
})
router.get("/admin/editar/:id",(req,resp)=>{
    let id = req.params.id;
    Modal.findOne(({raw:true},{where: {id: id}})).then((card)=>{
        resp.render("admin/categories/update",{
            card: card,
        })
    })
})
router.post("/admin/editar/novoedit",async(req,resp)=> {
    let id = req.body.id;
       await Modal.update({
            title: req.body.titulo,
            slug:  slugifi(req.body.titulo),
        },{ where: { id: id }}).then(()=>{
            console.log("Alterado com sucesso")
            resp.redirect("/admin/painel")
        })
})


module.exports = router;