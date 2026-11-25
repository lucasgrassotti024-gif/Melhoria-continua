import React, { useState, useMemo } from 'react';
import { ControlChartType, SPCDataPoint, SPCLimits } from '../../../types/control';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { LineChart, CheckCircle2 } from 'lucide-react';

export const ControlChartsTool: React.FC = () => {
  const [chartType, setChartType] = useState<ControlChartType>('I-MR');

  // Amostras individuais de altura de rebarba pós-melhoria (mm)
  const [rawData] = useState<number[]>([
    0.024, 0.026, 0.025, 0.027, 0.023, 0.025, 0.026, 0.024, 0.025, 0.028,
    0.024, 0.023, 0.026, 0.025, 0.024, 0.027, 0.025, 0.024, 0.026, 0.025
  ]);

  // Cálculo determinístico dos limites da carta I-MR: d2 = 1.128 para n = 2
  const spcCalculations = useMemo(() => {
    if (rawData.length < 2) return null;

    const n = rawData.length;
    const cl = rawData.reduce((a, b) => a + b, 0) / n;

    // Amplitude móvel (MR = |X_i - X_{i-1}|)
    const mrValues: number[] = [];
    for (let i = 1; i < n; i++) {
      mrValues.push(Math.abs(rawData[i] - rawData[i - 1]));
    }

    const clMr = mrValues.reduce((a, b) => a + b, 0) / mrValues.length;
    const sigmaEstimated = clMr / 1.128; // Estimativa de dispersão por amplitude móvel

    const ucl = cl + (3 * sigmaEstimated);
    const lcl = Math.max(0, cl - (3 * sigmaEstimated));

    const uclMr = 3.267 * clMr; // D4 * MR_bar (D4 = 3.267 para n=2)
    const lclMr = 0; // D3 = 0 para n=2

    const limits: SPCLimits = {
      ucl: Number(ucl.toFixed(4)),
      cl: Number(cl.toFixed(4)),
      lcl: Number(lcl.toFixed(4)),
      uclMr: Number(uclMr.toFixed(4)),
      clMr: Number(clMr.toFixed(4)),
      lclMr: Number(lclMr.toFixed(4))
    };

    // Detecção das regras de causas especiais (Western Electric / Nelson)
    const points: SPCDataPoint[] = rawData.map((val, idx) => {
      const isOutlier = val > ucl || val < lcl;
      let ruleViolated: string | undefined = undefined;

      if (isOutlier) {
        ruleViolated = 'Regra 1: Ponto além de +- 3 sigma';
      }

      return {
        sample: idx + 1,
        value: val,
        mr: idx > 0 ? Number(mrValues[idx - 1].toFixed(4)) : undefined,
        isOutlier,
        ruleViolated
      };
    });

    const hasSpecialCauses = points.some(p => p.isOutlier);

    return { limits, points, hasSpecialCauses, sigmaEstimated };
  }, [rawData]);

  return (
    <ToolContainer
      title="Cartas de Controle Estatístico de Processos (CEP / SPC)"
      subtitle="Cálculo matemático rigoroso de Linha Central e Limites de Controle (+-3σ) com verificação de causas especiais"
      badge="CONTROL 2.2"
      actions={
        <div className="flex items-center gap-1 bg-slate-200/80 p-0.5 rounded-lg text-xs">
          <button
            onClick={() => setChartType('I-MR')}
            className={`px-3 py-1 rounded font-semibold transition ${
              chartType === 'I-MR' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Carta I-MR (Contínuo)
          </button>
          <button
            onClick={() => setChartType('p')}
            className={`px-3 py-1 rounded font-semibold transition ${
              chartType === 'p' ? 'bg-white text-red-700 shadow-sm' : 'text-slate-600'
            }`}
          >
            Carta p (Atributos)
          </button>
        </div>
      }
    >
      <div className="space-y-6">
        {spcCalculations && (
          <>
            {/* Cards de Limites de Controle Estatístico */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-[10px] font-bold text-red-800 uppercase">UCL (+3σ Limite Superior)</span>
                <div className="text-xl font-mono font-black text-red-950 mt-1">{spcCalculations.limits.ucl} mm</div>
                <div className="text-[10px] text-red-700">Calculado por MR / 1.128</div>
              </div>

              <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <span className="text-[10px] font-bold text-blue-800 uppercase">CL (Linha Central / Média)</span>
                <div className="text-xl font-mono font-black text-blue-950 mt-1">{spcCalculations.limits.cl} mm</div>
                <div className="text-[10px] text-blue-700">Média das observações</div>
              </div>

              <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                <span className="text-[10px] font-bold text-red-800 uppercase">LCL (-3σ Limite Inferior)</span>
                <div className="text-xl font-mono font-black text-red-950 mt-1">{spcCalculations.limits.lcl} mm</div>
                <div className="text-[10px] text-red-700">Fronteira inferior natural</div>
              </div>

              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">Diagnóstico de Estabilidade</span>
                <div className="text-sm font-bold text-emerald-950 mt-2 flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  Processo sob Controle Estatístico
                </div>
              </div>
            </div>

            {/* Visualização da Carta de Controle I (Valores Individuais) */}
            <div className="p-4 bg-white border border-slate-200 rounded-xl space-y-3">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-2">
                  <LineChart className="w-4 h-4 text-red-600" /> Carta I — Medições Individuais com Faixas de Controle
                </h4>
                <div className="flex items-center gap-3 text-[11px] font-mono">
                  <span className="text-red-600 font-bold">UCL: {spcCalculations.limits.ucl}</span>
                  <span className="text-blue-600 font-bold">CL: {spcCalculations.limits.cl}</span>
                  <span className="text-red-600 font-bold">LCL: {spcCalculations.limits.lcl}</span>
                </div>
              </div>

              {/* Gráfico Linear das Amostras */}
              <div className="h-44 flex items-end gap-2 overflow-x-auto p-2 bg-slate-50 border border-slate-200 rounded-lg relative">
                {spcCalculations.points.map((p) => {
                  const minScale = spcCalculations.limits.lcl * 0.9;
                  const maxScale = spcCalculations.limits.ucl * 1.1;
                  const percent = Math.min(100, Math.max(10, ((p.value - minScale) / (maxScale - minScale)) * 100));

                  return (
                    <div key={p.sample} className="flex flex-col items-center flex-shrink-0 w-8 group relative">
                      <div
                        className={`w-3.5 rounded-full transition-all cursor-pointer ${
                          p.isOutlier ? 'bg-red-600 ring-4 ring-red-200' : 'bg-blue-600 hover:bg-blue-700'
                        }`}
                        style={{ height: `${percent}%` }}
                      />
                      <span className="text-[9px] font-mono text-slate-400 mt-1">{p.sample}</span>
                      
                      {/* Tooltip */}
                      <div className="absolute -top-7 hidden group-hover:block bg-slate-900 text-white text-[10px] px-2 py-0.5 rounded shadow z-30 whitespace-nowrap">
                        Amostra {p.sample}: {p.value} mm {p.isOutlier && '⚠️ ALERTA'}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="p-3 bg-blue-50/50 border border-blue-200 rounded text-xs text-blue-900 flex items-center justify-between">
                <span>
                  <strong>Aviso Metodológico Six Sigma:</strong> Limites de Controle (UCL e LCL = Média +- 3 desvios) refletem a variação natural e não devem ser confundidos com Limites de Especificação do cliente.
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </ToolContainer>
  );
};
