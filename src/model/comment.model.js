const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const commentSchema = new mongoose.Schema({
    product: { 
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    commentList:  [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        content: { type: String, required: true },
        rating: { type: Number, required: true, min: 1, max: 5 }
    }],
    totalRating: { type: Number }
    
}, {timestamps: true});

module.exports = mongoose.model("Comment", commentSchema);