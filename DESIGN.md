# Klesskap — Design System

## Color Strategy: Restrained
Tinted neutrals com um único acento âmbar. O acento aparece em ≤10% da superfície.

## Palette (CSS custom properties)
- `--canvas: #F9F6F1` — fundo geral
- `--base: #F4F0EA` — corpo do app
- `--elevated: #FDFCF9` — cards e inputs focus
- `--subtle: #EDE9E2` — referência Tailwind (sidebar usa #E9E3D9 via CSS override)
- `--inset: #E6E1D8` — separadores internos
- `--ink: #1C1814` — texto primário
- `--ink-2: #5A534A` — texto secundário
- `--ink-3: #8C857C` — labels, placeholder
- `--ink-4: #B8B2AA` — desabilitado
- `--accent: #8B6F3E` — âmbar principal
- `--accent-h: #7A6035` — hover do acento
- `--accent-s: #F5EFE5` — surface do acento
- `--border: #D8D2C8` — borda padrão
- `--border-h: #B8B0A4` — borda hover
- `--success: #3D6B45` / `--danger: #8B3A2E` / `--warning: #7A5F2A`

## Sidebar Background
`#E9E3D9` — mais escuro que `--subtle` para criar contraste visual com o conteúdo principal. Mesma cor usada em `.header-zone-a` para coesão de coluna esquerda.

## Typography
- **Display**: Cormorant Garamond weight 300/400 — headings de tela, títulos de modal, empty states, nome da loja
- **UI**: DM Sans opsz 9–40 weight 400/500 — todo texto operacional, labels, botões
- **Mono**: JetBrains Mono weight 400/500 — SKUs, códigos de barras, valores monetários formatados, totais de caixa

## Type Scale
- `10.5px / 500 / 0.10em uppercase` — caps labels (t-caps)
- `13px / 400` — body secundário
- `13.5px / 400` — body principal
- `14px / 500` — botões, inputs
- `20–24px / 400` — display (Cormorant) — headings de seção
- `26–34px / 300` — display (Cormorant) — títulos de tela e valores grandes

## Elevation
- `--shadow-sm: 0 1px 4px rgba(28,24,20,.07)`
- `--shadow-md: 0 4px 20px rgba(28,24,20,.09), 0 1px 4px rgba(28,24,20,.05)`
- `--shadow-lg: 0 12px 48px rgba(28,24,20,.11), 0 4px 16px rgba(28,24,20,.07)`

## Motion
- `--ease-out: cubic-bezier(0.23, 1, 0.32, 1)`
- `--ease-drawer: cubic-bezier(0.32, 0.72, 0, 1)`
- Duração base: 120ms (hover), 180ms (fade), 260ms (slide)

## Component Radius
- `3px` — chips, badges
- `6px` — inputs, botões
- `10px` — cards
- `14px` — modais
