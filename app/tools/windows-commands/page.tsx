"use client";
import { useState, useMemo } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Cmd = { cmd: string; desc: string };
type Category = { name: string; items: Cmd[] };

const CMD_COMMANDS: Category[] = [
  {
    name: "File & Directory",
    items: [
      { cmd: "dir", desc: "List files and folders in current directory" },
      { cmd: "cd foldername", desc: "Change directory" },
      { cmd: "cd ..", desc: "Go up one directory level" },
      { cmd: "mkdir foldername", desc: "Create a new folder" },
      { cmd: "rmdir foldername", desc: "Remove an empty folder" },
      { cmd: "del filename", desc: "Delete a file" },
      { cmd: "copy source dest", desc: "Copy a file" },
      { cmd: "move source dest", desc: "Move or rename a file/folder" },
      { cmd: "ren oldname newname", desc: "Rename a file" },
      { cmd: "type filename", desc: "Display contents of a text file" },
      { cmd: "tree", desc: "Show folder structure as a tree" },
    ],
  },
  {
    name: "Network",
    items: [
      { cmd: "ipconfig", desc: "Show IP address configuration" },
      { cmd: "ipconfig /all", desc: "Show detailed network configuration" },
      { cmd: "ipconfig /flushdns", desc: "Clear the DNS resolver cache" },
      { cmd: "ipconfig /release", desc: "Release current DHCP IP address" },
      { cmd: "ipconfig /renew", desc: "Renew DHCP IP address" },
      { cmd: "ping hostname", desc: "Test connectivity to a host" },
      { cmd: "tracert hostname", desc: "Trace the network route to a host" },
      { cmd: "nslookup domain", desc: "Look up DNS records for a domain" },
      { cmd: "netstat -an", desc: "List active network connections" },
      { cmd: "arp -a", desc: "Show ARP table (IP to MAC mappings)" },
      { cmd: "netsh wlan show profiles", desc: "List saved WiFi network names" },
    ],
  },
  {
    name: "System Info & Processes",
    items: [
      { cmd: "systeminfo", desc: "Show detailed system information" },
      { cmd: "tasklist", desc: "List all running processes" },
      { cmd: "taskkill /IM name.exe /F", desc: "Force-kill a process by name" },
      { cmd: "whoami", desc: "Show current logged-in username" },
      { cmd: "hostname", desc: "Show the computer's hostname" },
      { cmd: "ver", desc: "Show Windows version" },
      { cmd: "sfc /scannow", desc: "Scan and repair protected system files" },
    ],
  },
  {
    name: "Disk & Storage",
    items: [
      { cmd: "chkdsk C:", desc: "Check a disk for errors" },
      { cmd: "chkdsk C: /f", desc: "Check and fix disk errors" },
      { cmd: "diskpart", desc: "Open the disk partitioning tool" },
      { cmd: "cipher /w:C:", desc: "Securely wipe free space on a drive" },
    ],
  },
  {
    name: "Users & Permissions",
    items: [
      { cmd: "net user", desc: "List all user accounts" },
      { cmd: "net user username", desc: "Show details of a specific user" },
      { cmd: "net localgroup administrators", desc: "List local administrators" },
    ],
  },
];

