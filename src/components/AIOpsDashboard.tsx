import React, { useState, useEffect } from 'react';
import { 
  LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Activity, Cpu, Database, Zap, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import { cn } from '../lib/utils';

export const AIOpsDashboard: React.FC = () => {
  const [metrics, setMetrics] = useState<any[]>([]);
  const [deployments, setDeployments] = useState<any[]>([]);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/metrics');
        const data = await res.json();
        setMetrics(prev => [...prev.slice(-19), { ...data, time: new Date().toLocaleTimeString().split(' ')[0] }]);
      } catch (e) { console.error(e); }
    };

    const fetchDeployments = async () => {
      try {
        const res = await fetch('/api/deployments');
        const data = await res.json();
        setDeployments(data);
      } catch (e) { console.error(e); }
    };

    fetchMetrics();
    fetchDeployments();
    const interval = setInterval(fetchMetrics, 3000);
    return () => clearInterval(interval);
  }, []);

  const latest = metrics[metrics.length - 1] || { cpu: 0, memory: 0, latency: 0, throughput: 0 };

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={<Cpu className="text-blue-400" />} label="CPU Utilization" value={`${latest.cpu}%`} trend="+2.4%" />
        <StatCard icon={<Database className="text-purple-400" />} label="Memory Usage" value={`${latest.memory}%`} trend="-1.2%" />
        <StatCard icon={<Clock className="text-emerald-400" />} label="Model Latency" value={`${latest.latency}ms`} trend="+5ms" />
        <StatCard icon={<Zap className="text-yellow-400" />} label="Throughput" value={`${latest.throughput} req/s`} trend="+12%" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Real-time Performance */}
        <div className="glass-panel p-6 rounded-xl">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-mono uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              System Performance Real-time
            </h3>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-2 py-1 rounded">LIVE</span>
          </div>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={metrics}>
                <defs>
                  <linearGradient id="colorCpu" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                <XAxis dataKey="time" stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <YAxis stroke="rgba(255,255,255,0.3)" fontSize={10} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px' }}
                  itemStyle={{ fontSize: '12px', fontFamily: 'monospace' }}
                />
                <Area type="monotone" dataKey="cpu" stroke="#10b981" fillOpacity={1} fill="url(#colorCpu)" strokeWidth={2} />
                <Area type="monotone" dataKey="memory" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CI/CD Status */}
        <div className="glass-panel p-6 rounded-xl">
          <h3 className="text-sm font-mono uppercase tracking-wider mb-6 flex items-center gap-2">
            <Zap className="w-4 h-4 text-yellow-500" />
            DevOps CI/CD Deployment Pipeline
          </h3>
          <div className="space-y-4">
            {deployments.map((dep) => (
              <div key={dep.id} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-full",
                    dep.status === 'success' ? "bg-emerald-500/20 text-emerald-500" :
                    dep.status === 'running' ? "bg-blue-500/20 text-blue-500 animate-pulse" :
                    "bg-red-500/20 text-red-500"
                  )}>
                    {dep.status === 'success' ? <CheckCircle2 className="w-4 h-4" /> : 
                     dep.status === 'running' ? <Clock className="w-4 h-4" /> : 
                     <AlertTriangle className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{dep.service}</div>
                    <div className="text-[10px] font-mono opacity-50">{dep.version} • {dep.time}</div>
                  </div>
                </div>
                <div className={cn(
                  "text-[10px] font-mono uppercase px-2 py-1 rounded",
                  dep.status === 'success' ? "text-emerald-500 bg-emerald-500/10" :
                  dep.status === 'running' ? "text-blue-500 bg-blue-500/10" :
                  "text-red-500 bg-red-500/10"
                )}>
                  {dep.status}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, label, value, trend }: { icon: React.ReactNode, label: string, value: string, trend: string }) => (
  <div className="glass-panel p-4 rounded-xl border border-white/5">
    <div className="flex items-center justify-between mb-2">
      <div className="p-2 bg-white/5 rounded-lg">{icon}</div>
      <span className={cn(
        "text-[10px] font-mono",
        trend.startsWith('+') ? "text-emerald-500" : "text-red-500"
      )}>{trend}</span>
    </div>
    <div className="text-xs font-mono text-gray-400 uppercase tracking-tight">{label}</div>
    <div className="text-2xl font-semibold mt-1">{value}</div>
  </div>
);
