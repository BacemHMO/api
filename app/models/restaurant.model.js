module.exports = (sequelize, Sequelize) => {
    const Restaurant = sequelize.define("restaurants", {
      
        image : {
            type: Sequelize.STRING
        },
        name : {
            type: Sequelize.STRING
        },
        category: {
            type: Sequelize.STRING
        },
       
        address : {
            type: Sequelize.STRING
        },
        phone : {
            type: Sequelize.STRING
        },
      
    });
    return Restaurant;
}

