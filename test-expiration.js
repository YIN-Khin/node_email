// Test script for expiration notifications
const express = require('express');
const cors = require('cors');
const db = require('./src/models');
const expirationChecker = require('./src/jobs/expirationChecker');
const NotificationService = require('./src/services/notificationService');

const app = express();
app.use(cors());
app.use(express.json());

async function testExpirationSystem() {
  try {
    console.log('🧪 Testing Expiration Notification System...');
    
    // Test database connection
    await db.sequelize.authenticate();
    console.log('✅ Database connected');
    
    // Sync database
    await db.sequelize.sync({ alter: false });
    console.log('✅ Database synced');
    
    // Create test notifications
    console.log('📝 Creating sample expiration notifications...');
    
    const notifications = [];
    
    // Create expiring_soon notification
    const expiringSoon = await NotificationService.createNotification({
      type: 'expiring_soon',
      title: 'ផលិតផលជិតផុតកំណត់ - Product Expiring Soon',
      message: 'ផលិតផល "Test Product 1" នឹងផុតកំណត់ក្នុងរយៈពេល 7 ថ្ងៃទៀត។',
      referenceId: 2
    });
    notifications.push(expiringSoon);
    console.log('✅ Created expiring_soon notification');
    
    // Create expiring_today notification
    const expiringToday = await NotificationService.createNotification({
      type: 'expiring_today',
      title: 'ផលិតផលផុតកំណត់ថ្ងៃនេះ - Product Expires Today',
      message: 'ផលិតផល "Test Product 2" ផុតកំណត់ថ្ងៃនេះ! សូមពិនិត្យមុនពេលប្រើប្រាស់។',
      referenceId: 3
    });
    notifications.push(expiringToday);
    console.log('✅ Created expiring_today notification');
    
    // Create expired notification
    const expired = await NotificationService.createNotification({
      type: 'expired',
      title: 'ផលិតផលបានផុតកំណត់ - Product Expired',
      message: 'ផលិតផល "Test Product 3" បានផុតកំណត់ 2 ថ្ងៃហើយ! សូមយកចេញពីស្តុក។',
      referenceId: 4
    });
    notifications.push(expired);
    console.log('✅ Created expired notification');
    
    // Test retrieval
    console.log('📋 Testing notification retrieval...');
    const allNotifications = await NotificationService.getRecentNotifications(10);
    console.log(`✅ Retrieved ${allNotifications.length} notifications`);
    
    // Show recent expiration notifications
    const expirationNotifications = allNotifications.filter(n => 
      ['expiring_soon', 'expiring_today', 'expired'].includes(n.type)
    );
    
    console.log(`\n📅 Found ${expirationNotifications.length} expiration notifications:`);
    expirationNotifications.forEach(notification => {
      console.log(`  - ${notification.type}: ${notification.title}`);
      if (notification.Product) {
        console.log(`    Product: ${notification.Product.name} (expires: ${notification.Product.expire_date})`);
      }
    });
    
    console.log('\n✅ Expiration notification system test completed successfully!');
    console.log('\n🎯 Next steps:');
    console.log('   1. Start the server: node minimal-main-server.js');
    console.log('   2. Test API: GET http://localhost:3001/api/notifications');
    console.log('   3. Create sample notifications: POST http://localhost:3001/api/notifications/samples/create');
    console.log('   4. Check expiration notifications in the frontend');
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  } finally {
    process.exit(0);
  }
}

testExpirationSystem();