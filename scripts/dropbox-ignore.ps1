# PowerShell Script to Configure Dropbox Ignore for ANBU Landing Page
# This uses Dropbox's native ignore feature which is better than Selective Sync
# Run this script as Administrator in PowerShell

Write-Host "🔧 Configuring Dropbox Ignore for ANBU Landing Page" -ForegroundColor Cyan
Write-Host "=====================================================" -ForegroundColor Cyan
Write-Host ""

# Get the project path
$projectPath = "C:\Users\Rosa\Documents\Dropbox\Projects\ANBU_Landing_Page"

# Folders to ignore (they stay local but don't sync)
$foldersToIgnore = @(
    "node_modules",
    ".next",
    ".turbo",
    ".cache",
    ".pnpm",
    "dist",
    "build",
    "out",
    "apps\landing\node_modules",
    "apps\landing\.next",
    "apps\docs-hub\node_modules",
    "apps\solutions-portal\node_modules"
)

Write-Host "📁 Setting Dropbox ignore for development folders..." -ForegroundColor Yellow
Write-Host ""

foreach ($folder in $foldersToIgnore) {
    $fullPath = Join-Path $projectPath $folder
    
    if (Test-Path $fullPath) {
        try {
            # Set the Dropbox ignored attribute
            Set-Content -Path $fullPath -Stream com.dropbox.ignored -Value 1
            Write-Host "✅ Ignored: $folder" -ForegroundColor Green
        } catch {
            Write-Host "❌ Failed to ignore: $folder" -ForegroundColor Red
            Write-Host "   Error: $_" -ForegroundColor Red
        }
    } else {
        Write-Host "⏭️  Skipped (doesn't exist): $folder" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host "✨ Configuration complete!" -ForegroundColor Green
Write-Host ""
Write-Host "📝 Important Notes:" -ForegroundColor Cyan
Write-Host "- Ignored folders stay on your computer but don't sync to Dropbox" -ForegroundColor White
Write-Host "- Each machine maintains its own node_modules (platform-specific)" -ForegroundColor White
Write-Host "- Run 'pnpm install' on each machine after cloning" -ForegroundColor White
Write-Host "- Use 'pnpm platform:setup' for easy cross-platform switching" -ForegroundColor White
Write-Host ""

# Check current status
Write-Host "📊 Current folder sizes:" -ForegroundColor Yellow
$nodeModulesPath = Join-Path $projectPath "node_modules"
if (Test-Path $nodeModulesPath) {
    $size = (Get-ChildItem $nodeModulesPath -Recurse | Measure-Object -Property Length -Sum).Sum / 1MB
    Write-Host "   node_modules: $([math]::Round($size, 2)) MB" -ForegroundColor White
}

Write-Host ""
Write-Host "🚀 Ready to switch to your MacBook!" -ForegroundColor Green
Write-Host "   On Mac, run: pnpm platform:setup" -ForegroundColor Cyan