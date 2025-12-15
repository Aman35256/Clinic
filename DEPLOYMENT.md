# 🚀 Deployment Guide

## Local Development (Current Setup)

### Requirements
- Node.js v14+
- npm v6+
- Port 5000 (backend)
- Port 3000 (frontend)

### Quick Start
```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

**Access**: http://localhost:3000

---

## Production Deployment

### Option 1: Heroku (Recommended for Beginners)

#### Prerequisites
- Heroku account (free)
- Heroku CLI installed
- Git repository

#### Deploy Backend to Heroku

1. **Create Heroku app**
```bash
cd backend
heroku create clinic-backend-api
```

2. **Set environment**
```bash
heroku config:set NODE_ENV=production
```

3. **Deploy**
```bash
git push heroku main
# or
git push heroku master
```

4. **Get backend URL**
```bash
heroku apps:info clinic-backend-api
# Use the URL in frontend .env
```

#### Deploy Frontend to Heroku

1. **Update backend URL**
```javascript
// frontend/.env
VITE_API_URL=https://clinic-backend-api.herokuapp.com
```

2. **Create static build**
```bash
cd frontend
npm run build
```

3. **Deploy to Heroku**
```bash
heroku create clinic-frontend
git push heroku main
```

### Option 2: AWS (Recommended for Enterprise)

#### Backend on EC2
1. Launch EC2 instance (Ubuntu)
2. Install Node.js & npm
3. Clone repository
4. Run `npm install && npm start`
5. Use PM2 for process management

#### Frontend on S3 + CloudFront
1. Build: `npm run build`
2. Upload `dist/` to S3 bucket
3. Set up CloudFront distribution
4. Update API URL to EC2 instance

### Option 3: DigitalOcean

#### App Platform (Easiest)
1. Push code to GitHub
2. Connect GitHub to DigitalOcean
3. Create app from repository
4. Set environment variables
5. Deploy with one click

#### Droplet (Full Control)
1. Create Ubuntu droplet
2. Install Node.js, Nginx
3. Clone repository
4. Use PM2 for process management
5. Configure Nginx as reverse proxy

---

## Docker Deployment

### Dockerfile (Backend)
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 5000
CMD ["node", "server.js"]
```

### Dockerfile (Frontend)
```dockerfile
FROM node:18-alpine as builder

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Docker Compose
```yaml
version: '3.8'

services:
  backend:
    build: ./backend
    ports:
      - "5000:5000"
    environment:
      NODE_ENV: production
      PORT: 5000

  frontend:
    build: ./frontend
    ports:
      - "3000:80"
    depends_on:
      - backend

  postgres:
    image: postgres:14
    environment:
      POSTGRES_DB: clinic
      POSTGRES_PASSWORD: secure_password
    volumes:
      - postgres_data:/var/lib/postgresql/data

volumes:
  postgres_data:
```

**Deploy with Docker Compose:**
```bash
docker-compose up -d
```

---

## Database Setup (Production)

### PostgreSQL Setup

1. **Create database**
```sql
CREATE DATABASE clinic_db;
```

2. **Create tables**
```sql
CREATE TABLE patients (
  id VARCHAR(50) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact_number VARCHAR(20) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE appointments (
  appointment_id VARCHAR(50) PRIMARY KEY,
  date DATE NOT NULL,
  time TIME NOT NULL,
  patient_id VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (patient_id) REFERENCES patients(id)
);

CREATE INDEX idx_appointment_date ON appointments(date);
CREATE INDEX idx_appointment_patient ON appointments(patient_id);
```

3. **Update backend** (`DataStore.js`)
```javascript
const pg = require('pg');
const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

// Modify methods to use pool.query()
```

### MongoDB Setup

1. **Create cluster** on MongoDB Atlas
2. **Get connection string**
3. **Update DataStore.js**
```javascript
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  id: String,
  name: String,
  contactNumber: String
});

const appointmentSchema = new mongoose.Schema({
  appointmentId: String,
  date: String,
  time: String,
  patientId: String
});
```

---

## Environment Variables

### Backend .env (Production)
```
NODE_ENV=production
PORT=5000
DATABASE_URL=postgresql://user:password@host:5432/clinic_db
CORS_ORIGIN=https://yourdomain.com
LOG_LEVEL=info
JWT_SECRET=your-secret-key
```

### Frontend .env.production
```
VITE_API_URL=https://api.yourdomain.com
VITE_ENVIRONMENT=production
```

---

## SSL/HTTPS Setup

### Using Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Generate certificate
sudo certbot certonly --nginx -d yourdomain.com

# Nginx configuration
server {
    listen 443 ssl;
    server_name yourdomain.com;
    
    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;
    
    location / {
        proxy_pass http://localhost:3000;
    }
}

# Redirect HTTP to HTTPS
server {
    listen 80;
    server_name yourdomain.com;
    return 301 https://$server_name$request_uri;
}
```

