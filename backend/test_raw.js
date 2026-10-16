import https from 'https';

const key = 'AIzaSyBf-DPNzMfbH_htUuQklqpIVsvjzgJ388U';
const data = JSON.stringify({
  contents: [{ parts: [{ text: 'Hello' }] }]
});

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1/models/gemini-1.5-flash:generateContent?key=${key}`,
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length
  }
};

const req = https.request(options, res => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    console.log('Status:', res.statusCode);
    console.log('Body:', body);
  });
});

req.on('error', e => console.error(e));
req.write(data);
req.end();
