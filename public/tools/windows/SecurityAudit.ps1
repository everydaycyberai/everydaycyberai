# Everyday Cyber AI - Windows Security Audit Tool v3.0
# Website: everydaycyberai.in
# Run via SecurityAudit.bat

$ErrorActionPreference = "SilentlyContinue"
$ReportPath = "$env:USERPROFILE\Desktop\SecurityAudit_$(Get-Date -Format 'yyyyMMdd_HHmm').html"

Write-Host " Scanning Windows Defender..." -ForegroundColor Yellow
$Def = Get-MpComputerStatus
$AVOn  = $Def.AntivirusEnabled
$RTOn  = $Def.RealTimeProtectionEnabled
$AVAge = $Def.AntivirusSignatureAge -le 3

Write-Host " Scanning Firewall..." -ForegroundColor Yellow
$FW     = Get-NetFirewallProfile
$FWPub  = ($FW | Where-Object {$_.Name -eq "Public"}).Enabled
$FWPriv = ($FW | Where-Object {$_.Name -eq "Private"}).Enabled

Write-Host " Checking Windows Updates..." -ForegroundColor Yellow
$PendingUpdates = 0
try {
    $US = New-Object -ComObject Microsoft.Update.Session
    $SR = $US.CreateUpdateSearcher().Search("IsInstalled=0 and Type='Software'")
    $PendingUpdates = $SR.Updates.Count
} catch {}

Write-Host " Checking BitLocker..." -ForegroundColor Yellow
$BL = Get-BitLockerVolume -MountPoint "C:" 2>$null
$BLStatus = if ($BL) { $BL.ProtectionStatus } else { "Not Available" }

Write-Host " Checking UAC and RDP..." -ForegroundColor Yellow
$UACReg = Get-ItemProperty "HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System" -Name "EnableLUA" 2>$null
$UAC = $UACReg.EnableLUA -eq 1
$RDPReg = Get-ItemProperty "HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server" -Name "fDenyTSConnections" 2>$null
$RDP = $RDPReg.fDenyTSConnections -eq 0

Write-Host " Checking Password Policy..." -ForegroundColor Yellow
$SecPolicy  = net accounts 2>$null
$MinPwLen   = (($SecPolicy | Where-Object { $_ -match "Minimum password length" }) -replace "\D+","").Trim()
$LockThresh = (($SecPolicy | Where-Object { $_ -match "Lockout threshold" }) -replace "\D+","").Trim()

Write-Host " Checking Open Ports..." -ForegroundColor Yellow
$DangerPorts = @{21="FTP";23="Telnet";135="RPC";445="SMB";3389="RDP";5900="VNC"}
$OpenPorts   = @()
$NetStat     = netstat -an 2>$null
foreach ($p in $DangerPorts.Keys) {
    if ($NetStat -match ":$p\s") { $OpenPorts += "$p/$($DangerPorts[$p])" }
}

Write-Host " Collecting System Info..." -ForegroundColor Yellow
$CS  = Get-CimInstance Win32_ComputerSystem
$OS  = Get-CimInstance Win32_OperatingSystem
$CPU = Get-CimInstance Win32_Processor
$RAM = [math]::Round($CS.TotalPhysicalMemory/1GB, 1)
$Disks = Get-CimInstance Win32_LogicalDisk -Filter "DriveType=3"
$LastUpdate = (Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 1).InstalledOn
$Uptime = (Get-Date) - $OS.LastBootUpTime

Write-Host " Calculating Security Score..." -ForegroundColor Yellow
$Score = 0
if ($AVOn)                  { $Score += 15 }
if ($RTOn)                  { $Score += 12 }
if ($AVAge)                 { $Score += 8  }
if ($FWPub)                 { $Score += 12 }
if ($FWPriv)                { $Score += 5  }
if ($PendingUpdates -eq 0)  { $Score += 12 }
if ($BLStatus -eq "On")     { $Score += 8  }
if ($UAC)                   { $Score += 10 }
if (-not $RDP)              { $Score += 10 }
if ([int]$MinPwLen -ge 8)   { $Score += 8  }

$Grade = if ($Score -ge 90) { "A+ Excellent" } `
    elseif ($Score -ge 75)  { "A  Good" } `
    elseif ($Score -ge 60)  { "B  Fair" } `
    elseif ($Score -ge 40)  { "C  Weak" } `
    else                    { "D  DANGER" }

$GC = if ($Score -ge 75) { "#22c55e" } elseif ($Score -ge 50) { "#eab308" } else { "#ef4444" }

Write-Host " Building Report..." -ForegroundColor Yellow

