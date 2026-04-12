const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../../wc-product-export-30-3-2026-1774877107115.csv');
const productsPath = path.join(__dirname, '../src/data/products-imported.ts');
const outputPath = path.join(__dirname, '../src/data/products-imported-new.ts');

// Color code to name mapping (updated with more Bulgarian color names)
const colorCodeToName = {
    '100': 'White',
    '102': 'Natural',
    '103': 'Black',
    '104': 'Yellow',
    '105': 'Red',
    '106': 'White',
    '107': 'Red',
    '108': 'Yellow',
    '109': 'Burgundy',
    '110': 'Purple',
    '112': 'Navy Blue',
    '113': 'Royal Blue',
    '114': 'Royal Blue',
    '115': 'Aqua Blue',
    '116': 'Turquoise',
    '117': 'Teal',
    '118': 'Green',
    '119': 'Light Green',
    '121': 'Mint Green',
    '122': 'Army Green',
    '123': 'Forest Green',
    '124': 'Dark Green',
    '127': 'Brown',
    '128': 'Orange',
    '129': 'Beige',
    '131': 'Khaki',
    '132': 'Olive',
    '133': 'Gray',
    '134': 'Navy Blue',
    '137': 'Charcoal',
    '138': 'Black',
    '139': 'Graphite',
    '141': 'Silver',
    '142': 'Gun Metal',
    '144': 'Champagne',
    '146': 'Coral',
    '148': 'Lavender',
    '149': 'Army Green',
    '150': 'Violet',
    '152': 'Magenta',
    '153': 'Coral',
    '154': 'Salmon',
    '158': 'Mint',
    '159': 'Peach',
    '160': 'Light Blue',
    '163': 'Ice Blue',
    '164': 'Powder Blue',
    '168': 'Denim',
    '169': 'Cobalt',
    '173': 'Slate',
    '174': 'Steel Blue',
    '178': 'Sea Green',
    '179': 'Emerald',
    '183': 'Olive Drab',
    '203': 'Black',
    '204': 'Navy Blue',
    '207': 'Gray',
    '213': 'White',
    '214': 'Red',
    '301': 'Transparent',
    '304': 'Clear',
    '351': 'Melange Gray',
    '352': 'Melange Black',
    '353': 'Melange Navy',
    '354': 'Melange White',
    '357': 'Heather Gray',
    '361': 'Heather Blue',
    '362': 'Heather Red',
    '366': 'Light Gray',
    '170': 'Dark Navy',
    '188': 'Medium Gray',
};

// Bulgarian color name to code mapping
const bgColorToCode = {
    'ествен': '102',     // Natural
    'черно': '103',     // Black  
    'червен': '105',    // Red
    'бял': '106',       // White
    'жълт': '108',      // Yellow
    'сьомга': '109',    // Salmon
    'лилав': '110',     // Purple
    'виолет': '110',    // Violet
    'ньо': '112',       // Navy
    'синьо': '113',     // Blue
    'royal': '114',     // Royal Blue
    'кралско': '114',   // Royal Blue
    'аква': '115',      // Aqua
    'тьркоаз': '116',   // Turquoise
    'тил': '117',       // Teal
    'зелено': '118',    // Green
    'лайм': '119',      // Lime
    'светло': '119',    // Light
    'мент': '121',      // Mint
    'армейско': '122',  // Army
    'горско': '123',    // Forest
    'тьмно': '124',     // Dark
    'кафяв': '127',     // Brown
    'оранжев': '128',   // Orange
    'бежов': '129',     // Beige
    'хаки': '131',      // Khaki
    'маслинен': '132',  // Olive
    'сиво': '133',      // Gray
    'графит': '139',    // Graphite
    'сребро': '141',    // Silver
    'шампанско': '144', // Champagne
    'корал': '146',     // Coral
    'лавандул': '148',  // Lavender
    'лилав': '149',     // Lilac
    'маджент': '152',   // Magenta
    'прасков': '159',   // Peach
    'деним': '168',     // Denim
    'кобалт': '169',    // Cobalt
    'сланев': '173',    // Slate
    ' стомана': '174',   // Steel
    'морсков': '178',   // Sea
    'изумруд': '179',   // Emerald
};

