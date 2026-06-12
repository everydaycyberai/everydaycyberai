@echo off
title Everyday Cyber AI - PC Optimizer
color 0A
echo.
echo  ============================================
echo    Everyday Cyber AI - PC Optimizer v1.0
echo    Website: everydaycyberai.in
echo  ============================================
echo.
echo  Press any key to start cleaning...
pause > nul

PowerShell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0PCOptimizer.ps1"

pause
