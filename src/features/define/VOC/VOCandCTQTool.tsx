import React, { useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import { VOCItem, CTQItem } from '../../../types/project';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2 } from 'lucide-react';

export const VOCandCTQTool: React.FC = () => {
  const { project, updateDefine } = useProject();
  const [vocList, setVocList] = useState<VOCItem[]>(project.define.voc);
  const [ctqList, setCtqList] = useState<CTQItem[]>(project.define.ctq);

  const handleAddVoc = () => {
    const newVoc: VOCItem = {
      id: Date.now().toString(),
      customerNeed: '',
      customerPain: '',
      importance: 'Alta'
    };
    setVocList(prev => [...prev, newVoc]);
  };

  const handleAddCtq = () => {
    const newCtq: CTQItem = {
      id: Date.now().toString(),
      need: '',
      driver: '',
      ctqRequirement: '',
      specification: ''
    };
    setCtqList(prev => [...prev, newCtq]);
  };

  const handleSave = () => {
    updateDefine({ voc: vocList, ctq: ctqList });
  };

  return (
    <ToolContainer
      title="Voice of Customer (VOC) & Desdobramento Árvore CTQ"
      subtitle="Transformação das necessidades qualitativas do cliente em requisitos críticos de qualidade mensuráveis"
      badge="DEFINE 2.3 & 2.4"
      onSave={handleSave}
    >
      <div className="space-y-8">
        {/* Seção 1: VOC */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">1. Voice of Customer (VOC)</h3>
              <p className="text-xs text-slate-500">Dores, reclamações e expectativas declaradas pelo cliente</p>
            </div>
            <button
              onClick={handleAddVoc}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar VOC
            </button>
          </div>

          <div className="space-y-2">
            {vocList.map(item => (
              <div key={item.id} className="grid grid-cols-1 md:grid-cols-7 gap-2 items-center bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Necessidade / Expectativa</label>
                  <input
                    type="text"
                    value={item.customerNeed}
                    onChange={e => setVocList(prev => prev.map(v => v.id === item.id ? { ...v, customerNeed: e.target.value } : v))}
                    placeholder="Ex: Entrega sem falhas dimensionais"
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded focus:outline-none"
                  />
                </div>
                <div className="md:col-span-3">
                  <label className="block text-[10px] font-bold text-slate-500 uppercase">Dor / Reclamação Atual</label>
                  <input
                    type="text"
                    value={item.customerPain}
                    onChange={e => setVocList(prev => prev.map(v => v.id === item.id ? { ...v, customerPain: e.target.value } : v))}
                    placeholder="Ex: Rebarbas geram paradas na montagem"
                    className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <div className="flex-1">
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Criticidade</label>
                    <select
                      value={item.importance}
                      onChange={e => setVocList(prev => prev.map(v => v.id === item.id ? { ...v, importance: e.target.value as any } : v))}
                      className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded focus:outline-none"
                    >
                      <option value="Alta">Alta</option>
                      <option value="Média">Média</option>
                      <option value="Baixa">Baixa</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setVocList(prev => prev.filter(v => v.id !== item.id))}
                    className="p-1 text-slate-400 hover:text-red-600 rounded transition mt-4"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Seção 2: Desdobramento Árvore CTQ */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900">2. Árvore CTQ (Critical-to-Quality Tree)</h3>
              <p className="text-xs text-slate-500">Desdobramento: Necessidade $\to$ Direcionador (Driver) $\to$ Requisito Mensurável $\to$ Especificação</p>
            </div>
            <button
              onClick={handleAddCtq}
              className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
            >
              <Plus className="w-3.5 h-3.5" />
              Adicionar Ramo CTQ
            </button>
          </div>

          <div className="space-y-3">
            {ctqList.map(item => (
              <div key={item.id} className="p-3 bg-white border border-slate-300 rounded-lg shadow-sm">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">1. Necessidade do Cliente</span>
                    <input
                      type="text"
                      value={item.need}
                      onChange={e => setCtqList(prev => prev.map(c => c.id === item.id ? { ...c, need: e.target.value } : c))}
                      placeholder="Ex: Peça perfeita"
                      className="w-full text-xs p-1 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  <div className="bg-slate-50 p-2 rounded border border-slate-200">
                    <span className="text-[10px] font-bold uppercase text-slate-500 block mb-1">2. Direcionador de Qualidade</span>
                    <input
                      type="text"
                      value={item.driver}
                      onChange={e => setCtqList(prev => prev.map(c => c.id === item.id ? { ...c, driver: e.target.value } : c))}
                      placeholder="Ex: Acabamento sem rebarba"
                      className="w-full text-xs p-1 bg-white border border-slate-300 rounded"
                    />
                  </div>

                  <div className="bg-blue-50/60 p-2 rounded border border-blue-200">
                    <span className="text-[10px] font-bold uppercase text-blue-800 block mb-1">3. Requisito CTQ (Métrica Y)</span>
                    <input
                      type="text"
                      value={item.ctqRequirement}
                      onChange={e => setCtqList(prev => prev.map(c => c.id === item.id ? { ...c, ctqRequirement: e.target.value } : c))}
                      placeholder="Ex: Altura da rebarba"
                      className="w-full text-xs font-semibold p-1 bg-white border border-blue-300 rounded text-blue-900"
                    />
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="flex-1 bg-emerald-50/60 p-2 rounded border border-emerald-200">
                      <span className="text-[10px] font-bold uppercase text-emerald-800 block mb-1">4. Especificação (LSL / USL)</span>
                      <input
                        type="text"
                        value={item.specification}
                        onChange={e => setCtqList(prev => prev.map(c => c.id === item.id ? { ...c, specification: e.target.value } : c))}
                        placeholder="Ex: < 0.05 mm"
                        className="w-full text-xs font-semibold p-1 bg-white border border-emerald-300 rounded text-emerald-900"
                      />
                    </div>
                    <button
                      onClick={() => setCtqList(prev => prev.filter(c => c.id !== item.id))}
                      className="p-1.5 text-slate-400 hover:text-red-600 rounded transition"
                      title="Excluir ramo"
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
