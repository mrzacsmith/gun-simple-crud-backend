const router = require("express").Router();

const users = require("../controllers/user.controller.js");

// Create a new user
router.post("/", users.create);

// Retrieve all users
router.get("/", users.findAll);

// Retrieve a single user with userId
router.get("/:userId", users.findOne);

// Update a user with userId
router.put("/:userId", users.update);

// Delete a user with userId
router.delete("/:userId", users.delete);

// Delete all users
router.delete("/", users.deleteAll);

module.exports = router;
