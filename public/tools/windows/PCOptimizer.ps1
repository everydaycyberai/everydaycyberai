# ============================================================
#  Everyday Cyber AI — PC Optimizer & Cleaner v1.0
#  Website: https://everydaycyberai.in
#  Safely cleans temp files, fixes common issues, speeds up PC
# ============================================================
# HOW TO RUN:
#   Right-click > "Run with PowerShell" (as Administrator)
# ============================================================

$ErrorActionPreference = "SilentlyContinue"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Everyday Cyber AI — PC Optimizer v1.0   " -ForegroundColor Cyan
Write-Host "  Website: everydaycyberai.in              " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

$TotalFreed = 0

function CleanFolder($path, $label) {
    if (Test-Path $path) {
        $before = (Get-ChildItem $path -Recurse -ErrorAction SilentlyContinue | Measure-Object -Property Length -Sum).Sum
        Get-ChildItem $path -Recurse -ErrorAction SilentlyContinue | Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
        $freed = [math]::Round($before/1MB, 1)
        $script:TotalFreed += $freed
        Write-Host "  [CLEANED] $label — $freed MB freed" -ForegroundColor Green
    }
}

Write-Host "Step 1: Cleaning temporary files..." -ForegroundColor Yellow
CleanFolder "$env:TEMP" "User Temp Files"
CleanFolder "C:\Windows\Temp" "Windows Temp Files"
CleanFolder "C:\Windows\Prefetch" "Prefetch Cache"

Write-Host ""
Write-Host "Step 2: Clearing browser caches..." -ForegroundColor Yellow
CleanFolder "$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache" "Chrome Cache"
CleanFolder "$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache" "Edge Cache"
Write-Host "  [INFO] Firefox cache must be cleared manually (browser is open)" -ForegroundColor Gray

Write-Host ""
Write-Host "Step 3: Cleaning Windows Update cache..." -ForegroundColor Yellow
Stop-Service -Name wuauserv -Force -ErrorAction SilentlyContinue
CleanFolder "C:\Windows\SoftwareDistribution\Download" "Windows Update Cache"
Start-Service -Name wuauserv -ErrorAction SilentlyContinue
Write-Host "  [DONE] Windows Update service restarted" -ForegroundColor Green

Write-Host ""
Write-Host "Step 4: Clearing DNS cache..." -ForegroundColor Yellow
ipconfig /flushdns | Out-Null
Write-Host "  [DONE] DNS cache cleared" -ForegroundColor Green

Write-Host ""
Write-Host "Step 5: Emptying Recycle Bin..." -ForegroundColor Yellow
Clear-RecycleBin -Force -ErrorAction SilentlyContinue
Write-Host "  [DONE] Recycle Bin emptied" -ForegroundColor Green

Write-Host ""
Write-Host "Step 6: Checking disk health..." -ForegroundColor Yellow
$Disks = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"
foreach ($disk in $Disks) {
    $FreeGB  = [math]::Round($disk.FreeSpace/1GB, 1)
    $TotalGB = [math]::Round($disk.Size/1GB, 1)
    $UsedPct = [math]::Round((($disk.Size - $disk.FreeSpace) / $disk.Size) * 100)
    $status  = if ($UsedPct -gt 90) {"⚠ WARNING"} elseif ($UsedPct -gt 75) {"OK"} else {"GOOD"}
    $color   = if ($UsedPct -gt 90) {"Red"} elseif ($UsedPct -gt 75) {"Yellow"} else {"Green"}
    Write-Host "  Drive $($disk.DeviceID): $FreeGB GB free / $TotalGB GB total ($UsedPct% used) — $status" -ForegroundColor $color
}

Write-Host ""
Write-Host "Step 7: Checking startup programs..." -ForegroundColor Yellow
$StartupHKCU = Get-ItemProperty "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" 2>$null
$StartupHKLM = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" 2>$null
$allStartup = @()
if ($StartupHKCU) { $StartupHKCU.PSObject.Properties | Where-Object {$_.Name -notmatch "^PS"} | ForEach-Object { $allStartup += $_.Name } }
if ($StartupHKLM) { $StartupHKLM.PSObject.Properties | Where-Object {$_.Name -notmatch "^PS"} | ForEach-Object { $allStartup += $_.Name } }
Write-Host "  Found $($allStartup.Count) startup programs: $($allStartup -join ', ')" -ForegroundColor $(if ($allStartup.Count -gt 10) {"Yellow"} else {"Green"})
if ($allStartup.Count -gt 8) {
    Write-Host "  TIP: Too many startup programs slow down boot. Use Task Manager > Startup to disable unnecessary ones." -ForegroundColor Yellow
}

Write-Host ""
Write-Host "Step 8: Checking RAM usage..." -ForegroundColor Yellow
$OS = Get-CimInstance Win32_OperatingSystem
$TotalRAM = [math]::Round($OS.TotalVisibleMemorySize/1MB, 1)
$FreeRAM  = [math]::Round($OS.FreePhysicalMemory/1MB, 1)
$UsedRAM  = [math]::Round($TotalRAM - $FreeRAM, 1)
$RAMPct   = [math]::Round(($UsedRAM/$TotalRAM)*100)
$ramColor = if ($RAMPct -gt 85) {"Red"} elseif ($RAMPct -gt 70) {"Yellow"} else {"Green"}
Write-Host "  RAM: $UsedRAM GB used / $TotalRAM GB total ($RAMPct% used)" -ForegroundColor $ramColor

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  OPTIMIZATION COMPLETE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Total Space Freed: $([math]::Round($TotalFreed, 1)) MB" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Additional Tips:" -ForegroundColor Yellow
Write-Host "  1. Restart your PC for best performance" -ForegroundColor White
Write-Host "  2. Run Disk Cleanup (search in Start menu)" -ForegroundColor White
Write-Host "  3. Disable unused startup programs in Task Manager" -ForegroundColor White
Write-Host "  4. Uninstall programs you don't use" -ForegroundColor White
Write-Host ""
Write-Host "  Visit everydaycyberai.in for more free tools!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
