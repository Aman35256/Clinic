# Clinic Management System - Web Platform

A modern, full-featured web platform for efficient hospital clinic appointment management. Built with React frontend and Express.js backend.

## 🌟 Features

### Patient Management
- ✅ Patient registration with validation
- ✅ Secure patient ID and contact management
- ✅ Patient search and filtering
- ✅ View all registered patients

### Appointment Management
- ✅ Schedule appointments with date/time validation
- ✅ Prevent double-booking of time slots
- ✅ View daily appointment schedules
- ✅ Cancel appointments with confirmation
- ✅ Future-date-only appointments

### User Interface
- 🎨 Modern, responsive design
- 📱 Mobile-friendly interface
- 🚀 Fast, intuitive navigation
- 💫 Real-time data updates
- 🎯 Professional dashboard layout

## 📁 Project Structure

```
Clinic/
├── frontend/                 # React web application
│   ├── src/
│   │   ├── components/      # React components
│   │   ├── services/        # API services
│   │   ├── App.jsx          # Main app component
│   │   ├── App.css          # Global styles
│   │   └── main.jsx         # Entry point
│   ├── package.json         # Dependencies
│   ├── vite.config.js       # Vite configuration
│   └── index.html           # HTML template
│
├── backend/                  # Express.js API server
│   ├── routes/              # API routes
│   │   ├── patients.js      # Patient endpoints
│   │   └── appointments.js  # Appointment endpoints
│   ├── models/
│   │   └── DataStore.js     # Data management
│   ├── server.js            # Express server
│   ├── package.json         # Dependencies
│   └── .env                 # Environment variables
│
├── Appointment.java         # Original Java classes
├── Patient.java
├── ClinicManager.java
├── MainApplication.java
└── README.md               # This file
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- A modern web browser

### Installation

#### 1. Backend Setup

```bash
cd backend
npm install
npm start
```

The server will start on `http://localhost:5000`

#### 2. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The application will open at `http://localhost:3000`

## 📋 API Endpoints

### Patients
- `GET /api/patients` - Get all patients
- `GET /api/patients/:id` - Get specific patient
- `POST /api/patients/register` - Register new patient

### Appointments
- `GET /api/appointments` - Get all appointments
- `GET /api/appointments/schedule/:date` - Get appointments for a date (YYYY-MM-DD)
- `POST /api/appointments/schedule` - Schedule new appointment
- `DELETE /api/appointments/:appointmentId` - Cancel appointment

## 🔧 Request/Response Examples

### Register Patient
**Request:**
```json
POST /api/patients/register
{
  "id": "P101",
  "name": "John Doe",
  "contactNumber": "9876543210"
}
```

**Response:**
```json
{
  "message": "Patient registered successfully",
  "patient": {
    "id": "P101",
    "name": "John Doe",
    "contactNumber": "9876543210"
  }
}
```

### Schedule Appointment
**Request:**
```json
POST /api/appointments/schedule
{
  "patientId": "P101",
  "date": "2024-12-20",
  "time": "14:30"
}
```

**Response:**
```json
{
  "message": "Appointment scheduled successfully",
  "appointmentId": "2024-12-20_14:30",
  "appointment": {
    "appointmentId": "2024-12-20_14:30",
    "date": "2024-12-20",
    "time": "14:30",
    "patientId": "P101",
    "patientName": "John Doe",
    "contactNumber": "9876543210"
  }
}
```

### View Daily Schedule
**Request:**
```
GET /api/appointments/schedule/2024-12-20
```

**Response:**
```json
[
  {
    "appointmentId": "2024-12-20_09:00",
    "date": "2024-12-20",
    "time": "09:00",
    "patientId": "P101",
    "patientName": "John Doe",
    "contactNumber": "9876543210"
  },
  {
    "appointmentId": "2024-12-20_14:30",
    "date": "2024-12-20",
    "time": "14:30",
    "patientId": "P102",
    "patientName": "Jane Smith",
    "contactNumber": "9876543211"
  }
]
```

