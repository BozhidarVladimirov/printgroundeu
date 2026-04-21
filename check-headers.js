const fs = require('fs');

const data = fs.readFileSync('C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv', 'utf8');
const firstLine = data.split('\n')[0];

function parseCSVLine(line) {
    const fields = [];
    let current = '';
    let inQ = false;

    for (let i = 0; i < line.length; i++) {
        const c = line[i];
        if (c === '"') {
            if (inQ && i + 1 < line.length && line[i + 1] === '"') {
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
    return fields;
}

const headers = parseCSVLine(firstLine);
console.log('Headers 48-58:');
for (let i = 48; i <= 58; i++) {
    console.log(i + ': ' + headers[i]);
}

const line2 = data.split('\n')[1];
const fields2 = parseCSVLine(line2);
console.log('\nLine 2 values 48-58:');
for (let i = 48; i <= 58; i++) {
    console.log(i + ': ' + JSON.stringify(fields2[i]));
}