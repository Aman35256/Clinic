# 🏗️ System Architecture & Technical Documentation

## Overview

The Clinic Management Web Platform consists of three main layers:

```
┌─────────────────────────────────────────────────────────┐
│              PRESENTATION LAYER (Frontend)              │
│                    React 18.2 + Vite                    │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Navigation │ Dashboard │ Components              │   │
│  │ - PatientRegistration                           │   │
│  │ - AppointmentScheduling                         │   │
│  │ - ViewSchedule                                  │   │
│  │ - PatientList                                   │   │
│  └──────────────────────────────────────────────────┘   │
│                  Port: 3000 (http)                      │
└─────────────────────────────────────────────────────────┘
                            ↓↑
                    Axios HTTP Client
                    (API Requests/Responses)
                            ↓↑
┌─────────────────────────────────────────────────────────┐
│           APPLICATION LAYER (Backend API)               │
│              Express.js 4.18.2 + Node.js               │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Routes:                                          │   │
│  │ - /api/patients (GET, POST)                      │   │
│  │ - /api/appointments (GET, POST, DELETE)         │   │
│  │                                                  │   │
│  │ Middleware:                                      │   │
│  │ - CORS, Body Parser, Logger                     │   │
│  └──────────────────────────────────────────────────┘   │
│                  Port: 5000 (http)                      │
└─────────────────────────────────────────────────────────┘
                            ↓↑
                    Data Processing & Validation
                            ↓↑
┌─────────────────────────────────────────────────────────┐
│              DATA LAYER (In-Memory Storage)             │
│                      DataStore.js                       │
│  ┌──────────────────────────────────────────────────┐   │
│  │ Patients Map: {id -> Patient Object}             │   │
│  │ Appointments Map: {appointmentId -> Appointment} │   │
│  └──────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────┘
```

## Component Architecture

### Frontend Components Tree

```
App (Main Component)
├── Navigation
│   └── Nav Links (Dashboard, Register, Schedule, View, List)
├── Dashboard (Default View)
│   └── Feature Cards
├── PatientRegistration
│   ├── Form
│   ├── Validation
│   └── API Integration
├── AppointmentScheduling
│   ├── Patient Dropdown
│   ├── Date Picker
│   ├── Time Input
│   └── Conflict Prevention
├── ViewSchedule
│   ├── Date Filter
│   ├── Appointment List (Table)
│   └── Cancel Functionality
└── PatientList
    ├── Search Bar
    ├── Patient Table
    └── Filter Logic
```

## Data Flow Diagram

### Patient Registration Flow
```
User Input (Form)
    ↓
PatientRegistration Component
    ↓
Validation Check
    ├─ ID must be unique
    ├─ Name must not be empty
    └─ Contact must be 10+ digits
    ↓ [Valid]
API Service (Axios)
    ↓
POST /api/patients/register
    ↓
Backend Express Server
    ↓
DataStore.addPatient()
    ├─ Check if ID exists
    ├─ Create Patient Object
    └─ Store in Map
    ↓ [Success]
Response with Patient Data
    ↓
Update Component State
    ↓
Show Success Message
    ↓
Clear Form & Refresh
```

### Appointment Scheduling Flow
```
User Input (Form)
    ↓
AppointmentScheduling Component
    ↓
Fetch All Patients
    ↓
Populate Dropdown
    ↓
User Selects Patient, Date, Time
    ↓
Validation Check
    ├─ Patient exists
    ├─ Date is YYYY-MM-DD format
    ├─ Date is not in past
    ├─ Time is HH:MM format
    └─ Time slot not already booked
    ↓ [Valid]
API Service (Axios)
    ↓
POST /api/appointments/schedule
    ↓
Backend Express Server
    ↓
DataStore.addAppointment()
    ├─ Verify patient exists
    ├─ Check time slot availability
    ├─ Create Appointment Object
    └─ Store in Map
    ↓ [Success]
Response with Appointment ID
    ↓
Update Component State
    ↓
Show Success Message with Appointment ID
    ↓
Clear Form & Refresh
```

