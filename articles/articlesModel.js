const Sequelize = require("sequelize");
const connection = require("../database/connection");
const Category = require("../categories/configCategories");

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

//relacionamento entre artigo e categoria
ArticleModel.belongsTo(Category);

ArticleModel.sync({force:false});

module.exports = ArticleModel;