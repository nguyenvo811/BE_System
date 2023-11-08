const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const productSchema = new mongoose.Schema({
	productName: { type: String, required: true },
	description: { type: String, required: true },
	category: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Category",
		required: true
	},
	brand: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Brand",
		required: true
	},
	productBrand: { type: String, required: true },
	variants: [{
		color: String,
		images: [String],
		moreVariants: [{
			version: String,
			price: String,
			quantity: String,
		}]
	}],
	moreAttribute: {}
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);