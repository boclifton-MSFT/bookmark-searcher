$source = "./icons", "./popup", "./manifest.json"
$destination = "./dist/BookmarkSearcher.zip"

Write-Host "Creating zip file $destination..." -NoNewline -ForegroundColor Green
Compress-Archive -LiteralPath $source -DestinationPath $destination -CompressionLevel Optimal -Force
Write-Host "Done" -ForegroundColor Green