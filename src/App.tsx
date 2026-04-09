/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';

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
    console.log('App mounted successfully');
  }, []);

  useEffect(() => {
    let cmd = `wget https://raw.githubusercontent.com/hwdsl2/openvpn-install/master/openvpn-install.sh -O openvpn.sh && `;
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
    <div style={{ padding: '40px', fontFamily: 'sans-serif', maxWidth: '800px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>OpenVPN Config Generator</h1>
      
      <div style={{ display: 'grid', gap: '20px', marginBottom: '30px' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Server Address</label>
          <input 
            type="text" 
            value={serverAddr} 
            onChange={(e) => setServerAddr(e.target.value)}
            placeholder="e.g. vpn.example.com"
            style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
          />
        </div>
        
        <div style={{ display: 'flex', gap: '20px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Protocol</label>
            <select 
              value={protocol} 
              onChange={(e) => setProtocol(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            >
              <option value="udp">UDP</option>
              <option value="tcp">TCP</option>
            </select>
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Port</label>
            <input 
              type="text" 
              value={port} 
              onChange={(e) => setPort(e.target.value)}
              style={{ width: '100%', padding: '10px', border: '1px solid #ccc', borderRadius: '4px' }}
            />
          </div>
        </div>
      </div>

      <div style={{ background: '#1a1a1a', color: '#00ff00', padding: '20px', borderRadius: '8px', position: 'relative' }}>
        <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
          {generatedCommand}
        </pre>
        <button 
          onClick={handleCopy}
          style={{ 
            position: 'absolute', 
            top: '10px', 
            right: '10px', 
            padding: '5px 10px', 
            background: '#444', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
    </div>
  );
}
