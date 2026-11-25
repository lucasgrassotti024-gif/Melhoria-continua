import React, { useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import { StakeholderItem, Action5W2H } from '../../../types/project';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2 } from 'lucide-react';

export const StakeholdersAndPlanTool: React.FC = () => {
  const { project, updateDefine } = useProject();
  const [stakeholders, setStakeholders] = useState<StakeholderItem[]>(project.define.stakeholders);
  const [actions, setActions] = useState<Action5W2H[]>(project.define.actions5w2h);

  const handleAddStakeholder = () => {
    const newItem: StakeholderItem = {
      id: Date.now().toString(),
      name: '',
      department: '',
      role: '',
      interest: 'Alto',
      influence: 'Alta',
      engagementStrategy: ''
    };
    setStakeholders(prev => [...prev, newItem]);
  };

  const handleAddAction = () => {
    const newAction: Action5W2H = {
      id: Date.now().toString(),
      what: '',
      why: '',
      where: '',
      when: '',
      who: '',
      how: '',
      howMuch: 'R$ 0',
      status: 'Pendente'
    };
    setActions(prev => [...prev, newAction]);
  };

  const handleSave = () => {
    updateDefine({ stakeholders, actions5w2h: actions });
  };

  return (
    <ToolContainer
      title="Matriz de Stakeholders & Plano 5W2H (Fase Define)"
      subtitle="Mapeamento de partes interessadas e cronograma de ações imediatas de estruturação do projeto"
      badge="DEFINE 2.5 & 2.6"
      onSave={handleSave}
    >
      <div className="space-y-8">
        {/* Matriz de Stakeholders */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">1. Matriz de Partes Interessadas (Stakeholders)</h3>
              <p className="text-xs text-slate-500">Mapeamento de Poder x Interesse e estratégia de engajamento</p>
            </div>
            <button
              onClick={handleAddStakeholder}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar Stakeholder
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">Nome / Pessoa</th>
                  <th className="p-2.5">Área / Departamento</th>
                  <th className="p-2.5">Papel no Projeto</th>
                  <th className="p-2.5">Interesse</th>
                  <th className="p-2.5">Influência</th>
                  <th className="p-2.5">Estratégia de Engajamento</th>
                  <th className="p-2.5 text-center">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {stakeholders.map(s => (
                  <tr key={s.id} className="hover:bg-slate-50">
                    <td className="p-2">
                      <input
                        type="text"
                        value={s.name}
                        onChange={e => setStakeholders(prev => prev.map(item => item.id === s.id ? { ...item, name: e.target.value } : item))}
                        placeholder="Ex: Carlos Mendes"
                        className="w-full p-1 bg-white border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={s.department}
                        onChange={e => setStakeholders(prev => prev.map(item => item.id === s.id ? { ...item, department: e.target.value } : item))}
                        placeholder="Ex: Produção"
                        className="w-full p-1 bg-white border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={s.role}
                        onChange={e => setStakeholders(prev => prev.map(item => item.id === s.id ? { ...item, role: e.target.value } : item))}
                        placeholder="Ex: Sponsor"
                        className="w-full p-1 bg-white border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2">
                      <select
                        value={s.interest}
                        onChange={e => setStakeholders(prev => prev.map(item => item.id === s.id ? { ...item, interest: e.target.value as any } : item))}
                        className="p-1 bg-white border border-slate-200 rounded w-full"
                      >
                        <option value="Alto">Alto</option>
                        <option value="Baixo">Baixo</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <select
                        value={s.influence}
                        onChange={e => setStakeholders(prev => prev.map(item => item.id === s.id ? { ...item, influence: e.target.value as any } : item))}
                        className="p-1 bg-white border border-slate-200 rounded w-full"
                      >
                        <option value="Alta">Alta</option>
                        <option value="Baixa">Baixa</option>
                      </select>
                    </td>
                    <td className="p-2">
                      <input
                        type="text"
                        value={s.engagementStrategy}
                        onChange={e => setStakeholders(prev => prev.map(item => item.id === s.id ? { ...item, engagementStrategy: e.target.value } : item))}
                        placeholder="Ex: Reporte quinzenal"
                        className="w-full p-1 bg-white border border-slate-200 rounded"
                      />
                    </td>
                    <td className="p-2 text-center">
                      <button
                        onClick={() => setStakeholders(prev => prev.filter(item => item.id !== s.id))}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition"
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

        {/* Plano de Ação 5W2H */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">2. Plano de Ação 5W2H da Fase Define</h3>
              <p className="text-xs text-slate-500">Ações de alinhamento, preparação de dados e engajamento da equipe</p>
            </div>
            <button
              onClick={handleAddAction}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar Ação
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border border-slate-200 rounded-lg overflow-hidden">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-2.5">O quê? (What)</th>
                  <th className="p-2.5">Por quê? (Why)</th>
                  <th className="p-2.5">Onde? (Where)</th>
                  <th className="p-2.5">Quando? (When)</th>
                  <th className="p-2.5">Quem? (Who)</th>
                  <th className="p-2.5">Como? (How)</th>
                  <th className="p-2.5">Quanto? (How Much)</th>
                  <th className="p-2.5">Status</th>
                  <th className="p-2.5 text-center">Excluir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {actions.map(a => (
                  <tr key={a.id} className="hover:bg-slate-50">
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={a.what}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, what: e.target.value } : item))}
                        className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={a.why}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, why: e.target.value } : item))}
                        className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={a.where}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, where: e.target.value } : item))}
                        className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={a.when}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, when: e.target.value } : item))}
                        className="w-24 p-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={a.who}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, who: e.target.value } : item))}
                        className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={a.how}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, how: e.target.value } : item))}
                        className="w-full p-1 bg-white border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={a.howMuch}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, howMuch: e.target.value } : item))}
                        className="w-20 p-1 bg-white border border-slate-200 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="p-1.5">
                      <select
                        value={a.status}
                        onChange={e => setActions(prev => prev.map(item => item.id === a.id ? { ...item, status: e.target.value as any } : item))}
                        className="p-1 bg-white border border-slate-200 rounded text-xs"
                      >
                        <option value="Pendente">Pendente</option>
                        <option value="Em Andamento">Em Andamento</option>
                        <option value="Concluído">Concluído</option>
                        <option value="Atrasado">Atrasado</option>
                      </select>
                    </td>
                    <td className="p-1.5 text-center">
                      <button
                        onClick={() => setActions(prev => prev.filter(item => item.id !== a.id))}
                        className="p-1 text-slate-400 hover:text-red-600 rounded transition"
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
      </div>
    </ToolContainer>
  );
};
