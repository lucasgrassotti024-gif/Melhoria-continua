import React from 'react';
import { useProject } from '../../../context/ProjectContext';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Printer, CheckCircle } from 'lucide-react';

export const FinalReportTool: React.FC = () => {
  const { project } = useProject();

  const handlePrint = () => {
    window.print();
  };

  return (
    <ToolContainer
      title="Relatório Final Executivo de Encerramento do Projeto (Dossiê DMAIC)"
      subtitle="Consolidação integral das 5 fases (Define, Measure, Analyze, Improve e Control) para auditoria e diretoria"
      badge="CONTROL 2.5"
      actions={
        <button
          onClick={handlePrint}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-red-600 rounded-md hover:bg-red-700 shadow-sm"
        >
          <Printer className="w-3.5 h-3.5" /> Exportar Relatório Executivo (PDF)
        </button>
      }
    >
      {/* Visualização Impressa / Relatório Executivo Formal */}
      <div className="bg-white border-2 border-slate-900 rounded-xl p-8 space-y-8 shadow-sm print:border-none print:p-0">
        {/* Cabeçalho Oficial do Relatório */}
        <div className="border-b-4 border-slate-900 pb-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs uppercase font-black tracking-widest text-red-700 bg-red-100 px-2 py-0.5 rounded">
                DOSSIÊ DE ENCERRAMENTO DMAIC • SEIS SIGMA
              </span>
              <span className="text-xs font-mono text-slate-500">Código: {project.code}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 mt-2">{project.name}</h2>
            <div className="text-xs text-slate-500 mt-1">
              Líder: <strong>{project.define.charter.leader}</strong> • Champion: <strong>{project.define.charter.champion}</strong>
            </div>
          </div>
          <div className="text-right">
            <span className="px-3 py-1 bg-emerald-100 text-emerald-900 border border-emerald-300 rounded font-black text-xs uppercase tracking-wider">
              PROJETO CONCLUÍDO COM GANHO COMPROVADO
            </span>
            <div className="text-[11px] text-slate-400 mt-1">Conclusão: Novembro/2026</div>
          </div>
        </div>

        {/* 1. DEFINE (Resumo) */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-blue-900 uppercase tracking-wider flex items-center gap-2 border-b border-blue-200 pb-1">
            1. Fase DEFINE — Contrato de Melhoria & Escopo
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <strong className="text-slate-800 block mb-1">Problema Inicial Identificado:</strong>
              <p className="text-slate-600">{project.define.charter.problemStatement}</p>
            </div>
            <div className="p-3 bg-blue-50/50 rounded border border-blue-200">
              <strong className="text-blue-900 block mb-1">Meta Quantitativa Estabelecida:</strong>
              <p className="text-blue-950 font-bold">{project.define.charter.goal}</p>
              <div className="text-[10px] text-blue-700 mt-1">Fronteiras: {project.define.charter.scopeIn}</div>
            </div>
          </div>
        </div>

        {/* 2. MEASURE (Linha de Base Inicial) */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-emerald-900 uppercase tracking-wider flex items-center gap-2 border-b border-emerald-200 pb-1">
            2. Fase MEASURE — Medição do Desempenho Atual
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 block uppercase text-[10px]">Taxa de Refugo Inicial</span>
              <strong className="text-base text-slate-900 font-mono">6.40%</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 block uppercase text-[10px]">Capacidade Inicial (Cpk)</span>
              <strong className="text-base text-red-700 font-mono">0.68 (Incapaz)</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 block uppercase text-[10px]">Confiabilidade MSA (%GRR)</span>
              <strong className="text-base text-emerald-700 font-mono">8.4% (Aprovado)</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded border border-slate-200">
              <span className="text-slate-500 block uppercase text-[10px]">Pareto 80/20</span>
              <span className="font-semibold text-slate-800">Rebarba representa 73% dos refugos</span>
            </div>
          </div>
        </div>

        {/* 3. ANALYZE (Causas Raízes Validadas) */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-amber-900 uppercase tracking-wider flex items-center gap-2 border-b border-amber-200 pb-1">
            3. Fase ANALYZE — Causas Raízes Comprovadas por Evidências
          </h3>
          <div className="p-3 bg-amber-50/50 rounded-lg border border-amber-200 text-xs space-y-2">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Causa 1 (Comprovada em Campo):</strong> Folga de 0.12mm entre punção e matriz (especificação máxima 0.04mm). Ajuste na Prensa 2 eliminou a rebarba.
              </div>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <strong>Causa 2 (Comprovada Estatisticamente):</strong> Dureza do lote de bobinas acima de 65 HRB (teste t p-valor &lt; 0.001), gerando desgaste acelerado na punção.
              </div>
            </div>
          </div>
        </div>

        {/* 4. IMPROVE & CONTROL (Resultados Finais & Sustentação) */}
        <div className="space-y-3">
          <h3 className="text-sm font-black text-red-900 uppercase tracking-wider flex items-center gap-2 border-b border-red-200 pb-1">
            4. Fase IMPROVE & CONTROL — Resultados Alcançados & Sustentação
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-300">
              <span className="text-xs font-bold text-emerald-800 uppercase block mb-1">Redução de Refugo Obtida</span>
              <div className="text-3xl font-black text-emerald-950 font-mono">6.4% ➔ 1.35%</div>
              <div className="text-xs text-emerald-700 mt-1 font-semibold">Queda de 78.9% no defeito (Superou a meta de 1.8%)</div>
            </div>

            <div className="p-4 bg-purple-50 rounded-xl border border-purple-300">
              <span className="text-xs font-bold text-purple-800 uppercase block mb-1">Capacidade de Processo Atual</span>
              <div className="text-3xl font-black text-purple-950 font-mono">Cpk = 1.48</div>
              <div className="text-xs text-purple-700 mt-1 font-semibold">Processo Capaz e Estável (&gt; 1.33)</div>
            </div>

            <div className="p-4 bg-blue-50 rounded-xl border border-blue-300">
              <span className="text-xs font-bold text-blue-800 uppercase block mb-1">Retorno Financeiro Auditado</span>
              <div className="text-2xl font-black text-blue-950 font-mono">R$ 295.280 / ano</div>
              <div className="text-xs text-blue-700 mt-1 font-semibold">Payback: Menos de 30 dias (ROI: 2.350%)</div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-xs">
            <strong className="text-slate-800 block mb-1">Mecanismos de Sustentação Operacional:</strong>
            <p className="text-slate-600">
              Implementado o gabarito Poka-Yoke de calibração rápida, procedimentos padronizados (POP-PRN-012 e POP-REC-004), ensaio de dureza em 100% dos recebimentos de bobina e carta de controle I-MR com limites de 3σ monitorada diariamente.
            </p>
          </div>
        </div>

        {/* Assinaturas Formais */}
        <div className="pt-8 border-t border-slate-300 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-xs">
          <div className="border-t border-slate-400 pt-2">
            <div className="font-bold text-slate-800">{project.define.charter.leader}</div>
            <div className="text-slate-500">Líder do Projeto (Green Belt)</div>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <div className="font-bold text-slate-800">{project.define.charter.champion}</div>
            <div className="text-slate-500">Champion / Diretor Industrial</div>
          </div>
          <div className="border-t border-slate-400 pt-2">
            <div className="font-bold text-slate-800">Gerência de Garantia da Qualidade</div>
            <div className="text-slate-500">Validação Six Sigma</div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};
