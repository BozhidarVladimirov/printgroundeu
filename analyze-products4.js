const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/src/data/products-imported.ts', 'utf8');

// Find the rawProducts section
const startIdx = content.indexOf('const rawProducts = [');
if (startIdx === -1) {
    console.log('Could not find rawProducts');
    process.exit(1);
}

// Find the ending ] that's followed by newline and export
const endRegex = /\](\n\s*)/;
const searchContent = content.substring(startIdx);
const endMatch = searchContent.match(endRegex);

if (!endMatch) {
    console.log('Could not find end of rawProducts');
    process.exit(1);
}

const endIdx = startIdx + searchContent.indexOf(']') + 1;
const rawProductsStr = content.substring(startIdx, endIdx);

console.log('rawProducts string length:', rawProductsStr.length);

// Count products
const productCount = (rawProductsStr.match(/"id":\s*"[^"]+"/g) || []).length;
console.log('Product count:', productCount);

// Find empty brandingZones
const emptyBrandingZones = (rawProductsStr.match(/"brandingZones":\s*\[\]/g) || []).length;
console.log('Products with empty brandingZones:', emptyBrandingZones);

// Find empty availableTechniques
const emptyTechniques = (rawProductsStr.match(/"availableTechniques":\s*\[\]/g) || []).length;
console.log('Products with empty availableTechniques:', emptyTechniques);

// Find products with techniques
const withTechniques = (rawProductsStr.match(/"availableTechniques":\s*\[/g) || []).length;
console.log('Products with availableTechniques:', withTechniques);

// Extract SKUs with empty brandingZones AND empty techniques
const skuWithEmptyTechRegex = /"sku":\s*"([^"]+)"[\s\S]*?"brandingZones":\s*\[\][\s\S]*?"availableTechniques":\s*\[\]/g;
const skusWithEmptyTech = [];
let match;
while ((match = skuWithEmptyTechRegex.exec(rawProductsStr)) !== null && skusWithEmptyTech.length < 30) {
    skusWithEmptyTech.push(match[1]);
}
console.log('\nSample SKUs with empty brandingZones AND empty techniques:');
skusWithEmptyTech.forEach(s => console.log(' ', s));

// Count total products with empty brandingZones (regardless of techniques)
const emptyBrandingAll = (rawProductsStr.match(/"brandingZones":\s*\[\]/g) || []).length;
console.log('\nTotal with empty brandingZones:', emptyBrandingAll);

// Now let's also look at the CSV to understand which products from CSV are NOT in products-imported
console.log('\n\n=== COMPARING CSV TO products-imported.ts ===');
