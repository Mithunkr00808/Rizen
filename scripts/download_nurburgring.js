const fs = require('fs');
const https = require('https');

const url = 'https://upload.wikimedia.org/wikipedia/commons/4/45/N%C3%BCrburgring_Nordschleife.svg';

https.get(url, {
  headers: {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
  }
}, (res) => {
  if (res.statusCode !== 200) {
    console.error(`Failed to download SVG: ${res.statusCode}`);
    process.exit(1);
  }
  
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('e:/AntiGravity/Portfolio/public/nurburgring.svg', data);
    console.log('Downloaded successfully');
  });
}).on('error', err => {
  console.error(err);
});
