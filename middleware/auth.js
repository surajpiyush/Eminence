const jwt = require("jsonwebtoken");
const User = require("../models/User.model");

const auth = async (req, res, next) => {
	const token = req.headers.authorization?.split(" ")[1];

	try {
		const decoded = jwt.verify(token, process.env.JWT_SECRET);
		const user = await User.findById(decoded.id);
		if (!user) {
			res.status(400).json({
				status: false,
				message: "User not found while authentication",
				response: "",
			});
		}
		req.user = user;
		next();
	} catch (error) {
		res.status(401).json({
			status: false,
			message: "Please authenticate.",
			response: error,
		});
	}
};

const authorize = (roles) => (req, res, next) => {
	console.log('this si usr',req.user)
	if (!roles.includes(req.user.role)) {
		return res
			.status(403)
			.send({ status: false, message: "Access denied.", response: "" });
	}
	next();
};

const generateToken = (user) => {
	return jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, {
		expiresIn: "1h",
	});
};
module.exports = { auth, authorize, generateToken };
