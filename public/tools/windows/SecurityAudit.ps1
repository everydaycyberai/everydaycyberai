# ============================================================
#  Everyday Cyber AI — Windows Security Audit Tool v2.0
#  Website: https://everydaycyberai.in
#  Free Tool — Do not redistribute without permission
# ============================================================
# HOW TO RUN:
#   Right-click this file > "Run with PowerShell"
#   OR open PowerShell as Admin and run:
#   Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass
#   .\SecurityAudit.ps1
# ============================================================

$ErrorActionPreference = "SilentlyContinue"
$ReportPath = "$env:USERPROFILE\Desktop\SecurityAudit_$(Get-Date -Format 'yyyyMMdd_HHmm').html"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Everyday Cyber AI - Security Audit Tool  " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Website: everydaycyberai.in              " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Scanning your system... Please wait..." -ForegroundColor Yellow
Write-Host ""

# ── Collect System Info ──────────────────────────────────────
$OS           = Get-CimInstance Win32_OperatingSystem
$CS           = Get-CimInstance Win32_ComputerSystem
$BIOS         = Get-CimInstance Win32_BIOS
$CPU          = Get-CimInstance Win32_Processor
$Disks        = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"
$RAM_GB       = [math]::Round($CS.TotalPhysicalMemory/1GB, 1)
$OSBuild      = $OS.BuildNumber
$LastBoot     = $OS.LastBootUpTime
$Uptime       = (Get-Date) - $LastBoot

# ── Security Checks ──────────────────────────────────────────

# 1. Windows Defender
$DefenderStatus  = Get-MpComputerStatus
$AVEnabled       = $DefenderStatus.AntivirusEnabled
$RealTimeEnabled = $DefenderStatus.RealTimeProtectionEnabled
$AVUpToDate      = $DefenderStatus.AntivirusSignatureAge -le 3

# 2. Firewall
$FW = Get-NetFirewallProfile
$FWDomain  = ($FW | Where-Object {$_.Name -eq "Domain"}).Enabled
$FWPrivate = ($FW | Where-Object {$_.Name -eq "Private"}).Enabled
$FWPublic  = ($FW | Where-Object {$_.Name -eq "Public"}).Enabled

# 3. Windows Update
$UpdateSession  = New-Object -ComObject Microsoft.Update.Session
$UpdateSearcher = $UpdateSession.CreateUpdateSearcher()
$PendingUpdates = 0
try {
    $SearchResult   = $UpdateSearcher.Search("IsInstalled=0 and Type='Software'")
    $PendingUpdates = $SearchResult.Updates.Count
} catch {}

# 4. BitLocker
$BitLocker = Get-BitLockerVolume -MountPoint "C:" 2>$null
$BitLockerStatus = if ($BitLocker) { $BitLocker.ProtectionStatus } else { "Unknown" }

# 5. Password Policy
$SecPolicy = net accounts 2>$null
$MaxPwAge  = ($SecPolicy | Where-Object { $_ -match "Maximum password age" }) -replace "\D+",""
$MinPwLen  = ($SecPolicy | Where-Object { $_ -match "Minimum password length" }) -replace "\D+",""
$LockThresh= ($SecPolicy | Where-Object { $_ -match "Lockout threshold" }) -replace "\D+",""

# 6. Remote Desktop
$RDPReg    = Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" 2>$null
$RDPEnabled = $RDPReg.fDenyTSConnections -eq 0

# 7. Auto-run USB
$AutoRunReg = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\Explorer" -Name "NoDriveTypeAutoRun" 2>$null
$AutoRunDisabled = $AutoRunReg.NoDriveTypeAutoRun -eq 255

# 8. UAC
$UACReg     = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "EnableLUA" 2>$null
$UACEnabled = $UACReg.EnableLUA -eq 1

# 9. Shared Folders
$Shares = Get-SmbShare | Where-Object { $_.Name -notmatch "^(ADMIN|IPC|C|D|E|PRINT)\$" }

