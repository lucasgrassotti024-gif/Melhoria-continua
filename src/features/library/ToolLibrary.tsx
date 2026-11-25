import React, { useState } from 'react';
import { useProject } from '../../context/ProjectContext';
import { DMAICPhase } from '../../types/project';
import { Search, ArrowRight } from 'lucide-react';

interface ToolItem {
  name: string;
  phase: DMAICPhase;
  phaseLabel: string;
  description: string;
  tag: string;
}

const toolsCatalog: ToolItem[] = [
  // DEFINE
  { name: 'Project Charter', phase: 'define', phaseLabel: 'DEFINE', description: 'Contrato formal de melhoria com problema, metas quantitativas, escopo e equipe.', tag: 'Estratégico' },
  { name: 'SIPOC Diagram', phase: 'define', phaseLabel: 'DEFINE', description: 'Mapeamento visual de alto nível: Suppliers, Inputs, Process, Outputs e Customers.', tag: 'Processos' },
  { name: 'Voice of Customer (VOC)', phase: 'define', phaseLabel: 'DEFINE', description: 'Estruturação das dores, necessidades e expectativas dos clientes.', tag: 'Cliente' },
  { name: 'Árvore CTQ', phase: 'define', phaseLabel: 'DEFINE', description: 'Desdobramento de requisitos críticos para a qualidade até métricas mensuráveis.', tag: 'Qualidade' },
  { name: 'Matriz de Stakeholders', phase: 'define', phaseLabel: 'DEFINE', description: 'Análise de Poder x Interesse e estratégia de comunicação do projeto.', tag: 'Governança' },
  
  // MEASURE
  { name: 'Central de Ingestão de Dados', phase: 'measure', phaseLabel: 'MEASURE', description: 'Entrada de dados por colagem Excel (Ctrl+V), upload CSV ou edição direta no DataGrid.', tag: 'Dados' },
  { name: 'Estatística Descritiva', phase: 'measure', phaseLabel: 'MEASURE', description: 'Cálculo determinístico de média, desvio padrão, mediana, variância e assimetria.', tag: 'Estatística' },
  { name: 'Capacidade do Processo (Cp, Cpk)', phase: 'measure', phaseLabel: 'MEASURE', description: 'Adequação da variação natural do processo aos limites de especificação do cliente.', tag: 'Capacidade' },
  { name: 'Diagrama de Pareto (80/20)', phase: 'measure', phaseLabel: 'MEASURE', description: 'Priorização dos modos de falha por frequência decrescente e curva acumulada.', tag: 'Gráficos' },
  { name: 'Histograma de Frequências', phase: 'measure', phaseLabel: 'MEASURE', description: 'Distribuição empírica dos dados contínuos com classes automáticas.', tag: 'Distribuição' },
  { name: 'MSA / Gage R&R', phase: 'measure', phaseLabel: 'MEASURE', description: 'Estudo de repetibilidade e reprodutibilidade do sistema de medição.', tag: 'Metrologia' },
  { name: 'Plano de Coleta de Dados', phase: 'measure', phaseLabel: 'MEASURE', description: 'Definições operacionais, frequências e amostragem padronizada.', tag: 'Coleta' },

  // ANALYZE
  { name: 'Diagrama de Ishikawa (6M)', phase: 'analyze', phaseLabel: 'ANALYZE', description: 'Espinha de peixe para investigação causal dividida nos 6 fatores industriais.', tag: 'Causalidade' },
  { name: '5 Porquês com Evidências', phase: 'analyze', phaseLabel: 'ANALYZE', description: 'Investigação sequencial profunda suportada por laudos e verificações.', tag: 'Causa-Raiz' },
  { name: 'Matriz Causa e Efeito (X-Y)', phase: 'analyze', phaseLabel: 'ANALYZE', description: 'Correlação ponderada entre variáveis de processo (X) e requisitos do cliente (Y).', tag: 'Priorização' },
  { name: 'FMEA de Processo', phase: 'analyze', phaseLabel: 'ANALYZE', description: 'Análise de modos de falha com cálculo de RPN e Action Priority antes e depois.', tag: 'Risco' },
  { name: 'Hub de Validação de Causas', phase: 'analyze', phaseLabel: 'ANALYZE', description: 'Gestão formal do ciclo de hipóteses até a comprovação por evidências.', tag: 'Validação' },

  // IMPROVE
  { name: 'Brainstorming de Soluções', phase: 'improve', phaseLabel: 'IMPROVE', description: 'Geração de melhorias vinculadas diretamente às causas-raiz validadas.', tag: 'Ideação' },
  { name: 'Matriz Esforço x Impacto (2x2)', phase: 'improve', phaseLabel: 'IMPROVE', description: 'Classificação cartesiana das alternativas: Quick Wins, Estratégicos e Descartar.', tag: 'Seleção' },
  { name: 'Plano de Ação 5W2H Executivo', phase: 'improve', phaseLabel: 'IMPROVE', description: 'Detalhamento operacional com cronograma, custos orçados e realizados.', tag: 'Execução' },
  { name: 'Testes Piloto', phase: 'improve', phaseLabel: 'IMPROVE', description: 'Registro de experimentos controlados comparando linha de base com o teste.', tag: 'Testes' },
  { name: 'Simulador de Cenários', phase: 'improve', phaseLabel: 'IMPROVE', description: 'Simulação interativa de sensibilidade e projeção de economia.', tag: 'Simulação' },
  { name: 'Calculadora de ROI / Payback', phase: 'improve', phaseLabel: 'IMPROVE', description: 'Memória de cálculo determinística de retorno de investimento e ganhos anuais.', tag: 'Financeiro' },

  // CONTROL
  { name: 'Plano de Controle Operacional', phase: 'control', phaseLabel: 'CONTROL', description: 'Definição de parâmetros, frequências de checagem e planos de reação rápida.', tag: 'Sustentação' },
  { name: 'Cartas de Controle SPC (I-MR)', phase: 'control', phaseLabel: 'CONTROL', description: 'Monitoramento contínuo de estabilidade com limites de 3 sigma e regras Nelson.', tag: 'CEP / SPC' },
  { name: 'Comparador Antes vs. Depois', phase: 'control', phaseLabel: 'CONTROL', description: 'Validação estatística do ganho do projeto com teste t de significância.', tag: 'Verificação' },
  { name: 'Procedimentos Padrão (POPs)', phase: 'control', phaseLabel: 'CONTROL', description: 'Normatização e auditorias periódicas para perenizar o resultado.', tag: 'Padrões' },
  { name: 'Relatório Final Executivo DMAIC', phase: 'control', phaseLabel: 'CONTROL', description: 'Dossiê compilado de encerramento do projeto com exportação oficial em PDF.', tag: 'Dossiê' }
];

