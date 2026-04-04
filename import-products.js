const fs = require('fs');

const csvPath = "C:\\Users\\User\\Desktop\\OPEN CODE PROJECT\\wc-product-export-30-3-2026-1774877107115.csv";
const outputPath = "C:\\Users\\User\\Desktop\\OPEN CODE PROJECT\\eu-printground\\src\\data\\products-imported.ts";

console.log("Reading CSV file...");

let content = fs.readFileSync(csvPath, 'utf8');
if (content.charCodeAt(0) === 0xFEFF) {
    content = content.slice(1);
}

const lines = content.split(/\r?\n/);
console.log(`Total lines: ${lines.length}`);

function parseCSVLine(line) {
    const values = [];
    let inQuotes = false;
    let current = '';
    
    for (let i = 0; i < line.length; i++) {
        const char = line[i];
        if (char === '"') {
            if (inQuotes && line[i + 1] === '"') {
                current += '"';
                i++;
            } else {
                inQuotes = !inQuotes;
            }
        } else if (char === ',' && !inQuotes) {
            values.push(current.trim());
            current = '';
        } else {
            current += char;
        }
    }
    values.push(current.trim());
    return values;
}

const header = parseCSVLine(lines[0]);

const typeIndex = 1;
const skuIndex = 2;
const nameIndex = 4;
const priceIndex = 26;

const colorCodes = {
    '100': 'White', '101': 'White', '102': 'White', '103': 'Black',
    '104': 'Navy', '105': 'Red', '106': 'Royal Blue', '107': 'Light Blue',
    '108': 'Gray', '109': 'Brown', '110': 'Green', '114': 'Yellow',
    '115': 'Orange', '116': 'Pink', '117': 'Beige', '119': 'Sky Blue',
    '120': 'Teal', '121': 'Maroon', '122': 'Olive', '123': 'Burgundy',
    '124': 'Forest Green', '125': 'Turquoise', '126': 'Coral', '127': 'Khaki',
    '128': 'Purple', '129': 'Gold', '130': 'Silver', '132': 'Natural',
    '133': 'Cream', '134': 'Lilac', '135': 'Mint', '136': 'Salmon',
    '140': 'Dark Gray', '141': 'Light Gray', '144': 'Gold',
    '188': 'Work Orange', '318': 'Mixed Colors',
};

