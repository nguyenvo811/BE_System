const mongoose = require("mongoose");

mongoose.Promise = global.Promise;

const wishListSchema = new mongoose.Schema({
	user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    wishListItem:  [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        color: { type: String},
        version: { type: String},
        isLiked: { type: Boolean, default: false }
    }],
}, { timestamps: true });

module.exports = mongoose.model('WishList', wishListSchema);