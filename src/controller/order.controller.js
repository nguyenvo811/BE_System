const Order = require("../model/order.model");
const orderHelper = require("../helper/order.helper");

const createOrder = async (req, res) => {
    const newData = new Order({
        user: req.user,
        username: req.body.username,
        orderDetail: req.body.orderDetail,
        totalPrice: req.body.totalPrice,
        shippingAddress: req.body.shippingAddress,
        note: req.body.note,
        phoneNumber: req.body.phoneNumber
    })
    console.log("body", req.body)
    try {
        await orderHelper
            .createOrder(newData)
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

const viewOrders = async (req, res) => {
    const user = req.user;
    try {
        await orderHelper
            .viewOrders(user)
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

const viewOrderDetail = async (req, res) => {
		const orderID = req.params.orderID;
		console.log(orderID)
    try {
        await orderHelper
            .viewOrderDetail(orderID)
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

const getOrders = async (req, res) => {
    try {
        await orderHelper
            .getOrders()
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

const deleteOrder = async (req, res) => {
    const orderID = req.params.orderID;
    try {
        await orderHelper
            .deleteOrder(orderID)
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

const updateOrder = async (req, res) => {
    try {
        const dataUpdate = {
            orderID: req.params.orderID,
            status: req.body.status,
        };
        console.log(dataUpdate)
      await orderHelper
        .updateOrder(dataUpdate)
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
    createOrder: createOrder,
    viewOrders: viewOrders,
		viewOrderDetail: viewOrderDetail,
    getOrders: getOrders,
    deleteOrder: deleteOrder,
    updateOrder: updateOrder
};