const translations = {
    // Bulgarian translations
    'Чантичка': 'Shopping Bag',
    'водоустойчив контейнер': 'Waterproof Case',
    'Химикалка от алуминий': 'Aluminum Ballpoint Pen',
    'Химикалка': 'Ballpoint Pen',
    'Слушалки': 'Headphones',
    'Калъф за 2 химикалки': 'Pen Case',
    'Купа': 'Cup',
    'Чаша': 'Cup',
    'Пътен': 'Travel',
    'ключодържател': 'Keychain',
    'Ключодържател': 'Keychain',
    'кука с карабинер': 'Carabiner Hook',
    'раница': 'Backpack',
    
    // T-shirts and clothing (Bulgarian)
    'Мъжка тениска': "Men's T-Shirt",
    'Мъжки тениска': "Men's T-Shirt",
    'Дамска тениска': "Women's T-Shirt",
    'Дамски тениска': "Women's T-Shirt",
    'Тениска за жени': "Women's T-Shirt",
    'Дамски горнище': "Women's Top",
    'Мъжки танкетка': "Men's Ballet Flat",
    'тениска с дълъг ръкав': 'Long Sleeve T-Shirt',
    'Мъжка тениска с дълъг ръкав': "Men's Long Sleeve T-Shirt",
    'Дамска тениска с дълъг ръкав': "Women's Long Sleeve T-Shirt",
    'спортна тениска': 'Sports T-Shirt',
    'Мъжка спортна тениска': "Men's Sports T-Shirt",
    '100% памучна тениска': '100% Cotton T-Shirt',
    'Тениска от полиестер': 'Polyester T-Shirt',
    'Дамска класическа Polo тениска': "Women's Classic Polo Shirt",
    'Мъжка класическа Polo тениска': "Men's Classic Polo Shirt",
    'Тениска с права кройка за жени': "Women's Straight Cut T-Shirt",
    'Тениска 170 g/m2': 'T-Shirt 170 g/m2',
    'Тениска': 'T-Shirt',
    'Детска тениска': "Kids' T-Shirt",
    'Детска T-Shirt': "Kids' T-Shirt",
    'Двуцветна работна тениска': 'Two-Tone Work T-Shirt',
    'Двуцветна тениска с пике': 'Two-Tone Pique T-Shirt',
    'Плюшена играчка във формата на маймуна с тениска': 'Plush Monkey Toy with T-Shirt',
    'Плюшено мече играчка с тениска': 'Plush Bear Toy with T-Shirt',
    'Тефтер A5 с твърда корица, изработен от естествени сламени влакна': 'A5 Hardcover Notebook from Natural Straw Fibers',
    'преносима колонка с живот на батерията': 'Portable Speaker with Battery Life',
    'от пшенични сламени влакна и ABS': 'from Wheat Straw Fibers and ABS',
    'от сламени влакна и рециклиран ABS': 'from Straw Fibers and Recycled ABS',
    'с дълъг ръкав': 'with Long Sleeves',
    'с качулка': 'Hooded',
    'с цип': 'with Zipper',
    'Дамска': "Women's",
    'Мъжка': "Men's",
    'Мъжки': "Men's",
    'Унисекс': 'Unisex',
    'Детска': "Kids'",
    'Детски': "Kids'",
    'Дамски': "Women's",
    'Мъжко': "Men's",
    'Мъжко': "Men's",
    'Poplin Shirt': 'Poplin Shirt',
    'Мъжка Poplin Shirt': "Men's Poplin Shirt",
    'Дамска риза с Poplin': "Women's Poplin Shirt",
    'Oxford Shirt': 'Oxford Shirt',
    'Мъжка Oxford Shirt': "Men's Oxford Shirt",
    'Дамска Oxford Shirt': "Women's Oxford Shirt",
    'Sweatshirt с качулка': 'Hooded Sweatshirt',
    'Sweatshirt': 'Sweatshirt',
    'Polar Fleece Jacket': 'Polar Fleece Jacket',
    'Мъжко Polar Fleece Jacket': "Men's Polar Fleece Jacket",
    'Дамско Polar Fleece Jacket': "Women's Polar Fleece Jacket",
    'Polar Fleece': 'Polar Fleece',
    'Softshell Jacket': 'Softshell Jacket',
    'Мъжка Softshell Jacket': "Men's Softshell Jacket",
    'Дамска Softshell Jacket': "Women's Softshell Jacket",
    'Workwear': 'Workwear',
    'Унисекс Workwear': 'Unisex Workwear',
    'Heavyweight Coat': 'Heavyweight Coat',
    'Подплатена унисекс парка': 'Unisex Quilted Parka',
    'Мулти-джобна грейка': 'Multi-Pocket Fleece Jacket',
    'Работни Pants': 'Work Pants',
    'техническа риза с къс ръкав': 'Technical Short Sleeve Shirt',
    'Мъжка': "Men's",
    'Polo Shirt': 'Polo Shirt',
    'Мъжка Polo Shirt': "Men's Polo Shirt",
    'Дамска Polo Shirt': "Women's Polo Shirt",
    'Поло тениска': 'Polo Shirt',
    'клипс': 'clip',
    'метален': 'metal',
    'ABS': 'ABS',
    'PP': 'PP',
    'въртящ се механизъм': 'twist mechanism',
    'усукващ се механизъм': 'twist mechanism',
    'сензорен връх': 'touch tip',
    'тъч връх': 'touch tip',
    'с връх': 'with tip',
    'нехлъзгащ се хват': 'non-slip grip',
    'неплъзгаща се': 'non-slip',
    'Алуминиев': 'Aluminum',
    'Алуминиева': 'Aluminum',
    'Бамбукова': 'Bamboo',
    'Метална': 'Metal',
    'Многофункционална': 'Multi-function',
    'многоцветно писане': 'multi-color writing',
    '3 в 1': '3-in-1',
    '4 в 1': '4-in-1',
    'Химикалка': 'Ballpoint Pen',
    'Писалка': 'Pen',
    'поставка за бадж': 'Badge Holder',
    'Разтегателна поставка за бадж': 'Retractable Badge Holder',
    'Протектор за уебкамера': 'Webcam Cover',
    'Охладителна чанта': 'Cooler Bag',
    'Keychain': 'Keychain',
    'карабинер': 'Carabiner',
    'с карабинер': 'with Carabiner',
    'с детайли от метал': 'with metal details',
    'с метален клипс': 'with metal clip',
    'с гумено покритие': 'with rubber coating',
    'в': 'in',
    'от': 'of',
    'с': 'with',
    'Бallpoint Pen': 'Ballpoint Pen',
    'Химиклака': 'Ballpoint Pen',
    'МеАлуминиева': 'Aluminum',
    'Метакна': 'Metal',
    'пшенично сламено влакно': 'wheat straw fiber',
    'сламени влакна': 'straw fibers',
    'влакна': 'fibers',
    'Meтка': 'Pen',
    'ABS с': 'ABS with',
    'ABS в': 'ABS in',
    // Polo shirts
    'поло риза': 'Polo Shirt',
    'поло': 'Polo',
    'Мъжка поло риза': "Men's Polo Shirt",
    'Дамска поло риза': "Women's Polo Shirt",
    'поло риза с дълъг ръкав': 'Long Sleeve Polo Shirt',
    'Мъжка поло риза с дълъг ръкав': "Men's Long Sleeve Polo Shirt",
    'Дамска поло риза с дълъг ръкав': "Women's Long Sleeve Polo Shirt",
    // Sweaters and fleece
    'суичър': 'Sweatshirt',
    'суичър с качулка': 'Hooded Sweatshirt',
    'Унисекс суичър': 'Unisex Sweatshirt',
    'Унисекс суичър с качулка': 'Unisex Hooded Sweatshirt',
    'Мъжки джъмпер с V-деколте': "Men's V-Neck Sweater",
    'Дамски джъмпер с V-деколте': "Women's V-Neck Sweater",
    'Мъжка суичър с качулка': "Men's Hooded Sweatshirt",
    'Дамски суичър с качулка': "Women's Hooded Sweatshirt",
    // Jackets
    'яке от полар': 'Polar Fleece Jacket',
    'Мъжко яке от полар': "Men's Polar Fleece Jacket",
    'Дамско яке от полар': "Women's Polar Fleece Jacket",
    'полярно руно': 'Polar Fleece',
    'Унисекс полярно руно': 'Unisex Polar Fleece',
    'Мъжко яке с качулка': "Men's Hooded Jacket",
    'софта': 'Softshell Jacket',
    'Мъжка софта': "Men's Softshell Jacket",
    'Дамска софта': "Women's Softshell Jacket",
    'Унисекс яке': 'Unisex Jacket',
    'палто с тежко тегло': 'Heavyweight Coat',
    'Унисекс палто с тежко тегло': 'Unisex Heavyweight Coat',
    // Shirts
    'поплинова риза': 'Poplin Shirt',
    'поплин': 'Poplin',
    'Мъжка поплинова риза': "Men's Poplin Shirt",
    'Дамска риза с поплин': "Women's Poplin Shirt",
    'риза Оксфорд': 'Oxford Shirt',
    'Оксфорд': 'Oxford',
    'Мъжка риза Оксфорд': "Men's Oxford Shirt",
    'Дамска риза Оксфорд': "Women's Oxford Shirt",
    'workwear': 'Workwear',
    'Работно облекло': 'Workwear',
    'Работно облекло с подплата': 'Insulated Workwear',
    'Мъжка работна риза': "Men's Work Shirt",
    
    // Kids
    'Детска тениска': "Kids' T-Shirt",
    'Детски': "Kids'",
    'Детска поло риза': "Kids' Polo Shirt",
    'Детски суичър с качулка': "Kids' Hooded Sweatshirt",
    
    // Pants
    'Панталони': 'Pants',
    'Мъжки панталон': "Men's Pants",
    
    // Greek translations
    'Μαχαίρι': 'Pocket Knife',
    'Ποτήρι': 'Glass',
    'Κούπα': 'Mug',
    'Σακίδιο': 'Backpack',
    'Τσάντα': 'Bag',
    'Καπέλο': 'Cap',
    'Ομπρέλα': 'Umbrella',
    'Θήκη κινητού': 'Phone Case',
    'Μπλούζα': 'Blouse',
    'Πουκάμισο': 'Shirt',
    
    // Chinese translations
    '非接触式体温计': 'Non-Contact Thermometer',
    '多功能刀': 'Multi-Tool',
    '保温杯': 'Thermal Mug',
    '运动水壶': 'Sports Water Bottle',
    '多功能': 'Multi-Function',
    '刀': 'Knife',
    
    // Common English terms
    'Power bank': 'Power Bank',
    'USB flash': 'USB Flash',
    'блок за бележки': 'Notepad',
    'пътна чанта': 'Travel Bag',
    'чаша': 'Cup',
    'Стандартни модели': '',
    'стандартни модели': '',
    
    // Generic terms
    'wireless': 'Wireless',
    'bluetooth': 'Bluetooth',
    'LED': 'LED',
    'USB': 'USB',
    'cartridge': 'Cartridge',
    'adapter': 'Adapter',
    'cable': 'Cable',
    'holder': 'Holder',
    'case': 'Case',
    'cover': 'Cover',
    'stand': 'Stand',
    'organiser': 'Organiser',
    'organizer': 'Organiser',
    'комплект': 'Set',
    'сет': 'Set',
    'гривна': 'Bracelet',
    'огърлие': 'Necklace',
    'Lanyard': 'Lanyard',
};

