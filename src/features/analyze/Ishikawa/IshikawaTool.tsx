import React, { useState } from 'react';
import { IshikawaDiagram, IshikawaCause } from '../../../types/analyze';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2, Star, CheckCircle } from 'lucide-react';

interface IshikawaProps {
  onPromoteToHypothesis?: (causeText: string) => void;
}

const defaultCategories = ['Método', 'Máquina', 'Mão de Obra', 'Material', 'Medição', 'Meio Ambiente'];

export const IshikawaTool: React.FC<IshikawaProps> = ({ onPromoteToHypothesis }) => {
  const [diagram, setDiagram] = useState<IshikawaDiagram>(() => {
    const saved = localStorage.getItem('lss_ishikawa_diagram');
    if (saved) {
      try { return JSON.parse(saved); } catch {}
    }
    return {
      problem: 'Taxa Elevada de Rebarbas e Refugo na Estampagem',
      categories: defaultCategories,
      causes: [
        { id: '1', category: 'Método', text: 'Parâmetro de avanço de prensa descalibrado', subcauses: ['Falta de procedimento operacional padrão'], isPriority: true },
        { id: '2', category: 'Máquina', text: 'Folga excessiva entre punção e matriz', subcauses: ['Desgaste natural da ferramenta de corte'], isPriority: true },
        { id: '3', category: 'Mão de Obra', text: 'Troca de matrizes realizada sem checklist', subcauses: ['Falta de treinamento de novos operadores'], isPriority: false },
        { id: '4', category: 'Material', text: 'Variação na dureza das chapas SAE 1020', subcauses: ['Lote irregular do fornecedor de aço'], isPriority: true },
        { id: '5', category: 'Medição', text: 'Micrômetro com calibração vencida há 15 dias', subcauses: [], isPriority: false },
        { id: '6', category: 'Meio Ambiente', text: 'Temperatura elevada na prensa gerando dilatação térmica', subcauses: [], isPriority: false }
      ]
    };
  });

  const [newCauseCategory, setNewCauseCategory] = useState<string>(diagram.categories[0] || 'Método');
  const [newCauseText, setNewCauseText] = useState<string>('');
  const [saveNotify, setSaveNotify] = useState(false);

  const handleAddCause = () => {
    if (!newCauseText.trim()) return;
    const newCause: IshikawaCause = {
      id: Date.now().toString(),
      category: newCauseCategory,
      text: newCauseText.trim(),
      subcauses: [],
      isPriority: false
    };
    const updated = {
      ...diagram,
      causes: [...diagram.causes, newCause]
    };
    setDiagram(updated);
    setNewCauseText('');
    localStorage.setItem('lss_ishikawa_diagram', JSON.stringify(updated));
  };

  const handleTogglePriority = (id: string) => {
    const updated = {
      ...diagram,
      causes: diagram.causes.map(c => c.id === id ? { ...c, isPriority: !c.isPriority } : c)
    };
    setDiagram(updated);
    localStorage.setItem('lss_ishikawa_diagram', JSON.stringify(updated));
  };

  const handleDeleteCause = (id: string) => {
    const updated = {
      ...diagram,
      causes: diagram.causes.filter(c => c.id !== id)
    };
    setDiagram(updated);
    localStorage.setItem('lss_ishikawa_diagram', JSON.stringify(updated));
  };

  const handleSave = () => {
    localStorage.setItem('lss_ishikawa_diagram', JSON.stringify(diagram));
    setSaveNotify(true);
    setTimeout(() => setSaveNotify(false), 3000);
  };

  return (
    <ToolContainer
      title="Diagrama de Ishikawa (Causa e Efeito / Espinha de Peixe)"
      subtitle="Mapeamento visual e estruturação das causas raízes potenciais segundo a metodologia 6M"
      badge="ANALYZE 2.1"
      onSave={handleSave}
    >
      <div className="space-y-6">
        {saveNotify && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs rounded-lg flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600" />
            Diagrama de Ishikawa salvo com sucesso!
          </div>
        )}

        {/* Problema / Efeito Principal */}
        <div className="p-4 bg-slate-900 text-white rounded-xl shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400">Problema ou Efeito Investigado</span>
            <input
              type="text"
              value={diagram.problem}
              onChange={e => setDiagram({ ...diagram, problem: e.target.value })}
              className="w-full text-base font-bold bg-transparent border-b border-slate-700 focus:border-blue-400 focus:outline-none text-white mt-1"
            />
          </div>
          <div className="text-xs text-slate-400">
            {diagram.causes.length} causas identificadas • <strong className="text-amber-400">{diagram.causes.filter(c => c.isPriority).length} prioritárias</strong>
          </div>
        </div>

        {/* Formulário Rápido de Adição de Causas */}
        <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-center gap-2">
          <div className="w-full sm:w-44">
            <select
              value={newCauseCategory}
              onChange={e => setNewCauseCategory(e.target.value)}
              className="w-full text-xs font-semibold p-2 bg-white border border-slate-300 rounded"
            >
              {diagram.categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
          <input
            type="text"
            value={newCauseText}
            onChange={e => setNewCauseText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleAddCause()}
            placeholder="Digite uma causa potencial e pressione Enter ou clique em Adicionar..."
            className="flex-1 w-full text-xs p-2 bg-white border border-slate-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
          <button
            onClick={handleAddCause}
            className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded hover:bg-blue-700 transition flex items-center justify-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Causa
          </button>
        </div>

        {/* Renderização Visual do Ishikawa (Grade 6M) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {diagram.categories.map((category) => {
            const catCauses = diagram.causes.filter(c => c.category === category);
            return (
              <div key={category} className="bg-white border-2 border-slate-200 rounded-xl overflow-hidden shadow-sm flex flex-col">
                {/* Cabeçalho da Espinha 6M */}
                <div className="bg-slate-100 border-b border-slate-200 px-3 py-2 flex justify-between items-center">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-800">{category}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 bg-white border border-slate-200 rounded-full text-slate-600">
                    {catCauses.length}
                  </span>
                </div>

                {/* Lista de Causas da Categoria */}
                <div className="p-3 flex-1 space-y-2">
                  {catCauses.length === 0 ? (
                    <div className="text-[11px] text-slate-400 italic text-center py-4">Nenhuma causa associada</div>
                  ) : (
                    catCauses.map(cause => (
                      <div
                        key={cause.id}
                        className={`p-2.5 rounded-lg border text-xs transition ${
                          cause.isPriority
                            ? 'bg-amber-50/70 border-amber-300 shadow-xs'
                            : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span className={`font-semibold leading-tight ${cause.isPriority ? 'text-amber-950' : 'text-slate-800'}`}>
                            {cause.text}
                          </span>
                          <div className="flex items-center gap-1">
                            <button
                              onClick={() => handleTogglePriority(cause.id)}
                              className={`p-1 rounded ${cause.isPriority ? 'text-amber-600' : 'text-slate-300 hover:text-amber-500'}`}
                              title={cause.isPriority ? 'Causa Prioritária' : 'Marcar como Prioritária'}
                            >
                              <Star className="w-3.5 h-3.5 fill-current" />
                            </button>
                            <button
                              onClick={() => handleDeleteCause(cause.id)}
                              className="p-1 text-slate-300 hover:text-red-600"
                              title="Excluir Causa"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>

                        {/* Subcausas */}
                        {cause.subcauses && cause.subcauses.length > 0 && (
                          <div className="mt-1.5 pl-2 border-l-2 border-slate-300 space-y-1">
                            {cause.subcauses.map((sub, sIdx) => (
                              <div key={sIdx} className="text-[11px] text-slate-500 italic">
                                ↳ {sub}
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Botão de Envio para Hipótese de Validação */}
                        {onPromoteToHypothesis && (
                          <div className="mt-2 pt-1 border-t border-slate-200/60 flex justify-end">
                            <button
                              onClick={() => onPromoteToHypothesis(cause.text)}
                              className="text-[10px] font-bold text-blue-600 hover:text-blue-800 hover:underline"
                            >
                              + Investigar no Registro de Hipóteses
                            </button>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </ToolContainer>
  );
};
