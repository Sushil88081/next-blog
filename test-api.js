// Test script to verify API is working
require('dotenv').config({ path: '.env.local' });

async function testAPI() {
  console.log('Testing comment API...\n');
  
  const testComment = {
    post_slug: 'react-introduction',
    name: 'Test User',
    email: 'test@example.com',
    comment: 'This is a test comment to verify the API is working correctly.'
  };

  try {
    // Test POST
    console.log('1. Testing POST /api/routes');
    const postResponse = await fetch('http://localhost:3000/api/routes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(testComment)
    });

    const postData = await postResponse.json();
    console.log('Response status:', postResponse.status);
    console.log('Response data:', JSON.stringify(postData, null, 2));
    
    if (postResponse.ok && postData.success) {
      console.log('✅ POST successful! Comment ID:', postData.comment?.id);
    } else {
      console.log('❌ POST failed:', postData.error);
    }

    console.log('\n2. Testing GET /api/routes?slug=react-introduction');
    const getResponse = await fetch('http://localhost:3000/api/routes?slug=react-introduction');
    const getData = await getResponse.json();
    console.log('Response status:', getResponse.status);
    console.log('Comments found:', Array.isArray(getData) ? getData.length : 0);
    if (Array.isArray(getData) && getData.length > 0) {
      console.log('Sample comment:', {
        id: getData[0].id,
        name: getData[0].name,
        status: getData[0].status
      });
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\nMake sure the dev server is running: npm run dev');
  }
}

testAPI();

