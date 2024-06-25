const mongoose = require("mongoose");

const addressSchema = new mongoose.Schema(
	{
		street: { type: String, required: true },
		city: { type: String, required: true },
		state: { type: String, required: true },
		postalCode: { type: String, required: true },
		country: { type: String, required: true },
	},
	{ _id: false }
);

const orderSchema = new mongoose.Schema(
	{
		userId: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
		orderStatus: {
			type: String,
			enum: ["pending", "confirmed", "delivered"],
			default: "pending",
		},
		products: [
			{
				productId: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "Product",
					required: true,
				},
				quantity: { type: Number, required: true, min: 1 },
			},
		],
		address: { type: addressSchema, required: true },
	},
	{ timestamps: true }
);

module.exports = mongoose.model("Order", orderSchema);
