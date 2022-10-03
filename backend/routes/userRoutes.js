const e = require('express')
const express = require('express')
const { registerUser, authUser, allUsers } = require("../controllers/userControllers")
const bcrypt = require("bcryptjs")
const protect = require('../middlewares/authMiddleware')

const router = express.Router()

require('../config/db')

router.route("/").post(registerUser).get(protect, allUsers);
router.post("/login", authUser);

module.exports = router;