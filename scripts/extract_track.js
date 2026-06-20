import fs from 'fs';
import https from 'https';

https.get('https://upload.wikimedia.org/wikipedia/commons/4/45/N%C3%BCrburgring_Nordschleife.svg', {
  headers: { 'User-Agent': 'Mozilla/5.0' }
}, res => {
  let d = '';
  res.on('data', c => d+=c);
  res.on('end', () => {
    // Find all paths
    const match = d.match(/<path[^>]*d="([^"]+)"[^>]*>/g);
    if (match) {
      // Find the longest path, which is usually the main track loop
      const longestPath = match.reduce((a,b) => a.length > b.length ? a : b);
      const trackD = longestPath.match(/d="([^"]+)"/)[1];
      
      // Look at the original viewBox to maintain proportions
      const viewBoxMatch = d.match(/viewBox="([^"]+)"/);
      const viewBox = viewBoxMatch ? viewBoxMatch[1] : "0 0 1000 1000";
      
      const cleanSvg = `<svg viewBox="${viewBox}" xmlns="http://www.w3.org/2000/svg">
        <path d="${trackD}" fill="none" stroke="white" stroke-width="15" stroke-linecap="round" stroke-linejoin="round" />
      </svg>`;
      
      fs.writeFileSync('e:/AntiGravity/Portfolio/public/nurburgring.svg', cleanSvg);
      console.log('Extracted and saved!');
    } else {
      console.log('No path found');
    }
  });
});
