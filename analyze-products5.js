const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/src/data/products-imported.ts', 'utf8');

// Find the rawProducts section boundaries
const startIdx = content.indexOf('const rawProducts = [');
const exportPhrase = 'export { rawProducts as products }';
const exportIdx = content.indexOf(exportPhrase);

// Find the ] just before the export
let lastBracket = -1;
for (let i = exportIdx - 1; i > startIdx; i--) {
    if (content[i] === ']') {
        lastBracket = i;
        break;
    }
}

const rawProductsStr = content.substring(startIdx, lastBracket + 1);

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

// Extract SKUs with empty brandingZones only (but WITH techniques)
const skuWithEmptyBrandingOnly = /"sku":\s*"([^"]+)"[\s\S]*?"brandingZones":\s*\[\][\s\S]*?"availableTechniques":\s*\[/g;
const skusEmptyBrandingOnly = [];
let match2;
while ((match2 = skuWithEmptyBrandingOnly.exec(rawProductsStr)) !== null && skusEmptyBrandingOnly.length < 20) {
    skusEmptyBrandingOnly.push(match2[1]);
}
console.log('\nSample SKUs with empty brandingZones but WITH techniques:');
skusEmptyBrandingOnly.forEach(s => console.log(' ', s));

// Now let's look for products that have actual brandingZones (non-empty)
const withBrandingRegex = /"brandingZones":\s*\[[\s\S]*?id":\s*"[^"]+"/g;
const productsWithBranding = [];
let match3;
while ((match3 = withBrandingRegex.exec(rawProductsStr)) !== null) {
    productsWithBranding.push(match3[0].substring(0, 100));
}
console.log('\nProducts WITH brandingZones (first 5):');
productsWithBranding.slice(0, 5).forEach(p => console.log(' ', p));
console.log('Total products with brandingZones:', productsWithBranding.length);
