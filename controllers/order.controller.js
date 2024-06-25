const OrderModel = require("../models/Order.model");

module.exports.createOrder = async (req, res) => {
	const userId = req.user._id
	const { orderStatus, products, address } = req.body;
	try {
		const order = await OrderModel.create({
			userId,
			orderStatus,
			products,
			address,
		});
		return res.status(201).json({
			status: true,
			messsage: "Order created successfully",
			response: order,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ status: false, message: error.message, response: "" });
	}
};

module.exports.updateOrder=async(req,res)=>{
    const { orderStatus, products } = req.body;
    const { orderId } = req.params;
  
    try {
      const updatedOrder = await OrderModel.findByIdAndUpdate(orderId, {
        orderStatus,
        products
      }, { new: true });
  
      if (!updatedOrder) {
        return res.status(404).json({
          status: false,
          message: 'Order not found',
          response: ''
        });
      }
  
     return res.status(200).json({
        status: true,
        message: 'Order updated successfully',
        response: updatedOrder
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        message: 'Server error',
        response: error.message
      });
    }
  
}


module.exports.getOrdersByUserId = async (req, res) => {
	try {
		const { userId } = req.params;
		const orders = await OrderModel.find({userId}).populate('userId','-token -password').populate('products.productId')
		return res.status(200).json({ status: true, message: "User orders", response: orders });
	} catch (error) {
	return	res
			.status(500)
			.json({ staus: false, message: error.message, response: "" });
	}
};

module.exports.getOrders = async (req, res) => {
	try {
		const orders = await OrderModel.find()
		.populate('userId', '-token -password')
		.populate({
		  path: 'products.productId',
		  populate: {
			path: 'author',
			model: 'User',
			select: 'name email role' 
		  }
		});
	  
	return	res
			.status(200)
			.json({ status: true, message: "All orders", response: orders });
	} catch (error) {
		return res.status(400).json({ status:false, message: error.message,response:'' });
	}
};
