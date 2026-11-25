import React, { useState } from 'react';
import { SolutionIdea } from '../../../types/improve';
import { ToolContainer } from '../../../components/shared/ToolContainer';
import { Plus, Trash2, CheckCircle2, Zap } from 'lucide-react';

export const BrainstormingAndMatrixTool: React.FC = () => {
  const [solutions, setSolutions] = useState<SolutionIdea[]>([
    {
      id: '1',
      title: 'Dispositivo Poka-Yoke de Calibração Rápida da Folga da Matriz',
      description: 'Gabarito mecânico passa-não-passa acoplado à base da prensa para ajuste em menos de 2 minutos durante o setup.',
      category: 'Dispositivo / Poka-Yoke',
      relatedCause: 'Folga mecânica excessiva entre punção e matriz de corte',
      effort: 3,
      impact: 9,
      quadrant: 'Quick Win',
      selected: true
    },
    {
      id: '2',
      title: 'Protocolo de Homologação e Teste Rápido de Dureza no Recebimento',
      description: 'Durômetro portátil magnético com teste obrigatório de 3 pontos por fardo antes do descarregamento de aço.',
      category: 'Gestão de Fornecedores',
      relatedCause: 'Dureza do lote de chapas SAE 1020 acima de 65 HRB',
      effort: 2,
      impact: 8,
      quadrant: 'Quick Win',
      selected: true
    },
    {
      id: '3',
      title: 'Sensor a Laser para Medição Contínua de Rebarba em Linha',
      description: 'Sistema automatizado com câmera óptica para detecção instantânea com parada de linha.',
      category: 'Automação',
      relatedCause: 'Folga descalibrada e falta de detecção imediata',
      effort: 8,
      impact: 9,
      quadrant: 'Estratégico',
      selected: false
    },
    {
      id: '4',
      title: 'Novo Módulo de Treinamento Teórico em Sala de Aula',
      description: 'Curso de 8 horas sobre manutenção de prensas para operadores de todos os turnos.',
      category: 'Treinamento',
      relatedCause: 'Troca de matrizes realizada sem checklist',
      effort: 6,
      impact: 3,
      quadrant: 'Descartar',
      selected: false
    }
  ]);

  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Dispositivo / Poka-Yoke');
  const [newCause, setNewCause] = useState('Folga mecânica excessiva');
  const [newEffort, setNewEffort] = useState(5);
  const [newImpact, setNewImpact] = useState(7);

  const determineQuadrant = (effort: number, impact: number): 'Quick Win' | 'Estratégico' | 'Secundário' | 'Descartar' => {
    if (impact >= 6 && effort <= 5) return 'Quick Win';
    if (impact >= 6 && effort > 5) return 'Estratégico';
    if (impact < 6 && effort <= 5) return 'Secundário';
    return 'Descartar';
  };

  const handleAddSolution = () => {
    if (!newTitle.trim()) return;
    const quadrant = determineQuadrant(newEffort, newImpact);
    const newSol: SolutionIdea = {
      id: Date.now().toString(),
      title: newTitle.trim(),
      description: '',
      category: newCategory,
      relatedCause: newCause,
      effort: newEffort,
      impact: newImpact,
      quadrant,
      selected: quadrant === 'Quick Win'
    };
    setSolutions(prev => [...prev, newSol]);
    setNewTitle('');
  };

  const handleToggleSelected = (id: string) => {
    setSolutions(prev => prev.map(s => s.id === id ? { ...s, selected: !s.selected } : s));
  };

  const handleDelete = (id: string) => {
    setSolutions(prev => prev.filter(s => s.id !== id));
  };

  return (
    <ToolContainer
      title="Brainstorming de Soluções & Matriz Esforço x Impacto (2x2)"
      subtitle="Geração de alternativas de melhoria vinculadas às causas validadas e posicionamento cartesiano nos quadrantes de priorização"
      badge="IMPROVE 2.1 & 2.2"
    >
      <div className="space-y-8">
        {/* Formulário Rápido de Solução */}
        <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-purple-600" /> Cadastrar Solução Potencial de Melhoria
            </h4>
            <span className="text-xs text-slate-500">
              {solutions.length} soluções catalogadas • <strong className="text-emerald-700">{solutions.filter(s => s.selected).length} selecionadas</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Título da Proposta de Melhoria</label>
              <input
                type="text"
                value={newTitle}
                onChange={e => setNewTitle(e.target.value)}
                placeholder="Ex: Poka-Yoke mecânico de alinhamento..."
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded font-semibold focus:outline-none focus:ring-1 focus:ring-purple-500"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Categoria</label>
              <select
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="w-full text-xs p-2 bg-white border border-slate-300 rounded"
              >
                <option value="Dispositivo / Poka-Yoke">Dispositivo / Poka-Yoke</option>
                <option value="Automação">Automação</option>
                <option value="Método">Método / Procedimento</option>
                <option value="Gestão de Fornecedores">Gestão de Fornecedores</option>
                <option value="Treinamento">Treinamento</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
            <div className="md:col-span-2">
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Causa-Raiz Validada que Elimina</label>
              <input
                type="text"
                value={newCause}
                onChange={e => setNewCause(e.target.value)}
                className="w-full text-xs p-1.5 bg-white border border-slate-300 rounded"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Impacto Esperado (1 a 10): {newImpact}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newImpact}
                onChange={e => setNewImpact(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Esforço / Custo (1 a 10): {newEffort}</label>
              <input
                type="range"
                min="1"
                max="10"
                value={newEffort}
                onChange={e => setNewEffort(Number(e.target.value))}
                className="w-full accent-purple-600"
              />
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <button
              onClick={handleAddSolution}
              className="px-4 py-2 bg-purple-600 text-white text-xs font-semibold rounded hover:bg-purple-700 transition flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" /> Adicionar e Classificar na Matriz
            </button>
          </div>
        </div>

        {/* Matriz 2x2 Visual Esforço x Impacto */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 mb-3">
            Matriz Visual 2x2 (Posicionamento Estratégico de Soluções)
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Quadrante 1: Quick Wins */}
            <div className="p-4 rounded-xl border-2 border-emerald-300 bg-emerald-50/50 shadow-xs flex flex-col min-h-[160px]">
              <div className="flex items-center justify-between pb-2 border-b border-emerald-200">
                <span className="text-xs font-black uppercase text-emerald-900">
                  ⭐ Quick Wins (Ganhos Rápidos)
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded">
                  Alto Impacto / Baixo Esforço (Prioridade 1)
                </span>
              </div>
              <div className="mt-2 space-y-2 flex-1">
                {solutions.filter(s => s.quadrant === 'Quick Win').map(s => (
                  <div key={s.id} className="p-2.5 bg-white border border-emerald-200 rounded-lg text-xs flex justify-between items-center shadow-2xs">
                    <div>
                      <div className="font-bold text-slate-900">{s.title}</div>
                      <div className="text-[10px] text-slate-500">Causa: {s.relatedCause} • Impacto: {s.impact}/10 • Esforço: {s.effort}/10</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleSelected(s.id)}
                        className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 ${
                          s.selected ? 'bg-emerald-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {s.selected ? 'Selecionada' : 'Aprovar'}
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-1 text-slate-300 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quadrante 2: Projetos Estratégicos */}
            <div className="p-4 rounded-xl border-2 border-blue-300 bg-blue-50/50 shadow-xs flex flex-col min-h-[160px]">
              <div className="flex items-center justify-between pb-2 border-b border-blue-200">
                <span className="text-xs font-black uppercase text-blue-900">
                  🎯 Projetos Estratégicos (Alto Impacto / Alto Esforço)
                </span>
                <span className="text-[10px] font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded">
                  Exigem Investimento & Planejamento
                </span>
              </div>
              <div className="mt-2 space-y-2 flex-1">
                {solutions.filter(s => s.quadrant === 'Estratégico').map(s => (
                  <div key={s.id} className="p-2.5 bg-white border border-blue-200 rounded-lg text-xs flex justify-between items-center shadow-2xs">
                    <div>
                      <div className="font-bold text-slate-900">{s.title}</div>
                      <div className="text-[10px] text-slate-500">Causa: {s.relatedCause} • Impacto: {s.impact}/10 • Esforço: {s.effort}/10</div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleToggleSelected(s.id)}
                        className={`p-1.5 rounded text-xs font-bold flex items-center gap-1 ${
                          s.selected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        {s.selected ? 'Selecionada' : 'Aprovar'}
                      </button>
                      <button onClick={() => handleDelete(s.id)} className="p-1 text-slate-300 hover:text-red-600">
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quadrante 3: Secundários */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 shadow-xs flex flex-col min-h-[140px]">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                <span className="text-xs font-bold uppercase text-slate-700">
                  🔧 Tarefas Secundárias (Baixo Impacto / Baixo Esforço)
                </span>
                <span className="text-[10px] text-slate-500">Fazer quando houver folga</span>
              </div>
              <div className="mt-2 space-y-2 flex-1">
                {solutions.filter(s => s.quadrant === 'Secundário').map(s => (
                  <div key={s.id} className="p-2 bg-white border border-slate-200 rounded text-xs flex justify-between items-center">
                    <span className="font-semibold text-slate-800">{s.title}</span>
                    <button onClick={() => handleDelete(s.id)} className="p-1 text-slate-300 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quadrante 4: Descartar */}
            <div className="p-4 rounded-xl border border-red-200 bg-red-50/40 shadow-xs flex flex-col min-h-[140px]">
              <div className="flex items-center justify-between pb-2 border-b border-red-200">
                <span className="text-xs font-bold uppercase text-red-800">
                  ⛔ Descartar / Evitar (Baixo Impacto / Alto Esforço)
                </span>
                <span className="text-[10px] text-red-700">Consomem recursos sem retorno</span>
              </div>
              <div className="mt-2 space-y-2 flex-1">
                {solutions.filter(s => s.quadrant === 'Descartar').map(s => (
                  <div key={s.id} className="p-2 bg-white border border-red-200 rounded text-xs flex justify-between items-center">
                    <span className="text-slate-600 line-through">{s.title}</span>
                    <button onClick={() => handleDelete(s.id)} className="p-1 text-slate-300 hover:text-red-600">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </ToolContainer>
  );
};
