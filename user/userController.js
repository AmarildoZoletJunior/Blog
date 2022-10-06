const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("./userModel");


router.get("/cadastrar",(req,resp)=>{
    resp.render("admin/user/register")
})
router.post("/registerConfirm",(req,resp)=>{
    let email = req.body.email;
    let senha = req.body.password;
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(senha,salt);


User.findOne({where:{email: email}}).then((user)=>{
    if(user == undefined){
        User.create({
            email: email,
            password: hash,
        }).then(()=>{
            resp.redirect("/");
            console.log("Adicionado com sucesso");
        }).catch((erro)=>{
            console.log("Erro" + erro);
        })
    }else{
        console.log("ja existe")
        resp.redirect("/cadastrar")
    }
})

    
})

router.get("/login",(req,res)=>{
    res.render("admin/user/login")
})

router.post("/autenticacao",(req,resp)=>{
    let email = req.body.email;
    let senha = req.body.password;
    User.findOne({where:{email:email}}).then((user)=>{
        if(user != undefined){
            let correcao = bcrypt.compareSync(senha,user.password);
            if(correcao){
                req.session.user = {
                    id: user.id,
                    email: user.email,
                }
                if(req.session.user.email === "amarildozj@gmail.com"){
                    resp.redirect("/admin/painel");
                }else{
                resp.redirect("/")
                }
            }else{
                resp.redirect("/login")
            }
        }else{
            resp.redirect("/login");
        }
    })
})

router.get("/logout",(req,resp)=>{
    req.session.user = undefined;
    resp.redirect("/")
})

module.exports = router;