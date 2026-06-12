@echo off
title Everyday Cyber AI - Network Diagnostic
color 0A
echo.
echo  ============================================
echo    Everyday Cyber AI - Network Diagnostic
echo    Website: everydaycyberai.in
echo  ============================================
echo.
echo  Running diagnostics...
echo.

PowerShell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0NetworkDiagnostic.ps1"

pause
