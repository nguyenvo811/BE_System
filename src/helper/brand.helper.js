const Brand = require("../model/brand.model");

const addBrand = (data) => {
	return new Promise(async (resolve, reject) => {
		const findBrand = await Brand.findOne({ brandName: data.brandName });
		if (findBrand) {
			console.log("Brand is avalable!");
			return reject("Brand is avalable!");
		} else {
			const newData = {
				brandName: data.brandName,
				description: data.description,
                variants: data.variants
			}
			await Brand(newData)
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

const editBrand = (data) => {
	return new Promise(async (resolve, reject) => {
		const findBrand = await Brand.findById(data.brandID);
		console.log(findBrand)
		if (findBrand) {
			await Brand
				.findByIdAndUpdate(findBrand, {
					$set: {
						brandName: data.brandName,
						description: data.description,
                        variants: data.variants
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
			return reject("Nhãn hiệu không tồn tại!");
		}
	});
};

const findAll = () => {
	return new Promise(async (resolve, reject) => {
		const findBrand = await Brand.find();
		if (findBrand) {
			return resolve(findBrand);
		} else {
			return reject("Kho dữ liệu trống!");
		}
	});
};

const findBrand = (brandID) => {
	return new Promise(async (resolve, reject) => {
		const findBrand = await Brand.findById(brandID);
		if (findBrand) {
			return resolve(findBrand);
		} else {
			return reject("Kho dữ liệu trống!");
		}
	});
};

const deleteBrand = (brandID) => {
	return new Promise(async (resolve, reject) => {
		const findBrand = await Brand.findByIdAndDelete(brandID);
		if (findBrand) {
			return resolve(findAll());
		} else {
			return reject("Nhãn hiệu không tồn tại!");
		}
	});
};

module.exports = {
	addBrand: addBrand,
	editBrand: editBrand,
	findAll: findAll,
	deleteBrand: deleteBrand,
	findBrand: findBrand
};