@echo off
title Everyday Cyber AI - Security Audit Tool
color 0A

echo.
echo  ============================================
echo    Everyday Cyber AI - Security Audit Tool
echo    Website: everydaycyberai.in
echo  ============================================
echo.
echo  Starting scan... Please wait...
echo.

:: Run PowerShell with execution policy bypass
PowerShell.exe -NoProfile -ExecutionPolicy Bypass -File "%~dp0SecurityAudit.ps1"

:: If PS1 not found, run inline
if %errorlevel% NEQ 0 (
    echo.
    echo  ERROR: Could not run script.
    echo  Please contact: systemengineerbkc@gmail.com
    echo.
)

pause
