//Local onde irá ficar toda a lógica da parte de categorias
const express = require("express");
const router = express.Router();
const Modal = require("./CategoriesModel");
const slugifi = require("slugify");
const permissao = require("../middlewares/middleware");



/*Criando uma rota que lê uma pagina criada no EJS, nela contém um form que manda 
a resposta para o /admin/categorias/salvar                   */
router.get("/admin/categorias/novo",permissao,(req,resp)=>{
    resp.render("admin/categories/new");
})


/* Nesta rota estou salvando os dados recebidos da pagina /admin/categorias/novo
enviados através do form da pagina, que tem um link que redireciona para esta rota com 
as informações */
router.post("/admin/categorias/salvar",permissao,(req,resp)=>{
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



/* Esta é a rota principal, onde sera listada todas as categorias disponiveis */
router.get("/",(req,resp)=>{
    Modal.findAll({raw:true}).then((card)=>{
        resp.render("index",
        {
            teste: req.session.user,
            resposta:card
        });
    })
})

/* Rota de controle que renderiza todas as categorias disponiveis.
Nesta rota ela contem um form que caso queira deletar uma categoria
ela envia o numero do id da categoria para a rota /admin/removercategoria */
router.get("/admin/painel",permissao,(req,resp)=>{
    Modal.findAll({raw:true}).then((card)=>{
        resp.render("admin/categories/panel",
        {
            resposta:card
        });
    })
})

/* Nesta pagina sera deletada a categoria que o usuario selecionar */
router.post("/admin/removercategoria",permissao,(req,resp)=>{
    Modal.findOne(({raw:true},{where: { id: req.body.id }})).then((resposta)=>{
        Modal.destroy({
            where:{ id: req.body.id},
        }).then(()=>{
            console.log("Removido com sucesso")
            resp.redirect("/admin/painel");
        })
    })
})

/* Nesta rota esta sendo recebido os dados da categoria com um form escondido,
mesmo método usado para remover uma categoria. */
router.get("/admin/editar/:id",permissao,(req,resp)=>{
    let id = req.params.id;
    Modal.findOne(({raw:true},{where: {id: id}})).then((card)=>{
        resp.render("admin/categories/update",{
            card: card,
        })
    })
})


/* Nesta rota está recebendo o form da rota /admin/editar/:id acima,
contendo as informações que o usuario editou */
router.post("/admin/editar/novoedit",permissao,async(req,resp)=> {
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