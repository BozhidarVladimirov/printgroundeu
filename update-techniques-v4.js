const fs = require('fs');

const techniquesJson = fs.readFileSync('./correct-techniques.json', 'utf8');
const techniquesData = JSON.parse(techniquesJson);

const productsFile = './src/data/products-imported.ts';
const content = fs.readFileSync(productsFile, 'utf8');

const techniqueMapping = {
  'Screen Printing': 'Screen Printing',
  'Digital Printing': 'Digital Printing',
  'Embroidery': 'Embroidery',
  'Textile Printing': 'Screen Printing',
  'Digital UV': 'Digital Printing',
  'Digital Transfer': 'Digital Transfer',
  'Pad Printing': 'Pad Printing',
  'Laser': 'Laser Engraving',
  'Laser Engraving': 'Laser Engraving',
  'DTG - Direct to Garment': 'DTG',
  'Stickers': 'Stickers',
  'Transfer': 'Transfer',
  '3D Embroidery': '3D Embroidery',
  'Rotary Laser': 'Rotary Laser',
  'Cylindrical UV': 'Cylindrical UV',
  'Firing - Low Temperature': 'Firing',
  'Rotary Screen Printing': 'Screen Printing',
};

function normalizeTechnique(tech) {
  return techniqueMapping[tech] || tech;
}

const baseSkuToTechniques = {};
for (const [fullSku, techs] of Object.entries(techniquesData)) {
  const dashIndex = fullSku.indexOf('-');
  const baseSku = dashIndex > 0 ? fullSku.substring(0, dashIndex) : fullSku;

  if (!baseSkuToTechniques[baseSku]) {
    baseSkuToTechniques[baseSku] = new Set();
  }
  techs.forEach(t => {
    if (typeof t === 'string' && t.trim()) {
      const normalized = normalizeTechnique(t.trim());
      if (normalized) baseSkuToTechniques[baseSku].add(normalized);
    }
  });
}

Object.keys(baseSkuToTechniques).forEach(sku => {
  baseSkuToTechniques[sku] = Array.from(baseSkuToTechniques[sku]);
});

console.log('Base SKUs with techniques:', Object.keys(baseSkuToTechniques).length);

const lines = content.split('\n');
let currentSku = null;
let updatedCount = 0;
let skipCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const skuMatch = line.match(/"sku":\s*"(\d+)"/);
  if (skuMatch) {
    currentSku = skuMatch[1];
  }

  if (currentSku && line.includes('"availableTechniques"')) {
    const techs = baseSkuToTechniques[currentSku];
    if (techs && techs.length > 0) {
      let endLine = i + 1;
      while (endLine < lines.length && !lines[endLine].includes(']')) {
        endLine++;
      }

      const newTechLines = [];
      newTechLines.push(line.replace(/\[[\s\S]*$/, '['));
      for (const tech of techs) {
        newTechLines.push(`\t\t\t\t\t"${tech}",`);
      }
      newTechLines.push('\t\t\t\t],');

      lines.splice(i, endLine - i + 1, ...newTechLines);
      i += newTechLines.length - 1;
      updatedCount++;
    } else {
      skipCount++;
    }
    currentSku = null;
  }
}

console.log('Updated:', updatedCount, 'products');
console.log('Skipped (no CSV data):', skipCount, 'products');

fs.writeFileSync(productsFile, lines.join('\n'));
console.log('Done!');