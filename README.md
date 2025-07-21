# Full-Stack CRUD Application

A complete CRUD (Create, Read, Update, Delete) application built with React frontend, Node.js backend, and MongoDB database.

## 🚀 Features

- **Frontend**: React + Vite with modern UI
- **Backend**: Node.js + Express REST API
- **Database**: MongoDB with Mongoose ODM
- **Full CRUD Operations**: Create, Read, Update, Delete users
- **Responsive Design**: Works on desktop and mobile
- **Real-time Updates**: Immediate UI updates after operations
- **Form Validation**: Client and server-side validation
- **Error Handling**: Comprehensive error handling and user feedback

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14 or higher)
- **MongoDB** (running locally or MongoDB Atlas connection)
- **npm** or **yarn**

## 🛠️ Installation

1. **Clone or download the project files**

2. **Install dependencies for all parts:**
   ```bash
   npm run install-all
   ```

3. **Set up MongoDB:**
   - Install MongoDB locally, or
   - Use MongoDB Atlas (cloud service)
   - Update the connection string in `backend/config.env` if needed

4. **Configure environment variables:**
   - The default configuration uses `mongodb://localhost:27017/crud-app`
   - If using MongoDB Atlas, update the `MONGODB_URI` in `backend/config.env`

## 🚀 Running the Application

### Option 1: Run both frontend and backend together
```bash
npm run dev
```

### Option 2: Run separately

**Backend (Terminal 1):**
```bash
cd backend
npm run dev
```

**Frontend (Terminal 2):**
```bash
cd frontend
npm run dev
```

## 📱 Usage

1. **Frontend**: Open `http://localhost:3000` in your browser
2. **Backend API**: Available at `http://localhost:5000`

### API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `POST /api/users` - Create new user
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user

## 🎯 Features Overview

### User Management
- **Create**: Add new users with name, email, phone, age, and address
- **Read**: View all users in a responsive grid layout
- **Update**: Edit existing user information
- **Delete**: Remove users with confirmation

### User Interface
- **Modern Design**: Clean, responsive interface with gradient backgrounds
- **Form Validation**: Real-time validation for required fields
- **Success/Error Messages**: Clear feedback for all operations
- **Loading States**: Visual feedback during API calls
- **Responsive Layout**: Works on all device sizes

### Data Model
```javascript
{
  name: String (required),
  email: String (required, unique),
  phone: String (optional),
  age: Number (optional, 0-120),
  address: String (optional),
  createdAt: Date (auto-generated),
  updatedAt: Date (auto-generated)
}
```

## 🛠️ Project Structure

```
├── backend/
│   ├── models/
│   │   └── User.js          # MongoDB User schema
│   ├── routes/
│   │   └── users.js         # API routes for CRUD operations
│   ├── config.env           # Environment variables
│   ├── package.json         # Backend dependencies
│   └── server.js            # Express server setup
├── frontend/
│   ├── src/
│   │   ├── App.jsx          # Main React component
│   │   ├── App.css          # Component styles
│   │   ├── main.jsx         # React entry point
│   │   └── index.css        # Global styles
│   ├── index.html           # HTML template
│   ├── package.json         # Frontend dependencies
│   └── vite.config.js       # Vite configuration
├── package.json             # Root package.json
└── README.md               # This file
```

## 🔧 Configuration

### Environment Variables (backend/config.env)
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/crud-app
NODE_ENV=development
```

### MongoDB Connection
- **Local MongoDB**: `mongodb://localhost:27017/crud-app`
- **MongoDB Atlas**: `mongodb+srv://username:password@cluster.mongodb.net/crud-app`

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running locally
   - Check connection string in `config.env`
   - For Atlas, verify username/password

2. **Port Already in Use**
   - Change PORT in `config.env`
   - Kill existing processes on ports 3000/5000

3. **CORS Errors**
   - Backend CORS is configured for localhost:3000
   - Check if frontend is running on correct port

4. **Module Not Found Errors**
   - Run `npm install` in both backend and frontend directories
   - Delete `node_modules` and reinstall if needed

## 🚀 Deployment

### Backend Deployment
1. Set `NODE_ENV=production` in environment variables
2. Use MongoDB Atlas for database
3. Deploy to platforms like Heroku, Railway, or Vercel

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to platforms like Netlify, Vercel, or GitHub Pages

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Feel free to submit issues and enhancement requests! 