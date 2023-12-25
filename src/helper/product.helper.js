const Product = require("../model/product.model");
const Comment = require("../model/comment.model");

const addProduct = (data) => {
	return new Promise(async (resolve, reject) => {
		const findProduct = await Product.findOne({ productName: data.productName });
		console.log(data)
		if (findProduct) {
			console.log("Product already exists!");
			return reject("Product already exists!");
		} else {
			const newData = {
				productName: data.productName,
				description: data.description,
				category: data.category,
				brand: data.brand,
				productBrand: data.productBrand,
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

const updateProduct = (data) => {
	return new Promise(async (resolve, reject) => {
		const findProduct = await Product.findById(data.productID).populate('category');
		console.log(findProduct)
		if (findProduct) {
			await Product
				.findByIdAndUpdate(findProduct, {
					$set: {
						productName: data.productName,
						description: data.description,
						category: data.category,
						brand: data.brand,
						productBrand: data.productBrand,
						variants: data.variants,
						moreAttribute: data.moreAttribute
					},
				}, {
					new: true,
					upsert: true,
					rawResult: true
				})
				.then((res) => {
					return resolve(res);
				})
				.catch((error) => {
					console.error(JSON.stringify(error));
					return reject(error);
				});
		} else {
			return reject("Product does not exist!");
		}
	});
};

const deleteProduct = (productID) => {
	return new Promise(async (resolve, reject) => {
		const findProduct = await Product.findByIdAndDelete(productID);
		if (findProduct) {
			return resolve("Product deletion successful!");
		} else {
			return reject("Product does not exist!");
		}
	});
};

const findAll = () => {
	return new Promise(async (resolve, reject) => {
	  const findProduct = await Product.find().populate('category', 'categoryName').populate('brand', 'brandName').populate('productBrand', 'name');
	  const findRating = findProduct.map(p => p._id.toString())
	  const findComment = await Comment.find({product: findRating});
	  if (findProduct) {
		return resolve({findProduct, findComment});
	  } else {
		return reject("The database is empty!");
	  }
	});
  };

const findProduct = (productID) => {
	return new Promise(async (resolve, reject) => {
		const findProduct = await Product.findById(productID).populate('category', 'categoryName').populate('brand', 'brandName').populate('productBrand', 'name');
		const findComment = await Comment.find({product: productID}).populate('commentList.user');
		if (findProduct) {
			return resolve({findProduct, findComment});
		} else {
			return reject("The database is empty!");
		}
	});
};

const findProductByCategory = (categoryID) => {
	return new Promise(async (resolve, reject) => {
		const filtering = await Product.find({ category: categoryID }).populate("category", "categoryName").populate('brand', 'brandName').populate('productBrand', 'variants.name');
		const findRating = filtering.map(p => p._id.toString())
		const findComment = await Comment.find({product: findRating});
		if (filtering) {
			return resolve({filtering, findComment});
		} else {
			return reject("Product does not exist!");
		}
	})
}

const searchProducts = (search) => {
	return new Promise(async (resolve, reject) => {
		const searching = await Product.find({ "productName": { $regex: ".*" + search + ".*", $options: "i" } })
		const findRating = searching.map(p => p._id.toString())
		const findComment = await Comment.find({product: findRating});
		console.log(searching)
		if (searching.length > 0) {
			return resolve({searching, findComment});
		} else {
			return reject("Product not found!");
		}
	})
}


module.exports = {
	addProduct: addProduct,
	deleteProduct: deleteProduct,
	findAll: findAll,
	findProduct: findProduct,
	findProductByCategory: findProductByCategory,
	searchProducts: searchProducts,
	updateProduct: updateProduct
};