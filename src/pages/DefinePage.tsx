import React, { useState } from 'react';
import { ProjectCharterTool } from '../features/define/ProjectCharter/ProjectCharterTool';
import { SIPOCTool } from '../features/define/SIPOC/SIPOCTool';
import { VOCandCTQTool } from '../features/define/VOC/VOCandCTQTool';
import { StakeholdersAndPlanTool } from '../features/define/Stakeholders/StakeholdersAndPlanTool';
import { FileText, GitCommit, Users2, ListTree } from 'lucide-react';

export const DefinePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'charter' | 'sipoc' | 'voc_ctq' | 'stakeholders'>('charter');

  return (
    <div className="space-y-6">
      {/* Menu Interno de Ferramentas da Fase DEFINE */}
      <div className="flex border-b border-slate-200 gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => setActiveTab('charter')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'charter'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <FileText className="w-4 h-4" />
          Project Charter
        </button>

        <button
          onClick={() => setActiveTab('sipoc')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'sipoc'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <GitCommit className="w-4 h-4" />
          SIPOC Diagram
        </button>

        <button
          onClick={() => setActiveTab('voc_ctq')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'voc_ctq'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <ListTree className="w-4 h-4" />
          VOC & Árvore CTQ
        </button>

        <button
          onClick={() => setActiveTab('stakeholders')}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs font-bold border-b-2 transition whitespace-nowrap ${
            activeTab === 'stakeholders'
              ? 'border-blue-600 text-blue-700 bg-blue-50/50 rounded-t'
              : 'border-transparent text-slate-600 hover:text-slate-900'
          }`}
        >
          <Users2 className="w-4 h-4" />
          Stakeholders & 5W2H
        </button>
      </div>

      {/* Conteúdo Dinâmico da Ferramenta Selecionada */}
      {activeTab === 'charter' && <ProjectCharterTool />}
      {activeTab === 'sipoc' && <SIPOCTool />}
      {activeTab === 'voc_ctq' && <VOCandCTQTool />}
      {activeTab === 'stakeholders' && <StakeholdersAndPlanTool />}
    </div>
  );
};
