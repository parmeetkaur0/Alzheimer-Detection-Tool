const admin = require('firebase-admin');  // Ensure Firebase Admin SDK is configured
const serviceAccount = require('../config/serviceAccountKey.json');  // Path to your service account key

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const authMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authorization header missing or malformed' });
  }

  const token = authHeader.split(' ')[1];

  try {
    // Verify Firebase ID token using Admin SDK
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;  // Attach decoded user info to the request object
    next();
  } catch (error) {
    console.error('Invalid or expired token:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

module.exports = authMiddleware;
