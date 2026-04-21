const fs = require('fs');

const techniquesJson = fs.readFileSync('./techniques-result.json', 'utf8');
const techniquesData = JSON.parse(techniquesJson);

const productsFile = './src/data/products-imported.ts';
let productsContent = fs.readFileSync(productsFile, 'utf8');

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
};

function normalizeTechnique(tech) {
  return techniqueMapping[tech] || tech;
}

function getBaseSku(sku) {
  const dashIndex = sku.indexOf('-');
  return dashIndex > 0 ? sku.substring(0, dashIndex) : sku;
}

const baseSkuToTechniques = {};
for (const [fullSku, techs] of Object.entries(techniquesData)) {
  const baseSku = getBaseSku(fullSku);
  if (!baseSkuToTechniques[baseSku]) {
    baseSkuToTechniques[baseSku] = new Set();
  }
  techs.forEach(t => {
    if (typeof t === 'string') {
      t.split(',').forEach(s => {
        const trimmed = s.trim();
        if (trimmed) {
          const normalized = normalizeTechnique(trimmed);
          if (normalized) baseSkuToTechniques[baseSku].add(normalized);
        }
      });
    }
  });
}

Object.keys(baseSkuToTechniques).forEach(sku => {
  baseSkuToTechniques[sku] = Array.from(baseSkuToTechniques[sku]);
});

console.log('Sample baseSkuToTechniques:');
console.log('11031:', baseSkuToTechniques['11031']);

const skuRegex = /"sku": "(\d+)"/g;
let match;
const skuPositions = [];

while ((match = skuRegex.exec(productsContent)) !== null) {
  skuPositions.push({
    sku: match[1],
    index: match.index
  });
}

console.log('Total SKUs found:', skuPositions.length);
console.log('First 5 SKUs:', skuPositions.slice(0, 5).map(s => s.sku));

let updateCount = 0;

for (const { sku, index } of skuPositions) {
  const techniques = baseSkuToTechniques[sku];

  if (techniques && techniques.length > 0) {
    const techBlockStart = productsContent.indexOf('"availableTechniques": [', index);
    if (techBlockStart === -1 || techBlockStart > index + 5000) continue;

    const techBlockEnd = productsContent.indexOf(']', techBlockStart);
    if (techBlockEnd === -1) continue;

    const oldTechBlock = productsContent.substring(techBlockStart, techBlockEnd + 1);
    const newTechBlock = `"availableTechniques": [\n\t\t\t\t\t${techniques.map(t => `"${t}"`).join(',\n\t\t\t\t\t')}\n\t\t\t\t]`;

    productsContent = productsContent.replace(oldTechBlock, newTechBlock);
    updateCount++;
  }
}

console.log('Updated:', updateCount, 'products');

fs.writeFileSync(productsFile, productsContent);
console.log('Done!');