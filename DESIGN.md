# Klesskap — Design System

## Design Philosophy
Interface operacional para varejo de moda. A estética serve a função:
operadores precisam de clareza e velocidade; a proprietária precisa de
dados legíveis; a identidade visual comunica cuidado sem ser decorativa.
Referência: restrained premium operational — não SaaS, não boutique pura.

Alinhado ao RQN07 da especificação v3.0: "interface visualmente consistente,
responsiva e alinhada ao contexto de varejo de moda, com apresentação clara
de produtos, clientes, vendas e indicadores."

## Color Strategy (RQN02 — esquemas de cores por módulo)
Tinted neutrals com um único acento âmbar. O acento aparece em ≤ 10% da
superfície. Módulos usam superfícies ligeiramente diferenciadas para criar
identidade sem quebrar a coesão.

### Paleta base (CSS custom properties em :root)
```
--canvas:    #F9F6F1  /* fundo geral */
--base:      #F4F0EA  /* corpo do app */
--elevated:  #FDFCF9  /* cards, modais, inputs em focus */
--subtle:    #EDE9E2  /* sidebar, thead de tabelas */
--inset:     #E6E1D8  /* separadores internos, borda de grade */
--ink:       #1C1814  /* texto primário */
--ink-2:     #5A534A  /* texto secundário */
--ink-3:     #8C857C  /* labels, placeholder */
--ink-4:     #B8B2AA  /* desabilitado */
--accent:    #8B6F3E  /* âmbar principal */
--accent-h:  #7A6035  /* hover do acento */
--accent-s:  #F5EFE5  /* surface do acento (markup bg, chips ativos) */
--border:    #D8D2C8  /* borda padrão */
--border-h:  #B8B0A4  /* borda hover */
--success:   #3D6B45  /* estoque normal, venda concluída */
--success-s: #EAF2EB
--danger:    #8B3A2E  /* estoque crítico, erro */
--danger-s:  #F5E8E6
--warning:   #7A5F2A  /* estoque baixo, aviso */
--warning-s: #F5EDE0
```

### Superfícies por módulo (RQN02)
```
Dashboard:        --base (neutro — visão geral)
Catálogo:         --base com thead em --subtle
Formulário:       --elevated (foco, formulário limpo)
Entrada Estoque:  --base com accent-s nos inputs de grade
PDV:              --elevated (painel carrinho) / --base (produtos)
Pagamento:        --elevated (clareza no fechamento)
Relatórios:       --subtle (fundo de dados, leitura densa)
Promoções:        --base
Usuários:         --base
```

## Typography
```
Display: DM Serif Display weight 300/400
  → Headings de tela, títulos de modal, empty states, nome KLESSKAP

UI: DM Sans (opsz 9–40) weight 400/500
  → Todo texto operacional: labels, botões, nav, body

Mono: JetBrains Mono weight 400/500
  → SKUs, barcodes, valores monetários de total, IDs de venda
```

### Escala tipográfica
```
10.5px / 500 / 0.10em uppercase  → .t-caps (labels de seção)
11px   / 400                     → notas e textos auxiliares
12px   / 400                     → badges, chips
13px   / 400                     → body secundário, table cells
13.5px / 400                     → body principal
14px   / 500                     → botões, inputs
18–22px / 400  [Display]         → headings de card e modal
28–32px / 300  [Display]         → títulos de tela (h1)
```

## Elevation
```
--shadow-sm: 0 1px 4px rgba(28,24,20,.07)
  → cards sutis, chips

--shadow-md: 0 4px 20px rgba(28,24,20,.09), 0 1px 4px rgba(28,24,20,.05)
  → dropdowns, cards interativos, header sticky

--shadow-lg: 0 12px 48px rgba(28,24,20,.11), 0 4px 16px rgba(28,24,20,.07)
  → modais, painel de notificações, toasts
```