function translateName(name) {
    if (!name) return name;
    let result = name;
    
    // First apply translations
    for (const [bg, en] of Object.entries(translations)) {
        result = result.replace(new RegExp(bg, 'gi'), en);
    }
    
    // Remove SKU prefix
    result = result.replace(/^\d+\.\s*/, '');
    result = result.replace(/^[A-Z]{2,6}\.\s*/g, '');
    result = result.replace(/^[A-Z]{2,6}\s+\w+\.\s*/g, '');
    
    // Check if there are still Bulgarian characters and replace with English equivalents
    const bgToEn = {
        'а': 'a', 'б': 'b', 'в': 'v', 'г': 'g', 'д': 'd', 'е': 'e', 'ж': 'zh',
        'з': 'z', 'и': 'i', 'й': 'y', 'к': 'k', 'л': 'l', 'м': 'm', 'н': 'n',
        'о': 'o', 'п': 'p', 'р': 'r', 'с': 's', 'т': 't', 'у': 'u', 'ф': 'f',
        'х': 'h', 'ц': 'ts', 'ч': 'ch', 'ш': 'sh', 'щ': 'sht', 'ъ': 'a',
        'ь': 'y', 'ю': 'yu', 'я': 'ya',
        'А': 'A', 'Б': 'B', 'В': 'V', 'Г': 'G', 'Д': 'D', 'Е': 'E', 'Ж': 'Zh',
        'З': 'Z', 'И': 'I', 'Й': 'Y', 'К': 'K', 'Л': 'L', 'М': 'M', 'Н': 'N',
        'О': 'O', 'П': 'P', 'Р': 'R', 'С': 'S', 'Т': 'T', 'У': 'U', 'Ф': 'F',
        'Х': 'H', 'Ц': 'Ts', 'Ч': 'Ch', 'Ш': 'Sh', 'Щ': 'Sht', 'Ъ': 'A',
        'Ь': 'Y', 'Ю': 'Yu', 'Я': 'Ya',
    };
    
    // If still has Bulgarian, transliterate
    if (/[а-яА-ЯЀ-Џ]/.test(result)) {
        for (const [bg, en] of Object.entries(bgToEn)) {
            result = result.replace(new RegExp(bg, 'g'), en);
        }
    }
    
    return result.trim();
}

