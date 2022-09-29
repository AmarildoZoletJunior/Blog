const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Category = require("../categories/CategoriesModel");

const ArticleModel = connection.define("Artigo",{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
})

//Relacionamento de mão dupla

//Relacionamento: Uma categoria tem muitos artigos
Category.hasMany(ArticleModel)

//Relacionamento: Um artigo pertence a uma categoria
ArticleModel.belongsTo(Category);



module.exports = ArticleModel;