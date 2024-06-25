const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const UserModel = require("../models/User.model");
const { generateToken } = require("../middleware/auth");
const { hashPassword, verifyPassword } = require("../Features/EncryptDecrypt");

module.exports.register = async (req, res) => {
	const { name, email, password, role } = req.body;
	try {
		if (!name || !email || !password) {
			return res.status(400).json({
				status: false,
				message: "name ,email,password required",
			});
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			return res.status(400).json({
				status: false,
				message: "Invalid email format",
			});
		}

		const existingUser = await UserModel.findOne({ email });
		if (existingUser) {
			return res.status(400).json({
				status: false,
				message: "Email already exist",
				response: "",
			});
		}

		const hashedPassword =await hashPassword(password)
		const user = await UserModel.create({
			name,
			email,
			password: hashedPassword,
			role,
		});
		const token =await generateToken(user)
		user.token = token;
		let createdUser = await user.save();
		return res.status(201).json({
			status: true,
			message: "User created successfully",
			response: createdUser,
		});
	} catch (error) {
		return res
			.status(400)
			.json({ status: false, message: error.message, response: "" });
	}
};

module.exports.login = async (req, res) => {
	const { email, password } = req.body;
	try {
		const user = await UserModel.findOne({ email });
		let matchPassword=verifyPassword(password, user.password)
		if (!user || !matchPassword) {
			return res.status(400).json({
				status: false,
				message: "Invalid login credentials.",
				response: "",
			});
		}
		const token = generateToken(user)
		user.token = token;
		let loggedUser = await user.save();
		return res.status(200).json({
			status: true,
			message: "User logged in sccessfully",
			response: loggedUser,
		});
	} catch (error) {
		return res
			.status(400)
			.json({ status: false, message: error.message, response: "" });
	}
};

module.exports.logout = async (req, res) => {
	const { token } = req.user;
	console.log(req.user)
	if (!token) {
		return res.status(401).json({
			status: false,
			message: "No token provided",
		});
	}

	try {
		const user = await UserModel.findOneAndUpdate(
			{ _id: req.user.id },
			{ token: "" },
			{ new: true }
		);

		if (!user) {
			return res.status(404).json({
				status: false,
				message: "User not found",
			});
		}

		res.status(200).json({
			status: true,
			message: "Logout successful",
		});
	} catch (error) {
		res.status(500).json({
			status: false,
			message: "Server error",
			error: error.message,
		});
	}
};
