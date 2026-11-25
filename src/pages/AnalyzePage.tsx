import React, { useState } from 'react';
import { IshikawaTool } from '../features/analyze/Ishikawa/IshikawaTool';
import { FiveWhysAndMatrixTool } from '../features/analyze/FiveWhys/FiveWhysAndMatrixTool';
import { FMEATool } from '../features/analyze/FMEA/FMEATool';
import { CauseValidationHubTool } from '../features/analyze/ValidationHub/CauseValidationHubTool';
import { GitFork, HelpCircle, AlertOctagon, CheckCircle2 } from 'lucide-react';

export const AnalyzePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'ishikawa' | 'five_whys' | 'fmea' | 'validation'>('ishikawa');

  return (
    <div className="space-y-6">
      {/* Abas Internas da Fase ANALYZE */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('ishikawa')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'ishikawa'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <GitFork className="w-4 h-4" />
          Diagrama de Ishikawa (6M)
        </button>

        <button
          onClick={() => setActiveTab('five_whys')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'five_whys'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <HelpCircle className="w-4 h-4" />
          5 Porquês & Matriz Causa e Efeito
        </button>

        <button
          onClick={() => setActiveTab('fmea')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'fmea'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <AlertOctagon className="w-4 h-4" />
          FMEA (Análise de Modos de Falha)
        </button>

        <button
          onClick={() => setActiveTab('validation')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'validation'
              ? 'border-amber-600 text-amber-900 bg-amber-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <CheckCircle2 className="w-4 h-4" />
          Hub de Validação por Evidências
        </button>
      </div>

      {/* Conteúdo Dinâmico */}
      {activeTab === 'ishikawa' && <IshikawaTool />}
      {activeTab === 'five_whys' && <FiveWhysAndMatrixTool />}
      {activeTab === 'fmea' && <FMEATool />}
      {activeTab === 'validation' && <CauseValidationHubTool />}
    </div>
  );
};
