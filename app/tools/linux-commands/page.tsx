"use client";
import { useState, useMemo } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Cmd = { cmd: string; desc: string };
type Category = { name: string; items: Cmd[] };

const LINUX_COMMANDS: Category[] = [
  {
    name: "File & Directory",
    items: [
      { cmd: "ls -la", desc: "List all files including hidden ones, with details" },
      { cmd: "cd /path/to/dir", desc: "Change directory" },
      { cmd: "pwd", desc: "Show current working directory" },
      { cmd: "mkdir dirname", desc: "Create a new directory" },
      { cmd: "rm -r dirname", desc: "Remove a directory and its contents" },
      { cmd: "rm filename", desc: "Delete a file" },
      { cmd: "cp source dest", desc: "Copy a file" },
      { cmd: "cp -r source dest", desc: "Copy a directory recursively" },
      { cmd: "mv source dest", desc: "Move or rename a file/folder" },
      { cmd: "touch filename", desc: "Create an empty file" },
      { cmd: "cat filename", desc: "Display contents of a file" },
      { cmd: "less filename", desc: "View a file page by page" },
      { cmd: "find / -name filename", desc: "Search for a file by name" },
      { cmd: "grep 'text' filename", desc: "Search for text inside a file" },
    ],
  },
  {
    name: "Network",
    items: [
      { cmd: "ip a", desc: "Show IP address configuration (modern)" },
      { cmd: "ifconfig", desc: "Show IP address configuration (legacy)" },
      { cmd: "ping hostname", desc: "Test connectivity to a host" },
      { cmd: "traceroute hostname", desc: "Trace the network route to a host" },
      { cmd: "ss -tuln", desc: "List active listening ports (modern netstat)" },
      { cmd: "netstat -tuln", desc: "List active listening ports (legacy)" },
      { cmd: "curl -I url", desc: "Fetch HTTP headers from a URL" },
      { cmd: "wget url", desc: "Download a file from a URL" },
      { cmd: "nslookup domain", desc: "Look up DNS records for a domain" },
      { cmd: "dig domain", desc: "Detailed DNS lookup for a domain" },
      { cmd: "hostname -I", desc: "Show the machine's IP address" },
    ],
  },
  {
    name: "System Info & Monitoring",
    items: [
      { cmd: "uname -a", desc: "Show system and kernel information" },
      { cmd: "top", desc: "Live view of running processes and resource usage" },
      { cmd: "htop", desc: "Improved interactive process viewer (if installed)" },
      { cmd: "df -h", desc: "Show disk space usage in human-readable form" },
      { cmd: "free -m", desc: "Show memory usage in MB" },
      { cmd: "uptime", desc: "Show how long the system has been running" },
      { cmd: "whoami", desc: "Show current logged-in username" },
      { cmd: "ps aux", desc: "List all running processes in detail" },
      { cmd: "kill PID", desc: "Terminate a process by its Process ID" },
      { cmd: "killall processname", desc: "Terminate all processes matching a name" },
    ],
  },
  {
    name: "Permissions & Users",
    items: [
      { cmd: "chmod 755 filename", desc: "Change file permissions" },
      { cmd: "chown user:group filename", desc: "Change file owner and group" },
      { cmd: "sudo command", desc: "Run a command with admin (root) privileges" },
      { cmd: "su - username", desc: "Switch to another user" },
      { cmd: "whoami", desc: "Show current user" },
      { cmd: "passwd", desc: "Change the current user's password" },
      { cmd: "useradd username", desc: "Create a new user (as root)" },
    ],
  },
  {
    name: "Package Management",
    items: [
      { cmd: "sudo apt update", desc: "Refresh package lists (Debian/Ubuntu)" },
      { cmd: "sudo apt install packagename", desc: "Install a package (Debian/Ubuntu)" },
      { cmd: "sudo apt upgrade", desc: "Upgrade all installed packages (Debian/Ubuntu)" },
      { cmd: "sudo yum install packagename", desc: "Install a package (RHEL/CentOS)" },
      { cmd: "sudo dnf install packagename", desc: "Install a package (Fedora)" },
    ],
  },
  {
    name: "Services (systemd)",
    items: [
      { cmd: "systemctl status servicename", desc: "Check status of a service" },
      { cmd: "sudo systemctl start servicename", desc: "Start a service" },
      { cmd: "sudo systemctl stop servicename", desc: "Stop a service" },
      { cmd: "sudo systemctl restart servicename", desc: "Restart a service" },
      { cmd: "sudo systemctl enable servicename", desc: "Enable a service to start on boot" },
      { cmd: "journalctl -u servicename", desc: "View logs for a specific service" },
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
            {cat.items.map((item, idx) => (
              <button key={`${item.cmd}-${idx}`} onClick={() => copy(item.cmd)}
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

export default function LinuxCommandsPage() {
  const [filter, setFilter] = useState("");

  return (
    <ToolPageWrapper badge="🐧 Reference Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Linux Commands Cheat Sheet</h1>
            <p className="text-gray-400">Free reference list of essential Linux commands — click any command to copy it instantly.</p>
          </div>

          <input value={filter} onChange={e => setFilter(e.target.value)}
            placeholder="🔍 Search commands... e.g. network, process, permission"
            className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3.5 text-white mb-8 outline-none focus:border-cyan-400 transition" />

          <CommandList categories={LINUX_COMMANDS} filter={filter} />

          <p className="text-xs text-gray-600 text-center mt-10">⚠️ Commands using sudo/root privileges, deleting files, or managing services can affect your system — double-check before running unfamiliar commands.</p>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
