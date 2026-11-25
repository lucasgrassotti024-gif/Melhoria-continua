import React, { useState } from 'react';
import { BeforeAfterComparison, StandardProcedureItem, AuditCheckItem } from '../../../types/control';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { CheckCircle2, TrendingDown, BookOpen, ClipboardCheck, Plus, Trash2 } from 'lucide-react';

export const StandardizationAndAuditTool: React.FC = () => {
  // 1. Comparativo Antes vs Depois com Teste de Hipótese
  const [comparison] = useState<BeforeAfterComparison>({
    metric: 'Taxa de Refugo por Rebarba na Estampagem',
    unit: '%',
    beforeMean: 6.40,
    beforeStdDev: 1.15,
    afterMean: 1.35,
    afterStdDev: 0.28,
    deltaAbsolute: -5.05,
    deltaPercent: -78.9,
    isStatisticallySignificant: true,
    pValue: 0.0001
  });

  // 2. Procedimentos Operacionais Padrão (POPs)
  const [procedures, setProcedures] = useState<StandardProcedureItem[]>([
    {
      id: '1',
      code: 'POP-PRN-012',
      title: 'Ajuste e Calibração Rápida da Folga de Matrizes com Gabarito Poka-Yoke',
      version: 'Rev. 02',
      department: 'Estampagem / Manutenção',
      responsible: 'Engenharia de Processos',
      lastReviewDate: '2026-05-20',
      status: 'Ativo'
    },
    {
      id: '2',
      code: 'POP-REC-004',
      title: 'Inspeção e Ensaio de Dureza Portátil no Recebimento de Aço',
      version: 'Rev. 03',
      department: 'Garantia da Qualidade',
      responsible: 'Inspetor da Qualidade',
      lastReviewDate: '2026-05-25',
      status: 'Ativo'
    }
  ]);

  // 3. Auditorias de Sustentação
  const [audits, setAudits] = useState<AuditCheckItem[]>([
    {
      id: '1',
      checkItem: 'Gabarito Poka-Yoke está sendo utilizado em 100% dos setups de prensa?',
      frequency: 'Semanal',
      auditor: 'Auditor Interno da Qualidade',
      lastAuditDate: '2026-06-02',
      result: 'Conforme'
    },
    {
      id: '2',
      checkItem: 'Registros de ensaio de dureza arquivados para cada lote de matéria-prima?',
      frequency: 'Quinzenal',
      auditor: 'Supervisor de Recebimento',
      lastAuditDate: '2026-06-01',
      result: 'Conforme'
    }
  ]);

  const handleAddProcedure = () => {
    const newProc: StandardProcedureItem = {
      id: Date.now().toString(),
      code: 'POP-NOVO',
      title: 'Novo Procedimento Operacional',
      version: 'Rev. 01',
      department: 'Produção',
      responsible: 'Engenheiro Responsável',
      lastReviewDate: new Date().toISOString().split('T')[0],
      status: 'Ativo'
    };
    setProcedures(prev => [...prev, newProc]);
  };

  const handleAddAudit = () => {
    const newAudit: AuditCheckItem = {
      id: Date.now().toString(),
      checkItem: 'Novo item de verificação em auditoria Gemba',
      frequency: 'Semanal',
      auditor: 'Auditor da Qualidade',
      lastAuditDate: new Date().toISOString().split('T')[0],
      result: 'Conforme'
    };
    setAudits(prev => [...prev, newAudit]);
  };

  return (
    <ToolContainer
      title="Comparador Antes x Depois & Padronização (POPs e Auditorias)"
      subtitle="Validação da significância estatística do ganho do projeto e documentação para sustentação a longo prazo"
      badge="CONTROL 2.3 & 2.4"
    >
      <div className="space-y-8">
        {/* Painel Antes vs Depois com Teste de Hipótese */}
        <div className="p-5 border-2 border-emerald-300 bg-emerald-50/40 rounded-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-emerald-200 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                COMPROVAÇÃO ESTATÍSTICA SIX SIGMA
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-2">
                <TrendingDown className="w-4 h-4 text-emerald-600" /> Comparativo de Desempenho: {comparison.metric}
              </h4>
            </div>
            <div className="text-xs text-emerald-950 font-semibold flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Significância Estatística: <strong>p-valor = {comparison.pValue} (&lt; 0.05)</strong>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-3 bg-white border border-slate-200 rounded-lg">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Antes da Melhoria (Define/Measure)</span>
              <div className="text-xl font-mono font-black text-slate-800 mt-1">{comparison.beforeMean}%</div>
              <div className="text-[10px] text-slate-500">Desvio padrão: s = {comparison.beforeStdDev}%</div>
            </div>

            <div className="p-3 bg-white border border-emerald-300 rounded-lg">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Depois da Melhoria (Control)</span>
              <div className="text-xl font-mono font-black text-emerald-700 mt-1">{comparison.afterMean}%</div>
              <div className="text-[10px] text-emerald-600">Desvio padrão: s = {comparison.afterStdDev}%</div>
            </div>

            <div className="p-3 bg-white border border-emerald-300 rounded-lg">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Redução Absoluta</span>
              <div className="text-xl font-mono font-black text-emerald-900 mt-1">{comparison.deltaAbsolute}%</div>
              <div className="text-[10px] text-emerald-700">Queda nos pontos percentuais</div>
            </div>

            <div className="p-3 bg-emerald-600 text-white rounded-lg shadow-sm">
              <span className="text-[10px] font-bold uppercase text-emerald-100">Ganho Percentual Total</span>
              <div className="text-2xl font-black mt-1">{comparison.deltaPercent}%</div>
              <div className="text-[10px] text-emerald-100">Redução de refugo sustentada</div>
            </div>
          </div>
        </div>

        {/* Seção 2: Padronização (POPs) */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-600" /> Procedimentos Operacionais Padrão (POPs)
              </h4>
              <p className="text-xs text-slate-500">Normas técnicas oficiais para garantir que os métodos melhorados não se percam</p>
            </div>
            <button
              onClick={handleAddProcedure}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar POP
            </button>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Código</th>
                  <th className="p-2.5">Título do Procedimento</th>
                  <th className="p-2.5">Revisão</th>
                  <th className="p-2.5">Área / Departamento</th>
                  <th className="p-2.5">Responsável</th>
                  <th className="p-2.5">Última Revisão</th>
                  <th className="p-2 text-center">Status</th>
                  <th className="p-2 text-center">Excluir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {procedures.map(p => (
                  <tr key={p.id} className="hover:bg-slate-50">
                    <td className="p-2 font-mono font-bold text-slate-800">{p.code}</td>
                    <td className="p-2 font-semibold text-slate-900">{p.title}</td>
                    <td className="p-2 font-mono text-slate-600">{p.version}</td>
                    <td className="p-2 text-slate-600">{p.department}</td>
                    <td className="p-2 text-slate-800">{p.responsible}</td>
                    <td className="p-2 text-slate-500">{p.lastReviewDate}</td>
                    <td className="p-2 text-center">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-200">
                        {p.status}
                      </span>
                    </td>
                    <td className="p-2 text-center">
                      <button onClick={() => setProcedures(prev => prev.filter(x => x.id !== p.id))} className="text-slate-300 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Seção 3: Auditorias de Sustentação */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ClipboardCheck className="w-4 h-4 text-purple-600" /> Auditorias Gemba de Sustentação
              </h4>
              <p className="text-xs text-slate-500">Verificações de conformidade dos padrões implementados no chão de fábrica</p>
            </div>
            <button
              onClick={handleAddAudit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Item de Auditoria
            </button>
          </div>

          <div className="space-y-2">
            {audits.map(a => (
              <div key={a.id} className="p-3 bg-white border border-slate-200 rounded-lg flex items-center justify-between text-xs shadow-2xs">
                <div className="flex items-center gap-3">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div>
                    <div className="font-semibold text-slate-900">{a.checkItem}</div>
                    <div className="text-[10px] text-slate-400">Auditor: {a.auditor} • Frequência: {a.frequency} • Verificado em: {a.lastAuditDate}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded">
                    {a.result}
                  </span>
                  <button onClick={() => setAudits(prev => prev.filter(x => x.id !== a.id))} className="text-slate-300 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};
