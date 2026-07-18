const http = require('http');

const data = JSON.stringify({
  restaurantName: 'Test Restaurant',
  ownerEmail: 'owner@test.com',
  ownerPassword: 'secret123',
  branchName: 'Main Branch'
});

const req = http.request({
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/register-owner',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
}, (res) => {
  console.log('status', res.statusCode);
  let body = '';
  res.setEncoding('utf8');
  res.on('data', chunk => body += chunk);
  res.on('end', () => console.log(body));
});

req.on('error', (err) => {
  console.error(err);
  process.exit(1);
});

req.write(data);
req.end();


