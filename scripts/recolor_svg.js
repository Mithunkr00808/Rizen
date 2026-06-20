import fs from 'fs';
let svg = fs.readFileSync('public/nurburgring.svg', 'utf-8');
svg = svg.replace(/fill="#[A-Fa-f0-9]{6}"/g, 'fill="#00ffcc"');
fs.writeFileSync('public/nurburgring.svg', svg);
console.log('Recolored all fills to #00ffcc');