### View Daily Schedule Flow
```
User Selects Date
    ↓
ViewSchedule Component Updates
    ↓
API Service (Axios)
    ↓
GET /api/appointments/schedule/:date
    ↓
Backend Express Server
    ↓
DataStore.getAppointmentsByDate()
    ├─ Filter appointments by date
    ├─ Sort by time
    └─ Return list
    ↓
Response with Appointments Array
    ↓
Component Updates State
    ↓
Render Table with Sorted Appointments
    ↓
Each Row Shows:
    ├─ Time
    ├─ Patient Name
    ├─ Patient ID
    ├─ Contact Number
    └─ Cancel Button
```

## API Endpoint Details

### Patients Endpoints

#### 1. GET /api/patients
**Purpose**: Retrieve all registered patients

**Request**:
```
GET /api/patients HTTP/1.1
```

**Response** (200 OK):
```json
[
  {
    "id": "P101",
    "name": "John Doe",
    "contactNumber": "9876543210"
  },
  {
    "id": "P102",
    "name": "Jane Smith",
    "contactNumber": "9876543211"
  }
]
```

#### 2. GET /api/patients/:id
**Purpose**: Get specific patient details

**Request**:
```
GET /api/patients/P101 HTTP/1.1
```

**Response** (200 OK):
```json
{
  "id": "P101",
  "name": "John Doe",
  "contactNumber": "9876543210"
}
```

**Response** (404 Not Found):
```json
{
  "message": "Patient not found"
}
```

#### 3. POST /api/patients/register
**Purpose**: Register new patient

**Request**:
```json
POST /api/patients/register HTTP/1.1
Content-Type: application/json

{
  "id": "P101",
  "name": "John Doe",
  "contactNumber": "9876543210"
}
```

**Validation Rules**:
- `id`: Required, unique
- `name`: Required, non-empty string
- `contactNumber`: Required, minimum 10 digits

**Response** (201 Created):
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

**Response** (400 Bad Request):
```json
{
  "message": "All fields are required"
}
```

**Response** (409 Conflict):
```json
{
  "message": "Patient ID already exists"
}
```

### Appointments Endpoints

#### 1. GET /api/appointments
**Purpose**: Retrieve all appointments

**Request**:
```
GET /api/appointments HTTP/1.1
```

**Response** (200 OK):
```json
[
  {
    "appointmentId": "2024-12-20_14:30",
    "date": "2024-12-20",
    "time": "14:30",
    "patientId": "P101",
    "patientName": "John Doe",
    "contactNumber": "9876543210"
  }
]
```

#### 2. GET /api/appointments/schedule/:date
**Purpose**: Get appointments for specific date

**Request**:
```
GET /api/appointments/schedule/2024-12-20 HTTP/1.1
```

**Date Format**: YYYY-MM-DD

**Response** (200 OK):
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

**Response** (400 Bad Request):
```json
{
  "message": "Invalid date format. Use YYYY-MM-DD"
}
```

#### 3. POST /api/appointments/schedule
**Purpose**: Schedule new appointment

**Request**:
```json
POST /api/appointments/schedule HTTP/1.1
Content-Type: application/json

{
  "patientId": "P101",
  "date": "2024-12-20",
  "time": "14:30"
}
```

**Validation Rules**:
- `patientId`: Must exist in system
- `date`: YYYY-MM-DD format, must be future or today
- `time`: HH:MM format (24-hour), must be available

**Response** (201 Created):
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

**Response** (409 Conflict):
```json
{
  "message": "Time slot already booked"
}
```

**Response** (404 Not Found):
```json
{
  "message": "Patient not found"
}
```

#### 4. DELETE /api/appointments/:appointmentId
**Purpose**: Cancel appointment

**Request**:
```
DELETE /api/appointments/2024-12-20_14:30 HTTP/1.1
```

**Response** (200 OK):
```json
{
  "message": "Appointment cancelled successfully"
}
```

**Response** (404 Not Found):
```json
{
  "message": "Appointment not found"
}
```

## Database Schema (DataStore)

### Patients Map
```
Key: Patient ID (string)
Value: Patient Object {
  id: string,
  name: string,
  contactNumber: string
}
```

