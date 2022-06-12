const express = require("express");

const router = express.Router();

const { authCheck } = require("../middlewares/auth");

const { createupdateUser } = require("../controllers/auth");

// routes
router.post("/createupdate-user", authCheck, createupdateUser);

module.exports = router;
