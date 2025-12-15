const express = require('express')
const { v4: uuidv4 } = require('uuid')
const DataStore = require('../models/DataStore')

const router = express.Router()

// Get all patients
router.get('/', (req, res) => {
  try {
    const patients = DataStore.getPatients()
    res.json(patients)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patients', error: error.message })
  }
})

// Get specific patient
router.get('/:id', (req, res) => {
  try {
    const patient = DataStore.getPatient(req.params.id)
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' })
    }
    res.json(patient)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching patient', error: error.message })
  }
})

// Register new patient
router.post('/register', (req, res) => {
  try {
    const { id, name, contactNumber } = req.body

    // Validation
    if (!id || !name || !contactNumber) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (!/^\d{10,}$/.test(contactNumber)) {
      return res.status(400).json({ message: 'Contact number must be at least 10 digits' })
    }

    const result = DataStore.addPatient(id, name, contactNumber)
    
    if (!result.success) {
      return res.status(409).json({ message: result.message })
    }

    res.status(201).json({ 
      message: 'Patient registered successfully',
      patient: result.patient 
    })
  } catch (error) {
    res.status(500).json({ message: 'Error registering patient', error: error.message })
  }
})

module.exports = router
