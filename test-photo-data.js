const db = require('./src/config/db');

async function testPhotoData() {
  try {
    console.log('🔍 Testing photo data...');
    
    // Get staff with photos
    const staff = await db.Staff.findAll({
      where: {
        photo: {
          [db.Sequelize.Op.not]: null
        }
      },
      limit: 3
    });
    
    console.log(`📊 Found ${staff.length} staff with photos`);
    
    staff.forEach((s, index) => {
      console.log(`\n📸 Staff ${index + 1}: ${s.name}`);
      console.log(`   Photo length: ${s.photo?.length || 0}`);
      console.log(`   Photo start: ${s.photo?.substring(0, 50)}...`);
      console.log(`   Has data prefix: ${s.photo?.startsWith('data:')}`);
      
      if (s.photo && s.photo.length < 1000) {
        console.log(`   ⚠️  Photo seems truncated (only ${s.photo.length} chars)`);
      } else if (s.photo && s.photo.length > 1000) {
        console.log(`   ✅ Photo seems complete (${s.photo.length} chars)`);
      }
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    process.exit(0);
  }
}

testPhotoData();