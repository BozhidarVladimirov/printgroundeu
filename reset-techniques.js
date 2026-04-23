const fs = require('fs');

const productsFile = './src/data/products-imported.ts';
let content = fs.readFileSync(productsFile, 'utf8');

const lines = content.split('\n');
let inTechniques = false;
let techniquesStart = -1;
let braceCount = 0;
let updated = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  if (line.includes('"availableTechniques"')) {
    inTechniques = true;
    techniquesStart = i;
    braceCount = 0;

    for (let j = 0; j < line.length; j++) {
      if (line[j] === '[') braceCount++;
      if (line[j] === ']') braceCount--;
    }

    if (braceCount === 0 && line.includes(']')) {
      inTechniques = false;
      const newLine = line.replace(/\[.*\]/, '[\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]');
      lines[i] = newLine;
      updated++;
      continue;
    }
    continue;
  }

  if (inTechniques) {
    for (let j = 0; j < line.length; j++) {
      if (line[j] === '[') braceCount++;
      if (line[j] === ']') braceCount--;
    }

    if (braceCount <= 0 && line.includes(']')) {
      inTechniques = false;
      lines[i] = '\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t]';
      updated++;
    } else {
      lines[i] = '';
    }
  }
}

console.log('Updated', updated, 'products');
fs.writeFileSync(productsFile, lines.join('\n'));
console.log('Done!');