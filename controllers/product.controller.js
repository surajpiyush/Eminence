const ProductModel = require("../models/Product.model");

module.exports.createProduct = async (req, res,next) => {
	try {
		let filename;
		const { name, price, category } = req.body;
		console.log('this is ysyyu',req.user)
		const author = req.user._id;
		if (!name || !price || !category) {
			return res.status(400).json({
				status: false,
				message: "name and price required",
				response: "",
			});
		}

		console.log('request',req.file)
		if (req.file) {
			filename = req.file.filename || null;
		}
		const product = await ProductModel.create({
			name,
			price,
			category,
			img: filename,
			author,
		});
		return res.status(201).json({
			status: true,
			message: "Product created successfully",
			response: product,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, message: error.message, resonse: "" });
	}
};

module.exports.updateProduct = async (req, res) => {
	try {
		let filename;
		const { productId } = req.params;
		const { name, price, category } = req.body;
		if (!name || !price) {
			return res.status(400).json({
				status: false,
				message: "name and price required",
				response: "",
			});
		}

		if (req?.file) {
			filename = req?.file.filename || null;
		}

		const updatedProduct = await ProductModel.findByIdAndUpdate(
			productId,
			{
				name,
				price,
				category,
				img: filename,
			},
			{ new: true }
		);
		if (!updatedProduct) {
			return res.status(404).json({
				status: false,
				message: "Product not found",
				response: "",
			});
		}

		return res.status(201).json({
			status: true,
			message: "Product updated  successfully",
			response: updatedProduct,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, message: error.message, resonse: "" });
	}
};

module.exports.getProducts = async (req, res) => {
	try {
		const products = await ProductModel.find().populate('author','-token -password')
		return res
			.status(200)
			.json({ status: true, message: "All products", response: products });
	} catch (error) {
		res
			.status(400)
			.json({ status: false, message: error.message, response: "" });
	}
};
