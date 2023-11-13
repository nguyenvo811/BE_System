const Cart = require("../model/cart.model");

const totalPrice = (user) => {
	return new Promise(async (resolve, reject) => {
		let totalPrice = 0
		let findCart = await Cart.findOne({ user: user }).populate("cartItem.product");

		if (findCart) {
			findCart?.cartItem?.forEach(async cart => {
				const product = cart?.product;

				const getProductDetail = product?.variants?.find(value => value?._id == cart?.color)
				const getColor = getProductDetail?.moreVariants?.map(value => value);
				const findVersion = getColor?.find(value => value?._id == cart?.version)
				if (product) {
					// if (product.onSale){
					//     totalPrice += (product.price * (100 - product.onSale) / 100) * cart.quantity
					// } else {
					totalPrice += findVersion?.price * cart.quantity
					// }
				}
			})
		}
		return resolve(totalPrice)
	});
}

const addCart = (data) => {
	return new Promise(async (resolve, reject) => {
		let findCart = await Cart.findOne({ user: data.user }).populate("cartItem.product", "productName price");
		if (!findCart) {
			const newData = {
				user: data.user,
				cartItem: data.cartItem
			};
			findCart = new Cart(newData);
		}
		else {
			const findItem = findCart.cartItem.find(item => item.product._id == data.cartItem.product &&
				item.color == data.cartItem.color && item.version == data.cartItem.version)

			if (findItem) {
				findItem.quantity += data.cartItem.quantity;
			} else {
				findCart.cartItem.push({
					product: data.cartItem.product,
					color: data.cartItem.color,
					version: data.cartItem.version,
					quantity: data.cartItem.quantity
				});
			}
		}
		await findCart.save()
		findCart.totalPrice = await totalPrice(data.user)
		await findCart.save()
		return resolve(findCart)
	});
};

const viewCart = (userID) => {
	return new Promise(async (resolve, reject) => {
		const findCart = await Cart.findOne({ user: userID }).populate("cartItem.product");
		if (findCart) {
			return resolve(findCart);
		} else {
			return reject("there is empty");
		}
	});
};

const deleteProduct = (data) => {
	return new Promise(async (resolve, reject) => {
		let findCart = await Cart.findOne({ user: data.user })
		if (findCart) {
			const findItem = findCart.cartItem.find(val => val);
			if (findItem && findItem.color && findItem.version) {

				Cart.updateOne({ user: data.user }, {
					$pull: {
						cartItem: {
							product: data.product,
							color: data.color,
							version: data.version
						}
					}
				}, { upsert: true })
					.then(res => { return resolve(res) })
					.catch(err => { return reject(err) })
			}

			await findCart.save()
			findCart.totalPrice = await totalPrice(data.user);
			await findCart.save();
		} else {
			return reject("Cart not exist");
		}
	});
};

const deleteCart = (cartID) => {
	return new Promise(async (resolve, reject) => {
		const findCart = await Cart.findByIdAndDelete(cartID);
		if (findCart) {
			return resolve("Delete successfully");
		} else {
			return reject("Cart ID not exist");
		}
	});
};

module.exports = {
	addCart: addCart,
	viewCart: viewCart,
	deleteProduct: deleteProduct,
	deleteCart: deleteCart
};