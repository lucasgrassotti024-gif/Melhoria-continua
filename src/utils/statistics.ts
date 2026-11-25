import * as ss from 'simple-statistics';

export interface DescriptiveStats {
  count: number;
  mean: number;
  median: number;
  mode: number | null;
  min: number;
  max: number;
  range: number;
  variance: number;
  stdDev: number;
  q1: number;
  q3: number;
  iqr: number;
  skewness: number;
  kurtosis: number;
}

export interface CapabilityResult {
  cp: number | null;
  cpk: number | null;
  cpu: number | null;
  cpl: number | null;
  mean: number;
  stdDev: number;
  lsl?: number;
  usl?: number;
  target?: number;
  isNormal: boolean;
  warning?: string;
  sigmaLevel?: number;
}

/**
 * Calcula estatística descritiva completa com determinismo matemático estrito
 */
export function calculateDescriptiveStats(data: number[]): DescriptiveStats | null {
  const valid = data.filter(n => typeof n === 'number' && !isNaN(n));
  if (valid.length < 2) return null;

  const count = valid.length;
  const mean = ss.mean(valid);
  const median = ss.median(valid);
  const min = ss.min(valid);
  const max = ss.max(valid);
  const range = max - min;
  const variance = ss.sampleVariance(valid);
  const stdDev = ss.sampleStandardDeviation(valid);
  
  const q1 = ss.quantile(valid, 0.25);
  const q3 = ss.quantile(valid, 0.75);
  const iqr = q3 - q1;

  let mode: number | null = null;
  try {
    mode = ss.mode(valid);
  } catch {
    mode = null;
  }

  // Assimetria de Fisher-Pearson (Skewness)
  const skewness = count > 2 && stdDev > 0
    ? (valid.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 3), 0) * count) / ((count - 1) * (count - 2))
    : 0;

  // Curtose amostral (Excess Kurtosis)
  const kurtosis = count > 3 && stdDev > 0
    ? (valid.reduce((acc, val) => acc + Math.pow((val - mean) / stdDev, 4), 0) * count * (count + 1)) / ((count - 1) * (count - 2) * (count - 3)) - (3 * Math.pow(count - 1, 2)) / ((count - 2) * (count - 3))
    : 0;

  return {
    count,
    mean: Number(mean.toFixed(4)),
    median: Number(median.toFixed(4)),
    mode: mode !== null ? Number(mode.toFixed(4)) : null,
    min: Number(min.toFixed(4)),
    max: Number(max.toFixed(4)),
    range: Number(range.toFixed(4)),
    variance: Number(variance.toFixed(4)),
    stdDev: Number(stdDev.toFixed(4)),
    q1: Number(q1.toFixed(4)),
    q3: Number(q3.toFixed(4)),
    iqr: Number(iqr.toFixed(4)),
    skewness: Number(skewness.toFixed(4)),
    kurtosis: Number(kurtosis.toFixed(4))
  };
}

/**
 * Análise de Capacidade do Processo (Cp, Cpk, CPU, CPL)
 * Respeita premissas: exige limites informados e n >= 20 para confiabilidade industrial
 */
export function calculateProcessCapability(
  data: number[],
  lsl?: number,
  usl?: number,
  target?: number
): CapabilityResult {
  const valid = data.filter(n => typeof n === 'number' && !isNaN(n));
  
  if (valid.length < 5) {
    return {
      cp: null,
      cpk: null,
      cpu: null,
      cpl: null,
      mean: 0,
      stdDev: 0,
      isNormal: false,
      warning: 'Amostra insuficiente. Recomenda-se no mínimo 20 a 30 observações para estudo de capabilidade.'
    };
  }

  if (lsl === undefined && usl === undefined) {
    return {
      cp: null,
      cpk: null,
      cpu: null,
      cpl: null,
      mean: ss.mean(valid),
      stdDev: ss.sampleStandardDeviation(valid),
      isNormal: true,
      warning: 'Informe ao menos um Limite de Especificação (LSL ou USL) para calcular os índices.'
    };
  }

  const mean = ss.mean(valid);
  const stdDev = ss.sampleStandardDeviation(valid);

  if (stdDev === 0) {
    return {
      cp: null,
      cpk: null,
      cpu: null,
      cpl: null,
      mean,
      stdDev: 0,
      isNormal: false,
      warning: 'Desvio padrão igual a zero. Não há variabilidade nos dados para análise de capacidade.'
    };
  }

  let cp: number | null = null;
  let cpu: number | null = null;
  let cpl: number | null = null;

  if (lsl !== undefined && usl !== undefined) {
    cp = (usl - lsl) / (6 * stdDev);
  }

  if (usl !== undefined) {
    cpu = (usl - mean) / (3 * stdDev);
  }

  if (lsl !== undefined) {
    cpl = (mean - lsl) / (3 * stdDev);
  }

  let cpk: number | null = null;
  if (cpu !== null && cpl !== null) {
    cpk = Math.min(cpu, cpl);
  } else if (cpu !== null) {
    cpk = cpu;
  } else if (cpl !== null) {
    cpk = cpl;
  }

  const sigmaLevel = cpk !== null ? Number((cpk * 3).toFixed(2)) : undefined;

  return {
    cp: cp !== null ? Number(cp.toFixed(3)) : null,
    cpk: cpk !== null ? Number(cpk.toFixed(3)) : null,
    cpu: cpu !== null ? Number(cpu.toFixed(3)) : null,
    cpl: cpl !== null ? Number(cpl.toFixed(3)) : null,
    mean: Number(mean.toFixed(4)),
    stdDev: Number(stdDev.toFixed(4)),
    lsl,
    usl,
    target,
    isNormal: Math.abs(ss.sampleSkewness(valid)) < 1.0,
    sigmaLevel,
    warning: valid.length < 20
      ? 'Atenção: Estudo executado com menos de 20 amostras. O resultado é preliminar.'
      : undefined
  };
}
