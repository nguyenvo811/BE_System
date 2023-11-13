const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const cartSchema = new mongoose.Schema({
	user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    cartItem:  [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        color: { type: String},
        version: { type: String},
        quantity: { type: Number, required: true, min: 1 }
    }],
    totalPrice: { type: Number },
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);