const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
require('dotenv').config()

const patientRoutes = require('./routes/patients')
const appointmentRoutes = require('./routes/appointments')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Routes
app.use('/api/patients', patientRoutes)
app.use('/api/appointments', appointmentRoutes)

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Server is running' })
})

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

app.listen(PORT, () => {
  console.log(`\n=================================`)
  console.log(`🏥 Clinic Management API Server`)
  console.log(`=================================`)
  console.log(`✓ Server running on http://localhost:${PORT}`)
  console.log(`✓ API endpoints: /api/patients, /api/appointments`)
  console.log(`=================================\n`)
})
