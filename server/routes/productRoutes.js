import express from 'express';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const productRoutes = express.Router();

//Controller
const getProducts = async (req, res) => {
	const products = await Product.find({});
	res.json(products);
};

//Routes
const getProduct = async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	} else {
		res.status(404);
		throw new Error('Product not found.');
	}
};

const createProductReview = asyncHandler(async (req, res) => {
	const { rating, comment, userId, title } = req.body;

	const product = await Product.findById(req.params.id);
	const user = await User.findById(userId);

	if (product) {
		const alreadyReviewed = product.reviews.find((rev) => rev.user.toString() === user._id.toString());

		if (alreadyReviewed) {
			request.status(400);
			throw new Error('Product already reviewed');
		}

		const review = {
			name: user.name,
			rating: Number(rating),
			comment,
			title,
			user: user._id,
		};
	}
});

productRoutes.route('/').get(getProducts);
productRoutes.route('/:id').get(getProduct);

export default productRoutes;
