# Division 2 // Protocolo SHD — Build Planner & Item Tracker

[![React](https://img.shields.io/badge/React-19-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-8-purple.svg)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-cyan.svg)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> **Planejador de builds tático e rastreador de progresso de itens para Tom Clancy's The Division 2**, inspirado na interface holográfica do **ISAC / SHD Tech**, alimentado integralmente pela consagrada *The Division 2 Gear Spreadsheet* oficial da comunidade e com persistência de dados 100% local (offline-first).

---

## 📋 Sumário
- [Visão Geral](#-visão-geral)
- [Funcionalidades Principais](#-funcionalidades-principais)
  - [Tela 1: Criador de Builds](#tela-1-criador-de-builds)
  - [Tela 2: Tracker de Progresso](#tela-2-tracker-de-progresso)
  - [Tela 3: Builds Sugeridas (Meta Hub)](#tela-3-builds-sugeridas-meta-hub)
- [Integridade de Dados & Regras de Jogo](#-integridade-de-dados--regras-de-jogo)
- [Arquitetura Modular](#-arquitetura-modular)
- [Estrutura do Repositório](#-estrutura-do-repositório)
- [Instalação e Execução Local](#-instalação-e-execução-local)
- [Créditos e Agradecimentos](#-créditos-e-agradecimentos)
- [Aviso Legal](#-aviso-legal)

---

## 🎯 Visão Geral

O **Protocolo SHD** foi desenvolvido para resolver duas das maiores necessidades de jogadores de The Division 2:
1. **Planejar builds sem esforço**: saber exatamente quais talentos, atributos centrais (*Red/Blue/Yellow*) e secundários buscar para cada peça.
2. **Rastrear o progresso do farm**: acompanhar visualmente quais itens do inventário já foram obtidos e consultar diretamente na interface **o local exato de obtenção (Drop Source)** catalogado pela comunidade.

O sistema foi concebido sem dependência de bancos em nuvem fechados, mantendo todas as diretrizes e checklists salvos com segurança no armazenamento local do navegador (*LocalStorage / IndexedDB*).

---

## ⚡ Funcionalidades Principais

### Tela 1: Criador de Builds
- **12 Slots Táticos Oficiais**:
  - **Arsenal Ofensivo**: Arma Principal, Arma Secundária e Pistola (Arma Curta).
  - **Sistema de Blindagem e Proteção**: Máscara, Peitoral, Coldre, Mochila, Luvas e Joelheira.
  - **Módulos Táticos e Suporte**: Habilidade 1, Habilidade 2 e Especialização.
- **Sistema Dinâmico de Guias (Tabs)**:
  - Crie múltiplas builds com o botão `+ Nova Diretriz`.
  - Renomeie guias em tempo real (*inline*).
  - Duplique configurações com 1 clique para testar variantes.
  - Exclusão segura através do modal in-app **`DeleteBuildModal`** (sem uso de diálogos intrusivos do navegador).
- **Matriz de Frequência de Cores**:
  - Personalize a cor de cada guia com paletas táticas inspiradas nas facções e protocolos do jogo:
    - *Laranja Agente SHD* (`#FF6B00`)
    - *Vermelho Renegado Rogue* (`#EF4444`)
    - *Azul Federal JTF* (`#0284C7`)
    - *Verde Tático Sobrevivente* (`#10B981`)
    - *Âmbar Alerta Crítico* (`#F59E0B`)
    - *Ciano Diagnóstico ISAC* (`#06B6D4`)
    - *Roxo Alta Frequência* (`#A855F7`)
- **Contadores de Núcleos em Tempo Real**:
  - Resumo imediato da distribuição de atributos: **Vermelho (DPS)**, **Azul (Armadura)** e **Amarelo (Skill Tier)**.
- **Alerta de Conflito de Exóticos**:
  - Notificação em tela caso o jogador selecione mais de 1 arma exótica ou mais de 1 peça de armadura exótica equipada simultaneamente.

---

### Tela 2: Tracker de Progresso
- **Checklist Tático dos 12 Slots**:
  - Marque individualmente cada peça como `[ NO INVENTÁRIO ]` conforme as obtiver durante as sessões de farm.
  - Efeito visual de *dimming* e riscado tático para itens concluídos.
- **Barra de Progresso Segmentada (12 Blocos)**:
  - Cada item equivale a 8,33% da operação.
  - Indicador percentual dinâmico com herança direta da cor configurada na Tela 1.
  - Celebração com efeito de partículas ao completar 12/12 itens (`PROTOCOLO COMPLETO`).
- **Guia de Farm Destacado (Onde Farmar)**:
  - Cada cartão exibe em amarelo/âmbar o local de obtenção exato (*Mundo Aberto, Alvo Específico, Incursão Paradise Lost, Raids Dark Hours / Iron Horse, The Summit, Contagem Regressiva, Zona Cega, Projetos de Criação*).
- **Filtros Rápidos e Ações em Lote**:
  - Filtre por: `Todos (12)`, `Faltantes` ou `Adquiridos`.
  - Botões para `Marcar Todos` e `Resetar Checklist`.

---

### Tela 3: Builds Sugeridas (Meta Hub)
- **Diretrizes Oficiais Curadas da Comunidade**:
  - **Striker Meta All-Red DPS**: O padrão ouro para alto dano sustentado em Raids e Incursões (*St. Elmo's Engine + Coyote's Mask + 4 peças Striker*).
  - **Hunter's Fury CQC Run & Gun**: Combate próximo com escopeta, desorientação e regeneração contínua (*Scorpio + Memento + Hunter's Fury*).
  - **Eclipse Protocol CC**: Controle de multidões e dano por queimadura/choque em cadeia com espalhamento de 15m (*Capacitor + Máscara Vile + Eclipse 4pc*).
  - **Hotshot Headhunter One-Shot Sniper**: Eliminações em um único disparo na cabeça ultrapassando 25M de dano (*The White Death + Chainkiller + Hotshot 4pc*).
  - **Skill Damage AFK Drone & Turret**: Conclusão segura de missões no nível Lendário com dano automatizado (*Capacitor + Empress International 3pc + Waveform*).
  - **Foundry Bulwark Immortal Tank**: Linha de frente com escudo de 15 milhões de integridade e regeneração automática (*Liberty + Catharsis + Tardigrade*).
- **Botão `[ Montar na Tela 1 ]`**:
  - Transfere instantaneamente todos os 12 slots para uma nova guia no Criador de Builds e redireciona o usuário para edição ou rastreamento.

---

## 🔒 Integridade de Dados & Regras de Jogo

O sistema segue rigorosamente o contrato da planilha oficial:

1. **Atributos Fixos Bloqueados (`[ 🔒 FIXO ]`)**:
   - Em equipamentos **Exóticos** (*Coyote's Mask, Memento, Catharsis, Vile, Tardigrade, Waveform, BTSU, Sawyer's Kneepads*), os atributos secundários nativos são fixos e não podem ser adulterados.
   - Em itens **Nomeados** com atributos exclusivos (*Fox's Prayer com 8.0% DtTOOC, Contractor's Gloves com 8.0% DtA, Picaro's Holster com 15.0% Dano de Arma, The White Death com 137.0% HSD*), o atributo exclusivo é bloqueado e o slot secundário restante fica liberado para seleção.
2. **Diferenciação Rigorosa de Classes**:
   - **Armas**: Acesso apenas aos atributos da mesa de recalibração de armas (*Dano a Alvos Fora de Cobertura, Dano Crítico, Chance Crítica, Dano à Proteção, Cadência, etc.*).
   - **Equipamentos**: Acesso aos atributos de peças de proteção (*Chance Crítica, Dano Crítico, Tiro na Cabeça, Regeneração, Proteção contra Perigos, Resistência a Explosivos, Dano de Habilidade, Aceleração, Efeitos de Status, Reparo*).
   - **Gearsets vs. Brandsets**: Peças de Conjunto de Equipamento possuem **1 atributo secundário**, enquanto peças de Marca High-End possuem **2 atributos secundários**.

---

## 🏗 Arquitetura Modular

Os componentes da interface foram organizados em containers isolados com responsabilidade única:

```
src/
├── components/
│   ├── navigation/
│   │   └── BuildTabsContainer.tsx     # Guias, renomeação, duplicação e cores
│   ├── builder/
│   │   ├── BuildHeaderContainer.tsx   # Cabeçalho da diretriz e contadores de núcleos
│   │   ├── WeaponsSection.tsx         # Container do Arsenal Ofensivo (3 slots)
│   │   ├── GearSection.tsx            # Container de Blindagem e Proteção (6 slots)
│   │   └── SupportSection.tsx         # Container de Módulos Táticos e Specs (3 slots)
│   ├── tracker/
│   │   ├── TrackerFilterContainer.tsx # Filtros e ações em lote
│   │   ├── TrackerProgressContainer.tsx # Barra de 12 segmentos e comemoração 100%
│   │   └── TrackerCard.tsx            # Cartão de item com status e local de farm
│   ├── modals/
│   │   ├── DeleteBuildModal.tsx       # Modal seguro de confirmação de exclusão
│   │   └── SpreadsheetModal.tsx       # Modal de auditoria e créditos da planilha
│   ├── SlotCard.tsx                   # Seletor inteligente com busca e trava de atributos
│   ├── Header.tsx                     # Barra de status ISAC e navegação entre telas
│   ├── FooterCredits.tsx              # Rodapé com créditos à comunidade
│   ├── BuilderView.tsx                # Orquestrador da Tela 1
│   ├── TrackerView.tsx                # Orquestrador da Tela 2
│   └── SuggestedBuildsView.tsx        # Orquestrador da Tela 3
├── data/
│   └── divisionData.ts                # Base de dados verificada e builds meta
├── services/
│   └── storage.ts                     # Camada de persistência local tipada
├── types/
│   └── division.ts                    # Contratos de tipos TypeScript
├── App.tsx                            # Ponto de entrada da aplicação
├── main.tsx                           # Renderizador React DOM
└── index.css                          # Estilos globais e HUD The Division 2
```

---

## 🚀 Instalação e Execução Local

### Pré-requisitos
- [Node.js](https://nodejs.org/) versão 18 ou superior
- Gerenciador de pacotes `npm` ou `yarn`

### Passos

1. **Clonar o repositório**:
   ```bash
   git clone https://github.com/seu-usuario/division-2-shd-build-tracker.git
   cd division-2-shd-build-tracker
   ```

2. **Instalar dependências**:
   ```bash
   npm install
   ```

3. **Executar em modo de desenvolvimento**:
   ```bash
   npm run dev
   ```
   Acesse a aplicação no navegador em `http://localhost:3000` (ou na porta indicada no console).

4. **Compilar para produção**:
   ```bash
   npm run build
   ```

---

## 🎖 Créditos e Agradecimentos

Este projeto utiliza e credita com orgulho os dados da **The Division 2 Gear Spreadsheet**, referência global para a comunidade do jogo:

- **Autores & Curadores**: *Azurmen, Bend3n, Gingerbeard_x, Maplestruck e Saint Landwalker* (Comunidade do canal `#build-advice` no Discord oficial de The Division 2).
- **Contato para revisões e correções da planilha**: `ic3so` no Discord.

---

## ⚖️ Aviso Legal

*Tom Clancy's The Division 2*, logotipos e marcas associadas são propriedades intelectuais registradas da **Ubisoft Entertainment** e **Massive Entertainment**. Este projeto é uma ferramenta de apoio tático desenvolvida de fã para fãs, sem fins lucrativos e sem afiliação direta ou endosso por parte da Ubisoft.

---

*“Protocolo SHD Ativo. Conexão com o satélite ISAC restabelecida.”*
