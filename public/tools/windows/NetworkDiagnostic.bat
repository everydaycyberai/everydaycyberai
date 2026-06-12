@echo off
title Everyday Cyber AI - Network Diagnostic
color 0B
echo.
echo ============================================
echo   Everyday Cyber AI - Network Diagnostic
echo   Website: everydaycyberai.in
echo ============================================
echo.
echo Running network diagnostics...
echo.

PowerShell -NoProfile -ExecutionPolicy Bypass -Command "& {
    `$ErrorActionPreference = 'SilentlyContinue'
    `$ReportPath = \"`$env:USERPROFILE\Desktop\NetworkReport_`$(Get-Date -Format 'yyyyMMdd_HHmm').html\"

    function Ping-Test(`$h, `$label) {
        `$r = Test-Connection -ComputerName `$h -Count 3 -EA SilentlyContinue
        if (`$r) { return @{ok=`$true; ms=[math]::Round((`$r|Measure-Object ResponseTime -Average).Average); label=`$label; host=`$h} }
        return @{ok=`$false; ms=999; label=`$label; host=`$h}
    }

    Write-Host '  Testing router...' -ForegroundColor Yellow
    `$gw = (Get-NetIPConfiguration | Where-Object {`$_.IPv4DefaultGateway} | Select-Object -First 1).IPv4DefaultGateway.NextHop
    `$p0 = if (`$gw) { Ping-Test `$gw 'Your Router' } else { @{ok=`$false;ms=999;label='Router';host='N/A'} }

    Write-Host '  Testing Google DNS...' -ForegroundColor Yellow
    `$p1 = Ping-Test '8.8.8.8' 'Google DNS'
    Write-Host '  Testing Cloudflare...' -ForegroundColor Yellow
    `$p2 = Ping-Test '1.1.1.1' 'Cloudflare DNS'
    Write-Host '  Testing Google.com...' -ForegroundColor Yellow
    `$p3 = Ping-Test 'google.com' 'Google Website'
    Write-Host '  Testing YouTube...' -ForegroundColor Yellow
    `$p4 = Ping-Test 'youtube.com' 'YouTube'

    `$DNS = Resolve-DnsName 'google.com' -EA SilentlyContinue
    `$IPCfg = Get-NetIPConfiguration | Where-Object {`$_.IPv4DefaultGateway}
    `$WifiInfo = netsh wlan show interfaces 2>`$null
    `$Signal = ((`$WifiInfo | Where-Object {`$_ -match 'Signal'}) -replace '[^0-9]','').Trim()
    `$SSID   = ((`$WifiInfo | Where-Object {`$_ -match '^\s+SSID\s+:'}) -replace '.*:\s*','').Trim()
    `$Adapters = Get-NetAdapter | Where-Object {`$_.Status -eq 'Up'}

    Write-Host '  Generating report...' -ForegroundColor Green

    function PBadge(`$ms) {
        if     (`$ms -le 30)  { return \"<b style='color:#22c55e'>`${ms}ms — Excellent</b>\" }
        elseif (`$ms -le 80)  { return \"<b style='color:#22c55e'>`${ms}ms — Good</b>\" }
        elseif (`$ms -le 150) { return \"<b style='color:#eab308'>`${ms}ms — Fair</b>\" }
        elseif (`$ms -le 300) { return \"<b style='color:#f97316'>`${ms}ms — Slow</b>\" }
        else                  { return \"<b style='color:#ef4444'>Timeout</b>\" }
    }

    `$rows = ''
    foreach (`$p in @(`$p0,`$p1,`$p2,`$p3,`$p4)) {
        `$stat = if (`$p.ok) { \"<b style='color:#22c55e'>✅ OK</b>\" } else { \"<b style='color:#ef4444'>❌ Unreachable</b>\" }
        `$lat  = if (`$p.ok) { PBadge `$p.ms } else { \"<b style='color:#ef4444'>No response</b>\" }
        `$rows += \"<tr><td>`$(`$p.label)</td><td>`$stat</td><td>`$lat</td></tr>\"
    }

    `$adapterRows = ''
    foreach (`$a in `$Adapters) {
        `$spd = [math]::Round(`$a.LinkSpeed/1000000)
        `$adapterRows += \"<tr><td>`$(`$a.Name)</td><td><b style='color:#22d3ee'>`${spd} Mbps</b></td></tr>\"
    }

    `$cfgRows = ''
    foreach (`$c in `$IPCfg) {
        `$cfgRows += \"<tr><td>Interface</td><td><b>`$(`$c.InterfaceAlias)</b></td></tr>\"
        `$cfgRows += \"<tr><td>IP Address</td><td><b style='color:#22d3ee'>`$(`$c.IPv4Address.IPAddress)</b></td></tr>\"
        `$cfgRows += \"<tr><td>Gateway</td><td>`$(`$c.IPv4DefaultGateway.NextHop)</td></tr>\"
        `$cfgRows += \"<tr><td>DNS Servers</td><td>`$(`$c.DNSServer.ServerAddresses -join ', ')</td></tr>\"
    }

    `$wifiRow = if (`$SSID) {
        `$sc = if ([int]`$Signal -gt 70) {'#22c55e'} elseif ([int]`$Signal -gt 40) {'#eab308'} else {'#ef4444'}
        `$sl = if ([int]`$Signal -gt 70) {'Strong'} elseif ([int]`$Signal -gt 40) {'Fair'} else {'Weak — move closer to router'}
        \"<tr><td>WiFi Network</td><td><b>`$SSID</b></td></tr><tr><td>WiFi Signal</td><td><b style='color:`$sc'>`$Signal% (`$sl)</b></td></tr>\"
    } else { '' }

    `$recs = ''
    if (!`$p0.ok) { `$recs += \"<tr><td style='color:#ef4444'>❌ Cannot reach router</td><td>Check cable or WiFi connection. Restart router (unplug 30 sec).</td></tr>\" }
    elseif (!`$p1.ok) { `$recs += \"<tr><td style='color:#ef4444'>❌ No internet</td><td>Router OK but no internet — contact your ISP or restart modem.</td></tr>\" }
    if (`$Signal -and [int]`$Signal -lt 40) { `$recs += \"<tr><td style='color:#eab308'>⚠️ Weak WiFi (`$Signal%)</td><td>Move closer to router, or use a WiFi extender / LAN cable.</td></tr>\" }
    if (`$p1.ok -and `$p1.ms -gt 100) { `$recs += \"<tr><td style='color:#eab308'>⚠️ High latency (`$(`$p1.ms)ms)</td><td>Close heavy apps. Check if downloads are running in background.</td></tr>\" }
    if (`$recs -eq '' -and `$p1.ok) { `$recs = \"<tr><td style='color:#22c55e'>✅ Network looks healthy!</td><td>Good connectivity. No major issues detected.</td></tr>\" }

    `$html = @\"
<!DOCTYPE html><html><head><meta charset='UTF-8'>
<title>Network Report - `$(Get-Date -Format 'dd MMM yyyy')</title>
<style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;background:#0a1628;color:#e2e8f0}
.hdr{background:linear-gradient(135deg,#0f2844,#071220);border-bottom:3px solid #22d3ee;padding:28px 36px}
.logo{color:#22d3ee;font-size:20px;font-weight:800}.sub{color:#64748b;font-size:12px}
h1{font-size:22px;font-weight:700;margin-top:10px}.dt{color:#64748b;font-size:11px;margin-top:3px}
.wrap{max-width:860px;margin:0 auto;padding:24px 18px}
.sec{background:rgba(15,40,68,0.6);border:1px solid #1e293b;border-radius:12px;margin-bottom:16px;overflow:hidden}
.sth{background:rgba(34,211,238,0.08);padding:11px 18px;font-size:13px;font-weight:700;color:#22d3ee;border-bottom:1px solid #1e293b}
table{width:100%;border-collapse:collapse}td{padding:10px 14px;font-size:13px;border-bottom:1px solid #1e293b}
.ftr{text-align:center;padding:20px;color:#475569;font-size:11px;border-top:1px solid #1e293b;margin-top:16px}
.ftr a{color:#22d3ee;text-decoration:none}</style></head><body>
<div class='hdr'><div class='logo'>🌐 Everyday Cyber AI</div><div class='sub'>everydaycyberai.in — Free Network Tools</div>
<h1>Network Diagnostic Report</h1><div class='dt'>`$(Get-Date -Format 'dddd dd MMMM yyyy — HH:mm') | PC: `$env:COMPUTERNAME</div></div>
<div class='wrap'>
<div class='sec'><div class='sth'>🌐 Connectivity Tests</div><table>`$rows</table></div>
<div class='sec'><div class='sth'>📶 Network Adapters</div><table>`$adapterRows`$wifiRow</table></div>
<div class='sec'><div class='sth'>⚙️ IP Configuration</div><table>`$cfgRows</table></div>
<div class='sec'><div class='sth'>💡 Recommendations</div><table>`$recs</table></div>
</div>
<div class='ftr'>🛡️ <a href='https://everydaycyberai.in'>Everyday Cyber AI</a> | Need help? <a href='https://wa.me/918454031225'>WhatsApp +91 84540 31225</a></div>
</body></html>
\"@

    `$html | Out-File -FilePath `$ReportPath -Encoding UTF8
    Start-Process `$ReportPath

    Write-Host ''
    Write-Host '  Router:   ' -NoNewline -ForegroundColor White
    Write-Host `$(if (`$p0.ok) {'✓ OK'} else {'✗ Unreachable'}) -ForegroundColor `$(if (`$p0.ok) {'Green'} else {'Red'})
    Write-Host '  Internet: ' -NoNewline -ForegroundColor White
    Write-Host `$(if (`$p1.ok) {\"✓ Connected (`$(`$p1.ms)ms)\"} else {'✗ No internet'}) -ForegroundColor `$(if (`$p1.ok) {'Green'} else {'Red'})
    Write-Host '  DNS:      ' -NoNewline -ForegroundColor White
    Write-Host `$(if (`$DNS) {'✓ Working'} else {'✗ Issue'}) -ForegroundColor `$(if (`$DNS) {'Green'} else {'Red'})
    if (`$Signal) { Write-Host \"  WiFi Signal: `$Signal%\" -ForegroundColor `$(if ([int]`$Signal -gt 60) {'Green'} else {'Yellow'}) }
    Write-Host ''
    Write-Host '  Report saved to Desktop!' -ForegroundColor Cyan
    Write-Host '  Visit everydaycyberai.in for more free tools!' -ForegroundColor Cyan
    Write-Host ''
}"

echo.
pause