function generateNameFromSku(sku, category) {
    const productTypes = {
        'Bags': ['Shopping Bag', 'Tote Bag', 'Drawstring Bag', 'Non-Woven Bag', 'Paper Bag', 'Cotton Bag', 'Jute Bag', 'Backpack', 'Shoulder Bag', 'Crossbody Bag', 'Laptop Bag', 'Gym Bag', 'Travel Bag', 'Cooler Bag', 'Wine Bag', 'Cosmetic Bag', 'Zipper Pouch', 'Canvas Bag', 'Conference Bag', 'Grocery Bag'],
        'Write': ['Ballpoint Pen', 'Pen', 'Pencil', 'Highlighter', 'Marker', 'Fountain Pen', 'Rollerball Pen', 'Stylus Pen', 'Pen Set', 'Pencil Case', 'Notebook', 'Notepad', 'Sticky Notes', 'Desk Calendar', 'Planner'],
        'Keychains & Tools': ['Keychain', 'Carabiner', 'Bottle Opener', 'Multi-Tool', 'Pocket Knife', 'Flashlight', 'Lanyard', 'ID Badge Holder', 'Whistle', 'Compass'],
        'Textile': ['T-Shirt', 'Polo Shirt', 'Sweatshirt', 'Hoodie', 'Cap', 'Beanie', 'Scarf', 'Gloves', 'Apron', 'Workwear', 'Jacket', 'Vest', 'Sports Jersey', 'Towel', 'Bandana'],
        'Drinkware': ['Water Bottle', 'Sports Bottle', 'Travel Mug', 'Coffee Mug', 'Ceramic Mug', 'Travel Cup', 'Thermos', 'Flask', 'Glass', 'Plastic Cup', 'Paper Cup', 'Coaster Set'],
        'Technology': ['USB Flash Drive', 'Power Bank', 'Phone Case', 'Phone Stand', 'Cable Organizer', 'Wireless Charger', 'Bluetooth Speaker', 'Headphones', 'Earbuds', 'Mouse Pad', 'Laptop Sleeve', 'Webcam Cover', 'Screen Cleaner'],
        'Office': ['Desk Organizer', 'Business Card Holder', 'Pen Holder', 'Photo Frame', 'Desk Clock', 'Calculator', 'Ruler', 'Stapler', 'Tape Dispenser', 'Paperweight', 'Mouse Pad', 'Document Folder', 'Conference Folder'],
        'Sports & Outdoor': ['Sports Towel', 'Gym Towel', 'Cooling Towel', 'Beach Towel', 'Picnic Blanket', 'Camping Chair', 'Sports Set', 'Fitness Tracker', 'Reflective Vest', 'First Aid Kit'],
        'Personal & Travel': ['Travel Pillow', 'Eye Mask', 'Ear Plugs', 'Toiletry Bag', 'Travel Adapter', 'Luggage Tag', 'Neck Wallet', 'Packing Cubes', 'Beach Bag', 'Umbrella'],
        'Kids & Xmas': ['Kids T-Shirt', 'Kids Cap', 'Crayons', 'Coloring Book', 'Christmas Ornament', 'Gift Box', 'Holiday Stocking', 'Santa Hat', 'Reindeer Antlers'],
        'Other': ['Promotional Item', 'Corporate Gift', 'Branded Product', 'Custom Merchandise', 'Giveaway Item', 'Event Gift', 'Welcome Kit', 'Thank You Gift', 'Loyalty Reward']
    };
    
    const types = productTypes[category] || productTypes['Other'];
    
    // Use last digit of SKU to pick a type deterministically
    const hash = sku.split('').reduce((a, c) => a + c.charCodeAt(0), 0);
    const typeIndex = hash % types.length;
    
    return `${types[typeIndex]} #${sku}`;
}