# Helper function for table rows
function Row($label, $ok, $val, $fix) {
    $icon = if ($ok -eq "pass") { "OK" } elseif ($ok -eq "warn") { "WARN" } else { "FAIL" }
    $clr  = if ($ok -eq "pass") { "#22c55e" } elseif ($ok -eq "warn") { "#eab308" } else { "#ef4444" }
    $bg   = if ($ok -eq "pass") { "rgba(34,197,94,0.04)" } elseif ($ok -eq "warn") { "rgba(234,179,8,0.06)" } else { "rgba(239,68,68,0.08)" }
    return "<tr style='background:$bg;border-bottom:1px solid #1e293b;'>
        <td style='padding:11px 14px;font-size:13px;color:#e2e8f0;'>$label</td>
        <td style='padding:11px 14px;font-size:12px;font-weight:700;color:$clr;white-space:nowrap;'>[$icon]</td>
        <td style='padding:11px 14px;font-size:13px;font-weight:600;color:$clr;'>$val</td>
        <td style='padding:11px 14px;font-size:12px;color:#64748b;'>$fix</td>
    </tr>"
}

# Disk rows
$diskRows = ""
foreach ($d in $Disks) {
    $free  = [math]::Round($d.FreeSpace/1GB, 1)
    $total = [math]::Round($d.Size/1GB, 1)
    $pct   = [math]::Round((($d.Size - $d.FreeSpace) / $d.Size) * 100)
    $dc    = if ($pct -gt 90) { "#ef4444" } elseif ($pct -gt 75) { "#eab308" } else { "#22c55e" }
    $diskRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#94a3b8;'>Drive $($d.DeviceID)</td><td colspan='3' style='padding:10px 14px;font-size:13px;font-weight:600;color:$dc;'>$free GB free / $total GB total ($pct% used)</td></tr>"
}

# Recommendations
$recs = @()
if (-not $AVOn)              { $recs += "CRITICAL: Enable Windows Defender — Windows Security > Virus Protection > Enable" }
if (-not $RTOn)              { $recs += "CRITICAL: Enable Real-Time Protection — Windows Security > Real-Time Protection > ON" }
if (-not $FWPub)             { $recs += "CRITICAL: Enable Public Firewall — Control Panel > Windows Firewall > Turn On" }
if ($PendingUpdates -gt 0)   { $recs += "HIGH: Install $PendingUpdates pending Windows Updates — Settings > Windows Update" }
if ($RDP)                    { $recs += "MEDIUM: Disable Remote Desktop if not needed — Settings > System > Remote Desktop > OFF" }
if ($BLStatus -ne "On")      { $recs += "MEDIUM: Enable BitLocker encryption — Start > BitLocker Drive Encryption > Turn On C:" }
if ([int]$MinPwLen -lt 8)    { $recs += "MEDIUM: Set minimum password length — Run as Admin: net accounts /minpwlen:8" }
if ($OpenPorts.Count -gt 0)  { $recs += "HIGH: Dangerous ports open: $($OpenPorts -join ', ') — disable unused services" }
if ($recs.Count -eq 0)       { $recs += "All good! Keep Windows updated and run this scan monthly." }

$recRows = ""
foreach ($r in $recs) {
    $priority = if ($r -match "^CRITICAL") { "#ef4444" } elseif ($r -match "^HIGH") { "#f97316" } elseif ($r -match "^MEDIUM") { "#eab308" } else { "#22c55e" }
    $text = $r -replace "^(CRITICAL|HIGH|MEDIUM|LOW): ",""
    $pLabel = if ($r -match "^CRITICAL") { "CRITICAL" } elseif ($r -match "^HIGH") { "HIGH" } elseif ($r -match "^MEDIUM") { "MEDIUM" } else { "OK" }
    $recRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:11px 14px;font-size:13px;color:#e2e8f0;'>$text</td><td style='padding:11px 14px;'><span style='color:$priority;font-size:11px;font-weight:700;border:1px solid $priority;padding:2px 8px;border-radius:10px;'>$pLabel</span></td></tr>"
}

