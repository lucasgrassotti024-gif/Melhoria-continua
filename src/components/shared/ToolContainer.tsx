import React from 'react';
import { Printer, RotateCcw, Save } from 'lucide-react';

interface ToolContainerProps {
  title: string;
  subtitle: string;
  badge?: string;
  onSave?: () => void;
  onPrint?: () => void;
  onReset?: () => void;
  actions?: React.ReactNode;
  children: React.ReactNode;
}

export const ToolContainer: React.FC<ToolContainerProps> = ({
  title,
  subtitle,
  badge,
  onSave,
  onPrint,
  onReset,
  actions,
  children
}) => {
  const handlePrint = () => {
    if (onPrint) {
      onPrint();
    } else {
      window.print();
    }
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
      {/* Barra de Ações Superior */}
      <div className="border-b border-slate-200 px-6 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-bold text-slate-900">{title}</h2>
            {badge && (
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                {badge}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 mt-0.5">{subtitle}</p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          {actions}
          {onReset && (
            <button
              onClick={onReset}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-600 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition"
              title="Restaurar padrão"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Resetar
            </button>
          )}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 rounded-md hover:bg-slate-50 transition"
            title="Exportar ou Imprimir Documento"
          >
            <Printer className="w-3.5 h-3.5" />
            Imprimir / PDF
          </button>
          {onSave && (
            <button
              onClick={onSave}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 transition shadow-sm"
              title="Salvar alterações no projeto"
            >
              <Save className="w-3.5 h-3.5" />
              Salvar
            </button>
          )}
        </div>
      </div>

      {/* Conteúdo da Ferramenta */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};