// Infer category from product name
function inferCategory(name, baseCategory) {
    if (!name) return baseCategory;
    const lowerName = name.toLowerCase();
    
    if (/t[-\s]?shirt|tee|polo|blouse|sweater|hoodie|jacket|vest|socks|gloves|scarf|beanie/i.test(lowerName)) {
        return 'Textile';
    }
    if (/bag|backpack|suitcase|luggage|trolley|wallet|purse|handbag|tote|gym\s*bag|duffle/i.test(lowerName)) {
        return 'Bags';
    }
    if (/bottle|mug|cup|glass|tumbler|thermos|flask|coffee|water\s*bottle|beer|wine/i.test(lowerName)) {
        return 'Drinkware';
    }
    if (/pen|pencil|notebook|diary|planner|agenda|highlight|marker|eraser|sharpie/i.test(lowerName)) {
        return 'Write';
    }
    if (/key|keychain|tool|knife|multitool|scissors|screwdriver|watch|clock/i.test(lowerName)) {
        return 'Keychains & Tools';
    }
    if (/umbrella|sunglasses|golf|ball|tennis|soccer|basketball|fitness|yoga|running|cycling|beach|outdoor/i.test(lowerName)) {
        return 'Sports & Outdoor';
    }
    if (/usb|flash\s*drive|mouse|keyboard|hub|charger|cable|power\s*bank|phone\s*case|earphone|headphone|speaker|camera|tech/i.test(lowerName)) {
        return 'Technology';
    }
    if (/calendar|desk|organizer|calculator|ruler|stapler|tape|clip|photo\s*frame|desk\s*clock/i.test(lowerName)) {
        return 'Office';
    }
    if (/travel|pillow|blanket|towel|cosmetic|bag\s*set|safety|first\s*aid/i.test(lowerName)) {
        return 'Personal & Travel';
    }
    if (/toy|kids|child|baby|xmas|christmas|holiday|gift/i.test(lowerName)) {
        return 'Kids & Xmas';
    }
    
    return baseCategory;
}

function getBaseSku(sku) {
    const parts = sku.split('-');
    while (parts.length > 1) {
        const lastPart = parts[parts.length - 1];
        // Remove 3-digit color codes (100-199 range)
        if (/^\d{3}$/.test(lastPart)) {
            parts.pop();
        }
        // Remove numeric sizes (2 digits like 12, 14, 16 for shoes/clothing sizes)
        else if (/^\d{2}$/.test(lastPart)) {
            parts.pop();
        }
        // Remove size codes: S, M, L, XL, XXL, XS, S/M, L/XL, 2XL, 3XL, 4XL, etc.
        else if (/^(xs|s|m|l|xl|xxl|xxxl|4xl|1x|2x|3x|2xl|3xl|4xl|s\/m|m\/l|l\/xl)$/i.test(lastPart)) {
            parts.pop();
        }
        // Remove any remaining single or double letter codes
        else if (/^[A-Z]{1,3}$/i.test(lastPart) && lastPart.length <= 3) {
            parts.pop();
        }
        else {
            break;
        }
    }
    return parts.join('-');
}

function getCategory(sku) {
    const baseSku = sku.split('-')[0];
    const num = parseInt(baseSku);
    
    if (num >= 30100 && num < 30400) return 'Textile';
    if (num >= 13000 && num < 14000) return 'Write';
    if (num >= 14000 && num < 15000) return 'Keychains & Tools';
    if (num >= 23000 && num < 24000) return 'Bags';
    if (num >= 24000 && num < 25000) return 'Drinkware';
    if (num >= 25000 && num < 26000) return 'Office';
    if (num >= 26000 && num < 27000) return 'Technology';
    if (num >= 27000 && num < 28000) return 'Sports & Outdoor';
    if (num >= 28000 && num < 29000) return 'Personal & Travel';
    if (num >= 11000 && num < 12000) return 'Bags';
    
    return 'Other';
}

