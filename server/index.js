import dotenv from 'dotenv';
import connectToDatabase from './database.js';
import express from 'express';

//Our Routes
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js'

dotenv.config();
connectToDatabase();
const app = express();

app.use(express.json());

const port = process.env.PORT || 5000;
//Here we can test the following with Postman?
app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);









app.listen(port, () => {
	console.log('listening on port ' + port);
});

//Nodemon installed. When time to deploy, just change server: nodemon to node !!
