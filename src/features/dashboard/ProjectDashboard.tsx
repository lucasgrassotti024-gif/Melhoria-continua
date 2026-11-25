import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { Project } from '../../types/project';
import { FolderKanban, Plus, Clock, CheckCircle2, ChevronRight, TrendingUp, DollarSign } from 'lucide-react';

interface DashboardProps {
  onSelectProjectPhase: () => void;
}

export const ProjectDashboard: React.FC<DashboardProps> = ({ onSelectProjectPhase }) => {
  const { project, updateProject, setCurrentPhase } = useProject();
  const [showNewModal, setShowNewModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectCode, setNewProjectCode] = useState('');

  const handleCreateProject = () => {
    if (!newProjectName.trim()) return;
    const newProj: Partial<Project> = {
      id: `proj-${Date.now()}`,
      name: newProjectName.trim(),
      code: newProjectCode.trim() || `LSS-${new Date().getFullYear()}-${Math.floor(Math.random() * 90 + 10)}`,
      status: 'Planejamento',
      currentPhase: 'define',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    updateProject(newProj);
    setCurrentPhase('define');
    setShowNewModal(false);
    onSelectProjectPhase();
  };

  return (
    <div className="space-y-6">
      {/* Resumo Corporativo Superior */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-2xl shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-blue-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
            DASHBOARD DE GOVERNANÇA DMAIC
          </span>
          <h2 className="text-2xl font-black mt-2">Central de Projetos de Melhoria Contínua</h2>
          <p className="text-xs text-slate-400 mt-1">
            Acompanhamento integrado de indicadores, avanço das fases DMAIC e retorno financeiro consolidado.
          </p>
        </div>

        <button
          onClick={() => setShowNewModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold rounded-xl transition shadow-sm"
        >
          <Plus className="w-4 h-4" /> Novo Projeto DMAIC
        </button>
      </div>

      {/* Modal de Criação de Projeto */}
      {showNewModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl border border-slate-200 space-y-4">
            <div>
              <h3 className="text-base font-black text-slate-900">Iniciar Novo Projeto DMAIC</h3>
              <p className="text-xs text-slate-500">Defina o nome da iniciativa e código de rastreamento corporativo.</p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Título do Projeto</label>
                <input
                  type="text"
                  value={newProjectName}
                  onChange={e => setNewProjectName(e.target.value)}
                  placeholder="Ex: Redução de Tempo de Ciclo na Linha 3"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Código do Projeto (Opcional)</label>
                <input
                  type="text"
                  value={newProjectCode}
                  onChange={e => setNewProjectCode(e.target.value)}
                  placeholder="Ex: LSS-2026-02"
                  className="w-full p-2.5 border border-slate-300 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setShowNewModal(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreateProject}
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg shadow-sm"
              >
                Criar Projeto & Abrir DEFINE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cards de Métricas Consolidadas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
            <FolderKanban className="w-3.5 h-3.5 text-blue-600" /> Projeto Ativo
          </span>
          <div className="text-sm font-bold text-slate-900 mt-1 truncate" title={project.name}>{project.name}</div>
          <div className="text-[10px] text-slate-400 mt-0.5 font-mono">{project.code}</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-600" /> Etapa DMAIC Atual
          </span>
          <div className="text-lg font-black text-amber-950 mt-1 uppercase">{project.currentPhase}</div>
          <div className="text-[10px] text-amber-700 mt-0.5">Fase em execução</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-600" /> Meta do Projeto
          </span>
          <div className="text-sm font-bold text-emerald-950 mt-1 truncate" title={project.define.charter.goal}>
            {project.define.charter.goal || 'Meta quantitativa'}
          </div>
          <div className="text-[10px] text-emerald-700 mt-0.5">Indicador primário</div>
        </div>

        <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-2xs">
          <span className="text-[10px] font-bold uppercase text-slate-500 flex items-center gap-1.5">
            <DollarSign className="w-3.5 h-3.5 text-purple-600" /> Ganho Financeiro Estimado
          </span>
          <div className="text-base font-black text-purple-950 mt-1">R$ 295.280 / ano</div>
          <div className="text-[10px] text-purple-700 mt-0.5">Benefício auditado</div>
        </div>
      </div>

      {/* Cartão Detalhado do Projeto Selecionado */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold bg-blue-100 text-blue-800 px-2.5 py-0.5 rounded border border-blue-200">
                {project.code}
              </span>
              <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded">
                {project.status}
              </span>
            </div>
            <h3 className="text-xl font-black text-slate-900 mt-2">{project.name}</h3>
            <p className="text-xs text-slate-500 mt-0.5">{project.define.charter.problemStatement}</p>
          </div>

          <button
            onClick={onSelectProjectPhase}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold rounded-xl transition shadow-sm whitespace-nowrap"
          >
            Acessar Área de Trabalho DMAIC <ChevronRight className="w-4 h-4 text-blue-400" />
          </button>
        </div>

        {/* Progresso das 5 Fases DMAIC */}
        <div>
          <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-3">
            Rastreabilidade e Status por Fase DMAIC
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div className="p-3 bg-blue-50/60 border border-blue-200 rounded-xl">
              <span className="text-[10px] font-black uppercase text-blue-800">1. DEFINE</span>
              <div className="text-xs font-bold text-blue-950 mt-1">Charter & SIPOC</div>
              <div className="text-[10px] text-emerald-700 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Concluído
              </div>
            </div>

            <div className="p-3 bg-emerald-50/60 border border-emerald-200 rounded-xl">
              <span className="text-[10px] font-black uppercase text-emerald-800">2. MEASURE</span>
              <div className="text-xs font-bold text-emerald-950 mt-1">Dados & Capabilidade</div>
              <div className="text-[10px] text-emerald-700 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Concluído
              </div>
            </div>

            <div className="p-3 bg-amber-50/60 border border-amber-200 rounded-xl">
              <span className="text-[10px] font-black uppercase text-amber-800">3. ANALYZE</span>
              <div className="text-xs font-bold text-amber-950 mt-1">Ishikawa & Causas</div>
              <div className="text-[10px] text-emerald-700 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Concluído
              </div>
            </div>

            <div className="p-3 bg-purple-50/60 border border-purple-200 rounded-xl">
              <span className="text-[10px] font-black uppercase text-purple-800">4. IMPROVE</span>
              <div className="text-xs font-bold text-purple-950 mt-1">5W2H & Ganhos</div>
              <div className="text-[10px] text-emerald-700 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Concluído
              </div>
            </div>

            <div className="p-3 bg-red-50/60 border border-red-200 rounded-xl">
              <span className="text-[10px] font-black uppercase text-red-800">5. CONTROL</span>
              <div className="text-xs font-bold text-red-950 mt-1">SPC & Dossiê Final</div>
              <div className="text-[10px] text-emerald-700 font-bold mt-2 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" /> Concluído
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