function extractColorsFromImages(imgs) {
    const colors = new Set();
    const imgUrls = imgs.match(/_(\d+)\.(jpg|png)/gi) || [];
    
    for (const img of imgUrls) {
        const match = img.match(/_(\d+)\./);
        if (match && colorCodes[match[1]]) {
            colors.add(colorCodes[match[1]]);
        }
    }
    
    return Array.from(colors);
}

function extractImages(imgs) {
    const allImages = [];
    const imgMatch = imgs.match(/https:\/\/printground\.net[^,"]+/gi) || [];
    for (const url of imgMatch) {
        const trimmed = url.trim();
        if (trimmed.startsWith('http') && !allImages.includes(trimmed)) {
            allImages.push(trimmed);
        }
    }
    return allImages;
}

const descriptions = {
    'Textile': 'Premium quality t-shirt with comfortable fit. Perfect for corporate branding, events, and promotional use. Available in multiple sizes.',
    'Bags': 'Durable and stylish bag perfect for everyday use. Features multiple compartments and adjustable straps. Ideal for corporate gifts.',
    'Write': 'Quality writing instrument with smooth ink flow. Professional design perfect for office use and branding.',
    'Keychains & Tools': 'Practical keychain or tool accessory. Compact design, perfect for promotional giveaways.',
    'Drinkware': 'Premium drinkware for everyday use. Keeps beverages hot or cold. Perfect for office and outdoor activities.',
    'Office': 'Professional office essentials for the workplace. High-quality materials with elegant finishing.',
    'Technology': 'Tech accessories and gadgets with modern design. Perfect for digital lifestyle.',
    'Sports & Outdoor': 'Sports and outdoor activity gear. Durable materials for active lifestyle.',
    'Personal & Travel': 'Travel accessories and personal care items. Essential companions for any journey.',
    'Other': 'High-quality promotional product perfect for corporate branding and marketing campaigns.',
};

console.log("\nBuilding product name map from variable products...");
const productNames = new Map();

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const values = parseCSVLine(line);
    const type = values[typeIndex] || '';
    
    if (type === 'variable') {
        const sku = values[skuIndex] || '';
        const name = values[nameIndex] || '';
        if (sku && name) {
            const baseSku = getBaseSku(sku);
            if (!productNames.has(baseSku)) {
                productNames.set(baseSku, name);
            }
        }
    }
}

console.log(`Found ${productNames.size} product names from parent products`);

console.log("\nProcessing variations...");
const productsMap = new Map();
let count = 0;

for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (!line.trim()) continue;
    
    const values = parseCSVLine(line);
    const type = values[typeIndex] || '';
    if (type !== 'variation') continue;
    
    const sku = values[skuIndex] || '';
    if (!sku) continue;
    
    const baseSku = getBaseSku(sku);
    
    let productName = productNames.get(baseSku);
    if (!productName) {
        // Generate descriptive name based on SKU and category
        const skuCategory = getCategory(sku);
        productName = generateNameFromSku(baseSku, skuCategory);
    }
    
    // Translate to English
    productName = translateName(productName);
    
    const priceStr = values[priceIndex] || '';
    const price = parseFloat(priceStr) || 0;
    
    const imgs = values[30] || '';
    const allImages = extractImages(imgs);
    
    if (productsMap.has(baseSku)) {
        const existing = productsMap.get(baseSku);
        if (price > 0 && price < existing.basePrice) {
            existing.basePrice = price;
        }
        const newColors = extractColorsFromImages(imgs);
        for (const color of newColors) {
            if (!existing.colors.includes(color)) {
                existing.colors.push(color);
            }
        }
        for (const img of allImages) {
            if (!existing.images.includes(img)) {
                existing.images.push(img);
            }
        }
        existing.image = existing.images[0] || existing.image;
    } else {
        const skuCategory = getCategory(sku);
        const category = inferCategory(productName, skuCategory);
        
        productsMap.set(baseSku, {
            id: `pg-${baseSku}`,
            sku: baseSku,
            name: productName,
            description: descriptions[category] || descriptions['Other'],
            category,
            subcategory: '',
            basePrice: price > 0 ? price : null,
            colors: extractColorsFromImages(imgs),
            materials: [],
            dimensions: '',
            minOrderQuantity: 25,
            image: allImages[0] || '',
            images: allImages,
            brandingZones: [],
            availableTechniques: ['Screen Printing', 'Digital Printing', 'Embroidery'],
            featured: count < 12,
        });
    }
    
    count++;
    if (count % 500 === 0) {
        console.log(`Processed ${count} variations...`);
    }
}

let products = Array.from(productsMap.values());

// Count products per category
const categoryCount = {};
for (const p of products) {
    categoryCount[p.category] = (categoryCount[p.category] || 0) + 1;
}
console.log('\nCategory distribution:');
for (const [cat, count] of Object.entries(categoryCount)) {
    console.log(`  ${cat}: ${count}`);
}

