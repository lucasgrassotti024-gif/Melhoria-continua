import React, { useState } from 'react';
import { ValidatedCause, CauseStatus } from '../../../types/analyze';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2, CheckCircle2, Clock, XCircle, FileCheck, AlertCircle } from 'lucide-react';

export const CauseValidationHubTool: React.FC = () => {
  const [causes, setCauses] = useState<ValidatedCause[]>([
    {
      id: '1',
      description: 'Folga mecânica excessiva entre punção e matriz de corte',
      source: 'Ishikawa',
      status: 'Validada',
      evidence: 'Medição com calibre de folga acusou 0.12mm (especificado: 0.04mm); peças voltaram à especificação ao ajustar a matriz na Prensa 2',
      validationMethod: 'Teste Prático de Campo',
      responsible: 'Eng. de Processos / Manutenção',
      date: '2026-04-12',
      notes: 'Causa raiz primária confirmada com correlação direta na altura da rebarba.'
    },
    {
      id: '2',
      description: 'Dureza do lote de chapas SAE 1020 acima de 65 HRB',
      source: '5 Porquês',
      status: 'Validada',
      evidence: 'Ensaio de dureza em 30 amostras acusou média de 68 HRB (p-valor < 0.001 no teste t contra especificação de 50 HRB)',
      validationMethod: 'Teste Estatístico',
      responsible: 'Qualidade / Metrologia',
      date: '2026-04-14',
      notes: 'Acelerou o desgaste abrasivo das punções.'
    },
    {
      id: '3',
      description: 'Velocidade da prensa de estampagem operando em 45 GPM',
      source: 'Matriz Causa e Efeito',
      status: 'Descartada',
      evidence: 'Teste com variação de velocidade entre 30 e 50 GPM não apresentou alteração estatisticamente significante na rebarba (ANOVA p = 0.42)',
      validationMethod: 'Teste Estatístico',
      responsible: 'Especialista Green Belt',
      date: '2026-04-15',
      notes: 'Descartada como fator causal primário.'
    },
    {
      id: '4',
      description: 'Temperatura ambiente e dilatação térmica na prensa',
      source: 'Ishikawa',
      status: 'Não Confirmada',
      evidence: 'Monitoramento térmico contínuo por 7 dias mostrou variação de apenas 3°C sem correlação com defeitos',
      validationMethod: 'Dados Históricos',
      responsible: 'Operador Líder',
      date: '2026-04-16',
      notes: 'Descartada por ausência de evidências.'
    }
  ]);

  const handleAddCause = () => {
    const newCause: ValidatedCause = {
      id: Date.now().toString(),
      description: '',
      source: 'Ishikawa',
      status: 'Identificada',
      evidence: '',
      validationMethod: 'Teste Prático de Campo',
      responsible: '',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    };
    setCauses(prev => [...prev, newCause]);
  };

  const handleUpdate = (id: string, field: keyof ValidatedCause, val: any) => {
    setCauses(prev => prev.map(c => c.id === id ? { ...c, [field]: val } : c));
  };

  const getStatusBadge = (status: CauseStatus) => {
    switch (status) {
      case 'Validada':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200"><CheckCircle2 className="w-3 h-3 text-emerald-600" /> Validada</span>;
      case 'Em Investigação':
      case 'Aguardando Validação':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800 border border-amber-200"><Clock className="w-3 h-3 text-amber-600" /> {status}</span>;
      case 'Descartada':
      case 'Não Confirmada':
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200"><XCircle className="w-3 h-3 text-slate-500" /> {status}</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200"><AlertCircle className="w-3 h-3 text-blue-600" /> Identificada (Hipótese)</span>;
    }
  };

  const validatedCount = causes.filter(c => c.status === 'Validada').length;

  return (
    <ToolContainer
      title="Hub Central de Validação de Causas (Hipótese vs. Evidência Comprovada)"
      subtitle="Critério formal Six Sigma: nenhuma causa avança para a fase IMPROVE sem comprovação por evidências ou testes estatísticos"
      badge="ANALYZE 2.5"
      actions={
        <button
          onClick={handleAddCause}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Causa / Hipótese
        </button>
      }
    >
      <div className="space-y-6">
        {/* Painel de Status das Causas */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
              <FileCheck className="w-4 h-4 text-emerald-600" /> Rastreabilidade e Governança de Causas-Raiz
            </h4>
            <p className="text-xs text-slate-500 mt-0.5">
              Apenas causas com status <strong>Validada</strong> alimentarão a Matriz de Soluções e 5W2H na fase IMPROVE.
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs">
            <span className="p-2 bg-white rounded border border-slate-200 font-mono">
              Total: <strong>{causes.length}</strong>
            </span>
            <span className="p-2 bg-emerald-50 rounded border border-emerald-200 text-emerald-800 font-bold font-mono">
              Validadas: {validatedCount}
            </span>
          </div>
        </div>

        {/* Tabela de Validação de Causas */}
        <div className="space-y-3">
          {causes.map(cause => (
            <div
              key={cause.id}
              className={`p-4 rounded-xl border transition ${
                cause.status === 'Validada'
                  ? 'bg-emerald-50/40 border-emerald-300'
                  : cause.status === 'Descartada'
                  ? 'bg-slate-50/60 border-slate-200 opacity-75'
                  : 'bg-white border-slate-200'
              }`}
            >
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 pb-2 border-b border-slate-200/60">
                <div className="flex items-center gap-2 flex-wrap">
                  {getStatusBadge(cause.status)}
                  <span className="text-[10px] font-mono uppercase bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200">
                    Origem: {cause.source}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500">
                    Data: {cause.date}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={cause.status}
                    onChange={e => handleUpdate(cause.id, 'status', e.target.value as CauseStatus)}
                    className="text-xs font-bold px-2 py-1 bg-white border border-slate-300 rounded focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Identificada">Identificada (Hipótese)</option>
                    <option value="Em Investigação">Em Investigação</option>
                    <option value="Aguardando Validação">Aguardando Validação</option>
                    <option value="Validada">Validada (Fato Comprovado)</option>
                    <option value="Não Confirmada">Não Confirmada</option>
                    <option value="Descartada">Descartada</option>
                  </select>
                  <button
                    onClick={() => setCauses(prev => prev.filter(c => c.id !== cause.id))}
                    className="p-1 text-slate-300 hover:text-red-600 rounded"
                    title="Excluir"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Descrição da Causa */}
              <div className="mt-2">
                <input
                  type="text"
                  value={cause.description}
                  onChange={e => handleUpdate(cause.id, 'description', e.target.value)}
                  placeholder="Descrição da causa potencial investigada..."
                  className="w-full text-sm font-bold bg-transparent border-b border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white p-1 rounded outline-none text-slate-900"
                />
              </div>

              {/* Evidências e Método de Validação */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3 pt-2 text-xs">
                <div className="md:col-span-2">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                    Evidência Objetiva (Dados, Testes, Relatórios)
                  </label>
                  <textarea
                    rows={2}
                    value={cause.evidence}
                    onChange={e => handleUpdate(cause.id, 'evidence', e.target.value)}
                    placeholder="Descreva a comprovação concreta (ex: p-valor < 0.05, ensaio destrutivo, teste de campo)..."
                    className="w-full p-2 bg-white border border-slate-200 rounded text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Método de Validação
                    </label>
                    <select
                      value={cause.validationMethod}
                      onChange={e => handleUpdate(cause.id, 'validationMethod', e.target.value as any)}
                      className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs font-semibold"
                    >
                      <option value="Teste Prático de Campo">Teste Prático de Campo</option>
                      <option value="Teste Estatístico">Teste Estatístico (ANOVA/Regressão)</option>
                      <option value="Observação Gemba">Observação Gemba</option>
                      <option value="Dados Históricos">Dados Históricos</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase mb-0.5">
                      Responsável pela Validação
                    </label>
                    <input
                      type="text"
                      value={cause.responsible}
                      onChange={e => handleUpdate(cause.id, 'responsible', e.target.value)}
                      placeholder="Ex: Engenheiro de Qualidade"
                      className="w-full p-1.5 bg-white border border-slate-200 rounded text-xs"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </ToolContainer>
  );
};
