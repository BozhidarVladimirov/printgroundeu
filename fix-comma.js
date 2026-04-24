const fs = require('fs');
let content = fs.readFileSync('src/data/products-imported.ts', 'utf8');
content = content.replace(/"availableTechniques": \[\]/g, '"availableTechniques": [],');
fs.writeFileSync('src/data/products-imported.ts', content);
console.log('Fixed missing commas');