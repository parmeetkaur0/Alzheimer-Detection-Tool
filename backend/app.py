from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import tensorflow as tf
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.image import img_to_array, load_img
from PIL import Image, UnidentifiedImageError
import os

app = Flask(__name__)
CORS(app)

MODEL_PATH = "models/alzheimer_cnn_model.h5"
model = load_model(MODEL_PATH)

def is_valid_mri(image):
    width, height = image.size
    print("Image Format:", image.format)
    print("Image Size:", image.size)
    print("Image Mode:", image.mode)

    # Step 1: Dimension Check
    if width < 128 or height < 128:
        print("Validation Failed: Image dimensions are too small")
        return False

    # Step 2: Grayscale Consistency Check
    grayscale_image = image.convert("L")  # Convert to grayscale
    pixel_data = np.array(grayscale_image)
    mean_intensity = np.mean(pixel_data)
    std_intensity = np.std(pixel_data)

    # MRI characteristics: Moderate intensity and variation
    if mean_intensity < 50 or mean_intensity > 200:
        print("Validation Failed: Intensity out of range")
        return False

    if std_intensity < 20:
        print("Validation Failed: Low intensity variation")
        return False

    # Step 3: Color Check - MRI scans are often close to grayscale
    rgb_data = np.array(image)
    red, green, blue = rgb_data[:, :, 0], rgb_data[:, :, 1], rgb_data[:, :, 2]
    
    # Calculate mean absolute differences between color channels
    diff_rg = np.mean(np.abs(red - green))
    diff_rb = np.mean(np.abs(red - blue))
    diff_gb = np.mean(np.abs(green - blue))

    # Allow minor variations for grayscale consistency
    if diff_rg > 15 or diff_rb > 15 or diff_gb > 15:
        print("Validation Failed: Color analysis check failed")
        return False

    print("Validation Passed: MRI scan detected")
    return True


@app.route('/api/predict', methods=['POST'])
def predict():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400

    file = request.files['image']

    try:
        image = Image.open(file)
        image = image.convert('RGB')

        # Validate MRI scan
        if not is_valid_mri(image):
            return jsonify({'error': 'Invalid MRI scan'}), 400

        image = image.resize((150, 150))
        image_array = img_to_array(image) / 255.0
        image_array = np.expand_dims(image_array, axis=0)

        predictions = model.predict(image_array)
        class_mapping = {0: 'Mild Demented', 1: 'Moderate Demented', 2: 'Non Demented', 3: 'Very Mild Demented'}
        predicted_label = class_mapping[np.argmax(predictions)]

        return jsonify({'prediction': predicted_label})

    except UnidentifiedImageError:
        return jsonify({'error': 'Invalid image format'}), 400

@app.route('/models/<path:filename>')
def serve_model_file(filename):
    return send_from_directory('models', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
