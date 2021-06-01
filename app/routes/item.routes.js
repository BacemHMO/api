const { authJwt } = require("../middleware");

module.exports = app => {
    const Items = require("../controllers/item.controller.js");
  
    var router = require("express").Router();
  
    // Create a new Items
    router.post("/", [authJwt.verifyToken, authJwt.isModerator], Items.create);
  
    // Retrieve all Items
    router.get("/", [authJwt.verifyToken, authJwt.isModerator], Items.findAll);
  
    // Retrieve all Items by restaurant id
    router.get("/restaurant/:id", Items.findAllItemByRestaurantId);
  
    // Retrieve a single Items with id
    router.get("/:id", Items.findOne);
  
    // Update a Items with id
    router.put("/:id", Items.update);
  
    // Delete a Items with id
    router.delete("/:id", Items.delete);
  
    // Delete all Items
    router.delete("/", Items.deleteAll);
  
    app.use('/api/items', router);
  };