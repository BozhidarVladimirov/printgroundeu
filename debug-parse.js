const fs = require('fs');
const inputFile = 'C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv';

const stream = fs.createReadStream(inputFile);
let data = '';

stream.on('data', (chunk) => { data += chunk; });

stream.on('end', () => {
    const lines = data.split('\n');
    const line2 = lines[1];

    const fields = [];
    let current = '';
    let inQ = false;

    for (let i = 0; i < line2.length; i++) {
        const c = line2[i];
        if (c === '"') {
            if (inQ && i + 1 < line2.length && line2[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQ = !inQ;
            }
        } else if (c === ',' && !inQ) {
            fields.push(current);
            current = '';
        } else {
            current += c;
        }
    }
    fields.push(current);

    console.log('Total fields:', fields.length);

    for (let i = 100; i < fields.length; i++) {
        console.log('Field ' + i + ': ' + JSON.stringify(fields[i]));
    }
});