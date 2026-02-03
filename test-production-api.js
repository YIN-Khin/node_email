// Simple test to verify production API is working
const https = require('https');

const PRODUCTION_URL = 'https://backend-production-8eb72.up.railway.app';

async function testAPI(endpoint, description) {
  return new Promise((resolve) => {
    const url = `${PRODUCTION_URL}${endpoint}`;
    console.log(`🔍 Testing: ${description}`);
    console.log(`   URL: ${url}`);
    
    const req = https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log(`   ✅ Success: ${res.statusCode}`);
          try {
            const json = JSON.parse(data);
            if (json.data && Array.isArray(json.data)) {
              console.log(`   📊 Data: ${json.data.length} items`);
            } else if (json.status) {
              console.log(`   📊 Status: ${json.status}`);
            }
          } catch (e) {
            console.log(`   📊 Response: ${data.substring(0, 100)}...`);
          }
        } else {
          console.log(`   ❌ Error: ${res.statusCode}`);
          console.log(`   📊 Response: ${data.substring(0, 200)}`);
        }
        resolve();
      });
    });
    
    req.on('error', (error) => {
      console.log(`   ❌ Network Error: ${error.message}`);
      resolve();
    });
    
    req.setTimeout(10000, () => {
      console.log(`   ⏰ Timeout`);
      req.destroy();
      resolve();
    });
  });
}

async function runTests() {
  console.log('🚀 Testing Production API...\n');
  
  await testAPI('/api/health', 'Health Check');
  console.log('');
  
  // Note: These endpoints require authentication, so they'll return 401
  // But if they return 401 instead of 500, it means the models are loaded correctly
  await testAPI('/api/staff', 'Staff API (expects 401 - Unauthorized)');
  console.log('');
  
  await testAPI('/api/products', 'Products API (expects 401 - Unauthorized)');
  console.log('');
  
  await testAPI('/api/brands', 'Brands API (expects 401 - Unauthorized)');
  console.log('');
  
  console.log('🎉 Production API test completed!');
  console.log('');
  console.log('📋 Expected Results:');
  console.log('   ✅ Health Check: 200 OK');
  console.log('   ✅ Protected APIs: 401 Unauthorized (not 500 Internal Server Error)');
  console.log('   ❌ If you see 500 errors, models are not loading correctly');
}

runTests();