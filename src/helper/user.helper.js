const User = require("../model/user.model");
const bcrypt = require("bcrypt");
const { createToken } = require("../middleware/auth");

const register = (data) => {
	return new Promise(async (resolve, reject) => {
		const findUser = await User.findOne({ email: data.email });
		if (findUser) {
			console.log("Email already exists!");
			return reject("Email already exists!");
		} else {
			const saltPassword = await User.hashPassword(data.password);
			const newData = {
				fullName: data.fullName,
				phoneNumber: data.phoneNumber,
				email: data.email,
				gender: data.gender,
				role: data.role,
				password: saltPassword
			};
			console.log(newData);
			await User(newData)
				.save()
				.then((res) => {
					return resolve(res);
				})
				.catch((error) => {
					return reject(error);
				}
				);
		}
	});
};

const login = (email, password) => {
	return new Promise(async (resolve, reject) => {
		const findUser = await User.findOne({ email: email });
		if (!findUser || !bcrypt.compareSync(
			password,
			findUser.password
		)) {
			console.log("Authentication failed. Email or password is incorrect!");
			return reject("Authentication failed. Email or password is incorrect!");
		} else {
			const accessToken = createToken(email, findUser._id, findUser.role);
			console.log("Login successful!");
			return resolve(accessToken);
		}
	});
};

const findAll = () => {
	return new Promise(async (resolve, reject) => {
		const findUsers = await User.find();
		if (findUsers) {
			return resolve(findUsers);
		} else {
			return reject("The database is empty!");
		}
	});
};

const viewProfile = (userID) => {
	return new Promise(async (resolve, reject) => {
		const findUser = await User.findById(userID);
		console.log(findUser);
		if (findUser) {
			return resolve(findUser);
		} else {
			return reject("There is no data for this user!");
		}
	});
};

const updateUser = (data) => {
	return new Promise(async (resolve, reject) => {
		const findUser = await viewProfile(data.userID);
		console.log(findUser)
		if (findUser) {
			await User
				.findByIdAndUpdate(findUser, {
					$set: {
						email: data.email,
						fullName: data.fullName,
						phoneNumber: data.phoneNumber,
						gender: data.gender,
						role: data.role
					},
				}, {
					new: true,
					upsert: true,
					rawResult: true
				})
				.then((res) => {
					console.log(res)
					return resolve(res);
				})
				.catch((error) => {
					return reject(error);
				});
		} else {
			return reject("User does not exist!");
		}
	});
};

const changePass = (user, data) => {
	return new Promise(async (resolve, reject) => {
		const findUser = await viewProfile(user);
		if (findUser) {
			// Verify the user's current password
			const isMatch = bcrypt.compareSync(data.oldPass, findUser.password);

			if (!isMatch) {
				// Return an error if the current password is incorrect
				return reject("Old password is incorrect!");
			}

			const saltPassword = await User.hashPassword(data.newPass);

			findUser.password = saltPassword;
			await findUser.save();
			return resolve(findUser)
		} else { 
			return reject("User does not exist!");
		}
	});
};

const deleteUser = (userID) => {
	return new Promise(async (resolve, reject) => {
		const findUser = await User.findByIdAndDelete(userID);
		if (findUser) {
			return resolve(findAll());
		} else {
			return reject("User does not exist!");
		}
	});
};

module.exports = {
	register: register,
	login: login,
	findAll: findAll,
	viewProfile: viewProfile,
	updateUser: updateUser,
	changePass: changePass,
	deleteUser: deleteUser
};