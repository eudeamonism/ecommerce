import express from 'express';
import Product from '../models/Product.js';

const productRoutes = express.Router();

//Controller
const getProducts = async (req, res) => {
	const products = await Product.find({});
	res.json(products);
};

//Routes
productRoutes.route('/').get(getProducts);

export default productRoutes;
