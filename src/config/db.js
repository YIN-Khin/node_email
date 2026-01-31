
// const { Sequelize } = require("sequelize");

// const sequelize = new Sequelize("ecommerce", "root", "", {
//   host: "localhost",
//   dialect: "mysql",
//   port: 3306,
//   logging: false, 
// });

// module.exports = sequelize;


// test-connection.js
require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  console.log('🔍 Testing Railway MySQL connection...\n');
  
  const config = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
  };
  
  console.log('Configuration:');
  console.log('  Host:', config.host);
  console.log('  Port:', config.port);
  console.log('  User:', config.user);
  console.log('  Database:', config.database);
  console.log('  Password:', config.password ? '***' + config.password.slice(-4) : 'NOT SET');
  console.log('');
  
  try {
    const connection = await mysql.createConnection(config);
    console.log('✅ Connection successful!\n');
    
    // Test query
    const [rows] = await connection.execute('SELECT DATABASE() as db, VERSION() as version, NOW() as current_time');
    console.log('Database Info:');
    console.log('  Current Database:', rows[0].db);
    console.log('  MySQL Version:', rows[0].version);
    console.log('  Server Time:', rows[0].current_time);
    console.log('');
    
    // List tables
    const [tables] = await connection.execute('SHOW TABLES');
    console.log('📋 Tables in database:');
    if (tables.length === 0) {
      console.log('  No tables found');
    } else {
      tables.forEach((table, index) => {
        console.log(`  ${index + 1}. ${Object.values(table)[0]}`);
      });
    }
    
    await connection.end();
    console.log('\n✅ Test completed successfully!');
    
  } catch (error) {
    console.error('❌ Connection failed!');
    console.error('Error:', error.message);
    console.error('Code:', error.code);
    
    if (error.code === 'ECONNREFUSED') {
      console.error('\n💡 Tip: The database server refused the connection. Check if:');
      console.error('   - The host and port are correct');
      console.error('   - Railway MySQL service is running');
      console.error('   - Your IP is not blocked by Railway');
    } else if (error.code === 'ER_ACCESS_DENIED_ERROR') {
      console.error('\n💡 Tip: Access denied. Check if:');
      console.error('   - Username is correct');
      console.error('   - Password is correct');
      console.error('   - User has permissions for this database');
    } else if (error.code === 'ENOTFOUND') {
      console.error('\n💡 Tip: Host not found. Check if:');
      console.error('   - DB_HOST is correctly set in .env');
      console.error('   - You have internet connection');
      console.error('   - The Railway proxy URL is correct');
    }
  }
}

testConnection();