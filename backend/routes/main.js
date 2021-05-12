const express = require("express");
const router = express.Router();
const mainController = require("../controllers/mainController");

router.get("/", mainController.hello);
router.get("/redirect-back", mainController.redirectBack);
// router.get("*", mainController.pageNotFound);

module.exports = router;
