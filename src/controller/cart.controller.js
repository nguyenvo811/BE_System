const Cart = require("../model/cart.model");
const cartHelper = require("../helper/cart.helper");

const addCart = async (req, res) => {
    const newData = {
        user: req.user,
        cartItem: {
            product: req.body.product,
            color: req.body.color,
            version: req.body.version,
            quantity: req.body.quantity
        }
    }
    console.log("pass data", newData)
    try {
        await cartHelper
            .addCart(newData)
            .then((result) => {
                return res.status(200).json({ result: true, data: result });
            })
            .catch((error) => {
                return res.status(500).json({ result: false, message: error });
            });
    } catch (error) {
        return res.status(500).json({ result: false, message: error });
    }
};

const viewCart = async (req, res) => {
    const user = req.user;
    console.log("sss", user)
    try {
        await cartHelper
            .viewCart(user)
            .then((result) => {
                return res.status(200).json({ result: true, data: result });
            })
            .catch((error) => {
                return res.status(500).json({ result: false, message: error });
            });
    } catch (error) {
        return res.status(500).json({ result: false, message: error });
    }
};

const deleteProduct = async (req, res) => {
    const data = {
        user: req.user,
        product: req.body.product,
        color: req.body.color, 
        version: req.body.version
    }
    console.log(data)
    try {
        await cartHelper
            .deleteProduct(data)
            .then((result) => {
                return res.status(200).json({ result: true, data: result });
            })
            .catch((error) => {
                return res.status(500).json({ result: false, message: error });
            });
    } catch (error) {
        return res.status(500).json({ result: false, message: error });
    }
};

const deleteCart = async (req, res) => {
    const cartID = req.params.cartID;
    try {
        await cartHelper
            .deleteCart(cartID)
            .then((result) => {
                return res.status(200).json({ result: true, data: result });
            })
            .catch((error) => {
                return res.status(500).json({ result: false, message: error });
            });
    } catch (error) {
        return res.status(500).json({ result: false, message: error });
    }
};


module.exports = {
    addCart: addCart,
    deleteProduct: deleteProduct,
    viewCart: viewCart,
    deleteCart: deleteCart
};