import React, { useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import { ProjectCharter } from '../../../types/project';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Eye, Edit3, CheckCircle, FileText } from 'lucide-react';

export const ProjectCharterTool: React.FC = () => {
  const { project, updateDefine } = useProject();
  const [mode, setMode] = useState<'view' | 'edit'>('view');
  const [charter, setCharter] = useState<ProjectCharter>(project.define.charter);
  const [saveNotification, setSaveNotification] = useState(false);

  const handleChange = (field: keyof ProjectCharter, value: any) => {
    setCharter(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    updateDefine({ charter });
    setSaveNotification(true);
    setTimeout(() => setSaveNotification(false), 3000);
  };

  return (
    <ToolContainer
      title="Project Charter (Contrato de Melhoria)"
      subtitle="Definição formal do escopo, metas mensuráveis, justificativa de negócio e equipe do projeto DMAIC"
      badge="DEFINE 2.1"
      onSave={handleSave}
      actions={
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg">
          <button
            onClick={() => setMode('view')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              mode === 'view' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            Documento A3
          </button>
          <button
            onClick={() => setMode('edit')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              mode === 'edit' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" />
            Editar Dados
          </button>
        </div>
      }
    >
      {saveNotification && (
        <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-lg text-xs flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-600" />
          Project Charter salvo com sucesso no projeto ativo!
        </div>
      )}

      {mode === 'edit' ? (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Título do Projeto</label>
              <input
                type="text"
                value={charter.title}
                onChange={e => handleChange('title', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Métrica Primária / Meta Quantitativa</label>
              <input
                type="text"
                value={charter.primaryMetric}
                onChange={e => handleChange('primaryMetric', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Declaração do Problema (O Que, Onde, Quanto e Impacto)</label>
              <textarea
                rows={3}
                value={charter.problemStatement}
                onChange={e => handleChange('problemStatement', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Justificativa de Negócio (Business Case)</label>
              <textarea
                rows={3}
                value={charter.businessCase}
                onChange={e => handleChange('businessCase', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Objetivo do Projeto</label>
              <textarea
                rows={2}
                value={charter.goal}
                onChange={e => handleChange('goal', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Benefícios Financeiros Esperados</label>
              <textarea
                rows={2}
                value={charter.expectedFinancialBenefits}
                onChange={e => handleChange('expectedFinancialBenefits', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dentro do Escopo (In-Scope)</label>
              <textarea
                rows={2}
                value={charter.scopeIn}
                onChange={e => handleChange('scopeIn', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Fora do Escopo (Out-of-Scope)</label>
              <textarea
                rows={2}
                value={charter.scopeOut}
                onChange={e => handleChange('scopeOut', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Champion / Sponsor</label>
              <input
                type="text"
                value={charter.champion}
                onChange={e => handleChange('champion', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Líder do Projeto (Belt)</label>
              <input
                type="text"
                value={charter.leader}
                onChange={e => handleChange('leader', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Prazo Estimado de Conclusão</label>
              <input
                type="date"
                value={charter.estimatedDeadline}
                onChange={e => handleChange('estimatedDeadline', e.target.value)}
                className="w-full text-sm px-3 py-2 border border-slate-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>
        </div>
      ) : (
        /* Visualização Executiva Estilo A3 / Contrato Formal */
        <div className="border border-slate-300 rounded-lg p-6 bg-white shadow-sm space-y-6 print:border-none print:p-0">
          <div className="border-b-2 border-slate-900 pb-4 flex justify-between items-center">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-wider text-blue-700">Contrato de Melhoria Contínua • DMAIC</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{charter.title || 'Título não definido'}</h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono bg-slate-100 px-3 py-1 rounded border border-slate-200">
                Prazo: {charter.estimatedDeadline || 'A definir'}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-blue-600" /> Declaração do Problema
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed">{charter.problemStatement}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-emerald-600" /> Justificativa (Business Case)
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed">{charter.businessCase}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-4 rounded-lg border border-blue-200 bg-blue-50/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">Meta do Projeto</h4>
              <p className="text-base font-extrabold text-blue-950">{charter.goal}</p>
              <div className="text-xs text-blue-700 mt-2 font-mono">Métrica: {charter.primaryMetric}</div>
            </div>

            <div className="p-4 rounded-lg border border-emerald-200 bg-emerald-50/40">
              <h4 className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">Benefício Financeiro</h4>
              <p className="text-base font-extrabold text-emerald-950">{charter.expectedFinancialBenefits}</p>
              <div className="text-xs text-emerald-700 mt-2">Retorno projetado na linha de base</div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">Métricas Secundárias</h4>
              <p className="text-sm text-slate-800">{charter.secondaryMetrics || 'Nenhuma informada'}</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Fronteiras de Escopo</h4>
              <div className="space-y-2 text-xs">
                <div>
                  <strong className="text-emerald-700">Dentro do Escopo:</strong>
                  <p className="text-slate-700 mt-0.5">{charter.scopeIn}</p>
                </div>
                <div>
                  <strong className="text-red-700">Fora do Escopo:</strong>
                  <p className="text-slate-700 mt-0.5">{charter.scopeOut}</p>
                </div>
              </div>
            </div>

            <div className="p-4 rounded-lg border border-slate-200">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Equipe e Governança</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <span className="text-slate-500">Champion:</span>
                  <div className="font-semibold text-slate-800">{charter.champion}</div>
                </div>
                <div>
                  <span className="text-slate-500">Líder do Projeto:</span>
                  <div className="font-semibold text-slate-800">{charter.leader}</div>
                </div>
              </div>
              <div className="mt-3 text-xs">
                <span className="text-slate-500">Equipe Multifuncional:</span>
                <div className="flex flex-wrap gap-1 mt-1">
                  {charter.team.map((member, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-100 rounded text-slate-700 border border-slate-200">
                      {member}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </ToolContainer>
  );
};
