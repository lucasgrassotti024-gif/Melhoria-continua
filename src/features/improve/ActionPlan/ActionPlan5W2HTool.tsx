import React, { useState } from 'react';
import { ActionPlanItem } from '../../../types/improve';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2 } from 'lucide-react';

export const ActionPlan5W2HTool: React.FC = () => {
  const [actions, setActions] = useState<ActionPlanItem[]>([
    {
      id: '1',
      what: 'Fabricar e instalar gabarito Poka-Yoke de ajuste rápido da folga de corte',
      why: 'Eliminar erro humano e garantir folga de 0.04mm constante nas prensas',
      where: 'Linhas de Estampagem 01 e 02',
      when: '2026-05-15',
      who: 'Ferramentaria Interna',
      how: 'Usinagem CNC de bloco temperado com tolerância de +-0.005mm',
      plannedCost: 4500,
      actualCost: 4200,
      status: 'Concluído',
      evidence: 'Relatório dimensional da ferramentaria e teste de repetibilidade concluído'
    },
    {
      id: '2',
      what: 'Adquirir durômetro portátil e implementar ensaio no recebimento de bobinas',
      why: 'Barrar lotes de fornecedor fora da especificação (máximo 50 HRB)',
      where: 'Doca de Recebimento de Matéria-Prima',
      when: '2026-05-30',
      who: 'Garantia da Qualidade / Compras',
      how: 'Aquisição de durômetro magnético com calibração RBC e revisão do POP-REC-04',
      plannedCost: 8000,
      actualCost: 7850,
      status: 'Em Andamento',
      evidence: 'Pedido de compra aprovado e procedimento em fase de validação'
    },
    {
      id: '3',
      what: 'Treinar 100% dos operadores no procedimento padrão de setup de matriz',
      why: 'Padronizar aperto sequencial dos parafusos de fixação',
      where: 'Célula de Estampagem',
      when: '2026-06-10',
      who: 'Supervisor de Produção',
      how: 'Treinamento prático de 30 minutos por turno no próprio posto de trabalho',
      plannedCost: 600,
      actualCost: 0,
      status: 'Pendente'
    }
  ]);

  const handleAddAction = () => {
    const newAct: ActionPlanItem = {
      id: Date.now().toString(),
      what: '',
      why: '',
      where: '',
      when: '',
      who: '',
      how: '',
      plannedCost: 0,
      actualCost: 0,
      status: 'Pendente'
    };
    setActions(prev => [...prev, newAct]);
  };

  const handleUpdate = (id: string, field: keyof ActionPlanItem, val: any) => {
    setActions(prev => prev.map(a => a.id === id ? { ...a, [field]: val } : a));
  };

  const totalPlannedCost = actions.reduce((sum, a) => sum + (Number(a.plannedCost) || 0), 0);
  const totalActualCost = actions.reduce((sum, a) => sum + (Number(a.actualCost) || 0), 0);
  const completedCount = actions.filter(a => a.status === 'Concluído').length;

  return (
    <ToolContainer
      title="Plano de Ação 5W2H Executivo (Implementação de Melhorias)"
      subtitle="Detalhamento operacional, cronograma, orçamentos previstos vs. realizados e rastreamento de evidências"
      badge="IMPROVE 2.3 & 2.4"
      actions={
        <button
          onClick={handleAddAction}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-md hover:bg-purple-100"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Ação 5W2H
        </button>
      }
    >
      <div className="space-y-6">
        {/* Painel Executivo de Acompanhamento */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-2xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Total de Ações</span>
            <div className="text-xl font-black text-slate-900 mt-1">{actions.length}</div>
          </div>
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg shadow-2xs">
            <span className="text-[10px] font-bold text-emerald-800 uppercase">Ações Concluídas</span>
            <div className="text-xl font-black text-emerald-950 mt-1">
              {completedCount} ({actions.length > 0 ? Math.round((completedCount / actions.length) * 100) : 0}%)
            </div>
          </div>
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg shadow-2xs">
            <span className="text-[10px] font-bold text-slate-500 uppercase">Orçamento Previsto</span>
            <div className="text-base font-bold text-slate-800 mt-1">
              R$ {totalPlannedCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
          <div className="p-3 bg-purple-50 border border-purple-200 rounded-lg shadow-2xs">
            <span className="text-[10px] font-bold text-purple-800 uppercase">Custo Realizado</span>
            <div className="text-base font-black text-purple-950 mt-1">
              R$ {totalActualCost.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
          </div>
        </div>

        {/* Tabela do Plano de Ação */}
        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2.5">O quê? (What)</th>
                <th className="p-2.5">Por quê? (Why)</th>
                <th className="p-2.5">Onde / Quem? (Where / Who)</th>
                <th className="p-2.5">Prazo (When)</th>
                <th className="p-2.5">Como? (How)</th>
                <th className="p-2 text-right">Previsto</th>
                <th className="p-2 text-right">Realizado</th>
                <th className="p-2.5 text-center">Status</th>
                <th className="p-2 text-center">Excluir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {actions.map(act => (
                <tr key={act.id} className="hover:bg-slate-50">
                  <td className="p-2 min-w-[160px]">
                    <textarea
                      rows={2}
                      value={act.what}
                      onChange={e => handleUpdate(act.id, 'what', e.target.value)}
                      placeholder="Descrição da ação..."
                      className="w-full p-1.5 border border-slate-200 rounded text-xs font-semibold"
                    />
                  </td>
                  <td className="p-2 min-w-[140px]">
                    <textarea
                      rows={2}
                      value={act.why}
                      onChange={e => handleUpdate(act.id, 'why', e.target.value)}
                      placeholder="Justificativa técnica..."
                      className="w-full p-1.5 border border-slate-200 rounded text-xs"
                    />
                  </td>
                  <td className="p-2 min-w-[130px]">
                    <input
                      type="text"
                      value={act.where}
                      onChange={e => handleUpdate(act.id, 'where', e.target.value)}
                      placeholder="Local"
                      className="w-full p-1 border border-slate-200 rounded text-xs mb-1"
                    />
                    <input
                      type="text"
                      value={act.who}
                      onChange={e => handleUpdate(act.id, 'who', e.target.value)}
                      placeholder="Responsável"
                      className="w-full p-1 border border-slate-200 rounded text-xs font-semibold"
                    />
                  </td>
                  <td className="p-2">
                    <input
                      type="date"
                      value={act.when}
                      onChange={e => handleUpdate(act.id, 'when', e.target.value)}
                      className="p-1 border border-slate-200 rounded text-xs"
                    />
                  </td>
                  <td className="p-2 min-w-[150px]">
                    <textarea
                      rows={2}
                      value={act.how}
                      onChange={e => handleUpdate(act.id, 'how', e.target.value)}
                      placeholder="Método de execução..."
                      className="w-full p-1.5 border border-slate-200 rounded text-xs"
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      step="any"
                      value={act.plannedCost}
                      onChange={e => handleUpdate(act.id, 'plannedCost', Number(e.target.value))}
                      className="w-20 p-1 border border-slate-200 rounded text-xs text-right font-mono"
                    />
                  </td>
                  <td className="p-2 text-right">
                    <input
                      type="number"
                      step="any"
                      value={act.actualCost}
                      onChange={e => handleUpdate(act.id, 'actualCost', Number(e.target.value))}
                      className="w-20 p-1 border border-slate-200 rounded text-xs text-right font-mono font-bold text-purple-900"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <select
                      value={act.status}
                      onChange={e => handleUpdate(act.id, 'status', e.target.value as any)}
                      className="p-1 border border-slate-300 rounded text-xs font-bold"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Em Andamento">Em Andamento</option>
                      <option value="Concluído">Concluído</option>
                      <option value="Atrasado">Atrasado</option>
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => setActions(prev => prev.filter(a => a.id !== act.id))}
                      className="p-1 text-slate-300 hover:text-red-600 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </ToolContainer>
  );
};
