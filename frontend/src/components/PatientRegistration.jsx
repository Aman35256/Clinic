import React, { useState } from 'react'
import { api } from '../services/api'

function PatientRegistration({ onSuccess }) {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    contactNumber: ''
  })
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }))
    setError('')
  }

  const validateForm = () => {
    if (!formData.id.trim()) {
      setError('Patient ID is required')
      return false
    }
    if (!formData.name.trim()) {
      setError('Patient Name is required')
      return false
    }
    if (!formData.contactNumber.trim()) {
      setError('Contact Number is required')
      return false
    }
    if (!/^\d{10,}$/.test(formData.contactNumber.trim())) {
      setError('Contact Number must be at least 10 digits')
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
      const response = await api.post('/api/patients/register', formData)
      setSuccess('Patient registered successfully!')
      setFormData({ id: '', name: '', contactNumber: '' })
      
      setTimeout(() => {
        setSuccess('')
        onSuccess()
      }, 2000)
    } catch (err) {
      setError(err.response?.data?.message || 'Error registering patient. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="form-container">
      <h2 className="form-title">Register New Patient</h2>
      
      {success && <div className="success-message">✓ {success}</div>}
      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id">Patient ID *</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="e.g., P101"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="name">Full Name *</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter patient's full name"
            disabled={loading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number *</label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            value={formData.contactNumber}
            onChange={handleChange}
            placeholder="Enter 10-digit contact number"
            disabled={loading}
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Registering...' : 'Register Patient'}
        </button>
      </form>
    </div>
  )
}

export default PatientRegistration
