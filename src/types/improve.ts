export interface SolutionIdea {
  id: string;
  title: string;
  description: string;
  category: 'Método' | 'Dispositivo / Poka-Yoke' | 'Automação' | 'Treinamento' | 'Gestão de Fornecedores' | string;
  relatedCause: string;
  effort: number; // 1 (Mínimo) a 10 (Máximo)
  impact: number; // 1 (Mínimo) a 10 (Máximo)
  quadrant: 'Quick Win' | 'Estratégico' | 'Secundário' | 'Descartar';
  selected: boolean;
}

export interface PrioritizationCriteria {
  id: string;
  name: string;
  weight: number; // Peso 1 a 5
}

export interface ActionPlanItem {
  id: string;
  solutionId?: string;
  what: string;
  why: string;
  where: string;
  when: string;
  who: string;
  how: string;
  plannedCost: number;
  actualCost: number;
  status: 'Pendente' | 'Em Andamento' | 'Concluído' | 'Atrasado';
  evidence?: string;
}

export interface PilotTest {
  id: string;
  solution: string;
  objective: string;
  hypothesis: string;
  period: string;
  sampleBaseline: number; // Ex: Refugo antes (6.4%)
  samplePilot: number; // Ex: Refugo teste (1.6%)
  metricUnit: string;
  conclusion: string;
  approvedForRollout: boolean;
}

export interface ScenarioSimulation {
  metricName: string;
  currentValue: number;
  projectedReductionPercent: number; // Ex: 70% de redução
  projectedValue: number;
  monthlyUnitLoss: number; // Custo unitário da perda
  volumePerMonth: number;
  projectedMonthlySavings: number;
}

export interface FinancialEvaluation {
  initialInvestment: number;
  monthlySavings: number;
  annualSavings: number;
  avoidedCosts: number;
  roi: number; // %
  paybackMonths: number; // meses
}
