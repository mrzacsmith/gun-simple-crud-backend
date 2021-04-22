const router = require("express").Router();

const genders = require("../controllers/gender.controller.js");

// initiate genders table
router.post("/", genders.create);

// Retrieve all genders
router.get("/", genders.findAll);

// Retrieve a single gender with userId
router.get("/:genderId", genders.findOne);


module.exports = router;
