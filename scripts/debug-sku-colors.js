const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../../wc-product-export-30-3-2026-1774877107115.csv');
const productsPath = path.join(__dirname, '../src/data/products-imported.ts');

// Color code to name mapping
const colorCodeToName = {
    '100': 'White', '102': 'Natural', '103': 'Cream', '104': 'Yellow', '105': 'Gold',
    '106': 'Orange', '107': 'Red', '108': 'Pink', '109': 'Burgundy', '110': 'Purple',
    '112': 'Navy Blue', '113': 'Royal Blue', '114': 'Sky Blue', '115': 'Aqua Blue',
    '116': 'Turquoise', '117': 'Teal', '118': 'Green', '119': 'Lime Green',
    '121': 'Mint Green', '122': 'Army Green', '123': 'Forest Green', '124': 'Dark Green',
    '127': 'Brown', '128': 'Tan', '129': 'Beige', '131': 'Khaki', '132': 'Olive',
    '133': 'Gray', '134': 'Dark Gray', '137': 'Charcoal', '138': 'Black', '139': 'Graphite',
    '141': 'Silver', '142': 'Gun Metal', '144': 'Champagne', '146': 'Coral',
    '148': 'Lavender', '149': 'Lilac', '150': 'Violet', '152': 'Magenta', '153': 'Coral',
    '154': 'Salmon', '158': 'Mint', '159': 'Peach', '160': 'Light Blue',
    '163': 'Ice Blue', '164': 'Powder Blue', '168': 'Denim', '169': 'Cobalt',
    '173': 'Slate', '174': 'Steel Blue', '178': 'Sea Green', '179': 'Emerald',
    '183': 'Olive Drab', '203': 'Black', '204': 'Navy Blue', '207': 'Gray',
    '213': 'White', '214': 'Red', '301': 'Transparent', '304': 'Clear',
    '351': 'Melange Gray', '352': 'Melange Black', '353': 'Melange Navy',
    '354': 'Melange White', '357': 'Heather Gray', '361': 'Heather Blue',
    '362': 'Heather Red', '366': 'Light Gray', '170': 'Dark Navy', '188': 'Medium Gray',
};

console.log('Reading CSV file...');
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');
console.log(`Total lines: ${lines.length}`);

const productColors = new Map();

lines.forEach((line, idx) => {
    if (idx === 0 || !line.trim()) return;
    const cols = line.split(',');
    const sku = cols[2] || '';
    const skuMatch = sku.match(/^(\d+)-(\d+)$/);
    if (skuMatch) {
        const productCode = skuMatch[1];
        const colorCode = skuMatch[2];
        if (!productColors.has(productCode)) {
            productColors.set(productCode, new Set());
        }
        productColors.get(productCode).add(colorCode);
    }
    const imagesCol = cols[33] || '';
    const imgMatches = imagesCol.match(/\/(\d+)_(\d+)\./g);
    if (imgMatches) {
        imgMatches.forEach(match => {
            const match2 = match.match(/\/(\d+)_(\d+)\./);
            if (match2) {
                const productCode = match2[1];
                const colorCode = match2[2];
                if (!productColors.has(productCode)) {
                    productColors.set(productCode, new Set());
                }
                productColors.get(productCode).add(colorCode);
            }
        });
    }
});

console.log(`Products with colors found: ${productColors.size}`);

// Debug specific products
const debugSkus = ['11031', '11061', '11032'];
debugSkus.forEach(sku => {
    const colors = productColors.get(sku);
    console.log(`\n${sku} colors from CSV:`, colors ? Array.from(colors) : 'NOT FOUND');
    if (colors) {
        const names = Array.from(colors).map(c => colorCodeToName[c] || c);
        console.log(`  -> ${names.join(', ')}`);
    }
});
