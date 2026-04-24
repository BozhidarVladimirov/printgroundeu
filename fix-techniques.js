const fs = require('fs');
let content = fs.readFileSync('src/data/products-imported.ts', 'utf8');

let count = 0;
const regex = /"availableTechniques": \[\s+\]/g;
const matches = content.match(regex);
if (matches) {
  count = matches.length;
  console.log('Found', count, 'empty availableTechniques arrays');
}

// Replace all empty arrays with proper empty array
content = content.replace(/"availableTechniques": \[\s+\]/g, '"availableTechniques": []');

fs.writeFileSync('src/data/products-imported.ts', content);
console.log('Fixed all', count, 'occurrences!');