## Motion (RQN06 — feedback visual em tempo real)
```
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1)     → transições de UI
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)      → sidebar mobile
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1)   → aparição de elementos

Durações:
  80ms   → micro (hover em botões simples)
  120ms  → fast (hover em cards, badge update)
  180ms  → standard (fade de elementos inline)
  260ms  → medium (slide de sidebar, expand de linha)
  400ms  → slow (modais, painel de notificações)

Nunca animar: width, height, top, left, margin, padding em layout
Sempre animar via: opacity, transform, box-shadow
```

## Component Inventory

### Botões
```
.btn              → base reset
.btn-primary      → fundo accent, texto elevated
.btn-ghost        → transparente, borda border, hover subtle
.btn-secondary    → fundo subtle, texto ink-2
.btn-accent       → sinônimo de btn-primary (usado em PDV)
.btn-icon         → quadrado sem borda, apenas ícone
.btn-sm .btn-lg   → modificadores de tamanho
.btn-full         → width: 100%
[disabled]        → opacity: 0.45, cursor: not-allowed
```

### Status & Badges
```
.badge-normal    → success (estoque ok, venda concluída)
.badge-baixo     → warning (estoque próximo do mínimo)
.badge-critico   → danger (estoque zerado ou abaixo do mínimo)
.badge-accent    → âmbar (comissão dividida, destaque)
.badge-neutral   → inset (contagens, informativo)
.status-dot      → círculo 6px inline antes de texto de status
```

### Feedback Visual (RQN06)
```
Toast           → canto inferior direito, 4 tipos: success/error/warning/info
                   duração: 4000ms + animação toast-in/toast-out
Modal           → overlay semitransparente, caixa centralizada, Esc para fechar
Painel notif    → dropdown do bell, fade-in-scale 160ms, fecha ao clicar fora
Disabled state  → opacity 0.45 + cursor not-allowed em qualquer .btn[disabled]
Loading states  → spinner inline em botões de ação assíncrona
```

### Formulários
```
.input          → base para text, number, select, textarea
.input.error    → borda danger, foco danger
.input-label    → t-caps acima do campo
.toggle         → switch checkbox customizado (usuarios, promoções)
```

### Tabelas
```
.table-wrap     → overflow-x: auto, border, border-radius
table thead     → fundo --subtle, t-caps nas colunas
table tbody tr  → hover --subtle, border-bottom --inset
.grade-table    → tabela especial para grade de variações no formulário
```

### Componentes específicos
```
.card           → elevated bg, border, border-radius lg, shadow-sm
.card-metric    → card compacto para KPIs do dashboard
.variacao-chip  → chip de tamanho/cor com × removível na grade do produto
.filter-chip    → chip de filtro no catálogo (ativo com borda accent 2px)
.section-header → flex justify-between para título + ação de seção
.empty-state    → centralizado, ícone 36px, título display, subtítulo
.grade-cell-active  → célula de grade ativa (tem SKU e estoque)
.grade-cell-empty   → célula clicável para ativar variação (+)
#notif-panel    → painel de notificações (fixed, z-40, shadow-lg, 340px)
.notif-item     → linha de notificação com dot de leitura e ícone tipado
.pdv-cart-col   → coluna do carrinho no PDV (largura responsiva)
```

## Responsive Breakpoints
```
< 640px   (mobile):  padding 16px, tabelas com overflow-x, menu em overlay
640–1023px (tablet): padding 24px, sidebar colapsa, PDV em abas
≥ 1024px  (desktop): layout completo, sidebar fixa 240px
≥ 1280px  (lg):      grid de 3 colunas no formulário, PDV cart col 360px
≥ 1536px  (xl):      PDV cart col 420px
```

## Anti-patterns (não usar)
```
✗ Side-stripe borders (border-left/right decorativo > 1px)
✗ Gradient text (background-clip: text)
✗ Glassmorphism sem propósito funcional
✗ Identical card grids (todos os cards iguais em grid uniforme)
✗ window.prompt() / window.alert() / window.confirm()
✗ Animar propriedades de layout (top, left, width, height)
```
