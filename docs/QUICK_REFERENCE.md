# ⚡ Quick Reference Guide

## 🚀 Getting Started (5 Minutes)

### One-Time Setup
```bash
# Go to project directory
cd "C:\Users\amanm\OneDrive\Desktop\Clinic"

# Install frontend dependencies
cd frontend && npm install

# Install backend dependencies
cd ..\backend && npm install
```

### Every Time You Start
```bash
# Terminal 1: Start Backend
cd backend
npm start
# Output: ✓ Server running on http://localhost:5000

# Terminal 2: Start Frontend
cd frontend
npm run dev
# Output: ➜ Local: http://localhost:3000

# Open browser: http://localhost:3000
```

---

## 📍 Key URLs

| Component | URL | Port |
|-----------|-----|------|
| Web App | http://localhost:3000 | 3000 |
| API Server | http://localhost:5000 | 5000 |
| Health Check | http://localhost:5000/api/health | 5000 |

---

## 📚 Documentation

| Guide | Purpose | Start Here? |
|-------|---------|-------------|
| [SETUP_GUIDE.md](SETUP_GUIDE.md) | Installation steps | ✅ YES |
| [README.md](README.md) | Project overview | Quick intro |
| [FRONTEND_README.md](FRONTEND_README.md) | Features & API | Deep dive |
| [ARCHITECTURE.md](ARCHITECTURE.md) | Technical design | Advanced |
| [DEPLOYMENT.md](DEPLOYMENT.md) | Production | Deployment |
| [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md) | File organization | Reference |

---

## 🎯 Common Tasks

### Register a Patient
1. Click "Register Patient" in nav
2. Enter Patient ID (e.g., P101)
3. Enter full name
4. Enter 10+ digit phone number
5. Click "Register Patient"

### Schedule Appointment
1. Click "Schedule Appointment" in nav
2. Select patient from dropdown
3. Choose date (today or future only)
4. Enter time (HH:MM format, e.g., 14:30)
5. Click "Schedule Appointment"
6. Note the Appointment ID

### View Daily Schedule
1. Click "View Schedule" in nav
2. Select date from calendar
3. See all appointments for that day
4. Can cancel appointments if needed

### Search Patients
1. Click "Patient List" in nav
2. Use search box at top
3. Filter by name, ID, or contact number

---

## 🔧 Troubleshooting

### Problem: Frontend won't load
```
✓ Backend running on port 5000?
✓ Frontend running on port 3000?
✓ Check browser console (F12) for errors
✓ Try: Hard refresh (Ctrl+Shift+R)
```

### Problem: "Port already in use"
```powershell
# Find process on port
netstat -ano | findstr :5000

# Kill it
taskkill /PID <PID> /F

# Or change port in .env
```

### Problem: Cannot connect to backend
```
✓ Is backend running? Check terminal
✓ Try: curl http://localhost:5000/api/health
✓ Check firewall settings
```

### Problem: Form submission fails
```
✓ Check browser console (F12)
✓ Check backend terminal for errors
✓ Verify all required fields filled
✓ Check field format (e.g., phone number 10+ digits)
```

### Problem: No data appears in list
```
✓ Did you register patients first?
✓ Try: Refresh page (F5)
✓ Backend data resets on restart
✓ For persistence: add database (see DEPLOYMENT.md)
```

---

## 🔄 Development Workflow

### Make Code Changes

**Frontend**:
1. Edit file in `frontend/src/`
2. Save (auto-reloads in browser)
3. Check browser for changes

**Backend**:
1. Edit file in `backend/`
2. Server auto-restarts (if using nodemon)
3. Test API endpoints

### View Errors

**Frontend Errors**:
- Press F12 in browser
- Check "Console" tab

**Backend Errors**:
- Check terminal output
- Look for red error messages

---

## 🧪 Test Data

```
Patient 1:
  ID: P101
  Name: John Doe
  Phone: 9876543210

Patient 2:
  ID: P102
  Name: Jane Smith
  Phone: 9876543211

Patient 3:
  ID: P103
  Name: Robert Johnson
  Phone: 9876543212
```

**Quick Test Flow**:
1. Register all 3 patients
2. Schedule 2 appointments for P101
3. View daily schedule
4. Search for "John" in patient list
5. Cancel one appointment

---

## 📊 API Quick Reference

### Get All Patients
```bash
curl http://localhost:5000/api/patients
```

### Register Patient
```bash
curl -X POST http://localhost:5000/api/patients/register \
  -H "Content-Type: application/json" \
  -d '{"id":"P101","name":"John Doe","contactNumber":"9876543210"}'
```

### Schedule Appointment
```bash
curl -X POST http://localhost:5000/api/appointments/schedule \
  -H "Content-Type: application/json" \
  -d '{"patientId":"P101","date":"2024-12-25","time":"14:30"}'
```

### View Daily Schedule
```bash
curl http://localhost:5000/api/appointments/schedule/2024-12-25
```

