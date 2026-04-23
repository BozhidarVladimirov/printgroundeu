const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/src/data/products-imported.ts', 'utf8');

// Extract rawProducts section
const rawProductsMatch = content.match(/const rawProducts = \[([\s\S]*?)\n\];/);
if (!rawProductsMatch) {
    console.log('Could not find rawProducts array');
    process.exit(1);
}

const rawProductsStr = rawProductsMatch[0];
console.log('rawProducts string length:', rawProductsStr.length);

// Count products by counting '{' at the start of objects
const productCount = (rawProductsStr.match(/{\s*"id"/g) || []).length;
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

// Extract SKUs with empty techniques
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

// Extract products with non-empty brandingZones
const withBrandingZones = /"brandingZones":\s*\[[\s\S]*?\]/g;
const brandingMatch = rawProductsStr.match(withBrandingZones);
console.log('\nProducts with non-empty brandingZones:', brandingMatch ? brandingMatch.length : 0);

// Find products that DO have brandingZones
const withBrandingRegex = /"sku":\s*"([^"]+)"[\s\S]*?"brandingZones":\s*\[[\s\S]*?\]/g;
const skusWithBranding = [];
let match3;
while ((match3 = withBrandingRegex.exec(rawProductsStr)) !== null && skusWithBranding.length < 15) {
    skusWithBranding.push(match3[1]);
}
console.log('\nSample SKUs WITH brandingZones:');
skusWithBranding.forEach(s => console.log(' ', s));
