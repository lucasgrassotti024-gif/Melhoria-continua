import React, { useState } from 'react';
import { BrainstormingAndMatrixTool } from '../features/improve/Brainstorming/BrainstormingAndMatrixTool';
import { ActionPlan5W2HTool } from '../features/improve/ActionPlan/ActionPlan5W2HTool';
import { PilotAndScenarioTool } from '../features/improve/Pilot/PilotAndScenarioTool';
import { FinancialEvaluationTool } from '../features/improve/Financial/FinancialEvaluationTool';
import { Zap, ListChecks, PlayCircle, DollarSign } from 'lucide-react';

export const ImprovePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'brainstorming' | 'action_plan' | 'pilot_scenario' | 'financial'>('brainstorming');

  return (
    <div className="space-y-6">
      {/* Abas Internas da Fase IMPROVE */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('brainstorming')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'brainstorming'
              ? 'border-purple-600 text-purple-900 bg-purple-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Zap className="w-4 h-4" />
          Brainstorming & Matriz 2x2
        </button>

        <button
          onClick={() => setActiveTab('action_plan')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'action_plan'
              ? 'border-purple-600 text-purple-900 bg-purple-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          Plano de Ação 5W2H Executivo
        </button>

        <button
          onClick={() => setActiveTab('pilot_scenario')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'pilot_scenario'
              ? 'border-purple-600 text-purple-900 bg-purple-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <PlayCircle className="w-4 h-4" />
          Testes Piloto & Simulador
        </button>

        <button
          onClick={() => setActiveTab('financial')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'financial'
              ? 'border-purple-600 text-purple-900 bg-purple-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <DollarSign className="w-4 h-4" />
          Avaliação Financeira (ROI / Payback)
        </button>
      </div>

      {/* Conteúdo Dinâmico */}
      {activeTab === 'brainstorming' && <BrainstormingAndMatrixTool />}
      {activeTab === 'action_plan' && <ActionPlan5W2HTool />}
      {activeTab === 'pilot_scenario' && <PilotAndScenarioTool />}
      {activeTab === 'financial' && <FinancialEvaluationTool />}
    </div>
  );
};
