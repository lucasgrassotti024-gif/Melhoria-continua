import React, { useState } from 'react';
import { FMEARow } from '../../../types/analyze';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2 } from 'lucide-react';

export const FMEATool: React.FC = () => {
  const [fmeaRows, setFmeaRows] = useState<FMEARow[]>([
    {
      id: '1',
      processStep: 'Prensagem e Corte',
      failureMode: 'Rebarba acima de 0.05mm',
      failureEffect: 'Dificuldade de encaixe na solda e risco de corte no operador',
      severity: 8,
      potentialCause: 'Folga descalibrada entre matriz e punção',
      currentControls: 'Inspeção visual a cada 2 horas',
      occurrence: 7,
      detection: 6,
      rpn: 336, // 8 * 7 * 6
      actionPriority: 'Alta',
      recommendedAction: 'Instalação de sensor a laser de espessura de rebarba e calibração semanal',
      responsible: 'Manutenção / Engenharia',
      deadline: '2026-06-15',
      postSeverity: 8,
      postOccurrence: 2,
      postDetection: 2,
      postRpn: 32 // 8 * 2 * 2
    },
    {
      id: '2',
      processStep: 'Alimentação de Chapas',
      failureMode: 'Chapa com dureza fora do padrão',
      failureEffect: 'Desgaste prematuro da matriz e trincas',
      severity: 7,
      potentialCause: 'Lote de fornecedor sem laudo de conformidade',
      currentControls: 'Conferência visual de nota fiscal',
      occurrence: 5,
      detection: 8,
      rpn: 280, // 7 * 5 * 8
      actionPriority: 'Alta',
      recommendedAction: 'Obrigatoriedade de teste de dureza portátil no recebimento do caminhão',
      responsible: 'Garantia da Qualidade',
      deadline: '2026-05-30',
      postSeverity: 7,
      postOccurrence: 2,
      postDetection: 2,
      postRpn: 28
    }
  ]);

  const calculateActionPriority = (sev: number, occ: number, det: number): 'Alta' | 'Média' | 'Baixa' => {
    const rpn = sev * occ * det;
    if (sev >= 8 || rpn >= 200) return 'Alta';
    if (rpn >= 100) return 'Média';
    return 'Baixa';
  };

  const handleUpdate = (id: string, field: keyof FMEARow, val: any) => {
    setFmeaRows(prev => prev.map(row => {
      if (row.id !== id) return row;
      const updated = { ...row, [field]: val };
      
      const sev = Number(field === 'severity' ? val : updated.severity);
      const occ = Number(field === 'occurrence' ? val : updated.occurrence);
      const det = Number(field === 'detection' ? val : updated.detection);
      
      updated.rpn = sev * occ * det;
      updated.actionPriority = calculateActionPriority(sev, occ, det);

      if (updated.postSeverity && updated.postOccurrence && updated.postDetection) {
        updated.postRpn = Number(updated.postSeverity) * Number(updated.postOccurrence) * Number(updated.postDetection);
      }

      return updated;
    }));
  };

  const handleAddRow = () => {
    const newRow: FMEARow = {
      id: Date.now().toString(),
      processStep: '',
      failureMode: '',
      failureEffect: '',
      severity: 5,
      potentialCause: '',
      currentControls: '',
      occurrence: 5,
      detection: 5,
      rpn: 125,
      actionPriority: 'Média',
      recommendedAction: '',
      responsible: '',
      deadline: ''
    };
    setFmeaRows(prev => [...prev, newRow]);
  };

  return (
    <ToolContainer
      title="FMEA — Failure Mode and Effects Analysis (Análise de Modos de Falha e Efeitos)"
      subtitle="Identificação de riscos operacionais, cálculo de RPN (S x O x D) e plano de ações preventivas com reavaliação de risco"
      badge="ANALYZE 2.4"
      actions={
        <button
          onClick={handleAddRow}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100"
        >
          <Plus className="w-3.5 h-3.5" /> Adicionar Modo de Falha
        </button>
      }
    >
      <div className="overflow-x-auto border border-slate-200 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase text-[10px]">
            <tr>
              <th className="p-2.5">Etapa do Processo</th>
              <th className="p-2.5">Modo de Falha</th>
              <th className="p-2.5">Efeito da Falha</th>
              <th className="p-2 text-center" title="Severidade (1 a 10)">S</th>
              <th className="p-2.5">Causa Potencial</th>
              <th className="p-2.5">Controles Atuais</th>
              <th className="p-2 text-center" title="Ocorrência (1 a 10)">O</th>
              <th className="p-2 text-center" title="Detecção (1 a 10)">D</th>
              <th className="p-2.5 text-center bg-amber-100 text-amber-900 font-black">RPN</th>
              <th className="p-2.5 text-center">Prioridade</th>
              <th className="p-2.5">Ação Recomendada</th>
              <th className="p-2.5">Responsável / Prazo</th>
              <th className="p-2.5 text-center bg-emerald-100 text-emerald-900 font-black">Pós RPN</th>
              <th className="p-2 text-center">Excluir</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {fmeaRows.map(row => (
              <tr key={row.id} className="hover:bg-slate-50">
                <td className="p-1.5 min-w-[120px]">
                  <input
                    type="text"
                    value={row.processStep}
                    onChange={e => handleUpdate(row.id, 'processStep', e.target.value)}
                    className="w-full p-1 border border-slate-200 rounded text-xs"
                  />
                </td>
                <td className="p-1.5 min-w-[130px]">
                  <input
                    type="text"
                    value={row.failureMode}
                    onChange={e => handleUpdate(row.id, 'failureMode', e.target.value)}
                    className="w-full p-1 border border-slate-200 rounded text-xs font-semibold"
                  />
                </td>
                <td className="p-1.5 min-w-[140px]">
                  <input
                    type="text"
                    value={row.failureEffect}
                    onChange={e => handleUpdate(row.id, 'failureEffect', e.target.value)}
                    className="w-full p-1 border border-slate-200 rounded text-xs"
                  />
                </td>
                <td className="p-1 text-center">
                  <select
                    value={row.severity}
                    onChange={e => handleUpdate(row.id, 'severity', Number(e.target.value))}
                    className="p-1 border border-slate-200 rounded text-xs font-bold font-mono"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </td>
                <td className="p-1.5 min-w-[130px]">
                  <input
                    type="text"
                    value={row.potentialCause}
                    onChange={e => handleUpdate(row.id, 'potentialCause', e.target.value)}
                    className="w-full p-1 border border-slate-200 rounded text-xs"
                  />
                </td>
                <td className="p-1.5 min-w-[120px]">
                  <input
                    type="text"
                    value={row.currentControls}
                    onChange={e => handleUpdate(row.id, 'currentControls', e.target.value)}
                    className="w-full p-1 border border-slate-200 rounded text-xs"
                  />
                </td>
                <td className="p-1 text-center">
                  <select
                    value={row.occurrence}
                    onChange={e => handleUpdate(row.id, 'occurrence', Number(e.target.value))}
                    className="p-1 border border-slate-200 rounded text-xs font-bold font-mono"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </td>
                <td className="p-1 text-center">
                  <select
                    value={row.detection}
                    onChange={e => handleUpdate(row.id, 'detection', Number(e.target.value))}
                    className="p-1 border border-slate-200 rounded text-xs font-bold font-mono"
                  >
                    {[1,2,3,4,5,6,7,8,9,10].map(n => <option key={n} value={n}>{n}</option>)}
                  </select>
                </td>
                <td className="p-2 text-center font-black text-sm bg-amber-50/70 text-amber-950 font-mono">
                  {row.rpn}
                </td>
                <td className="p-2 text-center">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    row.actionPriority === 'Alta'
                      ? 'bg-red-100 text-red-800 border border-red-200'
                      : row.actionPriority === 'Média'
                      ? 'bg-amber-100 text-amber-800 border border-amber-200'
                      : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                  }`}>
                    {row.actionPriority}
                  </span>
                </td>
                <td className="p-1.5 min-w-[160px]">
                  <input
                    type="text"
                    value={row.recommendedAction}
                    onChange={e => handleUpdate(row.id, 'recommendedAction', e.target.value)}
                    className="w-full p-1 border border-slate-200 rounded text-xs"
                  />
                </td>
                <td className="p-1.5 min-w-[130px]">
                  <input
                    type="text"
                    value={row.responsible}
                    onChange={e => handleUpdate(row.id, 'responsible', e.target.value)}
                    placeholder="Responsável"
                    className="w-full p-1 border border-slate-200 rounded text-xs mb-1"
                  />
                  <input
                    type="date"
                    value={row.deadline}
                    onChange={e => handleUpdate(row.id, 'deadline', e.target.value)}
                    className="w-full p-1 border border-slate-200 rounded text-xs"
                  />
                </td>
                <td className="p-2 text-center font-black text-sm bg-emerald-50/70 text-emerald-950 font-mono">
                  {row.postRpn ?? '—'}
                </td>
                <td className="p-1 text-center">
                  <button
                    onClick={() => setFmeaRows(prev => prev.filter(r => r.id !== row.id))}
                    className="p-1 text-slate-300 hover:text-red-600 transition"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ToolContainer>
  );
};
