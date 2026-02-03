// Debug script to test model loading
const fs = require('fs');
const path = require('path');

console.log('🔍 Debugging model loading...');

const modelsDir = path.join(__dirname, 'src/models');
const modelFiles = fs.readdirSync(modelsDir)
  .filter(file => file.endsWith('.js') && file !== 'index.js');

console.log(`📁 Found ${modelFiles.length} model files:`);
modelFiles.forEach(file => console.log(`   - ${file}`));

console.log('\n🔧 Testing each model file...');

modelFiles.forEach(file => {
  const filePath = path.join(modelsDir, file);
  console.log(`\n📄 Testing: ${file}`);
  
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    
    // Check export pattern
    if (content.includes('module.exports = (sequelize, DataTypes)')) {
      console.log('   ✅ Export pattern: CORRECT');
    } else if (content.includes('module.exports = (sequelize)')) {
      console.log('   ❌ Export pattern: MISSING DataTypes parameter');
    } else {
      console.log('   ⚠️  Export pattern: UNKNOWN');
    }
    
    // Try to require the file
    const modelFactory = require(filePath);
    if (typeof modelFactory === 'function') {
      console.log('   ✅ Module require: SUCCESS (function)');
    } else {
      console.log('   ❌ Module require: NOT A FUNCTION');
    }
    
  } catch (error) {
    console.log(`   ❌ Error: ${error.message}`);
  }
});

console.log('\n🎯 Testing models/index.js...');
try {
  const db = require('./src/models');
  console.log('✅ models/index.js loaded successfully');
  console.log(`📊 Models loaded: ${Object.keys(db).filter(key => key !== 'sequelize' && key !== 'Sequelize').length}`);
  console.log('📋 Model names:', Object.keys(db).filter(key => key !== 'sequelize' && key !== 'Sequelize'));
} catch (error) {
  console.log(`❌ models/index.js error: ${error.message}`);
}