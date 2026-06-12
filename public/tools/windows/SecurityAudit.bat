@echo off
setlocal enabledelayedexpansion
title Everyday Cyber AI - Security Audit
color 0B
cls
echo.
echo  =============================================
echo    Everyday Cyber AI - Windows Security Audit
echo    everydaycyberai.in
echo  =============================================
echo.
echo  Scanning your PC... Please wait 30-60 seconds
echo.

:: Save report to Desktop
for /f "tokens=2 delims==" %%I in ('wmic os get localdatetime /value') do set DT=%%I
set "FNAME=%USERPROFILE%\Desktop\SecurityAudit_%DT:~0,8%_%DT:~8,4%.html"

powershell.exe -NoProfile -ExecutionPolicy Bypass -Command ^
"$e='SilentlyContinue';$ErrorActionPreference=$e;" ^
"try{" ^
"$def=Get-MpComputerStatus -EA $e;" ^
"$avn=if($def){$def.AntivirusEnabled}else{$false};" ^
"$rtp=if($def){$def.RealTimeProtectionEnabled}else{$false};" ^
"$age=if($def){$def.AntivirusSignatureAge}else{99};" ^
"$fw=Get-NetFirewallProfile -EA $e;" ^
"$fwp=($fw|Where-Object{$_.Name-eq'Public'}).Enabled;" ^
"$fwv=($fw|Where-Object{$_.Name-eq'Private'}).Enabled;" ^
"$uac=(Get-ItemProperty 'HKLM:\SOFTWARE\Microsoft\Windows\CurrentVersion\Policies\System' -EA $e).EnableLUA -eq 1;" ^
"$rdp=(Get-ItemProperty 'HKLM:\SYSTEM\CurrentControlSet\Control\Terminal Server' -EA $e).fDenyTSConnections -eq 0;" ^
"$upd=0;try{$s=New-Object -ComObject Microsoft.Update.Session;$upd=$s.CreateUpdateSearcher().Search('IsInstalled=0 and Type=Software').Updates.Count}catch{};" ^
"$bl=Get-BitLockerVolume -MountPoint 'C:' -EA $e;$bls=if($bl){$bl.ProtectionStatus}else{'Unknown'};" ^
"$pol=net accounts 2>$null;$mpw=(($pol|Where-Object{$_ -match 'Minimum password length'})-replace'\D+','').Trim();" ^
"$ports=@();$ns=netstat -an 2>$null;@(21,23,445,3389,5900)|ForEach-Object{if($ns -match \":$_\s\"){$ports+=$_}};" ^
"$score=0;if($avn){$score+=12}if($rtp){$score+=10}if($age-le 3){$score+=8}if($fwp){$score+=12}if($fwv){$score+=5}if($upd-eq 0){$score+=12}if($bls-eq 'On'){$score+=10}if($uac){$score+=8}if(-not $rdp){$score+=8}if([int]$mpw-ge 8){$score+=8}if($ports.Count-eq 0){$score+=7};" ^
"$grade=if($score-ge 90){'A+ Excellent'}elseif($score-ge 75){'A Good'}elseif($score-ge 60){'B Fair'}elseif($score-ge 40){'C Needs Work'}else{'D Critical'};" ^
"$gc=if($score-ge 75){'#22c55e'}elseif($score-ge 50){'#eab308'}else{'#ef4444'};" ^
"$os=(Get-CimInstance Win32_OperatingSystem -EA $e).Caption;" ^
"$cs=(Get-CimInstance Win32_ComputerSystem -EA $e);" ^
"$ram=[math]::Round($cs.TotalPhysicalMemory/1GB,1);" ^
"$disks='';foreach($d in (Get-CimInstance Win32_LogicalDisk -Filter 'DriveType=3' -EA $e)){$f=[math]::Round($d.FreeSpace/1GB,1);$t=[math]::Round($d.Size/1GB,1);$p=[math]::Round(($d.Size-$d.FreeSpace)/$d.Size*100);$dc=if($p-gt 90){'#ef4444'}elseif($p-gt 75){'#eab308'}else{'#22c55e'};$disks+=\"<tr><td>Drive $($d.DeviceID)</td><td style='color:$dc'>$f GB free / $t GB ($p%% used)</td></tr>\"};" ^
"function R($l,$s,$v,$r){$i=if($s-eq'pass'){'OK'}elseif($s-eq'warn'){'WARN'}else{'FAIL'};$c=if($s-eq'pass'){'#22c55e'}elseif($s-eq'warn'){'#eab308'}else{'#ef4444'};$bg=if($s-eq'pass'){'rgba(34,197,94,0.05)'}elseif($s-eq'warn'){'rgba(234,179,8,0.07)'}else{'rgba(239,68,68,0.08)'};return \"<tr style='background:$bg'><td style='padding:10px 14px;font-size:13px;color:#e2e8f0'>$l</td><td style='padding:10px 14px;font-weight:700;color:$c'>$i</td><td style='padding:10px 14px;font-size:13px;font-weight:600;color:$c'>$v</td><td style='padding:10px 14px;font-size:12px;color:#94a3b8'>$r</td></tr>\"};" ^
"$rows='';" ^
"$rows+=R 'Windows Defender' (if($avn){'pass'}else{'fail'}) (if($avn){'Enabled'}else{'DISABLED'}) (if(-not $avn){'Open Windows Security and enable antivirus NOW'}else{'Good - keep enabled'});" ^
"$rows+=R 'Real-Time Protection' (if($rtp){'pass'}else{'fail'}) (if($rtp){'Active'}else{'OFF'}) (if(-not $rtp){'Windows Security > Virus Protection > Real-Time > ON'}else{'Good'});" ^
"$rows+=R 'Antivirus Definitions' (if($age-le 3){'pass'}else{'warn'}) (if($age-le 3){'Up to date'}else{\"$age days old\"}) (if($age-gt 3){'Open Windows Security > Update definitions'}else{'Good'});" ^
"$rows+=R 'Windows Firewall Public' (if($fwp){'pass'}else{'fail'}) (if($fwp){'Enabled'}else{'DISABLED'}) (if(-not $fwp){'Control Panel > Windows Firewall > Turn On'}else{'Good'});" ^
"$rows+=R 'Windows Firewall Private' (if($fwv){'pass'}else{'warn'}) (if($fwv){'Enabled'}else{'Disabled'}) (if(-not $fwv){'Enable Windows Firewall for Private network too'}else{'Good'});" ^
"$rows+=R 'Windows Updates' (if($upd-eq 0){'pass'}elseif($upd-le 5){'warn'}else{'fail'}) (if($upd-eq 0){'Up to date'}else{\"$upd updates pending\"}) (if($upd-gt 0){'Settings > Windows Update > Install All'}else{'System is up to date'});" ^
"$rows+=R 'BitLocker Encryption' (if($bls-eq 'On'){'pass'}else{'warn'}) (if($bls-eq 'On'){'Enabled'}else{'Not enabled'}) (if($bls-ne 'On'){'Enable BitLocker to protect data if laptop stolen'}else{'Good'});" ^
"$rows+=R 'User Account Control' (if($uac){'pass'}else{'fail'}) (if($uac){'Enabled'}else{'DISABLED'}) (if(-not $uac){'Control Panel > User Accounts > UAC Settings > Default'}else{'Good'});" ^
"$rows+=R 'Remote Desktop RDP' (if(-not $rdp){'pass'}else{'warn'}) (if(-not $rdp){'Disabled'}else{'ENABLED'}) (if($rdp){'Settings > System > Remote Desktop > OFF if not needed'}else{'Good'});" ^
"$rows+=R 'Password Length Policy' (if([int]$mpw-ge 8){'pass'}else{'warn'}) \"Min: $mpw chars\" (if([int]$mpw-lt 8){'Run as Admin: net accounts /minpwlen:8'}else{'Good'});" ^
"$rows+=R 'Dangerous Open Ports' (if($ports.Count-eq 0){'pass'}else{'warn'}) (if($ports.Count-eq 0){'None detected'}else{\"Open: $($ports -join ', ')\"}) (if($ports.Count-gt 0){'Disable unused services on these ports'}else{'Good'});" ^
"$recs='';if(-not $avn){$recs+='<li style=\"color:#ef4444\"><b>CRITICAL:</b> Enable Windows Defender antivirus immediately</li>'}if(-not $rtp){$recs+='<li style=\"color:#ef4444\"><b>CRITICAL:</b> Enable Real-Time Protection in Windows Security</li>'}if(-not $fwp){$recs+='<li style=\"color:#ef4444\"><b>CRITICAL:</b> Enable Windows Firewall for Public network</li>'}if($upd-gt 0){$recs+=\"<li style='color:#eab308'><b>HIGH:</b> Install $upd pending Windows updates</li>\"}if($rdp){$recs+='<li style=\"color:#eab308\"><b>MEDIUM:</b> Disable Remote Desktop if not needed</li>'}if($bls-ne 'On'){$recs+='<li style=\"color:#eab308\"><b>MEDIUM:</b> Enable BitLocker drive encryption</li>'}if($recs-eq ''){$recs='<li style=\"color:#22c55e\">System looks secure! Keep Windows updated regularly.</li>'};" ^
"$h=\"<!DOCTYPE html><html><head><meta charset='UTF-8'><title>Security Audit $(Get-Date -Format 'dd-MM-yyyy')</title><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:'Segoe UI',Arial,sans-serif;background:#0f172a;color:#e2e8f0}header{background:linear-gradient(135deg,#0f2844,#071220);border-bottom:3px solid #22d3ee;padding:24px 32px}.logo{color:#22d3ee;font-size:18px;font-weight:800}h1{font-size:22px;font-weight:700;margin-top:8px}.dt{color:#64748b;font-size:11px;margin-top:3px}.wrap{max-width:900px;margin:0 auto;padding:24px 16px}.card{background:rgba(15,40,68,0.6);border:1px solid #1e293b;border-radius:12px;margin-bottom:18px;overflow:hidden}.ct{background:rgba(34,211,238,0.08);padding:11px 16px;font-size:13px;font-weight:700;color:#22d3ee;border-bottom:1px solid #1e293b}.sc{text-align:center;padding:24px;background:linear-gradient(135deg,rgba(34,211,238,0.1),rgba(59,130,246,0.08));border:1px solid rgba(34,211,238,0.2);border-radius:12px;margin-bottom:18px}.sn{font-size:70px;font-weight:900;color:$gc;line-height:1}.sg{font-size:18px;font-weight:700;margin-top:4px}.sb{font-size:12px;color:#94a3b8;margin-top:8px}table{width:100%;border-collapse:collapse}td{border-bottom:1px solid #1e293b}footer{text-align:center;padding:20px;color:#475569;font-size:11px;border-top:1px solid #1e293b;margin-top:16px}footer a{color:#22d3ee;text-decoration:none}ul{padding:16px 16px 16px 32px}li{padding:6px 0;font-size:13px;border-bottom:1px solid #1e293b}.grid{display:grid;grid-template-columns:1fr 1fr;gap:0}table.si td{padding:9px 14px;font-size:13px;border-bottom:1px solid #1e293b}</style></head><body><header><div class='logo'>🛡️ Everyday Cyber AI</div><p style='color:#64748b;font-size:11px'>everydaycyberai.in</p><h1>Windows Security Audit Report</h1><div class='dt'>$(Get-Date -Format 'dddd, dd MMMM yyyy — HH:mm') &nbsp;|&nbsp; PC: $($cs.Name) &nbsp;|&nbsp; User: $env:USERNAME</div></header><div class='wrap'><div class='sc'><div class='sn'>$score</div><div class='sg' style='color:$gc'>$grade</div><div class='sb'>Security Score out of 100 — based on 11 checks</div></div><div class='card'><div class='ct'>🔒 Security Check Results</div><table><tr style='background:rgba(34,211,238,0.04)'><td style='padding:10px 14px;font-size:12px;color:#64748b;width:28%'>Check</td><td style='padding:10px 14px;font-size:12px;color:#64748b;width:12%'>Status</td><td style='padding:10px 14px;font-size:12px;color:#64748b;width:20%'>Result</td><td style='padding:10px 14px;font-size:12px;color:#64748b'>Action Required</td></tr>$rows</table></div><div class='card'><div class='ct'>💻 System Info</div><table class='si'><tr><td>OS</td><td><b>$os</b></td><td>RAM</td><td><b>$ram GB</b></td></tr><tr><td>Computer</td><td><b>$($cs.Name)</b></td><td>Build</td><td><b>$((Get-CimInstance Win32_OperatingSystem -EA SilentlyContinue).BuildNumber)</b></td></tr>$disks</table></div><div class='card'><div class='ct'>📋 Action Items</div><ul>$recs</ul></div></div><footer>🛡️ <a href='https://everydaycyberai.in'>Everyday Cyber AI</a> — Free Windows Security Tools | WhatsApp: <a href='https://wa.me/918454031225'>+91 84540 31225</a></footer></body></html>\";" ^
"$h | Out-File -FilePath '%FNAME%' -Encoding UTF8;" ^
"Write-Host '' -ForegroundColor Green;" ^
"Write-Host '  ===========================================' -ForegroundColor Green;" ^
"Write-Host '   SCAN COMPLETE!' -ForegroundColor Green;" ^
"Write-Host '  ===========================================' -ForegroundColor Green;" ^
"Write-Host \"  Score: $score / 100 - $grade\" -ForegroundColor $(if($score -ge 75){'Green'}elseif($score -ge 50){'Yellow'}else{'Red'});" ^
"Write-Host '  Report saved to Desktop!' -ForegroundColor Cyan;" ^
"Write-Host '  Opening report in browser...' -ForegroundColor Yellow;" ^
"Start-Process '%FNAME%';" ^
"}catch{Write-Host 'ERROR: '$_.Exception.Message -ForegroundColor Red;Write-Host 'Please run as Administrator' -ForegroundColor Yellow}"

echo.
echo =============================================
echo  Report saved to your Desktop!
echo  Check for SecurityAudit_[date].html file
echo =============================================
echo.
pause
