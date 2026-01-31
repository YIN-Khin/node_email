// const db = require('./src/models');
// const { Notification, Product } = db;

// async function createExpireNotifications() {
//   try {
//     console.log('Creating expire_date notifications...');
    
//     // Get products with expire_date
//     const products = await Product.findAll({
//       where: {
//         expire_date: {
//           [db.Sequelize.Op.not]: null
//         }
//       },
//       limit: 5
//     });
    
//     console.log('Found products with expire_date:', products.length);
    
//     // Create notifications for expiring products
//     for (const product of products) {
//       const expireDate = new Date(product.expire_date);
//       const today = new Date();
//       const diffTime = expireDate - today;
//       const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
//       let title, message;
//       if (diffDays < 0) {
//         title = 'ផលិតផលផុតកំណត់ - Product Expired';
//         message = `ផលិតផល "${product.name}" បានផុតកំណត់ហើយ។ សូមពិនិត្យ និងដកចេញ។`;
//       } else if (diffDays <= 7) {
//         title = 'ផលិតផលជិតផុតកំណត់ - Product Expiring Soon';
//         message = `ផលិតផល "${product.name}" នឹងផុតកំណត់ក្នុងរយៈពេល ${diffDays} ថ្ងៃទៀត។`;
//       } else {
//         title = 'ការជូនដំណឹងផុតកំណត់ - Expiration Notice';
//         message = `ផលិតផល "${product.name}" នឹងផុតកំណត់នៅថ្ងៃទី ${expireDate.toLocaleDateString('km-KH')}។`;
//       }
      
//       // Create notification
//       await Notification.create({
//         type: 'low_stock', // Use low_stock type so it shows in the UI
//         title: title,
//         message: message,
//         reference_id: product.id,
//         is_read: false
//       });
      
//       console.log(`Created notification for ${product.name} (expires: ${expireDate.toLocaleDateString()}, ${diffDays} days)`);
//     }
    
//     console.log('✅ Expire notifications created successfully!');
    
//     // Test the result
//     console.log('\nTesting notifications with Product data...');
//     const testNotifications = await Notification.findAll({
//       limit: 5,
//       include: [
//         {
//           model: Product,
//           as: 'Product',
//           attributes: ['id', 'name', 'expire_date'],
//           required: false
//         }
//       ],
//       order: [['created_at', 'DESC']]
//     });
    
//     testNotifications.forEach((notification, index) => {
//       console.log(`\nNotification ${index + 1}:`);
//       console.log('- Title:', notification.title);
//       console.log('- Type:', notification.type);
//       console.log('- Product:', notification.Product ? {
//         name: notification.Product.name,
//         expire_date: notification.Product.expire_date
//       } : 'No Product');
//     });
    
//   } catch (error) {
//     console.error('Error:', error.message);
//   }
//   process.exit(0);
// }

// createExpireNotifications();