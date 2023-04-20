import dotenv from 'dotenv';
dotenv.config();
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import connectToDatabase from './database.js';
import express from 'express';
import path from 'path';

//Our Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import mongoSanitize from 'express-mongo-sanitize';
import xss from 'xss-clean';
import hpp from 'hpp';

connectToDatabase();
const app = express();
const limiter = rateLimit({
	max: 150,
	windowMs: 60 * 60 * 1000,
	message: 'Too many requests from this IP. Please try again in an hour!',
});
//Global Middleware
app.use(mongoSanitize());
app.use(xss());
app.use('/api', limiter);
app.use(helmet());
app.use(hpp());
app.use(express.json());

//Initializing routes and endpoints
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));

const port = process.env.PORT || 5000;

//Fallback
const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

if (process.env.NODE_ENV == 'production') {
	app.use(express.static(path.join(__dirname, '/client/build')));

	app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

app.listen(port, () => {
	console.log('listening on port ' + port);
});

//Nodemon installed. When time to deploy, just change server: nodemon to node !!
