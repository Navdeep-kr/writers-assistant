import https from 'https';

const key = 'AIzaSyBf-DPNzMfbH_htUuQklqpIVsvjzgJ388U';

const options = {
  hostname: 'generativelanguage.googleapis.com',
  path: `/v1beta/models?key=${key}`,
  method: 'GET'
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
req.end();