interface ToolLibraryProps {
  onOpenTool: (phase: DMAICPhase) => void;
}

export const ToolLibrary: React.FC<ToolLibraryProps> = ({ onOpenTool }) => {
  const { setCurrentPhase } = useProject();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPhaseFilter, setSelectedPhaseFilter] = useState<'all' | DMAICPhase>('all');

  const filteredTools = toolsCatalog.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          tool.tag.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPhase = selectedPhaseFilter === 'all' || tool.phase === selectedPhaseFilter;
    return matchesSearch && matchesPhase;
  });

  const handleSelectTool = (phase: DMAICPhase) => {
    setCurrentPhase(phase);
    onOpenTool(phase);
  };

  return (
    <div className="space-y-6">
      {/* Cabeçalho da Biblioteca */}
      <div className="p-6 bg-slate-900 text-white rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm">
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-emerald-400 bg-slate-800 px-2.5 py-0.5 rounded border border-slate-700">
            BIBLIOTECA CORPORATIVA DE FERRAMENTAS
          </span>
          <h2 className="text-2xl font-black mt-2">Catálogo Completo Lean Six Sigma (26 Ferramentas)</h2>
          <p className="text-xs text-slate-400 mt-1">
            Acesso direto a qualquer ferramenta das 5 fases do ciclo DMAIC.
          </p>
        </div>

        {/* Busca Rápida */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            placeholder="Buscar por nome, método ou tag..."
            className="w-full pl-9 pr-3 py-2 bg-slate-800 border border-slate-700 text-white rounded-xl text-xs placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
        </div>
      </div>

      {/* Filtros por Fase DMAIC */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <button
          onClick={() => setSelectedPhaseFilter('all')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            selectedPhaseFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50'
          }`}
        >
          Todas ({toolsCatalog.length})
        </button>
        <button
          onClick={() => setSelectedPhaseFilter('define')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            selectedPhaseFilter === 'define' ? 'bg-blue-600 text-white' : 'bg-white border border-slate-200 text-blue-700 hover:bg-blue-50'
          }`}
        >
          Define (5)
        </button>
        <button
          onClick={() => setSelectedPhaseFilter('measure')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            selectedPhaseFilter === 'measure' ? 'bg-emerald-600 text-white' : 'bg-white border border-slate-200 text-emerald-700 hover:bg-emerald-50'
          }`}
        >
          Measure (7)
        </button>
        <button
          onClick={() => setSelectedPhaseFilter('analyze')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            selectedPhaseFilter === 'analyze' ? 'bg-amber-600 text-white' : 'bg-white border border-slate-200 text-amber-700 hover:bg-amber-50'
          }`}
        >
          Analyze (5)
        </button>
        <button
          onClick={() => setSelectedPhaseFilter('improve')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            selectedPhaseFilter === 'improve' ? 'bg-purple-600 text-white' : 'bg-white border border-slate-200 text-purple-700 hover:bg-purple-50'
          }`}
        >
          Improve (5)
        </button>
        <button
          onClick={() => setSelectedPhaseFilter('control')}
          className={`px-3 py-1.5 rounded-lg font-bold transition ${
            selectedPhaseFilter === 'control' ? 'bg-red-600 text-white' : 'bg-white border border-slate-200 text-red-700 hover:bg-red-50'
          }`}
        >
          Control (4)
        </button>
      </div>

      {/* Grade de Ferramentas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredTools.map((tool, idx) => (
          <div
            key={idx}
            className="p-5 bg-white border border-slate-200 rounded-2xl hover:border-slate-300 transition shadow-2xs flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                  tool.phase === 'define' ? 'bg-blue-100 text-blue-800' :
                  tool.phase === 'measure' ? 'bg-emerald-100 text-emerald-800' :
                  tool.phase === 'analyze' ? 'bg-amber-100 text-amber-800' :
                  tool.phase === 'improve' ? 'bg-purple-100 text-purple-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {tool.phaseLabel}
                </span>
                <span className="text-[10px] text-slate-400 font-mono bg-slate-50 px-2 py-0.5 rounded border border-slate-200">
                  {tool.tag}
                </span>
              </div>
              <h4 className="text-sm font-bold text-slate-900 mt-1">{tool.name}</h4>
              <p className="text-xs text-slate-500 mt-1.5 leading-relaxed">{tool.description}</p>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex justify-end">
              <button
                onClick={() => handleSelectTool(tool.phase)}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 group"
              >
                Abrir Ferramenta <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