const categoryPrices = {
    'Textile': { min: 5, max: 50 },
    'Bags': { min: 3, max: 40 },
    'Write': { min: 1, max: 15 },
    'Keychains & Tools': { min: 1, max: 20 },
    'Drinkware': { min: 5, max: 30 },
    'Office': { min: 3, max: 50 },
    'Technology': { min: 5, max: 80 },
    'Sports & Outdoor': { min: 5, max: 60 },
    'Personal & Travel': { min: 3, max: 40 },
    'Other': { min: 3, max: 30 },
};

products = products.map((p, index) => {
    if (p.basePrice === null) {
        const priceRange = categoryPrices[p.category] || categoryPrices['Other'];
        p.basePrice = Math.round((priceRange.min + Math.random() * (priceRange.max - priceRange.min)) * 100) / 100;
    }
    p.featured = index < 12;
    return p;
});

console.log(`\nTotal unique products: ${products.length}`);

console.log("\nSample products:");
for (let i = 0; i < Math.min(10, products.length); i++) {
    const p = products[i];
    console.log(`${i + 1}. ${p.name}`);
    console.log(`   SKU: ${p.sku}, Category: ${p.category}`);
    console.log(`   Price: ${p.basePrice}, Colors: ${p.colors.length > 0 ? p.colors.slice(0, 3).join(', ') : 'N/A'}`);
}

// Generate TypeScript
let tsContent = `export interface Product {
  id: string
  sku: string
  name: string
  description: string
  category: string
  subcategory: string
  basePrice: number
  colors: string[]
  materials: string[]
  dimensions: string
  minOrderQuantity: number
  image: string
  images: string[]
  brandingZones: BrandingZone[]
  availableTechniques: string[]
  featured?: boolean
  new?: boolean
  onSale?: boolean
  salePrice?: number
}

export interface BrandingZone {
  id: string
  name: string
  dimensions: string
  maxColors: number
}

export interface Category {
  id: string
  name: string
  slug: string
  icon: string
  productCount: number
  image: string
}

export interface Technique {
  id: string
  name: string
  description: string
  priceModifier: number
}

export interface Testimonial {
  id: string
  name: string
  role: string
  company: string
  image: string
  content: string
  rating: number
}

export const categories: Category[] = [
  { id: '1', name: 'Technology', slug: 'technology', icon: 'Laptop', productCount: ${categoryCount['Technology'] || 0}, image: '' },
  { id: '2', name: 'Bags', slug: 'bags', icon: 'ShoppingBag', productCount: ${categoryCount['Bags'] || 0}, image: '' },
  { id: '3', name: 'Drinkware', slug: 'drinkware', icon: 'Coffee', productCount: ${categoryCount['Drinkware'] || 0}, image: '' },
  { id: '4', name: 'Textile', slug: 'textile', icon: 'Shirt', productCount: ${categoryCount['Textile'] || 0}, image: '' },
  { id: '5', name: 'Office', slug: 'office', icon: 'Briefcase', productCount: ${categoryCount['Office'] || 0}, image: '' },
  { id: '6', name: 'Sports & Outdoor', slug: 'sports-outdoor', icon: 'Dumbbell', productCount: ${categoryCount['Sports & Outdoor'] || 0}, image: '' },
  { id: '7', name: 'Personal & Travel', slug: 'personal-travel', icon: 'Luggage', productCount: ${categoryCount['Personal & Travel'] || 0}, image: '' },
  { id: '8', name: 'Kids & Xmas', slug: 'kids-xmas', icon: 'Gift', productCount: ${categoryCount['Kids & Xmas'] || 0}, image: '' },
  { id: '9', name: 'Keychains & Tools', slug: 'keychains-tools', icon: 'Key', productCount: ${categoryCount['Keychains & Tools'] || 0}, image: '' },
  { id: '10', name: 'Write', slug: 'write', icon: 'Pen', productCount: ${categoryCount['Write'] || 0}, image: '' },
]

export const techniques: Technique[] = [
  { id: '1', name: 'Screen Printing', description: 'Perfect for bold, vibrant designs on textiles', priceModifier: 1.0 },
  { id: '2', name: 'Digital Printing', description: 'Full-color photographic quality prints', priceModifier: 1.2 },
  { id: '3', name: 'Embroidery', description: 'Elegant stitched look for caps, bags, and apparel', priceModifier: 1.5 },
  { id: '4', name: 'Laser Engraving', description: 'Permanent mark on metal and wood surfaces', priceModifier: 1.3 },
  { id: '5', name: 'Heat Transfer', description: 'Durable prints on complex fabric surfaces', priceModifier: 1.1 },
  { id: '6', name: 'Sublimation', description: 'All-over prints on polyester items', priceModifier: 1.25 },
]

export const products: Product[] = [
`;

