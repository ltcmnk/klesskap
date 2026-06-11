# Klesskap — Product Context

## Product Purpose
Sistema web de PDV (ponto de venda) e controle de estoque para lojas de varejo de moda de pequeno e médio porte. Permite cadastro de produtos com variações (tamanho + cor), entrada de estoque (incluindo criação de novas variações on-the-fly), frente de caixa com busca por nome/ref/SKU/barcode, pagamentos (dinheiro, crédito, débito, Pix), relatórios financeiros, promoções e gestão de usuários.

## Register
product

## Users

- **Admin / Proprietária** (Ana Paula): acessa todos os módulos, inclui relatórios financeiros com dados de custo e margem
- **Gerente de Estoque**: acessa catálogo, cadastro de produto e entrada de mercadorias
- **Vendedor / Terminal de Vendas**: acessa PDV e pagamento

## Key Flows

### Cadastro de produto
Formulário com grade interativa de variações (tamanho × cor). Categoria é um combo-box dinâmico — o operador pode criar categorias novas inline. Tamanhos e cores também são adicionáveis diretamente na grade, sem modal. O produto pode ser duplicado a partir do catálogo com um clique.

### Entrada de mercadoria
O operador busca o produto por nome, referência de fábrica, SKU ou código de barras. Digita as quantidades por variação existente. Se chegou um lote com uma variação inédita (nova cor ou novo tamanho), cria a variação diretamente na tela de entrada — os campos inline aparecem sem sair do fluxo, e o estoque já é lançado ao confirmar.

### PDV
Busca por nome, referência, SKU ou barcode (parcial, case-insensitive). O picker de variação bloqueia visualmente combinações sem estoque. O carrinho respeita o estoque disponível. A comissão pode ser dividida entre dois vendedores com rateio calculado em tempo real.

## Brand Tone
Profissional, acolhedor, eficiente. Remete ao mundo do vestuário organizado — não tecnológico-frio nem excessivamente decorativo. O nome norueguês *klesskap* (guarda-roupa) ancora a identidade: organização elegante de peças.

## Anti-references
- Nenhum visual de startup SaaS genérico (cream + terracotta + sans-serif pesado)
- Nenhum dashboard de BI corporativo (azul escuro + gráficos neon)
- Nenhuma interface de supermercado ou fast-food (cores saturadas, fontes boldíssimas)
- Nenhum glassmorphism decorativo sem propósito

## Strategic Principles
1. **Densidade informacional funcional** — operadores precisam ver o que importa rapidamente; tabelas densas são preferíveis a cards espaçosos quando há muitos dados
2. **DM Serif Display italic** ancora a identidade fashion nos títulos de tela sem se tornar decoração no operacional
3. **A paleta greige fria é o fundo, o acento escuro é o acento** — jamais inverter essa hierarquia (nunca `--accent` como fundo de telas)
4. **Feedback visual imediato** para toda ação: toasts, estados de hover, transições de tela, estados de loading em botões
5. **Responsividade real** — PDV em tablet, dashboard no celular do proprietário; breakpoint principal em 768px
6. **Acessibilidade tipográfica** — fonte base 16px, inputs mínimo 44px, botões mínimo 48px, contraste WCAG AA garantido no texto de corpo
