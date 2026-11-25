# REGRAS E METODOLOGIA DE GOVERNANÇA — ANTIGRAVITY

Este documento estabelece as diretrizes permanentes de governança e engenharia da plataforma profissional de Lean Six Sigma (DMAIC), em cumprimento ao **Prompt 01**.

---

## 1. PAPÉIS E RESPONSABILIDADES
- **USUÁRIO (Responsável pelo Projeto):** Define prioridades, aprova decisões técnicas e transmite relatórios entre ChatGPT e Antigravity.
- **CHATGPT (Planejamento e Coordenação):** Organiza requisitos, planeja fases/subfases, cria prompts técnicos e define os próximos passos.
- **ANTIGRAVITY (Execução Técnica):** Analisa contexto, implementa estritamente o escopo autorizado, executa testes, atualiza a documentação e produz relatórios técnicos estruturados.

---

## 2. FLUXO OBRIGATÓRIO DE DESENVOLVIMENTO
1. ChatGPT planeja a tarefa e requisitos.
2. Usuário envia o prompt ao Antigravity.
3. Antigravity analisa a estrutura existente e dependências.
4. Antigravity apresenta sua análise e planejamento.
5. Usuário fornece autorização explícita.
6. Antigravity implementa, roda testes e valida compilação.
7. Antigravity apresenta o Relatório de Execução padronizado.
8. Usuário encaminha o relatório ao ChatGPT.
9. ChatGPT valida e define o próximo passo.

---

## 3. PRINCÍPIOS ARQUITETURAIS E TÉCNICOS
1. **Ambiente de Trabalho Real (Não Educativo):** Foco estrito em geração de valor prático, ferramentas de produtividade, cálculos confiáveis e exportação de entregáveis.
2. **Cálculos Determinísticos:** Cálculos estatísticos e financeiros (médias, variâncias, $C_p/C_{pk}$, cartas de controle, FMEA, ROI/Payback) são 100% executados por código matemático reproduzível, sem aproximações de IA.
3. **Inteligência Artificial Responsável:** A IA auxilia em interpretação e sumarização com identificação clara de "Hipótese" ou "Sugestão". Nunca inventa dados ou afirma causas sem validação por evidências.
4. **Continuidade de Dados DMAIC:** Os dados e variáveis do Define e Measure transitam nativamente para Analyze, Improve e Control, evitando retrabalho e inconsistências.
5. **Infraestrutura Firebase:** Utilização exclusiva de Firebase (Auth, Firestore, Storage) quando aplicável; não utilizar Supabase. Credenciais nunca devem ser expostas.

---

## 4. PADRÕES DE QUALIDADE E TESTES
Antes de concluir qualquer subfase:
- Validação de tipos: `npx tsc --noEmit`
- Validação de build: `npm run build`
- Validação de integridade de layout, navegação e persistência.
