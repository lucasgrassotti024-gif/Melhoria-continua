import React from 'react';
import { useProject } from '../../context/ProjectContext';
import { DMAICPhase } from '../../types/project';
import { Target, BarChart2, Search, Zap, ShieldCheck } from 'lucide-react';

const phases: { id: DMAICPhase; label: string; desc: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { id: 'define', label: '1. DEFINE', desc: 'Definir o escopo, metas e contrato', icon: Target },
  { id: 'measure', label: '2. MEASURE', desc: 'Medir desempenho atual e dados', icon: BarChart2 },
  { id: 'analyze', label: '3. ANALYZE', desc: 'Investigar e validar causas-raiz', icon: Search },
  { id: 'improve', label: '4. IMPROVE', desc: 'Desenvolver e implementar soluções', icon: Zap },
  { id: 'control', label: '5. CONTROL', desc: 'Padronizar e sustentar os ganhos', icon: ShieldCheck },
];

export const DMAICHeader: React.FC = () => {
  const { project, setCurrentPhase } = useProject();

  return (
    <div className="bg-white border-b border-slate-200 px-6 py-4 shadow-sm">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded bg-blue-100 text-blue-800 border border-blue-200">
              {project.code}
            </span>
            <span className="text-xs font-medium px-2 py-0.5 rounded bg-emerald-100 text-emerald-800">
              {project.status}
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 mt-1">{project.name}</h1>
        </div>
        <div className="text-xs text-slate-500 text-right">
          Atualizado em: {new Date(project.updatedAt).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}
        </div>
      </div>

      {/* Navegação DMAIC em Abas Corporativas */}
      <nav className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 pt-2">
        {phases.map(p => {
          const Icon = p.icon;
          const isActive = project.currentPhase === p.id;
          return (
            <button
              key={p.id}
              onClick={() => setCurrentPhase(p.id)}
              className={`flex items-center gap-3 p-3 rounded-lg border text-left transition-all ${
                isActive
                  ? 'border-blue-600 bg-blue-50/60 shadow-sm ring-1 ring-blue-500'
                  : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              <div
                className={`p-2 rounded-md ${
                  isActive ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>
              <div className="overflow-hidden">
                <div
                  className={`text-sm font-semibold truncate ${
                    isActive ? 'text-blue-900' : 'text-slate-700'
                  }`}
                >
                  {p.label}
                </div>
                <div className="text-xs text-slate-500 truncate">{p.desc}</div>
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};
