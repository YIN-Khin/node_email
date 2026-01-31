// const express = require('express');
// const cors = require('cors');
// const http = require('http');

// console.log('1. Loading modules...');

// try {
//   const db = require('./src/models');
//   const sequelize = db.sequelize;
//   console.log('2. Models loaded');
  
//   const app = express();
//   console.log('3. Express app created');
  
//   app.use(cors());
//   app.use(express.json());
//   console.log('4. Middleware configured');
  
//   // Simple test route
//   app.get('/test', (req, res) => {
//     res.json({ message: 'Server is working!' });
//   });
  
//   const server = http.createServer(app);
//   console.log('5. HTTP server created');
  
//   server.listen(3001, () => {
//     console.log('✅ Server is running on http://localhost:3001');
//   });
  
//   server.on('error', (err) => {
//     console.error('❌ Server error:', err);
//   });
  
// } catch (err) {
//   console.error('❌ Error starting server:', err.message);
//   console.error('Stack:', err.stack);
// }
