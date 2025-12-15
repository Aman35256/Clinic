# 🏥 Clinic Management System - Web Platform Setup Guide

## Overview
This guide will help you set up and run the complete web-based clinic management system with frontend (React) and backend (Express.js) components.

## ✅ Prerequisites Checklist
- [ ] Node.js v14+ installed (`node --version`)
- [ ] npm v6+ installed (`npm --version`)
- [ ] Git (optional, for version control)
- [ ] A modern web browser
- [ ] ~500MB free disk space

## 🔧 Installation Steps

### Step 1: Navigate to Clinic Directory
```powershell
cd "C:\Users\amanm\OneDrive\Desktop\Clinic"
```

### Step 2: Setup Backend Server

```powershell
# Navigate to backend folder
cd backend

# Install dependencies
npm install

# Start the server
npm start
```

**Expected Output:**
```
=================================
🏥 Clinic Management API Server
=================================
✓ Server running on http://localhost:5000
✓ API endpoints: /api/patients, /api/appointments
=================================
```

Keep this terminal open. The backend is now running.

### Step 3: Setup Frontend Application (NEW TERMINAL)

Open a new PowerShell terminal while keeping the backend running:

```powershell
# Navigate to frontend folder
cd "C:\Users\amanm\OneDrive\Desktop\Clinic\frontend"

# Install dependencies
npm install

# Start development server
npm run dev
```

**Expected Output:**
```
  VITE v5.0.0  ready in 123 ms

  ➜  Local:   http://localhost:3000/
  ➜  press h to show help
```

The application will automatically open in your default browser at `http://localhost:3000`.

## 🎯 Using the Application

### Dashboard
- Homepage with overview of all features
- Quick access cards for each module

### 1. Register Patient
- Click "Register Patient" in navigation
- Fill in Patient ID (e.g., P101)
- Enter full name and contact number
- Click "Register Patient"
- Receive success confirmation

### 2. Schedule Appointment
- Click "Schedule Appointment" in navigation
- Select patient from dropdown
- Choose appointment date (future dates only)
- Enter appointment time (24-hour format: HH:MM)
- Click "Schedule Appointment"
- Get appointment ID for reference

### 3. View Daily Schedule
- Click "View Schedule" in navigation
- Select date to view appointments
- See all appointments for that day
- Option to cancel appointments
- Appointments sorted by time

### 4. Patient Directory
- Click "Patient List" in navigation
- View all registered patients
- Use search to filter by ID, name, or contact
- See total patient count

## 🔗 API Endpoints Reference

### Patient Endpoints
```
GET  /api/patients                    - List all patients
GET  /api/patients/:id                - Get specific patient
POST /api/patients/register           - Register new patient
```

### Appointment Endpoints
```
GET  /api/appointments                - List all appointments
GET  /api/appointments/schedule/:date - View daily schedule
POST /api/appointments/schedule       - Schedule appointment
DELETE /api/appointments/:id          - Cancel appointment
```

## 🧪 Test Data Setup

Create test patients to explore the system:

### Patient 1
- ID: P101
- Name: John Doe
- Contact: 9876543210

### Patient 2
- ID: P102
- Name: Jane Smith
- Contact: 9876543211

### Patient 3
- ID: P103
- Name: Robert Johnson
- Contact: 9876543212

## 📊 Testing Workflow

1. **Register 3 test patients** using the above data
2. **Schedule appointments** for different times on same day
3. **View schedule** to see all appointments sorted by time
4. **Search patients** in patient list
5. **Cancel an appointment** to test deletion
6. **Try validation** by entering invalid data

## 🛑 Stopping the Application

To stop the servers:

### Backend (in backend terminal):
```
Press Ctrl + C
```

### Frontend (in frontend terminal):
```
Press Ctrl + C
```

## 🔄 Restarting the Application

### Quick Restart:
```powershell
# Terminal 1 - Backend
cd backend
npm start

# Terminal 2 - Frontend
cd frontend
npm run dev
```

### Hard Reset (if issues):
```powershell
# Backend
cd backend
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
npm install
npm start

# Frontend
cd frontend
Remove-Item -Recurse node_modules
Remove-Item package-lock.json
npm install
npm run dev
```

## 🐛 Troubleshooting

### Issue: "Port 5000 already in use"
```powershell
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <PID> /F
```

### Issue: "Port 3000 already in use"
```powershell
# Find and kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Issue: "npm command not found"
- Verify Node.js installation: `node --version`
- Reinstall Node.js from https://nodejs.org

### Issue: Frontend can't connect to backend
- Ensure backend is running on port 5000
- Check if error appears in browser console (F12)
- Verify backend terminal shows no errors
- Restart both services

### Issue: "Module not found" errors
```powershell
# Clear cache and reinstall
npm cache clean --force
Remove-Item -Recurse node_modules package-lock.json
npm install
```

## 📱 Accessing from Mobile Devices

To access the application from another computer on the same network:

1. Find your computer's IP address:
```powershell
ipconfig
# Look for IPv4 Address (e.g., 192.168.x.x)
```

2. On mobile device, visit: `http://YOUR_IP:3000`

**Note**: Requires both computers on same network and firewall allowing port 3000

## 📦 Building for Production

### Frontend Build:
```powershell
cd frontend
npm run build
# Creates optimized build in dist/ folder
```

### Deploy:
- Upload contents of `frontend/dist/` to web hosting
- Update backend API URL in environment variables
- Deploy backend to server (e.g., Heroku, AWS)

## 🔒 Environment Variables

### Backend (.env)
```
PORT=5000
NODE_ENV=development
```

For production:
```
PORT=5000
NODE_ENV=production
```

## 📞 Common Commands

```powershell
# Clear all data and start fresh
# (Backend will restart with empty database)
npm restart

# View logs
npm start  # Logs appear in terminal

# Update dependencies
npm update

# Check version
npm --version
```

## 🎓 Learning Resources

### Frontend (React)
- [React Documentation](https://react.dev)
- [Vite Guide](https://vitejs.dev)
- [Axios Documentation](https://axios-http.com)

### Backend (Express)
- [Express Documentation](https://expressjs.com)
- [Node.js Guide](https://nodejs.org/docs/)

## ✨ Features to Explore

1. **Form Validation**
   - Try entering invalid phone numbers
   - Try scheduling past dates
   - Try duplicate patient IDs

2. **Real-time Updates**
   - Register patient then schedule appointment
   - Changes reflect immediately

3. **Responsive Design**
   - Resize browser to test mobile layout
   - Works on tablets and phones

4. **Error Handling**
   - Clear error messages for failed operations
   - Success confirmations for completed tasks

## 🚀 Performance Tips

1. **Frontend**
   - Clear browser cache if old data appears
   - Use incognito/private mode for testing

2. **Backend**
   - In-memory storage is fast for testing
   - For production, migrate to database

3. **Network**
   - Ensure stable internet connection
   - Close unused programs to save bandwidth

## 📋 Checklist for First Run

- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Both terminals showing no errors
- [ ] Browser shows clinic dashboard
- [ ] Can register patient
- [ ] Can schedule appointment
- [ ] Can view daily schedule
- [ ] Can view patient list

## 🎉 Success!

Once you see the clinic dashboard in your browser, the system is ready to use!

**Happy clinic management!** 🏥

---

For more details, see:
- [FRONTEND_README.md](FRONTEND_README.md) - Detailed feature documentation
- Original Java files for reference: `Appointment.java`, `Patient.java`, `ClinicManager.java`

**Version**: 1.0.0  
**Setup Time**: ~5-10 minutes
