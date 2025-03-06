const express = require('express');
const router = express.Router();
const Patient = require('../models/PatientModel'); // Assume you have a Patient model

// Create a new patient
router.post('/', async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).send(patient);
  } catch (error) {
    res.status(400).send({ error: 'Failed to save patient details' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) {
      return res.status(404).send({ error: 'Patient not found' });
    }   
    res.json(patient);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch patient details' });
  } 
});



module.exports = router;
