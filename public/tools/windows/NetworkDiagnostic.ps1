# Everyday Cyber AI - Network Diagnostic Tool v1.0
$ErrorActionPreference = "SilentlyContinue"
$ReportPath = "$env:USERPROFILE\Desktop\NetworkReport_$(Get-Date -Format 'yyyyMMdd_HHmm').html"

function PingTest($host, $label) {
    Write-Host "  Testing $label..." -ForegroundColor Yellow
    $r = Test-Connection -ComputerName $host -Count 3 -EA SilentlyContinue
    if ($r) {
        $avg = [math]::Round(($r | Measure-Object -Property ResponseTime -Average).Average)
        Write-Host "  $label : OK - ${avg}ms" -ForegroundColor Green
        return @{ ok=$true; ms=$avg; label=$label; host=$host }
    }
    Write-Host "  $label : UNREACHABLE" -ForegroundColor Red
    return @{ ok=$false; ms=999; label=$label; host=$host }
}

Write-Host ""
$gw = (Get-NetIPConfiguration | Where-Object {$_.IPv4DefaultGateway} | Select-Object -First 1).IPv4DefaultGateway.NextHop
$p0 = if ($gw) { PingTest $gw "Your Router ($gw)" } else { @{ok=$false;ms=999;label="Router";host="N/A"} }
$p1 = PingTest "8.8.8.8"    "Google DNS"
$p2 = PingTest "1.1.1.1"    "Cloudflare DNS"
$p3 = PingTest "google.com" "Google.com"
$p4 = PingTest "youtube.com" "YouTube"

$DNS    = Resolve-DnsName "google.com" -EA SilentlyContinue
$IPCfg  = Get-NetIPConfiguration | Where-Object { $_.IPv4DefaultGateway }
$WifiRaw = netsh wlan show interfaces 2>$null
$Signal = (($WifiRaw | Where-Object { $_ -match "Signal" }) -replace "[^0-9]","").Trim()
$SSID   = (($WifiRaw | Where-Object { $_ -match "^\s+SSID\s+:" }) -replace ".*:\s*","").Trim()
$Adapters = Get-NetAdapter | Where-Object { $_.Status -eq "Up" }

Write-Host ""
Write-Host " Building HTML report..." -ForegroundColor Yellow

function PBadge($ms) {
    if     ($ms -le 30)  { return "<b style='color:#22c55e'>${ms}ms - Excellent</b>" }
    elseif ($ms -le 80)  { return "<b style='color:#22c55e'>${ms}ms - Good</b>" }
    elseif ($ms -le 150) { return "<b style='color:#eab308'>${ms}ms - Fair</b>" }
    elseif ($ms -le 300) { return "<b style='color:#f97316'>${ms}ms - Slow</b>" }
    else                 { return "<b style='color:#ef4444'>Timeout</b>" }
}

$pingRows = ""
foreach ($p in @($p0,$p1,$p2,$p3,$p4)) {
    $stat = if ($p.ok) { "<b style='color:#22c55e'>OK</b>" } else { "<b style='color:#ef4444'>FAIL</b>" }
    $lat  = if ($p.ok) { PBadge $p.ms } else { "<b style='color:#ef4444'>No response</b>" }
    $pingRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#e2e8f0;'>$($p.label)</td><td style='padding:10px 14px;'>$stat</td><td style='padding:10px 14px;'>$lat</td></tr>"
}

$adpRows = ""
foreach ($a in $Adapters) {
    $spd = [math]::Round($a.LinkSpeed / 1000000)
    $adpRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#94a3b8;'>$($a.Name)</td><td colspan='2' style='padding:10px 14px;font-size:13px;font-weight:600;color:#22d3ee;'>$spd Mbps - $($a.Status)</td></tr>"
}

if ($SSID -and $Signal) {
    $sc = if ([int]$Signal -gt 70) { "#22c55e" } elseif ([int]$Signal -gt 40) { "#eab308" } else { "#ef4444" }
    $sl = if ([int]$Signal -gt 70) { "Strong" } elseif ([int]$Signal -gt 40) { "Fair" } else { "Weak - move closer to router" }
    $adpRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#94a3b8;'>WiFi Network</td><td colspan='2' style='padding:10px 14px;font-size:13px;font-weight:600;color:#e2e8f0;'>$SSID</td></tr>"
    $adpRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#94a3b8;'>WiFi Signal</td><td colspan='2' style='padding:10px 14px;font-size:13px;font-weight:700;color:$sc;'>$Signal% - $sl</td></tr>"
}

$cfgRows = ""
foreach ($c in $IPCfg) {
    $cfgRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#94a3b8;'>$($c.InterfaceAlias) - IP</td><td colspan='2' style='padding:10px 14px;font-size:13px;font-weight:600;color:#22d3ee;'>$($c.IPv4Address.IPAddress)</td></tr>"
    $cfgRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#94a3b8;'>Gateway</td><td colspan='2' style='padding:10px 14px;font-size:13px;color:#e2e8f0;'>$($c.IPv4DefaultGateway.NextHop)</td></tr>"
    $cfgRows += "<tr style='border-bottom:1px solid #1e293b;'><td style='padding:10px 14px;font-size:13px;color:#94a3b8;'>DNS Servers</td><td colspan='2' style='padding:10px 14px;font-size:13px;color:#e2e8f0;'>$($c.DNSServer.ServerAddresses -join ', ')</td></tr>"
}

