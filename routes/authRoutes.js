import express from 'express';
import {login , register} from "../controllers/authController.js"
import { validateRegister, validateLogin, handleValidationErrors } from '../middlewares/Validation.js';

const router = express.Router();

// User Registration Route with Validation
router.post('/register', validateRegister, handleValidationErrors, register);

// User Login Route with Validation
router.post('/login', validateLogin, handleValidationErrors, login);

export default router;
