const fs = require('fs');
let content = fs.readFileSync('./src/data/products-imported.ts', 'utf8');

const updates = {
    '92083': { name: 'ISTANBUL Tote Bag - Organic Cotton & rPET (150g/m²)', desc: 'Premium tote bag made from recycled organic cotton and rPET fabric. Perfect for eco-friendly corporate branding.' },
    '11078': { name: 'Wireless Bluetooth Headphones', desc: 'High-quality wireless headphones with premium sound. Ideal for tech gifts and corporate merchandise.' },
    '11031': { name: 'Drawstring Sports Bag', desc: 'Lightweight drawstring bag perfect for sports and travel. Easy to customize with your logo.' },
    '36004': { name: 'VL HYPNOS Cargo Pants', desc: 'Comfortable two-tone cargo pants with multiple pockets. Made from cotton (35%) and polyester (65%).' },
    '11061': { name: 'Multi-function Pocket Tool', desc: 'Compact multi-function pocket tool with multiple features. Great for outdoor and corporate gifts.' },
    '13212': { name: 'ADOLIA Pen Case', desc: 'Elegant pen case for 2 pens. Perfect for office and corporate accessories.' },
    '11032': { name: 'Premium Gift Box', desc: 'High-quality gift box for corporate presents. Customizable with your branding.' },
    '11034': { name: 'Urban Backpack', desc: 'Stylish urban backpack with laptop compartment. Perfect for everyday use and corporate branding.' }
};

let updated = 0;

Object.entries(updates).forEach(([sku, data]) => {
    const searchStr = `"sku": "${sku}"`;
    const idx = content.indexOf(searchStr);
    
    if (idx !== -1) {
        const afterSku = content.substring(idx);
        const nameMatch = afterSku.match(/"name": "([^"]+)"/);
        
        if (nameMatch) {
            content = content.replace(nameMatch[0], `"name": "${data.name}"`);
            updated++;
            console.log(`Updated ${sku}: ${data.name}`);
        }
    }
});

fs.writeFileSync('./src/data/products-imported.ts', content);
console.log(`\nTotal updated: ${updated}`);
