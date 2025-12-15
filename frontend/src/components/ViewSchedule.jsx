import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

function ViewSchedule({ refreshTrigger }) {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [appointments, setAppointments] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchSchedule()
  }, [selectedDate, refreshTrigger])

  const fetchSchedule = async () => {
    if (!selectedDate) return

    try {
      setLoading(true)
      setError('')
      const response = await api.get(`/api/appointments/schedule/${selectedDate}`)
      setAppointments(response.data)
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching schedule')
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = async (appointmentId) => {
    if (window.confirm('Are you sure you want to cancel this appointment?')) {
      try {
        await api.delete(`/api/appointments/${appointmentId}`)
        fetchSchedule()
      } catch (err) {
        setError('Error cancelling appointment')
      }
    }
  }

  const getMinDate = () => {
    const today = new Date()
    return today.toISOString().split('T')[0]
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString + 'T00:00:00')
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  }

  return (
    <div className="table-container">
      <h2 className="table-title">Daily Schedule</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group" style={{ marginBottom: '30px', maxWidth: '300px' }}>
        <label htmlFor="dateFilter">Select Date to View</label>
        <input
          type="date"
          id="dateFilter"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          min={getMinDate()}
        />
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading appointments...</p>
        </div>
      ) : (
        <>
          <h3 style={{ color: '#333', marginBottom: '20px', fontSize: '1.1em' }}>
            Schedule for {formatDate(selectedDate)}
          </h3>

          {appointments.length === 0 ? (
            <div className="empty-state">
              <p>📭 No appointments scheduled for this date</p>
              <p style={{ fontSize: '0.9em', marginTop: '10px' }}>
                Use the Schedule Appointment feature to add new appointments
              </p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Patient Name</th>
                  <th>Patient ID</th>
                  <th>Contact Number</th>
                  <th>Appointment ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map(appointment => (
                  <tr key={appointment.appointmentId}>
                    <td><strong>{appointment.time}</strong></td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.patientId}</td>
                    <td>{appointment.contactNumber}</td>
                    <td><code style={{ background: '#f0f0f0', padding: '5px 8px', borderRadius: '4px' }}>
                      {appointment.appointmentId}
                    </code></td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => handleCancel(appointment.appointmentId)}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  )
}

export default ViewSchedule