# 10. Open Ports (common dangerous ones)
$OpenPorts = @()
$DangerousPorts = @{
    21="FTP"; 23="Telnet"; 135="RPC"; 139="NetBIOS";
    445="SMB"; 3389="Remote Desktop"; 5900="VNC"; 8080="HTTP-Alt"
}
$Connections = netstat -an 2>$null
foreach ($port in $DangerousPorts.Keys) {
    if ($Connections -match ":$port\s") {
        $OpenPorts += "$port ($($DangerousPorts[$port]))"
    }
}

# 11. Admin Users
$AdminGroup = net localgroup administrators 2>$null
$AdminUsers = $AdminGroup | Where-Object { $_ -notmatch "^(Alias|Members|The command|--|$)" } | Select-Object -Skip 1

# 12. Last Windows Update Date
$LastUpdate = (Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 1).InstalledOn

# 13. Startup Programs
$StartupHKCU = Get-ItemProperty "HKCU:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" 2>$null
$StartupHKLM = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Run" 2>$null
$StartupCount = ($StartupHKCU.PSObject.Properties | Where-Object {$_.Name -notmatch "^PS"}).Count +
                ($StartupHKLM.PSObject.Properties | Where-Object {$_.Name -notmatch "^PS"}).Count

# 14. Screen Lock Timeout
$ScreenTimeout = powercfg /query SCHEME_CURRENT SUB_VIDEO VIDEOIDLE 2>$null
$ScreenLockSet = $ScreenTimeout -match "Current AC Power Setting Index: 0x0000"

# ── Calculate Score ──────────────────────────────────────────
$Score = 0
$MaxScore = 100

if ($AVEnabled)                { $Score += 12 }
if ($RealTimeEnabled)          { $Score += 10 }
if ($AVUpToDate)               { $Score += 8  }
if ($FWPublic)                 { $Score += 10 }
if ($FWPrivate)                { $Score += 5  }
if ($PendingUpdates -eq 0)     { $Score += 10 }
if ($BitLockerStatus -eq "On") { $Score += 10 }
if ($UACEnabled)               { $Score += 8  }
if (!$RDPEnabled)              { $Score += 8  }
if ($AutoRunDisabled)          { $Score += 5  }
if ([int]$MinPwLen -ge 8)      { $Score += 7  }
if ($OpenPorts.Count -eq 0)    { $Score += 7  }

$Grade = if ($Score -ge 90) {"A+ Excellent"} elseif ($Score -ge 75) {"A Good"} elseif ($Score -ge 60) {"B Fair"} elseif ($Score -ge 40) {"C Weak"} else {"D Danger"}
$GradeColor = if ($Score -ge 75) {"#22c55e"} elseif ($Score -ge 50) {"#eab308"} else {"#ef4444"}

Write-Host "Scan complete! Generating HTML report..." -ForegroundColor Green

# ── Generate HTML Report ──────────────────────────────────────
function CheckRow($label, $status, $value, $recommendation) {
    $icon  = if ($status -eq "pass") { "✅" } elseif ($status -eq "warn") { "⚠️" } else { "❌" }
    $color = if ($status -eq "pass") { "#22c55e" } elseif ($status -eq "warn") { "#eab308" } else { "#ef4444" }
    $bg    = if ($status -eq "pass") { "rgba(34,197,94,0.05)" } elseif ($status -eq "warn") { "rgba(234,179,8,0.05)" } else { "rgba(239,68,68,0.05)" }
    return @"
<tr style="background:$bg; border-bottom:1px solid #1e293b;">
  <td style="padding:12px 16px; font-size:14px; color:#e2e8f0;">$icon $label</td>
  <td style="padding:12px 16px; font-size:14px; font-weight:600; color:$color;">$value</td>
  <td style="padding:12px 16px; font-size:13px; color:#94a3b8;">$recommendation</td>
</tr>
"@
}

