# ============================================================
#  Everyday Cyber AI — Network Diagnostic Tool v1.0
#  Website: https://everydaycyberai.in
#  Diagnose internet, WiFi and network issues
# ============================================================

$ErrorActionPreference = "SilentlyContinue"
$ReportPath = "$env:USERPROFILE\Desktop\NetworkReport_$(Get-Date -Format 'yyyyMMdd_HHmm').html"

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  Everyday Cyber AI — Network Diagnostic   " -ForegroundColor Cyan
Write-Host "  Website: everydaycyberai.in              " -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Running network diagnostics..." -ForegroundColor Yellow
Write-Host ""

# ── Network Adapters ─────────────────────────────────────────
$Adapters = Get-NetAdapter | Where-Object { $_.Status -eq "Up" }
$WifiAdapter = $Adapters | Where-Object { $_.InterfaceDescription -match "Wi-Fi|Wireless|802.11" }
$EthAdapter  = $Adapters | Where-Object { $_.InterfaceDescription -match "Ethernet|Gigabit|LAN" -and $_.InterfaceDescription -notmatch "Wireless" }

# ── IP Configuration ─────────────────────────────────────────
$IPConfig = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway -ne $null }

# ── Ping Tests ────────────────────────────────────────────────
function PingTest($host, $label) {
    $result = Test-Connection -ComputerName $host -Count 3 -ErrorAction SilentlyContinue
    if ($result) {
        $avg = [math]::Round(($result | Measure-Object -Property ResponseTime -Average).Average)
        return @{ success=$true; avg=$avg; label=$label; host=$host }
    }
    return @{ success=$false; avg=999; label=$label; host=$host }
}

Write-Host "Testing connectivity..." -ForegroundColor Yellow
$GatewayIP = ($IPConfig | Select-Object -First 1).IPv4DefaultGateway.NextHop
$p1 = PingTest "8.8.8.8" "Google DNS"
$p2 = PingTest "1.1.1.1" "Cloudflare DNS"
$p3 = PingTest "google.com" "Google Website"
$p4 = PingTest "youtube.com" "YouTube"
if ($GatewayIP) { $p5 = PingTest $GatewayIP "Your Router/Gateway" } else { $p5 = @{success=$false;avg=999;label="Router";host="N/A"} }

# ── DNS Resolution ────────────────────────────────────────────
$DNS1 = Resolve-DnsName "google.com" -ErrorAction SilentlyContinue
$DNS2 = Resolve-DnsName "everydaycyberai.in" -ErrorAction SilentlyContinue

# ── WiFi Signal ───────────────────────────────────────────────
$WifiInfo = netsh wlan show interfaces 2>$null
$Signal   = ($WifiInfo | Where-Object { $_ -match "Signal" }) -replace "[^0-9]",""
$SSID     = ($WifiInfo | Where-Object { $_ -match "^\s+SSID\s+:" }) -replace ".*:\s*",""
$RadioType= ($WifiInfo | Where-Object { $_ -match "Radio type" }) -replace ".*:\s*",""

# ── Open Connections ──────────────────────────────────────────
$Connections = netstat -n 2>$null | Where-Object { $_ -match "ESTABLISHED" }
$ConnCount = ($Connections | Measure-Object).Count

# ── DNS Servers ───────────────────────────────────────────────
$DNSServers = (Get-DnsClientServerAddress -AddressFamily IPv4 | Where-Object { $_.ServerAddresses -ne $null -and $_.ServerAddresses.Count -gt 0 }).ServerAddresses | Select-Object -Unique

Write-Host "Generating report..." -ForegroundColor Green

function StatusBadge($ok, $goodText, $badText) {
    if ($ok) { return "<span style='color:#22c55e;font-weight:600;'>✅ $goodText</span>" }
    return "<span style='color:#ef4444;font-weight:600;'>❌ $badText</span>"
}
function PingBadge($ms) {
    if ($ms -le 30) { return "<span style='color:#22c55e;font-weight:600;'>${ms}ms — Excellent</span>" }
    elseif ($ms -le 80) { return "<span style='color:#22c55e;font-weight:600;'>${ms}ms — Good</span>" }
    elseif ($ms -le 150) { return "<span style='color:#eab308;font-weight:600;'>${ms}ms — Fair</span>" }
    elseif ($ms -le 300) { return "<span style='color:#f97316;font-weight:600;'>${ms}ms — Slow</span>" }
    else { return "<span style='color:#ef4444;font-weight:600;'>Timeout — No response</span>" }
}

