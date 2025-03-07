const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Helper function to generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = generateToken(user._id);

    res.json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
};

// Login controller for traditional email-password login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

// Controller to store Firebase user information in MongoDB
const storeUserInfo = async (req, res) => {
  try {
    const { uid, email } = req.body;

    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists in MongoDB' });
    }

    const newUser = new User({
      uid,
      email
    });

    await newUser.save();
    res.status(201).json({ message: 'User information stored successfully' });
  } catch (error) {
    console.error('Store user info error:', error);
    res.status(500).json({ error: 'Internal server error during storing user info' });
  }
};


module.exports = { signup, login, storeUserInfo};
