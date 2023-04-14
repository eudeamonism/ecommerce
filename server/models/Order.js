import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.Types.ObjectId,
			required: true,
			ref: 'User',
		},
		username: {
			type: String,
			required: true,
			ref: 'User',
		},
		email: {
			type: String,
			required: true,
			ref: 'User',
		},
		orderItems: [
			{
				name: { type: String, required: true },
				qty: { type: Number, required: true },
				image: { type: String, required: true },
				price: { type: Number, required: true },
				id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Product' },
			},
		],
		shippingAddress: {
			address: { type: String, required: true },
			city: { type: String, required: true },
			postalCode: { type: String, required: true },
			country: { type: String, required: true },
		},
		paymentMethod: { type: String, required: true, default: false },
		paymentDetails: {
			orderId: { type: String, required: true },
			payerId: { type: String, required: true },
		},
		shippingPrice: { type: Number, required: true, default: 0.0 },
		totalPrice: { type: Number, required: true, default: 0.0 },
		paidAt: { type: Date },
		isDelivered: { type: Boolean, required: true, default: false },
		deliveredAt: { type: Date },
	},
	{ timeStamps: true }
);

const Order = mongoose.model('Order', orderSchema);
export default Order;
