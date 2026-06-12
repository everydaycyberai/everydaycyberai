@echo off
title Everyday Cyber AI - Security Audit Tool
color 0B
echo.
echo ============================================
echo   Everyday Cyber AI - Security Audit Tool
echo   Website: everydaycyberai.in
echo ============================================
echo.
echo Starting security scan... Please wait...
echo.

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& {
    $ErrorActionPreference = 'SilentlyContinue'
    $ReportPath = \"$env:USERPROFILE\Desktop\SecurityAudit_$(Get-Date -Format 'yyyyMMdd_HHmm').html\"

    function CheckRow($label, $status, $value, $rec) {
        $icon  = if ($status -eq 'pass') { '✅' } elseif ($status -eq 'warn') { '⚠️' } else { '❌' }
        $color = if ($status -eq 'pass') { '#22c55e' } elseif ($status -eq 'warn') { '#eab308' } else { '#ef4444' }
        $bg    = if ($status -eq 'pass') { 'rgba(34,197,94,0.05)' } elseif ($status -eq 'warn') { 'rgba(234,179,8,0.07)' } else { 'rgba(239,68,68,0.07)' }
        return \"<tr style='background:$bg;border-bottom:1px solid #1e293b'><td style='padding:12px 16px;font-size:14px;color:#e2e8f0'>$icon $label</td><td style='padding:12px 16px;font-size:14px;font-weight:700;color:$color'>$value</td><td style='padding:12px 16px;font-size:12px;color:#94a3b8'>$rec</td></tr>\"
    }

    Write-Host '[1/8] Checking Windows Defender...' -ForegroundColor Yellow
    $Def = Get-MpComputerStatus
    $AVOn  = $Def.AntivirusEnabled
    $RTOn  = $Def.RealTimeProtectionEnabled
    $AVAge = $Def.AntivirusSignatureAge -le 3

    Write-Host '[2/8] Checking Firewall...' -ForegroundColor Yellow
    $FW = Get-NetFirewallProfile
    $FWPub  = ($FW | Where-Object {$_.Name -eq 'Public'}).Enabled
    $FWPriv = ($FW | Where-Object {$_.Name -eq 'Private'}).Enabled

    Write-Host '[3/8] Checking Windows Updates...' -ForegroundColor Yellow
    $PendingUpdates = 0
    try {
        $US = New-Object -ComObject Microsoft.Update.Session
        $SR = $US.CreateUpdateSearcher().Search('IsInstalled=0 and Type=Software')
        $PendingUpdates = $SR.Updates.Count
    } catch {}

    Write-Host '[4/8] Checking BitLocker...' -ForegroundColor Yellow
    $BL = Get-BitLockerVolume -MountPoint 'C:' 2>$null
    $BLStatus = if ($BL) { $BL.ProtectionStatus } else { 'Unknown' }

    Write-Host '[5/8] Checking UAC & RDP...' -ForegroundColor Yellow
    $UACReg = Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System' -Name 'EnableLUA' 2>$null
    $UAC = $UACReg.EnableLUA -eq 1
    $RDPReg = Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server' -Name 'fDenyTSConnections' 2>$null
    $RDP = $RDPReg.fDenyTSConnections -eq 0

    Write-Host '[6/8] Checking Password Policy...' -ForegroundColor Yellow
    $SecPolicy = net accounts 2>$null
    $MinPwLen = (($SecPolicy | Where-Object { $_ -match 'Minimum password length' }) -replace '\D+','').Trim()
    $LockThresh = (($SecPolicy | Where-Object { $_ -match 'Lockout threshold' }) -replace '\D+','').Trim()

    Write-Host '[7/8] Checking Open Ports...' -ForegroundColor Yellow
    $DangerPorts = @{21='FTP';23='Telnet';135='RPC';139='NetBIOS';445='SMB';3389='RDP';5900='VNC'}
    $OpenPorts = @()
    $NetStat = netstat -an 2>$null
    foreach ($p in $DangerPorts.Keys) { if ($NetStat -match \":$p\s\") { $OpenPorts += \"$p/$($DangerPorts[$p])\" } }

    Write-Host '[8/8] Calculating Score...' -ForegroundColor Yellow
    $CS = Get-CimInstance Win32_ComputerSystem
    $OS = Get-CimInstance Win32_OperatingSystem
    $CPU = Get-CimInstance Win32_Processor
    $RAM = [math]::Round($CS.TotalPhysicalMemory/1GB,1)
    $Disks = Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3'
    $LastUpdate = (Get-HotFix | Sort-Object InstalledOn -Descending | Select-Object -First 1).InstalledOn

    $Score = 0
    if ($AVOn)               { $Score += 12 }
    if ($RTOn)               { $Score += 10 }
    if ($AVAge)              { $Score += 8  }
    if ($FWPub)              { $Score += 10 }
    if ($FWPriv)             { $Score += 5  }
    if ($PendingUpdates -eq 0) { $Score += 10 }
    if ($BLStatus -eq 'On') { $Score += 10 }
    if ($UAC)                { $Score += 8  }
    if (!$RDP)               { $Score += 8  }
    if ([int]$MinPwLen -ge 8){ $Score += 7  }
    if ($OpenPorts.Count -eq 0) { $Score += 12 }

    $Grade = if ($Score -ge 90) {'A+ Excellent'} elseif ($Score -ge 75) {'A Good'} elseif ($Score -ge 60) {'B Fair'} elseif ($Score -ge 40) {'C Weak'} else {'D DANGER'}
    $GC = if ($Score -ge 75) {'#22c55e'} elseif ($Score -ge 50) {'#eab308'} else {'#ef4444'}

    Write-Host 'Generating HTML report...' -ForegroundColor Green

    $DiskHTML = ''
    foreach ($d in $Disks) {
        $free = [math]::Round($d.FreeSpace/1GB,1)
        $total = [math]::Round($d.Size/1GB,1)
        $pct = [math]::Round((($d.Size-$d.FreeSpace)/$d.Size)*100)
        $dc = if ($pct -gt 90) {'#ef4444'} elseif ($pct -gt 75) {'#eab308'} else {'#22c55e'}
        $DiskHTML += \"<div class='item'><div class='ilabel'>Drive $($d.DeviceID)</div><div class='ival' style='color:$dc'>$free GB free / $total GB ($pct% used)</div></div>\"
    }

    $RecHTML = ''
    if (!$AVOn)              { $RecHTML += \"<tr><td class='rf'>❌ Enable Windows Defender</td><td class='rs'>CRITICAL</td><td class='rh'>Windows Security → Virus Protection → Enable</td></tr>\" }
    if (!$RTOn)              { $RecHTML += \"<tr><td class='rf'>❌ Enable Real-Time Protection</td><td class='rs'>CRITICAL</td><td class='rh'>Windows Security → Real-Time Protection → ON</td></tr>\" }
    if (!$FWPub)             { $RecHTML += \"<tr><td class='rf'>❌ Enable Public Firewall</td><td class='rs'>CRITICAL</td><td class='rh'>Control Panel → Windows Firewall → Turn On</td></tr>\" }
    if ($PendingUpdates -gt 0) { $RecHTML += \"<tr><td class='rf'>⚠️ Install $PendingUpdates pending updates</td><td class='rs'>HIGH</td><td class='rh'>Settings → Windows Update → Install All</td></tr>\" }
    if ($RDP)                { $RecHTML += \"<tr><td class='rf'>⚠️ Remote Desktop is ON</td><td class='rs'>MEDIUM</td><td class='rh'>Settings → System → Remote Desktop → OFF</td></tr>\" }
    if ($BLStatus -ne 'On')  { $RecHTML += \"<tr><td class='rf'>⚠️ BitLocker not enabled</td><td class='rs'>MEDIUM</td><td class='rh'>Start → BitLocker Drive Encryption → Turn On C:</td></tr>\" }
    if ([int]$MinPwLen -lt 8){ $RecHTML += \"<tr><td class='rf'>⚠️ Weak password policy</td><td class='rs'>MEDIUM</td><td class='rh'>Run as Admin: net accounts /minpwlen:8</td></tr>\" }
    if ($OpenPorts.Count -gt 0) { $RecHTML += \"<tr><td class='rf'>⚠️ Dangerous ports open: $($OpenPorts -join ', ')</td><td class='rs'>HIGH</td><td class='rh'>Disable unused services using these ports</td></tr>\" }
    if ($RecHTML -eq '')     { $RecHTML = \"<tr><td class='rf' style='color:#22c55e'>✅ System looks secure!</td><td class='rs'>LOW</td><td class='rh'>Keep Windows updated regularly</td></tr>\" }

    \$html = @\"
<!DOCTYPE html><html><head><meta charset='UTF-8'>
<title>Security Audit - $(Get-Date -Format 'dd MMM yyyy')</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0a1628;color:#e2e8f0;min-height:100vh}
.hdr{background:linear-gradient(135deg,#0f2844,#071220);border-bottom:3px solid #22d3ee;padding:28px 40px}
.logo{color:#22d3ee;font-size:20px;font-weight:800}
.sub{color:#64748b;font-size:12px;margin-top:2px}
h1{font-size:24px;font-weight:700;margin-top:10px}
.dt{color:#64748b;font-size:12px;margin-top:4px}
.wrap{max-width:920px;margin:0 auto;padding:28px 20px}
.score{background:linear-gradient(135deg,rgba(34,211,238,0.1),rgba(59,130,246,0.1));border:1px solid rgba(34,211,238,0.3);border-radius:20px;padding:28px;text-align:center;margin-bottom:24px}
.sn{font-size:76px;font-weight:900;color:$GC;line-height:1}
.sl{font-size:20px;font-weight:700;margin-top:6px}
.sg{display:inline-block;background:rgba(34,211,238,0.1);border:1px solid rgba(34,211,238,0.3);color:#22d3ee;padding:3px 14px;border-radius:20px;font-size:13px;margin-top:6px}
.sbar{background:#1e293b;border-radius:10px;height:10px;margin:14px auto 0;max-width:380px;overflow:hidden}
.sbf{background:linear-gradient(90deg,$GC,#22d3ee);height:100%;border-radius:10px;width:$Score%}
.sec{background:rgba(15,40,68,0.6);border:1px solid #1e293b;border-radius:14px;margin-bottom:20px;overflow:hidden}
.sth{background:rgba(34,211,238,0.08);padding:12px 18px;font-size:14px;font-weight:700;color:#22d3ee;border-bottom:1px solid #1e293b}
table{width:100%;border-collapse:collapse}
td{padding:11px 14px;font-size:13px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:10px;padding:14px}
.item{background:#070f1a;border:1px solid #1e293b;border-radius:8px;padding:10px 14px}
.ilabel{color:#64748b;font-size:10px;text-transform:uppercase;letter-spacing:0.5px}
.ival{color:#e2e8f0;font-size:13px;font-weight:600;margin-top:2px}
.rf{padding:11px 14px;font-size:13px;color:#e2e8f0}
.rs{padding:11px 14px;font-size:11px;font-weight:700;color:#f97316}
.rh{padding:11px 14px;font-size:11px;color:#64748b}
.ftr{text-align:center;padding:24px;color:#475569;font-size:11px;border-top:1px solid #1e293b;margin-top:20px}
.ftr a{color:#22d3ee;text-decoration:none}
</style></head><body>
<div class='hdr'>
<div class='logo'>🛡️ Everyday Cyber AI</div>
<div class='sub'>everydaycyberai.in — Free Windows Security Tools</div>
<h1>Windows Security Audit Report</h1>
<div class='dt'>$(Get-Date -Format 'dddd dd MMMM yyyy — HH:mm') | PC: $($CS.Name) | User: $($env:USERNAME)</div>
</div>
<div class='wrap'>
<div class='score'>
<div class='sn'>$Score</div>
<div class='sl'>Security Score / 100</div>
<div class='sg'>$Grade</div>
<div class='sbar'><div class='sbf'></div></div>
<p style='color:#94a3b8;font-size:12px;margin-top:10px'>Based on 11 security checks across Windows Defender, Firewall, Updates, BitLocker, Passwords and Ports</p>
</div>
<div class='sec'>
<div class='sth'>🔒 Security Checks</div>
<table>
$(CheckRow 'Windows Defender (Antivirus)' (if ($AVOn) {'pass'} else {'fail'}) (if ($AVOn) {'Enabled ✓'} else {'DISABLED'}) (if (!$AVOn) {'Open Windows Security → Enable Virus & Threat Protection'} else {'Good'}))
$(CheckRow 'Real-Time Protection' (if ($RTOn) {'pass'} else {'fail'}) (if ($RTOn) {'Active ✓'} else {'OFF'}) (if (!$RTOn) {'Windows Security → Virus Protection → Real-Time → ON'} else {'Good'}))
$(CheckRow 'Antivirus Definitions' (if ($AVAge) {'pass'} else {'warn'}) (if ($AVAge) {'Up to date ✓'} else {\"$($Def.AntivirusSignatureAge) days old\"}) (if (!$AVAge) {'Open Windows Security → Update definitions'} else {'Good'}))
$(CheckRow 'Firewall (Public Network)' (if ($FWPub) {'pass'} else {'fail'}) (if ($FWPub) {'Enabled ✓'} else {'DISABLED'}) (if (!$FWPub) {'Control Panel → Windows Firewall → Turn On'} else {'Good'}))
$(CheckRow 'Firewall (Private Network)' (if ($FWPriv) {'pass'} else {'warn'}) (if ($FWPriv) {'Enabled ✓'} else {'Disabled'}) (if (!$FWPriv) {'Enable Windows Firewall for Private networks'} else {'Good'}))
$(CheckRow 'Pending Windows Updates' (if ($PendingUpdates -eq 0) {'pass'} elseif ($PendingUpdates -le 5) {'warn'} else {'fail'}) (if ($PendingUpdates -eq 0) {'None ✓'} else {\"$PendingUpdates updates waiting\"}) (if ($PendingUpdates -gt 0) {'Settings → Windows Update → Check for updates'} else {'System is up to date'}))
$(CheckRow 'BitLocker Encryption' (if ($BLStatus -eq 'On') {'pass'} else {'warn'}) (if ($BLStatus -eq 'On') {'Enabled ✓'} else {'Not enabled'}) (if ($BLStatus -ne 'On') {'Enable BitLocker to protect data if laptop stolen'} else {'Good'}))
$(CheckRow 'User Account Control (UAC)' (if ($UAC) {'pass'} else {'fail'}) (if ($UAC) {'Enabled ✓'} else {'DISABLED'}) (if (!$UAC) {'Control Panel → User Accounts → Change UAC settings'} else {'Good'}))
$(CheckRow 'Remote Desktop (RDP)' (if (!$RDP) {'pass'} else {'warn'}) (if (!$RDP) {'Disabled ✓'} else {'ENABLED'}) (if ($RDP) {'Settings → System → Remote Desktop → Turn OFF if not needed'} else {'Good'}))
$(CheckRow 'Minimum Password Length' (if ([int]$MinPwLen -ge 8) {'pass'} else {'warn'}) \"Min: $MinPwLen chars\" (if ([int]$MinPwLen -lt 8) {'Run as Admin: net accounts /minpwlen:8'} else {'Good'}))
$(CheckRow 'Dangerous Open Ports' (if ($OpenPorts.Count -eq 0) {'pass'} else {'warn'}) (if ($OpenPorts.Count -eq 0) {'None detected ✓'} else {$OpenPorts -join ', '}) (if ($OpenPorts.Count -gt 0) {'Disable unused services on these ports'} else {'Good'}))
</table>
</div>
<div class='sec'>
<div class='sth'>💻 System Information</div>
<div class='grid'>
<div class='item'><div class='ilabel'>Computer</div><div class='ival'>$($CS.Name)</div></div>
<div class='item'><div class='ilabel'>Windows</div><div class='ival'>$($OS.Caption)</div></div>
<div class='item'><div class='ilabel'>Build</div><div class='ival'>$($OS.BuildNumber)</div></div>
<div class='item'><div class='ilabel'>Processor</div><div class='ival'>$($CPU.Name.Trim())</div></div>
<div class='item'><div class='ilabel'>RAM</div><div class='ival'>$RAM GB</div></div>
<div class='item'><div class='ilabel'>Last Update</div><div class='ival'>$(if ($LastUpdate) {Get-Date $LastUpdate -Format 'dd MMM yyyy'} else {'Unknown'})</div></div>
$DiskHTML
</div>
</div>
<div class='sec'>
<div class='sth'>📋 Recommendations</div>
<table><tr style='background:rgba(34,211,238,0.04)'><td class='rf' style='color:#64748b'>Issue</td><td class='rs' style='color:#64748b'>Priority</td><td class='rh' style='color:#64748b'>How to Fix</td></tr>
$RecHTML
</table>
</div>
</div>
<div class='ftr'>
🛡️ Generated by <a href='https://everydaycyberai.in'>Everyday Cyber AI</a> — Free Windows Security Tools for India<br>
Need help? <a href='https://wa.me/918454031225'>WhatsApp: +91 84540 31225</a>
</div>
</body></html>
\"@

    \$html | Out-File -FilePath \$ReportPath -Encoding UTF8
    Start-Process \$ReportPath
    Write-Host ''
    Write-Host '  Score: ' -NoNewline -ForegroundColor White
    Write-Host \"$Score / 100 — $Grade\" -ForegroundColor $(if ($Score -ge 75) {'Green'} elseif ($Score -ge 50) {'Yellow'} else {'Red'})
    Write-Host '  Report saved to Desktop!' -ForegroundColor Cyan
    Write-Host '  Visit everydaycyberai.in for more free tools!' -ForegroundColor Cyan
}"

echo.
echo ============================================
echo   Done! Report should open in your browser.
echo   Check your Desktop for the HTML report.
echo ============================================
echo.
pause
