const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../../wc-product-export-30-3-2026-1774877107115.csv');
const productsPath = path.join(__dirname, '../src/data/products-imported.ts');
const outputPath = path.join(__dirname, '../src/data/products-imported-new.ts');

// Bulgarian color name patterns to English (order matters - longer patterns first)
const bgColorsToEnglish = [
    // Greens first (more specific)
    ['сьлено зелено', 'Light Green'],
    ['светло зелено', 'Light Green'],
    ['армейско зелено', 'Army Green'],
    ['горско зелено', 'Forest Green'],
    ['дьмнозелено', 'Dark Green'],
    ['зелено зелено', 'Green'],
    ['маслинено зелено', 'Olive'],
    ['зьлено', 'Green'],
    ['зелено', 'Green'],
    
    // Blues (Navy before Royal before generic)
    ['тъмносин', 'Navy Blue'],
    ['тЪмносин', 'Navy Blue'],
    ['тьмносин', 'Navy Blue'],
    ['тъмносиньо', 'Navy Blue'],
    ['тъмно синьо', 'Navy Blue'],
    ['кралско синьо', 'Royal Blue'],
    ['синьо', 'Navy Blue'],
    ['александрит', 'Navy Blue'],
    ['льо синьо', 'Light Blue'],
    
    // Reds/Pinks
    ['портокалев', 'Coral'],
    ['сьомга', 'Salmon'],
    ['прасков', 'Peach'],
    ['червен', 'Red'],
    ['ангур', 'Red'],
    ['бордо', 'Burgundy'],
    ['мерло', 'Burgundy'],
    ['розов', 'Pink'],
    
    // Black/White/Gray
    ['черно', 'Black'],
    ['бяло', 'White'],
    ['бял', 'White'],
    ['ествен', 'Natural'],
    ['сив', 'Gray'],
    ['сиво', 'Gray'],
    ['тьмно сиво', 'Dark Gray'],
    ['тьмносиво', 'Dark Gray'],
    ['крем', 'Cream'],
    
    // Yellows/Oranges
    ['жълто', 'Yellow'],
    ['жълт', 'Yellow'],
    ['оранжево', 'Orange'],
    ['портокал', 'Orange'],
    
    // Browns
    ['кафяво', 'Brown'],
    ['кафяв', 'Brown'],
    ['бежово', 'Beige'],
    ['хаки', 'Khaki'],
    
    // Purples
    ['лилаво', 'Purple'],
    ['лилав', 'Purple'],
    ['виолет', 'Violet'],
    ['маджент', 'Magenta'],
    
    // Other
    ['прозрачно', 'Transparent'],
    ['прозрачен', 'Transparent'],
    ['металик', 'Silver'],
    ['графит', 'Graphite'],
    ['шампанско', 'Champagne'],
];

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
    const fullName = cols[4] + ' ' + cols[5];
    
    const skuMatch = sku.match(/^(\d+)-(\d+)$/);
    if (skuMatch) {
        const productCode = skuMatch[1];
        const colorCode = skuMatch[2];
        
        if (!productData.has(productCode)) {
            productData.set(productCode, {
                colors: new Set(),
                colorNames: new Set(),
                images: new Set(),
            });
        }
        
        const data = productData.get(productCode);
        data.colors.add(colorCode);
        
        // Extract color from product name (Bulgarian)
        const lowerName = fullName.toLowerCase();
        let foundColor = '';
        
        for (const [bg, en] of bgColorsToEnglish) {
            if (lowerName.includes(bg)) {
                foundColor = en;
                break;
            }
        }
        
        if (foundColor) {
            data.colorNames.add(foundColor);
        }
        
        // Extract images from columns 31 onwards
        for (let colIdx = 31; colIdx < 60; colIdx++) {
            const col = cols[colIdx];
            if (col && col.includes('printground.net')) {
                const urlMatch = col.match(/(https?:\/\/[^\s"]+\.(jpg|png|gif))/i);
                if (urlMatch) {
                    data.images.add(urlMatch[1]);
                }
            }
        }
    }
});

console.log(`Products with data found: ${productData.size}`);

// Check 92083
const sampleData = productData.get('92083');
if (sampleData) {
    console.log('\nSample - Product 92083:');
    console.log('Colors from variations:', Array.from(sampleData.colors));
    console.log('Color names from names:', Array.from(sampleData.colorNames));
    console.log('Images count:', sampleData.images.size);
}

console.log('\nReading products-imported.ts...');
let productsContent = fs.readFileSync(productsPath, 'utf8');

let updateCount = 0;
let imageUpdateCount = 0;

const productEntries = Array.from(productData.entries());

productEntries.forEach(([productCode, data]) => {
    let finalColors;
    
    if (data.colorNames.size > 0) {
        finalColors = Array.from(data.colorNames).sort();
    } else if (data.colors.size > 0) {
        const codeMap = {
            '102': 'Natural', '103': 'Black', '105': 'Red', '106': 'White',
            '108': 'Yellow', '114': 'Royal Blue', '119': 'Light Green',
            '128': 'Orange', '134': 'Navy Blue', '149': 'Army Green',
            '100': 'White', '104': 'Yellow', '107': 'Red', '109': 'Burgundy',
            '112': 'Navy Blue', '113': 'Royal Blue', '115': 'Aqua Blue',
            '116': 'Turquoise', '117': 'Teal', '118': 'Green', '121': 'Mint',
            '122': 'Army Green', '123': 'Forest Green', '124': 'Dark Green',
            '127': 'Brown', '129': 'Beige', '131': 'Khaki', '132': 'Olive',
            '133': 'Gray', '137': 'Charcoal', '138': 'Black', '139': 'Graphite',
        };
        finalColors = Array.from(data.colors)
            .map(code => codeMap[code] || 'Multi')
            .filter((name, idx, arr) => arr.indexOf(name) === idx)
            .sort();
    } else {
        return;
    }
    
    const searchStr = `"sku": "${productCode}"`;
    const skuIndex = productsContent.indexOf(searchStr);
    
    if (skuIndex !== -1) {
        const afterSku = productsContent.substring(skuIndex);
        const colorsMatch = afterSku.match(/"colors":\s*\[([^\]]*)\]/);
        
        if (colorsMatch) {
            const oldColors = colorsMatch[1].trim();
            const newColors = finalColors.map(c => `"${c}"`).join(', ');
            
            if (oldColors.includes('"Multi"') || oldColors === '"Multi"' || productCode === '92083') {
                const contextPattern = new RegExp(
                    `"sku": "${productCode}".*?"colors":\\s*\\[.*?\\]`,
                    's'
                );
                
                productsContent = productsContent.replace(contextPattern, (match) => {
                    return match.replace(colorsMatch[0], `"colors": [${newColors}]`);
                });
                updateCount++;
            }
        }
        
        // Update images
        const imagesMatch = afterSku.match(/"images":\s*\[([^\]]*)\]/);
        if (imagesMatch && data.images.size > 0) {
            const oldImages = imagesMatch[1].trim();
            if (oldImages.split('"').length < 6) {
                const allImages = Array.from(data.images);
                const newImages = allImages.slice(0, 10).map(img => `"${img}"`).join(',\n                        ');
                
                const imagesContext = new RegExp(
                    `"sku": "${productCode}".*?"images":\\s*\\[.*?\\]`,
                    's'
                );
                
                productsContent = productsContent.replace(imagesContext, (match) => {
                    return match.replace(imagesMatch[0], `"images": [\n                        ${newImages}\n                ]`);
                });
                imageUpdateCount++;
            }
        }
        
        if (productCode === '92083') {
            console.log(`\n92083 colors:`, finalColors);
        }
    }
});

console.log(`\nUpdated ${updateCount} products with colors`);
console.log(`Updated ${imageUpdateCount} products with images`);

fs.writeFileSync(outputPath, productsContent);
console.log(`Saved to products-imported-new.ts`);
