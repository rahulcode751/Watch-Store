import express from "express";
import { registerController, loginController, testController, forgotPasswordController, updateProfileController, getOrderController, getAllOrdersController, orderStatusController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlwares/authMiddleware.js";

// router object
const router = express.Router();

// routing

// REGISTER || POST
router.post('/register', registerController);

// LOGIN || POST
router.post('/login', loginController);

// FORGOT-PASSWORD || POST
router.post('/forgot-password', forgotPasswordController);

//test routes
router.get("/test", requireSignIn, isAdmin, testController);

// protected route auth User
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true });
})

// protected route auth Admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
})

// update user
router.put("/profile", requireSignIn, updateProfileController)

// orders user
router.get("/orders", requireSignIn, getOrderController)

// ALl rders Admin
router.get("/all-orders", requireSignIn, isAdmin, getAllOrdersController)

// order status update
router.put("/order-status/:orderId", requireSignIn, isAdmin, orderStatusController
);

export default router;