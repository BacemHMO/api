module.exports = (sequelize, Sequelize) => {
    const Item = sequelize.define("items", {
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        image:{ 
            type: Sequelize.STRING
        },
        name:{ 
            type: Sequelize.STRING
        },
        price:{ 
            type: Sequelize.FLOAT
        },
        description:{
            type: Sequelize.STRING
        }
    });
    return Item;
};