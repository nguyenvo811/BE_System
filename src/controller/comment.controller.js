const Comment = require("../model/comment.model");
const commentHelper = require("../helper/comment.helper");

const createComment = async (req, res) => {
    const newData = {
        product: req.body.product,
        color: req.body.color,
        commentList: {
            user: req.user,
            comment: req.body.comment,
            rating: req.body.rating
        }
    }
    console.log("pass data", newData)
    try {
        await commentHelper
            .createComment(newData)
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
    createComment: createComment
};