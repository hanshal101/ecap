const https = require('https');

const data = JSON.stringify({
  aws_key: 'AKIA1234567890ABCDEF',
});

const options = {
  hostname: 'httpbin.org',
  path: '/post',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': data.length,
  },
};

const req = https.request(options, (res) => {
  let body = '';

  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    console.log(JSON.parse(body));
  });
});

req.on('error', console.error);
req.write(data);
req.end();
