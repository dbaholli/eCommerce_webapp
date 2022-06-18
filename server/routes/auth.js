const express = require("express");

const router = express.Router();

const { authCheck, adminCheck } = require("../middlewares/auth");

const { createupdateUser, currentUser } = require("../controllers/auth");

// routes
router.post("/createupdate-user", authCheck, createupdateUser);
router.post("/current-user", authCheck, currentUser);
router.post("/current-admin", authCheck, adminCheck, currentUser);

module.exports = router; 
