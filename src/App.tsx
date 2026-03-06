import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Bot, 
  Cpu, 
  Settings, 
  Terminal, 
  Menu, 
  X, 
  Shield, 
  Layers,
  Activity,
  GitBranch,
  Search
} from 'lucide-react';
import { AIOpsDashboard } from './components/AIOpsDashboard';
import { MLOpsPipeline } from './components/MLOpsPipeline';
import { AgenticChat } from './components/AgenticChat';
import { TransformerVisualizer } from './components/TransformerVisualizer';
import { cn } from './lib/utils';

type Tab = 'aiops' | 'mlops' | 'agent' | 'transformer';

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('aiops');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navItems = [
    { id: 'aiops', label: 'AIOps Monitor', icon: Activity },
    { id: 'mlops', label: 'MLOps Pipeline', icon: GitBranch },
    { id: 'agent', label: 'Agentic AI', icon: Bot },
    { id: 'transformer', label: 'Transformer Core', icon: Layers },
  ];

  return (
    <div className="flex h-screen bg-[#050505] text-white overflow-hidden data-grid">
      {/* Sidebar */}
      <aside className={cn(
        "glass-panel border-r border-white/10 transition-all duration-300 flex flex-col z-50",
        isSidebarOpen ? "w-64" : "w-20"
      )}>
        <div className="p-6 flex items-center gap-3 border-b border-white/10">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.4)]">
            <Shield className="w-5 h-5 text-black" />
          </div>
          {isSidebarOpen && <span className="font-bold tracking-tighter text-xl">NEXUS AI</span>}
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id as Tab)}
              className={cn(
                "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group",
                activeTab === item.id 
                  ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20" 
                  : "text-gray-400 hover:bg-white/5 hover:text-white border border-transparent"
              )}
            >
              <item.icon className={cn(
                "w-5 h-5 shrink-0",
                activeTab === item.id ? "text-emerald-500" : "group-hover:text-white"
              )} />
              {isSidebarOpen && <span className="text-sm font-medium">{item.label}</span>}
              {activeTab === item.id && isSidebarOpen && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-white/10">
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-3 p-3 text-gray-400 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            {isSidebarOpen && <span className="text-sm">Collapse Sidebar</span>}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Header */}
        <header className="h-16 border-b border-white/10 flex items-center justify-between px-8 bg-black/40 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              System Status: <span className="text-emerald-500">Operational</span>
            </div>
            <div className="h-4 w-[1px] bg-white/10" />
            <div className="text-xs font-mono text-gray-500 uppercase tracking-widest">
              Region: <span className="text-blue-400">US-EAST-1</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
              <input 
                type="text" 
                placeholder="Search logs, models, or agents..." 
                className="bg-white/5 border border-white/10 rounded-full py-1.5 pl-10 pr-4 text-xs focus:outline-none focus:border-emerald-500/50 w-64"
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Terminal className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-emerald-500 to-blue-500 border border-white/20" />
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            <header className="mb-8">
              <h1 className="text-4xl font-bold tracking-tight mb-2">
                {navItems.find(n => n.id === activeTab)?.label}
              </h1>
              <p className="text-gray-400 font-mono text-sm uppercase tracking-wider">
                Enterprise Intelligence Command Center v4.0.2
              </p>
            </header>

            {activeTab === 'aiops' && <AIOpsDashboard />}
            {activeTab === 'mlops' && <MLOpsPipeline />}
            {activeTab === 'agent' && (
              <div className="h-[calc(100vh-280px)]">
                <AgenticChat />
              </div>
            )}
            {activeTab === 'transformer' && (
              <div className="glass-panel rounded-2xl p-8 min-h-[600px] flex items-center justify-center">
                <TransformerVisualizer />
              </div>
            )}
          </div>
        </div>

        {/* Footer Status Bar */}
        <footer className="h-8 border-t border-white/10 bg-black/60 backdrop-blur-sm px-6 flex items-center justify-between text-[10px] font-mono text-gray-500 z-40">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>API GATEWAY: 24ms</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              <span>MODEL SERVER: READY</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
              <span>TRAINING JOB: ACTIVE</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <span>UPTIME: 99.998%</span>
            <span>v4.0.2-STABLE</span>
          </div>
        </footer>
      </main>
    </div>
  );
}
