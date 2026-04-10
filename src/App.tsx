/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { 
  Terminal, 
  Copy, 
  Check, 
  Download, 
  Settings2, 
  Shield, 
  Globe, 
  Server, 
  Cpu,
  Info
} from 'lucide-react';

export default function App() {
  const [serverAddr, setServerAddr] = useState('');
  const [protocol, setProtocol] = useState('udp');
  const [port, setPort] = useState('1194');
  const [clientName, setClientName] = useState('client');
  const [dns1, setDns1] = useState('8.8.8.8');
  const [dns2, setDns2] = useState('8.8.4.4');
  const [subnet, setSubnet] = useState('10.8.0.0');
  const [copied, setCopied] = useState(false);

  const [generatedCommand, setGeneratedCommand] = useState('');

  useEffect(() => {
    let cmd = `wget https://raw.githubusercontent.com/hwdsl2/openvpn-install/master/openvpn-install.sh -O openvpn.sh && `;
    
    // If subnet is changed from default, add a sed command
    if (subnet !== '10.8.0.0') {
      cmd += `sed -i 's/10.8.0.0/${subnet}/g' openvpn.sh && `;
    }

    cmd += `sudo bash openvpn.sh --auto`;
    
    if (serverAddr) cmd += ` --serveraddr ${serverAddr}`;
    if (protocol) cmd += ` --proto ${protocol}`;
    if (port) cmd += ` --port ${port}`;
    if (clientName) cmd += ` --clientname ${clientName}`;
    if (dns1) cmd += ` --dns1 ${dns1}`;
    if (dns2) cmd += ` --dns2 ${dns2}`;

    setGeneratedCommand(cmd);
  }, [serverAddr, protocol, port, clientName, dns1, dns2, subnet]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedCommand);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#FDFDFC] text-[#1C1C1C] font-sans selection:bg-[#E5E7EB]">
      {/* Header */}
      <header className="border-b border-[#E5E7EB] bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-[#1C1C1C] p-2 rounded-lg">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold tracking-tight">OpenVPN Config Generator</h1>
              <p className="text-xs text-[#666666] font-medium uppercase tracking-wider">Deployment Utility</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com/hwdsl2/openvpn-install" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm font-medium text-[#666666] hover:text-[#1C1C1C] transition-colors flex items-center gap-1"
            >
              View Source
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Form Section */}
          <div className="lg:col-span-5 space-y-8">
            <section>
              <div className="flex items-center gap-2 mb-6">
                <Settings2 className="w-4 h-4 text-[#666666]" />
                <h2 className="text-sm font-bold uppercase tracking-widest text-[#666666]">Configuration</h2>
              </div>
              
              <div className="space-y-6">
                {/* Server Address */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Globe className="w-4 h-4" />
                    Server Address (FQDN or IP)
                  </label>
                  <input 
                    type="text" 
                    placeholder="vpn.example.com or 1.2.3.4"
                    className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all text-sm"
                    value={serverAddr}
                    onChange={(e) => setServerAddr(e.target.value)}
                  />
                  <p className="text-[11px] text-[#888888]">Leave empty to auto-detect public IP.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {/* Protocol */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Cpu className="w-4 h-4" />
                      Protocol
                    </label>
                    <select 
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all text-sm appearance-none"
                      value={protocol}
                      onChange={(e) => setProtocol(e.target.value)}
                    >
                      <option value="udp">UDP (Recommended)</option>
                      <option value="tcp">TCP</option>
                    </select>
                  </div>

                  {/* Port */}
                  <div className="space-y-2">
                    <label className="text-sm font-semibold flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      Port
                    </label>
                    <input 
                      type="number" 
                      className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all text-sm"
                      value={port}
                      onChange={(e) => setPort(e.target.value)}
                    />
                  </div>
                </div>

                {/* Client Name */}
                <div className="space-y-2">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Server className="w-4 h-4" />
                    First Client Name
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all text-sm"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                  />
                </div>

                {/* DNS Settings */}
                <div className="space-y-4 pt-4 border-t border-[#F0F0F0]">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-[#999999]">DNS Servers</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#666666]">Primary DNS</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all text-sm"
                        value={dns1}
                        onChange={(e) => setDns1(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-semibold text-[#666666]">Secondary DNS</label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all text-sm"
                        value={dns2}
                        onChange={(e) => setDns2(e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                {/* Subnet Settings */}
                <div className="space-y-2 pt-4 border-t border-[#F0F0F0]">
                  <label className="text-sm font-semibold flex items-center gap-2">
                    <Info className="w-4 h-4 text-[#666666]" />
                    VPN Subnet
                  </label>
                  <input 
                    type="text" 
                    className="w-full px-4 py-2.5 bg-white border border-[#E5E7EB] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#1C1C1C]/5 focus:border-[#1C1C1C] transition-all text-sm"
                    value={subnet}
                    onChange={(e) => setSubnet(e.target.value)}
                  />
                  <p className="text-[11px] text-[#888888]">Default: 10.8.0.0. Only change if you know what you're doing.</p>
                </div>
              </div>
            </section>
          </div>

          {/* Output Section */}
          <div className="lg:col-span-7 space-y-8">
            <section className="bg-[#1C1C1C] rounded-3xl p-8 text-white shadow-2xl shadow-black/20 overflow-hidden relative">
              <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
                <Terminal className="w-32 h-32" />
              </div>
              
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-red-500" />
                    <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="ml-2 text-xs font-mono text-white/40 uppercase tracking-widest">Terminal Output</span>
                  </div>
                  <button 
                    onClick={handleCopy}
                    className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full transition-all text-xs font-bold uppercase tracking-wider active:scale-95"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    {copied ? 'Copied' : 'Copy Command'}
                  </button>
                </div>

                <div className="bg-black/40 rounded-2xl p-6 font-mono text-sm leading-relaxed break-all border border-white/5 min-h-[120px] flex items-center">
                  <code className="text-emerald-400">
                    <span className="text-white/40 mr-2">$</span>
                    {generatedCommand}
                  </code>
                </div>

                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Next Steps</h4>
                    <ul className="text-sm space-y-3 text-white/80">
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">1</span>
                        Connect to your server via SSH.
                      </li>
                      <li className="flex gap-3">
                        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[10px] font-bold">2</span>
                        Paste and run the command above.
                      </li>
                    </ul>
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold uppercase tracking-widest text-white/40">Requirements</h4>
                    <ul className="text-sm space-y-3 text-white/80">
                      <li className="flex gap-3 items-center">
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        Root or Sudo privileges
                      </li>
                      <li className="flex gap-3 items-center">
                        <div className="w-1 h-1 rounded-full bg-white/40" />
                        Ubuntu, Debian, CentOS, or RHEL
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* Info Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white border border-[#E5E7EB] rounded-3xl space-y-3">
                <div className="w-10 h-10 bg-blue-50 rounded-2xl flex items-center justify-center">
                  <Download className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="font-bold text-sm">Download Client Config</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  After installation, the <code className="bg-[#F3F4F6] px-1 rounded">.ovpn</code> file will be in your home directory. Use SFTP or SCP to download it.
                </p>
              </div>
              <div className="p-6 bg-white border border-[#E5E7EB] rounded-3xl space-y-3">
                <div className="w-10 h-10 bg-amber-50 rounded-2xl flex items-center justify-center">
                  <Shield className="w-5 h-5 text-amber-600" />
                </div>
                <h3 className="font-bold text-sm">Security Note</h3>
                <p className="text-xs text-[#666666] leading-relaxed">
                  This script uses AES-128-GCM and SHA256 by default. It also enables a firewall and configures NAT automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#E5E7EB] py-12 bg-white">
        <div className="max-w-6xl mx-auto px-6 text-center space-y-4">
          <p className="text-sm text-[#666666]">
            Based on the open-source project by <a href="https://github.com/hwdsl2" className="text-[#1C1C1C] font-semibold underline underline-offset-4">hwdsl2</a>.
          </p>
          <div className="flex justify-center gap-6">
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-[#999999] hover:text-[#1C1C1C] transition-colors">Documentation</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-[#999999] hover:text-[#1C1C1C] transition-colors">Support</a>
            <a href="#" className="text-xs font-bold uppercase tracking-widest text-[#999999] hover:text-[#1C1C1C] transition-colors">Privacy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
