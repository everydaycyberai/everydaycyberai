# Everyday Cyber AI - PC Optimizer v1.0
$ErrorActionPreference = "SilentlyContinue"
$TotalFreed = 0

function Clean($path, $label) {
    if (Test-Path $path) {
        $before = (Get-ChildItem $path -Recurse -EA SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        Get-ChildItem $path -Recurse -EA SilentlyContinue | Remove-Item -Force -Recurse -EA SilentlyContinue
        $mb = [math]::Round($before / 1MB, 1)
        $script:TotalFreed += $mb
        Write-Host "  [CLEANED] $label - $mb MB freed" -ForegroundColor Green
    } else {
        Write-Host "  [SKIP]    $label - not found" -ForegroundColor Gray
    }
}

Write-Host ""
Write-Host " Step 1: Cleaning Temp Files..." -ForegroundColor Yellow
Clean $env:TEMP "User Temp Folder"
Clean "C:\Windows\Temp" "Windows Temp Folder"
Clean "C:\Windows\Prefetch" "Prefetch Cache"

Write-Host ""
Write-Host " Step 2: Clearing Browser Cache..." -ForegroundColor Yellow
Clean "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache" "Chrome Cache"
Clean "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache2\entries" "Chrome Cache2"
Clean "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache" "Edge Cache"

Write-Host ""
Write-Host " Step 3: Windows Update Cache..." -ForegroundColor Yellow
Stop-Service wuauserv -Force -EA SilentlyContinue
Clean "C:\Windows\SoftwareDistribution\Download" "Windows Update Cache"
Start-Service wuauserv -EA SilentlyContinue
Write-Host "  [DONE]    Windows Update service restarted" -ForegroundColor Green

Write-Host ""
Write-Host " Step 4: Flushing DNS Cache..." -ForegroundColor Yellow
ipconfig /flushdns | Out-Null
Write-Host "  [DONE]    DNS cache cleared" -ForegroundColor Green

Write-Host ""
Write-Host " Step 5: Emptying Recycle Bin..." -ForegroundColor Yellow
Clear-RecycleBin -Force -EA SilentlyContinue
Write-Host "  [DONE]    Recycle Bin emptied" -ForegroundColor Green

Write-Host ""
Write-Host " Step 6: Disk Status..." -ForegroundColor Yellow
foreach ($d in (Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3")) {
    $free  = [math]::Round($d.FreeSpace/1GB, 1)
    $total = [math]::Round($d.Size/1GB, 1)
    $pct   = [math]::Round((($d.Size - $d.FreeSpace) / $d.Size) * 100)
    $color = if ($pct -gt 90) { "Red" } elseif ($pct -gt 75) { "Yellow" } else { "Green" }
    Write-Host "  Drive $($d.DeviceID) - $free GB free / $total GB ($pct% used)" -ForegroundColor $color
}

Write-Host ""
Write-Host " Step 7: RAM Usage..." -ForegroundColor Yellow
$OS    = Get-CimInstance Win32_OperatingSystem
$total = [math]::Round($OS.TotalVisibleMemorySize / 1MB, 1)
$free  = [math]::Round($OS.FreePhysicalMemory / 1MB, 1)
$used  = [math]::Round($total - $free, 1)
$pct   = [math]::Round(($used / $total) * 100)
Write-Host "  RAM: $used GB used / $total GB ($pct%)" -ForegroundColor $(if ($pct -gt 85) {"Red"} elseif ($pct -gt 70) {"Yellow"} else {"Green"})

Write-Host ""
Write-Host " ============================================" -ForegroundColor Green
Write-Host "   OPTIMIZATION COMPLETE!" -ForegroundColor Green
Write-Host "   Total Freed: $([math]::Round($TotalFreed, 1)) MB" -ForegroundColor Cyan
Write-Host " ============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  TIP: Restart your PC for best results!" -ForegroundColor Yellow
Write-Host "  Visit: everydaycyberai.in for more free tools" -ForegroundColor Cyan
Write-Host ""