### Cancel Appointment
```bash
curl -X DELETE http://localhost:5000/api/appointments/2024-12-25_14:30
```

---

## 🛑 Stopping Servers

### Stop Backend
```bash
# In backend terminal
Press Ctrl + C
```

### Stop Frontend
```bash
# In frontend terminal
Press Ctrl + C
```

### Kill by Port (if stuck)
```powershell
# Backend (port 5000)
netstat -ano | findstr :5000
taskkill /PID <PID> /F

# Frontend (port 3000)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

---

## 📂 Important Files

### To Modify Features
- `frontend/src/App.jsx` - Routing & pages
- `frontend/src/components/*.jsx` - UI components
- `backend/routes/*.js` - API endpoints
- `backend/models/DataStore.js` - Business logic

### Configuration
- `frontend/vite.config.js` - Frontend build config
- `backend/.env` - Backend environment variables
- `frontend/.env.production` - Production settings

### Styling
- `frontend/src/App.css` - Global styles
- `frontend/src/components/*.css` - Component styles

---

## 🚀 Next Steps

### For Learning
1. Read [SETUP_GUIDE.md](SETUP_GUIDE.md)
2. Get system running
3. Test all features
4. Review [FRONTEND_README.md](FRONTEND_README.md)
5. Explore code files

### For Development
1. Understand [ARCHITECTURE.md](ARCHITECTURE.md)
2. Learn component structure
3. Add new features
4. Test changes

### For Production
1. Review [DEPLOYMENT.md](DEPLOYMENT.md)
2. Set up database
3. Configure security
4. Deploy to server

---

## 💡 Tips & Tricks

### Development
```bash
# Clear data and restart
# (Backend will reset with empty database)
npm restart

# Watch logs in real-time
npm start  # Shows all logs

# View what's happening
# Browser: F12 → Console
# Backend: Check terminal output
```

### Testing
```bash
# Test API with curl
curl http://localhost:5000/api/health

# Test from browser DevTools
# Go to Console tab and run:
fetch('/api/patients').then(r => r.json()).then(d => console.log(d))
```

### Browser DevTools
```
F12 → Useful tabs:
- Console: See errors & logs
- Network: See API calls
- Application: Check localStorage
```

---

## ❌ Common Mistakes

| Mistake | Fix |
|---------|-----|
| Running backend and frontend in same terminal | Use 2 terminals |
| Not installing dependencies | Run `npm install` in both folders |
| Phone number < 10 digits | Must be at least 10 digits |
| Scheduling past date | Can only schedule future dates |
| Backend on wrong port | Check `.env` for correct port |
| Forgot to restart server after code change | Restart both servers |
| Data disappeared after restart | Data is in-memory, not persistent |

---

## 🔒 Security Notes

### Current Setup (Development)
✅ Input validation  
✅ Error handling  
✅ CORS configured  

### For Production
🔒 Add HTTPS  
🔒 Add authentication  
🔒 Add database encryption  
🔒 Enable rate limiting  
🔒 Use environment variables  

See [DEPLOYMENT.md](DEPLOYMENT.md) for details.

---

## 📞 Help & Support

### Common Resources
- React: https://react.dev
- Express: https://expressjs.com
- API Testing: Postman (download free)

### Debug Strategy
1. Check browser console (F12)
2. Check backend terminal
3. Use curl to test API
4. Check documentation
5. Add console logs

### Information Locations
- Feature docs: [FRONTEND_README.md](FRONTEND_README.md)
- API docs: [FRONTEND_README.md](FRONTEND_README.md#-api-endpoints)
- Setup help: [SETUP_GUIDE.md](SETUP_GUIDE.md)
- Code details: [PROJECT_STRUCTURE.md](PROJECT_STRUCTURE.md)

---

## ✨ System Features Checklist

- ✅ Patient Registration
- ✅ Appointment Scheduling
- ✅ Daily Schedule View
- ✅ Patient Directory
- ✅ Search Functionality
- ✅ Date Validation
- ✅ Time Slot Management
- ✅ Responsive Design
- ✅ Error Messages
- ✅ Success Confirmations

---

## 📊 Quick Stats

| Metric | Value |
|--------|-------|
| Frontend Components | 5 |
| Backend Routes | 4 |
| API Endpoints | 6 |
| Total Files | 30+ |
| Setup Time | ~5 min |
| First Run | <1 second |
| Database Type | In-Memory |

---

**Quick Reference Version**: 1.0.0  
**Last Updated**: December 2024  
**Print Friendly**: ✅ Yes

---

## 🎉 You're Ready!

```
1. Read SETUP_GUIDE.md
2. Run: npm install (in both folders)
3. Run: npm start (backend)
4. Run: npm run dev (frontend)
5. Open: http://localhost:3000
6. Register a patient
7. Schedule appointment
8. View schedule
9. Have fun! 🎉
```

**Need help?** Check the relevant documentation file above! 📚
