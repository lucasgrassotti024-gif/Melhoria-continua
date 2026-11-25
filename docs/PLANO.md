# Plano de Desenvolvimento — Plataforma Lean Six Sigma

Este documento registra as fases e subfases de implementação da plataforma.

---

## Fase 0: Setup, Governança & Arquitetura Base
- [x] Inicialização do repositório Git
- [x] Criação dos documentos de governança (`AGENTS.md`, `README.md`, `docs/*`)
- [ ] Inicialização da aplicação React + TypeScript + Vite + Tailwind CSS
- [ ] Estruturação do layout global corporativo (Sidebar, Header DMAIC, rotas base)
- [ ] Implementação do modelo unificado de dados (`Project`, `DMAICState`) e Contexto Global
- [ ] Validação de compilação e build sem erros

---

## Fase 1: Módulo DEFINE (Prompt 03)
- [ ] **Subfase 1.1:** Painel da etapa DEFINE e Construtor de Project Charter (Editor + Documento A3)
- [ ] **Subfase 1.2:** Construtor visual de SIPOC interativo e Matriz de Stakeholders
- [ ] **Subfase 1.3:** Registro de Voice of Customer (VOC), Árvore CTQ e Limites de Escopo
- [ ] **Subfase 1.4:** Plano de Ação 5W2H preliminar e integração de dados do projeto

---

## Fase 2: Módulo MEASURE (Prompt 04)
- [ ] **Subfase 2.1:** Central de Ingestão de Dados (Colar Excel `Ctrl+V`, importação CSV/XLSX e grid editável)
- [ ] **Subfase 2.2:** Motor de Estatística Descritiva determinístico e Testes de Normalidade
- [ ] **Subfase 2.3:** Gerador Gráfico (Pareto com duplo eixo, Histograma com curva, Boxplot, Dispersão)
- [ ] **Subfase 2.4:** Análise de Capacidade do Processo ($C_p, C_{pk}, P_p, P_{pk}$) com verificação de premissas
- [ ] **Subfase 2.5:** MSA / Gage R&R e Plano de Coleta de Dados

---

## Fase 3: Módulo ANALYZE (Prompt 05)
- [ ] **Subfase 3.1:** Diagrama de Ishikawa visual e interativo (6M e categorias personalizadas)
- [ ] **Subfase 3.2:** Investigação estruturada dos 5 Porquês e Matriz Causa e Efeito ponderada
- [ ] **Subfase 3.3:** Registro Central de Causas e Hub de Validação por Evidências (Hipótese vs. Fato)
- [ ] **Subfase 3.4:** FMEA com RPN e Action Priority
- [ ] **Subfase 3.5:** Motor estatístico para Correlação, Regressão Linear e ANOVA

---

## Fase 4: Módulo IMPROVE (Prompt 06)
- [ ] **Subfase 4.1:** Brainstorming de Soluções vinculado às causas validadas
- [ ] **Subfase 4.2:** Matriz Esforço x Impacto (2x2 interativa) e Matriz de Priorização Ponderada
- [ ] **Subfase 4.3:** Gerenciador Executivo de Ações 5W2H com status e prazos
- [ ] **Subfase 4.4:** Fichas de Testes Piloto e Simulador de Cenários
- [ ] **Subfase 4.5:** Calculadora Financeira Determinística (ROI, Payback e Economia Anual)

---

## Fase 5: Módulo CONTROL (Prompt 07)
- [ ] **Subfase 5.1:** Construtor e gestor do Plano de Controle Operacional
- [ ] **Subfase 5.2:** Motor Estatístico de Cartas de Controle ($I\text{-}MR, \bar{X}\text{-}R, p, np, c, u$) com regras de causas especiais
- [ ] **Subfase 5.3:** Dashboard de Indicadores e Sistema de Alertas
- [ ] **Subfase 5.4:** Comparador Antes x Depois com Teste de Hipótese (Significância Estatística) e Padronização (POPs)
- [ ] **Subfase 5.5:** Gerador de Relatório Final Executivo Consolidado DMAIC (Exportação PDF)
