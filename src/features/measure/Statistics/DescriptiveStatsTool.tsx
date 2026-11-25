import React, { useState, useMemo } from 'react';
import { Dataset } from '../../../types/measure';
import { calculateDescriptiveStats, calculateProcessCapability } from '../../../utils/statistics';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Calculator, AlertCircle, BarChart3, TrendingUp } from 'lucide-react';

interface StatsToolProps {
  dataset: Dataset;
}

export const DescriptiveStatsTool: React.FC<StatsToolProps> = ({ dataset }) => {
  const numericCols = useMemo(() => dataset.columns.filter(c => c.type === 'numeric'), [dataset.columns]);
  const [selectedCol, setSelectedCol] = useState<string>(numericCols[0]?.key || '');
  
  // Limites de Especificação para estudo de capacidade
  const [lsl, setLsl] = useState<string>('9.5');
  const [usl, setUsl] = useState<string>('10.5');
  const [target, setTarget] = useState<string>('10.0');

  // Extrai array de números da coluna selecionada
  const numericData = useMemo(() => {
    if (!selectedCol) return [];
    return dataset.rows
      .map(r => Number(r[selectedCol]))
      .filter(n => !isNaN(n));
  }, [dataset.rows, selectedCol]);

  const stats = useMemo(() => calculateDescriptiveStats(numericData), [numericData]);
  
  const capability = useMemo(() => {
    const parsedLsl = lsl !== '' ? parseFloat(lsl) : undefined;
    const parsedUsl = usl !== '' ? parseFloat(usl) : undefined;
    const parsedTarget = target !== '' ? parseFloat(target) : undefined;
    return calculateProcessCapability(numericData, parsedLsl, parsedUsl, parsedTarget);
  }, [numericData, lsl, usl, target]);

  return (
    <ToolContainer
      title="Estatística Descritiva & Estudo de Capacidade (Cp, Cpk)"
      subtitle="Cálculo matemático determinístico de dispersão, tendência central e adequação a especificações"
      badge="MEASURE 2.2 & 2.4"
    >
      <div className="space-y-6">
        {/* Seletor de Variável */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200 rounded-lg">
          <div className="flex items-center gap-3">
            <Calculator className="w-5 h-5 text-blue-600" />
            <div>
              <label className="block text-xs font-bold text-slate-800">Selecione a Variável Contínua / Numérica</label>
              <span className="text-[11px] text-slate-500">Apenas colunas identificadas com valores matemáticos</span>
            </div>
          </div>
          <select
            value={selectedCol}
            onChange={e => setSelectedCol(e.target.value)}
            className="text-xs font-semibold px-3 py-2 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {numericCols.map(c => (
              <option key={c.key} value={c.key}>{c.name}</option>
            ))}
          </select>
        </div>

        {stats ? (
          <>
            {/* Grid de Estatística Descritiva */}
            <div>
              <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-slate-600" /> Resumo Numérico Amostral (n = {stats.count})
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Média</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">{stats.mean}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Mediana</span>
                  <div className="text-lg font-black text-slate-900 mt-0.5">{stats.median}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Desvio Padrão (s)</span>
                  <div className="text-lg font-black text-blue-700 mt-0.5">{stats.stdDev}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Variância (s²)</span>
                  <div className="text-lg font-black text-slate-800 mt-0.5">{stats.variance}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Mínimo / Máximo</span>
                  <div className="text-sm font-bold text-slate-800 mt-1">{stats.min} ... {stats.max}</div>
                </div>
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Amplitude (Range)</span>
                  <div className="text-lg font-black text-slate-800 mt-0.5">{stats.range}</div>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs">
                  <span className="text-slate-500">1º Quartil (Q1):</span> <strong className="text-slate-900">{stats.q1}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs">
                  <span className="text-slate-500">3º Quartil (Q3):</span> <strong className="text-slate-900">{stats.q3}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs">
                  <span className="text-slate-500">Assimetria (Skewness):</span> <strong className="text-slate-900">{stats.skewness}</strong>
                </div>
                <div className="p-2.5 bg-slate-50 border border-slate-200 rounded text-xs">
                  <span className="text-slate-500">Curtose Amostral:</span> <strong className="text-slate-900">{stats.kurtosis}</strong>
                </div>
              </div>
            </div>

            {/* Painel de Capabilidade do Processo (Cp / Cpk) */}
            <div className="p-5 border border-slate-300 rounded-xl bg-white shadow-sm space-y-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-3">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <TrendingUp className="w-4 h-4 text-emerald-600" /> Análise de Capabilidade do Processo
                  </h4>
                  <p className="text-xs text-slate-500">Distinção mandatória entre Limites de Especificação do Cliente e Variação Natural do Processo</p>
                </div>

                {/* Configuração de Limites LSL / USL */}
                <div className="flex items-center gap-2 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">LSL (Inferior)</label>
                    <input
                      type="number"
                      step="any"
                      value={lsl}
                      onChange={e => setLsl(e.target.value)}
                      className="w-20 px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Target (Meta)</label>
                    <input
                      type="number"
                      step="any"
                      value={target}
                      onChange={e => setTarget(e.target.value)}
                      className="w-20 px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">USL (Superior)</label>
                    <input
                      type="number"
                      step="any"
                      value={usl}
                      onChange={e => setUsl(e.target.value)}
                      className="w-20 px-2 py-1 border border-slate-300 rounded text-xs font-mono"
                    />
                  </div>
                </div>
              </div>

              {capability.warning && (
                <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-xs text-amber-900 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                  {capability.warning}
                </div>
              )}

              {/* Indicadores de Capabilidade */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
                  <span className="text-xs font-bold text-blue-900 uppercase">Índice Cp (Capacidade Potencial)</span>
                  <div className="text-2xl font-black text-blue-950 mt-1">
                    {capability.cp !== null ? capability.cp : '—'}
                  </div>
                  <div className="text-[11px] text-blue-700 mt-1">
                    {capability.cp !== null && capability.cp >= 1.33 ? 'Processo Capaz (>= 1.33)' : 'Necessita Estreitamento da Variação'}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
                  <span className="text-xs font-bold text-emerald-900 uppercase">Índice Cpk (Capacidade Real)</span>
                  <div className="text-2xl font-black text-emerald-950 mt-1">
                    {capability.cpk !== null ? capability.cpk : '—'}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-1">
                    {capability.cpk !== null && capability.cpk >= 1.33 ? 'Centrado e Conforme' : 'Processo Deslocado ou Disperso'}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
                  <span className="text-xs font-bold text-slate-600 uppercase">CPU / CPL</span>
                  <div className="text-sm font-mono font-bold text-slate-800 mt-2">
                    CPU: {capability.cpu ?? '—'} <br />
                    CPL: {capability.cpl ?? '—'}
                  </div>
                </div>

                <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/50">
                  <span className="text-xs font-bold text-purple-900 uppercase">Nível Sigma Equivalente</span>
                  <div className="text-2xl font-black text-purple-950 mt-1">
                    {capability.sigmaLevel ? `${capability.sigmaLevel} σ` : '—'}
                  </div>
                  <div className="text-[11px] text-purple-700 mt-1">Aproximação em curto prazo</div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="p-8 text-center text-slate-400 bg-slate-50 rounded-lg border border-dashed border-slate-300">
            Nenhum dado numérico válido selecionado para cálculo estatístico.
          </div>
        )}
      </div>
    </ToolContainer>
  );
};
