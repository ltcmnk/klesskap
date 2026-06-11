# Klesskap — Product Context

## Product Purpose
Sistema web de PDV (ponto de venda) e controle de estoque para lojas de
varejo de moda de pequeno e médio porte. Resolve o problema central dessas
lojas: catálogos complexos com variações de tamanho e cor que costumam ser
gerenciados por planilhas ou controle manual, gerando erros de estoque,
divergências em comissões e dificuldade de acesso a dados em tempo real.

O Klesskap centraliza em uma única interface o fluxo completo:
recebimento de mercadoria → cadastro → frente de caixa → pagamento
→ relatórios → fechamento de caixa.

## Register
product

## Specification
Klesskap v3.0 — Valkiria Inc., Sprint 4, 11/06/2026
Repositório: https://github.com/ltcmnk/klesskap
Demo: https://klesskap-eight.vercel.app

## Name Origin
Do norueguês *klesskap* (guarda-roupa): o local onde peças de vestuário
são organizadas e armazenadas. A escolha ancora a identidade do sistema —
assim como um guarda-roupa organiza roupas físicas, o Klesskap organiza
digitalmente os dados de produtos de uma loja de vestuário.

## Users & Personas

### Proprietário / Admin
Acesso completo. Visualiza dados financeiros sensíveis (custo, margem,
comissão). Gerencia promoções, usuários, e acessa todos os relatórios.
Caso de uso primário: acompanhar o desempenho da loja pelo dashboard e
tomar decisões de reposição e precificação.

### Gerente de Estoque
Acessa catálogo, formulário de produto e entrada de mercadoria.
Vê preço de venda e custo unitário. Não acessa PDV nem relatórios.
Caso de uso primário: receber lotes de mercadoria, cadastrar novos
produtos com suas variações e gerar etiquetas com código de barras.

### Operador / Vendedor
Acessa dashboard, PDV e tela de relatório (visão limitada).
Não vê dados de custo nem margem. É o ator que realiza as vendas.
Caso de uso primário: operar o caixa, registrar vendas e selecionar
método de pagamento.

## Business Rules (extracted from spec v3.0)

| Regra | Detalhe |
|---|---|
| Variação de produto | Cada combinação tamanho+cor é uma unidade independente com SKU, barcode, estoque e preço próprios |
| SKU format | `[REF_4]-[TAM_3]-[COR_3]` — ex: `BLZ-M-OFW` |
| Barcode format | EAN-13 simulado: prefixo `789` + 10 dígitos aleatórios |
| Status de estoque | crítico: estoque ≤ estoqueMin; baixo: estoque ≤ estoqueMin × 1.5; normal: acima disso |
| Comissão | Taxa de 3% sobre o valor da venda; divisível entre dois vendedores (RQ06) |
| Markup | Preço = Custo × (1 + markup / 100) |
| Alerta automático | Sistema emite notificação quando estoque ≤ estoqueMin (RQ05) |
| Métodos de pagamento | Dinheiro (com troco), Pix, Crédito (parcelado até 12×), Débito (RQ10, RQ11) |
| Perfis de acesso | 3 níveis: Admin, Gerente de Estoque, Operador/Vendedor (RQ08, RQ09) |
| Dados sensíveis | Custo, margem e relatórios financeiros visíveis apenas para Admin e Estoque (RQN05) |

## Requirements Traceability

| Funcionalidade no protótipo | RQ(s) |
|---|---|
| Cadastro de produto com grade de variações | RQ01 |
| Entrada de mercadoria com geração de barcode | RQ02 |
| Gerenciamento de promoções | RQ03 |
| Relatórios financeiros (4 abas) | RQ04 |
| Notificações de estoque mínimo (bell + dashboard) | RQ05 |
| Divisão de comissão no PDV | RQ06 |
| Dashboard em tempo real | RQ07 |
| Login com e-mail e senha + perfis | RQ08, RQ09 |
| Tela de pagamento multi-método | RQ10 |
| Parcelamento no crédito | RQ11 |
| Interface responsiva | RQN01 |
| Feedback visual (toasts, badges, status dots) | RQN06 |

## Anti-references
- Nenhum visual SaaS genérico (cream + terracotta + sans-serif pesado)
- Nenhum dashboard de BI corporativo (azul escuro + gráficos neon)
- Nenhuma interface de supermercado ou fast-food (cores saturadas, fontes boldíssimas)
- Nenhum glassmorphism decorativo sem propósito funcional

## Strategic Principles
1. Densidade informacional funcional — operadores precisam ver o que importa rapidamente
2. A fonte display ancora a identidade fashion sem se tornar decoração
3. A paleta parchment é o fundo, o âmbar é o acento — nunca inverter essa hierarquia
4. Feedback visual imediato para toda ação (toasts, estados de hover, transições)
5. Responsividade real — PDV em tablet, dashboard no celular do proprietário
6. Módulos com tratamento visual próprio conforme RQN02 — sem igualar tudo
