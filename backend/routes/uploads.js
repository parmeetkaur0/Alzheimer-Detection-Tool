// const express = require('express');
// const multer = require('multer');
// const axios = require('axios');
// const fs = require('fs');
// const path = require('path');
// const router = express.Router();

// // Storage for audio
// const storage = multer.diskStorage({
//   destination: 'uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${Date.now()}_${file.originalname}`);
//   },
// });
// const upload = multer({ storage });

// // POST /upload
// // router.post('/', upload.single('audio'), async (req, res) => {
// //   const filePath = path.join(__dirname, '..', req.file.path);

// //   try {
// //     // Upload to AssemblyAI
// //     const uploadRes = await axios({
// //       method: 'post',
// //       url: 'https://api.assemblyai.com/v2/upload',
// //       headers: {
// //         authorization: process.env.ASSEMBLY_API_KEY,
// //         'transfer-encoding': 'chunked',
// //       },
// //       data: fs.createReadStream(filePath),
// //     });

// //     const audioUrl = uploadRes.data.upload_url;

// //     // Transcribe
// //     const transcriptRes = await axios.post(
// //       'https://api.assemblyai.com/v2/transcript',
// //       { audio_url: audioUrl },
// //       { headers: { authorization: process.env.ASSEMBLY_API_KEY } }
// //     );

// //     const transcriptId = transcriptRes.data.id;

// //     // Wait for completion (polling)
// //     let completed = false, transcriptData;
// //     while (!completed) {
// //       const check = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
// //         headers: { authorization: process.env.ASSEMBLY_API_KEY },
// //       });

// //       if (check.data.status === 'completed') {
// //         transcriptData = check.data;
// //         completed = true;
// //       } else if (check.data.status === 'error') {
// //         return res.status(500).json({ error: check.data.error });
// //       }

// //       await new Promise(r => setTimeout(r, 3000)); // wait 3s
// //     }

// //     // Delete file
// //     fs.unlinkSync(filePath);

// //     // Score (basic keyword matching for now)
// //     const keywords = ['breakfast', 'home', 'memory', 'weekend'];
// //     const score = keywords.reduce((acc, keyword) => (
// //       transcriptData.text.toLowerCase().includes(keyword) ? acc + 1 : acc
// //     ), 0);

// //     res.json({
// //       transcript: transcriptData.text,
// //       score,
// //     });

// //   } catch (err) {
// //     console.error(err.message);
// //     res.status(500).json({ error: 'Failed to process audio' });
// //   }
// // });
// router.post('/', upload.single('audio'), async (req, res) => {
//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   const filePath = path.join(__dirname, '..', req.file.path);
//   console.log('Received file:', filePath);

//   try {
//     // Upload audio to AssemblyAI
//     const uploadRes = await axios({
//       method: 'post',
//       url: 'https://api.assemblyai.com/v2/upload',
//       headers: {
//         authorization: process.env.ASSEMBLY_API_KEY,
//         'transfer-encoding': 'chunked',
//       },
//       data: fs.createReadStream(filePath),
//     });

//     const audioUrl = uploadRes.data.upload_url;

//     // Request transcription
//     const transcriptRes = await axios.post(
//       'https://api.assemblyai.com/v2/transcript',
//       { audio_url: audioUrl },
//       { headers: { authorization: process.env.ASSEMBLY_API_KEY } }
//     );

//     const transcriptId = transcriptRes.data.id;
//     let transcriptData;

//     while (true) {
//       const poll = await axios.get(`https://api.assemblyai.com/v2/transcript/${transcriptId}`, {
//         headers: { authorization: process.env.ASSEMBLY_API_KEY },
//       });

//       if (poll.data.status === 'completed') {
//         transcriptData = poll.data;
//         break;
//       } else if (poll.data.status === 'error') {
//         throw new Error(poll.data.error);
//       }

//       await new Promise((r) => setTimeout(r, 3000));
//     }

//     fs.unlinkSync(filePath);

//     // Simple scoring
//     const keywords = ['breakfast', 'home', 'memory', 'weekend'];
//     const score = keywords.reduce((acc, k) => (
//       transcriptData.text.toLowerCase().includes(k) ? acc + 1 : acc
//     ), 0);

//     res.json({ transcript: transcriptData.text, score });

//   } catch (err) {
//     console.error('ERROR during upload:', err);
//     res.status(500).json({ error: err.message || 'Upload failed' });
//   }
// });


// module.exports = router;
const axios = require('axios');
const fs = require('fs');
const express = require('express');
const router = express.Router();
const path = require('path');

router.post('/uploads', async (req, res) => {
  const filePath = path.join(__dirname, '../uploads', '1744458401823_response.webm');

  try {
    const response = await axios({
      method: 'post',
      url: 'https://api.assemblyai.com/v2/upload',
      headers: {
        authorization: '9c2ac89940404310a254b8b0468c9338'
      },
      data: fs.createReadStream(filePath)
    });

    console.log('Upload Success:', response.data);
    res.json({ upload_url: response.data.upload_url });
  } catch (err) {
    console.error('Upload error:', err.response ? err.response.data : err.message);
    res.status(500).json({ error: 'Upload failed' });
  }
});

module.exports = router;
