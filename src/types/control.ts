export interface ControlPlanItem {
  id: string;
  processStep: string;
  controlledFeature: string;
  indicator: string;
  specification: string;
  measurementMethod: string;
  sampleSizeAndFreq: string;
  responsible: string;
  reactionPlan: string;
  status: 'Conforme' | 'Alerta' | 'Fora de Controle';
}

export type ControlChartType = 'I-MR' | 'Xbar-R' | 'p' | 'np' | 'c' | 'u';

export interface SPCDataPoint {
  sample: number;
  value: number;
  mr?: number; // Para carta I-MR
  isOutlier?: boolean;
  ruleViolated?: string;
}

export interface SPCLimits {
  ucl: number; // Upper Control Limit (+3 sigma)
  cl: number;  // Center Line (Média)
  lcl: number; // Lower Control Limit (-3 sigma)
  uclMr?: number;
  clMr?: number;
  lclMr?: number;
}

export interface BeforeAfterComparison {
  metric: string;
  unit: string;
  beforeMean: number;
  beforeStdDev: number;
  afterMean: number;
  afterStdDev: number;
  deltaAbsolute: number;
  deltaPercent: number;
  isStatisticallySignificant: boolean;
  pValue: number;
}

export interface StandardProcedureItem {
  id: string;
  code: string;
  title: string;
  version: string;
  department: string;
  responsible: string;
  lastReviewDate: string;
  status: 'Ativo' | 'Em Revisão' | 'Obsoleto';
}

export interface AuditCheckItem {
  id: string;
  checkItem: string;
  frequency: string;
  auditor: string;
  lastAuditDate: string;
  result: 'Conforme' | 'Não Conforme';
  correctiveAction?: string;
}
