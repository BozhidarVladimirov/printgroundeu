const fs = require('fs');
let content = fs.readFileSync('./src/data/products-imported.ts', 'utf8');

const updates = {
    '30102': 'THC LUANDA Premium Polo Shirt',
    '30106': 'THC SOFIA Classic Polo Shirt'
};

Object.entries(updates).forEach(([sku, name]) => {
    const searchStr = `"sku": "${sku}"`;
    const idx = content.indexOf(searchStr);
    
    if (idx !== -1) {
        const afterSku = content.substring(idx);
        const nameMatch = afterSku.match(/"name": "([^"]+)"/);
        
        if (nameMatch) {
            content = content.replace(nameMatch[0], `"name": "${name}"`);
            console.log(`Updated ${sku}: ${name}`);
        }
    }
});

fs.writeFileSync('./src/data/products-imported.ts', content);
console.log('Done');
