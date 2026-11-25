export interface ColumnDef {
  key: string;
  name: string;
  type: 'numeric' | 'categorical' | 'date';
}

export interface DataRow {
  [key: string]: any;
}

export interface Dataset {
  id: string;
  name: string;
  columns: ColumnDef[];
  rows: DataRow[];
  createdAt: string;
}

export interface GageRRRow {
  part: string;
  operator: string;
  trial: number;
  measurement: number;
}

export interface DataCollectionPlanItem {
  id: string;
  variable: string;
  operationalDefinition: string;
  unit: string;
  method: string;
  responsible: string;
  frequency: string;
  location: string;
  sampleSize: string;
  period: string;
}
