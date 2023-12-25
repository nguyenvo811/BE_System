const Category = require("../model/category.model");

const addCategory = (data) => {
	return new Promise(async (resolve, reject) => {
		const findCategory = await Category.findOne({ categoryName: data.categoryName });
		if (findCategory) {
			console.log("Product category already exists!");
			return reject("Product category already exists!");
		} else {
			const newData = {
				categoryName: data.categoryName,
				description: data.description,
			}
			await Category(newData)
				.save()
				.then((res) => {
					return resolve(res);
				})
				.catch((error) => {
					return reject(error);
				});
		}
	});
};

const editCategory = (data) => {
	return new Promise(async (resolve, reject) => {
		const findCategory = await Category.findById(data.categoryID);
		console.log(findCategory)
		if (findCategory) {
			await Category
				.findByIdAndUpdate(findCategory, {
					$set: {
						categoryName: data.categoryName,
						description: data.description,
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
			return reject("Product category does not exist!");
		}
	});
};

const findAll = () => {
	return new Promise(async (resolve, reject) => {
		const findCategory = await Category.find();
		if (findCategory) {
			return resolve(findCategory);
		} else {
			return reject("The database is empty!");
		}
	});
};

const findCategory = (categoryID) => {
	return new Promise(async (resolve, reject) => {
		const findCategory = await Category.findById(categoryID);
		if (findCategory) {
			return resolve(findCategory);
		} else {
			return reject("The database is empty!");
		}
	});
};

const deleteCategory = (categoryID) => {
	return new Promise(async (resolve, reject) => {
		const findCategory = await Category.findByIdAndDelete(categoryID);
		if (findCategory) {
			return resolve(findAll());
		} else {
			return reject("Category ID not exist");
		}
	});
};

module.exports = {
	addCategory: addCategory,
	editCategory: editCategory,
	findAll: findAll,
	deleteCategory: deleteCategory,
	findCategory: findCategory
};