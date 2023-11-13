const express = require("express");
const router = express.Router();
const { verifyToken, requiredSignIn } = require("../middleware/auth");
const WishList = require("../controller/wishList.controller");

router.post("/add-to-wish-list", requiredSignIn, WishList.createWishlist);
router.get("/view-wish-list", requiredSignIn, WishList.viewWishList);
router.delete("/delete-from-wish-list", requiredSignIn, WishList.deleteProduct);

module.exports = router;