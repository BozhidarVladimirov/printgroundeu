const fs = require('fs');
let c = fs.readFileSync('src/data/products-imported.ts', 'utf8');
c = c.replace(/"availableTechniques": \[\],,/g, '"availableTechniques": [],');
fs.writeFileSync('src/data/products-imported.ts', c);
console.log('Fixed double commas');