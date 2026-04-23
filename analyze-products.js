const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/src/data/products-imported.ts', 'utf8');

// Count products
const productMatches = content.match(/{\s*id:/g);
console.log('Total products:', productMatches ? productMatches.length : 0);

// Find products with empty brandingZones
const emptyBrandingZones = content.match(/brandingZones:\s*\[\]/g);
console.log('Products with empty brandingZones:', emptyBrandingZones ? emptyBrandingZones.length : 0);

// Find products with empty availableTechniques  
const emptyTechniques = content.match(/availableTechniques:\s*\[\]/g);
console.log('Products with empty availableTechniques:', emptyTechniques ? emptyTechniques.length : 0);

// Find products with actual techniques
const withTechniques = content.match(/availableTechniques:\s*\[/g);
console.log('Products with availableTechniques array:', withTechniques ? withTechniques.length : 0);

// Extract sample SKUs with empty techniques
const regex = /sku:\s*["']([^"']+)["'][\s\S]*?availableTechniques:\s*\[\]/g;
const matches = [];
let match;
while ((match = regex.exec(content)) !== null && matches.length < 30) {
    matches.push(match[1]);
}
console.log('\nSample SKUs with empty techniques:');
matches.forEach(s => console.log(' ', s));

// Find products WITH techniques - extract first 20 SKUs
const regexWithTech = /sku:\s*["']([^"']+)["'][\s\S]*?availableTechniques:\s*\[([^\]]+)\]/g;
const withTechMatches = [];
let match2;
while ((match2 = regexWithTech.exec(content)) !== null && withTechMatches.length < 20) {
    withTechMatches.push({ sku: match2[1], techniques: match2[2] });
}
console.log('\nSample SKUs WITH techniques:');
withTechMatches.forEach(m => console.log(`  ${m.sku}: ${m.techniques.substring(0, 60)}...`));

// Count products with brandingZones
const withBrandingZones = content.match(/brandingZones:\s*\[[\s\S]*?\]/g);
console.log('\nProducts with brandingZones:', withBrandingZones ? withBrandingZones.length : 0);
