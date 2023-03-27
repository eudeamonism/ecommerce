import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

//Our Routes
import productRoutes from './routes/productRoutes.js';

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;

app.use('/api/products', productRoutes);









app.listen(port, () => {
	console.log('listening on port ' + port);
});

//Nodemon installed. When time to deploy, just change server: nodemon to node !!
