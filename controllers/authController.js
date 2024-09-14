import User from '../models/users.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utilities/sendEmail.js';
import crypto from 'crypto'

export const register = async (req, res) => {

  try {
    const { name, email, country, password, confirmPassword } = req.body;
    // Check if the user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists!' });
    }

    // Create and save the new user
    const user = await User.create({
      name,
      email,
      country,
      password,
      confirmPassword
    });
    if (user) {

      res.status(201).json({ message: 'User registered successfully!' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error during registration' });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate 2FA token
  const token = user.getTwoFactorToken();
  await user.save();

  // Send the 2FA token via email
  const message = `Your 2FA code is: ${token}`;
  try {
      await sendEmail({
          email: user.email,
          subject: 'Your 2FA Code',
          message
      });

      res.status(200).json({
          success: true,
          message: '2FA code sent to your email',
      });
  } catch (error) {
      user.twoFactorToken = undefined;
      user.twoFactorTokenExpire = undefined;
      await user.save();
      res.status(500).json({ message: "Email could not be sent" });
  }
};

export const verify2FA = async (req, res) => {
  const { token } = req.body;

  const hashedToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({
      twoFactorToken: hashedToken,
      twoFactorTokenExpire: { $gt: Date.now() }
  });

  if (!user) {
      return res.status(400).json({ message: "Invalid or expired token" });
  }

  // Clear 2FA token
  user.twoFactorToken = undefined;
  user.twoFactorTokenExpire = undefined;
  await user.save();

  // Generate JWT Token (after successful 2FA)
  const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN
  });

  res.status(200).json({
      success: true,
      token: jwtToken,
      message: '2FA verification successful. You are now logged in.'
  });
};