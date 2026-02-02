const mysql = require('mysql2/promise');

async function runPhotoMigration() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'ecommerce'
  });

  try {
    console.log('🔄 Running photo field migration...');
    
    // Check current photo field type
    const [currentSchema] = await connection.execute('DESCRIBE staffs');
    const photoField = currentSchema.find(field => field.Field === 'photo');
    console.log('📋 Current photo field:', photoField);
    
    // Update photo field to LONGTEXT
    await connection.execute('ALTER TABLE staffs MODIFY COLUMN photo LONGTEXT');
    console.log('✅ Photo field updated to LONGTEXT');
    
    // Verify the change
    const [newSchema] = await connection.execute('DESCRIBE staffs');
    const newPhotoField = newSchema.find(field => field.Field === 'photo');
    console.log('📋 New photo field:', newPhotoField);
    
    console.log('🎉 Migration completed successfully!');
  } catch (error) {
    console.error('❌ Migration failed:', error);
  } finally {
    await connection.end();
  }
}

runPhotoMigration();