$HTML = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Security Audit Report — $(Get-Date -Format 'dd MMM yyyy HH:mm')</title>
<style>
  * { margin:0; padding:0; box-sizing:border-box; }
  body { font-family: 'Segoe UI', Arial, sans-serif; background:#0a1628; color:#e2e8f0; min-height:100vh; }
  .header { background:linear-gradient(135deg,#0f2844,#0a1628); border-bottom:2px solid #22d3ee; padding:32px 40px; }
  .logo { color:#22d3ee; font-size:22px; font-weight:800; margin-bottom:4px; }
  .logo-sub { color:#64748b; font-size:13px; }
  h1 { font-size:28px; font-weight:700; margin-top:16px; }
  .date { color:#64748b; font-size:13px; margin-top:4px; }
  .container { max-width:900px; margin:0 auto; padding:32px 24px; }
  .score-card { background:linear-gradient(135deg,rgba(34,211,238,0.1),rgba(59,130,246,0.1)); border:1px solid rgba(34,211,238,0.3); border-radius:20px; padding:32px; text-align:center; margin-bottom:32px; }
  .score-num { font-size:80px; font-weight:900; color:$GradeColor; line-height:1; }
  .score-label { font-size:22px; font-weight:700; color:#fff; margin-top:8px; }
  .score-grade { display:inline-block; background:rgba(34,211,238,0.1); border:1px solid rgba(34,211,238,0.3); color:#22d3ee; padding:4px 16px; border-radius:20px; font-size:14px; margin-top:8px; }
  .score-bar-bg { background:#1e293b; border-radius:10px; height:12px; margin:16px auto; max-width:400px; overflow:hidden; }
  .score-bar { background:linear-gradient(90deg,$GradeColor,#22d3ee); height:100%; border-radius:10px; width:$($Score)%; transition:width 1s; }
  .section { background:rgba(15,40,68,0.5); border:1px solid #1e293b; border-radius:16px; margin-bottom:24px; overflow:hidden; }
  .section-title { background:rgba(34,211,238,0.08); padding:14px 20px; font-size:15px; font-weight:700; color:#22d3ee; border-bottom:1px solid #1e293b; }
  table { width:100%; border-collapse:collapse; }
  .sys-grid { display:grid; grid-template-columns:1fr 1fr; gap:12px; padding:16px; }
  .sys-item { background:#0a1628; border:1px solid #1e293b; border-radius:10px; padding:12px 16px; }
  .sys-label { color:#64748b; font-size:11px; text-transform:uppercase; letter-spacing:0.5px; }
  .sys-value { color:#e2e8f0; font-size:14px; font-weight:600; margin-top:2px; }
  .footer { text-align:center; padding:32px; color:#475569; font-size:12px; border-top:1px solid #1e293b; margin-top:32px; }
  .footer a { color:#22d3ee; text-decoration:none; }
  .alert-critical { background:rgba(239,68,68,0.1); border:1px solid rgba(239,68,68,0.3); border-radius:12px; padding:16px 20px; margin-bottom:12px; }
  .alert-warn { background:rgba(234,179,8,0.1); border:1px solid rgba(234,179,8,0.3); border-radius:12px; padding:16px 20px; margin-bottom:12px; }
  .alerts-section { margin-bottom:24px; }
  @media print { body{background:#fff;color:#000;} .score-card{border-color:#ccc;} }
</style>
</head>
<body>
<div class="header">
  <div class="logo">🛡️ Everyday Cyber AI</div>
  <div class="logo-sub">everydaycyberai.in — Free Security Tools</div>
  <h1>Windows Security Audit Report</h1>
  <div class="date">Generated: $(Get-Date -Format 'dddd, dd MMMM yyyy — HH:mm') | Computer: $($CS.Name) | User: $($env:USERNAME)</div>
</div>

<div class="container">

<!-- Score Card -->
<div class="score-card">
  <div class="score-num">$Score</div>
  <div class="score-label">Security Score / 100</div>
  <div class="score-grade">$Grade</div>
  <div class="score-bar-bg"><div class="score-bar"></div></div>
  <p style="color:#94a3b8; font-size:13px; margin-top:12px;">Based on $MaxScore security checks across Windows Defender, Firewall, Updates, BitLocker, Passwords and more</p>
</div>

<!-- Critical Alerts -->
$(if (!$AVEnabled -or !$RealTimeEnabled -or $FWPublic -eq $false -or !$UACEnabled) {
'<div class="alerts-section"><div class="section-title">🚨 Critical Issues — Fix Immediately</div>'
if (!$AVEnabled)       { '<div class="alert-critical">❌ <strong>Windows Defender is DISABLED</strong> — Your PC has no antivirus protection. Enable it in Windows Security settings immediately.</div>' }
if (!$RealTimeEnabled) { '<div class="alert-critical">❌ <strong>Real-Time Protection is OFF</strong> — Malware can run unchecked. Enable Real-Time Protection in Windows Security.</div>' }
if ($FWPublic -eq $false) { '<div class="alert-critical">❌ <strong>Public Firewall is DISABLED</strong> — Anyone on the same network can attack your PC. Enable Windows Firewall now.</div>' }
if (!$UACEnabled)      { '<div class="alert-critical">❌ <strong>User Account Control (UAC) is OFF</strong> — Malware can silently install software. Enable UAC in Control Panel.</div>' }
'</div>'
})

$(if ($PendingUpdates -gt 0 -or $RDPEnabled) {
'<div class="alerts-section"><div class="section-title">⚠️ Warnings — Fix This Week</div>'
if ($PendingUpdates -gt 0) { "<div class='alert-warn'>⚠️ <strong>$PendingUpdates Windows Updates Pending</strong> — Security patches are missing. Go to Settings > Windows Update > Check for updates.</div>" }
if ($RDPEnabled)           { '<div class="alert-warn">⚠️ <strong>Remote Desktop is ENABLED</strong> — If not needed, disable it. Settings > System > Remote Desktop > OFF</div>' }
'</div>'
})

<!-- Security Checks Table -->
<div class="section">
<div class="section-title">🔒 Security Checks</div>
<table>
$(CheckRow "Windows Defender (Antivirus)" (if ($AVEnabled) {"pass"} else {"fail"}) (if ($AVEnabled) {"Enabled ✓"} else {"DISABLED"}) (if (!$AVEnabled) {"Open Windows Security and enable Virus & Threat Protection"} else {"Good — keep enabled"}))
$(CheckRow "Real-Time Protection" (if ($RealTimeEnabled) {"pass"} else {"fail"}) (if ($RealTimeEnabled) {"Active ✓"} else {"OFF"}) (if (!$RealTimeEnabled) {"Settings > Windows Security > Virus Protection > Real-Time ON"} else {"Good"}))
$(CheckRow "Antivirus Definitions" (if ($AVUpToDate) {"pass"} else {"warn"}) (if ($AVUpToDate) {"Up to date ✓"} else {"$($DefenderStatus.AntivirusSignatureAge) days old"}) (if (!$AVUpToDate) {"Open Windows Security > Update > Update definitions"} else {"Good"}))
$(CheckRow "Windows Firewall (Public)" (if ($FWPublic) {"pass"} else {"fail"}) (if ($FWPublic) {"Enabled ✓"} else {"DISABLED"}) (if (!$FWPublic) {"Control Panel > Windows Firewall > Turn on for Public networks"} else {"Good"}))
$(CheckRow "Windows Firewall (Private)" (if ($FWPrivate) {"pass"} else {"warn"}) (if ($FWPrivate) {"Enabled ✓"} else {"Disabled"}) (if (!$FWPrivate) {"Enable Windows Firewall for Private networks too"} else {"Good"}))
$(CheckRow "Pending Windows Updates" (if ($PendingUpdates -eq 0) {"pass"} elseif ($PendingUpdates -le 5) {"warn"} else {"fail"}) (if ($PendingUpdates -eq 0) {"None pending ✓"} else {"$PendingUpdates updates waiting"}) (if ($PendingUpdates -gt 0) {"Settings > Windows Update > Check for updates and install all"} else {"Good — system is up to date"}))
$(CheckRow "BitLocker Drive Encryption" (if ($BitLockerStatus -eq "On") {"pass"} else {"warn"}) (if ($BitLockerStatus -eq "On") {"Enabled ✓"} else {"Not enabled"}) (if ($BitLockerStatus -ne "On") {"Enable BitLocker to protect data if laptop is stolen (Windows Pro required)"} else {"Good"}))
$(CheckRow "User Account Control (UAC)" (if ($UACEnabled) {"pass"} else {"fail"}) (if ($UACEnabled) {"Enabled ✓"} else {"DISABLED"}) (if (!$UACEnabled) {"Control Panel > User Accounts > Change UAC settings > Set to Default"} else {"Good"}))
$(CheckRow "Remote Desktop (RDP)" (if (!$RDPEnabled) {"pass"} else {"warn"}) (if (!$RDPEnabled) {"Disabled ✓"} else {"ENABLED"}) (if ($RDPEnabled) {"If not needed: Settings > System > Remote Desktop > Turn off"} else {"Good — RDP is off"}))
$(CheckRow "USB AutoRun" (if ($AutoRunDisabled) {"pass"} else {"warn"}) (if ($AutoRunDisabled) {"Disabled ✓"} else {"Enabled"}) (if (!$AutoRunDisabled) {"Disable AutoRun to prevent USB malware — search 'AutoPlay' in Settings > turn off"} else {"Good"}))
$(CheckRow "Min Password Length" (if ([int]$MinPwLen -ge 8) {"pass"} else {"warn"}) "Min: $MinPwLen characters" (if ([int]$MinPwLen -lt 8) {"Run: net accounts /minpwlen:8 as Administrator"} else {"Good"}))
$(CheckRow "Account Lockout" (if ([int]$LockThresh -gt 0) {"pass"} else {"warn"}) (if ([int]$LockThresh -gt 0) {"$LockThresh attempts ✓"} else {"Not set"}) (if ([int]$LockThresh -eq 0) {"Set lockout: Run secpol.msc > Account Lockout Policy > Threshold: 5"} else {"Good"}))
$(CheckRow "Open Dangerous Ports" (if ($OpenPorts.Count -eq 0) {"pass"} elseif ($OpenPorts.Count -le 2) {"warn"} else {"fail"}) (if ($OpenPorts.Count -eq 0) {"None detected ✓"} else {$OpenPorts -join ", "}) (if ($OpenPorts.Count -gt 0) {"Check these services: $($OpenPorts -join ', ') — disable if not needed"} else {"Good — no dangerous ports open"}))
$(CheckRow "Non-Standard Shared Folders" (if ($Shares.Count -eq 0) {"pass"} else {"warn"}) (if ($Shares.Count -eq 0) {"None ✓"} else {"$($Shares.Count) shares: $($Shares.Name -join ', ')"}) (if ($Shares.Count -gt 0) {"Review shared folders — remove unnecessary shares"} else {"Good"}))
</table>
</div>

<!-- System Information -->
<div class="section">
<div class="section-title">💻 System Information</div>
<div class="sys-grid">
  <div class="sys-item"><div class="sys-label">Computer Name</div><div class="sys-value">$($CS.Name)</div></div>
  <div class="sys-item"><div class="sys-label">Windows Version</div><div class="sys-value">$($OS.Caption) (Build $OSBuild)</div></div>
  <div class="sys-item"><div class="sys-label">Processor</div><div class="sys-value">$($CPU.Name)</div></div>
  <div class="sys-item"><div class="sys-label">RAM</div><div class="sys-value">$RAM_GB GB</div></div>
  <div class="sys-item"><div class="sys-label">Last Boot Time</div><div class="sys-value">$(Get-Date $LastBoot -Format 'dd MMM yyyy HH:mm')</div></div>
  <div class="sys-item"><div class="sys-label">System Uptime</div><div class="sys-value">$($Uptime.Days)d $($Uptime.Hours)h $($Uptime.Minutes)m</div></div>
  <div class="sys-item"><div class="sys-label">Last Windows Update</div><div class="sys-value">$(if ($LastUpdate) { Get-Date $LastUpdate -Format 'dd MMM yyyy' } else { 'Unknown' })</div></div>
  <div class="sys-item"><div class="sys-label">Startup Programs</div><div class="sys-value">$StartupCount programs</div></div>
  $(foreach ($disk in $Disks) {
    $FreeGB  = [math]::Round($disk.FreeSpace/1GB,1)
    $TotalGB = [math]::Round($disk.Size/1GB,1)
    $UsedPct = [math]::Round((($disk.Size-$disk.FreeSpace)/$disk.Size)*100)
    "<div class='sys-item'><div class='sys-label'>Drive $($disk.DeviceID)</div><div class='sys-value'>$FreeGB GB free / $TotalGB GB ($UsedPct% used)</div></div>"
  })
</div>
</div>

<!-- Admin Users -->
<div class="section">
<div class="section-title">👤 Local Administrator Accounts</div>
<table>
$(foreach ($user in $AdminUsers) {
  if ($user.Trim() -ne "") {
    CheckRow "Admin User" (if ($user -match "Administrator") {"warn"} else {"pass"}) $user.Trim() "Review — only authorized users should have admin rights"
  }
})
</table>
</div>

<!-- Recommendations -->
<div class="section">
<div class="section-title">📋 Top Recommendations for You</div>
<table>
$(
$recs = @()
if (!$AVEnabled)               { $recs += @{r="Enable Windows Defender immediately"; p="CRITICAL"; s="Windows Security > Virus & Threat Protection > Enable"} }
if (!$RealTimeEnabled)         { $recs += @{r="Turn on Real-Time Protection"; p="CRITICAL"; s="Windows Security > Real-Time Protection > ON"} }
if ($PendingUpdates -gt 0)     { $recs += @{r="Install $PendingUpdates pending updates"; p="HIGH"; s="Settings > Windows Update > Install All"} }
if ($BitLockerStatus -ne "On") { $recs += @{r="Enable BitLocker encryption"; p="MEDIUM"; s="Start > BitLocker Drive Encryption > Turn on"} }
if ($RDPEnabled)               { $recs += @{r="Disable Remote Desktop if not needed"; p="MEDIUM"; s="Settings > System > Remote Desktop > OFF"} }
if (!$AutoRunDisabled)         { $recs += @{r="Disable USB AutoRun"; p="MEDIUM"; s="Settings > Bluetooth & devices > AutoPlay > OFF"} }
if ([int]$MinPwLen -lt 8)      { $recs += @{r="Set minimum password length to 8+"; p="MEDIUM"; s="Run as Admin: net accounts /minpwlen:8"} }
if ($recs.Count -eq 0)         { $recs += @{r="System looks good! Keep Windows updated regularly"; p="LOW"; s="Schedule monthly security checks"} }

foreach ($rec in $recs) {
    $recColor = if ($rec.p -eq "CRITICAL") {"#ef4444"} elseif ($rec.p -eq "HIGH") {"#f97316"} elseif ($rec.p -eq "MEDIUM") {"#eab308"} else {"#22c55e"}
    "<tr style='border-bottom:1px solid #1e293b;'>
    <td style='padding:12px 16px; font-size:14px; color:#e2e8f0;'>$($rec.r)</td>
    <td style='padding:12px 16px;'><span style='background:rgba(0,0,0,0.3);color:$recColor;border:1px solid $recColor;padding:2px 10px;border-radius:12px;font-size:11px;font-weight:700;'>$($rec.p)</span></td>
    <td style='padding:12px 16px; font-size:12px; color:#64748b;'>$($rec.s)</td>
    </tr>"
}
)
</table>
</div>

</div>

<div class="footer">
  <p>🛡️ Generated by <a href="https://everydaycyberai.in">Everyday Cyber AI</a> — Free Security Tools for India</p>
  <p style="margin-top:4px;">For IT support, cyber security help or any questions: <a href="https://wa.me/918454031225">WhatsApp: +91 84540 31225</a></p>
  <p style="margin-top:8px; font-size:11px; color:#334155;">This report is for informational purposes only. Visit everydaycyberai.in for more free security tools.</p>
</div>
</body>
</html>
"@

# Save report
$HTML | Out-File -FilePath $ReportPath -Encoding UTF8

# Open in browser
Start-Process $ReportPath

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  SCAN COMPLETE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Security Score: $Score / 100 ($Grade)" -ForegroundColor $(if ($Score -ge 75) {"Green"} elseif ($Score -ge 50) {"Yellow"} else {"Red"})
Write-Host "  Pending Updates: $PendingUpdates" -ForegroundColor $(if ($PendingUpdates -eq 0) {"Green"} else {"Red"})
Write-Host "  Report saved to: Desktop" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Report is opening in your browser..." -ForegroundColor Yellow
Write-Host "  Visit everydaycyberai.in for more free tools!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
