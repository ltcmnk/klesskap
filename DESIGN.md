# Klesskap — Design System

## Color Strategy: Greige Frio / Editorial
Creme frio com único acento greige-escuro. Referências visuais: Toteme, The Row, Arket. O acento aparece em ≤10% da superfície; nunca como fundo de tela.

## Palette (CSS custom properties)

```css
--canvas:    #F2F1EE   /* fundo geral — creme frio */
--base:      #F2F1EE   /* alias de --canvas */
--elevated:  #FAFAF8   /* cards, modais, inputs focus */
--subtle:    #EEECEA   /* sidebar, inset, hover suave */
--inset:     #EEECEA   /* alias de --subtle */

--ink:   #1E1E1C   /* preto-quase-neutro — títulos */
--ink-2: #4A4845   /* corpo de texto — cinza carvão */
--ink-3: #8A8784   /* labels, metadados, placeholders */
--ink-4: #B8B4B0   /* desabilitado, decorativo */

--accent:     #7C6E5C   /* greige escuro — acento principal */
--accent-h:   #6A5E4E   /* hover do acento */
--accent-s:   #EFEDE8   /* surface do acento (chips, fundos selecionados) */
--accent-btn: #5C5046   /* botões primários — chocolate acinzentado */

--border:   #E2E0DC   /* borda padrão */
--border-h: #D8D5D0   /* borda hover / focus */

--success:   #3D6B4F   /* verde editorial */
--success-s: #F1F7F4
--danger:    #C0392B   /* vermelho limpo */
--danger-s:  #FDF2F1
--warning:   #7A6C3E   /* ocre frio */
--warning-s: #FDFAF1

--sidebar-bg:     #EEECEA
--sidebar-border: #E2E0DC
```

**Regra de uso:** `--canvas` é o fundo; `--accent` é o acento — jamais inverter essa hierarquia. Nunca usar `--accent` como cor de fundo de telas ou cards principais.

## Sidebar
`#EEECEA` — ligeiramente mais escuro que `--canvas` para criar contraste com o conteúdo. Sem sombra lateral; apenas `border-right: 1px solid #E2E0DC`. Mesma cor usada em `.header-zone-a` para coesão visual da coluna esquerda.

## Typography

- **Display**: DM Serif Display weight 400, `font-style: italic` — headings de tela (`h1`), títulos de modal, nome da loja, empty states
- **UI**: DM Sans opsz 9–40, weight 300/400/500 — todo texto operacional: labels, botões, tabelas, inputs, nav
- **Mono**: JetBrains Mono weight 400/500 — SKUs, códigos de barras, valores monetários formatados, totais de caixa

Carregadas via Google Fonts (CDN, `display=swap`). Fallbacks: Georgia (display), system-ui (UI), monospace (mono).

## Type Scale

| Classe / Uso | Tamanho | Peso | Observação |
|---|---|---|---|
| `body` | 16px | 400 | Base acessível (mínimo WCAG para corpo) |
| `.t-caps` | 12px | 500 | 0.10em letter-spacing, uppercase — labels de campo |
| `.t-data` | 13px | 400/500 | JetBrains Mono — valores e códigos |
| Tabela (td) | 15px | 400 | — |
| `.btn` | 15px | 500 | — |
| `.nav-item` | 15px | 400/500 | — |
| `.input-label` | 12px | 500 | Uppercase, 0.10em LS |
| Heading de tela (h1) | 28–32px | 400 | DM Serif Display italic |
| Valor grande (dashboard) | 30–34px | 400 | DM Serif Display |
| `line-height` base | 1.6 | — | Mínimo acessível |

## Elevation

```
--shadow-sm: 0 1px 3px rgba(0,0,0,0.04)
--shadow-md: 0 2px 8px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)
--shadow-lg: 0 8px 32px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.05)
```

Cards do dashboard: `--shadow-sm` ou sem sombra, `border: 1px solid --border`. Modais: `--shadow-lg`. Login card: `--shadow-lg + 0 0 0 1px rgba(124,110,92,0.07)`.

## Motion

```
--ease-out:    cubic-bezier(0.23, 1, 0.32, 1)
--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)
```

| Animação | Duração | Uso |
|---|---|---|
| hover (bg, color) | 120ms | Botões, nav, chips |
| fade-in | 200ms | Telas, cards animados |
| fade-in-scale | 180ms | Modais, pickers |
| slide-in-right | 260ms | Drawer mobile |
| toast-in | 240ms | Notificações |
| expand-down | 160ms | Grade de variações inline |

## Component Radius

| Valor | Componentes |
|---|---|
| `3px` | badges, chips de filtro, status |
| `6px` | inputs, selects, botões, combo dropdown |
| `10px` | cards, table-wrap, toasts, pickers |
| `14px` | modais |

## Interactive Sizes (Acessibilidade)

| Componente | min-height |
|---|---|
| `.input`, `select.input` | 44px |
| `.btn` (padrão e lg) | 48px |
| `.btn-sm` | 36px (controles secundários em tabela) |
| `.variacao-chip` (PDV picker) | 44px |
| `.btn-icon` | 32px touch target |

## Components — Referência Rápida

### Badges de status
Sem fundo saturado. Border `1px solid` na cor do status, fundo sutil.
- Crítico: `color #C0392B`, `border #C0392B`, `background #FDF2F1`
- Baixo: `color #7A6C3E`, `border #C4B47A`, `background #FDFAF1`
- Normal/OK: `color #3D6B4F`, `border #82B89A`, `background #F1F7F4`

### Botões primários
`background: #5C5046` (--accent-btn), `color: #fff`, sem sombra, `border-radius: 6px`. Hover: `filter: brightness(0.9)`.

### Inputs e selects
`background: #EEECEA`, `border: 1px solid #D8D5D0`. Focus: `border-color: #7C6E5C`, sem outline colorido extra.

### `.variacao-chip` (PDV picker de tamanho/cor)
`min-width: 44px`, `min-height: 44px`, `border: 1px solid --border`, `background: --elevated`.
- `.selected`: `background: --accent`, `color: #fff`, `border-color: --accent`
- `.sem-estoque`: `opacity: 0.38`, `cursor: not-allowed`, `text-decoration: line-through`

### Gráfico de barras (dashboard)
Barras em `#7C6E5C` (--accent) com `fill-opacity: 0.65`; hover eleva para `1.0`.
