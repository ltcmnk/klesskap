# KLESSKAP

> **Sistema de PDV e gestão de estoque para varejo de moda** — do norueguês *klesskap* (guarda-roupa): organização elegante de cada peça.

![Versão](https://img.shields.io/badge/versão-3.1-7C6E5C?style=flat-square)
![Status](https://img.shields.io/badge/status-Sprint%204-B8B2AA?style=flat-square)
![Stack](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-1C1814?style=flat-square)
![Equipe](https://img.shields.io/badge/equipe-Valkiria%20Inc.-5A534A?style=flat-square)
[![Spec](https://img.shields.io/badge/spec-PDF%20v3.0-7C6E5C?style=flat-square)](klesskap.pdf)

**Demo ao vivo:** https://klesskap-eight.vercel.app
**Repositório:** https://github.com/ltcmnk/klesskap

---

## Sobre o projeto

Klesskap é um sistema web de ponto de venda (PDV) e controle de estoque desenvolvido para lojas de varejo de moda de pequeno e médio porte. O sistema centraliza em uma única interface as operações que costumam ser tratadas de forma fragmentada — planilhas para estoque, calculadora para troco, caderno para comissões — e oferece um fluxo coeso do recebimento de mercadoria até o fechamento de caixa.

O problema que o Klesskap resolve é concreto: lojas de moda lidam com um catálogo complexo por natureza, onde cada produto existe em múltiplas combinações de tamanho e cor. Controlar esse nível de granularidade manualmente é propenso a erros — venda de item sem estoque, divergência entre o que entrou e o que foi vendido, comissões calculadas de cabeça. O sistema trata cada variação (ex: Blazer Alfaiataria, Off White / M) como uma unidade independente, com SKU, código de barras, estoque mínimo e preço próprios.

O projeto foi construído como protótipo funcional para validação de fluxos operacionais. Todos os dados são simulados em memória — não há servidor nem banco de dados. O foco está na experiência de uso das três personas principais: a proprietária (que gerencia tudo), o responsável pelo estoque (recebimento e cadastro) e o operador de caixa (PDV e pagamento).

---

## Documentação técnica

A especificação completa está em [`klesskap.pdf`](klesskap.pdf)
— Valkiria Inc., v3.0, Sprint 4, 11/06/2026.

### Requisitos funcionais (RQ01–RQ11)

| ID | Requisito | Perfil |
|---|---|---|
| RQ01 | Cadastro de produtos com categoria, numeração, estação, tecido e referência de fábrica | Gerente de Estoque |
| RQ02 | Entrada de mercadorias com referências de fábrica e geração de código de barras | Gerente de Estoque |
| RQ03 | Gerenciamento de promoções com leitor de código de barras | Proprietário |
| RQ04 | Relatórios financeiros: fechamento de caixa, vendas por vendedor, fiscal | Proprietário |
| RQ05 | Notificações automáticas ao atingir estoque mínimo | Proprietário |
| RQ06 | Divisão de comissão de uma venda entre dois vendedores | Proprietário |
| RQ07 | Dashboard em tempo real: total de vendas do dia e alertas de estoque | Proprietário |
| RQ08 | Autenticação por e-mail e senha com bloqueio sem credenciais válidas | Proprietário |
| RQ09 | Visualização por nível de acesso: Proprietário/Admin, Gerente de Estoque, Operador/Vendedor | Proprietário |
| RQ10 | Pagamentos: Dinheiro, Cartão de Crédito, Cartão de Débito e Pix | Proprietário / Vendedor |
| RQ11 | Parcelamento no cartão de crédito com configuração do número máximo de parcelas | Proprietário |

### Requisitos não funcionais (RQN01–RQN08)

| ID | Requisito | Categoria FURPS+ |
|---|---|---|
| RQN01 | Responsivo para desktop e dispositivos móveis | Usability |
| RQN02 | Interface intuitiva com esquemas de cores para diferentes módulos | Usability |
| RQN03 | Leve e otimizado, com carregamento rápido das telas | Performance |
| RQN04 | Arquitetura baseada em nuvem para acesso remoto | Constraints/Architecture |
| RQN05 | Restrição de acesso a dados sensíveis (custo, lucro, relatórios) por perfil | Functionality/Security |
| RQN06 | Feedback visual em tempo real para vendas, descontos, estoque e status | Usability |
| RQN07 | Interface consistente, responsiva e alinhada ao varejo de moda | Usability |
| RQN08 | Arquitetura modular para expansão futura | Supportability |

### Modelagem UML

O documento inclui os seguintes diagramas:

- **Caso de Uso** — atores: Vendedor, Gerente de Estoque, Proprietário e Banco; 9 casos principais
- **Classes** — entidades: Usuário, Venda, ItemVenda, Produto, Categoria, ReferênciaFabrica, Pagamento, Financeiro, Relatório, Movimentação
- **Objetos** — fluxo completo de venda compartilhada com dois vendedores
- **Sequência** — 5 diagramas: Login, Frente de Caixa (PDV), Fluxo Financeiro (Pagamento), Entrada de Mercadoria, Relatórios Financeiros
- **Atividade** — 3 diagramas: Processo de Venda e Pagamento, Entrada de Mercadorias no Estoque, Geração do Dashboard em Tempo Real
- **Estados** — ciclo de vida da entidade Venda: *Em andamento → Aguardando pagamento → Concluída / Cancelada*

---

## Funcionalidades principais

### Dashboard
- Métricas do dia em tempo real: total de vendas, número de transações, ticket médio e alertas de estoque
- Gráfico de barras com o volume de vendas dos últimos 7 dias
- Painel de alertas de estoque mínimo com ação rápida de reposição
- Tabela das últimas vendas com vendedor, método de pagamento e status

### Catálogo de Produtos
- Listagem com filtros combinados por categoria, tamanho, status de estoque e busca por texto (nome, referência, SKU, código de barras)
- Expansão inline de grade de variações (tamanho × cor) diretamente na tabela
- Cada variação exibe: SKU, código de barras, estoque atual, estoque mínimo, preço e status
- Indicadores visuais de estoque crítico (zerado ou abaixo do mínimo) e estoque baixo

### Cadastro de Produto
- Formulário com campos de nome, categoria, tecido, estação, referência e descrição
- **Categoria dinâmica:** combo-box com busca; ao digitar um nome que não existe, a opção "+ Criar categoria" é exibida e a nova categoria fica disponível em todo o sistema
- Grade interativa de variações: eixo tamanho × eixo cor, com ativação de célula por clique
- **Tamanho e cor inline:** botões "+ Tamanho" e "+ Cor" abrem um input inline na própria grade — sem modal — para adicionar novas opções que ficam disponíveis globalmente
- Geração automática de SKU a partir da referência, tamanho e cor
- Geração de código de barras (EAN-13 simulado) para cada variação
- Campos de preço de venda e custo unitário (visíveis apenas para perfis Admin e Estoque)
- **Duplicar produto:** botão na linha do catálogo abre o formulário pré-preenchido com todos os dados do original (nome com sufixo "cópia", referência limpa, estoque zerado)

### Entrada de Mercadoria
- Busca de produto por nome, referência de fábrica, SKU ou código de barras (parcial, case-insensitive)
- Entrada de quantidade por variação individual (cada combinação tamanho/cor separada)
- **Adição de nova variação diretamente na tela de entrada:** ao receber um lote com cor ou tamanho inédito, é possível cadastrar a nova variação inline (campos de tamanho, cor e quantidade), sem sair da tela — a variação é criada no produto e o estoque é lançado imediatamente
- Seleção do responsável pelo recebimento (equipe de estoque cadastrada)
- Atualização do estoque e recálculo automático do status (normal / baixo / crítico)
- Histórico de movimentações com tipo (entrada/saída), variação, quantidade e data

### PDV — Frente de Caixa
- Busca de produto por nome, referência de fábrica, SKU ou código de barras (parcial, case-insensitive; buscar pelo barcode de uma variação específica retorna o produto pai)
- Seleção de variação com picker visual (tamanho → cor), bloqueando automaticamente variações sem estoque
- Carrinho com controle de quantidade (respeita limite de estoque disponível) e remoção de itens
- Seleção de vendedor principal com opção de divisão de comissão entre dois vendedores
- Cálculo automático de comissão individual (3%) com exibição do rateio em tempo real

### Pagamentos
- Métodos disponíveis: Dinheiro, Pix, Cartão de Crédito e Cartão de Débito
- Parcelamento no crédito: 1×, 2×, 3×, 4×, 5×, 6×, 10× ou 12×, com exibição do valor por parcela
- Calculadora de troco para pagamentos em dinheiro
- Processamento simulado com feedback de progresso e emissão de recibo
- Recibo com detalhamento de itens, método, vendedor(es), comissão e ID da venda

### Relatórios
- **Financeiro:** listagem completa de vendas com ID, horário, método e total
- **Vendas por Vendedor:** volume e comissão por vendedor com divisão de vendas compartilhadas
- **Fechamento de Caixa:** total por método de pagamento (dinheiro, Pix, crédito, débito)
- **Fiscal:** nota/cupom com número, data, valor e status de emissão
- Seletor de período (Hoje / Esta Semana / Este Mês) e intervalo por data

### Promoções
- Cadastro de promoções com nome, escopo, percentual ou valor de desconto e período de vigência
- Ativação e desativação por toggle diretamente na listagem

### Gestão de Usuários
- Tabela de usuários com nome, e-mail, perfil e status
- Ativação e desativação de usuários por toggle
- Proteção contra auto-desativação (um usuário não pode desativar a própria conta)

---

## Perfis de acesso

O sistema possui três perfis com visibilidades distintas. A navegação lateral é renderizada dinamicamente conforme o perfil autenticado.

| Perfil | Telas acessíveis | Dados sensíveis |
|---|---|---|
| **Proprietário / Admin** | Todas (Dashboard, Catálogo, Novo Produto, Entrada, PDV, Relatórios, Promoções, Usuários) | Custo unitário, margens, comissões, relatório financeiro completo |
| **Gerente de Estoque** | Dashboard, Catálogo, Novo Produto, Entrada de Mercadoria | Custo unitário e preço de venda |
| **Operador / Vendas** | Dashboard, PDV, Vendas do Dia | Preço de venda |

### Credenciais de demonstração

> ⚠️ Estas credenciais existem exclusivamente para fins de prototipação. Não representam dados reais e devem ser removidas antes de qualquer uso em produção.

| Perfil | E-mail | Senha |
|---|---|---|
| Proprietário / Admin | `admin@klesskap.com` | `admin123` |
| Terminal de Estoque | `estoque@klesskap.com` | `estoque123` |
| Terminal de Vendas | `vendas@klesskap.com` | `vendas123` |

A tela de login oferece chips de acesso rápido que preenchem as credenciais automaticamente, facilitando a navegação durante a demonstração.

---

## Stack técnica

O projeto é intencionalmente sem dependências de pacote ou etapa de build. Tudo roda diretamente no navegador.

| Camada | Tecnologia | Observação |
|---|---|---|
| Marcação | HTML5 semântico | Estrutura estática em `index.html` |
| Estilos base | CSS custom (`klesskap.css`) | Design tokens em variáveis CSS, componentes e animações |
| Utilitários | Tailwind CSS via CDN | Configuração inline no `<head>` com paleta e tipografia customizadas |
| Lógica | JavaScript vanilla ES6+ | `klesskap.js`, sem framework, sem módulos externos |
| Tipografia | Google Fonts | DM Serif Display (display/títulos), DM Sans (UI/operacional), JetBrains Mono (dados/mono) |
| Ícones | SVG inline | Gerados via função `svgIcon()` em JavaScript, sem biblioteca externa |

**Sobre o `klesskap.css`:** o arquivo define um sistema de tokens completo em `:root` — paleta, sombras, easing curves, fontes — e implementa todos os componentes da interface (cards, tabelas, botões, inputs, badges, modal, toast, toggle, tabs, PDV, pagamento). O Tailwind serve apenas para utilitários de layout e espaçamento; os componentes com identidade visual são inteiramente definidos no CSS próprio.

---

## Estrutura do projeto

```
klesskap/
├── index.html        # Estrutura HTML completa — shell do app e tela de login
├── klesskap.css      # Sistema de design: tokens, layout, componentes, animações
├── klesskap.js       # Dados mock, estado global, lógica de negócio e renderização de todas as telas
├── PRODUCT.md        # Contexto de produto: propósito, usuários, princípios de design
├── DESIGN.md         # Sistema de design: paleta, tipografia, elevação, motion
└── README.md         # Este arquivo
```

### Responsabilidades de cada arquivo

**`index.html`** — Define o shell estático da aplicação: tela de login (com campos, chips de acesso rápido e mensagem de erro), estrutura do app (sidebar, header, zona de busca, zona de ações) e os containers de cada tela (`<section id="screen-*">`). O conteúdo de cada tela é injetado dinamicamente pelo JavaScript.

**`klesskap.css`** — Importa as fontes, define os tokens de design como variáveis CSS, e implementa todos os componentes: layout do app shell, navegação lateral, header, botões, inputs, badges, cards, tabelas, modal, toast, toggle, tabs, PDV (picker de variação, carrinho), pagamento e animações (`fade-in`, `fade-in-scale`, `toast-in`, `toast-out`, `expand-down`).

**`klesskap.js`** — Contém os dados mock (produtos, vendas, usuários, promoções), o estado global da aplicação (`appState`), os utilitários (formatação de moeda, data, cálculo de status) e todas as funções de renderização e lógica de negócio para cada módulo. Estruturado em três partes: dados/estado/nav/login, dashboard/catálogo/form/entrada, e PDV/pagamento/relatórios/promoções/usuários.

---

## Como executar

O Klesskap é um projeto completamente estático. Não requer servidor, instalação de dependências ou etapa de compilação.

### Abertura direta

```bash
# Clone o repositório
git clone <url-do-repositório>
cd klesskap

# Abra no navegador
open index.html          # macOS
xdg-open index.html      # Linux
start index.html         # Windows
```

Ou simplesmente arraste o arquivo `index.html` para uma janela do navegador.

### Via servidor local (opcional)

Se preferir servir via HTTP para evitar restrições de CORS em alguns navegadores:

```bash
# Com Python 3
python3 -m http.server 8080

# Com Node.js (npx)
npx serve .
```

Acesse `http://localhost:8080` no navegador.

### Compatibilidade

- Navegadores modernos: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- Requer JavaScript habilitado
- Requer acesso à internet para carregamento das fontes via Google Fonts e do Tailwind CSS via CDN
- Funciona em desktop e tablet; responsividade mobile implementada para telas a partir de 375px

---

## Equipe

Desenvolvido por **Valkiria Inc.** — Curitiba, 2026.

| Integrante | Responsabilidade |
|---|---|
| Karen Cristini Nogueira | Levantamento de requisitos, identificação de necessidades do usuário e definição das funcionalidades principais |
| Letícia Miniuk Rosa Pereira | Documentação do projeto, desenvolvimento do protótipo, design da interface e adequação da experiência ao contexto de varejo de moda |
| Rayssa Gaievicz Grafetti | Elaboração dos diagramas UML: casos de uso, classes, objetos, sequência, atividade e estados |
| Victor Willian Rodrigues Bittencourt | Validação dos fluxos funcionais, revisão de consistência entre requisitos, diagramas e protótipo, e testes de navegação |

Projeto acadêmico — protótipo funcional de sistema de PDV para varejo de moda.
Universidade, Curitiba, 2026.

---

## Histórico de versões

| Versão | Data | Mudanças principais |
|---|---|---|
| **v3.1** | Jun/2026 | Correção de busca (PDV e Entrada passam a cobrir ref + SKU + barcode); adição de nova variação inline em Entrada de Mercadoria; `.variacao-chip` estilizado; paleta migrada para greige frio (DM Serif Display + DM Sans) |
| **v3.0** | Jun/2026 | Sprint 4 — especificação completa, diagramas e protótipo inicial |
| **v2.0** | Mai/2026 | Sprint 3 — expansão dos requisitos e modelagem UML |
| **v1.0** | Abr/2026 | Sprint 1 — criação do documento e levantamento de requisitos |

---

## Versão e Licença

**Klesskap v3.1 — Jun/2026**

Confidencial — Valkiria Inc. © 2026. Todos os direitos reservados.

Este repositório contém um protótipo de uso interno. A distribuição, reprodução ou uso comercial sem autorização expressa da Valkiria Inc. é proibida.
