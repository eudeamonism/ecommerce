import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/User.js';

const protectRoute = asyncHandler(async (req, res, next) => {
	let token;

	if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
		try {
			token = req.headers.authorization.split(' ')[1];
			const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
			req.user = await User.findById(decoded.id);
			next();
		} catch (error) {
			res.status(401);
			//The ability to throw this error comes from the asyncHandler package
			throw new Error('Not authorized, token failed.');
		}
	}

	if (!token) {
		res.status(401);
		throw new Error('Not authorized, no token.');
	}
});

/* const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
	res.status(statusCode);
	res.json({
		message: err.message,
		stack: process.env.NODE_ENV === 'production' ? null : err.stack,
	});
}; */

export default protectRoute;
