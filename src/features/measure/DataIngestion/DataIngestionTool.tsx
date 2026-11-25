import React, { useState } from 'react';
import Papa from 'papaparse';
import { Dataset, ColumnDef, DataRow } from '../../../types/measure';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Upload, ClipboardPaste, Plus, Trash2, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DataIngestionProps {
  dataset: Dataset;
  onUpdateDataset: (dataset: Dataset) => void;
}

export const DataIngestionTool: React.FC<DataIngestionProps> = ({ dataset, onUpdateDataset }) => {
  const [pasteText, setPasteText] = useState('');
  const [showPasteModal, setShowPasteModal] = useState(false);
  const [msg, setMsg] = useState<{ type: 'success' | 'warn'; text: string } | null>(null);

  // Ingestão via colar (Excel / Sheets Ctrl+V)
  const handleParsePastedData = () => {
    if (!pasteText.trim()) return;

    // Detecta delimitador (tab para excel/sheets ou ponto-e-virgula)
    const result = Papa.parse(pasteText.trim(), {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
    });

    if (result.errors.length > 0 && result.data.length === 0) {
      setMsg({ type: 'warn', text: 'Não foi possível interpretar a estrutura colada. Verifique os dados.' });
      return;
    }

    const rows = result.data as DataRow[];
    const fields = result.meta.fields || [];

    const columns: ColumnDef[] = fields.map(f => {
      // Determina tipo inicial
      const firstVal = rows.find(r => r[f] !== null && r[f] !== undefined)?.[f];
      const isNum = typeof firstVal === 'number' || (!isNaN(Number(firstVal)) && firstVal !== '');
      return {
        key: f,
        name: f,
        type: isNum ? 'numeric' : 'categorical'
      };
    });

    onUpdateDataset({
      ...dataset,
      columns,
      rows
    });

    setShowPasteModal(false);
    setPasteText('');
    setMsg({ type: 'success', text: `${rows.length} registros e ${columns.length} colunas importados com sucesso!` });
    setTimeout(() => setMsg(null), 4000);
  };

  // Upload CSV
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      dynamicTyping: true,
      complete: (result) => {
        const rows = result.data as DataRow[];
        const fields = result.meta.fields || [];
        const columns: ColumnDef[] = fields.map(f => {
          const firstVal = rows.find(r => r[f] !== null && r[f] !== undefined)?.[f];
          const isNum = typeof firstVal === 'number';
          return {
            key: f,
            name: f,
            type: isNum ? 'numeric' : 'categorical'
          };
        });

        onUpdateDataset({
          ...dataset,
          name: file.name.replace(/\.[^/.]+$/, ""),
          columns,
          rows
        });
        setMsg({ type: 'success', text: `Arquivo ${file.name} carregado com sucesso (${rows.length} linhas)!` });
        setTimeout(() => setMsg(null), 4000);
      }
    });
  };

  const handleCellEdit = (rowIndex: number, colKey: string, value: any) => {
    const col = dataset.columns.find(c => c.key === colKey);
    let finalVal = value;
    if (col?.type === 'numeric') {
      const num = parseFloat(value);
      finalVal = isNaN(num) ? value : num;
    }

    const newRows = [...dataset.rows];
    newRows[rowIndex] = { ...newRows[rowIndex], [colKey]: finalVal };
    onUpdateDataset({ ...dataset, rows: newRows });
  };

  const handleAddColumn = () => {
    const colName = prompt('Nome da nova coluna / variável:');
    if (!colName) return;
    const key = colName.toLowerCase().replace(/\s+/g, '_');
    const newCol: ColumnDef = { key, name: colName, type: 'numeric' };
    onUpdateDataset({
      ...dataset,
      columns: [...dataset.columns, newCol],
      rows: dataset.rows.map(r => ({ ...r, [key]: 0 }))
    });
  };

  const handleAddRow = () => {
    const newRow: DataRow = {};
    dataset.columns.forEach(c => {
      newRow[c.key] = c.type === 'numeric' ? 0 : '';
    });
    onUpdateDataset({
      ...dataset,
      rows: [...dataset.rows, newRow]
    });
  };

  const handleDeleteRow = (index: number) => {
    onUpdateDataset({
      ...dataset,
      rows: dataset.rows.filter((_, idx) => idx !== index)
    });
  };

  return (
    <ToolContainer
      title="Central de Ingestão de Dados & Data Grid"
      subtitle="Entrada de medições por colagem de planilhas Excel (Ctrl+V), upload CSV ou edição direta no grid"
      badge="MEASURE 2.1"
      actions={
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPasteModal(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-md hover:bg-blue-100 transition"
          >
            <ClipboardPaste className="w-3.5 h-3.5" />
            Colar do Excel
          </button>
          <label className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            Importar CSV
            <input type="file" accept=".csv,.txt" onChange={handleFileUpload} className="hidden" />
          </label>
          <button
            onClick={handleAddColumn}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          >
            <Plus className="w-3.5 h-3.5" /> Coluna
          </button>
          <button
            onClick={handleAddRow}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50"
          >
            <Plus className="w-3.5 h-3.5" /> Linha
          </button>
        </div>
      }
    >
      {msg && (
        <div className={`mb-4 p-3 rounded-lg text-xs flex items-center gap-2 ${
          msg.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-200' : 'bg-amber-50 text-amber-800 border border-amber-200'
        }`}>
          {msg.type === 'success' ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : <AlertTriangle className="w-4 h-4 text-amber-600" />}
          {msg.text}
        </div>
      )}

      {/* Modal de Colagem */}
      {showPasteModal && (
        <div className="mb-6 p-4 bg-slate-50 border-2 border-dashed border-blue-300 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              Cole os dados da sua planilha (incluindo cabeçalhos)
            </h4>
            <button
              onClick={() => setShowPasteModal(false)}
              className="text-xs text-slate-500 hover:text-slate-700"
            >
              Cancelar
            </button>
          </div>
          <textarea
            rows={5}
            value={pasteText}
            onChange={e => setPasteText(e.target.value)}
            placeholder="Copie um bloco do Excel ou Google Sheets (com títulos nas colunas) e pressione Ctrl+V aqui..."
            className="w-full text-xs font-mono p-3 bg-white border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="mt-2 flex justify-end">
            <button
              onClick={handleParsePastedData}
              className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-md hover:bg-blue-700 shadow-sm"
            >
              Processar e Atualizar Tabela
            </button>
          </div>
        </div>
      )}

      {/* Resumo de Metadados do Dataset */}
      <div className="flex items-center justify-between text-xs text-slate-500 mb-3 pb-2 border-b border-slate-200">
        <div>
          Dataset Ativo: <strong className="text-slate-800">{dataset.name}</strong> • <strong>{dataset.rows.length}</strong> amostras • <strong>{dataset.columns.length}</strong> variáveis
        </div>
        <div className="text-[11px] text-slate-400">
          Dica: Você pode editar valores diretamente clicando nas células.
        </div>
      </div>

      {/* Tabela Interativa de Dados */}
      <div className="overflow-x-auto max-h-96 border border-slate-200 rounded-lg">
        <table className="w-full text-xs text-left">
          <thead className="bg-slate-100 text-slate-700 font-bold uppercase sticky top-0 z-10 text-[10px]">
            <tr>
              <th className="p-2.5 w-12 text-center text-slate-400">#</th>
              {dataset.columns.map(col => (
                <th key={col.key} className="p-2.5">
                  <div className="flex items-center justify-between gap-1">
                    <span>{col.name}</span>
                    <span className="text-[9px] font-normal px-1.5 py-0.2 bg-slate-200 text-slate-600 rounded">
                      {col.type === 'numeric' ? 'NUM' : 'TXT'}
                    </span>
                  </div>
                </th>
              ))}
              <th className="p-2.5 w-10 text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200 bg-white">
            {dataset.rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-slate-50">
                <td className="p-2 text-center text-slate-400 font-mono text-[11px]">{idx + 1}</td>
                {dataset.columns.map(col => (
                  <td key={col.key} className="p-1">
                    <input
                      type={col.type === 'numeric' ? 'number' : 'text'}
                      step="any"
                      value={row[col.key] ?? ''}
                      onChange={e => handleCellEdit(idx, col.key, e.target.value)}
                      className="w-full p-1 text-xs border border-transparent hover:border-slate-300 focus:border-blue-500 focus:bg-white rounded outline-none"
                    />
                  </td>
                ))}
                <td className="p-1 text-center">
                  <button
                    onClick={() => handleDeleteRow(idx)}
                    className="p-1 text-slate-300 hover:text-red-600 transition"
                    title="Excluir linha"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ToolContainer>
  );
};
