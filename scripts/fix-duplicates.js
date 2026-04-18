const fs = require('fs');

let content = fs.readFileSync('./src/data/products-imported.ts', 'utf8');

// Find all products with searchTags and merge duplicates
// Pattern: "searchTags": ["something"],\n                "searchTags": ["something2"]
// Replace with: "searchTags": ["something", "something2"]

let fixed = content.replace(/"searchTags":\s*\[([^\]]*)\],\s*"searchTags":\s*\[/g, (match, first) => {
  // Extract all tags and merge
  const firstTags = first.replace(/"/g, '').split(',').map(t => t.trim()).filter(t => t);
  return '"searchTags": [' + firstTags.map(t => '"' + t + '"').join(', ') + '], "searchTags": [';
});

// Also fix the case where they are on same line: "searchTags": ["a"]["b"]
fixed = fixed.replace(/"searchTags":\s*\[([^\]]*)\]\"([^\"]+)\"\s*\]/g, (match, first, second) => {
  const firstTags = first.replace(/"/g, '').split(',').map(t => t.trim()).filter(t => t);
  const secondTags = second.replace(/"/g, '').split(',').map(t => t.trim()).filter(t => t);
  const allTags = [...firstTags, ...secondTags];
  return '"searchTags": [' + allTags.map(t => '"' + t + '"').join(', ') + ']';
});

fs.writeFileSync('./src/data/products-imported.ts', fixed);
console.log('Fixed duplicates');