const POWERSHELL_COMMANDS: Category[] = [
  {
    name: "File & Directory",
    items: [
      { cmd: "Get-ChildItem", desc: "List files and folders (like 'dir' or 'ls')" },
      { cmd: "Set-Location C:\\Path", desc: "Change directory" },
      { cmd: "Get-Content file.txt", desc: "Display contents of a file" },
      { cmd: "Copy-Item source dest", desc: "Copy a file or folder" },
      { cmd: "Move-Item source dest", desc: "Move or rename a file/folder" },
      { cmd: "Remove-Item filename", desc: "Delete a file or folder" },
      { cmd: "New-Item -ItemType Directory -Name X", desc: "Create a new folder" },
    ],
  },
  {
    name: "System & Processes",
    items: [
      { cmd: "Get-Process", desc: "List all running processes" },
      { cmd: "Stop-Process -Name name -Force", desc: "Force-stop a process by name" },
      { cmd: "Get-Service", desc: "List all Windows services" },
      { cmd: "Restart-Service servicename", desc: "Restart a specific service" },
      { cmd: "Get-ComputerInfo", desc: "Show detailed system/OS information" },
      { cmd: "Get-EventLog -LogName System -Newest 20", desc: "Show latest 20 system event log entries" },
      { cmd: "Get-LocalUser", desc: "List all local user accounts" },
    ],
  },
  {
    name: "Network",
    items: [
      { cmd: "Get-NetIPAddress", desc: "Show IP address configuration" },
      { cmd: "Test-Connection hostname", desc: "Ping a host (PowerShell equivalent)" },
      { cmd: "Test-NetConnection hostname -Port 443", desc: "Test if a specific port is reachable" },
      { cmd: "Get-DnsClientCache", desc: "Show the DNS resolver cache" },
      { cmd: "Resolve-DnsName domain.com", desc: "Look up DNS records for a domain" },
      { cmd: "Invoke-WebRequest -Uri url", desc: "Fetch a web page or file from a URL" },
    ],
  },
  {
    name: "Security & Policy",
    items: [
      { cmd: "Get-ExecutionPolicy", desc: "Show the current script execution policy" },
      { cmd: "Set-ExecutionPolicy RemoteSigned", desc: "Allow locally-created scripts to run" },
      { cmd: "Get-MpComputerStatus", desc: "Show Windows Defender status" },
      { cmd: "Start-MpScan -ScanType QuickScan", desc: "Run a Windows Defender quick scan" },
    ],
  },
  {
    name: "Disk & Storage",
    items: [
      { cmd: "Get-Volume", desc: "List all disk volumes and free space" },
      { cmd: "Get-Disk", desc: "List all physical disks" },
      { cmd: "Get-PSDrive", desc: "List all mounted drives" },
    ],
  },
];

function CommandList({ categories, filter }: { categories: Category[]; filter: string }) {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  const copy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 1200);
  };

  const filtered = useMemo(() => {
    if (!filter.trim()) return categories;
    const f = filter.toLowerCase();
    return categories
      .map((cat) => ({ ...cat, items: cat.items.filter(i => i.cmd.toLowerCase().includes(f) || i.desc.toLowerCase().includes(f)) }))
      .filter((cat) => cat.items.length > 0);
  }, [categories, filter]);

  if (filtered.length === 0) {
    return <p className="text-gray-500 text-center py-10">No commands match &quot;{filter}&quot;</p>;
  }

  return (
    <div className="space-y-8">
      {filtered.map((cat) => (
        <div key={cat.name}>
          <h3 className="text-lg font-bold text-cyan-400 mb-3">{cat.name}</h3>
          <div className="space-y-2">
            {cat.items.map((item) => (
              <button key={item.cmd} onClick={() => copy(item.cmd)}
                className="w-full text-left flex items-center justify-between gap-4 bg-black/40 border border-zinc-700/60 hover:border-cyan-400 rounded-xl px-5 py-3.5 transition group">
                <div className="min-w-0">
                  <code className="text-white font-mono text-sm block truncate">{item.cmd}</code>
                  <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
                </div>
                <span className="text-xs text-cyan-400 shrink-0 opacity-0 group-hover:opacity-100 transition">
                  {copiedCmd === item.cmd ? "✅ Copied" : "📋 Copy"}
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function WindowsCommandsPage() {
  const [tab, setTab] = useState<"cmd" | "powershell">("cmd");
  const [filter, setFilter] = useState("");

  return (
    <ToolPageWrapper badge="⌨️ Reference Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Windows CMD & PowerShell Commands</h1>
            <p className="text-gray-400">Free reference list of essential Windows commands — click any command to copy it instantly.</p>
          </div>

          <div className="flex gap-3 mb-6">
            <button onClick={() => setTab("cmd")}
              className={`flex-1 py-3 rounded-xl font-bold transition ${tab === "cmd" ? "bg-cyan-500 text-black" : "bg-zinc-800 text-gray-400 border border-zinc-700"}`}>
              CMD Commands
            </button>
            <button onClick={() => setTab("powershell")}
              className={`flex-1 py-3 rounded-xl font-bold transition ${tab === "powershell" ? "bg-cyan-500 text-black" : "bg-zinc-800 text-gray-400 border border-zinc-700"}`}>
              PowerShell Commands
            </button>
          </div>

          <input value={filter} onChange={e => setFilter(e.target.value)}
            placeholder="🔍 Search commands... e.g. network, process, file"
            className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3.5 text-white mb-8 outline-none focus:border-cyan-400 transition" />

          <CommandList categories={tab === "cmd" ? CMD_COMMANDS : POWERSHELL_COMMANDS} filter={filter} />

          <p className="text-xs text-gray-600 text-center mt-10">⚠️ Some commands (disk operations, killing processes, security policy changes) can affect your system — double-check before running unfamiliar commands, especially with admin/elevated privileges.</p>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
