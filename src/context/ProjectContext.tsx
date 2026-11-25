import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, DMAICPhase } from '../types/project';

const STORAGE_KEY = 'lean_six_sigma_active_project';

const initialDefaultProject: Project = {
  id: 'proj-001',
  name: 'Otimização de Linha de Processo & Redução de Refugo',
  code: 'LSS-2026-01',
  status: 'Em Andamento',
  currentPhase: 'define',
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  define: {
    charter: {
      title: 'Redução de Refugo e Aumento de Eficiência Global',
      problemStatement: 'A taxa de refugo no setor de estampagem atualmente é de 6.4%, gerando perdas anuais estimadas em R$ 380.000.',
      businessCase: 'Reduzir custos operacionais, evitar gargalos na expedição e melhorar o OEE da linha produtiva.',
      goal: 'Reduzir a taxa de refugo de 6.4% para menos de 1.8% até o final do Q3.',
      targetMetric: 'Taxa de Refugo (%)',
      primaryMetric: 'Taxa de Refugo <= 1.8%',
      secondaryMetrics: 'Tempo de parada não planejada, OEE',
      scopeIn: 'Linha de Estampagem 01 e 02, turno diurno e noturno.',
      scopeOut: 'Setores de Usinagem, Pintura e Fornecedores externos de matéria-prima.',
      champion: 'Diretoria de Operações',
      leader: 'Especialista Green Belt',
      team: ['Engenharia de Processos', 'Supervisor de Turno', 'Operador Líder', 'Qualidade'],
      expectedFinancialBenefits: 'Economia estimada em R$ 260.000/ano.',
      estimatedDeadline: '2026-09-30',
      restrictions: 'Não realizar modificações estruturais que interrompam a produção por mais de 4 horas.',
    },
    sipoc: [
      { id: '1', supplier: 'Almoxarifado', input: 'Chapas de Aço SAE 1020', process: 'Corte e Guilhotina', output: 'Blanks cortados', customer: 'Estampagem' },
      { id: '2', supplier: 'Estampagem', input: 'Blanks de Aço', process: 'Prensagem e Conformação', output: 'Peças estampadas', customer: 'Inspeção de Qualidade' }
    ],
    voc: [
      { id: '1', customerNeed: 'Peças sem rebarbas ou amassados', customerPain: 'Retrabalho e paradas de montagem na solda', importance: 'Alta' }
    ],
    ctq: [
      { id: '1', need: 'Sem rebarbas', driver: 'Acabamento de corte preciso', ctqRequirement: 'Altura de rebarba < 0.05 mm', specification: 'Tolerância dimensional +- 0.1mm' }
    ],
    stakeholders: [
      { id: '1', name: 'Carlos Mendes', department: 'Produção', role: 'Gerente Industrial', interest: 'Alto', influence: 'Alta', engagementStrategy: 'Reuniões quinzenais de status' }
    ],
    actions5w2h: [
      { id: '1', what: 'Mapear folga das matrizes', why: 'Eliminar causa provável de rebarba', where: 'Linha 1', when: '2026-04-10', who: 'Manutenção Mecânica', how: 'Utilizar micrômetro calibrado', howMuch: 'R$ 0', status: 'Em Andamento' }
    ]
  }
};

interface ProjectContextType {
  project: Project;
  updateProject: (updated: Partial<Project>) => void;
  updateDefine: (defineData: Partial<Project['define']>) => void;
  setCurrentPhase: (phase: DMAICPhase) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [project, setProject] = useState<Project>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return initialDefaultProject;
      }
    }
    return initialDefaultProject;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(project));
  }, [project]);

  const updateProject = (updated: Partial<Project>) => {
    setProject(prev => ({
      ...prev,
      ...updated,
      updatedAt: new Date().toISOString()
    }));
  };

  const updateDefine = (defineData: Partial<Project['define']>) => {
    setProject(prev => ({
      ...prev,
      updatedAt: new Date().toISOString(),
      define: {
        ...prev.define,
        ...defineData
      }
    }));
  };

  const setCurrentPhase = (phase: DMAICPhase) => {
    setProject(prev => ({
      ...prev,
      currentPhase: phase,
      updatedAt: new Date().toISOString()
    }));
  };

  return (
    <ProjectContext.Provider value={{ project, updateProject, updateDefine, setCurrentPhase }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject deve ser utilizado dentro de um ProjectProvider');
  }
  return context;
};
