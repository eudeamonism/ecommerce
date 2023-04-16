import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

//Our Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();
const limiter = rateLimit({
	max: 150,
    windowMs: 60 * 60 * 1000,
    message: 'Too many requests from this IP. Please try again in an hour!'
});
//Global Middleware
app.use(express.json());
app.use('/api', limiter)
const port = process.env.PORT || 5000;

//Initializing routes and endpoints
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.listen(port, () => {
	console.log('listening on port ' + port);
});

//Nodemon installed. When time to deploy, just change server: nodemon to node !!
