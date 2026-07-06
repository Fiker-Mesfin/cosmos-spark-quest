const express = require("express");

const router = express.Router();

const { getSpaceObject } = require("../controllers/spaceController");

router.get("/:name", getSpaceObject);

module.exports = router;
