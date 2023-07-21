import express from 'express';
import { isAdmin, requireSignIn } from "../middlwares/authMiddleware.js";
import { createCategoryControleller, updateCategoryControleller, categoryController, singleCategoryController, deleteCategoryController } from '../controllers/categoryController.js';

const router = express.Router();

// routes

// CREAT CATEGORY || POST
router.post('/create-category', requireSignIn, isAdmin, createCategoryControleller);

// UPDATE CATEGORY || POST
router.put('/update-category/:id', requireSignIn, isAdmin, updateCategoryControleller);

// GET ALL CATEGORY || GET
router.get("/get-category", categoryController);

// GET SINGLE CATEGORY || GET
router.get("/single-category/:slug", singleCategoryController);

//DELETE CATEGORY || GET
router.delete("/delete-category/:id", requireSignIn, isAdmin, deleteCategoryController);

export default router;