const bcrypt = require('bcrypt');
const saltRounds = 10;

const hashPassword = async (password) => {
	try {
		const salt = await bcrypt.genSalt(saltRounds);
		const hashedPassword = await bcrypt.hash(password, salt);
		return hashedPassword;
	} catch (error) {
		console.error('Error hashing password:', error);
		throw error;
	}
};

module.exports = { hashPassword };

module.exports.verifyPassword = async (password, hashedPassword) => {
	try {
		const match = await bcrypt.compare(password, hashedPassword);
		return match; 
	} catch (error) {
		console.error("Error verifying password:", error);
	}
};
