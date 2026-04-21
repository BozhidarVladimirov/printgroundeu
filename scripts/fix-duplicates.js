const fs = require('fs');

let content = fs.readFileSync('./src/data/products-imported.ts', 'utf8');

// Fix: "searchTags": ["a"], "searchTags": ["b"] -> "searchTags": ["a", "b"]
let iterations = 0;
let fixed = content;

do {
  content = fixed;
  fixed = content.replace(
    /"searchTags":\s*\[([^\]]*)\],\s*"searchTags":\s*\[([^\]]*)\]/g,
    (match, first, second) => {
      const t1 = first.replace(/"/g, '').trim();
      const t2 = second.replace(/"/g, '').trim();
      const all = [t1, t2].filter((x, i, a) => a.indexOf(x) === i && x);
      return '"searchTags": [' + all.map(t => '"' + t + '"').join(', ') + ']';
    }
  );
  iterations++;
} while (fixed !== content && iterations < 20);

fs.writeFileSync('./src/data/products-imported.ts', fixed);
console.log('Fixed in ' + iterations + ' iterations');