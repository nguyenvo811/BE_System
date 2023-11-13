const Comment = require("../model/comment.model");

const avgRating = (product, color) => {
    return new Promise(async (resolve, reject) => {
        let totalRating = 0
        let findItem = await Comment.findOne({product: product, color: color})
        console.log("get item", findItem)
        if (findItem) {
            findItem.commentList.forEach(async item => {
                const rating = item.rating;
                if (rating){
                    totalRating = totalRating + rating / findItem.commentList.length
                }
            })
        } 
        console.log(totalRating)
        return resolve(totalRating)
    });
}


const createComment = (data) => {
    return new Promise(async (resolve, reject) => {
        let findComment = await Comment.findOne({product: data.product, color: data.color}).populate("product");
        if(!findComment){
            const newData = {
                product: data.product,
                color: data.color,
                commentList: data.commentList
            };
            findComment = new Comment(newData);
        } 
        else {
            const test = findComment.product._id == data.product &&
            findComment.color == data.color

            const findItem = findComment.commentList.find(p => p.user._id == data.commentList.user);
            if (findItem && test) {
                return null
            } else {
                findComment.commentList.push({
                    user: data.commentList.user,
                    comment: data.commentList.comment,
                    rating: data.commentList.rating
                }); 
            }
        }
        await findComment.save()
        findComment.totalRating = await avgRating(data.product, data.color)
        await findComment.save()
        return resolve(findComment)
    });
};


module.exports = {
    createComment: createComment
};