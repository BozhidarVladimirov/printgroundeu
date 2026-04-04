const fs = require('fs');

const html = fs.readFileSync('shop-page.html', 'utf8');

// Decode HTML entities
function decodeHtml(html) {
  return html
    .replace(/&#(\d+);/g, (_, num) => String.fromCharCode(parseInt(num, 10)))
    .replace(/&#x([a-fA-F0-9]+);/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ');
}

// Find all products in the script template
const scriptMatch = html.match(/<script type="text\/template">"([\s\S]*?)"<\/script>/);
if (!scriptMatch) {
  console.log('No script template found');
  process.exit(1);
}

const productsHtml = scriptMatch[1];

// Match product blocks
const productRegex = /post-(\d+)[^>]*>[\s\S]*?data-title="([^"]*)"[\s\S]*?src="(https:\/\/printground\.net\/wp-content\/uploads\/[^"]*_set[^"]*)"[\s\S]*?data-product_sku="([^"]*)"[\s\S]*?<bdi>([\d.]+)/g;

const products = [];
let match;

while ((match = productRegex.exec(productsHtml)) !== null) {
  const id = match[1];
  const title = decodeHtml(match[2]);
  const image = match[3].replace(/\\//g, '/');
  const sku = match[4];
  const price = parseFloat(match[5]);
  
  // Extract category from the HTML near the match
  const productSlice = productsHtml.substring(match.index - 2000, match.index + 500);
  const catRegex = /tb-meta-product_cat[\s\S]*?<a[^>]*>([^<]*)<\/a>/g;
  const cats = [];
  let catMatch;
  while ((catMatch = catRegex.exec(productSlice)) !== null) {
    cats.push(decodeHtml(catMatch[1]));
  }
  
  // Parse name - format is "MODEL. Description in Bulgarian"
  const parts = title.split('.');
  const model = parts[0].trim();
  const description = parts.slice(1).join('.').trim();
  
  products.push({
    id,
    sku,
    model,
    name: title,
    description,
    category: cats[0] || 'Other',
    categories: cats,
    basePrice: price,
    image,
    images: [image]
  });
}

console.log(`Found ${products.length} products`);
console.log('Sample:', JSON.stringify(products[0], null, 2));

fs.writeFileSync('products-raw.json', JSON.stringify(products, null, 2));
