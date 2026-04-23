const fs = require('fs');
const content = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/src/data/products-imported.ts', 'utf8');

// Find the rawProducts section
const startIdx = content.indexOf('const rawProducts = [');
const endIdx = content.indexOf('\n]\n\n'); // Find the end of the array

console.log('Start index:', startIdx);
console.log('End index:', endIdx);

if (startIdx === -1 || endIdx === -1) {
    console.log('Could not find rawProducts boundaries');
    process.exit(1);
}

const rawProductsStr = content.substring(startIdx, endIdx + 2);
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

// Extract products that DO have brandingZones (non-empty)
const withBrandingRegex = /"sku":\s*"([^"]+)"[\s\S]*?"brandingZones":\s*\[[\s\S]*?\]/g;
const skusWithBranding = [];
let match3;
while ((match3 = withBrandingRegex.exec(rawProductsStr)) !== null && skusWithBranding.length < 15) {
    // Extract the brandingZones part to verify it's not empty
    const productSection = match3[0];
    if (productSection.includes('"brandingZones": []')) {
        continue; // Skip empty ones
    }
    skusWithBranding.push(match3[1]);
}
console.log('\nSample SKUs WITH brandingZones (non-empty):');
skusWithBranding.forEach(s => console.log(' ', s));

// Let's also look for unique technique values
console.log('\n=== Looking for common technique patterns ===');
const techPattern = /"availableTechniques":\s*\[([\s\S]*?)\]/g;
const allTechniques = [];
let techMatch;
while ((techMatch = techPattern.exec(rawProductsStr)) !== null) {
    const techSection = techMatch[1];
    const individualTechs = techSection.match(/"([^"]+)"/g) || [];
    individualTechs.forEach(t => {
        const cleanTech = t.replace(/"/g, '').trim();
        if (cleanTech) allTechniques.push(cleanTech);
    });
}
const techCounts = {};
allTechniques.forEach(t => {
    techCounts[t] = (techCounts[t] || 0) + 1;
});
console.log('Technique value counts:');
Object.entries(techCounts).forEach(([tech, count]) => {
    console.log(`  ${tech}: ${count}`);
});
