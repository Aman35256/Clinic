import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

function AppointmentScheduling({ onSuccess, refreshTrigger }) {
  const [formData, setFormData] = useState({
    patientId: '',
    date: '',
    time: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [patients, setPatients] = useState([])
  const [loadingPatients, setLoadingPatients] = useState(true)

  useEffect(() => {
    fetchPatients()
  }, [refreshTrigger])

  const fetchPatients = async () => {
    try {
      setLoadingPatients(true)
      const response = await api.get('/api/patients')
      setPatients(response.data)
    } catch (err) {
      console.error('Error fetching patients:', err)
    } finally {
      setLoadingPatients(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.patientId) {
      setError('Please select a patient')
      return false
    }
    if (!formData.date) {
      setError('Date is required')
      return false
    }
    if (!formData.time) {
      setError('Time is required')
      return false
    }

    const selectedDate = new Date(formData.date)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    if (selectedDate < today) {
      setError('Cannot schedule appointments in the past')
      return false
    }

    return true
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setLoading(true)
    try {
      const response = await api.post('/api/appointments/schedule', {
        patientId: formData.patientId,
        date: formData.date,
        time: formData.time
      })
      
      setSuccess(`Appointment scheduled successfully! ID: ${response.data.appointmentId}`)
      setFormData({ patientId: '', date: '', time: '' })
      
      setTimeout(() => {
        setSuccess('')
        onSuccess()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error scheduling appointment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Schedule Appointment</h2>
      
      {success && <div className="success-message">✓ {success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patientId">Select Patient *</label>
          <select
            id="patientId"
            name="patientId"
            value={formData.patientId}
            onChange={handleChange}
            disabled={loading || loadingPatients}
          >
            <option value="">
              {loadingPatients ? 'Loading patients...' : 'Choose a patient'}
            </option>
            {patients.map(patient => (
              <option key={patient.id} value={patient.id}>
                {patient.name} (ID: {patient.id})
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date">Appointment Date *</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            min={getMinDate()}
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="time">Appointment Time *</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            disabled={loading}
          />
          <small style={{ color: '#666', marginTop: '5px' }}>Use 24-hour format (e.g., 14:30)</small>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading || loadingPatients}>
          {loading ? 'Scheduling...' : 'Schedule Appointment'}
        </button>
      </form>
    </div>
  )
}

export default AppointmentScheduling
