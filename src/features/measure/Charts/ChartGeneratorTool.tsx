import React, { useState, useMemo } from 'react';
import { Dataset } from '../../../types/measure';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { BarChart, PieChart, Activity } from 'lucide-react';

interface ChartGeneratorProps {
  dataset: Dataset;
}

export const ChartGeneratorTool: React.FC<ChartGeneratorProps> = ({ dataset }) => {
  const [chartType, setChartType] = useState<'pareto' | 'histogram' | 'trend'>('pareto');
  
  const categoricalCols = useMemo(() => dataset.columns.filter(c => c.type === 'categorical'), [dataset.columns]);
  const numericCols = useMemo(() => dataset.columns.filter(c => c.type === 'numeric'), [dataset.columns]);

  const [selectedCatCol, setSelectedCatCol] = useState(categoricalCols[0]?.key || dataset.columns[0]?.key || '');
  const [selectedNumCol, setSelectedNumCol] = useState(numericCols[0]?.key || '');

  // 1. Dados para o Diagrama de Pareto
  const paretoData = useMemo(() => {
    if (!selectedCatCol) return [];
    const counts: { [key: string]: number } = {};
    dataset.rows.forEach(r => {
      const val = String(r[selectedCatCol] || 'Não Identificado');
      counts[val] = (counts[val] || 0) + 1;
    });

    const sorted = Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count);

    const total = sorted.reduce((sum, item) => sum + item.count, 0);
    let accum = 0;

    return sorted.map(item => {
      accum += item.count;
      const percentage = (item.count / total) * 100;
      const cumulativePercentage = (accum / total) * 100;
      return {
        ...item,
        percentage: Number(percentage.toFixed(1)),
        cumulativePercentage: Number(cumulativePercentage.toFixed(1))
      };
    });
  }, [dataset.rows, selectedCatCol]);

  // 2. Dados para o Histograma (Agrupamento por Classes)
  const histogramData = useMemo(() => {
    if (!selectedNumCol) return [];
    const nums = dataset.rows
      .map(r => Number(r[selectedNumCol]))
      .filter(n => !isNaN(n));
    if (nums.length === 0) return [];

    const min = Math.min(...nums);
    const max = Math.max(...nums);
    const binCount = Math.min(10, Math.ceil(Math.sqrt(nums.length)));
    const binWidth = (max - min) / (binCount || 1);

    const bins = Array.from({ length: binCount }, (_, i) => {
      const start = min + i * binWidth;
      const end = start + binWidth;
      return {
        label: `${start.toFixed(2)} - ${end.toFixed(2)}`,
        count: 0
      };
    });

    nums.forEach(n => {
      let idx = Math.floor((n - min) / (binWidth || 1));
      if (idx >= binCount) idx = binCount - 1;
      if (idx < 0) idx = 0;
      bins[idx].count++;
    });

    return bins;
  }, [dataset.rows, selectedNumCol]);

  return (
    <ToolContainer
      title="Gerador de Gráficos Analíticos (Pareto, Histograma & Linhas)"
      subtitle="Visualização interativa das variáveis críticas, estratificação e identificação dos 'poucos vitais'"
      badge="MEASURE 2.3"
      actions={
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg">
          <button
            onClick={() => setChartType('pareto')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              chartType === 'pareto' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart className="w-3.5 h-3.5" />
            Diagrama de Pareto
          </button>
          <button
            onClick={() => setChartType('histogram')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              chartType === 'histogram' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <PieChart className="w-3.5 h-3.5" />
            Histograma
          </button>
          <button
            onClick={() => setChartType('trend')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold transition ${
              chartType === 'trend' ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            Gráfico de Linha / Série
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {/* Renderização do Diagrama de Pareto */}
        {chartType === 'pareto' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Princípio 80/20 de Pareto</h4>
                <p className="text-xs text-slate-500">Priorização dos modos de falha, tipos de defeitos ou categorias</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Agrupar por:</span>
                <select
                  value={selectedCatCol}
                  onChange={e => setSelectedCatCol(e.target.value)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold text-xs"
                >
                  {dataset.columns.map(c => (
                    <option key={c.key} value={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {paretoData.length > 0 ? (
              <div className="space-y-3">
                {paretoData.map((item, idx) => (
                  <div key={idx} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center text-xs mb-1">
                      <span className="font-bold text-slate-800">{item.name}</span>
                      <span className="font-mono text-slate-500">
                        {item.count} ocorrências ({item.percentage}%) • Acumulado: <strong className="text-blue-700">{item.cumulativePercentage}%</strong>
                      </span>
                    </div>
                    {/* Barra de Frequência + Linha de Pareto */}
                    <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden relative">
                      <div
                        className="bg-blue-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-lg">Sem dados para estratificar o Pareto.</div>
            )}
          </div>
        )}

        {/* Renderização do Histograma */}
        {chartType === 'histogram' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Histograma de Frequências</h4>
                <p className="text-xs text-slate-500">Distribuição empírica em classes de valores</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Variável Contínua:</span>
                <select
                  value={selectedNumCol}
                  onChange={e => setSelectedNumCol(e.target.value)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold text-xs"
                >
                  {numericCols.map(c => (
                    <option key={c.key} value={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {histogramData.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                {histogramData.map((bin, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-center">
                    <div className="text-[10px] text-slate-500 font-mono mb-2 truncate" title={bin.label}>
                      {bin.label}
                    </div>
                    <div className="h-28 flex items-end justify-center">
                      <div
                        className="w-full bg-emerald-600 rounded-t transition-all duration-500"
                        style={{
                          height: `${Math.max(12, (bin.count / Math.max(...histogramData.map(b => b.count || 1))) * 100)}%`
                        }}
                      />
                    </div>
                    <div className="text-xs font-bold text-slate-800 mt-2 font-mono">
                      n = {bin.count}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-lg">Sem dados numéricos suficientes para histograma.</div>
            )}
          </div>
        )}

        {/* Gráfico de Linha / Série Temporal */}
        {chartType === 'trend' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Sequência Temporal de Medições</h4>
                <p className="text-xs text-slate-500">Observação da estabilidade das medições ao longo da coleta</p>
              </div>
              <div className="flex items-center gap-2 text-xs">
                <span className="text-slate-500">Variável:</span>
                <select
                  value={selectedNumCol}
                  onChange={e => setSelectedNumCol(e.target.value)}
                  className="px-2 py-1 bg-white border border-slate-300 rounded font-semibold text-xs"
                >
                  {numericCols.map(c => (
                    <option key={c.key} value={c.key}>{c.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-lg">
              <div className="h-44 flex items-end gap-1.5 overflow-x-auto pb-2">
                {dataset.rows.map((r, idx) => {
                  const val = Number(r[selectedNumCol]);
                  const nums = dataset.rows.map(x => Number(x[selectedNumCol])).filter(n => !isNaN(n));
                  const min = Math.min(...nums);
                  const max = Math.max(...nums);
                  const heightPercent = max > min ? ((val - min) / (max - min)) * 90 + 10 : 50;

                  return (
                    <div key={idx} className="flex flex-col items-center flex-shrink-0 w-6 group relative">
                      <div
                        className="w-3 bg-purple-600 rounded-t hover:bg-purple-700 transition-all cursor-pointer"
                        style={{ height: `${heightPercent}%` }}
                      />
                      <div className="text-[9px] text-slate-400 font-mono mt-1">{idx + 1}</div>
                      <div className="absolute -top-7 hidden group-hover:block bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded shadow z-20 whitespace-nowrap">
                        {val}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </ToolContainer>
  );
};
