// src/services/api.js
import axios from 'axios';

export const predictImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append('image', file);

    console.log(formData);

    const response = await axios.post("http://localhost:5001/api/predict", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      }
    });

    return response.data;
  } catch (error) {
    throw new Error("Prediction failed");
  }
};
