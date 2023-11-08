const Product = require("../model/product.model");
const productHelper = require("../helper/product.helper");

const addSmartPhone = async (req, res) => {
	const newProduct = new Product({
		productName: req.body.productName,
		description: req.body.description,
		category: req.body.category,
		brand: req.body.brand,
		productBrand: req.body.productBrand,
		variants: req.body.variants,
		moreAttribute: {
			screenTech: req.body.screenTech,
			resolution: req.body.resolution,
			screenSize: req.body.screenSize,
			operatingSystem: req.body.operatingSystem,
			processor: req.body.processor,
			internalMemory: req.body.internalMemory,
			ram: req.body.ram,
			mobileNetwork: req.body.mobileNetwork,
			simSlot: req.body.simSlot,
			batteryCapacity: req.body.batteryCapacity
		}
	});
	console.log(req.body.variants)
	try {
		await productHelper
			.addProduct(newProduct)
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

const addTablet = async (req, res) => {
	const newProduct = new Product({
		productName: req.body.productName,
		description: req.body.description,
		category: req.body.category,
		brand: req.body.brand,
		productBrand: req.body.productBrand,
		variants: req.body.variants,
		moreAttribute: {
			screenTech: req.body.screenTech,
			operatingSystem: req.body.operatingSystem,
			processorChip: req.body.processorChip,
			graphicsChip: req.body.graphicsChip, 
			wifi: req.body.wifi,
			bluetooth: req.body.bluetooth,
			internalMemory: req.body.internalMemory,
			ram: req.body.ram,
			dimensionsNWeight: req.body.dimensionsNWeight
		}
	});
	console.log(req.body.variants)
	try {
		await productHelper
			.addProduct(newProduct)
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

const addTV = async (req, res) => {
	const newProduct = new Product({
		productName: req.body.productName,
		description: req.body.description,
		category: req.body.category,
		brand: req.body.brand,
		productBrand: req.body.productBrand,
		variants: req.body.variants,
		moreAttribute: {
			resolution: req.body.resolution,
			screenSize: req.body.screenSize,
			productType: req.body.productType,
			port: req.body.port,
			weight: req.body.weight
		}
	});
	console.log(req.body.variants)
	try {
		await productHelper
			.addProduct(newProduct)
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

const addLaptop = async (req, res) => {
	const newProduct = new Product({
		productName: req.body.productName,
		description: req.body.description,
		category: req.body.category,
		brand: req.body.brand,
		productBrand: req.body.productBrand,
		variants: req.body.variants,
		moreAttribute: {
			resolution: req.body.resolution,
			cpuNumber: req.body.cpuNumber,
			baseClock: req.body.baseClock,
			dimensions: req.body.dimensions,
			weight: req.body.weight,
			ram: req.body.ram,
			operatingSystem: req.body.operatingSystem,
		}
	});
	console.log(req.body.variants)
	try {
		await productHelper
			.addProduct(newProduct)
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

const addWatch = async (req, res) => {
	const newProduct = new Product({
		productName: req.body.productName,
		description: req.body.description,
		category: req.body.category,
		brand: req.body.brand,
		productBrand: req.body.productBrand,
		variants: req.body.variants,
		moreAttribute: {
			screenSize: req.body.screenSize,
			weight: req.body.weight,
			batteryCapacity: req.body.batteryCapacity
		}
	});
	console.log(req.body.variants)
	try {
		await productHelper
			.addProduct(newProduct)
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
	const productID = req.params.productID;
	try {
		await productHelper
			.deleteProduct(productID)
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

const findAll = async (req, res) => {
	try {
		await productHelper
			.findAll()
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

const findProduct = async (req, res) => {
	try {
		const productID = req.params.productID;
		console.log(req.params)
		await productHelper
			.findProduct(productID)
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

const findProductByCategory = async (req, res) => {
	const categoryID = req.params.categoryID;
	try {
		await productHelper
			.findProductByCategory(categoryID)
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

const searchProducts = async (req, res) => {
	const productName = req.body.search;
	try {
		await productHelper
			.searchProducts(productName)
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
	addSmartPhone: addSmartPhone,
	addTablet: addTablet,
	addTV: addTV,
	addLaptop: addLaptop,
	addWatch: addWatch,
	deleteProduct: deleteProduct,
	findAll: findAll,
	findProduct: findProduct,
	findProductByCategory: findProductByCategory,
	searchProducts: searchProducts
};