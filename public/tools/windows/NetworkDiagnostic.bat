@echo off
setlocal enabledelayedexpansion
title Everyday Cyber AI - Network Diagnostic
color 0B
cls
echo.
echo  =============================================
echo    Everyday Cyber AI - Network Diagnostic
echo    everydaycyberai.in
echo  =============================================
echo.
echo  Running network tests... Please wait...
echo.

for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set DT=%%I
set "FNAME=%USERPROFILE%\Desktop\NetworkReport_%DT:~0,8%_%DT:~8,4%.html"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
"$e='SilentlyContinue';" ^
"function PT($h,$l){$r=Test-Connection $h -Count 3 -EA $e;if($r){$ms=[math]::Round(($r|Measure-Object ResponseTime -Average).Average);Write-Host \"  [$l] $ms ms\" -ForegroundColor Green;return @{ok=$true;ms=$ms;l=$l;h=$h}}else{Write-Host \"  [$l] Unreachable\" -ForegroundColor Red;return @{ok=$false;ms=999;l=$l;h=$h}}};" ^
"Write-Host 'Testing connectivity...' -ForegroundColor Yellow;" ^
"$gw=(Get-NetIPConfiguration -EA $e|Where-Object{$_.IPv4DefaultGateway}|Select-Object -First 1).IPv4DefaultGateway.NextHop;" ^
"$p0=if($gw){PT $gw 'Your Router'}else{@{ok=$false;ms=999;l='Router';h='N/A'}};" ^
"$p1=PT '8.8.8.8' 'Google DNS';" ^
"$p2=PT '1.1.1.1' 'Cloudflare DNS';" ^
"$p3=PT 'google.com' 'Google.com';" ^
"$p4=PT 'youtube.com' 'YouTube';" ^
"Write-Host '';" ^
"$dns=Resolve-DnsName 'google.com' -EA $e;" ^
"$wi=netsh wlan show interfaces 2>$null;" ^
"$sig=(($wi|Where-Object{$_ -match 'Signal'})-replace'[^0-9]','').Trim();" ^
"$ssid=(($wi|Where-Object{$_ -match '^\s+SSID\s+:'})-replace'.*:\s*','').Trim();" ^
"$adp=Get-NetAdapter -EA $e|Where-Object{$_.Status -eq 'Up'};" ^
"$cfg=Get-NetIPConfiguration -EA $e|Where-Object{$_.IPv4DefaultGateway};" ^
"Write-Host 'Building report...' -ForegroundColor Yellow;" ^
"function PB($ms){if($ms-le 30){'<b style=color:#22c55e>'+$ms+'ms Excellent</b>'}elseif($ms-le 80){'<b style=color:#22c55e>'+$ms+'ms Good</b>'}elseif($ms-le 150){'<b style=color:#eab308>'+$ms+'ms Fair</b>'}elseif($ms-le 300){'<b style=color:#f97316>'+$ms+'ms Slow</b>'}else{'<b style=color:#ef4444>Timeout</b>'}};" ^
"function SB($ok){if($ok){'<b style=color:#22c55e>OK</b>'}else{'<b style=color:#ef4444>FAIL</b>'}};" ^
"$rows='';foreach($p in @($p0,$p1,$p2,$p3,$p4)){$lat=if($p.ok){PB $p.ms}else{'<b style=color:#ef4444>No response</b>'};$rows+=\"<tr><td>$($p.l)</td><td>$(SB $p.ok)</td><td>$lat</td></tr>\"};" ^
"$arows='';foreach($a in $adp){$spd=[math]::Round($a.LinkSpeed/1000000);$arows+=\"<tr><td>$($a.Name)</td><td><b>$spd Mbps</b></td></tr>\"};" ^
"if($ssid){$sc=if([int]$sig-gt 70){'#22c55e'}elseif([int]$sig-gt 40){'#eab308'}else{'#ef4444'};$sl=if([int]$sig-gt 70){'Strong'}elseif([int]$sig-gt 40){'Fair'}else{'Weak - move closer to router'};$arows+=\"<tr><td>WiFi: $ssid</td><td><b style=color:$sc>Signal: $sig%% ($sl)</b></td></tr>\"};" ^
"$crows='';foreach($c in $cfg){$crows+=\"<tr><td>Interface</td><td><b>$($c.InterfaceAlias)</b></td></tr><tr><td>IP Address</td><td><b style=color:#22d3ee>$($c.IPv4Address.IPAddress)</b></td></tr><tr><td>Gateway</td><td>$($c.IPv4DefaultGateway.NextHop)</td></tr><tr><td>DNS Servers</td><td>$($c.DNSServer.ServerAddresses -join ', ')</td></tr>\"};" ^
"$recs='';if(-not $p0.ok){$recs+='<li style=color:#ef4444>Cannot reach router - check cable or WiFi, restart router</li>'}elseif(-not $p1.ok){$recs+='<li style=color:#ef4444>No internet - router OK but ISP issue, restart modem</li>'}if($sig -and [int]$sig-lt 40){$recs+=\"<li style=color:#eab308>Weak WiFi ($sig%%) - move closer to router or use ethernet cable</li>\"}if($p1.ok -and $p1.ms-gt 100){$recs+=\"<li style=color:#eab308>High latency ($($p1.ms)ms) - close background apps using internet</li>\"}if($recs-eq ''){$recs='<li style=color:#22c55e>Network looks healthy! No major issues found.</li>'};" ^
"$h=\"<!DOCTYPE html><html><head><meta charset=UTF-8><title>Network Report $(Get-Date -Format 'dd-MM-yyyy')</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#e2e8f0}header{background:linear-gradient(135deg,#0f2844,#071220);border-bottom:3px solid #22d3ee;padding:24px 32px}.logo{color:#22d3ee;font-size:18px;font-weight:800}h1{font-size:22px;font-weight:700;margin-top:8px}.dt{color:#64748b;font-size:11px;margin-top:3px}.wrap{max-width:860px;margin:0 auto;padding:24px 16px}.card{background:rgba(15,40,68,0.6);border:1px solid #1e293b;border-radius:12px;margin-bottom:18px;overflow:hidden}.ct{background:rgba(34,211,238,0.08);padding:11px 16px;font-size:13px;font-weight:700;color:#22d3ee;border-bottom:1px solid #1e293b}table{width:100%;border-collapse:collapse}td{padding:10px 14px;font-size:13px;border-bottom:1px solid #1e293b}ul{padding:14px 14px 14px 32px}li{padding:5px 0;font-size:13px}footer{text-align:center;padding:20px;color:#475569;font-size:11px;border-top:1px solid #1e293b;margin-top:16px}footer a{color:#22d3ee;text-decoration:none}</style></head><body><header><div class=logo>🌐 Everyday Cyber AI</div><p style=color:#64748b;font-size:11px>everydaycyberai.in</p><h1>Network Diagnostic Report</h1><div class=dt>$(Get-Date -Format 'dddd, dd MMMM yyyy - HH:mm') | PC: $env:COMPUTERNAME</div></header><div class=wrap><div class=card><div class=ct>🌐 Connectivity Tests</div><table><tr style=background:rgba(34,211,238,0.04)><td style=color:#64748b>Target</td><td style=color:#64748b>Status</td><td style=color:#64748b>Speed</td></tr>$rows</table></div><div class=card><div class=ct>📶 Network Adapters</div><table>$arows</table></div><div class=card><div class=ct>⚙️ IP Configuration</div><table>$crows</table></div><div class=card><div class=ct>💡 Recommendations</div><ul>$recs</ul></div></div><footer>🛡️ <a href=https://everydaycyberai.in>Everyday Cyber AI</a> | WhatsApp: <a href=https://wa.me/918454031225>+91 84540 31225</a></footer></body></html>\";" ^
"$h|Out-File '%FNAME%' -Encoding UTF8;" ^
"Write-Host '';" ^
"Write-Host '  ===========================================' -ForegroundColor Green;" ^
"Write-Host '   DIAGNOSTIC COMPLETE!' -ForegroundColor Green;" ^
"Write-Host \"   Router:   $(if($p0.ok){'OK - '+$p0.ms+'ms'}else{'UNREACHABLE'})\" -ForegroundColor $(if($p0.ok){'Green'}else{'Red'});" ^
"Write-Host \"   Internet: $(if($p1.ok){'OK - '+$p1.ms+'ms'}else{'NO CONNECTION'})\" -ForegroundColor $(if($p1.ok){'Green'}else{'Red'});" ^
"Write-Host \"   DNS:      $(if($dns){'Working'}else{'Issue detected'})\" -ForegroundColor $(if($dns){'Green'}else{'Red'});" ^
"if($sig){Write-Host \"   WiFi:     $sig%% signal\" -ForegroundColor $(if([int]$sig-gt 60){'Green'}else{'Yellow'})};" ^
"Write-Host '  ===========================================' -ForegroundColor Green;" ^
"Write-Host '';" ^
"Write-Host '  Report saved to Desktop!' -ForegroundColor Cyan;" ^
"Write-Host '  Opening in browser...' -ForegroundColor Yellow;" ^
"Start-Process '%FNAME%'"

echo.
echo  =============================================
echo   Done! Check Desktop for HTML report.
echo  =============================================
echo.
pause
