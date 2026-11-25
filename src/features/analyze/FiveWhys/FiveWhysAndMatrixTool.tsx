import React, { useState } from 'react';
import { FiveWhysAnalysis, FiveWhysItem, CauseEffectMatrixRow } from '../../../types/analyze';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2, ArrowDown, Calculator } from 'lucide-react';

export const FiveWhysAndMatrixTool: React.FC = () => {
  // 1. Estado da análise dos 5 Porquês
  const [analysis, setAnalysis] = useState<FiveWhysAnalysis>(() => {
    const saved = localStorage.getItem('lss_five_whys');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      id: 'fw-1',
      problem: 'Peças estampadas apresentam rebarba superior a 0.05mm',
      steps: [
        { id: '1', questionNumber: 1, question: 'Por que as peças apresentam rebarba alta?', answer: 'Porque a matriz de corte está com folga excessiva.', evidence: 'Medição com calibre de folga registrou 0.12mm (especificação: 0.04mm)', responsible: 'Manutenção' },
        { id: '2', questionNumber: 2, question: 'Por que a matriz está com folga excessiva?', answer: 'Porque a punção desgastou prematuramente.', evidence: 'Inspeção visual acusou desgaste abrasivo nas bordas', responsible: 'Ferramentaria' },
        { id: '3', questionNumber: 3, question: 'Por que a punção desgastou prematuramente?', answer: 'Porque o material da chapa possui dureza acima do especificado.', evidence: 'Laudo de dureza Rockwell acusou 65 HRB (máximo esperado: 50 HRB)', responsible: 'Qualidade' },
        { id: '4', questionNumber: 4, question: 'Por que a chapa foi recebida com dureza acima do especificado?', answer: 'Porque o fornecedor trocou o lote de laminação sem notificação.', evidence: 'Certificado de matéria-prima divergente da nota fiscal', responsible: 'Compras' },
        { id: '5', questionNumber: 5, question: 'Por que a divergência não foi detectada no recebimento?', answer: 'Porque o ensaio de dureza no recebimento era feito apenas por amostragem mensal.', evidence: 'Procedimento POP-REC-04', responsible: 'Garantia da Qualidade' }
      ],
      rootCauseCandidate: 'Critério insuficiente de inspeção no recebimento de matéria-prima associado a falha de fornecedor',
      status: 'Aguardando Validação'
    };
  });

  // 2. Estado da Matriz Causa e Efeito (X vs Y)
  const [outputs] = useState<string[]>(['Rebarba (Y1)', 'Trincas (Y2)', 'Retrabalho (Y3)']);
  const [matrixRows, setMatrixRows] = useState<CauseEffectMatrixRow[]>([
    { id: '1', inputVariable: 'Folga da Matriz (X1)', ratings: { 'Rebarba (Y1)': 9, 'Trincas (Y2)': 1, 'Retrabalho (Y3)': 9 }, totalScore: 19 },
    { id: '2', inputVariable: 'Dureza do Aço (X2)', ratings: { 'Rebarba (Y1)': 9, 'Trincas (Y2)': 9, 'Retrabalho (Y3)': 9 }, totalScore: 27 },
    { id: '3', inputVariable: 'Lubrificação do Blank (X3)', ratings: { 'Rebarba (Y1)': 3, 'Trincas (Y2)': 9, 'Retrabalho (Y3)': 3 }, totalScore: 15 },
    { id: '4', inputVariable: 'Velocidade da Prensa (X4)', ratings: { 'Rebarba (Y1)': 3, 'Trincas (Y2)': 3, 'Retrabalho (Y3)': 1 }, totalScore: 7 }
  ]);

  const handleAddStep = () => {
    const nextNum = analysis.steps.length + 1;
    const newStep: FiveWhysItem = {
      id: Date.now().toString(),
      questionNumber: nextNum,
      question: `Por que ... ?`,
      answer: '',
      evidence: '',
      responsible: ''
    };
    setAnalysis({ ...analysis, steps: [...analysis.steps, newStep] });
  };

  const handleUpdateRating = (rowId: string, outputKey: string, score: number) => {
    setMatrixRows(prev => prev.map(row => {
      if (row.id !== rowId) return row;
      const newRatings = { ...row.ratings, [outputKey]: score };
      const newTotal = Object.values(newRatings).reduce((a, b) => a + b, 0);
      return { ...row, ratings: newRatings, totalScore: newTotal };
    }));
  };

  return (
    <ToolContainer
      title="5 Porquês & Matriz Causa e Efeito (X-Y Matrix)"
      subtitle="Investigação causal em profundidade e priorização das variáveis de entrada críticas (Xs)"
      badge="ANALYZE 2.2 & 2.3"
    >
      <div className="space-y-10">
        {/* Seção 1: Cinco Porquês */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">1. Investigação dos 5 Porquês (Cadeia Causal)</h3>
              <p className="text-xs text-slate-500">Progressão lógica sustentada por evidências documentadas em cada nível</p>
            </div>
            <button
              onClick={handleAddStep}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar Porquê (+1 Nível)
            </button>
          </div>

          {/* Problema Inicial */}
          <div className="p-3 bg-slate-900 text-white rounded-lg mb-3">
            <span className="text-[10px] font-bold uppercase text-blue-400 block">Sintoma / Problema Investigado</span>
            <input
              type="text"
              value={analysis.problem}
              onChange={e => setAnalysis({ ...analysis, problem: e.target.value })}
              className="w-full text-xs font-bold bg-transparent border-b border-slate-700 focus:outline-none text-white mt-1"
            />
          </div>

          {/* Escada dos Porquês */}
          <div className="space-y-3">
            {analysis.steps.map((step, idx) => (
              <div key={step.id} className="relative">
                <div className="p-3 bg-white border border-slate-200 rounded-lg shadow-xs space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-blue-700 uppercase">
                      {step.questionNumber}º Porquê
                    </span>
                    <button
                      onClick={() => setAnalysis({ ...analysis, steps: analysis.steps.filter(s => s.id !== step.id) })}
                      className="text-slate-300 hover:text-red-600 p-1"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Pergunta</label>
                      <input
                        type="text"
                        value={step.question}
                        onChange={e => setAnalysis({
                          ...analysis,
                          steps: analysis.steps.map(s => s.id === step.id ? { ...s, question: e.target.value } : s)
                        })}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Resposta Identificada</label>
                      <input
                        type="text"
                        value={step.answer}
                        onChange={e => setAnalysis({
                          ...analysis,
                          steps: analysis.steps.map(s => s.id === step.id ? { ...s, answer: e.target.value } : s)
                        })}
                        className="w-full text-xs font-semibold p-1.5 border border-blue-200 bg-blue-50/30 rounded text-blue-950"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 pt-1 border-t border-slate-100">
                    <div className="md:col-span-2">
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Evidência / Verificação Objetiva</label>
                      <input
                        type="text"
                        value={step.evidence}
                        onChange={e => setAnalysis({
                          ...analysis,
                          steps: analysis.steps.map(s => s.id === step.id ? { ...s, evidence: e.target.value } : s)
                        })}
                        placeholder="Ex: Laudo de medição, relatório de manutenção..."
                        className="w-full text-xs p-1.5 border border-slate-200 rounded"
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold text-slate-500 uppercase">Responsável</label>
                      <input
                        type="text"
                        value={step.responsible}
                        onChange={e => setAnalysis({
                          ...analysis,
                          steps: analysis.steps.map(s => s.id === step.id ? { ...s, responsible: e.target.value } : s)
                        })}
                        className="w-full text-xs p-1.5 border border-slate-200 rounded"
                      />
                    </div>
                  </div>
                </div>

                {idx < analysis.steps.length - 1 && (
                  <div className="flex justify-center my-1">
                    <ArrowDown className="w-4 h-4 text-blue-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Causa Raiz Candidata */}
          <div className="mt-4 p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/60 shadow-xs">
            <span className="text-xs font-black text-emerald-900 uppercase block mb-1">Causa Raiz Candidata Identificada</span>
            <input
              type="text"
              value={analysis.rootCauseCandidate}
              onChange={e => setAnalysis({ ...analysis, rootCauseCandidate: e.target.value })}
              className="w-full text-sm font-bold p-2 bg-white border border-emerald-300 rounded text-emerald-950"
            />
            <div className="flex items-center justify-between mt-2 text-xs text-emerald-800">
              <span>Status: <strong>{analysis.status}</strong> (exige validação por dados na etapa de Hipóteses)</span>
            </div>
          </div>
        </div>

        {/* Seção 2: Matriz Causa e Efeito (X-Y Matrix) */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                <Calculator className="w-4 h-4 text-purple-600" />
                2. Matriz Causa e Efeito (Matriz de Entradas X vs Saídas Y)
              </h3>
              <p className="text-xs text-slate-500">Correlação ponderada entre variáveis de processo (Xs) e requisitos críticos do cliente (Ys): 1 (Fraca), 3 (Média), 9 (Forte)</p>
            </div>
          </div>

          <div className="overflow-x-auto border border-slate-200 rounded-lg">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
                <tr>
                  <th className="p-3">Variável de Entrada (Causa Potencial X)</th>
                  {outputs.map(out => (
                    <th key={out} className="p-3 text-center">{out}</th>
                  ))}
                  <th className="p-3 text-center bg-purple-100 text-purple-900">Score Ponderado</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {matrixRows.sort((a, b) => b.totalScore - a.totalScore).map((row, idx) => (
                  <tr key={row.id} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-800 flex items-center gap-2">
                      <span className="w-5 h-5 bg-slate-200 rounded-full flex items-center justify-center text-[10px] text-slate-700">
                        {idx + 1}
                      </span>
                      {row.inputVariable}
                    </td>
                    {outputs.map(out => (
                      <td key={out} className="p-2 text-center">
                        <select
                          value={row.ratings[out] || 0}
                          onChange={e => handleUpdateRating(row.id, out, Number(e.target.value))}
                          className="px-2 py-1 text-xs border border-slate-300 rounded font-semibold bg-white"
                        >
                          <option value={0}>0 (Sem Relação)</option>
                          <option value={1}>1 (Fraca)</option>
                          <option value={3}>3 (Média)</option>
                          <option value={9}>9 (Forte / Crítica)</option>
                        </select>
                      </td>
                    ))}
                    <td className="p-2.5 text-center font-black text-sm bg-purple-50/50 text-purple-900">
                      {row.totalScore}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};
