const express = require("express");
const router = express.Router();
const { verifyToken, requiredSignIn } = require("../middleware/auth");
const Cart = require("../controller/cart.controller");

router.post("/add-to-cart", requiredSignIn, Cart.addCart);
router.get("/view-cart", requiredSignIn, Cart.viewCart);
router.delete("/delete-from-cart", requiredSignIn, Cart.deleteProduct);
router.delete("/delete-cart/:cartID", requiredSignIn, Cart.deleteCart);

module.exports = router;