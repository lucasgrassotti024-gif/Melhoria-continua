export type IshikawaCategory = 'Método' | 'Máquina' | 'Mão de Obra' | 'Material' | 'Medição' | 'Meio Ambiente' | string;

export interface IshikawaCause {
  id: string;
  category: IshikawaCategory;
  text: string;
  subcauses?: string[];
  isPriority?: boolean;
}

export interface IshikawaDiagram {
  problem: string;
  categories: string[];
  causes: IshikawaCause[];
}

export interface FiveWhysItem {
  id: string;
  questionNumber: number;
  question: string;
  answer: string;
  evidence: string;
  responsible: string;
}

export interface FiveWhysAnalysis {
  id: string;
  problem: string;
  steps: FiveWhysItem[];
  rootCauseCandidate: string;
  status: 'Em Investigação' | 'Validada' | 'Descartada';
}

export interface CauseEffectMatrixRow {
  id: string;
  inputVariable: string; // Causa ou entrada de processo (X)
  ratings: { [outputKey: string]: number }; // Notas 1, 3, 9 para cada saída crítica (Y)
  totalScore: number;
}

export interface FMEARow {
  id: string;
  processStep: string;
  failureMode: string;
  failureEffect: string;
  severity: number; // 1 a 10
  potentialCause: string;
  currentControls: string;
  occurrence: number; // 1 a 10
  detection: number; // 1 a 10
  rpn: number; // S x O x D
  actionPriority: 'Alta' | 'Média' | 'Baixa';
  recommendedAction: string;
  responsible: string;
  deadline: string;
  postSeverity?: number;
  postOccurrence?: number;
  postDetection?: number;
  postRpn?: number;
}

export type CauseStatus = 'Identificada' | 'Em Investigação' | 'Aguardando Validação' | 'Validada' | 'Não Confirmada' | 'Descartada';

export interface ValidatedCause {
  id: string;
  description: string;
  source: 'Ishikawa' | '5 Porquês' | 'Matriz Causa e Efeito' | 'FMEA' | 'Outro';
  status: CauseStatus;
  evidence: string;
  validationMethod: 'Teste Estatístico' | 'Teste Prático de Campo' | 'Observação Gemba' | 'Dados Históricos';
  responsible: string;
  date: string;
  notes: string;
}
