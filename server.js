import express from "express";
import colors from "colors";
//---------------------------------
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });
// --------------------------------
import morgan from "morgan";
import connectDB from "./config/db.js";
import authRoutes from './routes/authRoute.js'
import categoryRoutes from './routes/categoryRoutes.js'
import productRoutes from './routes/productRoutes.js'
import cors from 'cors';

//databse config
connectDB();

// rest object
const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/category', categoryRoutes);
app.use('/api/v1/product', productRoutes);


// rest api
app.get('/', (req, res) => {
    res.send("<h1>Welcome to Ecommerce website build on mern stack</h1>")
})

// PORT
const PORT = process.env.PORT || 8080;

// run listen
app.listen(PORT, () => {
    console.log(`Our Ecommerce Server is Running on {${process.env.DEV_MODE}} mode on PORT {${PORT}} `.bgYellow.black);
})