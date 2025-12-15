// In-memory storage (in production, use a proper database)
let patients = new Map()
let appointments = new Map()

class DataStore {
  static getPatients() {
    return Array.from(patients.values())
  }

  static addPatient(id, name, contactNumber) {
    if (patients.has(id)) {
      return { success: false, message: 'Patient ID already exists' }
    }
    patients.set(id, { id, name, contactNumber })
    return { success: true, patient: patients.get(id) }
  }

  static getPatient(id) {
    return patients.get(id) || null
  }

  static getAppointments() {
    return Array.from(appointments.values())
  }

  static getAppointmentsByDate(date) {
    return Array.from(appointments.values())
      .filter(apt => apt.date === date)
      .sort((a, b) => a.time.localeCompare(b.time))
  }

  static addAppointment(appointmentId, date, time, patientId) {
    if (appointments.has(appointmentId)) {
      return { success: false, message: 'Time slot already booked' }
    }

    const patient = patients.get(patientId)
    if (!patient) {
      return { success: false, message: 'Patient not found' }
    }

    const appointment = {
      appointmentId,
      date,
      time,
      patientId,
      patientName: patient.name,
      contactNumber: patient.contactNumber
    }

    appointments.set(appointmentId, appointment)
    return { success: true, appointment }
  }

  static cancelAppointment(appointmentId) {
    if (!appointments.has(appointmentId)) {
      return { success: false, message: 'Appointment not found' }
    }
    appointments.delete(appointmentId)
    return { success: true }
  }
}

module.exports = DataStore