### Appointments Map
```
Key: Appointment ID (string: "YYYY-MM-DD_HH:MM")
Value: Appointment Object {
  appointmentId: string,
  date: string (YYYY-MM-DD),
  time: string (HH:MM),
  patientId: string,
  patientName: string,
  contactNumber: string
}
```

## State Management

### Frontend State per Component

**App Component**:
```javascript
{
  activeTab: string,           // Current page
  refreshTrigger: number       // Trigger updates
}
```

**PatientRegistration**:
```javascript
{
  formData: {
    id: string,
    name: string,
    contactNumber: string
  },
  error: string,
  success: string,
  loading: boolean
}
```

**AppointmentScheduling**:
```javascript
{
  formData: {
    patientId: string,
    date: string,
    time: string
  },
  error: string,
  success: string,
  loading: boolean,
  patients: array,
  loadingPatients: boolean
}
```

**ViewSchedule**:
```javascript
{
  selectedDate: string,
  appointments: array,
  loading: boolean,
  error: string
}
```

**PatientList**:
```javascript
{
  patients: array,
  loading: boolean,
  error: string,
  searchTerm: string
}
```

## Error Handling Strategy

### Frontend Error Handling
```javascript
try {
  // API call
} catch (error) {
  // Extract error message from response
  const message = error.response?.data?.message 
                  || 'Error message'
  
  // Display to user
  setError(message)
}
```

### Backend Error Handling
```javascript
// Validation errors (400)
if (!id) return res.status(400).json({message: 'ID required'})

// Conflict errors (409)
if (exists) return res.status(409).json({message: 'Already exists'})

// Not found errors (404)
if (!found) return res.status(404).json({message: 'Not found'})

// Server errors (500)
catch (error) {
  res.status(500).json({message: 'Internal error'})
}
```

## Performance Considerations

### Frontend
- **Vite**: ~100ms startup time
- **Lazy Loading**: Components load as needed
- **Debouncing**: Search filters debounced
- **Caching**: API responses cached

### Backend
- **In-Memory Storage**: O(1) lookup time
- **No Database Latency**: Instant reads/writes
- **Concurrent Requests**: Node.js handles multiple requests

### Network
- **API Response Time**: <50ms typically
- **JSON Payload Size**: <5KB per request
- **No File Uploads**: Minimal bandwidth usage

## Security Architecture

### Current Implementation (Development)
- ✅ Input validation (frontend & backend)
- ✅ CORS enabled
- ✅ Error message sanitization

### Production Enhancements Needed
- 🔒 JWT Authentication
- 🔒 HTTPS/SSL
- 🔒 Input sanitization (prevents SQL injection)
- 🔒 Rate limiting
- 🔒 Request logging
- 🔒 Database encryption
- 🔒 CSRF protection

## Deployment Architecture

### Development (Local)
```
Localhost
├── Frontend (3000)
└── Backend (5000)
```

### Production (Example)
```
CDN/Static Hosting
└── Frontend Build (dist/)

Cloud Server (e.g., Heroku, AWS)
└── Backend API

Database Server
└── PostgreSQL/MongoDB
```

## Future Enhancements

### Phase 2
- [ ] User authentication
- [ ] Role-based access control
- [ ] Database integration
- [ ] Email notifications

### Phase 3
- [ ] Doctor profiles
- [ ] Patient medical history
- [ ] Prescription management
- [ ] Analytics dashboard

### Phase 4
- [ ] Mobile app (React Native)
- [ ] SMS reminders
- [ ] Video consultations
- [ ] Payment integration

## Integration with Java Backend

The current web platform operates independently with its own in-memory data store. To integrate with the original Java system:

1. **Option 1**: Wrap Java with REST endpoints
   - Modify ClinicManager to expose REST API
   - Deploy as separate service
   - Connect web frontend to Java backend

2. **Option 2**: Port Java logic to Node.js
   - Rewrite ClinicManager in JavaScript
   - Use database for persistence
   - Current implementation follows this approach

3. **Option 3**: Hybrid approach
   - Keep Java for core logic
   - Node.js as API gateway
   - Share database between systems

---

**Architecture Version**: 1.0.0  
**Last Updated**: December 2024