$HTML = @"
<!DOCTYPE html><html><head>
<meta charset='UTF-8'>
<title>Network Diagnostic — $(Get-Date -Format 'dd MMM yyyy HH:mm')</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0a1628;color:#e2e8f0}
.header{background:linear-gradient(135deg,#0f2844,#0a1628);border-bottom:2px solid #22d3ee;padding:32px 40px}
.logo{color:#22d3ee;font-size:22px;font-weight:800}
.logo-sub{color:#64748b;font-size:13px}
h1{font-size:26px;font-weight:700;margin-top:12px}
.date{color:#64748b;font-size:12px;margin-top:4px}
.container{max-width:900px;margin:0 auto;padding:32px 24px}
.card{background:rgba(15,40,68,0.5);border:1px solid #1e293b;border-radius:16px;margin-bottom:20px;overflow:hidden}
.card-title{background:rgba(34,211,238,0.08);padding:12px 20px;font-size:14px;font-weight:700;color:#22d3ee;border-bottom:1px solid #1e293b}
.grid2{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:16px}
.item{background:#0a1628;border:1px solid #1e293b;border-radius:10px;padding:12px 16px}
.item-label{color:#64748b;font-size:11px;text-transform:uppercase;letter-spacing:0.5px}
.item-value{color:#e2e8f0;font-size:14px;font-weight:600;margin-top:3px}
table{width:100%;border-collapse:collapse}
tr{border-bottom:1px solid #1e293b}
td{padding:11px 16px;font-size:13px}
.footer{text-align:center;padding:24px;color:#475569;font-size:12px;border-top:1px solid #1e293b;margin-top:24px}
.footer a{color:#22d3ee;text-decoration:none}
</style></head><body>
<div class='header'>
<div class='logo'>🌐 Everyday Cyber AI</div>
<div class='logo-sub'>everydaycyberai.in — Free Network Tools</div>
<h1>Network Diagnostic Report</h1>
<div class='date'>Generated: $(Get-Date -Format 'dddd, dd MMMM yyyy — HH:mm') | Host: $($env:COMPUTERNAME)</div>
</div>
<div class='container'>

<div class='card'>
<div class='card-title'>🌐 Connectivity Tests</div>
<table>
<tr style='background:rgba(34,211,238,0.03)'><td style='color:#94a3b8;width:30%'>Target</td><td style='color:#94a3b8'>Status</td><td style='color:#94a3b8'>Latency</td><td style='color:#94a3b8'>Meaning</td></tr>
$(foreach ($p in @($p5,$p1,$p2,$p3,$p4)) {
    $latency = if ($p.success) { PingBadge $p.avg } else { "<span style='color:#ef4444;font-weight:600;'>❌ No response</span>" }
    $meaning = if (!$p5.success -and $p.label -eq "Your Router/Gateway") { "Router unreachable — check cable/WiFi" }
               elseif (!$p.success -and ($p.label -match "DNS")) { "DNS issue — try changing to 8.8.8.8" }
               elseif (!$p.success) { "Internet may be down" }
               else { "OK" }
    "<tr><td style='color:#e2e8f0;font-weight:600;'>$($p.label)</td><td>$(StatusBadge $p.success 'Reachable' 'Unreachable')</td><td>$latency</td><td style='color:#64748b;font-size:12px;'>$meaning</td></tr>"
})
</table>
</div>

<div class='card'>
<div class='card-title'>📶 WiFi / Network Info</div>
<div class='grid2'>
$(foreach ($adapter in $Adapters) {
    "<div class='item'><div class='item-label'>Adapter</div><div class='item-value'>$($adapter.Name)</div></div>"
    "<div class='item'><div class='item-label'>Speed</div><div class='item-value'>$([math]::Round($adapter.LinkSpeed/1000000)) Mbps</div></div>"
})
$(if ($SSID) { "<div class='item'><div class='item-label'>WiFi Network (SSID)</div><div class='item-value'>$SSID</div></div>" })
$(if ($Signal) { "<div class='item'><div class='item-label'>WiFi Signal</div><div class='item-value' style='color:$(if ([int]$Signal -gt 70){"#22c55e"}elseif([int]$Signal -gt 40){"#eab308"}else{"#ef4444"})'>$Signal% $(if ([int]$Signal -gt 70){"(Strong)"}elseif([int]$Signal -gt 40){"(Fair)"}else{"(Weak)"})</div></div>" })
$(if ($RadioType) { "<div class='item'><div class='item-label'>WiFi Type</div><div class='item-value'>$RadioType</div></div>" })
</div>
</div>

<div class='card'>
<div class='card-title'>⚙️ IP Configuration</div>
<div class='grid2'>
$(foreach ($cfg in $IPConfig) {
    "<div class='item'><div class='item-label'>Interface</div><div class='item-value'>$($cfg.InterfaceAlias)</div></div>"
    "<div class='item'><div class='item-label'>IP Address</div><div class='item-value'>$($cfg.IPv4Address.IPAddress)</div></div>"
    "<div class='item'><div class='item-label'>Gateway</div><div class='item-value'>$($cfg.IPv4DefaultGateway.NextHop)</div></div>"
    "<div class='item'><div class='item-label'>DNS Servers</div><div class='item-value'>$($cfg.DNSServer.ServerAddresses -join ', ')</div></div>"
})
</div>
</div>

<div class='card'>
<div class='card-title'>🔍 DNS Test</div>
<table>
<tr><td style='color:#e2e8f0;font-weight:600;'>google.com</td><td>$(StatusBadge ($DNS1 -ne $null) 'Resolved' 'Failed')</td><td style='color:#64748b;font-size:12px;'>$(if($DNS1){$DNS1[0].IPAddress}else{"DNS not working"})</td></tr>
<tr><td style='color:#e2e8f0;font-weight:600;'>everydaycyberai.in</td><td>$(StatusBadge ($DNS2 -ne $null) 'Resolved' 'Failed')</td><td style='color:#64748b;font-size:12px;'>$(if($DNS2){$DNS2[0].IPAddress}else{"Cannot resolve"})</td></tr>
</table>
</div>

<div class='card'>
<div class='card-title'>📊 Active Connections</div>
<div style='padding:16px;'>
<p style='color:#e2e8f0;'>Active ESTABLISHED connections: <strong style='color:#22d3ee;font-size:20px;'>$ConnCount</strong></p>
<p style='color:#64748b;font-size:12px;margin-top:8px;'>$(if($ConnCount -gt 50){"High number of connections — check for background apps or malware"}else{"Normal connection count"})</p>
</div>
</div>

<div class='card'>
<div class='card-title'>💡 Recommendations</div>
<table>
$(
if (!$p5.success) { "<tr><td style='color:#ef4444;font-weight:600;padding:11px 16px;'>Cannot reach router</td><td style='color:#94a3b8;font-size:12px;padding:11px 16px;'>Check physical connections. Restart router by unplugging for 30 seconds.</td></tr>" }
if (!$p1.success -and $p5.success) { "<tr><td style='color:#ef4444;font-weight:600;padding:11px 16px;'>No internet despite router connection</td><td style='color:#94a3b8;font-size:12px;padding:11px 16px;'>ISP issue. Call your internet provider or restart the modem.</td></tr>" }
if ([int]$Signal -lt 40 -and $Signal) { "<tr><td style='color:#eab308;font-weight:600;padding:11px 16px;'>Weak WiFi signal ($Signal%)</td><td style='color:#94a3b8;font-size:12px;padding:11px 16px;'>Move closer to router, or use a WiFi extender. Consider Ethernet for better speed.</td></tr>" }
if ($p1.avg -gt 100 -and $p1.success) { "<tr><td style='color:#eab308;font-weight:600;padding:11px 16px;'>High latency ($($p1.avg)ms)</td><td style='color:#94a3b8;font-size:12px;padding:11px 16px;'>Close background apps using bandwidth. Check if others are using heavy internet.</td></tr>" }
if ($p1.success -and $p1.avg -le 50 -and (!$Signal -or [int]$Signal -ge 60)) { "<tr><td style='color:#22c55e;font-weight:600;padding:11px 16px;'>Network looks healthy!</td><td style='color:#94a3b8;font-size:12px;padding:11px 16px;'>Good connectivity and latency. No major issues detected.</td></tr>" }
)
</table>
</div>

</div>
<div class='footer'>
<p>🛡️ Generated by <a href='https://everydaycyberai.in'>Everyday Cyber AI</a> — Free Tools for India | WhatsApp: <a href='https://wa.me/918454031225'>+91 84540 31225</a></p>
</div>
</body></html>
"@

$HTML | Out-File -FilePath $ReportPath -Encoding UTF8
Start-Process $ReportPath

Write-Host ""
Write-Host "============================================" -ForegroundColor Green
Write-Host "  DIAGNOSTIC COMPLETE!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Green
Write-Host ""
Write-Host "  Router:    $(if ($p5.success) {'✓ Reachable'} else {'✗ Unreachable'})" -ForegroundColor $(if ($p5.success) {"Green"} else {"Red"})
Write-Host "  Internet:  $(if ($p1.success) {"✓ Connected ($($p1.avg)ms)"} else {'✗ No connection'})" -ForegroundColor $(if ($p1.success) {"Green"} else {"Red"})
Write-Host "  DNS:       $(if ($DNS1) {'✓ Working'} else {'✗ Not working'})" -ForegroundColor $(if ($DNS1) {"Green"} else {"Red"})
if ($Signal) { Write-Host "  WiFi Signal: $Signal%" -ForegroundColor $(if ([int]$Signal -gt 60) {"Green"} else {"Yellow"}) }
Write-Host ""
Write-Host "  Full report saved to Desktop!" -ForegroundColor Cyan
Write-Host "  Visit everydaycyberai.in for more free tools!" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press any key to exit..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
