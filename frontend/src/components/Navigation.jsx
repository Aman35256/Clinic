import React from 'react'
import './Navigation.css'

function Navigation({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '🏠' },
    { id: 'register', label: 'Register Patient', icon: '➕' },
    { id: 'schedule', label: 'Schedule Appointment', icon: '📅' },
    { id: 'viewSchedule', label: 'View Schedule', icon: '📊' },
    { id: 'patients', label: 'Patient List', icon: '👥' },
  ]

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-brand">
          <span className="logo-icon">🏥</span>
          <h1>ClinicHub</h1>
        </div>
        <ul className="nav-menu">
          {navItems.map(item => (
            <li key={item.id}>
              <button
                className={`nav-link ${activeTab === item.id ? 'active' : ''}`}
                onClick={() => setActiveTab(item.id)}
              >
                <span className="icon">{item.icon}</span>
                <span className="label">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}

export default Navigation
