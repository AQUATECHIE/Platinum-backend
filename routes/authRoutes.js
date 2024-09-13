import express from 'express';
import {login , register, verify2FA} from "../controllers/authController.js"
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/Validation.js';

const router = express.Router();

// User Registration Route with Validation
router.post('/register', validateRegister, handleValidationErrors, register);

// User Login Route with Validation
router.post('/login', validateLogin, handleValidationErrors, login);

router.post('/verify-2fa', verify2FA)

export default router;
