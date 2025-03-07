const express = require('express');
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const cors = require('cors');
require('dotenv').config();
const uploadRoutes = require('./routes/upload');
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());


app.use('/api/auth', authRoutes);
app.use('/patients', patientRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use("/api", uploadRoutes);



module.exports = app;
