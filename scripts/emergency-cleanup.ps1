# Emergency Cleanup Script for Dropbox Sync Issues
# Run this to quickly remove large folders that shouldn't sync

Write-Host "🚨 Emergency Cleanup for Dropbox Sync" -ForegroundColor Red
Write-Host "======================================" -ForegroundColor Red
Write-Host ""
Write-Host "This will remove node_modules and build folders to fix sync issues" -ForegroundColor Yellow
Write-Host ""

# Get current directory
$projectPath = Get-Location

# Folders to remove
$foldersToRemove = @(
    "node_modules",
    "apps\landing\node_modules",
    "apps\docs-hub\node_modules",
    "apps\solutions-portal\node_modules",
    ".next",
    "apps\landing\.next",
    ".turbo",
    "dist",
    "build"
)

$totalSaved = 0

Write-Host "🗑️  Removing problematic folders..." -ForegroundColor Yellow
Write-Host ""

foreach ($folder in $foldersToRemove) {
    $fullPath = Join-Path $projectPath $folder
    
    if (Test-Path $fullPath) {
        try {
            # Get size before deletion
            $size = (Get-ChildItem $fullPath -Recurse -ErrorAction SilentlyContinue | 
                    Measure-Object -Property Length -Sum -ErrorAction SilentlyContinue).Sum / 1MB
            
            Write-Host "  Removing: $folder ($([math]::Round($size, 2)) MB)..." -NoNewline
            
            # Force remove
            Remove-Item -Path $fullPath -Recurse -Force -ErrorAction Stop
            
            Write-Host " ✅" -ForegroundColor Green
            $totalSaved += $size
        } catch {
            Write-Host " ❌ Failed" -ForegroundColor Red
            Write-Host "    Error: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "  Skipped: $folder (doesn't exist)" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✨ Cleanup Complete!" -ForegroundColor Green
Write-Host "   Removed: $([math]::Round($totalSaved, 2)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "📋 Next Steps:" -ForegroundColor Yellow
Write-Host "1. Go to Dropbox Selective Sync settings" -ForegroundColor White
Write-Host "2. Uncheck any remaining node_modules folders" -ForegroundColor White
Write-Host "3. Click Confirm and Save" -ForegroundColor White
Write-Host "4. Resume Dropbox syncing" -ForegroundColor White
Write-Host ""
Write-Host "🐳 Then use Docker (no node_modules needed!):" -ForegroundColor Cyan
Write-Host "   pnpm docker:landing" -ForegroundColor Green
Write-Host ""
Write-Host "📱 Or if you need local development:" -ForegroundColor Yellow
Write-Host "   pnpm install" -ForegroundColor Green