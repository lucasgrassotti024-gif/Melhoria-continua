export type DMAICPhase = 'define' | 'measure' | 'analyze' | 'improve' | 'control';

export interface ProjectCharter {
  title: string;
  problemStatement: string;
  businessCase: string;
  goal: string;
  targetMetric: string;
  primaryMetric: string;
  secondaryMetrics: string;
  scopeIn: string;
  scopeOut: string;
  champion: string;
  leader: string;
  team: string[];
  expectedFinancialBenefits: string;
  estimatedDeadline: string;
  restrictions: string;
}

export interface SIPOCItem {
  id: string;
  supplier: string;
  input: string;
  process: string;
  output: string;
  customer: string;
}

export interface VOCItem {
  id: string;
  customerNeed: string;
  customerPain: string;
  importance: 'Alta' | 'Média' | 'Baixa';
}

export interface CTQItem {
  id: string;
  need: string;
  driver: string;
  ctqRequirement: string;
  specification: string;
}

export interface StakeholderItem {
  id: string;
  name: string;
  department: string;
  role: string;
  interest: 'Alto' | 'Baixo';
  influence: 'Alta' | 'Baixa';
  engagementStrategy: string;
}

export interface Action5W2H {
  id: string;
  what: string;
  why: string;
  where: string;
  when: string;
  who: string;
  how: string;
  howMuch: string;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Atrasado';
}

export interface Project {
  id: string;
  name: string;
  code: string;
  status: 'Planejamento' | 'Em Andamento' | 'Concluído';
  currentPhase: DMAICPhase;
  createdAt: string;
  updatedAt: string;
  define: {
    charter: ProjectCharter;
    sipoc: SIPOCItem[];
    voc: VOCItem[];
    ctq: CTQItem[];
    stakeholders: StakeholderItem[];
    actions5w2h: Action5W2H[];
  };
}
