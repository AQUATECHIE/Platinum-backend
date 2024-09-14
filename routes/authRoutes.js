import express from 'express';
import {login , register, verify2FA} from "../controllers/authController.js"
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/Validation.js';
import { protect } from '../middlewares/authMiddleware.js';
// import User from '../models/users.js';

const router = express.Router();

// User Registration Route with Validation
router.post('/register', validateRegister, handleValidationErrors, register);

// User Login Route with Validation
router.post('/login', validateLogin, handleValidationErrors, login);

router.post('/verify-2fa', verify2FA)

router.get('/dashboard', protect, (req, res) => {
    res.status(200).json({ message: `Welcome to your dashboard, ${req.User.name}` });
});


export default router;
