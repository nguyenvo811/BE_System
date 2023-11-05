const Product = require("../model/product.model");

const addProduct = (data) => {
	return new Promise(async (resolve, reject) => {
		const findProduct = await Product.findOne({ productName: data.productName });
		console.log(data)
		if (findProduct) {
			console.log("Sản phẩm đã tồn tại!");
			return reject("Sản phẩm đã tồn tại");
		} else {
			const newData = {
				productName: data.productName,
				description: data.description,
				category: data.category,
				origin: data.origin,
				variants: data.variants,
				moreAttribute: data.moreAttribute
			};
			await Product(newData)
				.save()
				.then((res) => {
					return resolve(res);
				})
				.catch((error) => {
					return reject(error);
				}
				);
		}
	})
}

const deleteProduct = (productID) => {
	return new Promise(async (resolve, reject) => {
		const findProduct = await Product.findByIdAndDelete(productID);
		if (findProduct) {
			return resolve("Xóa sản phẩm thành công!");
		} else {
			return reject("Sản phẩm không tồn tại!");
		}
	});
};

const findAll = () => {
	return new Promise(async (resolve, reject) => {
	  const findProduct = await Product.find().populate('category', 'categoryName');
	  if (findProduct) {
		return resolve(findProduct);
	  } else {
		return reject("Kho dữ liệu trống!");
	  }
	});
  };

const findProduct = (productID) => {
	return new Promise(async (resolve, reject) => {
		const findProduct = await Product.findById(productID).populate('category', 'categoryName');
		if (findProduct) {
			return resolve(findProduct);
		} else {
			return reject("Kho dữ liệu trống!");
		}
	});
};

const findProductByCategory = (categoryID) => {
	return new Promise(async (resolve, reject) => {
		const filtering = await Product.find({ category: categoryID }).populate("category", "categoryName")
		if (filtering) {
			return resolve(filtering);
		} else {
			return reject("Sản phẩm không tồn tại!");
		}
	})
}

const searchProducts = (search) => {
	return new Promise(async (resolve, reject) => {
		const searching = await Product.find({ "productName": { $regex: ".*" + search + ".*", $options: "i" } })
		console.log(searching)
		if (searching.length > 0) {
			return resolve(searching);
		} else {
			return reject("Không tìm thấy sản phẩm!");
		}
	})
}


module.exports = {
	addProduct: addProduct,
	deleteProduct: deleteProduct,
	findAll: findAll,
	findProduct: findProduct,
	findProductByCategory: findProductByCategory,
	searchProducts: searchProducts
};