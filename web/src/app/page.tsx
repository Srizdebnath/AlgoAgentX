"use client";

import React, { useState, useEffect, useRef } from "react";
import { useWallet } from "@txnlab/use-wallet-react";
import { Terminal, Shield, Power, AlertTriangle, Send, Link as LinkIcon, RefreshCw } from "lucide-react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function Dashboard() {
  const { activeAddress, signer, wallets, activeWallet } = useWallet();
  const [loading, setLoading] = useState(true);
  const [terminalOutput, setTerminalOutput] = useState<Array<{ type: 'input' | 'output' | 'system', content: string, txId?: string }>>([
    { type: 'system', content: "SYSTEM INITIALIZED > ENCRYPTED_LINK_ESTABLISHED" },
    { type: 'system', content: "THOUGHT PROCESSED > READY FOR COMMANDS" }
  ]);
  const [command, setCommand] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const terminalEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll terminal
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [terminalOutput]);

  // Loading screen transition
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleCommand = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!command.trim() || isProcessing) return;

    const userCmd = command.trim();
    setCommand("");
    setTerminalOutput(prev => [...prev, { type: 'input', content: userCmd }]);
    setIsProcessing(true);

    // Faux thinking
    setTerminalOutput(prev => [...prev, { type: 'system', content: "THOUGHT PROCESSED > ANALYZING COMMAND..." }]);

    try {
      const response = await axios.post("http://localhost:8000/api/chat", {
        prompt: userCmd
      });

      const { response: msg, tx_ids } = response.data;
      
      setTerminalOutput(prev => [
        ...prev, 
        { type: 'output', content: msg, txId: tx_ids?.[0] }
      ]);
    } catch (error) {
      setTerminalOutput(prev => [...prev, { type: 'system', content: `ERROR > ${error instanceof Error ? error.message : "NETWORK CONNECTION FAILED"}` }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const triggerKillSwitch = () => {
    console.log("Emergency Kill Switch Triggered");
    setTerminalOutput(prev => [...prev, { type: 'system', content: "EMERGENCY_KILL_SWITCH > PROTOCOL_INITIATED" }]);
    alert("CRITICAL_OVERRIDE: Financial Guardian engaged. All manual overrides disabled. Security lockdown simulated.");
  };

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#050505] flex flex-col items-center justify-center z-50">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="text-cyan-200 font-mono tracking-widest text-lg"
        >
          _INITIALIZING_AGX_SYSTEM
        </motion.div>
        <div className="w-48 h-[2px] bg-cyan-950 mt-4 overflow-hidden">
          <motion.div 
            animate={{ x: [-200, 200] }}
            transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
            className="w-full h-full bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
          />
        </div>
      </div>
    );
  }

  return (
    <main className="relative min-h-screen flex flex-col p-6 gap-6 z-10">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex flex-col">
          <h1 className="text-xl font-bold tracking-tighter flex items-center gap-2">
            <Shield className="w-5 h-5 text-cyan-400" />
             ALGO_AGENT_X
          </h1>
          <span className="text-[10px] text-cyan-400/50 uppercase tracking-[0.2em]">Autonomous Security Layer</span>
        </div>

        <div className="flex gap-4">
          {!activeAddress ? (
            wallets?.map((wallet) => (
              <button
                key={wallet.id}
                onClick={() => wallet.connect()}
                className="px-4 py-1.5 border border-cyan-400/30 text-cyan-200 text-xs font-mono uppercase hover:bg-cyan-400/10 transition-all rounded-sm tracking-widest"
              >
                Connect_{wallet.metadata.name}
              </button>
            ))
          ) : (
            <div className="flex gap-3">
               <div className="px-4 py-1.5 border border-emerald-500/30 text-emerald-400 text-xs font-mono rounded-sm bg-emerald-500/5 hidden md:block">
                ALGO_ENV: <span className="opacity-70 tracking-widest uppercase">LOCALNET</span>
              </div>
              <button
                onClick={() => activeWallet?.disconnect()}
                className="px-4 py-1.5 border border-cyan-400/30 text-cyan-200 text-xs font-mono truncate max-w-[140px] rounded-sm hover:bg-red-500/10 hover:border-red-500/40"
              >
                {activeAddress.slice(0, 4)}...{activeAddress.slice(-4)}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-6 gap-4 flex-1">
        
        {/* Guardian Tile */}
        <div className="md:col-span-1 md:row-span-2 glass p-4 flex flex-col justify-between group tile-hover">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-[10px] text-cyan-400/60 font-bold uppercase tracking-wider">Guardian_Firewall</span>
              <RefreshCw className="w-3 h-3 text-cyan-400/40 animate-spin-slow" />
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-white/30 block mb-1">DAILY_LIMIT</span>
                <span className="text-2xl font-light">10.00 <span className="text-sm opacity-50">ALGO</span></span>
              </div>
              <div>
                <span className="text-[10px] text-white/30 block mb-1">SPENT_TODAY</span>
                <span className="text-2xl font-light text-cyan-100">0.00 <span className="text-sm opacity-50">ALGO</span></span>
              </div>
            </div>
          </div>
          <div className="flex gap-1 mt-4">
            {[1,2,3,4,5].map(i => (
              <div key={i} className="h-1 flex-1 bg-cyan-400/20 rounded-full overflow-hidden">
                <div className="h-full bg-cyan-400 w-full opacity-60" />
              </div>
            ))}
          </div>
        </div>

        {/* Kill Switch Tile */}
        <div className="md:col-span-2 md:row-span-2 flex items-center justify-center">
          <button 
            onClick={triggerKillSwitch}
            className="w-full h-full glass border-2 border-transparent kill-switch-hover flex flex-col items-center justify-center gap-4 transition-all"
          >
            <Power className="w-12 h-12" />
            <span className="text-sm tracking-[0.5em] font-bold">EMERGENCY_KILL_SWITCH</span>
            <div className="text-[9px] text-white/20 uppercase tracking-widest mt-2 px-6 text-center">
              Immediately revoke agent spending permissions for all authorized accounts
            </div>
          </button>
        </div>

        {/* Stats Tile */}
        <div className="md:col-span-1 md:row-span-2 glass p-4 tile-hover flex flex-col justify-center gap-4">
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border border-cyan-400/20 flex items-center justify-center text-cyan-400">
               <AlertTriangle className="w-4 h-4" />
             </div>
             <div>
               <div className="text-[9px] text-white/40 uppercase">System_Load</div>
               <div className="text-sm">NOMINAL (0.02ms)</div>
             </div>
           </div>
           <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full border border-cyan-400/20 flex items-center justify-center text-cyan-400">
               <Activity className="w-4 h-4" />
             </div>
             <div>
               <div className="text-[9px] text-white/40 uppercase">LocalNet_Status</div>
               <div className="text-sm text-emerald-400 uppercase">Online_Active</div>
             </div>
           </div>
        </div>

        {/* Agent Terminal (Wide Bottom) */}
        <div className="md:col-span-4 md:row-span-4 glass flex flex-col overflow-hidden relative border-cyan-400/10">
          <div className="border-b border-white/5 bg-white/[0.02] px-4 py-2 flex items-center justify-between">
            <span className="text-[10px] uppercase text-white/40 font-bold tracking-widest flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 shadow-[0_0_5px_#22d3ee]" />
              Agent_Terminal_V1.0
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
              <div className="w-2.5 h-2.5 rounded-full bg-white/5" />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 font-mono text-[13px] terminal-container space-y-2">
            {terminalOutput.map((item, idx) => (
              <div key={idx} className={cn(
                "flex gap-4 p-1",
                item.type === 'input' ? "opacity-90" : 
                item.type === 'output' ? "text-cyan-100" : "text-white/30 italic"
              )}>
                <span className="w-8 shrink-0 select-none opacity-20 text-right">0{idx + 1}</span>
                <div className="flex-1 break-words">
                  {item.type === 'input' && <span className="text-cyan-400 mr-2">➜</span>}
                  {item.type === 'output' && <span className="text-cyan-400 mr-2">◀</span>}
                  {item.content}
                  {item.txId && (
                    <div className="mt-2 inline-flex">
                      <a 
                        href={`https://lora.algo.xyz/transaction/${item.txId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[11px] bg-cyan-400/10 text-cyan-400 px-2 py-0.5 rounded border border-cyan-400/30 flex items-center gap-2 hover:bg-cyan-400/20"
                      >
                        <LinkIcon className="w-3 h-3" />
                        VIEW_ON_EXPLORER
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
            <div ref={terminalEndRef} />
          </div>

          <div className="p-4 bg-[#080808] border-t border-white/5">
            <form onSubmit={handleCommand} className="flex gap-3 relative group">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-cyan-400 font-bold animate-pulse-teal select-none">
                {isProcessing ? "▦" : "_"}
              </span>
              <input 
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                disabled={isProcessing}
                placeholder="Enter financial operation mnemonic..."
                className="flex-1 bg-transparent border border-white/5 rounded px-8 py-3 focus:outline-none focus:border-cyan-400/30 focus:bg-cyan-400/[0.02] text-sm transition-all placeholder:text-white/10"
              />
              <button 
                type="submit"
                disabled={isProcessing}
                className="bg-cyan-400/10 border border-cyan-400/30 hover:bg-cyan-400/20 px-6 text-xs text-cyan-400 font-bold uppercase tracking-widest disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                EXEC
              </button>
            </form>
          </div>
        </div>

      </div>

      <footer className="mt-auto pt-6 flex justify-between items-center text-[9px] text-white/20 uppercase tracking-[0.3em]">
        <span>Secured by Puya ARC-56 Standard</span>
        <div className="flex gap-4">
          <span className="text-cyan-400/40">Status: Active</span>
          <span>Hash: {Date.now().toString(16).slice(-8)}</span>
        </div>
      </footer>
    </main>
  );
}

// Custom icons
function Activity({ className }: { className?: string }) {
  return (
    <svg className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
  );
}
