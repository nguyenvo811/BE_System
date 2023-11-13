const WishList = require("../model/wishList.model");

const createWishlist = (data) => {
    return new Promise(async (resolve, reject) => {
        let findWishList = await WishList.findOne({user: data.user}).populate("wishListItem.product", "productName price");
        
        if(!findWishList){
            const newData = {
                user: data.user,
                wishListItem: data.wishListItem
            };
            findWishList = new WishList(newData);
        } 
        else {
            const findItem = findWishList.wishListItem.find(p => p.product._id == data.wishListItem.product);
                // console.log("asdsad",findItem)
                // console.log("inf: ", data)
            if (findItem) {
                WishList.updateOne({user: data.user}, {
                    $pull: {
                        wishListItem: {
                            product: data.wishListItem.product
                        }
                    }
                }, {upsert:true})
                .then(res => {return resolve(res)})
                .catch(err => {return reject(err)}) 
            } else {
                findWishList.wishListItem.push({
                    product: data.wishListItem.product,
                    isLiked: data.wishListItem.isLiked
                }); 
            }
        } 
        await findWishList.save()
        return resolve(findWishList)
    });
};

const viewWishList = (user) => {
    return new Promise(async (resolve, reject) => {
        console.log(user)
        const findItem = await WishList.findOne({ user: user }).populate("wishListItem.product");
        if (findItem) {
            return resolve(findItem);
        } else {
            return reject("there is empty");
        }
    });
};

const deleteProduct = (user, product) => {
    return new Promise(async (resolve, reject) => {
        let findWishList = await WishList.findOne({user: user})
        if (findWishList) {
            const findItem = findWishList.wishListItem.find(p => p.product);
            if (findItem) {
                WishList.updateOne({user: user}, {
                    $pull: {
                        wishListItem: {
                            product: product
                        }
                    }
                }, {upsert:true})
                .then(res => {return resolve(res)})
                .catch(err => {return reject(err)}) 
            }
        } else {
            return reject("Wish list not exist");
        }
    });
};

module.exports = {
    createWishlist: createWishlist,
    viewWishList: viewWishList,
    deleteProduct: deleteProduct,
    // deleteCart: deleteCart
};