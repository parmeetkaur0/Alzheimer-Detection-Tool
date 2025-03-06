const express = require('express');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const cors = require('cors');
const User = require('./models/userModel');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/patients', patientRoutes);


  // Verify Firebase Token Middleware
  const verifyFirebaseToken = async (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).send("Unauthorized");
  
    try {
      const decodedToken = await admin.auth().verifyIdToken(token);
      req.user = decodedToken;
      next();
    } catch (error) {
      res.status(401).send("Unauthorized");
    }
  };
  
  // Save user to MongoDB
  app.post("/api/users", verifyFirebaseToken, async (req, res) => {
    const { uid, email } = req.body;
    
    try {
      let user = await User.findOne({ uid });
      if (!user) {
        user = new User({ uid, email });
        await user.save();
      }
      res.status(200).send(user);
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).send("Server error");
    }
  });

module.exports = app;
