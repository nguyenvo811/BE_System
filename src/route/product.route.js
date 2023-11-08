const express = require("express");
const router = express.Router();
const Product = require("../controller/product.controller");
const { verifyToken, requiredSignIn, isStaff } = require("../middleware/auth");

router.post("/products/smart-phones/add-smart-phone", requiredSignIn, isStaff, Product.addSmartPhone);
router.post("/products/watchs/add-watch", requiredSignIn, isStaff, Product.addWatch);
router.post("/products/laptops/add-laptop", requiredSignIn, isStaff, Product.addLaptop);
router.post("/products/televisions/add-television", requiredSignIn, isStaff, Product.addTV);
router.post("/products/tablets/add-tablet", requiredSignIn, isStaff, Product.addTablet);
// router.patch("/products/timers/:productID", requiredSignIn, isStaff, Product.editTimer);
// router.post("/products/speakers/:productID", requiredSignIn, isStaff, Product.editSpeaker);
// router.post("/products/amplifiers/:productID", requiredSignIn, isStaff, Product.editAmplifier);
router.delete("/products/:productID", requiredSignIn, verifyToken, Product.deleteProduct);
router.get("/products", requiredSignIn, isStaff, Product.findAll);
router.get("/home/products", Product.findAll);
router.get("/products/:productID", Product.findProduct);
router.get("/products/products-category/:categoryID", Product.findProductByCategory);
router.get("/search-products", Product.searchProducts);

module.exports = router;