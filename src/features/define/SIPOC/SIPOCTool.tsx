import React, { useState } from 'react';
import { useProject } from '../../../context/ProjectContext';
import { SIPOCItem } from '../../../types/project';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2 } from 'lucide-react';

export const SIPOCTool: React.FC = () => {
  const { project, updateDefine } = useProject();
  const [items, setItems] = useState<SIPOCItem[]>(project.define.sipoc);

  const handleAddItem = () => {
    const newItem: SIPOCItem = {
      id: Date.now().toString(),
      supplier: '',
      input: '',
      process: '',
      output: '',
      customer: ''
    };
    setItems(prev => [...prev, newItem]);
  };

  const handleRemoveItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id));
  };

  const handleUpdate = (id: string, field: keyof SIPOCItem, value: string) => {
    setItems(prev => prev.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const handleSave = () => {
    updateDefine({ sipoc: items });
  };

  return (
    <ToolContainer
      title="SIPOC (Suppliers, Inputs, Process, Outputs, Customers)"
      subtitle="Mapeamento de alto nível das fronteiras, entradas críticas e clientes do processo em escopo"
      badge="DEFINE 2.2"
      onSave={handleSave}
      actions={
        <button
          onClick={handleAddItem}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
        >
          <Plus className="w-3.5 h-3.5" />
          Adicionar Etapa
        </button>
      }
    >
      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Cabeçalho Visual SIPOC */}
          <div className="grid grid-cols-5 gap-2 mb-3 text-center">
            <div className="bg-slate-800 text-white p-2.5 rounded-lg font-bold text-xs tracking-wider">
              S — SUPPLIERS
              <div className="text-[10px] font-normal text-slate-300">Fornecedores</div>
            </div>
            <div className="bg-slate-700 text-white p-2.5 rounded-lg font-bold text-xs tracking-wider">
              I — INPUTS
              <div className="text-[10px] font-normal text-slate-300">Entradas / Insumos</div>
            </div>
            <div className="bg-blue-700 text-white p-2.5 rounded-lg font-bold text-xs tracking-wider ring-2 ring-blue-400">
              P — PROCESS
              <div className="text-[10px] font-normal text-blue-200">Etapas do Processo</div>
            </div>
            <div className="bg-slate-700 text-white p-2.5 rounded-lg font-bold text-xs tracking-wider">
              O — OUTPUTS
              <div className="text-[10px] font-normal text-slate-300">Saídas / Produtos</div>
            </div>
            <div className="bg-slate-800 text-white p-2.5 rounded-lg font-bold text-xs tracking-wider">
              C — CUSTOMERS
              <div className="text-[10px] font-normal text-slate-300">Clientes / Destino</div>
            </div>
          </div>

          {/* Linhas de Elementos SIPOC */}
          <div className="space-y-2">
            {items.map((item, index) => (
              <div key={item.id} className="grid grid-cols-5 gap-2 items-center bg-slate-50 p-2 rounded-lg border border-slate-200 hover:border-slate-300 transition">
                <div>
                  <textarea
                    rows={2}
                    value={item.supplier}
                    onChange={e => handleUpdate(item.id, 'supplier', e.target.value)}
                    placeholder="Ex: Fornecedor de Matéria-Prima"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    value={item.input}
                    onChange={e => handleUpdate(item.id, 'input', e.target.value)}
                    placeholder="Ex: Especificação, Chapas"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="relative">
                  <textarea
                    rows={2}
                    value={item.process}
                    onChange={e => handleUpdate(item.id, 'process', e.target.value)}
                    placeholder={`Etapa ${index + 1}: Ex: Prensagem`}
                    className="w-full text-xs font-semibold p-2 bg-blue-50/50 border border-blue-200 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none text-blue-950"
                  />
                </div>
                <div>
                  <textarea
                    rows={2}
                    value={item.output}
                    onChange={e => handleUpdate(item.id, 'output', e.target.value)}
                    placeholder="Ex: Peça conformada"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div className="flex items-center gap-1">
                  <textarea
                    rows={2}
                    value={item.customer}
                    onChange={e => handleUpdate(item.id, 'customer', e.target.value)}
                    placeholder="Ex: Linha de Solda"
                    className="w-full text-xs p-2 bg-white border border-slate-200 rounded focus:ring-1 focus:ring-blue-500 focus:outline-none"
                  />
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="p-1.5 text-slate-400 hover:text-red-600 rounded transition"
                    title="Excluir linha"
                  >
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
