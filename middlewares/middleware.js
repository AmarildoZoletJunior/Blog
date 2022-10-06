function auth(req,resp,next){
    if(req.session.user.email === "amarildozj@gmail.com"){
        next();
    }else{
        resp.redirect("/");
    }
}

module.exports = auth;