export const searchSynonyms: Record<string, string[]> = {
  pen: ['write', 'ballpoint', 'rollerball', 'stylus', 'biro', 'marker', 'pencil', 'gel pen', 'senator', 'brentano', 'toolpen', 'prodir'],
  pencil: ['write', 'pen', 'marker', 'graphite'],
  marker: ['write', 'pen', 'highlighter', 'sharpie'],
  writing: ['write', 'pen', 'pencil', 'marker', 'ballpoint'],

  notebook: ['write', 'office', 'notepad', 'journal', 'planner', 'softbook', 'infinitebook', 'moleskine', 'a5', 'a6', 'tefter', 'starter kit'],
  notepad: ['write', 'office', 'notebook', 'journal', 'planner'],
  planner: ['write', 'office', 'notebook', 'journal', 'organizer', 'diary', 'infinite'],
  journal: ['write', 'office', 'notebook', 'planner', 'notepad'],

  bag: ['bags', 'tote', 'backpack', 'rucksack', 'pouch', 'bpack', 'shopper', 'sack'],
  backpack: ['bags', 'bag', 'rucksack', 'bpack', 'laptop', 'pack', 'shades'],
  tote: ['bags', 'bag', 'shopper', 'istanbul', 'mexico'],
  rucksack: ['bags', 'bag', 'backpack', 'bpack'],

  mug: ['drinkware', 'cup', 'thermos', 'tumbler', 'coffee', 'tea', 'coffeepad'],
  cup: ['drinkware', 'mug', 'thermos', 'tumbler'],
  bottle: ['drinkware', 'water', 'flask', 'thermos', 'sports'],
  thermos: ['drinkware', 'bottle', 'flask', 'mug', 'tumbler', 'thermal'],
  tumbler: ['drinkware', 'mug', 'cup', 'thermos'],
  drinkware: ['drinkware', 'mug', 'cup', 'bottle', 'thermos', 'tumbler'],

  charger: ['technology', 'power bank', 'powerbank', 'usb', 'charging', 'cable'],
  headphones: ['technology', 'earphones', 'earbuds', 'wireless', 'audio', 'bluetooth', 'chargaff'],
  usb: ['technology', 'flash drive', 'memory', 'drive', 'hub', 'cable'],
  speaker: ['technology', 'bluetooth', 'audio', 'wireless'],
  powerbank: ['technology', 'power bank', 'charger', 'battery'],
  tech: ['technology', 'usb', 'charger', 'speaker', 'headphones'],

  tshirt: ['textile', 't-shirt', 'shirt', 'tee', 'apparel', 'thc', 'cotton'],
  shirt: ['textile', 'tshirt', 't-shirt', 'polo', 'apparel'],
  polo: ['textile', 'shirt', 'tshirt', 'apparel'],
  hoodie: ['textile', 'sweatshirt', 'pullover', 'sweater'],
  jacket: ['textile', 'coat', 'fleece', 'softshell', 'vl yama'],
  apparel: ['textile', 'tshirt', 'shirt', 'polo', 'hoodie', 'jacket'],

  office: ['office', 'desk', 'supplies', 'organizer', 'calculator'],
  desk: ['office', 'organizer', 'supplies'],

  sport: ['sports & outdoor', 'outdoor', 'fitness', 'gym', 'active', 'ball'],
  outdoor: ['sports & outdoor', 'sport', 'fitness', 'camping'],
  fitness: ['sports & outdoor', 'sport', 'gym', 'active'],

  travel: ['personal & travel', 'luggage', 'passport', 'wallet', 'personal'],
  wallet: ['personal & travel', 'card holder', 'purse', 'travel'],
  umbrella: ['personal & travel', 'rain', 'parasol'],

  keychain: ['keychains & tools', 'keyring', 'key holder', 'keyholder', 'bachmann'],
  keyring: ['keychains & tools', 'keychain', 'key holder'],
  tool: ['keychains & tools', 'keychain', 'multi', 'toolpen'],

  xmas: ['kids & xmas', 'christmas', 'holiday', 'seasonal', 'ornament', 'kids'],
  christmas: ['kids & xmas', 'xmas', 'holiday', 'ornament'],
  kids: ['kids & xmas', 'xmas', 'children', 'toy'],
}

export function expandSearchQuery(query: string): string[] {
  const lower = query.toLowerCase().trim()
  const words = lower.split(/\s+/)
  const expanded = new Set<string>([lower])

  words.forEach(word => {
    expanded.add(word)
    const synonyms = searchSynonyms[word] || []
    synonyms.forEach(s => expanded.add(s))
  })

  return Array.from(expanded)
}