import React, { useState, useMemo } from 'react';
import { FinancialEvaluation } from '../../../types/improve';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { DollarSign } from 'lucide-react';

export const FinancialEvaluationTool: React.FC = () => {
  // Entradas de custos e economias
  const [investment, setInvestment] = useState<number>(12050); // R$ Gabarito + Durômetro + Treinamento
  const [monthlySavings, setMonthlySavings] = useState<number>(24190); // R$ Economia refugo
  const [avoidedCosts, setAvoidedCosts] = useState<number>(5000); // R$ Horas extras evitadas na solda

  // Cálculo determinístico
  const metrics: FinancialEvaluation = useMemo(() => {
    const annual = (monthlySavings * 12) + avoidedCosts;
    const netReturnYear1 = annual - investment;
    const roi = investment > 0 ? (netReturnYear1 / investment) * 100 : 0;
    const payback = monthlySavings > 0 ? investment / monthlySavings : 0;

    return {
      initialInvestment: investment,
      monthlySavings,
      annualSavings: annual,
      avoidedCosts,
      roi: Number(roi.toFixed(1)),
      paybackMonths: Number(payback.toFixed(2))
    };
  }, [investment, monthlySavings, avoidedCosts]);

  return (
    <ToolContainer
      title="Avaliação Financeira Determinística (ROI, Payback & Ganhos Anuais)"
      subtitle="Memória de cálculo auditável de retorno do investimento e benefícios consolidados do projeto DMAIC"
      badge="IMPROVE 2.7"
    >
      <div className="space-y-6">
        {/* Painel de Indicadores Financeiros */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50 shadow-2xs">
            <span className="text-xs font-bold uppercase text-slate-500">Investimento Total (Capex + Opex)</span>
            <div className="text-2xl font-black text-slate-900 mt-1">
              R$ {metrics.initialInvestment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-slate-400 mt-1">Ações 5W2H implementadas</div>
          </div>

          <div className="p-4 rounded-xl border border-emerald-300 bg-emerald-50/60 shadow-2xs">
            <span className="text-xs font-bold uppercase text-emerald-800">Economia Anual Consolidada</span>
            <div className="text-2xl font-black text-emerald-950 mt-1">
              R$ {metrics.annualSavings.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[10px] text-emerald-700 mt-1">R$ {metrics.monthlySavings.toLocaleString('pt-BR')}/mês + Custos Evitados</div>
          </div>

          <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/60 shadow-2xs">
            <span className="text-xs font-bold uppercase text-blue-900">Retorno sobre Investimento (ROI)</span>
            <div className="text-2xl font-black text-blue-950 mt-1">
              +{metrics.roi}%
            </div>
            <div className="text-[10px] text-blue-700 mt-1">Retorno Líquido em 12 meses</div>
          </div>

          <div className="p-4 rounded-xl border border-purple-200 bg-purple-50/60 shadow-2xs">
            <span className="text-xs font-bold uppercase text-purple-900">Tempo de Retorno (Payback)</span>
            <div className="text-2xl font-black text-purple-950 mt-1">
              {metrics.paybackMonths} meses
            </div>
            <div className="text-[10px] text-purple-700 mt-1">
              {metrics.paybackMonths < 1 ? 'Menos de 30 dias para amortização' : `${Math.ceil(metrics.paybackMonths * 30)} dias`}
            </div>
          </div>
        </div>

        {/* Premissas e Memória de Cálculo Transparente */}
        <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 flex items-center gap-2">
            <DollarSign className="w-4 h-4 text-emerald-600" /> Parâmetros Financeiros & Premissas Auditáveis
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Investimento Total (R$)
              </label>
              <input
                type="number"
                step="100"
                value={investment}
                onChange={e => setInvestment(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-slate-900"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Custos de dispositivos, ensaios e calibração</span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Economia Mensal Direta (R$/mês)
              </label>
              <input
                type="number"
                step="500"
                value={monthlySavings}
                onChange={e => setMonthlySavings(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-emerald-800"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Redução no consumo de matéria-prima e refugo</span>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase mb-1">
                Custos Indiretos Evitados (R$/ano)
              </label>
              <input
                type="number"
                step="500"
                value={avoidedCosts}
                onChange={e => setAvoidedCosts(Number(e.target.value))}
                className="w-full p-2 border border-slate-300 rounded font-mono font-bold text-blue-900"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">Horas extras de retrabalho e paradas evitadas</span>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs space-y-1 text-slate-600 font-mono">
            <div><strong>Fórmula ROI:</strong> ((Economia Anual Líquida - Investimento) / Investimento) * 100</div>
            <div><strong>Fórmula Payback:</strong> Investimento / Economia Mensal = {metrics.paybackMonths} meses</div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};
