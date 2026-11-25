import React, { useState } from 'react';
import { PilotTest, ScenarioSimulation } from '../../../types/improve';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2, CheckCircle2, Sliders, PlayCircle } from 'lucide-react';

export const PilotAndScenarioTool: React.FC = () => {
  // 1. Testes Piloto
  const [pilots, setPilots] = useState<PilotTest[]>([
    {
      id: '1',
      solution: 'Gabarito Poka-Yoke de Folga da Matriz',
      objective: 'Verificar se o ajuste manual reduz a dispersão dimensional de rebarba',
      hypothesis: 'Ajuste com gabarito manterá a altura de rebarba abaixo de 0.04mm por 10.000 golpes',
      period: '10/05/2026 a 17/05/2026 (1 semana)',
      sampleBaseline: 6.4, // 6.4% de refugo antes
      samplePilot: 1.2, // 1.2% de refugo durante o teste piloto
      metricUnit: '% Refugo',
      conclusion: 'Hipótese confirmada. Redução de 81% no refugo sem paradas na linha de solda.',
      approvedForRollout: true
    }
  ]);

  // 2. Simulador de Cenários
  const [simulation, setSimulation] = useState<ScenarioSimulation>({
    metricName: 'Taxa de Peças com Rebarba Excessiva',
    currentValue: 6.4, // %
    projectedReductionPercent: 70, // Redução de 70%
    projectedValue: 1.92,
    monthlyUnitLoss: 45.0, // R$ 45 por peça refugada
    volumePerMonth: 12000, // 12.000 peças/mês
    projectedMonthlySavings: 24192 // Calculado dinamicamente
  });

  const handleUpdateReduction = (reductionPercent: number) => {
    const projectedVal = simulation.currentValue * (1 - reductionPercent / 100);
    const defectPiecesBefore = (simulation.currentValue / 100) * simulation.volumePerMonth;
    const defectPiecesAfter = (projectedVal / 100) * simulation.volumePerMonth;
    const piecesSaved = defectPiecesBefore - defectPiecesAfter;
    const savings = piecesSaved * simulation.monthlyUnitLoss;

    setSimulation({
      ...simulation,
      projectedReductionPercent: reductionPercent,
      projectedValue: Number(projectedVal.toFixed(2)),
      projectedMonthlySavings: Number(savings.toFixed(2))
    });
  };

  const handleAddPilot = () => {
    const newPilot: PilotTest = {
      id: Date.now().toString(),
      solution: '',
      objective: '',
      hypothesis: '',
      period: '',
      sampleBaseline: 0,
      samplePilot: 0,
      metricUnit: '%',
      conclusion: '',
      approvedForRollout: false
    };
    setPilots(prev => [...prev, newPilot]);
  };

  return (
    <ToolContainer
      title="Testes Piloto & Simulador de Cenários de Melhoria"
      subtitle="Validação em pequena escala antes do rollout e simulações com identificação estrita de [PROJEÇÃO]"
      badge="IMPROVE 2.5 & 2.6"
    >
      <div className="space-y-10">
        {/* Seção 1: Simulador de Cenários */}
        <div className="p-5 border-2 border-purple-200 bg-purple-50/30 rounded-xl space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-purple-200 pb-3">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-purple-700 bg-purple-100 px-2 py-0.5 rounded">
                SIMULADOR MATEMÁTICO [PROJEÇÃO ESTIMADA]
              </span>
              <h4 className="text-sm font-bold text-slate-900 mt-1 flex items-center gap-2">
                <Sliders className="w-4 h-4 text-purple-600" /> Simulação de Impacto Operacional e Financeiro
              </h4>
            </div>
            <div className="text-xs text-purple-900 font-semibold">
              Volume Mensal: {simulation.volumePerMonth.toLocaleString()} peças • Custo Refugo: R$ {simulation.monthlyUnitLoss.toFixed(2)}/un
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-700">Sensibilidade de Redução do Defeito (%):</span>
              <span className="font-black text-purple-900 text-base">{simulation.projectedReductionPercent}% de melhoria</span>
            </div>
            <input
              type="range"
              min="10"
              max="95"
              step="5"
              value={simulation.projectedReductionPercent}
              onChange={e => handleUpdateReduction(Number(e.target.value))}
              className="w-full accent-purple-600 h-2 bg-purple-200 rounded-lg cursor-pointer"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-3 bg-white border border-purple-200 rounded-lg shadow-2xs">
              <span className="text-[10px] font-bold text-slate-500 uppercase">Linha de Base Atual</span>
              <div className="text-xl font-bold text-slate-800 mt-1">{simulation.currentValue}%</div>
              <div className="text-[11px] text-slate-400">768 peças refugadas/mês</div>
            </div>

            <div className="p-3 bg-white border border-emerald-300 rounded-lg shadow-2xs">
              <span className="text-[10px] font-bold text-emerald-800 uppercase">Cenário Projetado</span>
              <div className="text-xl font-black text-emerald-700 mt-1">{simulation.projectedValue}%</div>
              <div className="text-[11px] text-emerald-600">Queda de {simulation.projectedReductionPercent}% no defeito</div>
            </div>

            <div className="p-3 bg-white border border-purple-300 rounded-lg shadow-2xs">
              <span className="text-[10px] font-bold text-purple-800 uppercase">Economia Mensal Estimada</span>
              <div className="text-xl font-black text-purple-950 mt-1">
                R$ {simulation.projectedMonthlySavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </div>
              <div className="text-[11px] text-purple-700">R$ {(simulation.projectedMonthlySavings * 12).toLocaleString('pt-BR', { minimumFractionDigits: 2 })} / ano</div>
            </div>
          </div>
        </div>

        {/* Seção 2: Fichas de Testes Piloto */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-emerald-600" /> Registro de Testes Piloto (Experimentação Controlada)
              </h4>
              <p className="text-xs text-slate-500">Comprovação prática em lote experimental antes do rollout definitivo</p>
            </div>
            <button
              onClick={handleAddPilot}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-md hover:bg-emerald-100"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Teste Piloto
            </button>
          </div>

          <div className="space-y-4">
            {pilots.map(p => (
              <div key={p.id} className="p-4 bg-white border border-slate-200 rounded-xl shadow-xs space-y-3">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 uppercase">
                      Teste Piloto: {p.solution}
                    </span>
                    {p.approvedForRollout && (
                      <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Aprovado para Implementação Final
                      </span>
                    )}
                  </div>
                  <button onClick={() => setPilots(prev => prev.filter(x => x.id !== p.id))} className="text-slate-300 hover:text-red-600">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Hipótese / Expectativa</label>
                    <p className="text-slate-700 bg-slate-50 p-2 rounded border border-slate-200">{p.hypothesis}</p>
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-slate-500 uppercase">Conclusão / Evidência Observada</label>
                    <p className="text-emerald-900 bg-emerald-50/50 p-2 rounded border border-emerald-200 font-semibold">{p.conclusion}</p>
                  </div>
                </div>

                {/* Comparador de Métricas Antes vs Depois do Piloto */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-1">
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Linha de Base (Antes)</span>
                    <strong className="text-sm font-mono text-slate-800">{p.sampleBaseline} {p.metricUnit}</strong>
                  </div>
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded text-center">
                    <span className="text-[10px] text-emerald-700 block uppercase font-bold">Resultado Piloto</span>
                    <strong className="text-sm font-mono text-emerald-900 font-black">{p.samplePilot} {p.metricUnit}</strong>
                  </div>
                  <div className="p-2 bg-blue-50 border border-blue-200 rounded text-center">
                    <span className="text-[10px] text-blue-700 block uppercase">Variação Observada</span>
                    <strong className="text-sm font-mono text-blue-900">
                      -{Math.round(((p.sampleBaseline - p.samplePilot) / p.sampleBaseline) * 100)}%
                    </strong>
                  </div>
                  <div className="p-2 bg-slate-50 border border-slate-200 rounded text-center">
                    <span className="text-[10px] text-slate-500 block uppercase">Período de Teste</span>
                    <span className="text-xs font-semibold text-slate-700">{p.period}</span>
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
