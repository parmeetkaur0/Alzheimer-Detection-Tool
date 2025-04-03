import React from 'react';
import { jsPDF } from 'jspdf';
import { FileText } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const MedicalReport = ({ result, userDetails }) => {
  const stages = [
    { name: 'No Impairment', value: result === 'No Impairment' ? 1 : 0 },
    { name: 'Very Mild Impairment', value: result === 'Very Mild Impairment' ? 2 : 0 },
    { name: 'Mild Dementia', value: result === 'Mild Dementia' ? 3 : 0 },
    { name: 'Moderate Dementia', value: result === 'Moderate Dementia' ? 4 : 0 },
    { name: 'Severe Dementia', value: result === 'Severe Dementia' ? 5 : 0 }
  ];

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text('Alzheimer’s Disease Detection Report', 20, 20);

    doc.setFontSize(12);
    doc.text(`Patient Name: ${userDetails.patientName}`, 20, 40);
    doc.text(`Age: ${userDetails.patientAge}`, 20, 50);
    doc.text(`Gender: ${userDetails.patientGender}`, 20, 60);
    doc.text('Doctor Name: ______________________', 20, 70);

    doc.setFontSize(14);
    doc.text('Prediction Result:', 20, 90);
    doc.setFontSize(12);
    doc.text(`Diagnosis: Alzheimer’s Stage - ${result}`, 20, 100);

    doc.setFontSize(10);
    doc.text('Disclaimer: This report is generated using AI predictions and should not be considered a final diagnosis.', 20, 140);

    stages.forEach((stage, index) => {
      doc.setFillColor(stage.value === 0 ? 200 : 100);
      doc.rect(20 + index * 30, 180 - stage.value * 20, 20, stage.value * 20, 'FD');
      doc.text(stage.name, 20 + index * 30, 195);
    });

    doc.save('Alzheimers_Report.pdf');
  };

  return (
    <div className='bg-gradient-to-r from-gray-100 to-blue-100 flex items-center justify-center'>
      <div className=" bg-gradient-to-r from-teal-400 via-cyan-500 to-blue-700 px-6 py-10 rounded-xl shadow-lg w-full max-w-xl mx-auto">
        <div className="text-center mb-6">
          <FileText className="w-12 h-12 text-white mx-auto" />
          <h2 className="text-2xl font-bold text-white mt-2">Prediction Result</h2>
        </div>
        <div className="bg-white p-6 rounded-md shadow-md">
          <p className="text-lg font-semibold text-gray-700">Diagnosis: Alzheimer’s Stage - <span className='text-green-500'> {result} </span></p>
          <p className="mt-2 text-gray-600">Patient Name: {userDetails.patientName}</p>
          <p className="text-gray-600">Age: {userDetails.patientAge}</p>
          <p className="text-gray-600">Gender: {userDetails.patientGender}</p>
          <div className="mt-4">
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stages}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className='flex justify-center'>
            <button onClick={generatePDF} className="mt-4 px-4 py-2 bg-gradient-to-r from-blue-400 to-green-400 text-white rounded-lg shadow-lg hover:opacity-90 transition duration-200">Download Report</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicalReport;
