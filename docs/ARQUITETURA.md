# Arquitetura Técnica — Plataforma Lean Six Sigma

## 1. Visão Geral da Arquitetura
A plataforma adota uma arquitetura em camadas, modular e fortemente tipada em TypeScript:

```
┌────────────────────────────────────────────────────────┐
│                   Apresentação (UI)                    │
│   - React 18+ com Tailwind CSS                         │
│   - Componentes corporativos (Radix UI / Lucide Icons) │
│   - Modos de visualização executiva (Relatórios A3)    │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                    Estado e Negócio                    │
│   - Context API / Zustand para estado de Projetos      │
│   - Motores matemáticos e estatísticos puros (No-IA)   │
│   - Processadores de planilhas e dados tabulares       │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│                   Persistência e Cloud                 │
│   - Firebase Auth (Autenticação)                       │
│   - Cloud Firestore (Modelos DMAIC estruturados)       │
│   - Firebase Storage (Datasets brutos e evidências)    │
└────────────────────────────────────────────────────────┘
```

## 2. Princípios de Dados
- **Rastreabilidade DMAIC:** Todas as entidades possuem relacionamento com o `projectId`.
- **Validação de Evidências:** Uma causa gerada no Ishikawa ou 5 Porquês só é classificada como *Validada* mediante evidência estatística ou teste de campo comprovado.
- **Cálculos Confiáveis:** Fórmulas matemáticas, de capabilidade e financeiras são determinísticas e testadas unitariamente.
