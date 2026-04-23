const fs = require('fs');

const techniquesJson = fs.readFileSync('./correct-techniques.json', 'utf8');
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

console.log('Total base SKUs with techniques:', Object.keys(baseSkuToTechniques).length);

let productsUpdated = 0;
let productsWithoutTech = 0;

const productBlockRegex = /\{\s*\n\s*\{\s*"id":\s*"pg-(\d+)"[\s\S]*?"availableTechniques":\s*\[[\s\S]*?\]\s*,/g;
let match;
const updates = [];

while ((match = productBlockRegex.exec(productsContent)) !== null) {
  const sku = match[1];
  const fullMatch = match[0];
  const techniques = baseSkuToTechniques[sku];

  if (techniques && techniques.length > 0) {
    const techArrayStr = techniques.map(t => `\t\t\t\t\t"${t}"`).join(',\n');
    const newBlock = fullMatch.replace(
      /"availableTechniques":\s*\[[\s\S]*?\]\s*,/,
      `"availableTechniques": [\n\t\t\t\t\t${techArrayStr}\n\t\t\t\t],`
    );
    updates.push({ offset: match.index, length: fullMatch.length, newBlock });
  }
}

console.log('Products to update:', updates.length);

for (let i = updates.length - 1; i >= 0; i--) {
  const { offset, length, newBlock } = updates[i];
  productsContent = productsContent.substring(0, offset) + newBlock + productsContent.substring(offset + length);
  productsUpdated++;
}

const remainingEmptyTech = (productsContent.match(/"availableTechniques": \[\s*\]/g) || []).length;
console.log('Updated:', productsUpdated, 'products');
console.log('Products still without techniques:', remainingEmptyTech);

fs.writeFileSync(productsFile, productsContent);
console.log('Done!');