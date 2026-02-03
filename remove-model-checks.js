const fs = require('fs');
const path = require('path');

console.log('🔄 Removing model validation checks...');

const filesToFix = [
  'src/controllers/UserController.js',
  'src/controllers/productController.js'
];

filesToFix.forEach(filePath => {
  const fullPath = path.join(__dirname, filePath);
  
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    
    // Remove model validation blocks
    content = content.replace(/\s*\/\/ Check if models are loaded[\s\S]*?}\s*}/g, '');
    content = content.replace(/\s*\/\/ Make sure models are loaded[\s\S]*?}\s*/g, '');
    content = content.replace(/\s*if \(!User\) \{[\s\S]*?}\s*/g, '');
    content = content.replace(/\s*if \(!Role\) \{[\s\S]*?}\s*/g, '');
    content = content.replace(/\s*if \(!Product\) \{[\s\S]*?}\s*/g, '');
    content = content.replace(/\s*if \(!Brand\) \{[\s\S]*?}\s*/g, '');
    content = content.replace(/\s*if \(!Category\) \{[\s\S]*?}\s*/g, '');
    content = content.replace(/\s*if \(!Supplier\) \{[\s\S]*?}\s*/g, '');
    
    // Remove console.error statements about models
    content = content.replace(/\s*console\.error\(['"].*model.*not.*loaded.*['"]\);\s*/g, '');
    
    // Remove return statements for model validation errors
    content = content.replace(/\s*return res\.status\(500\)\.json\(\{\s*success: false,\s*message: ['"]Models not properly loaded['"],[\s\S]*?\}\);\s*/g, '');
    content = content.replace(/\s*return res\.status\(500\)\.json\(\{\s*message: ['"]Server configuration error.*['"]\s*\}\);\s*/g, '');
    
    fs.writeFileSync(fullPath, content);
    console.log(`✅ Fixed: ${filePath}`);
  } else {
    console.log(`❌ Not found: ${filePath}`);
  }
});

console.log('🎉 Model validation checks removed!');