console.log('Reading CSV file...');
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');
console.log(`Total lines: ${lines.length}`);

// Build product data from CSV
const productData = new Map();

lines.forEach((line, idx) => {
    if (idx === 0 || !line.trim()) return;
    
    const cols = line.split(',');
    const sku = cols[2] || '';
    const name = cols[4] || '';
    
    // Extract from SKU (format: 92083-102)
    const skuMatch = sku.match(/^(\d+)-(\d+)$/);
    if (skuMatch) {
        const productCode = skuMatch[1];
        const colorCode = skuMatch[2];
        
        if (!productData.has(productCode)) {
            productData.set(productCode, {
                colors: new Set(),
                images: new Set(),
                variations: []
            });
        }
        
        const data = productData.get(productCode);
        data.colors.add(colorCode);
        data.variations.push({ sku, colorCode, name });
        
        // Extract images from columns 31-39 (and beyond)
        for (let colIdx = 31; colIdx < cols.length; colIdx++) {
            const col = cols[colIdx];
            if (col && col.includes('printground.net')) {
                // Extract URL
                const urlMatch = col.match(/(https?:\/\/[^\s"]+\.jpg|png|gif)/i);
                if (urlMatch) {
                    data.images.add(urlMatch[1]);
                }
            }
        }
    }
});

console.log(`Products with data found: ${productData.size}`);

// Sample check
const sampleData = productData.get('92083');
if (sampleData) {
    console.log('\nSample - Product 92083:');
    console.log('Colors:', Array.from(sampleData.colors));
    console.log('Color names:', Array.from(sampleData.colors).map(c => colorCodeToName[c] || c));
    console.log('Images count:', sampleData.images.size);
    console.log('Sample images:', Array.from(sampleData.images).slice(0, 3));
}

console.log('\nReading products-imported.ts...');
let productsContent = fs.readFileSync(productsPath, 'utf8');

let updateCount = 0;
let multiCount = 0;

const productEntries = Array.from(productData.entries());

productEntries.forEach(([productCode, data]) => {
    const colorCodes = Array.from(data.colors);
    const colorNames = colorCodes
        .map(code => colorCodeToName[code] || 'Multi')
        .filter((name, idx, arr) => arr.indexOf(name) === idx)
        .sort();
    
    // Get all images
    const images = Array.from(data.images).filter(url => !url.includes('_set') && !url.includes('_amb'));
    const mainImage = Array.from(data.images).find(url => url.includes('_set')) || images[0] || '';
    const allImages = [mainImage, ...images.filter(img => img !== mainImage)].slice(0, 10);
    
    if (colorNames.length > 0 && colorNames[0] !== 'Multi') {
        const searchStr = `"sku": "${productCode}"`;
        const skuIndex = productsContent.indexOf(searchStr);
        
        if (skuIndex !== -1) {
            const afterSku = productsContent.substring(skuIndex);
            const colorsMatch = afterSku.match(/"colors":\s*\[([^\]]*)\]/);
            
            if (colorsMatch) {
                const oldColors = colorsMatch[1].trim();
                
                if (oldColors.includes('"Multi"')) {
                    const newColors = colorNames.map(c => `"${c}"`).join(', ');
                    
                    // Use replace with context pattern
                    const contextPattern = new RegExp(
                        `"sku": "${productCode}".*?"colors":\\s*\\[.*?\\]`,
                        's'
                    );
                    
                    productsContent = productsContent.replace(contextPattern, (match) => {
                        return match.replace(colorsMatch[0], `"colors": [${newColors}]`);
                    });
                    
                    updateCount++;
                    
                    if (productCode === '92083') {
                        console.log(`\nUpdated 92083:`, colorNames);
                    }
                } else {
                    multiCount++;
                }
            }
        }
    }
});

console.log(`\nUpdated ${updateCount} products with colors`);
console.log(`Skipped (already has real colors): ${multiCount}`);

fs.writeFileSync(outputPath, productsContent);
console.log(`Saved to products-imported-new.ts`);
