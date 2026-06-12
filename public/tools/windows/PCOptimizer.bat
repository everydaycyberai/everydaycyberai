@echo off
title Everyday Cyber AI - PC Optimizer
color 0B
echo.
echo ============================================
echo   Everyday Cyber AI - PC Optimizer v1.0
echo   Website: everydaycyberai.in
echo ============================================
echo.
echo This tool will safely clean your PC.
echo Press any key to start...
pause > nul

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& {
    $ErrorActionPreference = 'SilentlyContinue'
    $TotalFreed = 0

    function Clean($path, $label) {
        if (Test-Path $path) {
            $before = (Get-ChildItem $path -Recurse -EA SilentlyContinue | Measure-Object -Property Length -Sum).Sum
            Get-ChildItem $path -Recurse -EA SilentlyContinue | Remove-Item -Force -Recurse -EA SilentlyContinue
            $mb = [math]::Round($before/1MB, 1)
            $script:TotalFreed += $mb
            Write-Host \"  [CLEANED] $label — $mb MB freed\" -ForegroundColor Green
        } else {
            Write-Host \"  [SKIP] $label — folder not found\" -ForegroundColor Gray
        }
    }

    Write-Host ''
    Write-Host 'Step 1: Cleaning temporary files...' -ForegroundColor Yellow
    Clean `$env:TEMP 'User Temp Files'
    Clean 'C:\Windows\Temp' 'Windows Temp Files'
    Clean 'C:\Windows\Prefetch' 'Prefetch Cache'

    Write-Host ''
    Write-Host 'Step 2: Clearing browser caches...' -ForegroundColor Yellow
    Clean `\$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache 'Chrome Cache'
    Clean `\$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache2 'Chrome Cache2'
    Clean `\$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache 'Edge Cache'

    Write-Host ''
    Write-Host 'Step 3: Cleaning Windows Update cache...' -ForegroundColor Yellow
    Stop-Service wuauserv -Force -EA SilentlyContinue
    Clean 'C:\Windows\SoftwareDistribution\Download' 'Windows Update Cache'
    Start-Service wuauserv -EA SilentlyContinue
    Write-Host '  [DONE] Windows Update service restarted' -ForegroundColor Green

    Write-Host ''
    Write-Host 'Step 4: Flushing DNS cache...' -ForegroundColor Yellow
    ipconfig /flushdns | Out-Null
    Write-Host '  [DONE] DNS cache flushed' -ForegroundColor Green

    Write-Host ''
    Write-Host 'Step 5: Emptying Recycle Bin...' -ForegroundColor Yellow
    Clear-RecycleBin -Force -EA SilentlyContinue
    Write-Host '  [DONE] Recycle Bin emptied' -ForegroundColor Green

    Write-Host ''
    Write-Host 'Step 6: Disk status...' -ForegroundColor Yellow
    foreach (`$d in (Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3')) {
        `$free = [math]::Round(`$d.FreeSpace/1GB,1)
        `$total = [math]::Round(`$d.Size/1GB,1)
        `$pct = [math]::Round(((`$d.Size-`$d.FreeSpace)/`$d.Size)*100)
        `$color = if (`$pct -gt 90) {'Red'} elseif (`$pct -gt 75) {'Yellow'} else {'Green'}
        Write-Host \"  Drive `$(`$d.DeviceID) — `$free GB free / `$total GB (`$pct% used)\" -ForegroundColor `$color
    }

    Write-Host ''
    Write-Host 'Step 7: RAM usage...' -ForegroundColor Yellow
    `$OS = Get-CimInstance Win32_OperatingSystem
    `$total = [math]::Round(`$OS.TotalVisibleMemorySize/1MB,1)
    `$free = [math]::Round(`$OS.FreePhysicalMemory/1MB,1)
    `$used = [math]::Round(`$total - `$free,1)
    `$pct = [math]::Round((`$used/`$total)*100)
    Write-Host \"  RAM: `$used GB used / `$total GB (`$pct%)\" -ForegroundColor `$(if (`$pct -gt 85) {'Red'} elseif (`$pct -gt 70) {'Yellow'} else {'Green'})

    Write-Host ''
    Write-Host '============================================' -ForegroundColor Green
    Write-Host '  OPTIMIZATION COMPLETE!' -ForegroundColor Green
    Write-Host \"  Total Freed: `$([math]::Round(`$TotalFreed,1)) MB\" -ForegroundColor Cyan
    Write-Host '============================================' -ForegroundColor Green
    Write-Host ''
    Write-Host '  Tips:' -ForegroundColor Yellow
    Write-Host '  1. Restart your PC for best results' -ForegroundColor White
    Write-Host '  2. Open Task Manager > Startup to disable slow apps' -ForegroundColor White
    Write-Host '  3. Visit everydaycyberai.in for more free tools!' -ForegroundColor Cyan
    Write-Host ''
}"

echo.
pause
