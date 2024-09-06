import { check, validationResult } from 'express-validator';

export const validateRegister = [
  check('name').not().isEmpty().withMessage('Name is required'),
  check('email').isEmail().withMessage('Valid email is required'),
  check('country').not().isEmpty().withMessage('Country is required'),
  check('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters'),
  check('confirmPassword')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords do not match'),
];

export const validateLogin = [
  check('email').isEmail().withMessage('Valid email is required'),
  check('password').not().isEmpty().withMessage('Password is required'),
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
