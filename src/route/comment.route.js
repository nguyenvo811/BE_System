const express = require("express");
const router = express.Router();
const { verifyToken, requiredSignIn } = require("../middleware/auth");
const Comment = require("../controller/comment.controller");

router.post("/create-comment", requiredSignIn, Comment.createComment);

module.exports = router;