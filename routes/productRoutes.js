import express from "express";
import { isAdmin, requireSignIn } from "../middlwares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController } from "../controllers/productController.js";

// use to upload and fetch pictures
import formidable from 'express-formidable';

const router = express.Router();

//routes

// CREATE PRODUCT || POST
router.post('/create-product', requireSignIn, isAdmin, formidable(), createProductController);

// UPDATE PRODUCT || PUT
router.put('/update-product/:pid', requireSignIn, isAdmin, formidable(), updateProductController);

// GET ALL PRODUCT || GET
router.get('/get-product', getProductController);

// GET SINGLE PRODUCT || GET
router.get('/get-product/:slug', getSingleProductController);

// GET PRODUCT PHOTO || GET
router.get('/product-photo/:pid', productPhotoController);

// DELETE PRODUCT  || DELETE
router.delete('/delete-product/:pid', deleteProductController);


export default router;