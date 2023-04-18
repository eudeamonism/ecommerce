import express from 'express';
import asyncHandler from 'express-async-handler';
import Order from '../models/Order.js';
import { protectRoute } from '../middleware/authMiddleware.js';

const orderRoutes = express.Router();

//Controllers
//General pattern of controllers is to gather data from the request body, the place that holds the data that was entered by the user. Next, what is common is either to input that data in some kind of save command into the database or use a part of the data to find an account.
const createOrder = asyncHandler(async (req, res) => {
	try {
		const { orderItems, shippingAddress, paymentMethod, shippingPrice, totalPrice, paymentDetails, userInfo } =
			req.body;

		if (!orderItems && orderItems.length === 0) {
			throw new Error('No order items');
		}

		const order = new Order({
			orderItems,
			user: userInfo._id,
			username: userInfo.name,
			email: userInfo.email,
			shippingAddress,
			paymentMethod,
			paymentDetails,
			shippingPrice,
			totalPrice,
		});

		const createdOrder = await order.save();

		if (!createdOrder) {
			throw new Error('Failed to save order');
		}

		res.status(201).json(createdOrder);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
});

orderRoutes.route('/').post(protectRoute, createOrder);

export default orderRoutes;

//We then need to add this to our routes at index.js