---

## Nginx Configuration (Reverse Proxy)

### /etc/nginx/sites-available/clinic
```nginx
upstream frontend {
    server localhost:3000;
}

upstream backend {
    server localhost:5000;
}

server {
    listen 80;
    server_name yourdomain.com;

    # Frontend
    location / {
        proxy_pass http://frontend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    # API
    location /api/ {
        proxy_pass http://backend;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

**Enable site:**
```bash
sudo ln -s /etc/nginx/sites-available/clinic /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

---

## PM2 Process Management

### Install PM2
```bash
npm install -g pm2
```

### Create ecosystem.config.js
```javascript
module.exports = {
  apps: [
    {
      name: 'clinic-api',
      script: './server.js',
      cwd: './backend',
      instances: 4,
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'production',
        PORT: 5000
      },
      error_file: './logs/err.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z'
    }
  ]
};
```

### Deploy with PM2
```bash
pm2 start ecosystem.config.js
pm2 startup
pm2 save
pm2 logs
```

---

## Monitoring & Logging

### PM2 Monitoring
```bash
pm2 monit          # Real-time monitoring
pm2 logs          # View logs
pm2 save          # Save current state
pm2 startup       # Auto-start on boot
```

### Nginx Logs
```bash
# Access logs
tail -f /var/log/nginx/access.log

# Error logs
tail -f /var/log/nginx/error.log
```

### Application Logging
```javascript
// Add logging to backend
const fs = require('fs');
const logFile = fs.createWriteStream('app.log', { flags: 'a' });

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  const log = `${timestamp} ${req.method} ${req.path} ${res.statusCode}\n`;
  logFile.write(log);
  next();
});
```

---

## Performance Optimization

### Frontend
```bash
# Enable gzip compression
npm install compression

# Minify assets
npm run build  # Vite does this automatically

# Use CDN for static files
# Configure dist/ to be served from CloudFront/CloudFlare
```

### Backend
```javascript
// Enable compression
const compression = require('compression');
app.use(compression());

// Add caching headers
app.use((req, res, next) => {
  if (req.path.startsWith('/api/')) {
    res.setHeader('Cache-Control', 'no-cache');
  } else {
    res.setHeader('Cache-Control', 'public, max-age=3600');
  }
  next();
});
```

---

## Security Hardening

### CORS Configuration
```javascript
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use('/api/', limiter);
```

### Helmet Security Headers
```javascript
const helmet = require('helmet');
app.use(helmet());
```

---

## Backup Strategy

### Database Backups
```bash
# PostgreSQL
pg_dump clinic_db > backup_$(date +%Y%m%d_%H%M%S).sql

# MongoDB
mongodump --uri "mongodb+srv://..." --out ./backup
```

### Automated Backups (Cron)
```bash
# Edit crontab
crontab -e

# Daily backup at 2 AM
0 2 * * * /home/user/scripts/backup.sh
```

---

## Deployment Checklist

- [ ] Environment variables configured
- [ ] Database set up and migrated
- [ ] SSL certificate installed
- [ ] CORS properly configured
- [ ] Rate limiting enabled
- [ ] Logging configured
- [ ] Monitoring set up
- [ ] Backup strategy implemented
- [ ] Health check endpoint working
- [ ] Load testing completed
- [ ] Security audit passed
- [ ] Documentation updated

---

## Troubleshooting Deployment

### App won't start
```bash
pm2 logs  # Check logs
pm2 restart all
```

### High CPU usage
```bash
pm2 monit  # Check which process
# Increase instances in PM2 config
# Consider database indexing
```

### Connection timeouts
- Check firewall rules
- Verify database connection string
- Increase timeout values in proxy config

### Memory leaks
```bash
# Monitor memory usage
pm2 monit

# Check for unclosed connections
# Review error logs for patterns
```

---

## Cost Estimation (Monthly)

| Service | Cost | Notes |
|---------|------|-------|
| Heroku | $50+ | Simple, auto-scaling |
| AWS EC2 | $10-50 | t3.micro to t3.small |
| DigitalOcean | $5-20 | Droplet + database |
| RDS Database | $15-100 | Based on usage |
| CloudFront CDN | $0.085/GB | Variable |

---

**Deployment Guide Version**: 1.0.0  
**Last Updated**: December 2024