## 🎨 Component Details

### Navigation Component
- Sticky header with responsive design
- Quick access to all main features
- Active tab highlighting
- Mobile-optimized icon display

### PatientRegistration Component
- Form validation
- Real-time error handling
- Success notifications
- Contact number format validation

### AppointmentScheduling Component
- Patient dropdown with autocomplete
- Date picker with future-date validation
- Time input (24-hour format)
- Automatic patient data fetching
- Duplicate slot prevention

### ViewSchedule Component
- Date filter for viewing schedules
- Sorted appointment list
- Cancel appointment functionality
- Formatted date display
- Empty state handling

### PatientList Component
- Search functionality
- Filter by ID, name, or contact
- Sorted patient list
- Total patient count
- Responsive table layout

## 🔒 Validation

### Patient Registration
- Patient ID: Required, unique
- Name: Required, non-empty
- Contact: Required, minimum 10 digits

### Appointment Scheduling
- Patient must be registered
- Date must be in YYYY-MM-DD format
- Date cannot be in the past
- Time must be in HH:MM format (24-hour)
- No double-booking on same date/time

## 🎯 Data Flow

```
User Input (Frontend)
    ↓
React Component
    ↓
API Service (axios)
    ↓
Express API (Backend)
    ↓
Data Validation
    ↓
DataStore (In-Memory)
    ↓
Response to Frontend
    ↓
Update UI State
```

## 🌐 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📱 Responsive Design

- Desktop: Full-featured layout
- Tablet: Optimized spacing
- Mobile: Stacked components, touch-friendly buttons

## 🔄 Data Persistence (Current Implementation)

Currently uses in-memory storage. To add persistence:
1. Connect to MongoDB, PostgreSQL, or MySQL
2. Update `DataStore.js` to use database queries
3. Implement data migration from existing Java files

## 🚦 Status Codes

- `200` - Success
- `201` - Created (new resource)
- `400` - Bad request (validation error)
- `404` - Not found
- `409` - Conflict (e.g., duplicate ID)
- `500` - Server error

## 🔐 Security Considerations

For production deployment:
- [ ] Implement authentication/authorization
- [ ] Add HTTPS/SSL
- [ ] Validate and sanitize all inputs
- [ ] Implement rate limiting
- [ ] Add CORS configuration
- [ ] Use environment variables for sensitive data
- [ ] Add logging and monitoring
- [ ] Implement database encryption

## 📚 Technology Stack

### Frontend
- React 18.2
- Vite (build tool)
- Axios (HTTP client)
- CSS3 (styling)

### Backend
- Express.js
- Node.js
- UUID (ID generation)
- Body Parser (middleware)

## 🤝 Future Enhancements

1. **Database Integration**
   - Connect to PostgreSQL/MongoDB
   - Add persistence layer

2. **User Authentication**
   - Doctor login
   - Admin panel
   - Role-based access

3. **Advanced Features**
   - Email notifications
   - SMS reminders
   - Doctor availability
   - Patient medical history
   - Prescription management

4. **Analytics**
   - Appointment statistics
   - Patient analytics
   - Staff performance metrics

5. **Mobile App**
   - React Native implementation
   - Offline support
   - Push notifications

## 🐛 Troubleshooting

### Frontend won't connect to backend
- Ensure backend is running on port 5000
- Check CORS settings in Express
- Verify API URLs in `services/api.js`

### Port already in use
```bash
# Kill process on port 5000 (backend)
npx kill-port 5000

# Kill process on port 3000 (frontend)
npx kill-port 3000
```

### Build errors
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## 📞 Support

For issues or questions about the system, refer to the component documentation or API endpoints section.

## 📄 License

This project is part of the Clinic Management System initiative.

---

**Version**: 1.0.0  
**Last Updated**: December 2024
