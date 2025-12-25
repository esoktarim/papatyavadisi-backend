import http from 'http';

// Test data
const postData = JSON.stringify({
    project: 'Test Project',
    name: 'Test User',
    phone: '5551234567',
    email: 'test@example.com',
    message: 'This is a test message',
    profession: 'Mühendis',
    language: 'tr'
});

const options = {
    hostname: 'localhost',
    port: 3001,
    path: '/api/contact',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(postData)
    }
};

console.log('Sending test request to API...');

const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });

    res.on('end', () => {
        console.log('No more data in response.');
    });
});

req.on('error', (e) => {
    console.error(`Problem with request: ${e.message}`);
});

// Write data to request body
req.write(postData);
req.end();