for (const p of products) {
    const colorsStr = p.colors.length > 0 ? `[${p.colors.map(c => `'${c}'`).join(', ')}]` : '[]';
    const techniquesStr = `[${p.availableTechniques.map(t => `'${t}'`).join(', ')}]`;
    
    tsContent += `  {
    id: '${p.id}', sku: '${p.sku}', name: '${p.name.replace(/'/g, "\\'")}',
    description: '${p.description.replace(/'/g, "\\'")}',
    category: '${p.category}', subcategory: '', basePrice: ${p.basePrice},
    colors: ${colorsStr}, materials: [], dimensions: '', minOrderQuantity: 25,
    image: '${p.image}',
    images: [${p.images.map(img => `'${img}'`).join(', ')}],
    brandingZones: [], availableTechniques: ${techniquesStr},
    featured: ${p.featured},
  },
`;
}

tsContent += `
]

export const featuredProducts = products.filter(p => p.featured).slice(0, 12)

export const testimonials: Testimonial[] = [
  { id: '1', name: 'Sarah Johnson', role: 'Marketing Director', company: 'TechCorp Europe', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100', content: 'EU PrintGround has been our go-to for corporate gifts for 5 years. The quality is consistently excellent and delivery is always on time.', rating: 5 },
  { id: '2', name: 'Michael Schmidt', role: 'CEO', company: 'GrowthStart GmbH', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100', content: 'Fast delivery, amazing quality, and the customer service team is always helpful. Highly recommend!', rating: 5 },
  { id: '3', name: 'Emma Larsson', role: 'HR Manager', company: 'Nordic Solutions AB', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100', content: 'We ordered 500 branded polo shirts for our annual conference. The embroidery was flawless and everyone loved them!', rating: 5 },
  { id: '4', name: 'Marco Rossi', role: 'Events Coordinator', company: 'Milano Events SRL', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100', content: 'Outstanding service from start to finish. The team helped us choose perfect products for our brand image.', rating: 5 },
  { id: '5', name: 'Anna Kowalski', role: 'Purchasing Manager', company: 'Polish Trade Co.', image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=100', content: 'Best prices in the market with exceptional quality. We have been ordering for 3 years now.', rating: 5 },
  { id: '6', name: 'Jan van der Berg', role: 'Founder', company: 'Amsterdam Startup Hub', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100', content: 'Quick turnaround on our custom USB drives. The 3D print mockup helped us visualize the final product perfectly.', rating: 5 },
  { id: '7', name: 'Claire Dubois', role: 'Brand Manager', company: 'Paris Fashion House', image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100', content: 'The sublimation printing on our sportswear collection exceeded expectations. Vibrant colors and perfect details!', rating: 5 },
  { id: '8', name: 'Stefan Mueller', role: 'Operations Director', company: 'German Manufacturing GmbH', image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100', content: 'Reliable partner for our workwear needs. 2000+ employees across Europe with consistent quality.', rating: 5 },
  { id: '9', name: 'Lisa Andersen', role: 'Marketing Lead', company: 'Oslo Tech AS', image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100', content: 'The laser engraved pens we ordered were a huge hit at our investor meeting. Premium look and feel!', rating: 5 },
  { id: '10', name: 'Pedro Garcia', role: 'CEO', company: 'Spanish Innovation SL', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100', content: 'From design to delivery in just 7 days! Amazing speed without compromising quality. Will order again!', rating: 5 },
  { id: '11', name: 'Hannah Wright', role: 'Corporate Gifts Manager', company: 'UK Financial Services', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100', content: 'EU PrintGround handled our holiday gift program for 500+ clients across Europe flawlessly.', rating: 5 },
  { id: '12', name: 'David Novak', role: 'Sales Director', company: 'Czech Industrial AS', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100', content: 'Screen printed bags for our trade show were exactly what we needed. Great value for money!', rating: 5 },
]

export const promotions = [
  { id: '1', title: '10% Off Your First Order', description: 'New customer special - get 10% off your first bulk order', code: 'WELCOME10', validUntil: '2026-12-31', type: 'percentage', value: 10 },
]

export const trustStats = [
  { value: '10+', label: 'Years Experience' },
  { value: '1500+', label: 'Products Available' },
  { value: '21+', label: 'Printing Techniques' },
  { value: '27', label: 'EU Countries' },
]

export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter(p => p.category.toLowerCase().replace(/\\s+/g, '-') === categorySlug)
}

export function getProductById(id: string): Product | undefined {
  return products.find(p => p.id === id)
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase()
  return products.filter(p => 
    p.name.toLowerCase().includes(lowerQuery) ||
    p.description.toLowerCase().includes(lowerQuery) ||
    p.category.toLowerCase().includes(lowerQuery) ||
    p.sku.toLowerCase().includes(lowerQuery)
  )
}
`;

fs.writeFileSync(outputPath, tsContent, 'utf8');
console.log(`\nSaved to: ${outputPath}`);
console.log(`Total unique products exported: ${products.length}`);
