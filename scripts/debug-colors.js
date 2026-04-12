const fs = require('fs');

const productsContent = fs.readFileSync('./src/data/products-imported.ts', 'utf8');
const searchStr = '"sku": "11031"';
const skuIndex = productsContent.indexOf(searchStr);

console.log('Found at index:', skuIndex);

if (skuIndex !== -1) {
    const afterSku = productsContent.substring(skuIndex, skuIndex + 500);
    console.log('\nAfter SKU:');
    console.log(afterSku);
    
    const colorsMatch = afterSku.match(/"colors":\s*\[([^\]]*)\]/);
    console.log('\nColors match:', colorsMatch ? colorsMatch[1] : 'NOT FOUND');
    console.log('Full match:', colorsMatch ? colorsMatch[0] : 'NOT FOUND');
}
