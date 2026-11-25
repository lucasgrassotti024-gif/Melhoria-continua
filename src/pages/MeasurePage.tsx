import React, { useState } from 'react';
import { Dataset } from '../types/measure';
import { DataIngestionTool } from '../features/measure/DataIngestion/DataIngestionTool';
import { DescriptiveStatsTool } from '../features/measure/Statistics/DescriptiveStatsTool';
import { ChartGeneratorTool } from '../features/measure/Charts/ChartGeneratorTool';
import { MSAGageRRTool } from '../features/measure/MSA/MSAGageRRTool';
import { Table, BarChart2, PieChart, Microscope } from 'lucide-react';

const initialDataset: Dataset = {
  id: 'ds-01',
  name: 'Medições de Linha de Estampagem',
  createdAt: new Date().toISOString(),
  columns: [
    { key: 'amostra', name: 'Nº Amostra', type: 'numeric' },
    { key: 'espessura', name: 'Espessura (mm)', type: 'numeric' },
    { key: 'rebarba', name: 'Altura Rebarba (mm)', type: 'numeric' },
    { key: 'defeito', name: 'Tipo de Defeito', type: 'categorical' },
    { key: 'turno', name: 'Turno', type: 'categorical' }
  ],
  rows: [
    { amostra: 1, espessura: 9.98, rebarba: 0.042, defeito: 'Rebarba Excessiva', turno: 'Turno A' },
    { amostra: 2, espessura: 10.02, rebarba: 0.038, defeito: 'Rebarba Excessiva', turno: 'Turno A' },
    { amostra: 3, espessura: 10.05, rebarba: 0.045, defeito: 'Trinca Superficial', turno: 'Turno B' },
    { amostra: 4, espessura: 9.94, rebarba: 0.051, defeito: 'Rebarba Excessiva', turno: 'Turno A' },
    { amostra: 5, espessura: 10.01, rebarba: 0.039, defeito: 'Amassamento', turno: 'Turno B' },
    { amostra: 6, espessura: 10.08, rebarba: 0.048, defeito: 'Rebarba Excessiva', turno: 'Turno A' },
    { amostra: 7, espessura: 9.97, rebarba: 0.041, defeito: 'Dimensional Fora', turno: 'Turno A' },
    { amostra: 8, espessura: 10.03, rebarba: 0.043, defeito: 'Rebarba Excessiva', turno: 'Turno B' },
    { amostra: 9, espessura: 10.00, rebarba: 0.037, defeito: 'Trinca Superficial', turno: 'Turno A' },
    { amostra: 10, espessura: 10.06, rebarba: 0.046, defeito: 'Rebarba Excessiva', turno: 'Turno B' },
    { amostra: 11, espessura: 9.95, rebarba: 0.044, defeito: 'Rebarba Excessiva', turno: 'Turno A' },
    { amostra: 12, espessura: 10.02, rebarba: 0.040, defeito: 'Amassamento', turno: 'Turno A' },
    { amostra: 13, espessura: 10.04, rebarba: 0.049, defeito: 'Rebarba Excessiva', turno: 'Turno B' },
    { amostra: 14, espessura: 9.99, rebarba: 0.038, defeito: 'Rebarba Excessiva', turno: 'Turno A' },
    { amostra: 15, espessura: 10.03, rebarba: 0.042, defeito: 'Outros', turno: 'Turno B' }
  ]
};

export const MeasurePage: React.FC = () => {
  const [dataset, setDataset] = useState<Dataset>(() => {
    const saved = localStorage.getItem('lss_measure_dataset');
    if (saved) {
      try { return JSON.parse(saved); } catch { return initialDataset; }
    }
    return initialDataset;
  });

  const [activeTab, setActiveTab] = useState<'grid' | 'stats' | 'charts' | 'msa'>('grid');

  const handleUpdateDataset = (updated: Dataset) => {
    setDataset(updated);
    localStorage.setItem('lss_measure_dataset', JSON.stringify(updated));
  };

  return (
    <div className="space-y-6">
      {/* Abas Internas da Fase MEASURE */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('grid')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'grid'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Table className="w-4 h-4" />
          Ingestão & Tabela de Dados
        </button>

        <button
          onClick={() => setActiveTab('stats')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'stats'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BarChart2 className="w-4 h-4" />
          Estatística Descritiva & Cp/Cpk
        </button>

        <button
          onClick={() => setActiveTab('charts')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'charts'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <PieChart className="w-4 h-4" />
          Gerador Gráfico (Pareto & Histogramas)
        </button>

        <button
          onClick={() => setActiveTab('msa')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'msa'
              ? 'border-emerald-600 text-emerald-800 bg-emerald-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Microscope className="w-4 h-4" />
          MSA (Gage R&R) & Plano de Coleta
        </button>
      </div>

      {/* Conteúdo Dinâmico */}
      {activeTab === 'grid' && (
        <DataIngestionTool dataset={dataset} onUpdateDataset={handleUpdateDataset} />
      )}
      {activeTab === 'stats' && (
        <DescriptiveStatsTool dataset={dataset} />
      )}
      {activeTab === 'charts' && (
        <ChartGeneratorTool dataset={dataset} />
      )}
      {activeTab === 'msa' && (
        <MSAGageRRTool />
      )}
    </div>
  );
};
