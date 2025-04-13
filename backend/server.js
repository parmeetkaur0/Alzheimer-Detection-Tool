// backend/server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const axios = require('axios');
const { analyzeSentiment } = require('./utills/sentimentAnalysis');
const transcriptionRouter = require('./routes/transcription');
const cors = require('cors');



const app = require('./app');
const dbConnect = require('./db/db');
const port = process.env.PORT || 5000;

// const app = express();
const upload = multer({ dest: 'uploads/' });
const API_KEY = '9c2ac89940404310a254b8b0468c9338'; //  API key - AssemblyAI
app.use(cors()); 

// const app = require('./app');
// const dbConnect = require('./db/db');
// const port = process.env.PORT || 5000;


dbConnect();



// Function to upload audio to AssemblyAI and get transcription ID
async function transcribeAudio(filePath) {
  const file = fs.createReadStream(filePath);
  try {
    const uploadRes = await axios.post('https://api.assemblyai.com/v2/upload', file, {
      headers: {
        authorization: API_KEY
      }
    });

    const { upload_url } = uploadRes.data;

    const transcribeRes = await axios.post('https://api.assemblyai.com/v2/transcript', 
      { audio_url: upload_url }, 
      { headers: { authorization: API_KEY } }
    );

    return transcribeRes.data.id;
  } catch (error) {
    console.error('Error uploading or transcribing:', error);
    return null;
  }
}

// Upload audio route
app.post('/uploads', upload.single('audio'), async (req, res) => {
  const filePath = req.file.path;
  const transcriptId = await transcribeAudio(filePath);
  if (transcriptId) {
    res.json({ message: 'Audio uploaded and transcription started.', transcriptId });
  } else {
    res.status(500).json({ message: 'Error with transcription.' });
  }
});

// Sentiment analysis route
app.post('/sentiment-analysis', express.json(), (req, res) => {
  const { text } = req.body;
  const sentimentScore = analyzeSentiment(text);
  res.json({ sentimentScore });
});

// Transcription result route (polling for completion)
app.get('/transcription/:id', async (req, res) => {
  const transcriptId = req.params.id;

  try {
    const response = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
      headers: { authorization: API_KEY }
    });

    if (response.data.status === 'completed') {
      res.json({
        status: 'completed',
        text: response.data.text
      });
    } else {
      res.json({ status: response.data.status });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching transcription status.' });
  }
});

app.use('/api/transcriptions', transcriptionRouter);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});



