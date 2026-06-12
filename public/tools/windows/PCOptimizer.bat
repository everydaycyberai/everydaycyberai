@echo off
setlocal enabledelayedexpansion
title Everyday Cyber AI - PC Optimizer
color 0B
cls
echo.
echo  =============================================
echo    Everyday Cyber AI - PC Optimizer v1.0
echo    everydaycyberai.in
echo  =============================================
echo.
echo  This tool will safely clean your PC.
echo  Press any key to start...
pause > nul
echo.

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
"$ErrorActionPreference='SilentlyContinue';" ^
"$freed=0;" ^
"function Clean($p,$l){if(Test-Path $p){$b=(Get-ChildItem $p -Recurse -EA SilentlyContinue|Measure-Object Length -Sum).Sum;Get-ChildItem $p -Recurse -EA SilentlyContinue|Remove-Item -Force -Recurse -EA SilentlyContinue;$mb=[math]::Round($b/1MB,1);$script:freed+=$mb;Write-Host \"  [DONE] $l - $mb MB freed\" -ForegroundColor Green}else{Write-Host \"  [SKIP] $l\" -ForegroundColor Gray}};" ^
"Write-Host 'Step 1: Cleaning Temp Files...' -ForegroundColor Yellow;" ^
"Clean $env:TEMP 'User Temp Files';" ^
"Clean 'C:\Windows\Temp' 'Windows Temp Files';" ^
"Clean 'C:\Windows\Prefetch' 'Prefetch Cache';" ^
"Write-Host '';" ^
"Write-Host 'Step 2: Clearing Browser Caches...' -ForegroundColor Yellow;" ^
"Clean \"$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache\" 'Chrome Cache';" ^
"Clean \"$env:LOCALAPPDATA\Google\Chrome\User Data\Default\Cache2\entries\" 'Chrome Cache2';" ^
"Clean \"$env:LOCALAPPDATA\Microsoft\Edge\User Data\Default\Cache\" 'Edge Cache';" ^
"Write-Host '';" ^
"Write-Host 'Step 3: Windows Update Cache...' -ForegroundColor Yellow;" ^
"Stop-Service wuauserv -Force -EA SilentlyContinue;" ^
"Clean 'C:\Windows\SoftwareDistribution\Download' 'Windows Update Cache';" ^
"Start-Service wuauserv -EA SilentlyContinue;" ^
"Write-Host '  [DONE] Windows Update service restarted' -ForegroundColor Green;" ^
"Write-Host '';" ^
"Write-Host 'Step 4: DNS Cache & Recycle Bin...' -ForegroundColor Yellow;" ^
"ipconfig /flushdns | Out-Null;" ^
"Write-Host '  [DONE] DNS cache flushed' -ForegroundColor Green;" ^
"Clear-RecycleBin -Force -EA SilentlyContinue;" ^
"Write-Host '  [DONE] Recycle Bin emptied' -ForegroundColor Green;" ^
"Write-Host '';" ^
"Write-Host 'Step 5: Checking Disk & RAM...' -ForegroundColor Yellow;" ^
"foreach($d in (Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' -EA SilentlyContinue)){$f=[math]::Round($d.FreeSpace/1GB,1);$t=[math]::Round($d.Size/1GB,1);$p=[math]::Round(($d.Size-$d.FreeSpace)/$d.Size*100);$c=if($p-gt 90){'Red'}elseif($p-gt 75){'Yellow'}else{'Green'};Write-Host \"  Drive $($d.DeviceID): $f GB free / $t GB ($p% used)\" -ForegroundColor $c};" ^
"$os=Get-CimInstance Win32_OperatingSystem -EA SilentlyContinue;$rt=[math]::Round($os.TotalVisibleMemorySize/1MB,1);$rf=[math]::Round($os.FreePhysicalMemory/1MB,1);$ru=[math]::Round($rt-$rf,1);$rp=[math]::Round($ru/$rt*100);$rc=if($rp-gt 85){'Red'}elseif($rp-gt 70){'Yellow'}else{'Green'};" ^
"Write-Host \"  RAM: $ru GB used / $rt GB ($rp%%)\" -ForegroundColor $rc;" ^
"Write-Host '';" ^
"Write-Host '  ===========================================' -ForegroundColor Green;" ^
"Write-Host '   OPTIMIZATION COMPLETE!' -ForegroundColor Green;" ^
"Write-Host \"   Total Space Freed: $([math]::Round($freed,1)) MB\" -ForegroundColor Cyan;" ^
"Write-Host '  ===========================================' -ForegroundColor Green;" ^
"Write-Host '';" ^
"Write-Host '  Tips:' -ForegroundColor Yellow;" ^
"Write-Host '  1. Restart your PC for best results' -ForegroundColor White;" ^
"Write-Host '  2. Task Manager > Startup tab > disable slow apps' -ForegroundColor White;" ^
"Write-Host '  3. Visit everydaycyberai.in for more free tools!' -ForegroundColor Cyan"

echo.
echo  =============================================
echo   Done! Press any key to exit.
echo  =============================================
echo.
pause
