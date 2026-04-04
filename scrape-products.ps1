$html = Get-Content "shop-page.html" -Raw

# Count products by looking for unique post IDs
$postIds = [regex]::Matches($html, 'post-(\d+)') | ForEach-Object { $_.Groups[1].Value } | Select-Object -Unique
Write-Host "Unique product IDs: $($postIds.Count)"

# Look for actual product items
$items = [regex]::Matches($html, 'class="porto-tb-item product[^"]*"') | Measure-Object
Write-Host "Product items found: $($items.Count)"

# Let's extract data by looking at the srcset attributes which contain _set
$srcMatches = [regex]::Matches($html, 'src="(https://printground\.net/wp-content/uploads/[^"]*_set[^"]*)"')
Write-Host "Product images (_set): $($srcMatches.Count)"

# Extract key product info
$results = @()
$processedUrls = @{}

# Process each product image URL as a product
$count = 0
foreach ($match in $srcMatches) {
    $url = $match.Groups[1].Value
    if (-not $processedUrls.ContainsKey($url)) {
        $processedUrls[$url] = $true
        
        # Find the product ID, title, price near this image
        $pos = $html.IndexOf($url)
        $contextStart = [Math]::Max(0, $pos - 5000)
        $context = $html.Substring($contextStart, 5000)
        
        # Extract product ID
        $idMatch = [regex]::Match($context, 'post-(\d+)')
        $id = if ($idMatch.Success) { $idMatch.Groups[1].Value } else { "unknown-$count" }
        
        # Extract title
        $titleMatch = [regex]::Match($context, 'data-title="([^"]+)"')
        $titleRaw = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { "" }
        
        # Decode HTML entities
        $title = $titleRaw -replace '&#(\d+);', { [char][int]$_.Groups[1].Value }
        
        # Extract SKU
        $skuMatch = [regex]::Match($context, 'data-product_sku="([^"]+)"')
        $sku = if ($skuMatch.Success) { $skuMatch.Groups[1].Value } else { "" }
        
        # Extract price
        $priceMatch = [regex]::Match($context, '<bdi>([\d.,]+)\s*<span')
        $price = if ($priceMatch.Success) { $priceMatch.Groups[1].Value } else { "0" }
        
        # Extract category
        $catMatch = [regex]::Match($context, 'class="porto-tb-meta[^"]*"[^>]*>([^<]+)')
        $cat = if ($catMatch.Success) { $catMatch.Groups[1].Value.Trim() } else { "" }
        
        if ($title -and $url) {
            $results += [PSCustomObject]@{
                id = $id
                sku = $sku
                name = $title
                price = $price
                image = $url
                category = $cat
            }
        }
        $count++
    }
}

Write-Host "`nExtracted $($results.Count) unique products"

# Show first 5
$results | Select-Object -First 5 | Format-Table -AutoSize

# Save to JSON
$json = $results | ConvertTo-Json -Depth 10
$json | Out-File "products-raw.json" -Encoding UTF8
Write-Host "`nSaved to products-raw.json"
