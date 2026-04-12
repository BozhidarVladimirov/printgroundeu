const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../../wc-product-export-30-3-2026-1774877107115.csv');

console.log('Reading CSV file...');
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');

console.log(`Total lines: ${lines.length}`);

// Parse header to find column indices
const header = lines[0].split(',');
console.log('\nLooking for column indices...');

// Find relevant columns
let skuIndex = -1;
let imagesIndex = -1;

for (let i = 0; i < header.length; i++) {
    const col = header[i].toLowerCase().replace(/[^\x00-\x7F]/g, '');
    if (col.includes('code') || col.includes('sku')) {
        skuIndex = i;
    }
    if (col.includes('image') || col.includes('url')) {
        if (imagesIndex === -1) imagesIndex = i;
    }
}

console.log(`SKU column index: ${skuIndex}`);
console.log(`Images column index: ${imagesIndex}`);

// Extract unique color codes from image URLs
const colorCodes = new Map(); // colorCode -> Set of productCodes using it

lines.forEach((line, idx) => {
    if (idx === 0 || !line.trim()) return;
    
    // Simple comma split (basic CSV parsing)
    const cols = line.split(',');
    const sku = cols[skuIndex] || '';
    
    // Extract color codes from image URLs in column 33 (images)
    const imagesCol = cols[33] || '';
    
    // Extract color code from SKU (format: 11031-106)
    const skuMatch = sku.match(/^(\d+)-(\d+)$/);
    if (skuMatch) {
        const productCode = skuMatch[1];
        const colorCode = skuMatch[2];
        
        if (!colorCodes.has(colorCode)) {
            colorCodes.set(colorCode, { products: new Set(), count: 0 });
        }
        colorCodes.get(colorCode).products.add(productCode);
        colorCodes.get(colorCode).count++;
    }
    
    // Also extract from image URLs directly
    const imgMatches = imagesCol.match(/\/(\d+)_(\d+)\./g);
    if (imgMatches) {
        imgMatches.forEach(match => {
            const match2 = match.match(/\/(\d+)_(\d+)\./);
            if (match2) {
                const productCode = match2[1];
                const colorCode = match2[2];
                
                if (!colorCodes.has(colorCode)) {
                    colorCodes.set(colorCode, { products: new Set(), count: 0 });
                }
                colorCodes.get(colorCode).products.add(productCode);
            }
        });
    }
});

console.log('\n=== COLOR CODE STATS ===');
console.log(`Total unique color codes: ${colorCodes.size}`);

// Sort by frequency
const sortedColors = Array.from(colorCodes.entries())
    .map(([code, data]) => ({ code, count: data.count, products: data.products.size }))
    .sort((a, b) => b.count - a.count);

console.log('\nTop 50 color codes by frequency:');
sortedColors.slice(0, 50).forEach(c => {
    console.log(`  ${c.code}: ${c.count} variations, ${c.products.size} unique products`);
});

// Export color codes for manual mapping
console.log('\n=== ALL COLOR CODES FOR MAPPING ===');
const allCodes = Array.from(colorCodes.keys()).sort((a, b) => parseInt(a) - parseInt(b));
console.log(allCodes.join(', '));

// Save to file
const output = {
    totalColorCodes: colorCodes.size,
    colorCodes: sortedColors.slice(0, 100).map(c => ({
        code: c.code,
        variationCount: c.count,
        uniqueProducts: c.products.size
    }))
};

fs.writeFileSync(
    path.join(__dirname, 'color-codes.json'),
    JSON.stringify(output, null, 2)
);

console.log('\nSaved to color-codes.json');
