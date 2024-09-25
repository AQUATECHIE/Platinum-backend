import express from 'express';
import {login , register, verifyEmail} from "../controllers/authController.js"
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/Validation.js';
import { UserProfile } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

// import User from '../models/users.js';

const router = express.Router();

// User Registration Route with Validation
router.post('/register', validateRegister, handleValidationErrors, register);

// email verification
router.post('/verify/:token', verifyEmail)


// User Login Route with Validation
router.post('/login', validateLogin, handleValidationErrors, login);

router.get('/profile', protect, UserProfile)


// router.get('/dashboard', protect, (req, res) => {
//     res.status(200).json({ name: req.user.name });
// });


export default router;
