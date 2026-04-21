const fs = require('fs');

const inputFile = 'C:/Users/User/Desktop/OPEN CODE PROJECT/wc-product-export-30-3-2026-1774877107115.csv';
const outputFile = 'C:/Users/User/Desktop/OPEN CODE PROJECT/eu-printground/techniques-result.json';
const techCols = [50, 58, 66, 74, 82, 90, 98, 106];
const result = {};
let lineCount = 0;

const stream = fs.createReadStream(inputFile, { encoding: 'utf8', highWaterMark: 1024 * 1024 });
let lineBuffer = '';
let inQuotes = false;

function parseCSVFields(data) {
    const fields = [];
    let current = '';
    let inQ = false;

    for (let i = 0; i < data.length; i++) {
        const c = data[i];
        if (c === '"') {
            if (inQ && i + 1 < data.length && data[i + 1] === '"') {
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

function processLine(line) {
    lineCount++;
    if (lineCount === 1) return;

    const fields = parseCSVFields(line);
    const sku = fields[2]?.trim();
    if (!sku) return;

    const techniques = techCols
        .map(idx => fields[idx] ? fields[idx].trim().replace(/^"|"$/g, '') : null)
        .filter(v => v && v !== '');

    if (techniques.length > 0) {
        result[sku] = techniques;
    }

    if (lineCount % 100000 === 0) {
        console.error('Processed ' + lineCount + ' rows...');
    }
}

stream.on('data', (chunk) => {
    for (let i = 0; i < chunk.length; i++) {
        const c = chunk[i];

        if (c === '"') {
            inQuotes = !inQuotes;
            lineBuffer += c;
        } else if (c === '\n' && !inQuotes) {
            processLine(lineBuffer);
            lineBuffer = '';
        } else if (c === '\r') {
            if (i + 1 < chunk.length && chunk[i + 1] === '\n' && !inQuotes) {
                processLine(lineBuffer);
                lineBuffer = '';
                i++;
            } else {
                lineBuffer += c;
            }
        } else {
            lineBuffer += c;
        }
    }
});

stream.on('end', () => {
    if (lineBuffer.trim()) {
        processLine(lineBuffer);
    }
    fs.writeFileSync(outputFile, JSON.stringify(result), 'utf8');
    console.error('Done! Wrote ' + Object.keys(result).length + ' SKUs to ' + outputFile);
});

stream.on('error', (err) => {
    console.error('Error:', err);
    process.exit(1);
});