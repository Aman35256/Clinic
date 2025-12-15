const express = require('express')
const DataStore = require('../models/DataStore')

const router = express.Router()

// Get all appointments
router.get('/', (req, res) => {
  try {
    const appointments = DataStore.getAppointments()
    res.json(appointments)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching appointments', error: error.message })
  }
})

// Get appointments by date
router.get('/schedule/:date', (req, res) => {
  try {
    const { date } = req.params
    
    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' })
    }

    const appointments = DataStore.getAppointmentsByDate(date)
    res.json(appointments)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching schedule', error: error.message })
  }
})

// Schedule new appointment
router.post('/schedule', (req, res) => {
  try {
    const { patientId, date, time } = req.body

    // Validation
    if (!patientId || !date || !time) {
      return res.status(400).json({ message: 'All fields are required' })
    }

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return res.status(400).json({ message: 'Invalid date format. Use YYYY-MM-DD' })
    }

    if (!/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ message: 'Invalid time format. Use HH:MM' })
    }

    // Check if date is not in the past
    const appointmentDate = new Date(date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (appointmentDate < today) {
      return res.status(400).json({ message: 'Cannot schedule appointments in the past' })
    }

    const appointmentId = `${date}_${time}`
    const result = DataStore.addAppointment(appointmentId, date, time, patientId)

    if (!result.success) {
      return res.status(409).json({ message: result.message })
    }

    res.status(201).json({ 
      message: 'Appointment scheduled successfully',
      appointmentId: appointmentId,
      appointment: result.appointment 
    })
  } catch (error) {
    res.status(500).json({ message: 'Error scheduling appointment', error: error.message })
  }
})

// Cancel appointment
router.delete('/:appointmentId', (req, res) => {
  try {
    const { appointmentId } = req.params

    const result = DataStore.cancelAppointment(appointmentId)

    if (!result.success) {
      return res.status(404).json({ message: result.message })
    }

    res.json({ message: 'Appointment cancelled successfully' })
  } catch (error) {
    res.status(500).json({ message: 'Error cancelling appointment', error: error.message })
  }
})

module.exports = router
