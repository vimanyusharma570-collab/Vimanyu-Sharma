import React from 'react';
import { Database, Search, Cpu, BarChart, ShieldCheck, Rocket, ArrowRight } from 'lucide-react';
import { cn } from '../lib/utils';

const steps = [
  { id: 1, name: 'Data Ingestion', icon: Database, status: 'completed', desc: 'ETL from BigQuery & S3' },
  { id: 2, name: 'Preprocessing', icon: Search, status: 'completed', desc: 'Tokenization & Normalization' },
  { id: 3, name: 'Model Training', icon: Cpu, status: 'active', desc: 'Distributed GPU Training' },
  { id: 4, name: 'Evaluation', icon: BarChart, status: 'pending', desc: 'F1 Score & BLEU Metrics' },
  { id: 5, name: 'Safety Guardrails', icon: ShieldCheck, status: 'pending', desc: 'RLHF & Toxicity Filtering' },
  { id: 6, name: 'Deployment', icon: Rocket, status: 'pending', desc: 'Blue-Green Canary Release' },
];

export const MLOpsPipeline: React.FC = () => {
  return (
    <div className="glass-panel p-8 rounded-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <Rocket className="w-32 h-32 rotate-12" />
      </div>
      
      <h3 className="text-sm font-mono uppercase tracking-widest mb-12 flex items-center gap-2">
        <Rocket className="w-4 h-4 text-blue-500" />
        MLOps Training Pipeline Lifecycle
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {steps.map((step, i) => (
          <div key={step.id} className="relative group">
            <div className={cn(
              "flex flex-col p-6 rounded-2xl border transition-all duration-300",
              step.status === 'completed' ? "bg-emerald-500/5 border-emerald-500/20" :
              step.status === 'active' ? "bg-blue-500/10 border-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.2)]" :
              "bg-white/5 border-white/10 opacity-50"
            )}>
              <div className="flex items-center justify-between mb-4">
                <div className={cn(
                  "p-3 rounded-xl",
                  step.status === 'completed' ? "bg-emerald-500/20 text-emerald-500" :
                  step.status === 'active' ? "bg-blue-500/20 text-blue-500" :
                  "bg-white/10 text-gray-400"
                )}>
                  <step.icon className="w-6 h-6" />
                </div>
                <span className="text-[10px] font-mono opacity-50">STEP 0{step.id}</span>
              </div>
              
              <h4 className="text-lg font-semibold mb-1">{step.name}</h4>
              <p className="text-xs text-gray-400 mb-4">{step.desc}</p>
              
              <div className="flex items-center gap-2">
                <div className={cn(
                  "w-2 h-2 rounded-full",
                  step.status === 'completed' ? "bg-emerald-500" :
                  step.status === 'active' ? "bg-blue-500 animate-pulse" :
                  "bg-gray-600"
                )} />
                <span className={cn(
                  "text-[10px] font-mono uppercase tracking-wider",
                  step.status === 'completed' ? "text-emerald-500" :
                  step.status === 'active' ? "text-blue-500" :
                  "text-gray-500"
                )}>{step.status}</span>
              </div>
            </div>
            
            {i < steps.length - 1 && (
              <div className="hidden lg:block absolute -right-4 top-1/2 -translate-y-1/2 z-10 text-white/20">
                <ArrowRight className="w-6 h-6" />
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 p-4 bg-blue-500/10 border border-blue-500/20 rounded-xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
            <Cpu className="w-5 h-5 text-blue-500 animate-spin-slow" />
          </div>
          <div>
            <div className="text-sm font-medium">Current Job: Transformer-Large-v4</div>
            <div className="text-[10px] font-mono opacity-50">Epoch 42/100 • Loss: 0.0024 • Accuracy: 98.2%</div>
          </div>
        </div>
        <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-mono uppercase tracking-widest rounded-lg transition-colors">
          View Live Logs
        </button>
      </div>
    </div>
  );
};
