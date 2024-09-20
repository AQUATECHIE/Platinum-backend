import User from '../models/users.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import sendEmail from '../utilities/sendEmail.js';



export const register = async (req, res) => {

  
  try {
    const { name, email, country, password, confirmPassword } = req.body;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: 'Passwords do not match' });
    }
    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create new user
    const newUser = await User.create({ name, email, country, password});



    
    // Generate email verification token
    const verificationToken = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Send verification email (if this fails, catch the error and handle it)
    // try {
    //   const verificationUrl = `${req.protocol}://${req.get('host')}/auth/verify/${verificationToken}`;
    //   await sendEmail(email, 'Verify your email', `Click the link to verify your email: ${verificationUrl}`);
    //   console.log(email)
    // } catch (emailError) {
    //   console.error('Error sending email:', emailError);
    //   return res.status(500).json({ error: 'Error sending verification email. Please try again later.' });
    // }

    res.status(201).json({ message: 'User registered, check your email to verify your account' });
  } catch (error) {
    console.error('Server error during registration:', error);
    res.status(500).json({ error: 'Server error during registration. Please try again later.' });
  }
};














// Verify Email
export const verifyEmail = async (req, res) => {
  const token = req.params.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByIdAndUpdate(decoded.id, { isVerified: true });
    
    res.status(200).json({ message: 'Email verified, you can now log in' });
  } catch (error) {
    res.status(400).json({ error: 'Invalid or expired token' });
  }
};































export const login = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.findOne({ email });
    if(!user || !(await bcrypt.compare(password, user.password))){
      return res.status(400).json({error: "invalid details"});
    }
    if (!user.isVerified) {
      return res.status(401).json({error: 'Email not verified'});

    }

    const token = jwt.sign({id: user._id, name: user.name}, process.env.JWT_SECRET,{expiresIn:'7d'});
    res.status(200).json({token, message: 'Login sucessful'})
  } catch (error) {
    res.status(500).json({error: 'Server error'})
  }

}