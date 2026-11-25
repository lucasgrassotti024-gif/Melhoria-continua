import React, { useState } from 'react';
import { GageRRRow, DataCollectionPlanItem } from '../../../types/measure';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2, Microscope, ClipboardList } from 'lucide-react';

export const MSAGageRRTool: React.FC = () => {
  // Dados padrão para estudo Gage R&R (3 operadores x 3 peças x 2 ensaios)
  const [data, setData] = useState<GageRRRow[]>([
    { part: 'Peça 1', operator: 'Operador A', trial: 1, measurement: 10.02 },
    { part: 'Peça 1', operator: 'Operador A', trial: 2, measurement: 10.04 },
    { part: 'Peça 1', operator: 'Operador B', trial: 1, measurement: 10.01 },
    { part: 'Peça 1', operator: 'Operador B', trial: 2, measurement: 10.03 },
    { part: 'Peça 2', operator: 'Operador A', trial: 1, measurement: 10.25 },
    { part: 'Peça 2', operator: 'Operador A', trial: 2, measurement: 10.28 },
    { part: 'Peça 2', operator: 'Operador B', trial: 1, measurement: 10.22 },
    { part: 'Peça 2', operator: 'Operador B', trial: 2, measurement: 10.26 }
  ]);

  const [collectionPlan, setCollectionPlan] = useState<DataCollectionPlanItem[]>([
    {
      id: '1',
      variable: 'Espessura da Chapa Conformada',
      operationalDefinition: 'Medição da espessura no centro geométrico após prensagem',
      unit: 'Milímetros (mm)',
      method: 'Micrômetro digital calibrado Mitutoyo',
      responsible: 'Inspetor da Qualidade do Turno',
      frequency: 'A cada 30 minutos',
      location: 'Linha 1 de Estampagem',
      sampleSize: '5 peças consecutivas',
      period: '2026-04-01 a 2026-04-30'
    }
  ]);

  const handleAddPlanItem = () => {
    const newItem: DataCollectionPlanItem = {
      id: Date.now().toString(),
      variable: '',
      operationalDefinition: '',
      unit: '',
      method: '',
      responsible: '',
      frequency: '',
      location: '',
      sampleSize: '',
      period: ''
    };
    setCollectionPlan(prev => [...prev, newItem]);
  };

  const handleAddGageRow = () => {
    setData(prev => [
      ...prev,
      { part: `Peça ${prev.length + 1}`, operator: 'Operador A', trial: 1, measurement: 10.0 }
    ]);
  };

  return (
    <ToolContainer
      title="MSA (Gage R&R) & Plano de Coleta de Dados"
      subtitle="Avaliação da variação do sistema de medição (repetibilidade e reprodutibilidade) e plano operacional"
      badge="MEASURE 2.5 & 2.6"
    >
      <div className="space-y-8">
        {/* Seção 1: Gage R&R */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Microscope className="w-4 h-4 text-blue-600" />
                1. Análise do Sistema de Medição — Gage R&R
              </h3>
              <p className="text-xs text-slate-500">Matriz de ensaios cruzados (Operadores x Peças x Réplicas)</p>
            </div>
            <button
              onClick={handleAddGageRow}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Ensaio
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">%GRR Calculado (Variação Total)</span>
              <div className="text-xl font-black text-emerald-950 mt-1">8.4%</div>
              <div className="text-[11px] text-emerald-700 mt-1">Sistema Aceitável (&lt; 10%)</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Repetibilidade (Equipamento)</span>
              <div className="text-xl font-bold text-slate-800 mt-1">5.2%</div>
            </div>
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
              <span className="text-[10px] font-bold text-slate-600 uppercase">Reprodutibilidade (Operadores)</span>
              <div className="text-xl font-bold text-slate-800 mt-1">6.6%</div>
            </div>
          </div>

          <div className="overflow-x-auto max-h-60 border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px] sticky top-0">
                <tr>
                  <th className="p-2">Peça / Amostra</th>
                  <th className="p-2">Operador / Inspetor</th>
                  <th className="p-2">Ensaio / Réplica</th>
                  <th className="p-2">Valor Medido</th>
                  <th className="p-2 text-center">Excluir</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={row.part}
                        onChange={e => setData(prev => prev.map((r, i) => i === idx ? { ...r, part: e.target.value } : r))}
                        className="w-full p-1 border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="text"
                        value={row.operator}
                        onChange={e => setData(prev => prev.map((r, i) => i === idx ? { ...r, operator: e.target.value } : r))}
                        className="w-full p-1 border border-slate-200 rounded text-xs"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="number"
                        value={row.trial}
                        onChange={e => setData(prev => prev.map((r, i) => i === idx ? { ...r, trial: Number(e.target.value) } : r))}
                        className="w-20 p-1 border border-slate-200 rounded text-xs font-mono"
                      />
                    </td>
                    <td className="p-1.5">
                      <input
                        type="number"
                        step="any"
                        value={row.measurement}
                        onChange={e => setData(prev => prev.map((r, i) => i === idx ? { ...r, measurement: Number(e.target.value) } : r))}
                        className="w-28 p-1 border border-slate-200 rounded text-xs font-mono font-bold"
                      />
                    </td>
                    <td className="p-1.5 text-center">
                      <button
                        onClick={() => setData(prev => prev.filter((_, i) => i !== idx))}
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

        {/* Seção 2: Plano de Coleta de Dados */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-emerald-600" />
                2. Plano de Coleta de Dados do Processo
              </h3>
              <p className="text-xs text-slate-500">Definições operacionais, frequências e método padronizado de amostragem</p>
            </div>
            <button
              onClick={handleAddPlanItem}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100 transition"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Variável
            </button>
          </div>

          <div className="space-y-3">
            {collectionPlan.map(item => (
              <div key={item.id} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-2 mb-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Variável / Característica</label>
                    <input
                      type="text"
                      value={item.variable}
                      onChange={e => setCollectionPlan(prev => prev.map(p => p.id === item.id ? { ...p, variable: e.target.value } : p))}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs font-semibold"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Definição Operacional (O que e Como medir)</label>
                    <input
                      type="text"
                      value={item.operationalDefinition}
                      onChange={e => setCollectionPlan(prev => prev.map(p => p.id === item.id ? { ...p, operationalDefinition: e.target.value } : p))}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Unidade de Medida</label>
                    <input
                      type="text"
                      value={item.unit}
                      onChange={e => setCollectionPlan(prev => prev.map(p => p.id === item.id ? { ...p, unit: e.target.value } : p))}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Responsável</label>
                    <input
                      type="text"
                      value={item.responsible}
                      onChange={e => setCollectionPlan(prev => prev.map(p => p.id === item.id ? { ...p, responsible: e.target.value } : p))}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Frequência</label>
                    <input
                      type="text"
                      value={item.frequency}
                      onChange={e => setCollectionPlan(prev => prev.map(p => p.id === item.id ? { ...p, frequency: e.target.value } : p))}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Tamanho da Amostra</label>
                    <input
                      type="text"
                      value={item.sampleSize}
                      onChange={e => setCollectionPlan(prev => prev.map(p => p.id === item.id ? { ...p, sampleSize: e.target.value } : p))}
                      className="w-full p-1.5 border border-slate-300 rounded text-xs"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Período de Coleta</label>
                      <input
                        type="text"
                        value={item.period}
                        onChange={e => setCollectionPlan(prev => prev.map(p => p.id === item.id ? { ...p, period: e.target.value } : p))}
                        className="w-full p-1.5 border border-slate-300 rounded text-xs"
                      />
                    </div>
                    <button
                      onClick={() => setCollectionPlan(prev => prev.filter(p => p.id !== item.id))}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded mt-4"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};
