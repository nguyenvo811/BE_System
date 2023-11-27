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
						const findItem = findWishList.wishListItem.find(item => item.product._id == data.wishListItem.product &&
							item.color == data.wishListItem.color && item.version == data.wishListItem.version)
            if (findItem) {
                WishList.updateOne({user: data.user}, {
                    $pull: {
                        wishListItem: {
                            product: data.wishListItem.product,
														color: data.wishListItem.color,
														version: data.wishListItem.version
                        }
                    }
                }, {upsert:true})
                .then(res => {return resolve(res)})
                .catch(err => {return reject(err)}) 
            } else {
                findWishList.wishListItem.push({
                    product: data.wishListItem.product,
										color: data.wishListItem.color,
										version: data.wishListItem.version,
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

const deleteProduct = (data) => {
    return new Promise(async (resolve, reject) => {
        let findWishList = await WishList.findOne({user: data.user})
        if (findWishList) {
					const findItem = findWishList.wishListItem.find(p => p.product._id.toString() === data.product && p.color === data.color && p.version === data.version);
            if (findItem) {
                WishList.updateOne({user: data.user}, {
                    $pull: {
                        wishListItem: {
                            product: data.product,
														color: data.color,
														version: data.version
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
};