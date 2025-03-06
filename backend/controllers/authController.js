const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const firebaseAdmin = require('firebase-admin');


const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error during signup' });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error during login' });
  }
};

const storeUserInfo = async (req, res) => {
  try {
    const { uid } = req.body;
    const userRecord = await firebaseAdmin.auth().getUser(uid);

    const existingUser = await User.findOne({ uid });
    if (existingUser) {
      return res.status(200).json({ message: 'User already exists in MongoDB' });
    }

    const newUser = new User({
      uid: userRecord.uid,
      email: userRecord.email
    });

    await newUser.save();
    res.status(201).json({ message: 'User information stored successfully' });
  } catch (error) {
    console.error('Store user info error:', error);
    res.status(500).json({ error: 'Internal server error during storing user info' });
  }
};

module.exports = { signup, login, storeUserInfo };
