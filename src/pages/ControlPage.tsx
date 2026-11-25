import React, { useState } from 'react';
import { ControlPlanTool } from '../features/control/ControlPlan/ControlPlanTool';
import { ControlChartsTool } from '../features/control/SPC/ControlChartsTool';
import { StandardizationAndAuditTool } from '../features/control/Standardization/StandardizationAndAuditTool';
import { FinalReportTool } from '../features/control/FinalReport/FinalReportTool';
import { ShieldCheck, LineChart, BookOpen, Award } from 'lucide-react';

export const ControlPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'control_plan' | 'spc' | 'standardization' | 'report'>('control_plan');

  return (
    <div className="space-y-6">
      {/* Abas Internas da Fase CONTROL */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('control_plan')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'control_plan'
              ? 'border-red-600 text-red-900 bg-red-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          Plano de Controle Operacional
        </button>

        <button
          onClick={() => setActiveTab('spc')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'spc'
              ? 'border-red-600 text-red-900 bg-red-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <LineChart className="w-4 h-4" />
          Cartas de Controle (SPC / CEP)
        </button>

        <button
          onClick={() => setActiveTab('standardization')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'standardization'
              ? 'border-red-600 text-red-900 bg-red-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          Antes vs. Depois & Padronização (POPs)
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'report'
              ? 'border-red-600 text-red-900 bg-red-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Award className="w-4 h-4" />
          Relatório Final Executivo DMAIC
        </button>
      </div>

      {/* Conteúdo Dinâmico */}
      {activeTab === 'control_plan' && <ControlPlanTool />}
      {activeTab === 'spc' && <ControlChartsTool />}
      {activeTab === 'standardization' && <StandardizationAndAuditTool />}
      {activeTab === 'report' && <FinalReportTool />}
    </div>
  );
};
