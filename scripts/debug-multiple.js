const fs = require('fs');

const productsPath = './src/data/products-imported.ts';
let productsContent = fs.readFileSync(productsPath, 'utf8');

// Count occurrences of the exact pattern
const searchStr = '"sku": "11031"';
const skuIndex = productsContent.indexOf(searchStr);
console.log('SKU 11031 index:', skuIndex);

// Get the colors pattern
const afterSku = productsContent.substring(skuIndex);
const colorsMatch = afterSku.match(/"colors":\s*\[([^\]]*)\]/);

if (colorsMatch) {
    const fullPattern = colorsMatch[0];
    console.log('Pattern to replace:', JSON.stringify(fullPattern));
    
    // Count how many times this exact pattern appears
    let count = 0;
    let idx = 0;
    while ((idx = productsContent.indexOf(fullPattern, idx)) !== -1) {
        count++;
        console.log(`Occurrence ${count} at index ${idx}`);
        idx += 1;
    }
    console.log(`Total occurrences of pattern: ${count}`);
    
    // Try with a unique pattern by including the SKU
    const uniquePattern = `"sku": "11031"[^}]*"colors":\\s*\\[([^\\]]*)\\]`;
    const uniqueMatch = productsContent.match(new RegExp(uniquePattern, 's'));
    console.log('\nUnique pattern match:', !!uniqueMatch);
    if (uniqueMatch) {
        console.log('Matched content:', JSON.stringify(uniqueMatch[0].substring(0, 200)));
    }
}
