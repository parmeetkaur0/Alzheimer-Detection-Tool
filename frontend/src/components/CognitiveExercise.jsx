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

          // Simulate memory score for now
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
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Cognitive Test</h1>

      {!isLastQuestion && (
        <>
          <p className="mb-2 font-medium">{questions[currentQuestionIndex]}</p>

          {!isRecording && !recordedBlob && (
            <button
              onClick={startRecording}
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Start Recording
            </button>
          )}

          {isRecording && (
            <button
              onClick={stopRecording}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Stop Recording
            </button>
          )}

          {recordedBlob && (
            <>
              <audio controls src={URL.createObjectURL(recordedBlob)} className="mt-2" />
              <button
                onClick={uploadAndTranscribe}
                disabled={isUploading}
                className="ml-2 px-4 py-2 bg-green-600 text-white rounded"
              >
                {isUploading ? "Processing..." : "Upload & Next"}
              </button>
            </>
          )}
        </>
      )}

      {isLastQuestion && (
        <div className="mt-10 px-6">
          <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">🧠 Cognitive Test Results</h2>

          <div className="flex flex-col lg:flex-row gap-6">

            {/* Left Column: Transcriptions */}
            <div className="w-full lg:w-1/2 bg-gray-50 p-4 rounded-2xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-gray-700">📝 Transcriptions</h3>
              {responses.map((res, idx) => (
                <div key={idx} className="mb-4 border-b pb-2">
                  <p className="font-medium text-gray-800">Q{idx + 1}: {res.question}</p>
                  <p className="text-gray-600 italic">“{res.transcription}”</p>
                  <audio controls src={res.audioURL} className="mt-1 w-full" />
                </div>
              ))}
              <button
                onClick={handleDownloadPDF}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md w-full text-sm font-medium"
              >
                📄 Download Report as PDF
              </button>
            </div>

            {/* Right Column: Graphs */}
            <div className="w-full lg:w-1/2 space-y-6">
              <div className="bg-white p-4 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-center text-blue-600">Sentiment Over Time</h3>
                <div className="h-64">
                  <Line
                    data={sentimentData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        title: { display: false }
                      },
                      scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 20 } }
                      }
                    }}
                  />
                </div>
              </div>

              <div className="bg-white p-4 rounded-2xl shadow-md">
                <h3 className="text-lg font-semibold mb-2 text-center text-purple-600">Memory Score Over Time</h3>
                <div className="h-64">
                  <Line
                    data={memoryData}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: { display: false },
                        title: { display: false }
                      },
                      scales: {
                        y: { beginAtZero: true, ticks: { stepSize: 20 } }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CognitiveExercise;


