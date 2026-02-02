# ANBU Docker Start Script for Windows PowerShell
# This script starts Docker with Windows-optimized settings

Write-Host "🐳 ANBU Docker Launcher" -ForegroundColor Cyan
Write-Host "=======================" -ForegroundColor Cyan
Write-Host ""

# Check if Docker is running
try {
    docker info | Out-Null
    Write-Host "✅ Docker is running" -ForegroundColor Green
} catch {
    Write-Host "❌ Docker is not running. Please start Docker Desktop." -ForegroundColor Red
    exit 1
}

# Check if running in WSL
$isWSL = $false
if (Test-Path "/proc/version") {
    $versionInfo = Get-Content "/proc/version"
    if ($versionInfo -match "Microsoft|WSL") {
        $isWSL = $true
        Write-Host "📍 Running in WSL - optimal performance!" -ForegroundColor Green
    }
}

# Install dependencies if needed
if (-not (Test-Path "node_modules")) {
    Write-Host "📦 Installing dependencies..." -ForegroundColor Yellow
    pnpm install
}

# Start with Windows-optimized settings
Write-Host "🚀 Starting with Windows-optimized settings..." -ForegroundColor Cyan
docker-compose -f docker-compose.yml -f docker-compose.windows.yml up landing