"use client";
import { useState, useMemo } from "react";
import ToolPageWrapper from "@/components/ToolPageWrapper";

type Cmd = { cmd: string; desc: string };
type Category = { name: string; items: Cmd[] };
type Brand = { id: string; label: string; type: string; categories: Category[] };

const BRANDS: Brand[] = [
  {
    id: "cisco-ios",
    label: "Cisco IOS (Switch/Router)",
    type: "🔀 Switch/Router",
    categories: [
      {
        name: "Basic Navigation",
        items: [
          { cmd: "enable", desc: "Enter privileged EXEC mode" },
          { cmd: "configure terminal", desc: "Enter global configuration mode" },
          { cmd: "show running-config", desc: "Display the current active configuration" },
          { cmd: "show startup-config", desc: "Display the saved boot configuration" },
          { cmd: "write memory", desc: "Save running config to startup config" },
          { cmd: "reload", desc: "Reboot the device" },
        ],
      },
      {
        name: "Interfaces & VLANs",
        items: [
          { cmd: "show interfaces", desc: "Show status/stats of all interfaces" },
          { cmd: "interface GigabitEthernet0/1", desc: "Enter config mode for a specific interface" },
          { cmd: "switchport mode access", desc: "Set an interface as an access port" },
          { cmd: "switchport access vlan 10", desc: "Assign a port to VLAN 10" },
          { cmd: "vlan 10 / name SALES", desc: "Create VLAN 10 and name it" },
          { cmd: "show vlan brief", desc: "List all VLANs and their assigned ports" },
          { cmd: "no shutdown", desc: "Enable an interface (bring it up)" },
        ],
      },
      {
        name: "Diagnostics",
        items: [
          { cmd: "show ip interface brief", desc: "Quick summary of IP addresses on all interfaces" },
          { cmd: "show mac address-table", desc: "Show learned MAC addresses per port" },
          { cmd: "show cdp neighbors", desc: "Show directly connected Cisco devices" },
          { cmd: "ping 8.8.8.8", desc: "Test connectivity to an IP" },
          { cmd: "show version", desc: "Show hardware/software version info" },
        ],
      },
    ],
  },
  {
    id: "cisco-asa",
    label: "Cisco ASA (Firewall)",
    type: "🛡️ Firewall",
    categories: [
      {
        name: "Basic Navigation",
        items: [
          { cmd: "enable", desc: "Enter privileged EXEC mode" },
          { cmd: "configure terminal", desc: "Enter global configuration mode" },
          { cmd: "show running-config", desc: "Display current active configuration" },
          { cmd: "write memory", desc: "Save the configuration" },
          { cmd: "show version", desc: "Show ASA software/hardware version" },
        ],
      },
      {
        name: "Access Rules & NAT",
        items: [
          { cmd: "access-list OUTSIDE_IN extended permit tcp any host 10.1.1.1 eq 443", desc: "Allow inbound HTTPS to a specific host" },
          { cmd: "show access-list", desc: "Display all configured access lists" },
          { cmd: "object network LAN-NET", desc: "Create a network object for NAT rules" },
          { cmd: "show nat", desc: "Show current NAT translations/rules" },
          { cmd: "show conn", desc: "Show active connections through the firewall" },
        ],
      },
      {
        name: "VPN & Interfaces",
        items: [
          { cmd: "show interface ip brief", desc: "Show IP addresses on all interfaces" },
          { cmd: "show vpn-sessiondb summary", desc: "Show summary of active VPN sessions" },
          { cmd: "show crypto isakmp sa", desc: "Show IKE Phase 1 VPN tunnel status" },
        ],
      },
    ],
  },
  {
    id: "fortinet",
    label: "Fortinet FortiGate",
    type: "🛡️ Firewall",
    categories: [
      {
        name: "Basic Navigation",
        items: [
          { cmd: "get system status", desc: "Show system/firmware version info" },
          { cmd: "show full-configuration", desc: "Display full running configuration" },
          { cmd: "execute backup config flash", desc: "Backup configuration to flash storage" },
          { cmd: "execute reboot", desc: "Reboot the FortiGate" },
        ],
      },
      {
        name: "Policies & NAT",
        items: [
          { cmd: "config firewall policy", desc: "Enter firewall policy configuration mode" },
          { cmd: "show firewall policy", desc: "List all configured firewall policies" },
          { cmd: "get firewall policy", desc: "Show a summary of active policies" },
          { cmd: "diagnose firewall iprope list", desc: "Show internal policy processing details" },
        ],
      },
      {
        name: "Diagnostics",
        items: [
          { cmd: "get system interface physical", desc: "Show physical interface status" },
          { cmd: "diagnose sys top", desc: "Show real-time CPU/process usage" },
          { cmd: "diagnose debug flow trace start 10", desc: "Trace live traffic flow (for troubleshooting)" },
          { cmd: "execute ping 8.8.8.8", desc: "Test connectivity to an IP" },
          { cmd: "get vpn ipsec tunnel summary", desc: "Show IPsec VPN tunnel status" },
        ],
      },
    ],
  },
  {
    id: "sophos",
    label: "Sophos Firewall (XG/XGS)",
    type: "🛡️ Firewall",
    categories: [
      {
        name: "Basic Navigation (CLI Console)",
        items: [
          { cmd: "system diagnostics show version-info", desc: "Show firmware version details" },
          { cmd: "system diagnostics show system-graphs", desc: "Show real-time system resource usage" },
          { cmd: "system backup create", desc: "Create a configuration backup" },
          { cmd: "system shutdown -r now", desc: "Reboot the device" },
        ],
      },
      {
        name: "Networking & Diagnostics",
        items: [
          { cmd: "system diagnostics show network-config", desc: "Show interface/network configuration" },
          { cmd: "system diagnostics utilities ping-host <ip>", desc: "Ping a host from the firewall" },
          { cmd: "system diagnostics utilities traceroute <ip>", desc: "Traceroute from the firewall" },
          { cmd: "show vpn connection status", desc: "Show current VPN tunnel status" },
        ],
      },
      {
        name: "Note",
        items: [
          { cmd: "Most day-to-day config is done via Web Admin UI", desc: "Sophos is primarily managed through its web interface — CLI is mainly used for diagnostics and initial setup, not full rule configuration." },
        ],
      },
    ],
  },
  {
    id: "mikrotik",
    label: "MikroTik RouterOS",
    type: "🔀 Router/Switch",
    categories: [
      {
        name: "Basic Navigation",
        items: [
          { cmd: "/system resource print", desc: "Show CPU, memory and uptime info" },
          { cmd: "/system routerboard print", desc: "Show hardware/board details" },
          { cmd: "/export", desc: "Export the full current configuration" },
          { cmd: "/system reboot", desc: "Reboot the device" },
          { cmd: "/system backup save", desc: "Save a full system backup file" },
        ],
      },
      {
        name: "Interfaces & IP",
        items: [
          { cmd: "/interface print", desc: "List all interfaces and their status" },
          { cmd: "/ip address print", desc: "Show configured IP addresses" },
          { cmd: "/ip address add address=192.168.1.1/24 interface=ether1", desc: "Assign an IP to an interface" },
          { cmd: "/interface bridge print", desc: "Show configured bridges (used for switching)" },
        ],
      },
      {
        name: "Firewall",
        items: [
          { cmd: "/ip firewall filter print", desc: "List all firewall filter rules" },
          { cmd: "/ip firewall nat print", desc: "List all NAT rules" },
          { cmd: "/ip firewall filter add chain=forward action=drop src-address=1.2.3.4", desc: "Block traffic from a specific source IP" },
          { cmd: "/ip firewall connection print", desc: "Show active connections through the router" },
        ],
      },
      {
        name: "Diagnostics",
        items: [
          { cmd: "/ping 8.8.8.8", desc: "Test connectivity to an IP" },
          { cmd: "/tool traceroute 8.8.8.8", desc: "Trace the route to an IP" },
          { cmd: "/log print", desc: "Show system logs" },
        ],
      },
    ],
  },
  {
    id: "juniper",
    label: "Juniper (JunOS)",
    type: "🛡️ Switch/Firewall",
    categories: [
      {
        name: "Basic Navigation",
        items: [
          { cmd: "configure", desc: "Enter configuration mode" },
          { cmd: "show configuration", desc: "Display current configuration" },
          { cmd: "commit", desc: "Apply and save configuration changes" },
          { cmd: "show version", desc: "Show software/hardware version" },
          { cmd: "request system reboot", desc: "Reboot the device" },
        ],
      },
      {
        name: "Interfaces & Security",
        items: [
          { cmd: "show interfaces terse", desc: "Quick summary of all interface statuses" },
          { cmd: "show security policies", desc: "List configured security (firewall) policies" },
          { cmd: "show security zones", desc: "Show configured security zones" },
          { cmd: "show route", desc: "Show the routing table" },
        ],
      },
      {
        name: "Diagnostics",
        items: [
          { cmd: "ping 8.8.8.8", desc: "Test connectivity to an IP" },
          { cmd: "show system alarms", desc: "Show any active system alarms" },
          { cmd: "show chassis hardware", desc: "Show hardware inventory details" },
        ],
      },
    ],
  },
  {
    id: "hp-aruba",
    label: "HP / Aruba Switches",
    type: "🔀 Switch",
    categories: [
      {
        name: "Basic Navigation",
        items: [
          { cmd: "enable", desc: "Enter privileged/manager mode" },
          { cmd: "configure terminal", desc: "Enter configuration mode" },
          { cmd: "show running-config", desc: "Display current active configuration" },
          { cmd: "write memory", desc: "Save the configuration" },
          { cmd: "show version", desc: "Show software/hardware version" },
        ],
      },
      {
        name: "VLANs & Ports",
        items: [
          { cmd: "vlan 10", desc: "Create/enter VLAN 10 configuration" },
          { cmd: "show vlans", desc: "List all configured VLANs" },
          { cmd: "show interfaces brief", desc: "Quick status summary of all ports" },
          { cmd: "interface 1 / untagged vlan 10", desc: "Assign port 1 as untagged member of VLAN 10" },
        ],
      },
      {
        name: "Diagnostics",
        items: [
          { cmd: "show mac-address", desc: "Show the MAC address table" },
          { cmd: "show lldp neighbor-info", desc: "Show directly connected devices via LLDP" },
          { cmd: "ping 8.8.8.8", desc: "Test connectivity to an IP" },
        ],
      },
    ],
  },
  {
    id: "paloalto",
    label: "Palo Alto Networks",
    type: "🛡️ Firewall",
    categories: [
      {
        name: "Basic Navigation",
        items: [
          { cmd: "configure", desc: "Enter configuration mode" },
          { cmd: "show config running", desc: "Display current running configuration" },
          { cmd: "commit", desc: "Apply and save configuration changes" },
          { cmd: "request restart system", desc: "Reboot the firewall" },
          { cmd: "show system info", desc: "Show software/hardware version details" },
        ],
      },
      {
        name: "Policies & Sessions",
        items: [
          { cmd: "show running security-policy", desc: "List all active security policies" },
          { cmd: "show session all", desc: "Show all active sessions through the firewall" },
          { cmd: "show session info", desc: "Show session table summary/statistics" },
          { cmd: "clear session all", desc: "Clear all active sessions (use with caution)" },
        ],
      },
      {
        name: "Diagnostics",
        items: [
          { cmd: "test security-policy-match source 1.1.1.1 destination 2.2.2.2 protocol 6 destination-port 443", desc: "Test which policy rule would match specific traffic" },
          { cmd: "show interface all", desc: "Show status of all interfaces" },
          { cmd: "ping host 8.8.8.8", desc: "Test connectivity to an IP" },
        ],
      },
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
                  <code className="text-white font-mono text-sm block break-words">{item.cmd}</code>
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

export default function FirewallSwitchCommandsPage() {
  const [brandId, setBrandId] = useState(BRANDS[0].id);
  const [filter, setFilter] = useState("");

  const brand = BRANDS.find(b => b.id === brandId)!;

  return (
    <ToolPageWrapper badge="🔌 Reference Tool">
      <main className="px-6 py-12 pb-24 relative z-10">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Firewall & Switch Commands</h1>
            <p className="text-gray-400">Free CLI command reference for popular network hardware brands — searchable, click to copy.</p>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {BRANDS.map(b => (
              <button key={b.id} onClick={() => setBrandId(b.id)}
                className={`px-4 py-2.5 rounded-xl text-sm font-medium border transition ${brandId === b.id ? "bg-cyan-500 text-black border-cyan-500" : "bg-zinc-800 text-gray-400 border-zinc-700 hover:border-zinc-600"}`}>
                {b.label}
              </button>
            ))}
          </div>

          <div className="inline-block bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-1.5 rounded-full text-xs mb-6">
            {brand.type}
          </div>

          <input value={filter} onChange={e => setFilter(e.target.value)}
            placeholder="🔍 Search commands... e.g. vlan, ping, backup"
            className="w-full bg-black/80 border border-zinc-700 rounded-2xl px-5 py-3.5 text-white mb-8 outline-none focus:border-cyan-400 transition" />

          <CommandList categories={brand.categories} filter={filter} />

          <p className="text-xs text-gray-600 text-center mt-10">
            ⚠️ Commands vary by firmware/OS version — always verify syntax matches your exact device model before running in production. Configuration changes (firewall rules, VLANs, reboots) can cause downtime if done incorrectly.
          </p>
        </div>
      </main>
    </ToolPageWrapper>
  );
}
