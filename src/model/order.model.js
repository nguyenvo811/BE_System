const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const orderSchema = new mongoose.Schema({
    user: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    username: { type: String, required: true },
    shippingAddress: { type: String, required:true },
    phoneNumber: { type: String, required: true },
    note: { type: String, required:true },
    orderDetail:  [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },
        color: { type: String },
        version: { type: String },
        quantity: { type: Number }
    }],
    totalPrice: { type: Number },
    status: { 
        type: String,
        enum: ['Pending', 'Processing', 'Shipped', "Delivered"],
        default: "Pending"
    }
    
}, {timestamps: true});

module.exports = mongoose.model("Order", orderSchema);