$HTML = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Security Audit - $(Get-Date -Format 'dd MMM yyyy HH:mm')</title>
<style>
* { margin:0; padding:0; box-sizing:border-box; }
body { font-family:'Segoe UI',Arial,sans-serif; background:#0a1628; color:#e2e8f0; }
.hdr { background:linear-gradient(135deg,#0f2844,#071220); border-bottom:3px solid #22d3ee; padding:24px 36px; }
.logo { color:#22d3ee; font-size:20px; font-weight:800; }
.sub { color:#64748b; font-size:12px; margin-top:2px; }
h1 { font-size:22px; font-weight:700; margin-top:10px; }
.dt { color:#64748b; font-size:11px; margin-top:4px; }
.wrap { max-width:900px; margin:0 auto; padding:24px 16px; }
.score { background:linear-gradient(135deg,rgba(34,211,238,0.1),rgba(59,130,246,0.08)); border:1px solid rgba(34,211,238,0.3); border-radius:18px; padding:28px; text-align:center; margin-bottom:20px; }
.snum { font-size:72px; font-weight:900; color:$GC; line-height:1; }
.slab { font-size:18px; font-weight:700; margin-top:6px; }
.sgrade { display:inline-block; background:rgba(34,211,238,0.1); border:1px solid rgba(34,211,238,0.3); color:#22d3ee; padding:3px 14px; border-radius:20px; font-size:13px; margin-top:6px; }
.sbar { background:#1e293b; border-radius:8px; height:10px; margin:14px auto 0; max-width:360px; overflow:hidden; }
.sbf { background:linear-gradient(90deg,$GC,#22d3ee); height:100%; width:$($Score)%; }
.sec { background:rgba(15,40,68,0.6); border:1px solid #1e293b; border-radius:12px; margin-bottom:16px; overflow:hidden; }
.sth { background:rgba(34,211,238,0.07); padding:11px 16px; font-size:13px; font-weight:700; color:#22d3ee; border-bottom:1px solid #1e293b; }
table { width:100%; border-collapse:collapse; }
.ftr { text-align:center; padding:20px; color:#475569; font-size:11px; border-top:1px solid #1e293b; margin-top:16px; }
.ftr a { color:#22d3ee; text-decoration:none; }
</style>
</head>
<body>
<div class="hdr">
  <div class="logo">Shield  Everyday Cyber AI</div>
  <div class="sub">everydaycyberai.in - Free Windows Security Tools</div>
  <h1>Windows Security Audit Report</h1>
  <div class="dt">$(Get-Date -Format 'dddd, dd MMMM yyyy  HH:mm') | Computer: $($CS.Name) | User: $env:USERNAME</div>
</div>

<div class="wrap">

<div class="score">
  <div class="snum">$Score</div>
  <div class="slab">Security Score / 100</div>
  <div class="sgrade">$Grade</div>
  <div class="sbar"><div class="sbf"></div></div>
  <p style="color:#64748b;font-size:12px;margin-top:10px;">Based on 10 security checks: Defender, Firewall, Updates, BitLocker, UAC, RDP, Passwords, Ports</p>
</div>

<div class="sec">
<div class="sth">Lock  Security Checks</div>
<table>
<tr style="background:rgba(34,211,238,0.04);border-bottom:1px solid #1e293b;">
  <td style="padding:10px 14px;font-size:11px;color:#64748b;">CHECK</td>
  <td style="padding:10px 14px;font-size:11px;color:#64748b;">STATUS</td>
  <td style="padding:10px 14px;font-size:11px;color:#64748b;">RESULT</td>
  <td style="padding:10px 14px;font-size:11px;color:#64748b;">ACTION</td>
</tr>
$(Row "Windows Defender (Antivirus)" (if ($AVOn) {"pass"} else {"fail"}) (if ($AVOn) {"Enabled"} else {"DISABLED"}) (if (-not $AVOn) {"Open Windows Security > Enable now"} else {"No action needed"}))
$(Row "Real-Time Protection" (if ($RTOn) {"pass"} else {"fail"}) (if ($RTOn) {"Active"} else {"OFF"}) (if (-not $RTOn) {"Windows Security > Real-Time Protection > ON"} else {"No action needed"}))
$(Row "Antivirus Definitions" (if ($AVAge) {"pass"} else {"warn"}) (if ($AVAge) {"Up to date"} else {"$($Def.AntivirusSignatureAge) days old"}) (if (-not $AVAge) {"Open Windows Security > Update definitions"} else {"No action needed"}))
$(Row "Firewall - Public Network" (if ($FWPub) {"pass"} else {"fail"}) (if ($FWPub) {"Enabled"} else {"DISABLED"}) (if (-not $FWPub) {"Control Panel > Firewall > Turn On"} else {"No action needed"}))
$(Row "Firewall - Private Network" (if ($FWPriv) {"pass"} else {"warn"}) (if ($FWPriv) {"Enabled"} else {"Disabled"}) (if (-not $FWPriv) {"Enable Windows Firewall for Private network"} else {"No action needed"}))
$(Row "Pending Windows Updates" (if ($PendingUpdates -eq 0) {"pass"} elseif ($PendingUpdates -le 5) {"warn"} else {"fail"}) (if ($PendingUpdates -eq 0) {"None pending"} else {"$PendingUpdates waiting"}) (if ($PendingUpdates -gt 0) {"Settings > Windows Update > Install All"} else {"No action needed"}))
$(Row "BitLocker Encryption" (if ($BLStatus -eq "On") {"pass"} else {"warn"}) (if ($BLStatus -eq "On") {"Enabled"} else {"Not enabled"}) (if ($BLStatus -ne "On") {"Start > BitLocker > Turn On C: drive"} else {"No action needed"}))
$(Row "User Account Control (UAC)" (if ($UAC) {"pass"} else {"fail"}) (if ($UAC) {"Enabled"} else {"DISABLED"}) (if (-not $UAC) {"Control Panel > User Accounts > UAC Settings > Default"} else {"No action needed"}))
$(Row "Remote Desktop (RDP)" (if (-not $RDP) {"pass"} else {"warn"}) (if (-not $RDP) {"Disabled"} else {"ENABLED"}) (if ($RDP) {"Settings > System > Remote Desktop > OFF"} else {"No action needed"}))
$(Row "Min Password Length" (if ([int]$MinPwLen -ge 8) {"pass"} else {"warn"}) "Minimum: $MinPwLen chars" (if ([int]$MinPwLen -lt 8) {"Run as Admin: net accounts /minpwlen:8"} else {"No action needed"}))
</table>
</div>

<div class="sec">
<div class="sth">PC  System Information</div>
<table>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:10px 14px;font-size:13px;color:#94a3b8;">Computer Name</td><td style="padding:10px 14px;font-size:13px;font-weight:600;color:#e2e8f0;">$($CS.Name)</td><td style="padding:10px 14px;font-size:13px;color:#94a3b8;">Windows Version</td><td style="padding:10px 14px;font-size:13px;font-weight:600;color:#e2e8f0;">$($OS.Caption) Build $($OS.BuildNumber)</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:10px 14px;font-size:13px;color:#94a3b8;">Processor</td><td colspan="3" style="padding:10px 14px;font-size:13px;font-weight:600;color:#e2e8f0;">$($CPU.Name.Trim())</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:10px 14px;font-size:13px;color:#94a3b8;">RAM</td><td style="padding:10px 14px;font-size:13px;font-weight:600;color:#e2e8f0;">$RAM GB</td><td style="padding:10px 14px;font-size:13px;color:#94a3b8;">Uptime</td><td style="padding:10px 14px;font-size:13px;font-weight:600;color:#e2e8f0;">$($Uptime.Days)d $($Uptime.Hours)h</td></tr>
<tr style="border-bottom:1px solid #1e293b;"><td style="padding:10px 14px;font-size:13px;color:#94a3b8;">Last Windows Update</td><td colspan="3" style="padding:10px 14px;font-size:13px;font-weight:600;color:#e2e8f0;">$(if ($LastUpdate) { Get-Date $LastUpdate -Format 'dd MMM yyyy' } else { 'Unknown' })</td></tr>
$diskRows
</table>
</div>

<div class="sec">
<div class="sth">List  Recommendations</div>
<table>
<tr style="background:rgba(34,211,238,0.04);border-bottom:1px solid #1e293b;">
  <td style="padding:10px 14px;font-size:11px;color:#64748b;">ACTION REQUIRED</td>
  <td style="padding:10px 14px;font-size:11px;color:#64748b;">PRIORITY</td>
</tr>
$recRows
</table>
</div>

</div>

<div class="ftr">
  Shield Generated by <a href="https://everydaycyberai.in">Everyday Cyber AI</a> - Free Windows Security Tools for India<br>
  Need help understanding this report? <a href="https://wa.me/918454031225">WhatsApp: +91 84540 31225</a>
</div>
</body>
</html>
"@

$HTML | Out-File -FilePath $ReportPath -Encoding UTF8 -Force

if (Test-Path $ReportPath) {
    Write-Host ""
    Write-Host " ============================================" -ForegroundColor Green
    Write-Host "   SCAN COMPLETE!" -ForegroundColor Green
    Write-Host " ============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "   Security Score : $Score / 100 ($Grade)" -ForegroundColor $(if ($Score -ge 75) {"Green"} elseif ($Score -ge 50) {"Yellow"} else {"Red"})
    Write-Host "   Pending Updates: $PendingUpdates" -ForegroundColor $(if ($PendingUpdates -eq 0) {"Green"} else {"Red"})
    Write-Host "   Issues Found   : $($recs.Count)" -ForegroundColor $(if ($recs.Count -le 1) {"Green"} else {"Yellow"})
    Write-Host ""
    Write-Host "   Report saved: Desktop\SecurityAudit_*.html" -ForegroundColor Cyan
    Write-Host ""
    Start-Process $ReportPath
} else {
    Write-Host " ERROR: Could not save report to Desktop!" -ForegroundColor Red
}
