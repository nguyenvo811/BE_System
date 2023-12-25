const Order = require("../model/order.model");

const createOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        const newData = {
            user: data.user,
            username: data.username,
            orderDetail: data.orderDetail,
            totalPrice: data.totalPrice,
            shippingAddress: data.shippingAddress,
            note: data.note,
            phoneNumber: data.phoneNumber
        }
        console.log("new data ", data)
        await Order(newData).save()
        .then((res) => {
            return resolve(res);
        })
        .catch((error) => {
            return reject(error);
        });
    });
};

const viewOrders = (user) => {
    return new Promise(async (resolve, reject) => {
        console.log(user)
        const findOrder = await Order.find({ user: user }).populate("orderDetail.product").populate("user");
        if (findOrder) {
            return resolve(findOrder);
        } else {
            return reject("there is empty");
        }
    });
};

const viewOrderDetail = (orderID) => {
	return new Promise(async (resolve, reject) => {
			const findOrder = await Order.findOne({ _id: orderID }).populate("orderDetail.product").populate("user");
			if (findOrder) {
					return resolve(findOrder);
			} else {
					return reject("there is empty");
			}
	});
};

const getOrders = () => {
    return new Promise(async (resolve, reject) => {
        const findOrder = await Order.find().populate("orderDetail.product").populate("user", "fullName");
        if (findOrder) {
            return resolve(findOrder);
        } else {
            return reject("there is empty");
        }
    });
};

const deleteOrder = (orderID) => {
    return new Promise(async (resolve, reject) => {
        const findOrder = await Order.findByIdAndDelete(orderID);
        if (findOrder) {
        return resolve("Delete successfully");
        } else {
        return reject("Order ID not exist");
        }
    });
};

const updateOrder = (data) => {
    return new Promise(async (resolve, reject) => {
        const findItem= await Order.findById(data.orderID);
        if (findItem){
            await Order.findByIdAndUpdate(findItem,{
            $set: {
                status: data.status,
            },
        }, {
            new: true,
            upsert: true,
            rawResult: true 
        }).then((res) => {
            console.log(res)
            return resolve(res);
        })
        .catch((error) => {
            return reject(error);
        });
        } else {
        return reject("Order ID not exist");
        }
    });
};

module.exports = {
    createOrder: createOrder,
    viewOrders: viewOrders,
	viewOrderDetail: viewOrderDetail,
    getOrders: getOrders,
    deleteOrder: deleteOrder,
    updateOrder: updateOrder
};