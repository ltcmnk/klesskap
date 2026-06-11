# KLESSKAP

> **Sistema de PDV e gestão de estoque para varejo de moda** — do norueguês *klesskap* (guarda-roupa): organização elegante de cada peça.

**Demo ao vivo:** https://klesskap-eight.vercel.app

![Versão](https://img.shields.io/badge/versão-3.1-7C6E5C?style=flat-square)
![Status](https://img.shields.io/badge/status-protótipo-B8B2AA?style=flat-square)
![Stack](https://img.shields.io/badge/stack-HTML%20%2F%20CSS%20%2F%20JS-1C1814?style=flat-square)
![Equipe](https://img.shields.io/badge/equipe-Valkiria%20Inc.-5A534A?style=flat-square)

---

## Sobre o projeto

Klesskap é um sistema web de ponto de venda (PDV) e controle de estoque desenvolvido para lojas de varejo de moda de pequeno e médio porte. O sistema centraliza em uma única interface as operações que costumam ser tratadas de forma fragmentada — planilhas para estoque, calculadora para troco, caderno para comissões — e oferece um fluxo coeso do recebimento de mercadoria até o fechamento de caixa.

O problema que o Klesskap resolve é concreto: lojas de moda lidam com um catálogo complexo por natureza, onde cada produto existe em múltiplas combinações de tamanho e cor. Controlar esse nível de granularidade manualmente é propenso a erros — venda de item sem estoque, divergência entre o que entrou e o que foi vendido, comissões calculadas de cabeça. O sistema trata cada variação (ex: Blazer Alfaiataria, Off White / M) como uma unidade independente, com SKU, código de barras, estoque mínimo e preço próprios.

O projeto foi construído como protótipo funcional para validação de fluxos operacionais. Todos os dados são simulados em memória — não há servidor nem banco de dados. O foco está na experiência de uso das três personas principais: a proprietária (que gerencia tudo), o responsável pelo estoque (recebimento e cadastro) e o operador de caixa (PDV e pagamento).

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

## Telas do Sistema

O Klesskap é composto por **10 telas** organizadas em fluxos de trabalho
distintos para cada perfil de acesso.

---

### 1. Login
**Arquivo:** `screenshots/tela-login.png`
**Acesso:** Público (pré-autenticação)

Tela inicial do sistema. Permite autenticação via e-mail e senha com
validação de credenciais. Disponibiliza atalhos de acesso rápido para os
três perfis de demonstração: Admin, Terminal de Estoque e Terminal de Vendas.

---

### 2. Dashboard
**Arquivo:** `screenshots/tela-dashboard.png`
**Acesso:** Todos os perfis

Painel principal exibido logo após o login. Apresenta as métricas do dia
em tempo real: total de vendas, número de transações, ticket médio e alertas
de estoque crítico. Inclui gráfico de barras com evolução de vendas nos
últimos 7 dias, painel de alertas de variações com estoque abaixo do mínimo
e tabela das últimas vendas realizadas.

---

### 3. Catálogo de Produtos
**Arquivo:** `screenshots/tela-catalogo.png`
**Acesso:** Admin, Terminal de Estoque

Lista completa de produtos cadastrados com filtros por categoria, tamanho,
cor, estação e status de estoque. Cada produto pode ser expandido para
exibir todas as suas variações (tamanho + cor) com SKU, código de barras,
preço, custo, estoque atual e status. Permite acesso rápido ao formulário
de edição e à entrada de mercadoria.

---

### 4. Novo Produto / Editar Produto
**Arquivo:** `screenshots/tela-formulario-produto.png`
**Acesso:** Admin, Terminal de Estoque

Formulário completo de cadastro e edição de produtos. Campos base incluem
nome, categoria, tecido, estação, referência de fábrica e descrição.
Campos financeiros (preço de venda e custo) visíveis apenas para Admin e
Estoque. A grade de variações é uma tabela interativa de tamanho × cor onde
cada célula ativa gera automaticamente SKU e código de barras próprios.
Tamanhos e cores são gerenciados com chips removíveis e inputs inline.

---

### 5. Entrada de Mercadoria
**Arquivo:** `screenshots/tela-entrada-estoque.png`
**Acesso:** Admin, Terminal de Estoque

Tela para registro de recebimento físico de mercadorias. O responsável
pelo recebimento é selecionado da equipe de estoque cadastrada. A busca
de produto suporta pesquisa por nome ou referência de fábrica. Ao
selecionar um produto, exibe todas as variações com input de quantidade
recebida. Permite também cadastrar novas variações diretamente nesta tela.
Inclui histórico de movimentações (entradas e saídas por venda).

---

### 6. PDV — Frente de Caixa
**Arquivo:** `screenshots/tela-pdv.png`
**Acesso:** Admin, Terminal de Vendas

Terminal de ponto de venda com layout em dois painéis. O painel esquerdo
oferece busca de produtos por nome, SKU ou código de barras, com seletor
de variação (tamanho e cor) e indicação de disponibilidade em estoque.
O painel direito exibe o carrinho de compras com quantidades ajustáveis,
subtotal e total. Inclui seleção de vendedor principal, opção de divisão
de comissão entre dois vendedores e vinculação de cliente.

---

### 7. Pagamento
**Arquivo:** `screenshots/tela-pagamento.png`
**Acesso:** Admin, Terminal de Vendas (a partir do PDV)

Tela de finalização de venda. Exibe o resumo dos itens do carrinho,
vendedores envolvidos e total a pagar. Suporta quatro métodos de
pagamento: Dinheiro (com cálculo de troco), Pix, Cartão de Crédito
(com parcelamento configurável em 1×, 2×, 3×, 4×, 5×, 6×, 10× ou 12×)
e Cartão de Débito. Ao finalizar, registra a venda, atualiza o estoque
e retorna ao PDV para nova venda.

---

### 8. Relatórios
**Arquivo:** `screenshots/tela-relatorios.png`
**Acesso:** Admin, Terminal de Vendas (visão restrita para Estoque)

Central de relatórios com filtro por período (Hoje, Esta Semana, Este Mês)
e intervalo de datas personalizado. Organizado em quatro abas:
**Financeiro** — detalhamento de todas as vendas do período com método e
status; **Vendas por Vendedor** — desempenho individual com total vendido,
comissão gerada e progresso de meta; **Fechamento de Caixa** — resumo por
método de pagamento com totais e percentuais; **Fiscal** — relação de itens
vendidos para controle tributário. Exportação de relatório em PDF disponível.

---

### 9. Promoções
**Arquivo:** `screenshots/tela-promocoes.png`
**Acesso:** Admin

Gerenciamento de campanhas promocionais ativas e encerradas. Lista as
promoções com nome, escopo de aplicação, desconto, período de vigência e
status. Permite criar novas promoções via formulário em modal com campos
de nome, escopo, desconto (percentual ou valor fixo) e datas de início e
fim. Promoções ativas ficam marcadas com badge verde; encerradas, com badge
cinza.

---

### 10. Usuários
**Arquivo:** `screenshots/tela-usuarios.png`
**Acesso:** Admin (exclusivo)

Painel de gestão de usuários do sistema. Exibe todos os usuários cadastrados
com nome, e-mail, perfil de acesso (Admin/Proprietário, Gerente de Estoque
ou Operador/Vendedor) e status ativo/inativo via toggle. Permite ativar e
desativar usuários individualmente. O proprietário logado não pode
desativar sua própria conta. Criação de novo usuário disponível (em
desenvolvimento na versão atual).

---

> **Nota:** Os perfis de acesso determinam quais telas são visíveis no menu
> lateral. Telas restritas exibem uma mensagem de acesso negado ao invés
> do conteúdo, sem redirecionar o usuário.

---

## Equipe

Desenvolvido por **Valkiria Inc.**

Projeto acadêmico — protótipo funcional desenvolvido como estudo de sistema de PDV para varejo de moda. Curitiba, 2026.

---

## Histórico de versões

| Versão | Data | Mudanças principais |
|---|---|---|
| **v3.1** | Jun/2026 | Correção de busca (PDV e Entrada passam a cobrir ref + SKU + barcode); adição de nova variação inline em Entrada de Mercadoria; `.variacao-chip` estilizado; paleta migrada para greige frio (DM Serif Display + DM Sans) |
| **v3.0** | Mai/2026 | Sprint 4 — categoria dinâmica, grade inline, duplicar produto, sistema de design editorial |

---

## Versão e Licença

**Klesskap v3.1 — Jun/2026**

Confidencial — Valkiria Inc. © 2026. Todos os direitos reservados.

Este repositório contém um protótipo de uso interno. A distribuição, reprodução ou uso comercial sem autorização expressa da Valkiria Inc. é proibida.
