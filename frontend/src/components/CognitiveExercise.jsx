// frontend/src/components/CognitiveExercise.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import { Line } from 'react-chartjs-2';
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const CognitiveExercise = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [responses, setResponses] = useState([]);
  const [sentimentScores, setSentimentScores] = useState([]);
  const [memoryScores, setMemoryScores] = useState([]);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const questions = [
    "What did you have for breakfast today?",
    "Describe your favorite childhood memory.",
    "What is your biggest goal in life?"
  ];

  const startRecording = async () => {
    setIsRecording(true);
    audioChunksRef.current = [];

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;

    mediaRecorder.ondataavailable = (e) => {
      audioChunksRef.current.push(e.data);
    };

    mediaRecorder.onstop = () => {
      const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
      setRecordedBlob(audioBlob);
    };

    mediaRecorder.start();
  };

  const stopRecording = () => {
    setIsRecording(false);
    mediaRecorderRef.current.stop();
  };

  const uploadAndTranscribe = async () => {
    if (!recordedBlob) return;
    setIsUploading(true);

    const formData = new FormData();
    formData.append('audio', recordedBlob, `response-${currentQuestionIndex}.webm`);

    try {
      const res = await axios.post('http://localhost:5000/uploads', formData);
      const transcriptId = res.data.transcriptId;

      const pollTranscription = async () => {
        const result = await axios.get(`http://localhost:5000/transcription/${transcriptId}`);
        if (result.data.status === 'completed') {
          const transcription = result.data.text;

          const sentimentRes = await axios.post('http://localhost:5000/sentiment-analysis', { text: transcription });
          const sentimentScore = sentimentRes.data.sentimentScore;

          const memoryScore = Math.floor(Math.random() * 100);

          setResponses(prev => [
            ...prev,
            {
              question: questions[currentQuestionIndex],
              audioURL: URL.createObjectURL(recordedBlob),
              transcription
            }
          ]);
          setSentimentScores(prev => [...prev, sentimentScore]);
          setMemoryScores(prev => [...prev, memoryScore]);

          setRecordedBlob(null);
          setCurrentQuestionIndex(prev => prev + 1);
          setIsUploading(false);
        } else {
          setTimeout(pollTranscription, 2000);
        }
      };

      pollTranscription();
    } catch (err) {
      console.error('Upload or transcription failed:', err);
      setIsUploading(false);
    }
  };

  const sentimentData = {
    labels: sentimentScores.map((_, index) => `Q${index + 1}`),
    datasets: [{
      label: 'Sentiment Score',
      data: sentimentScores,
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      tension: 0.4
    }]
  };

  const memoryData = {
    labels: memoryScores.map((_, index) => `Q${index + 1}`),
    datasets: [{
      label: 'Memory Score',
      data: memoryScores,
      borderColor: 'rgba(153,102,255,1)',
      backgroundColor: 'rgba(153,102,255,0.2)',
      tension: 0.4
    }]
  };

  const isLastQuestion = currentQuestionIndex >= questions.length;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Cognitive Test Report", 20, 20);

    responses.forEach((res, i) => {
      const y = 30 + i * 30;
      doc.setFontSize(12);
      doc.text(`Q${i + 1}: ${res.question}`, 20, y);
      doc.text(`Answer: ${res.transcription}`, 20, y + 10);
      doc.text(`Sentiment Score: ${sentimentScores[i]?.toFixed(2) || "-"}`, 20, y + 20);
      doc.text(`Memory Score: ${memoryScores[i]?.toFixed(2) || "-"}`, 100, y + 20);
    });

    doc.save("Cognitive-Test-Report.pdf");
  };

  return (
    <div className="p-4 min-h-screen flex justify-center items-center ">
      <div className="max-w-4xl w-full">
        <h1 className="text-3xl font-bold mb-6 text-center text-blue-800">🧠 Cognitive Test</h1>

        <div className="bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-6">
          {!isLastQuestion && (
            <div className="flex flex-col justify-center items-center min-h-[300px] text-center">
              <p className="mb-4 text-lg font-semibold text-gray-800">{questions[currentQuestionIndex]}</p>

              {!isRecording && !recordedBlob && (
                <button
                  onClick={startRecording}
                  className="px-5 py-2 bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 text-white rounded-lg shadow"
                >
                  🎤 Start Recording
                </button>
              )}

              {isRecording && (
                <button
                  onClick={stopRecording}
                  className="px-5 py-2 bg-red-600 text-white rounded-lg shadow"
                >
                  ⏹️ Stop Recording
                </button>
              )}

              {recordedBlob && (
                <div className="mt-4 space-y-2 w-full">
                  <audio controls src={URL.createObjectURL(recordedBlob)} className="w-full rounded-md" />
                  <button
                    onClick={uploadAndTranscribe}
                    disabled={isUploading}
                    className="w-full px-4 py-2 bg-gradient-to-br from-green-200 via-teal-400 to-blue-600 text-white rounded-lg shadow"
                  >
                    {isUploading ? "⏳ Processing..." : "📤 Upload & Next"}
                  </button>
                </div>
              )}
            </div>
          )}

          {isLastQuestion && (
            <div className="mt-5">
              <h2 className="text-2xl font-bold text-center mb-8 text-blue-900">📊 Cognitive Test Results</h2>

              <div className="flex flex-col lg:flex-row gap-6">
                <div className="w-full lg:w-1/2 bg-gradient-to-br from-white to-gray-100 p-4 rounded-2xl shadow-lg">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">📝 Transcriptions</h3>
                  {responses.map((res, idx) => (
                    <div key={idx} className="mb-4 border-b border-gray-300 pb-3">
                      <p className="font-medium text-gray-900">Q{idx + 1}: {res.question}</p>
                      <p className="text-gray-600 italic">“{res.transcription}”</p>
                      <audio controls src={res.audioURL} className="mt-2 w-full rounded-md" />
                    </div>
                  ))}
                  <button
                    onClick={handleDownloadPDF}
                    className="mt-4 px-4 py-2 bg-gradient-to-br from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-md w-full font-medium shadow-md"
                  >
                    📄 Download Report as PDF
                  </button>
                </div>

                <div className="w-full lg:w-1/2 space-y-6">
                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-semibold text-center text-blue-700 mb-2">📈 Sentiment Over Time</h3>
                    <div className="h-64">
                      <Line data={sentimentData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                          title: { display: false }
                        },
                        scales: {
                          y: { beginAtZero: true, ticks: { stepSize: 20 } }
                        }
                      }} />
                    </div>
                  </div>

                  <div className="bg-white p-4 rounded-2xl shadow-lg">
                    <h3 className="text-lg font-semibold text-center text-purple-700 mb-2">🧠 Memory Score Over Time</h3>
                    <div className="h-64">
                      <Line data={memoryData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                          title: { display: false }
                        },
                        scales: {
                          y: { beginAtZero: true, ticks: { stepSize: 20 } }
                        }
                      }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CognitiveExercise;