$recs = ""
if (-not $p0.ok) { $recs += "<tr><td style='padding:10px 14px;font-size:13px;color:#ef4444;font-weight:600;'>Cannot reach router</td><td style='padding:10px 14px;font-size:12px;color:#94a3b8;'>Check cable or WiFi. Restart router by unplugging for 30 seconds.</td></tr>" }
elseif (-not $p1.ok) { $recs += "<tr><td style='padding:10px 14px;font-size:13px;color:#ef4444;font-weight:600;'>No internet access</td><td style='padding:10px 14px;font-size:12px;color:#94a3b8;'>Router OK but no internet. Call your ISP or restart modem.</td></tr>" }
if ($Signal -and [int]$Signal -lt 40) { $recs += "<tr><td style='padding:10px 14px;font-size:13px;color:#eab308;font-weight:600;'>Weak WiFi signal ($Signal%)</td><td style='padding:10px 14px;font-size:12px;color:#94a3b8;'>Move closer to router or use LAN cable for better speed.</td></tr>" }
if ($p1.ok -and $p1.ms -gt 100) { $recs += "<tr><td style='padding:10px 14px;font-size:13px;color:#eab308;font-weight:600;'>High latency ($($p1.ms)ms)</td><td style='padding:10px 14px;font-size:12px;color:#94a3b8;'>Close background apps using internet. Pause downloads.</td></tr>" }
if ($recs -eq "" -and $p1.ok) { $recs = "<tr><td style='padding:10px 14px;font-size:13px;color:#22c55e;font-weight:600;'>Network looks healthy!</td><td style='padding:10px 14px;font-size:12px;color:#94a3b8;'>Good connectivity. No major issues detected.</td></tr>" }

$HTML = @"
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Network Report - $(Get-Date -Format 'dd MMM yyyy HH:mm')</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'Segoe UI',Arial,sans-serif;background:#0a1628;color:#e2e8f0}
.hdr{background:linear-gradient(135deg,#0f2844,#071220);border-bottom:3px solid #22d3ee;padding:24px 36px}
.logo{color:#22d3ee;font-size:20px;font-weight:800}
.sub{color:#64748b;font-size:12px;margin-top:2px}
h1{font-size:22px;font-weight:700;margin-top:10px}
.dt{color:#64748b;font-size:11px;margin-top:4px}
.wrap{max-width:860px;margin:0 auto;padding:24px 16px}
.sec{background:rgba(15,40,68,0.6);border:1px solid #1e293b;border-radius:12px;margin-bottom:16px;overflow:hidden}
.sth{background:rgba(34,211,238,0.07);padding:11px 16px;font-size:13px;font-weight:700;color:#22d3ee;border-bottom:1px solid #1e293b}
table{width:100%;border-collapse:collapse}
.ftr{text-align:center;padding:20px;color:#475569;font-size:11px;border-top:1px solid #1e293b;margin-top:16px}
.ftr a{color:#22d3ee;text-decoration:none}
</style>
</head>
<body>
<div class="hdr">
  <div class="logo">Network  Everyday Cyber AI</div>
  <div class="sub">everydaycyberai.in - Free Network Diagnostic Tool</div>
  <h1>Network Diagnostic Report</h1>
  <div class="dt">$(Get-Date -Format 'dddd, dd MMMM yyyy  HH:mm') | PC: $env:COMPUTERNAME</div>
</div>
<div class="wrap">
<div class="sec"><div class="sth">Connectivity Tests</div><table>$pingRows</table></div>
<div class="sec"><div class="sth">Network Adapters and WiFi</div><table>$adpRows</table></div>
<div class="sec"><div class="sth">IP Configuration</div><table>$cfgRows</table></div>
<div class="sec"><div class="sth">Recommendations</div><table>$recs</table></div>
</div>
<div class="ftr">
  Generated by <a href="https://everydaycyberai.in">Everyday Cyber AI</a> - Free Windows Tools for India |
  Need help? <a href="https://wa.me/918454031225">WhatsApp: +91 84540 31225</a>
</div>
</body>
</html>
"@

$HTML | Out-File -FilePath $ReportPath -Encoding UTF8 -Force

if (Test-Path $ReportPath) {
    Write-Host ""
    Write-Host " ============================================" -ForegroundColor Green
    Write-Host "   DIAGNOSTIC COMPLETE!" -ForegroundColor Green
    Write-Host " ============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "  Router  : $(if ($p0.ok) {"OK"} else {"FAIL"})" -ForegroundColor $(if ($p0.ok) {"Green"} else {"Red"})
    Write-Host "  Internet: $(if ($p1.ok) {"OK - $($p1.ms)ms"} else {"NO CONNECTION"})" -ForegroundColor $(if ($p1.ok) {"Green"} else {"Red"})
    Write-Host "  DNS     : $(if ($DNS) {"Working"} else {"Issue detected"})" -ForegroundColor $(if ($DNS) {"Green"} else {"Red"})
    if ($Signal) { Write-Host "  WiFi    : $Signal% Signal" -ForegroundColor $(if ([int]$Signal -gt 60) {"Green"} else {"Yellow"}) }
    Write-Host ""
    Write-Host "  Report saved to Desktop!" -ForegroundColor Cyan
    Write-Host "  Visit: everydaycyberai.in for more free tools" -ForegroundColor Cyan
    Write-Host ""
    Start-Process $ReportPath
} else {
    Write-Host "  ERROR: Could not save report!" -ForegroundColor Red
}
