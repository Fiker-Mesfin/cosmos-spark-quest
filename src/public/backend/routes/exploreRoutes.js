const express = require("express");

const router = express.Router();

const { getObjects } = require("../controllers/exploreController");

router.get("/", getObjects);

module.exports = router;
