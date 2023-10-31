const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const promotionSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
	startDate: {
		type: Date,
		required: true,
	},
	endDate: {
		type: Date,
		required: true,
	},
	discount: {
		type: Number,
		required: true,
	},
	products: [{
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Product',
		required: true,
	}]
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);