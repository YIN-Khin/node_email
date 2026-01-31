// const express = require('express');
// const cors = require('cors');
// const http = require('http');

// console.log('🚀 Starting debug server...');

// const app = express();
// const server = http.createServer(app);

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// console.log('✅ Basic middleware loaded');

// // Try loading database models
// try {
//   console.log('📦 Loading database models...');
//   const db = require('./src/models');
//   const sequelize = db.sequelize;
//   console.log('✅ Database models loaded successfully');
  
//   // Try loading notification routes
//   try {
//     console.log('📦 Loading notification routes...');
//     const notificationRoutes = require('./src/routes/notificationRoutes');
//     notificationRoutes(app);
//     console.log('✅ Notification routes loaded successfully');
//   } catch (error) {
//     console.error('❌ Error loading notification routes:', error.message);
//     console.error('Stack:', error.stack);
//   }
  
// } catch (error) {
//   console.error('❌ Error loading database models:', error.message);
//   console.error('Stack:', error.stack);
// }

// const PORT = process.env.PORT || 3001;

// console.log(`📡 Attempting to listen on port ${PORT}...`);
// server.listen(PORT, function () {
//   console.log(`✅ Debug server is running on http://localhost:${PORT}`);
// }).on('error', (err) => {
//   console.error('❌ Server startup error:', err.message);
//   if (err.code === 'EADDRINUSE') {
//     console.error(`❌ Error: Port ${PORT} is already in use.`);
//     process.exit(1);
//   } else {
//     console.error('❌ Server error:', err.message);
//     process.exit(1);
//   }
// });