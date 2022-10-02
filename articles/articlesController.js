//Local onde irá ficar toda a lógica da parte de artigos
const express = require("express");
const router = express.Router();
//model sera utilizado para retornar o nome das categorias
const Model = require("../categories/CategoriesModel");
const Article = require("./articlesModel");
const slugify = require("slugify");


//Painel de administração de artigos, ele recebe include model para
//transformar os id das categorias em titulo delas
router.get("/admin/artigos/painel",(req,resp)=>{
    Article.findAll({
        //incluindo informações da tabela de categorias no painel de artigos
        include: [{model: Model}]
    }).then((resposta)=>{
        resp.render("admin/articles/panel",{
            resposta:resposta
        })
    })
})

//incluindo rota para adiciona criar artigo, esta rota esta recebendo os id das categorias juntamente com os nomes
router.get("/admin/artigos/criar",(req,resp)=>{
    //Aqui esta recebendo o Model das categorias para pode repassar informação das categorias
    Model.findAll().then((resposta)=>{
        resp.render("admin/articles/new",{
            resposta: resposta,
        })
    })
})

//rota criada para salvar informação no banco de dados.
router.post("/artigos/save",(req,resp)=>{
    let title = req.body.title;
    let corpo = req.body.article;
    let category = req.body.category;
    if(title !== "" && corpo !== "" && title != undefined && corpo != undefined){
    Article.create({
        title: title,
        slug: slugify(title),
        body: corpo,
        CategoriumId: category,
    }).then((resposta)=>{
        resp.redirect("/admin/painel")
    })
}else{
    resp.redirect("/admin/artigos/criar");
}
})


//rota para remover algum artigo do banco, aqui estamos recebendo o id que esta armazenado em um
//input escondido dentro da pagina artigos
router.post("/admin/artigos/remover",(req,resp)=>{
    Article.destroy({
        where:{ id: req.body.id},
    }).then(()=>{
        console.log("Removido com sucesso")
        resp.redirect("/admin/artigos/painel");
    })
})

/* Nesta rota estamos renderizando a pagina com as informações do modal
e também do article, para termos a lista de artigos de uma categoria */
router.get("/:idCategorias/artigos",(req,resp)=>{
    Model.findOne({where: {id: req.params.idCategorias}}).then((resposta2)=>{
    Article.findAll(({where: {CategoriumId: req.params.idCategorias},include: [{model: Model}]})).then((resposta)=>{
            resp.render("admin/articles/read",{
                resposta:resposta,
                respostadois: resposta2
            })
        })
    })
})

/* Aqui esta uma pagina que renderiza o artigo solo, nesta pagina esta sendo pego o numero da categoria
e também o slug do artigo */
router.get("/artigo/:idCategoria/:SlugArtigo", (req,resp)=>{
     Article.findOne({where: {id: req.params.idCategoria}}).then((resposta)=>{
        
        resp.render("admin/articles/readsolo",{
            resposta:resposta
        });
        console.log("teste" + resposta)
    })
})


module.exports = router;