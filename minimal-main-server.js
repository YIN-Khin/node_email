// const express = require('express');
// const cors = require('cors');
// const http = require('http');
// const socketIo = require('socket.io');

// console.log('🚀 Starting minimal main server...');

// // Import models with sequelize instance
// const db = require('./src/models');
// const sequelize = db.sequelize;

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: {
//     origin: "*",
//     methods: ["GET", "POST"]
//   }
// });

// // Middleware
// app.use(cors());
// app.use(express.json({ limit: '50mb' }));
// app.use(express.urlencoded({ extended: true, limit: '50mb' }));
// app.set('io', io);

// // Import and setup notification routes
// const notificationRoutes = require('./src/routes/notificationRoutes');
// notificationRoutes(app);

// // Import stock level checker and expiration checker
// const stockLevelChecker = require('./src/jobs/stockLevelChecker');
// const expirationChecker = require('./src/jobs/expirationChecker');

// const syncDatabase = async () => {
//   try {
//     await sequelize.authenticate();
//     console.log('✅ Database connection established successfully.');
//     await sequelize.sync({ alter: false });
//     console.log("✅ Database synchronized.");
//     return true;
//   } catch (error) {
//     console.error('❌ Database sync error:', error.message);
//     return false;
//   }
// };

// const PORT = process.env.PORT || 3001;

// console.log(`📡 Attempting to listen on port ${PORT}...`);
// server.listen(PORT, function () {
//   console.log(`✅ Minimal main server is running on http://localhost:${PORT}`);
  
//   syncDatabase().then((success) => {
//     if (success) {
//       // Start stock level checker after successful database sync
//       console.log('🔄 Starting stock level monitoring...');
//       try {
//         stockLevelChecker.start();
//         console.log('✅ Stock level checker started successfully');
//       } catch (error) {
//         console.error('❌ Failed to start stock level checker:', error);
//       }

//       // Start expiration checker
//       console.log('📅 Starting expiration monitoring...');
//       try {
//         expirationChecker.start();
//         console.log('✅ Expiration checker started successfully');
//       } catch (error) {
//         console.error('❌ Failed to start expiration checker:', error);
//       }
//     }
//   }).catch(err => {
//     console.error('❌ Database sync error (non-fatal):', err.message);
//   });
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