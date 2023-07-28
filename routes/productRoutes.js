import express from "express";
import { isAdmin, requireSignIn } from "../middlwares/authMiddleware.js";
import { createProductController, getProductController, getSingleProductController, productPhotoController, deleteProductController, updateProductController, productFiltersController, productCountController, productListController, searchProductController, relatedProductController } from "../controllers/productController.js";

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

// FILTER PRODUCT  || GET
router.post('/product-filters', productFiltersController);

// COUNT PRODUCT  || GET
router.get('/product-count', productCountController);

// COUNT PRODUCT PER PAGE  || GET
router.get('/product-list/:page', productListController);

// SEARCH PRODUCT || GET
router.get('/search/:keyword', searchProductController);

// SIMILAR PRODUCT || GET
router.get('/related-product/:pid/:cid', relatedProductController);


export default router;