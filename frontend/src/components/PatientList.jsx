import React, { useState, useEffect } from 'react'
import { api } from '../services/api'

function PatientList({ refreshTrigger }) {
  const [patients, setPatients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchPatients()
  }, [refreshTrigger])

  const fetchPatients = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await api.get('/api/patients')
      setPatients(response.data)
    } catch (err) {
      setError('Error fetching patients list')
    } finally {
      setLoading(false)
    }
  }

  const filteredPatients = patients.filter(patient => 
    patient.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.contactNumber.includes(searchTerm)
  )

  return (
    <div className="table-container">
      <h2 className="table-title">Registered Patients</h2>
      
      {error && <div className="alert alert-danger">{error}</div>}

      <div className="form-group" style={{ marginBottom: '30px', maxWidth: '400px' }}>
        <label htmlFor="search">Search Patients</label>
        <input
          type="text"
          id="search"
          placeholder="Search by ID, name, or contact number..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Loading patients...</p>
        </div>
      ) : (
        <>
          <p style={{ color: '#666', marginBottom: '20px' }}>
            Total Patients: <strong>{filteredPatients.length}</strong>
            {searchTerm && ` (filtered from ${patients.length})`}
          </p>

          {filteredPatients.length === 0 ? (
            <div className="empty-state">
              <p>👥 {searchTerm ? 'No patients match your search' : 'No patients registered yet'}</p>
              <p style={{ fontSize: '0.9em', marginTop: '10px' }}>
                {!searchTerm && 'Use the Register Patient feature to add new patients'}
              </p>
            </div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>Patient ID</th>
                  <th>Full Name</th>
                  <th>Contact Number</th>
                </tr>
              </thead>
              <tbody>
                {filteredPatients.map(patient => (
                  <tr key={patient.id}>
                    <td><strong>{patient.id}</strong></td>
                    <td>{patient.name}</td>
                    <td>{patient.contactNumber}</td>
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

export default PatientList
