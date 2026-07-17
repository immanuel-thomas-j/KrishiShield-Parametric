const fs = require('fs');
const content = fs.readFileSync('d:/Downloads/Backup 2/frontend/src/pages/Dashboard.jsx', 'utf8');
const lines = content.split('\n');
lines.forEach((line, idx) => {
  if (line.toLowerCase().includes('polygon')) {
    console.log(`Line ${idx + 1}: ${line.trim()}`);
  }
});
