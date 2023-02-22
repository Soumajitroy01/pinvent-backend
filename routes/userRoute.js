import express from "express";
import { changePassword, forgotPassword, getUser, loginStatus, loginUser, logoutUser, registerUser, resetPassword, updateUser } from "../controllers/userController.js";
import protect from "../middleWare/authMiddleware.js";

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/logout', logoutUser);
router.get('/getuser', protect, getUser);
router.get('/loggedin', loginStatus);
router.patch('/updateuser', protect, updateUser);
router.patch('/changepassword', protect, changePassword);
router.post('/forgotpassword', forgotPassword);
router.put('/resetpassword/:resetToken', resetPassword);

export default router;