const Sequelize = require("sequelize");
const connection = require("../database/connection");

const CategorieModal = connection.define("Categoria",{
    title: {
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    }
})


//CategorieModal.sync({force:true})


module.exports = CategorieModal;