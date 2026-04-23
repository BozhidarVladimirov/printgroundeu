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

const lines = productsContent.split('\n');
let currentSku = null;
let inTechniquesBlock = false;
let techniquesStartLine = -1;
let updatedCount = 0;
let notFoundCount = 0;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];

  const skuMatch = line.match(/"sku":\s*"(\d+)"/);
  if (skuMatch) {
    currentSku = skuMatch[1];
  }

  if (currentSku && line.match(/"availableTechniques":\s*\[/)) {
    techniquesStartLine = i;
    inTechniquesBlock = true;
  }

  if (inTechniquesBlock && line.includes(']')) {
    const techs = baseSkuToTechniques[currentSku];
    if (techs && techs.length > 0) {
      const newLines = [];
      newLines.push(line.replace(/.*"availableTechniques":\s*\[/, '\t\t\t\t"availableTechniques": ['));
      for (const tech of techs) {
        newLines.push(`\t\t\t\t\t"${tech}",`);
      }
      newLines.push('\t\t\t\t],');

      lines.splice(techniquesStartLine, i - techniquesStartLine + 1, ...newLines);
      i = techniquesStartLine + newLines.length - 1;
      updatedCount++;
    } else {
      notFoundCount++;
    }
    inTechniquesBlock = false;
    currentSku = null;
  }
}

console.log('Updated:', updatedCount, 'products');
console.log('Products without techniques in CSV:', notFoundCount);

fs.writeFileSync(productsFile, lines.join('\n'));
console.log('Done!');