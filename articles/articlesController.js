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
router.get("/:idCategorias/artigos/:idPagina",(req,resp)=>{
    Model.findOne({where: {id: req.params.idCategorias}}).then((resposta2)=>{
    Article.findAll(({where: {CategoriumId: req.params.idCategorias},include: [{model: Model}]})).then((resposta)=>{
      
    let pagina = req.params.idPagina;
    let offset = 0;
    if(isNaN(pagina) || pagina <= 1){
        offset = 0;
    }else{
        offset = (parseInt(pagina) * 4)-4;
    }
    Article.findAndCountAll({where: {CategoriumId: req.params.idCategorias},include: [{model: Model}],
        limit: 4,
        offset: offset,
    }).then((artigos)=>{
       let proximo;
       if ( offset + 4 >= artigos.count){
        proximo = false;
       }else{
        proximo = true;
       }
       let Parse = parseInt(pagina);
       let totalFrente = String(Parse+1);
       let totalTras = String(Parse-1);
       let momento =  String(Parse);
       let resultado = {
        proximo : proximo,
        artigos: artigos,
        numberPaginaFrente:totalFrente,
        numberPaginaTras: totalTras,
        numberMomento: momento,
       }
       resp.render("admin/articles/read",{
        resposta:resposta,
        respostadois: resposta2,
        resultado:resultado
    })
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
    })
})

router.post("/admin/artigos/editar",(req,resp)=>{
    Article.findOne({where: {id: req.body.id}}).then((resposta1)=>{
        Model.findOne(({where: {id: req.body.id2}})).then((resposta2)=>{
            resp.render("admin/articles/edit",{
                resposta:resposta1,
                resposta2: resposta2
            })
        })
    })
})

router.post("/admin/artigos/salvaredit",(req,resp)=>{
        Article.update({  
            title: req.body.title,
            slug: slugify(req.body.title),
            body: req.body.article,
        },{where: {id: req.body.idArtigo}}).then((resposta)=>{
            resp.redirect("/admin/artigos/painel")
        })
    })

module.exports = router;