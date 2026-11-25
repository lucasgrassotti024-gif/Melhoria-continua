import React, { useState } from 'react';
import { ControlPlanItem } from '../../../types/control';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2, ShieldCheck } from 'lucide-react';

export const ControlPlanTool: React.FC = () => {
  const [items, setItems] = useState<ControlPlanItem[]>([
    {
      id: '1',
      processStep: 'Estampagem / Corte',
      controlledFeature: 'Folga entre punção e matriz',
      indicator: 'Folga mecânica (mm)',
      specification: '0.040 mm +- 0.005 mm',
      measurementMethod: 'Gabarito Poka-Yoke calibrado e micrômetro Mitutoyo',
      sampleSizeAndFreq: '1 verificação a cada setup de matriz ou 1x por turno',
      responsible: 'Operador Líder / Preparador de Matriz',
      reactionPlan: 'Se a folga for > 0.045mm: Interromper a prensa imediatamente, soltar calços e refazer o ajuste com o gabarito Poka-Yoke.',
      status: 'Conforme'
    },
    {
      id: '2',
      processStep: 'Recebimento de Aço',
      controlledFeature: 'Dureza do lote de chapas SAE 1020',
      indicator: 'Dureza superficial (HRB)',
      specification: '<= 50 HRB',
      measurementMethod: 'Durômetro portátil calibrado RBC',
      sampleSizeAndFreq: '3 pontos em 5 bobinas por caminhão descarregado',
      responsible: 'Inspetor de Recebimento da Qualidade',
      reactionPlan: 'Se dureza > 50 HRB: Segregar o lote com etiqueta vermelha e acionar o fornecedor para substituição imediata.',
      status: 'Conforme'
    },
    {
      id: '3',
      processStep: 'Inspeção de Saída',
      controlledFeature: 'Altura da rebarba na borda de corte',
      indicator: 'Altura da rebarba (mm)',
      specification: '< 0.05 mm',
      measurementMethod: 'Micrômetro óptico de bancada',
      sampleSizeAndFreq: '5 peças consecutivas a cada 2 horas',
      responsible: 'Inspetor da Qualidade de Linha',
      reactionPlan: 'Se rebarba > 0.05mm: Reter a última hora de produção para retrabalho e recalibrar a folga da matriz.',
      status: 'Conforme'
    }
  ]);

  const handleAddItem = () => {
    const newItem: ControlPlanItem = {
      id: Date.now().toString(),
      processStep: '',
      controlledFeature: '',
      indicator: '',
      specification: '',
      measurementMethod: '',
      sampleSizeAndFreq: '',
      responsible: '',
      reactionPlan: '',
      status: 'Conforme'
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleUpdate = (id: string, field: keyof ControlPlanItem, val: any) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  return (
    <ToolContainer
      title="Plano de Controle Operacional & Planos de Reação"
      subtitle="Definição das rotinas de inspeção, parâmetros críticos mantidos sob controle e reações imediatas a desvios"
      badge="CONTROL 2.1"
      actions={
        <button
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-md hover:bg-red-100"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Parâmetro de Controle
        </button>
      }
    >
      <div className="space-y-4">
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Garantia de Sustentação: <strong>{items.length}</strong> características do processo sob monitoramento contínuo.</span>
          </div>
          <span className="text-emerald-800 font-bold bg-emerald-100 px-2 py-0.5 rounded">
            Todos os Planos de Reação Validados
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-200 rounded-lg">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
              <tr>
                <th className="p-2.5">Etapa do Processo</th>
                <th className="p-2.5">Característica Controlada</th>
                <th className="p-2.5">Especificação</th>
                <th className="p-2.5">Método de Medição</th>
                <th className="p-2.5">Amostragem & Frequência</th>
                <th className="p-2.5">Responsável</th>
                <th className="p-2.5 min-w-[200px]">Plano de Reação Imediata</th>
                <th className="p-2 text-center">Status</th>
                <th className="p-2 text-center">Excluir</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 bg-white">
              {items.map(item => (
                <tr key={item.id} className="hover:bg-slate-50">
                  <td className="p-2 min-w-[120px]">
                    <input
                      type="text"
                      value={item.processStep}
                      onChange={e => handleUpdate(item.id, 'processStep', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs font-semibold"
                    />
                  </td>
                  <td className="p-2 min-w-[140px]">
                    <input
                      type="text"
                      value={item.controlledFeature}
                      onChange={e => handleUpdate(item.id, 'controlledFeature', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs"
                    />
                  </td>
                  <td className="p-2 min-w-[130px]">
                    <input
                      type="text"
                      value={item.specification}
                      onChange={e => handleUpdate(item.id, 'specification', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs font-mono font-bold text-slate-800"
                    />
                  </td>
                  <td className="p-2 min-w-[140px]">
                    <input
                      type="text"
                      value={item.measurementMethod}
                      onChange={e => handleUpdate(item.id, 'measurementMethod', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs"
                    />
                  </td>
                  <td className="p-2 min-w-[140px]">
                    <input
                      type="text"
                      value={item.sampleSizeAndFreq}
                      onChange={e => handleUpdate(item.id, 'sampleSizeAndFreq', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs"
                    />
                  </td>
                  <td className="p-2 min-w-[120px]">
                    <input
                      type="text"
                      value={item.responsible}
                      onChange={e => handleUpdate(item.id, 'responsible', e.target.value)}
                      className="w-full p-1 border border-slate-200 rounded text-xs"
                    />
                  </td>
                  <td className="p-2 min-w-[200px]">
                    <textarea
                      rows={2}
                      value={item.reactionPlan}
                      onChange={e => handleUpdate(item.id, 'reactionPlan', e.target.value)}
                      className="w-full p-1.5 border border-red-200 bg-red-50/20 rounded text-xs text-red-950 focus:ring-1 focus:ring-red-400"
                    />
                  </td>
                  <td className="p-2 text-center">
                    <select
                      value={item.status}
                      onChange={e => handleUpdate(item.id, 'status', e.target.value as any)}
                      className={`p-1 border rounded text-[10px] font-bold ${
                        item.status === 'Conforme'
                          ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                          : 'bg-red-50 text-red-800 border-red-300'
                      }`}
                    >
                      <option value="Conforme">Conforme</option>
                      <option value="Alerta">Alerta</option>
                      <option value="Fora de Controle">Fora de Controle</option>
                    </select>
                  </td>
                  <td className="p-2 text-center">
                    <button
                      onClick={() => setItems(prev => prev.filter(x => x.id !== item.id))}
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
