import React, { useState } from 'react'
import './App.css'
import PatientRegistration from './components/PatientRegistration'
import AppointmentScheduling from './components/AppointmentScheduling'
import ViewSchedule from './components/ViewSchedule'
import PatientList from './components/PatientList'
import Navigation from './components/Navigation'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const handleRefresh = () => {
    setRefreshTrigger(prev => prev + 1)
  }

  const renderContent = () => {
    switch(activeTab) {
      case 'register':
        return <PatientRegistration onSuccess={handleRefresh} />
      case 'schedule':
        return <AppointmentScheduling onSuccess={handleRefresh} refreshTrigger={refreshTrigger} />
      case 'viewSchedule':
        return <ViewSchedule refreshTrigger={refreshTrigger} />
      case 'patients':
        return <PatientList refreshTrigger={refreshTrigger} />
      default:
        return <Dashboard />
    }
  }

  return (
    <div className="app">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome to Clinic Management System</h1>
        <p>Manage patient appointments efficiently and professionally</p>
      </div>
      
      <div className="dashboard-cards">
        <div className="card">
          <div className="card-icon">👥</div>
          <h3>Patient Management</h3>
          <p>Register and manage patient information securely</p>
        </div>
        <div className="card">
          <div className="card-icon">📅</div>
          <h3>Appointment Scheduling</h3>
          <p>Schedule and manage patient appointments</p>
        </div>
        <div className="card">
          <div className="card-icon">📊</div>
          <h3>Daily Schedule</h3>
          <p>View daily appointments and manage timeslots</p>
        </div>
        <div className="card">
          <div className="card-icon">📋</div>
          <h3>Patient Directory</h3>
          <p>View all registered patients and their details</p>
        </div>
      </div>
    </div>
  )
}

export default App
