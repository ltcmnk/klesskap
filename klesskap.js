/* ============================================================
   KLESSKAP.JS — Parte 1/3: Dados, Estado, Utils, Nav, Login
   ============================================================ */

// ===== DADOS MOCK =====

const LOGINS = [
  { terminal: 'admin',   nome: 'Ana Paula Ferreira',  email: 'admin@klesskap.com',   senha: 'admin123',   avatar: 'AP' },
  { terminal: 'estoque', nome: 'Terminal de Estoque',  email: 'estoque@klesskap.com', senha: 'estoque123', avatar: 'TE' },
  { terminal: 'vendas',  nome: 'Terminal de Vendas',   email: 'vendas@klesskap.com',  senha: 'vendas123',  avatar: 'TV' },
]

const VENDEDORES = [
  { id: 'vend-1', nome: 'Letícia Oliveira', meta: 1200, comissao: 0.03 },
  { id: 'vend-2', nome: 'Victor Souza',     meta: 1000, comissao: 0.03 },
  { id: 'vend-3', nome: 'Amanda Costa',     meta: 900,  comissao: 0.03 },
]

const EQUIPE_ESTOQUE = [
  { id: 'est-1', nome: 'Ricardo Mendes',  cargo: 'Gerente de Estoque' },
  { id: 'est-2', nome: 'Camila Nogueira', cargo: 'Operadora de Estoque' },
]

const PRODUTOS = [
  {
    id: 'p1', nome: 'Blazer Alfaiataria', categoria: 'Blazers',
    tecido: 'Viscose', estacao: 'Inverno', ref: 'BLZ-2026-089',
    descricao: 'Blazer de alfaiataria com modelagem estruturada.',
    variacoes: [
      { id:'v1', tamanho:'PP', cor:'Off White', sku:'BLZ-PP-OFW', barcode:'7891234567891', preco:349.90, custo:140.00, estoque:2, estoqueMin:2, status:'baixo'   },
      { id:'v2', tamanho:'P',  cor:'Off White', sku:'BLZ-P-OFW',  barcode:'7891234567892', preco:349.90, custo:140.00, estoque:4, estoqueMin:2, status:'normal'  },
      { id:'v3', tamanho:'M',  cor:'Off White', sku:'BLZ-M-OFW',  barcode:'7891234567893', preco:349.90, custo:140.00, estoque:7, estoqueMin:2, status:'normal'  },
      { id:'v4', tamanho:'G',  cor:'Preto',     sku:'BLZ-G-PRT',  barcode:'7891234567894', preco:349.90, custo:140.00, estoque:1, estoqueMin:2, status:'critico' },
    ]
  },
  {
    id: 'p2', nome: 'Calça Wide Leg', categoria: 'Calças',
    tecido: 'Crepe', estacao: 'Todas', ref: 'CWL-2026-034',
    descricao: 'Calça wide leg de cintura alta.',
    variacoes: [
      { id:'v5', tamanho:'34', cor:'Preta', sku:'CWL-34-PRT', barcode:'7891234567895', preco:189.90, custo:72.00, estoque:3, estoqueMin:2, status:'normal'  },
      { id:'v6', tamanho:'36', cor:'Preta', sku:'CWL-36-PRT', barcode:'7891234567896', preco:189.90, custo:72.00, estoque:1, estoqueMin:3, status:'critico' },
      { id:'v7', tamanho:'38', cor:'Preta', sku:'CWL-38-PRT', barcode:'7891234567897', preco:189.90, custo:72.00, estoque:5, estoqueMin:3, status:'normal'  },
    ]
  },
  {
    id: 'p3', nome: 'Camisa Linho', categoria: 'Camisas',
    tecido: 'Linho', estacao: 'Verão', ref: 'CML-2026-055',
    descricao: 'Camisa de linho com caimento leve.',
    variacoes: [
      { id:'v8',  tamanho:'P', cor:'Bege',   sku:'CML-P-BEG', barcode:'7891234567898', preco:159.90, custo:58.00, estoque:8, estoqueMin:3, status:'normal'  },
      { id:'v9',  tamanho:'M', cor:'Bege',   sku:'CML-M-BEG', barcode:'7891234567899', preco:159.90, custo:58.00, estoque:6, estoqueMin:3, status:'normal'  },
      { id:'v10', tamanho:'G', cor:'Branco', sku:'CML-G-BRC', barcode:'7891234567900', preco:159.90, custo:58.00, estoque:0, estoqueMin:3, status:'critico' },
    ]
  },
  {
    id: 'p4', nome: 'Vestido Midi', categoria: 'Vestidos',
    tecido: 'Cetim', estacao: 'Verão', ref: 'VMD-2026-018',
    descricao: 'Vestido midi com acabamento acetinado.',
    variacoes: [
      { id:'v11', tamanho:'34', cor:'Preto', sku:'VMD-34-PRT', barcode:'7891234567901', preco:279.90, custo:98.00, estoque:3, estoqueMin:2, status:'normal' },
      { id:'v12', tamanho:'36', cor:'Preto', sku:'VMD-36-PRT', barcode:'7891234567902', preco:279.90, custo:98.00, estoque:2, estoqueMin:2, status:'baixo'  },
      { id:'v13', tamanho:'38', cor:'Bege',  sku:'VMD-38-BEG', barcode:'7891234567903', preco:279.90, custo:98.00, estoque:4, estoqueMin:2, status:'normal' },
    ]
  },
  {
    id: 'p5', nome: 'Saia Plissada', categoria: 'Saias',
    tecido: 'Poliéster', estacao: 'Inverno', ref: 'SPA-2026-071',
    descricao: 'Saia midi plissada de cintura alta.',
    variacoes: [
      { id:'v14', tamanho:'P', cor:'Cinza', sku:'SPA-P-CZA', barcode:'7891234567904', preco:219.90, custo:82.00, estoque:5, estoqueMin:2, status:'normal'  },
      { id:'v15', tamanho:'M', cor:'Cinza', sku:'SPA-M-CZA', barcode:'7891234567905', preco:219.90, custo:82.00, estoque:3, estoqueMin:2, status:'normal'  },
      { id:'v16', tamanho:'G', cor:'Preto', sku:'SPA-G-PRT', barcode:'7891234567906', preco:219.90, custo:82.00, estoque:0, estoqueMin:2, status:'critico' },
    ]
  },
]

const VENDAS = [
  {
    id: 'VND-2026-0342', horario: '09:42',
    vendedorPrincipal: 'Letícia Oliveira', segundoVendedor: 'Victor Souza', comissaoDividida: true,
    cliente: 'Fernanda Costa', total: 699.80, metodo: 'Crédito', parcelas: 3, status: 'Concluída',
    itens: [{ nome:'Blazer Alfaiataria', variacao:'Off White / M', sku:'BLZ-M-OFW', qtd:2, preco:349.90 }]
  },
  {
    id: 'VND-2026-0341', horario: '09:15',
    vendedorPrincipal: 'Amanda Costa', segundoVendedor: null, comissaoDividida: false,
    cliente: 'Julia Alves', total: 439.80, metodo: 'Pix', parcelas: 1, status: 'Concluída',
    itens: [
      { nome:'Vestido Midi',  variacao:'Preto / 36', sku:'VMD-36-PRT', qtd:1, preco:279.90 },
      { nome:'Camisa Linho',  variacao:'Bege / P',   sku:'CML-P-BEG', qtd:1, preco:159.90 },
    ]
  },
  {
    id: 'VND-2026-0340', horario: '08:55',
    vendedorPrincipal: 'Victor Souza', segundoVendedor: null, comissaoDividida: false,
    cliente: null, total: 189.90, metodo: 'Débito', parcelas: 1, status: 'Concluída',
    itens: [{ nome:'Calça Wide Leg', variacao:'Preta / 34', sku:'CWL-34-PRT', qtd:1, preco:189.90 }]
  },
  {
    id: 'VND-2026-0339', horario: '08:20',
    vendedorPrincipal: 'Letícia Oliveira', segundoVendedor: null, comissaoDividida: false,
    cliente: 'Mariana Souza', total: 219.90, metodo: 'Pix', parcelas: 1, status: 'Concluída',
    itens: [{ nome:'Saia Plissada', variacao:'Cinza / P', sku:'SPA-P-CZA', qtd:1, preco:219.90 }]
  },
]

const VENDAS_SEMANA = [
  { dia:'Seg', valor:1240 },
  { dia:'Ter', valor:890  },
  { dia:'Qua', valor:2100 },
  { dia:'Qui', valor:1650 },
  { dia:'Sex', valor:3200 },
  { dia:'Sáb', valor:2800 },
  { dia:'Dom', valor:980  },
]

const PROMOCOES = [
  { id:1, nome:'Promoção Inverno 2026', escopo:'Coleção Inverno', desconto:'10%',   inicio:'2026-05-01', fim:'2026-06-30', status:'ativa'     },
  { id:2, nome:'Desconto VIP Maio',     escopo:'Clientes VIP',    desconto:'R$ 50', inicio:'2026-05-01', fim:'2026-05-31', status:'encerrada' },
]

const USUARIOS = [
  { id:1, nome:'Ana Paula Ferreira', email:'admin@klesskap.com',   perfil:'Proprietário/Admin',  ativo:true  },
  { id:2, nome:'Ricardo Mendes',     email:'ricardo@klesskap.com', perfil:'Gerente de Estoque',  ativo:true  },
  { id:3, nome:'Camila Nogueira',    email:'camila@klesskap.com',  perfil:'Gerente de Estoque',  ativo:true  },
  { id:4, nome:'Letícia Oliveira',   email:'leticia@klesskap.com', perfil:'Vendedor/Operador',   ativo:true  },
  { id:5, nome:'Victor Souza',       email:'victor@klesskap.com',  perfil:'Vendedor/Operador',   ativo:true  },
  { id:6, nome:'Amanda Costa',       email:'amanda@klesskap.com',  perfil:'Vendedor/Operador',   ativo:false },
]

// ===== ESTADO GLOBAL =====

let appState = {
  terminal: null,
  currentUser: null,
  currentScreen: null,
  cart: [],
  vendedorPrincipal: null,
  segundoVendedor: null,
  comissaoDividida: false,
  catalogoExpandido: {},
  pdvVariacaoPickerAberto: null,
  pdvSelectedTamanho: null,
  pdvSelectedCor: null,
  catalogFiltros: { categorias: [], tamanhos: [], cores: [], estacoes: [], status: [], search: '' },
  reportTab: 'financeiro',
  reportPeriodo: 'hoje',
  entradaSelectedProduto: null,
  entradaQuantidades: {},
  gradeForm: { tamanhos: [], cores: [], celulas: {} },
  paymentMetodo: null,
  paymentParcelas: 1,
}

// ===== UTILITÁRIOS =====

function formatCurrency(n) {
  return 'R$ ' + Number(n).toLocaleString('pt-BR', { minimumFractionDigits:2, maximumFractionDigits:2 })
}

function formatDate() {
  const d = new Date()
  const dias = ['Dom','Seg','Ter','Qua','Qui','Sex','Sáb']
  const meses = ['Jan','Fev','Mar','Abr','Mai','Jun','Jul','Ago','Set','Out','Nov','Dez']
  return `${dias[d.getDay()]}, ${d.getDate()} ${meses[d.getMonth()]} ${d.getFullYear()}`
}

function getInitials(nome) {
  return nome.split(' ').filter(Boolean).slice(0,2).map(w => w[0].toUpperCase()).join('')
}

function calcStatusProduto(produto) {
  const v = produto.variacoes
  if (v.some(x => x.estoque === 0 || x.estoque < x.estoqueMin)) return 'critico'
  if (v.some(x => x.estoque <= x.estoqueMin * 1.5)) return 'baixo'
  return 'normal'
}

function calcEstoqueTotal(produto) {
  return produto.variacoes.reduce((s, v) => s + v.estoque, 0)
}

function badgeClass(status) {
  return { normal:'badge-normal', baixo:'badge-baixo', critico:'badge-critico' }[status] || 'badge-neutral'
}

function statusLabel(status) {
  return { normal:'Normal', baixo:'Baixo', critico:'Crítico' }[status] || status
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;')
}

function svgIcon(name, size = 16) {
  const icons = {
    home: `<polyline points="3 9 12 2 21 9"/><polyline points="9 22 9 12 15 12 15 22"/><path d="M3 9v13h18V9"/>`,
    grid: `<rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>`,
    plus: `<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>`,
    box: `<path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/>`,
    'shopping-cart': `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>`,
    'credit-card': `<rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>`,
    'bar-chart': `<line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/>`,
    tag: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/>`,
    users: `<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>`,
    'chevron-down': `<polyline points="6 9 12 15 18 9"/>`,
    'chevron-right': `<polyline points="9 18 15 12 9 6"/>`,
    edit: `<path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>`,
    trash: `<polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/>`,
    lock: `<rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>`,
    check: `<polyline points="20 6 9 17 4 12"/>`,
    x: `<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>`,
    printer: `<polyline points="6 9 6 2 18 2 18 9"/><path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/><rect x="6" y="14" width="12" height="8"/>`,
    label: `<path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>`,
    'refresh-cw': `<polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>`,
    download: `<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>`,
    'trending-up': `<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>`,
  }
  const paths = icons[name] || ''
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`
}

// ===== NAVEGAÇÃO =====

const NAV_ITEMS = {
  admin: [
    { label: 'Início',              screen: 'screen-dashboard',    icon: 'home'          },
    { label: 'Catálogo',            screen: 'screen-catalog',      icon: 'grid'          },
    { label: 'Novo Produto',        screen: 'screen-product-form', icon: 'plus'          },
    { label: 'Entrada Mercadoria',  screen: 'screen-stock-entry',  icon: 'box'           },
    { label: 'PDV',                 screen: 'screen-pdv',          icon: 'shopping-cart' },
    { label: 'Relatórios',          screen: 'screen-reports',      icon: 'bar-chart'     },
    { label: 'Promoções',           screen: 'screen-promotions',   icon: 'tag'           },
    { label: 'Usuários',            screen: 'screen-users',        icon: 'users'         },
  ],
  estoque: [
    { label: 'Início',              screen: 'screen-dashboard',    icon: 'home'          },
    { label: 'Catálogo',            screen: 'screen-catalog',      icon: 'grid'          },
    { label: 'Novo Produto',        screen: 'screen-product-form', icon: 'plus'          },
    { label: 'Entrada Mercadoria',  screen: 'screen-stock-entry',  icon: 'box'           },
  ],
  vendas: [
    { label: 'Início',              screen: 'screen-dashboard',    icon: 'home'          },
    { label: 'PDV',                 screen: 'screen-pdv',          icon: 'shopping-cart' },
    { label: 'Vendas do Dia',       screen: 'screen-reports',      icon: 'bar-chart'     },
  ],
}

function renderSidebar(terminal) {
  const items = NAV_ITEMS[terminal] || []
  const nav = document.getElementById('sidebar-nav')
  nav.innerHTML = `
    <div class="nav-section-label">Menu</div>
    ${items.map(item => `
      <a class="nav-item" data-screen="${item.screen}" onclick="navigateTo('${item.screen}')" role="button" tabindex="0">
        ${svgIcon(item.icon)}
        <span>${item.label}</span>
      </a>
    `).join('')}
  `
}

function updateNavActive(screenId) {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.classList.toggle('active', el.dataset.screen === screenId)
    el.setAttribute('aria-current', el.dataset.screen === screenId ? 'page' : 'false')
  })
}

function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'))
  const screen = document.getElementById(id)
  if (screen) {
    screen.classList.remove('hidden')
    screen.classList.add('animate-fade-in')
    setTimeout(() => screen.classList.remove('animate-fade-in'), 300)
  }
  appState.currentScreen = id
  updateNavActive(id)
}

function navigateTo(screenId) {
  closeSidebar()
  switch (screenId) {
    case 'screen-dashboard':   renderDashboard();             break
    case 'screen-catalog':     renderCatalog();               break
    case 'screen-product-form':renderProductForm(null);       break
    case 'screen-stock-entry': renderStockEntry();            break
    case 'screen-pdv':         renderPDV();                   break
    case 'screen-payment':     renderPayment();               break
    case 'screen-reports':     renderReports();               break
    case 'screen-promotions':  renderPromotions();            break
    case 'screen-users':       renderUsers();                 break
  }
  showScreen(screenId)
}

function setupNavigation() {
  document.querySelectorAll('.nav-item').forEach(el => {
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') navigateTo(el.dataset.screen)
    })
  })
}

// ===== SIDEBAR MOBILE =====

function toggleSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('sidebar-overlay')
  sidebar.classList.toggle('open')
  overlay.classList.toggle('hidden')
}

function closeSidebar() {
  const sidebar = document.getElementById('sidebar')
  const overlay = document.getElementById('sidebar-overlay')
  sidebar.classList.remove('open')
  overlay.classList.add('hidden')
}

// ===== LOGIN =====

function applyChipLogin(terminal) {
  const user = LOGINS.find(l => l.terminal === terminal)
  if (!user) return
  document.getElementById('login-email').value = user.email
  document.getElementById('login-senha').value = user.senha
  document.getElementById('login-error').classList.add('hidden')
}

function handleLogin() {
  const email = document.getElementById('login-email').value.trim()
  const senha = document.getElementById('login-senha').value
  const user = LOGINS.find(l => l.email === email && l.senha === senha)
  const errorEl = document.getElementById('login-error')

  if (!user) {
    errorEl.classList.remove('hidden')
    document.getElementById('login-email').classList.add('error')
    document.getElementById('login-senha').classList.add('error')
    return
  }

  errorEl.classList.add('hidden')
  document.getElementById('login-email').classList.remove('error')
  document.getElementById('login-senha').classList.remove('error')

  appState.currentUser = user
  appState.terminal = user.terminal

  document.getElementById('screen-login').classList.add('hidden')
  document.getElementById('app-shell').classList.remove('hidden')

  document.getElementById('sidebar-user-name').textContent = user.nome
  document.getElementById('sidebar-user-role').textContent =
    { admin:'Proprietário/Admin', estoque:'Gerente de Estoque', vendas:'Operador/Vendedor' }[user.terminal]
  document.getElementById('sidebar-avatar').textContent = user.avatar
  document.getElementById('avatar-initials').textContent = user.avatar

  renderSidebar(user.terminal)
  setupNavigation()
  navigateTo('screen-dashboard')
}

function handleLogout() {
  appState = {
    terminal: null, currentUser: null, currentScreen: null,
    cart: [], vendedorPrincipal: null, segundoVendedor: null, comissaoDividida: false,
    catalogoExpandido: {}, pdvVariacaoPickerAberto: null,
    pdvSelectedTamanho: null, pdvSelectedCor: null,
    catalogFiltros: { categorias:[], tamanhos:[], cores:[], estacoes:[], status:[], search:'' },
    reportTab: 'financeiro', reportPeriodo: 'hoje',
    entradaSelectedProduto: null, entradaQuantidades: {},
    gradeForm: { tamanhos:[], cores:[], celulas:{} },
    paymentMetodo: null, paymentParcelas: 1,
  }
  document.getElementById('app-shell').classList.add('hidden')
  document.getElementById('screen-login').classList.remove('hidden')
  document.getElementById('login-email').value = ''
  document.getElementById('login-senha').value = ''
  document.getElementById('login-error').classList.add('hidden')
}

// ===== TOAST =====

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container')
  const icons = { success: check_icon(), error: x_icon(), warning: warn_icon(), info: info_icon() }
  const toast = document.createElement('div')
  toast.className = `toast ${type}`
  toast.innerHTML = `
    <span class="toast-icon">${icons[type]}</span>
    <span class="toast-msg">${escHtml(message)}</span>
    <button class="toast-close" aria-label="Fechar">×</button>
  `
  toast.querySelector('.toast-close').addEventListener('click', () => toast.remove())
  container.appendChild(toast)
  setTimeout(() => { if (toast.parentNode) toast.remove() }, 4000)
}

function check_icon() { return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>` }
function x_icon()     { return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>` }
function warn_icon()  { return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>` }
function info_icon()  { return `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>` }

// ===== MODAL =====

function showModal(html) {
  document.getElementById('modal-box').innerHTML = html
  document.getElementById('modal-overlay').classList.remove('hidden')
}

function closeModal() {
  document.getElementById('modal-overlay').classList.add('hidden')
  document.getElementById('modal-box').innerHTML = ''
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal()
})


/* ============================================================
   KLESSKAP.JS — Parte 2/3: Dashboard, Catálogo, Form Produto, Entrada
   ============================================================ */

// ===== DASHBOARD =====

function renderDashboard() {
  const totalHoje = VENDAS.reduce((s, v) => s + v.total, 0)
  const totalOntem = 3420
  const varPct = Math.round(((totalHoje - totalOntem) / totalOntem) * 100)
  const varSinal = varPct >= 0 ? '↑' : '↓'
  const varColor = varPct >= 0 ? 'text-success' : 'text-danger'

  const qtdVendas = VENDAS.length
  const ticketMedio = totalHoje / qtdVendas
  const criticos = PRODUTOS.filter(p => calcStatusProduto(p) === 'critico').length

  const nomeHora = () => {
    const h = new Date().getHours()
    if (h < 12) return 'Bom dia'
    if (h < 18) return 'Boa tarde'
    return 'Boa noite'
  }

  const nome = appState.currentUser ? appState.currentUser.nome.split(' ')[0] : ''

  document.getElementById('screen-dashboard').innerHTML = `
    <div class="animate-fade-in">
      <h1 class="t-display text-ink mb-1" style="font-size:32px">${nomeHora()}, ${escHtml(nome)}.</h1>
      <p class="t-caps text-ink-3">${formatDate()}</p>

      <!-- Métricas 4 cols -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
        <div class="card card-metric">
          <p class="t-caps text-ink-3">Total vendas hoje</p>
          <p class="t-display text-ink mt-2 mb-1" style="font-size:30px;letter-spacing:-0.02em">${formatCurrency(totalHoje)}</p>
          <span class="text-[11px] font-medium ${varColor} flex items-center gap-1">${varSinal} ${Math.abs(varPct)}% vs ontem</span>
        </div>
        <div class="card card-metric">
          <p class="t-caps text-ink-3">Vendas realizadas</p>
          <p class="t-display text-ink mt-2 mb-1" style="font-size:30px;letter-spacing:-0.02em">${qtdVendas}</p>
          <span class="text-[11px] font-medium text-ink-3">transações hoje</span>
        </div>
        <div class="card card-metric">
          <p class="t-caps text-ink-3">Ticket médio</p>
          <p class="t-display text-ink mt-2 mb-1" style="font-size:30px;letter-spacing:-0.02em">${formatCurrency(ticketMedio)}</p>
          <span class="text-[11px] font-medium text-ink-3">por venda</span>
        </div>
        <div class="card card-metric ${criticos > 0 ? 'border-danger/30 bg-danger-s' : ''}">
          <p class="t-caps text-ink-3 ${criticos > 0 ? 'text-danger' : ''}">Alertas estoque</p>
          <p class="t-display mt-2 mb-1 ${criticos > 0 ? 'text-danger' : 'text-ink'}" style="font-size:30px;letter-spacing:-0.02em">${criticos}</p>
          <span class="text-[11px] font-medium ${criticos > 0 ? 'text-danger' : 'text-ink-3'}">${criticos > 0 ? 'produto(s) crítico(s)' : 'estoque saudável'}</span>
        </div>
      </div>

      <!-- Gráfico + tabela -->
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
        <!-- Gráfico -->
        <div class="card lg:col-span-3" style="padding:24px">
          <p class="t-caps text-ink-3 mb-4">Vendas — últimos 7 dias</p>
          ${renderChartSVG(VENDAS_SEMANA)}
        </div>
        <!-- Alertas estoque -->
        <div class="card lg:col-span-2" style="padding:24px">
          <p class="t-caps text-ink-3 mb-4">Alertas de estoque</p>
          ${renderAlertasEstoque()}
        </div>
      </div>

      <!-- Últimas vendas -->
      <div class="mt-6">
        <div class="section-header">
          <p class="t-caps text-ink-3">Últimas vendas</p>
          <button onclick="navigateTo('screen-reports')" class="btn btn-ghost btn-sm">Ver relatório</button>
        </div>
        ${renderSalesTable(VENDAS)}
      </div>
    </div>
  `
}

function renderChartSVG(data) {
  const W = 480, H = 160, PADDING = { top:10, right:10, bottom:36, left:44 }
  const chartW = W - PADDING.left - PADDING.right
  const chartH = H - PADDING.top - PADDING.bottom
  const maxVal = Math.max(...data.map(d => d.valor))
  const barW = Math.floor(chartW / data.length) - 8
  const bars = data.map((d, i) => {
    const x = PADDING.left + i * (chartW / data.length) + (chartW / data.length - barW) / 2
    const barH = Math.round((d.valor / maxVal) * chartH * 0.85)
    const y = PADDING.top + chartH - barH
    return `
      <rect x="${x}" y="${y}" width="${barW}" height="${barH}" rx="3" fill="#8B6F3E" fill-opacity="0.65"
        style="transition:fill-opacity 120ms ease" onmouseover="this.style.fillOpacity=1" onmouseout="this.style.fillOpacity=0.65"/>
      <text x="${x + barW/2}" y="${y - 4}" text-anchor="middle" font-size="9" font-family="JetBrains Mono,monospace" fill="#8B6F3E" font-weight="500">
        ${d.valor >= 1000 ? (d.valor/1000).toFixed(1)+'k' : d.valor}
      </text>
      <text x="${x + barW/2}" y="${H - 6}" text-anchor="middle" font-size="10" font-family="DM Sans,system-ui,sans-serif" fill="#8C857C">${d.dia}</text>
    `
  }).join('')
  const lineY = PADDING.top + chartH
  return `
    <div style="overflow-x:auto">
      <svg viewBox="0 0 ${W} ${H}" style="width:100%;max-width:${W}px;display:block">
        <line x1="${PADDING.left}" y1="${lineY}" x2="${W - PADDING.right}" y2="${lineY}" stroke="#D8D2C8" stroke-width="1"/>
        ${bars}
      </svg>
    </div>
  `
}

function renderSalesTable(vendas) {
  if (!vendas.length) {
    return `<div class="empty-state">
      ${svgIcon('shopping-cart', 36)}
      <p class="empty-state-title">Nenhuma venda hoje</p>
      <p class="empty-state-sub">As vendas realizadas no PDV aparecerão aqui.</p>
    </div>`
  }
  const statusColors = { 'Concluída':'normal', 'Cancelada':'critico', 'Pendente':'baixo' }
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>ID</th><th>Horário</th><th>Cliente</th><th>Vendedor</th>
            <th>Método</th><th>Total</th><th>Status</th>
          </tr>
        </thead>
        <tbody>
          ${vendas.map(v => `
            <tr>
              <td><span class="t-data text-ink-3">${escHtml(v.id)}</span></td>
              <td><span class="t-data">${escHtml(v.horario)}</span></td>
              <td>${v.cliente ? escHtml(v.cliente) : '<span class="text-ink-3">—</span>'}</td>
              <td>
                <span>${escHtml(v.vendedorPrincipal)}</span>
                ${v.comissaoDividida ? `<span class="badge badge-accent ml-1">Dividida</span>` : ''}
              </td>
              <td>${escHtml(v.metodo)}${v.parcelas > 1 ? ` <span class="text-ink-3 text-[12px]">${v.parcelas}x</span>` : ''}</td>
              <td><span class="t-data font-medium">${formatCurrency(v.total)}</span></td>
              <td>
                <span class="flex items-center gap-1.5">
                  <span class="status-dot ${statusColors[v.status] || 'normal'}"></span>
                  ${escHtml(v.status)}
                </span>
              </td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

function renderAlertasEstoque() {
  const alertas = []
  PRODUTOS.forEach(p => {
    p.variacoes.forEach(v => {
      if (v.estoque <= v.estoqueMin) {
        alertas.push({ produto: p.nome, variacao: `${v.tamanho} / ${v.cor}`, sku: v.sku, estoque: v.estoque, min: v.estoqueMin, status: v.estoque === 0 ? 'critico' : 'baixo' })
      }
    })
  })
  if (!alertas.length) {
    return `<p class="text-[13px] text-ink-3 text-center py-8">Nenhum alerta de estoque.</p>`
  }
  return `<div class="flex flex-col gap-3">
    ${alertas.slice(0,5).map(a => `
      <div class="flex items-center gap-3 p-3 rounded-lg border ${a.status === 'critico' ? 'border-danger/20 bg-danger-s' : 'border-warning/20 bg-warning-s'}">
        <div class="flex-1 min-w-0">
          <p class="text-[13px] font-medium text-ink truncate">${escHtml(a.produto)}</p>
          <p class="text-[11px] text-ink-3">${escHtml(a.variacao)} · <span class="t-data">${escHtml(a.sku)}</span></p>
        </div>
        <div class="text-right flex-shrink-0">
          <span class="badge ${badgeClass(a.status)}">${a.estoque === 0 ? 'Zerado' : a.estoque + ' un'}</span>
          <p class="text-[10px] text-ink-3 mt-0.5">mín ${a.min}</p>
        </div>
        <button onclick="navigateTo('screen-stock-entry')" class="btn btn-ghost btn-sm">Repor</button>
      </div>
    `).join('')}
    ${alertas.length > 5 ? `<p class="text-[11px] text-ink-3 text-center">+${alertas.length - 5} alertas adicionais</p>` : ''}
  </div>`
}

// ===== CATÁLOGO =====

function renderCatalog() {
  const totalProdutos = PRODUTOS.length
  const totalVariacoes = PRODUTOS.reduce((s, p) => s + p.variacoes.length, 0)
  const categorias = [...new Set(PRODUTOS.map(p => p.categoria))]
  const tamanhos  = [...new Set(PRODUTOS.flatMap(p => p.variacoes.map(v => v.tamanho)))]
  const cores     = [...new Set(PRODUTOS.flatMap(p => p.variacoes.map(v => v.cor)))]
  const estacoes  = [...new Set(PRODUTOS.map(p => p.estacao))]

  document.getElementById('screen-catalog').innerHTML = `
    <div class="animate-fade-in">
      <div class="section-header">
        <div class="flex items-center gap-3">
          <h1 class="t-display text-ink" style="font-size:28px">Catálogo</h1>
          <span class="badge badge-neutral">${totalProdutos} produtos</span>
          <span class="badge badge-neutral">${totalVariacoes} variações</span>
        </div>
        <button onclick="navigateTo('screen-product-form')" class="btn btn-primary">
          ${svgIcon('plus', 13)} Novo Produto
        </button>
      </div>

      <!-- Filtros -->
      <div class="mb-5 space-y-2">
        <div class="flex flex-wrap gap-2 items-center">
          <span class="t-caps text-ink-3">Categoria:</span>
          ${categorias.map(c => `
            <button onclick="toggleCatalogFilter('categorias','${escHtml(c)}')" class="filter-chip ${appState.catalogFiltros.categorias.includes(c) ? 'active' : ''}">${escHtml(c)}</button>
          `).join('')}
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <span class="t-caps text-ink-3">Tamanho:</span>
          ${tamanhos.map(t => `
            <button onclick="toggleCatalogFilter('tamanhos','${escHtml(t)}')" class="filter-chip ${appState.catalogFiltros.tamanhos.includes(t) ? 'active' : ''}">${escHtml(t)}</button>
          `).join('')}
        </div>
        <div class="flex flex-wrap gap-2 items-center">
          <span class="t-caps text-ink-3">Status:</span>
          ${['normal','baixo','critico'].map(s => `
            <button onclick="toggleCatalogFilter('status','${s}')" class="filter-chip ${appState.catalogFiltros.status.includes(s) ? 'active' : ''}">${statusLabel(s)}</button>
          `).join('')}
          <input type="text" class="input ml-2" style="width:200px;padding:5px 10px;font-size:12px" placeholder="Ref., SKU, produto..." value="${escHtml(appState.catalogFiltros.search)}" oninput="setCatalogSearch(this.value)">
        </div>
      </div>

      <!-- Tabela -->
      <div id="catalog-table-container">
        ${renderCatalogTable()}
      </div>
    </div>
  `
}

function toggleCatalogFilter(key, value) {
  const arr = appState.catalogFiltros[key]
  const idx = arr.indexOf(value)
  if (idx === -1) arr.push(value)
  else arr.splice(idx, 1)
  renderCatalog()
}

function setCatalogSearch(val) {
  appState.catalogFiltros.search = val
  document.getElementById('catalog-table-container').innerHTML = renderCatalogTable()
}

function filteredProdutos() {
  const f = appState.catalogFiltros
  return PRODUTOS.filter(p => {
    if (f.categorias.length && !f.categorias.includes(p.categoria)) return false
    if (f.estacoes.length  && !f.estacoes.includes(p.estacao))      return false
    if (f.tamanhos.length  && !p.variacoes.some(v => f.tamanhos.includes(v.tamanho))) return false
    if (f.cores.length     && !p.variacoes.some(v => f.cores.includes(v.cor)))         return false
    if (f.status.length    && !f.status.includes(calcStatusProduto(p)))                return false
    if (f.search) {
      const q = f.search.toLowerCase()
      const match = p.nome.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q) ||
        p.variacoes.some(v => v.sku.toLowerCase().includes(q) || v.barcode.includes(q))
      if (!match) return false
    }
    return true
  })
}

function renderCatalogTable() {
  const produtos = filteredProdutos()
  if (!produtos.length) {
    return `<div class="empty-state">
      ${svgIcon('grid', 36)}
      <p class="empty-state-title">Nenhum produto encontrado</p>
      <p class="empty-state-sub">Ajuste os filtros ou cadastre um novo produto.</p>
      <button onclick="navigateTo('screen-product-form')" class="btn btn-primary">Novo Produto</button>
    </div>`
  }
  return `
    <div class="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Nome</th><th>Categoria</th><th>Tecido</th><th>Estação</th>
            <th>Referência</th><th>Estoque Total</th><th>Variações</th><th>Status</th><th>Ações</th>
          </tr>
        </thead>
        <tbody id="catalog-tbody">
          ${produtos.map(p => renderCatalogRow(p)).join('')}
        </tbody>
      </table>
    </div>
  `
}

function renderCatalogRow(p) {
  const status = calcStatusProduto(p)
  const estTotal = calcEstoqueTotal(p)
  const expanded = !!appState.catalogoExpandido[p.id]
  return `
    <tr id="row-${p.id}">
      <td class="font-medium">${escHtml(p.nome)}</td>
      <td>${escHtml(p.categoria)}</td>
      <td>${escHtml(p.tecido)}</td>
      <td>${escHtml(p.estacao)}</td>
      <td><span class="t-data text-ink-3">${escHtml(p.ref)}</span></td>
      <td><span class="t-data font-medium">${estTotal}</span></td>
      <td><span class="badge badge-neutral">${p.variacoes.length} variações</span></td>
      <td><span class="badge ${badgeClass(status)}">${statusLabel(status)}</span></td>
      <td>
        <div class="flex items-center gap-1">
          <button onclick="toggleGradeVariacoes('${p.id}')" class="btn btn-ghost btn-sm" aria-expanded="${expanded}">
            Grade ${expanded ? svgIcon('chevron-down',12) : svgIcon('chevron-right',12)}
          </button>
          <button onclick="openProductForm('${p.id}')" class="btn btn-ghost btn-sm">${svgIcon('edit',13)}</button>
          <button onclick="showToast('Etiquetas geradas para ${escHtml(p.nome.replace(/'/g, "\\'"))}','success')" class="btn btn-ghost btn-sm">${svgIcon('label',13)}</button>
        </div>
      </td>
    </tr>
    ${expanded ? renderGradeVariacoesRow(p) : `<tr id="grade-${p.id}" class="hidden"></tr>`}
  `
}

function toggleGradeVariacoes(produtoId) {
  appState.catalogoExpandido[produtoId] = !appState.catalogoExpandido[produtoId]
  const tbody = document.getElementById('catalog-tbody')
  if (!tbody) return
  const produto = PRODUTOS.find(p => p.id === produtoId)
  if (!produto) return
  const rows = tbody.querySelectorAll(`#row-${produtoId}, #grade-${produtoId}, .grade-rows-${produtoId}`)
  rows.forEach(r => r.remove())
  const temp = document.createElement('tbody')
  temp.innerHTML = renderCatalogRow(produto)
  Array.from(temp.children).forEach(child => tbody.appendChild(child))
}

function renderGradeVariacoesRow(p) {
  return `
    <tr id="grade-${p.id}" class="grade-rows-${p.id}">
      <td colspan="9" style="padding:0">
        <div class="variacao-grade animate-expand">
          <p class="text-[11px] text-ink-3 italic px-4 py-2">O estoque real é controlado por tamanho e cor de cada variação.</p>
          <table style="width:100%;border-collapse:collapse">
            <thead>
              <tr style="background:#EDE9E2">
                <th style="padding:8px 16px 8px 40px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Tamanho</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Cor</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">SKU</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Barcode</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Estoque</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Mínimo</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Preço</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Status</th>
                <th style="padding:8px 16px;text-align:left;font-size:10px;font-weight:500;letter-spacing:0.10em;text-transform:uppercase;color:#8C857C;border-bottom:1px solid #D8D2C8">Ações</th>
              </tr>
            </thead>
            <tbody>
              ${p.variacoes.map(v => {
                const rowBg = v.estoque === 0 ? 'background:rgba(139,58,46,0.05)' : v.estoque <= v.estoqueMin ? 'background:rgba(122,95,42,0.05)' : ''
                return `
                  <tr style="${rowBg}">
                    <td style="padding:10px 16px 10px 40px;border-bottom:1px solid #E6E1D8;font-size:12.5px">${escHtml(v.tamanho)}</td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8;font-size:12.5px">${escHtml(v.cor)}</td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8"><span class="t-data text-[12px]">${escHtml(v.sku)}</span></td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8"><span class="t-data text-[12px]">${escHtml(v.barcode)}</span></td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8"><span class="t-data font-medium">${v.estoque}</span></td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8"><span class="t-data text-ink-3">${v.estoqueMin}</span></td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8"><span class="t-data">${formatCurrency(v.preco)}</span></td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8"><span class="badge ${badgeClass(v.status)}">${statusLabel(v.status)}</span></td>
                    <td style="padding:10px 16px;border-bottom:1px solid #E6E1D8">
                      <div class="flex gap-1">
                        <button class="btn btn-ghost btn-sm" onclick="showToast('Editando variação ${escHtml(v.sku)}','info')">${svgIcon('edit',12)} Editar</button>
                        <button class="btn btn-ghost btn-sm" onclick="showToast('Etiqueta gerada: ${escHtml(v.sku)}','success')">${svgIcon('label',12)} Etiqueta</button>
                      </div>
                    </td>
                  </tr>
                `
              }).join('')}
            </tbody>
          </table>
        </div>
      </td>
    </tr>
  `
}

// ===== FORMULÁRIO DE PRODUTO =====

function openProductForm(produtoId) {
  navigateTo('screen-product-form')
  if (produtoId) renderProductForm(produtoId)
}

function renderProductForm(produtoId) {
  const produto = produtoId ? PRODUTOS.find(p => p.id === produtoId) : null
  const isEdit = !!produto
  const isAdminOrEstoque = ['admin','estoque'].includes(appState.terminal)

  if (!appState.gradeForm || !isEdit) {
    if (produto) {
      const tamanhos = [...new Set(produto.variacoes.map(v => v.tamanho))]
      const cores    = [...new Set(produto.variacoes.map(v => v.cor))]
      const celulas  = {}
      produto.variacoes.forEach(v => {
        celulas[`${v.tamanho}|${v.cor}`] = { sku: v.sku, barcode: v.barcode, estoque: v.estoque, estoqueMin: v.estoqueMin, preco: v.preco }
      })
      appState.gradeForm = { tamanhos, cores, celulas }
    } else {
      appState.gradeForm = { tamanhos: ['P','M','G'], cores: ['Preto'], celulas: {} }
    }
  }

  const categorias = ['Blazers','Calças','Camisas','Vestidos','Saias','Acessórios','Casacos','Moletons']
  const estacoes   = ['Verão','Inverno','Outono','Primavera','Todas']

  document.getElementById('screen-product-form').innerHTML = `
    <div class="animate-fade-in max-w-4xl">
      <div class="section-header mb-6">
        <div class="flex items-center gap-3">
          <button onclick="navigateTo('screen-catalog')" class="btn-icon">${svgIcon('chevron-down',16)}</button>
          <h1 class="t-display text-ink" style="font-size:28px">${isEdit ? 'Editar Produto' : 'Novo Produto'}</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Col 1: Info base + preços -->
        <div class="lg:col-span-1 space-y-5">
          <!-- Produto base -->
          <div class="card" style="padding:24px">
            <p class="t-caps text-ink-3 mb-4">Produto base</p>
            <div class="space-y-4">
              <div>
                <label class="input-label" for="pf-nome">Nome do produto</label>
                <input id="pf-nome" class="input" placeholder="Ex: Blazer Alfaiataria" value="${produto ? escHtml(produto.nome) : ''}">
              </div>
              <div>
                <label class="input-label" for="pf-categoria">Categoria</label>
                <select id="pf-categoria" class="input">
                  ${categorias.map(c => `<option value="${c}" ${produto && produto.categoria === c ? 'selected' : ''}>${c}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="input-label" for="pf-tecido">Tecido</label>
                <input id="pf-tecido" class="input" placeholder="Ex: Viscose, Linho..." value="${produto ? escHtml(produto.tecido) : ''}">
              </div>
              <div>
                <label class="input-label" for="pf-estacao">Estação</label>
                <select id="pf-estacao" class="input">
                  ${estacoes.map(e => `<option value="${e}" ${produto && produto.estacao === e ? 'selected' : ''}>${e}</option>`).join('')}
                </select>
              </div>
              <div>
                <label class="input-label" for="pf-ref">Referência de fábrica</label>
                <input id="pf-ref" class="input" placeholder="Ex: BLZ-2026-089" value="${produto ? escHtml(produto.ref) : ''}">
              </div>
              <div>
                <label class="input-label" for="pf-desc">Descrição</label>
                <textarea id="pf-desc" class="input" rows="3" placeholder="Descrição do produto...">${produto ? escHtml(produto.descricao) : ''}</textarea>
              </div>
            </div>
          </div>

          <!-- Preços base (admin/estoque) -->
          ${isAdminOrEstoque ? `
          <div class="card" style="padding:24px">
            <p class="t-caps text-ink-3 mb-4">Preços base</p>
            <div class="space-y-4">
              <div>
                <label class="input-label" for="pf-preco">Preço de venda (R$)</label>
                <input id="pf-preco" class="input" type="number" step="0.01" placeholder="0,00" value="${produto ? produto.variacoes[0].preco : ''}">
              </div>
              <div>
                <label class="input-label" for="pf-custo">Custo unitário (R$)</label>
                <input id="pf-custo" class="input" type="number" step="0.01" placeholder="0,00" value="${produto ? produto.variacoes[0].custo : ''}">
              </div>
            </div>
          </div>
          ` : ''}
        </div>

        <!-- Col 2: Grade de variações -->
        <div class="lg:col-span-2">
          <div class="card" style="padding:24px">
            <div class="flex items-center justify-between mb-1">
              <p class="t-caps text-ink-3">Grade de variações</p>
              <div class="flex gap-2">
                <button onclick="promptAddTamanho()" class="btn btn-ghost btn-sm">${svgIcon('plus',12)} Tamanho</button>
                <button onclick="promptAddCor()" class="btn btn-ghost btn-sm">${svgIcon('plus',12)} Cor</button>
              </div>
            </div>
            <p class="text-[11px] text-ink-3 mb-4">Cada célula da grade representa uma variação com estoque próprio.</p>
            ${renderGradeFormTable()}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <div class="flex justify-end gap-3 mt-6">
        <button onclick="navigateTo('screen-catalog')" class="btn btn-ghost">Cancelar</button>
        <button onclick="saveProduct()" class="btn btn-primary">${svgIcon('check',13)} Salvar Produto</button>
      </div>
    </div>
  `
}

function renderGradeFormTable() {
  const { tamanhos, cores, celulas } = appState.gradeForm
  if (!tamanhos.length || !cores.length) {
    return `<p class="text-[13px] text-ink-3 py-4">Adicione tamanhos e cores para montar a grade.</p>`
  }
  return `
    <div style="overflow-x:auto">
      <table class="grade-table">
        <thead>
          <tr>
            <th>TAM \\ COR</th>
            ${cores.map(c => `<th>${escHtml(c)}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${tamanhos.map(t => `
            <tr>
              <td class="row-header">${escHtml(t)}</td>
              ${cores.map(c => {
                const key = `${t}|${c}`
                const cell = celulas[key]
                if (cell) {
                  return `
                    <td class="grade-cell-active" title="${escHtml(key)}">
                      <div class="text-[11px] font-mono text-ink-2">${escHtml(cell.sku)}</div>
                      <div class="text-[10px] text-ink-3">Est: ${cell.estoque} · Mín: ${cell.estoqueMin}</div>
                    </td>
                  `
                } else {
                  return `<td class="grade-cell-empty" onclick="activateCell('${escHtml(t)}','${escHtml(c)}')" title="Ativar ${t}/${c}">+</td>`
                }
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

function promptAddTamanho() {
  const val = prompt('Nome do tamanho (ex: P, M, G, 36, T1):')
  if (val && val.trim()) {
    const t = val.trim()
    if (!appState.gradeForm.tamanhos.includes(t)) {
      appState.gradeForm.tamanhos.push(t)
    }
    const container = document.querySelector('#screen-product-form .card:last-of-type')
    renderProductFormGradeOnly()
  }
}

function promptAddCor() {
  const val = prompt('Nome da cor (ex: Preto, Off White, Azul):')
  if (val && val.trim()) {
    const c = val.trim()
    if (!appState.gradeForm.cores.includes(c)) {
      appState.gradeForm.cores.push(c)
    }
    renderProductFormGradeOnly()
  }
}

function renderProductFormGradeOnly() {
  const gradeContainer = document.querySelector('#screen-product-form .lg\\:col-span-2 .card > div:last-of-type')
  if (gradeContainer) gradeContainer.innerHTML = renderGradeFormTable()
}

function activateCell(tamanho, cor) {
  const key = `${tamanho}|${cor}`
  const ref = document.getElementById('pf-ref')
  const refVal = ref ? ref.value.trim() : 'PROD'
  const sku = generateSKU(refVal || 'PROD', tamanho, cor)
  appState.gradeForm.celulas[key] = { sku, barcode: generateBarcode(), estoque: 0, estoqueMin: 2, preco: 0 }
  renderProductFormGradeOnly()
}

function generateSKU(ref, tamanho, cor) {
  const cleanRef = (ref || 'PROD').split('-')[0].toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,4)
  const cleanTam = tamanho.toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,3)
  const cleanCor = cor.toUpperCase().replace(/[^A-Z]/g,'').slice(0,3)
  return `${cleanRef}-${cleanTam}-${cleanCor}`
}

function generateBarcode() {
  return '789' + String(Math.floor(Math.random() * 9999999999)).padStart(10,'0')
}

function saveProduct() {
  const nome = document.getElementById('pf-nome')?.value.trim()
  if (!nome) {
    showToast('Informe o nome do produto.', 'error')
    return
  }
  showToast(`Produto "${nome}" salvo com sucesso.`, 'success')
  setTimeout(() => navigateTo('screen-catalog'), 800)
}

// ===== ENTRADA DE MERCADORIA =====

function renderStockEntry() {
  document.getElementById('screen-stock-entry').innerHTML = `
    <div class="animate-fade-in max-w-3xl">
      <div class="section-header mb-6">
        <h1 class="t-display text-ink" style="font-size:28px">Entrada de Mercadoria</h1>
      </div>

      <!-- Responsável -->
      <div class="card mb-6" style="padding:24px">
        <p class="t-caps text-ink-3 mb-4">Responsável pelo recebimento</p>
        <div style="max-width:320px">
          <label class="input-label" for="entrada-responsavel">Responsável</label>
          <select id="entrada-responsavel" class="input">
            <option value="">Selecionar responsável...</option>
            ${EQUIPE_ESTOQUE.map(e => `<option value="${e.id}">${escHtml(e.nome)} — ${escHtml(e.cargo)}</option>`).join('')}
          </select>
        </div>
      </div>

      <!-- Busca de produto -->
      <div class="card mb-6" style="padding:24px">
        <p class="t-caps text-ink-3 mb-4">Produto recebido</p>
        <div class="relative mb-4">
          <label class="input-label" for="entrada-busca">Buscar produto</label>
          <input id="entrada-busca" class="input" placeholder="Nome ou referência..." oninput="searchProdutoEntrada(this.value)">
        </div>
        <div id="entrada-resultados"></div>
        <div id="entrada-grade"></div>
      </div>

      <!-- Histórico -->
      <div class="card" style="padding:24px">
        <p class="t-caps text-ink-3 mb-4">Histórico de movimentações</p>
        <div class="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Tipo</th><th>Produto</th><th>Variação</th><th>Qtd</th><th>Responsável</th><th>Data/Hora</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span class="badge badge-normal">Entrada</span></td>
                <td>Blazer Alfaiataria</td>
                <td><span class="t-data text-[12px]">Off White / M — BLZ-M-OFW</span></td>
                <td><span class="t-data">+10</span></td>
                <td>Ricardo Mendes</td>
                <td><span class="t-data text-ink-3">06/06/2026 14:32</span></td>
              </tr>
              <tr>
                <td><span class="badge badge-critico">Saída</span></td>
                <td>Calça Wide Leg</td>
                <td><span class="t-data text-[12px]">Preta / 36 — CWL-36-PRT</span></td>
                <td><span class="t-data">-1</span></td>
                <td>Sistema (Venda)</td>
                <td><span class="t-data text-ink-3">08/06/2026 09:15</span></td>
              </tr>
              <tr>
                <td><span class="badge badge-normal">Entrada</span></td>
                <td>Camisa Linho</td>
                <td><span class="t-data text-[12px]">Bege / P — CML-P-BEG</span></td>
                <td><span class="t-data">+5</span></td>
                <td>Camila Nogueira</td>
                <td><span class="t-data text-ink-3">05/06/2026 10:00</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
}

function searchProdutoEntrada(query) {
  const resultsEl = document.getElementById('entrada-resultados')
  if (!query.trim()) { resultsEl.innerHTML = ''; return }
  const q = query.toLowerCase()
  const matches = PRODUTOS.filter(p => p.nome.toLowerCase().includes(q) || p.ref.toLowerCase().includes(q))
  if (!matches.length) {
    resultsEl.innerHTML = `<p class="text-[13px] text-ink-3 mt-2">Nenhum produto encontrado.</p>`
    return
  }
  resultsEl.innerHTML = `
    <div class="border border-border rounded-lg overflow-hidden mt-2">
      ${matches.map(p => `
        <div class="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-subtle cursor-pointer transition-colors"
          onclick="selectProdutoEntrada('${p.id}')">
          <div class="flex-1">
            <p class="text-[13.5px] font-medium text-ink">${escHtml(p.nome)}</p>
            <p class="text-[11px] text-ink-3"><span class="t-data">${escHtml(p.ref)}</span> · ${escHtml(p.categoria)}</p>
          </div>
          <span class="badge ${badgeClass(calcStatusProduto(p))}">${calcEstoqueTotal(p)} un</span>
        </div>
      `).join('')}
    </div>
  `
}

function selectProdutoEntrada(produtoId) {
  const p = PRODUTOS.find(x => x.id === produtoId)
  if (!p) return
  appState.entradaSelectedProduto = produtoId
  appState.entradaQuantidades = {}

  document.getElementById('entrada-busca').value = p.nome
  document.getElementById('entrada-resultados').innerHTML = ''

  document.getElementById('entrada-grade').innerHTML = `
    <div class="mt-4 animate-fade-in">
      <p class="text-[13px] font-medium text-ink mb-3">Selecione a variação e a quantidade recebida:</p>
      <div class="space-y-2" id="entrada-variacoes">
        ${p.variacoes.map(v => `
          <div class="flex items-center gap-3 p-3 rounded-lg border border-border bg-elevated">
            <div class="flex-1">
              <p class="text-[13px] font-medium">${escHtml(v.tamanho)} / ${escHtml(v.cor)}</p>
              <p class="text-[11px] text-ink-3"><span class="t-data">${escHtml(v.sku)}</span> · Estoque atual: ${v.estoque}</p>
            </div>
            <div style="width:100px">
              <input type="number" min="0" class="input text-center" style="padding:5px 8px;font-size:13px"
                placeholder="0" id="entrada-qtd-${v.id}"
                oninput="appState.entradaQuantidades['${v.id}'] = parseInt(this.value)||0">
            </div>
          </div>
        `).join('')}
      </div>
      <div class="flex justify-end mt-4">
        <button onclick="confirmEntry()" class="btn btn-primary">
          ${svgIcon('check',13)} Confirmar Entrada
        </button>
      </div>
    </div>
  `
}

function confirmEntry() {
  const responsavel = document.getElementById('entrada-responsavel')?.value
  if (!responsavel) {
    showToast('Selecione o responsável pelo recebimento.', 'error')
    return
  }
  const qtds = appState.entradaQuantidades
  const total = Object.values(qtds).reduce((s, q) => s + q, 0)
  if (total === 0) {
    showToast('Informe a quantidade de pelo menos uma variação.', 'error')
    return
  }
  const p = PRODUTOS.find(x => x.id === appState.entradaSelectedProduto)
  if (p) {
    Object.entries(qtds).forEach(([vid, qtd]) => {
      if (qtd > 0) {
        const v = p.variacoes.find(x => x.id === vid)
        if (v) {
          v.estoque += qtd
          v.status = v.estoque < v.estoqueMin ? 'critico' : v.estoque <= v.estoqueMin * 1.5 ? 'baixo' : 'normal'
        }
      }
    })
  }
  showToast(`Entrada registrada: ${total} unidade(s) em ${p ? p.nome : 'produto'}.`, 'success')
  appState.entradaSelectedProduto = null
  appState.entradaQuantidades = {}
  renderStockEntry()
}

/* ============================================================
   KLESSKAP.JS — Parte 3/3: PDV, Pagamento, Relatórios, Promoções, Usuários, Init
   ============================================================ */

// ===== PDV =====

function renderPDV() {
  document.getElementById('screen-pdv').innerHTML = `
    <div class="animate-fade-in">
      <div class="section-header mb-4">
        <h1 class="t-display text-ink" style="font-size:28px">Frente de Caixa</h1>
      </div>
      <div class="flex gap-6 flex-col lg:flex-row">
        <!-- Coluna esquerda: busca + picker -->
        <div class="flex-1">
          <div class="card mb-4" style="padding:20px">
            <label class="input-label" for="pdv-busca">Buscar produto — nome, SKU ou código de barras</label>
            <input id="pdv-busca" class="input" style="font-size:16px;padding:10px 14px" placeholder="Digite para buscar..."
              oninput="searchProdutoPDV(this.value)" autocomplete="off">
            <div id="pdv-resultados" class="mt-2"></div>
          </div>
          <div id="pdv-picker"></div>
        </div>

        <!-- Coluna direita: carrinho + resumo -->
        <div style="width:320px;flex-shrink:0">
          <div class="card mb-4" style="padding:20px">
            <p class="t-caps text-ink-3 mb-3">Cliente</p>
            <select id="pdv-cliente" class="input mb-4">
              <option value="">Sem cliente</option>
              <option value="fernanda">Fernanda Costa</option>
              <option value="mariana">Mariana Souza</option>
              <option value="julia">Julia Alves</option>
            </select>

            <p class="t-caps text-ink-3 mb-2">Vendedor principal <span class="text-danger">*</span></p>
            <select id="pdv-vendedor-1" class="input mb-3" onchange="updateVendedorState()">
              <option value="">Selecionar vendedor...</option>
              ${VENDEDORES.map(v => `<option value="${v.id}">${escHtml(v.nome)}</option>`).join('')}
            </select>

            <label class="flex items-center gap-2 cursor-pointer mb-3">
              <label class="toggle">
                <input type="checkbox" id="pdv-toggle-comissao" onchange="toggleComissaoPDV()">
                <span class="toggle-slider"></span>
              </label>
              <span class="text-[13px] text-ink-2">Dividir comissão</span>
            </label>

            <div id="pdv-segundo-vendedor" class="hidden animate-fade-in">
              <p class="t-caps text-ink-3 mb-2">Segundo vendedor</p>
              <select id="pdv-vendedor-2" class="input mb-2" onchange="updateVendedorState()">
                <option value="">Selecionar vendedor...</option>
                ${VENDEDORES.map(v => `<option value="${v.id}">${escHtml(v.nome)}</option>`).join('')}
              </select>
              <div id="pdv-comissao-resumo" class="text-[11px] text-ink-3 mb-3"></div>
            </div>
          </div>

          <!-- Carrinho -->
          <div class="card" style="padding:20px">
            <p class="t-caps text-ink-3 mb-3">Carrinho <span id="pdv-cart-count" class="badge badge-neutral ml-1"></span></p>
            <div id="pdv-cart-items">
              <div class="empty-state" style="padding:32px 20px">
                ${svgIcon('shopping-cart', 28)}
                <p class="empty-state-title" style="font-size:16px">Carrinho vazio</p>
                <p class="empty-state-sub">Busque um produto para adicionar.</p>
              </div>
            </div>
            <div id="pdv-total-area" class="hidden mt-3 pt-3 border-t border-border">
              <div class="flex justify-between items-baseline mb-1">
                <span class="text-[12px] text-ink-3">Subtotal</span>
                <span class="t-data text-[13px]" id="pdv-subtotal"></span>
              </div>
              <div class="flex justify-between items-baseline">
                <span class="t-caps text-ink-3">Total</span>
                <span class="t-display text-ink" style="font-size:28px" id="pdv-total-value"></span>
              </div>
            </div>
            <button id="btn-ir-pagamento" onclick="goToPayment()" class="btn btn-accent btn-full btn-lg mt-4" disabled>
              Ir para Pagamento
            </button>
          </div>
        </div>
      </div>
    </div>
  `
  renderCart()
}

function searchProdutoPDV(query) {
  const resultsEl = document.getElementById('pdv-resultados')
  if (!query.trim()) { resultsEl.innerHTML = ''; return }
  const q = query.toLowerCase()
  const matches = PRODUTOS.filter(p =>
    p.nome.toLowerCase().includes(q) ||
    p.variacoes.some(v => v.sku.toLowerCase().includes(q) || v.barcode.includes(q))
  ).slice(0, 5)

  if (!matches.length) {
    resultsEl.innerHTML = `<p class="text-[12px] text-ink-3 mt-2 px-1">Nenhum produto encontrado.</p>`
    return
  }
  resultsEl.innerHTML = `
    <div class="border border-border rounded-lg overflow-hidden">
      ${matches.map(p => {
        const est = calcEstoqueTotal(p)
        return `
          <div class="flex items-center gap-3 px-4 py-3 border-b border-border last:border-0 hover:bg-subtle cursor-pointer transition-colors"
            onclick="selectProdutoPDV('${p.id}')">
            <div class="flex-1 min-w-0">
              <p class="text-[13.5px] font-medium text-ink">${escHtml(p.nome)}</p>
              <p class="text-[11px] text-ink-3">${escHtml(p.categoria)} · ${p.variacoes.length} variações</p>
            </div>
            <span class="badge ${est > 0 ? 'badge-normal' : 'badge-critico'}">${est} un</span>
          </div>
        `
      }).join('')}
    </div>
  `
}

function selectProdutoPDV(produtoId) {
  const p = PRODUTOS.find(x => x.id === produtoId)
  if (!p) return
  document.getElementById('pdv-busca').value = ''
  document.getElementById('pdv-resultados').innerHTML = ''

  const disponiveis = p.variacoes.filter(v => v.estoque > 0)
  if (p.variacoes.length === 1 && disponiveis.length === 1) {
    addToCart(p.id, p.variacoes[0].id)
    return
  }
  appState.pdvVariacaoPickerAberto = produtoId
  appState.pdvSelectedTamanho = null
  appState.pdvSelectedCor = null
  renderVariacaoPicker(p)
}

function renderVariacaoPicker(p) {
  const tamanhos = [...new Set(p.variacoes.map(v => v.tamanho))]
  const pickerEl = document.getElementById('pdv-picker')
  pickerEl.innerHTML = `
    <div class="variacao-picker mb-4">
      <div class="flex items-center justify-between mb-3">
        <p class="t-display text-ink" style="font-size:18px">${escHtml(p.nome)}</p>
        <button onclick="closePicker()" class="btn-icon">${svgIcon('x', 14)}</button>
      </div>

      <p class="t-caps text-ink-3 mb-2">Tamanho</p>
      <div class="flex flex-wrap gap-2 mb-4" id="picker-tamanhos">
        ${tamanhos.map(t => {
          const temEstoque = p.variacoes.some(v => v.tamanho === t && v.estoque > 0)
          return `
            <button
              class="variacao-chip ${!temEstoque ? 'sem-estoque' : ''} ${appState.pdvSelectedTamanho === t ? 'selected' : ''}"
              onclick="${temEstoque ? `selectTamanhoPicker('${escHtml(p.id)}','${escHtml(t)}')` : ''}"
              ${!temEstoque ? 'aria-disabled="true"' : ''}
            >${escHtml(t)}</button>
          `
        }).join('')}
      </div>

      <div id="picker-cores-area">
        ${appState.pdvSelectedTamanho ? renderCorChips(p) : '<p class="text-[12px] text-ink-3">Selecione um tamanho primeiro.</p>'}
      </div>

      <div id="picker-estoque-info" class="mt-3 text-[12px] text-ink-3"></div>

      <button id="btn-add-picker" onclick="confirmVariacaoPicker('${p.id}')"
        class="btn btn-accent btn-full mt-4"
        ${(appState.pdvSelectedTamanho && appState.pdvSelectedCor) ? '' : 'disabled'}>
        Adicionar ao carrinho
      </button>
    </div>
  `
}

function renderCorChips(p) {
  if (!appState.pdvSelectedTamanho) return ''
  const cores = p.variacoes
    .filter(v => v.tamanho === appState.pdvSelectedTamanho)
    .map(v => ({ cor: v.cor, estoque: v.estoque }))

  const infoHtml = appState.pdvSelectedCor ? (() => {
    const v = p.variacoes.find(x => x.tamanho === appState.pdvSelectedTamanho && x.cor === appState.pdvSelectedCor)
    return v ? `Estoque: ${v.estoque} unidade(s) disponível(is)` : ''
  })() : ''

  return `
    <p class="t-caps text-ink-3 mb-2">Cor</p>
    <div class="flex flex-wrap gap-2">
      ${cores.map(({ cor, estoque }) => `
        <button
          class="variacao-chip ${estoque === 0 ? 'sem-estoque' : ''} ${appState.pdvSelectedCor === cor ? 'selected' : ''}"
          onclick="${estoque > 0 ? `selectCorPicker('${escHtml(p.id)}','${escHtml(cor)}')` : ''}"
          ${estoque === 0 ? 'aria-disabled="true"' : ''}
        >${escHtml(cor)}</button>
      `).join('')}
    </div>
    <p class="mt-2 text-[12px] text-ink-3">${infoHtml}</p>
  `
}

function selectTamanhoPicker(produtoId, tamanho) {
  appState.pdvSelectedTamanho = tamanho
  appState.pdvSelectedCor = null
  const p = PRODUTOS.find(x => x.id === produtoId)
  if (p) renderVariacaoPicker(p)
}

function selectCorPicker(produtoId, cor) {
  appState.pdvSelectedCor = cor
  const p = PRODUTOS.find(x => x.id === produtoId)
  if (p) renderVariacaoPicker(p)
}

function confirmVariacaoPicker(produtoId) {
  const p = PRODUTOS.find(x => x.id === produtoId)
  if (!p || !appState.pdvSelectedTamanho || !appState.pdvSelectedCor) return
  const v = p.variacoes.find(x => x.tamanho === appState.pdvSelectedTamanho && x.cor === appState.pdvSelectedCor)
  if (!v) return
  addToCart(p.id, v.id)
  closePicker()
}

function closePicker() {
  appState.pdvVariacaoPickerAberto = null
  appState.pdvSelectedTamanho = null
  appState.pdvSelectedCor = null
  const pickerEl = document.getElementById('pdv-picker')
  if (pickerEl) pickerEl.innerHTML = ''
}

function addToCart(produtoId, variacaoId) {
  const p = PRODUTOS.find(x => x.id === produtoId)
  const v = p && p.variacoes.find(x => x.id === variacaoId)
  if (!p || !v) return

  const existing = appState.cart.find(item => item.variacaoId === variacaoId)
  if (existing) {
    if (existing.qtd < v.estoque) {
      existing.qtd++
    } else {
      showToast('Limite de estoque atingido.', 'warning')
    }
  } else {
    appState.cart.push({
      produtoId, variacaoId,
      nome: p.nome,
      variacao: `${v.cor} / ${v.tamanho}`,
      sku: v.sku,
      preco: v.preco,
      estoqueMax: v.estoque,
      qtd: 1,
    })
  }
  renderCart()
  showToast(`${p.nome} adicionado ao carrinho.`, 'success')
}

function removeFromCart(variacaoId) {
  appState.cart = appState.cart.filter(item => item.variacaoId !== variacaoId)
  renderCart()
}

function updateQty(variacaoId, delta) {
  const item = appState.cart.find(x => x.variacaoId === variacaoId)
  if (!item) return
  const newQty = item.qtd + delta
  if (newQty <= 0) { removeFromCart(variacaoId); return }
  if (newQty > item.estoqueMax) { showToast('Limite de estoque atingido.', 'warning'); return }
  item.qtd = newQty
  renderCart()
}

function renderCart() {
  const cartEl = document.getElementById('pdv-cart-items')
  const totalArea = document.getElementById('pdv-total-area')
  const btnPagar = document.getElementById('btn-ir-pagamento')
  const countEl = document.getElementById('pdv-cart-count')

  if (!cartEl) return

  const total = calcTotal()
  const count = appState.cart.reduce((s, i) => s + i.qtd, 0)
  if (countEl) countEl.textContent = count

  if (!appState.cart.length) {
    cartEl.innerHTML = `
      <div class="empty-state" style="padding:32px 20px">
        ${svgIcon('shopping-cart', 28)}
        <p class="empty-state-title" style="font-size:16px">Carrinho vazio</p>
        <p class="empty-state-sub">Busque um produto para adicionar.</p>
      </div>
    `
    if (totalArea) totalArea.classList.add('hidden')
    if (btnPagar) btnPagar.disabled = true
    return
  }

  cartEl.innerHTML = appState.cart.map(item => `
    <div class="cart-item animate-fade-in">
      <div class="cart-item-info">
        <p class="cart-item-name">${escHtml(item.nome)}</p>
        <p class="cart-item-meta">${escHtml(item.variacao)} — <span class="t-data">${escHtml(item.sku)}</span></p>
        ${item.qtd >= item.estoqueMax ? `<span class="badge badge-baixo mt-0.5">Limite de estoque</span>` : ''}
      </div>
      <div class="cart-qty">
        <button class="cart-qty-btn" onclick="updateQty('${item.variacaoId}', -1)">−</button>
        <span class="cart-qty-num">${item.qtd}</span>
        <button class="cart-qty-btn" onclick="updateQty('${item.variacaoId}', 1)">+</button>
      </div>
      <span class="t-data text-ink ml-4 w-20 text-right flex-shrink-0">${formatCurrency(item.preco * item.qtd)}</span>
      <button class="btn-icon text-ink-3" onclick="removeFromCart('${item.variacaoId}')" aria-label="Remover">
        ${svgIcon('x', 14)}
      </button>
    </div>
  `).join('')

  if (totalArea) {
    totalArea.classList.remove('hidden')
    document.getElementById('pdv-subtotal').textContent = formatCurrency(total)
    document.getElementById('pdv-total-value').textContent = formatCurrency(total)
  }

  const vendedor1 = document.getElementById('pdv-vendedor-1')?.value
  if (btnPagar) btnPagar.disabled = !vendedor1 || !appState.cart.length
}

function calcTotal() {
  return appState.cart.reduce((s, item) => s + item.preco * item.qtd, 0)
}

function toggleComissaoPDV() {
  const checked = document.getElementById('pdv-toggle-comissao')?.checked
  appState.comissaoDividida = checked
  const area = document.getElementById('pdv-segundo-vendedor')
  if (area) area.classList.toggle('hidden', !checked)
}

function updateVendedorState() {
  const v1 = document.getElementById('pdv-vendedor-1')?.value
  const v2 = document.getElementById('pdv-vendedor-2')?.value
  appState.vendedorPrincipal = v1 || null
  appState.segundoVendedor = v2 || null

  if (appState.comissaoDividida && v1 && v2) {
    const vend1 = VENDEDORES.find(x => x.id === v1)
    const vend2 = VENDEDORES.find(x => x.id === v2)
    const total = calcTotal()
    const comissao = total * 0.03
    const resumoEl = document.getElementById('pdv-comissao-resumo')
    if (resumoEl && vend1 && vend2) {
      resumoEl.innerHTML = `
        ${escHtml(vend1.nome)}: ${formatCurrency(comissao / 2)}<br>
        ${escHtml(vend2.nome)}: ${formatCurrency(comissao / 2)}
      `
    }
  }

  const btn = document.getElementById('btn-ir-pagamento')
  if (btn) btn.disabled = !v1 || !appState.cart.length
}

function goToPayment() {
  const v1 = document.getElementById('pdv-vendedor-1')?.value
  if (!v1) { showToast('Selecione o vendedor principal.', 'error'); return }
  if (!appState.cart.length) { showToast('Adicione produtos ao carrinho.', 'error'); return }
  appState.vendedorPrincipal = v1
  appState.segundoVendedor = document.getElementById('pdv-vendedor-2')?.value || null
  renderPayment()
  showScreen('screen-payment')
}

// ===== PAGAMENTO =====

function renderPayment() {
  const total = calcTotal()
  const vend1 = VENDEDORES.find(x => x.id === appState.vendedorPrincipal)
  const vend2 = appState.segundoVendedor ? VENDEDORES.find(x => x.id === appState.segundoVendedor) : null

  document.getElementById('screen-payment').innerHTML = `
    <div class="animate-fade-in max-w-2xl">
      <div class="section-header mb-6">
        <div class="flex items-center gap-3">
          <button onclick="navigateTo('screen-pdv')" class="btn-icon">${svgIcon('chevron-down', 16)}</button>
          <h1 class="t-display text-ink" style="font-size:28px">Pagamento</h1>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <!-- Resumo da venda -->
        <div class="card" style="padding:24px">
          <p class="t-caps text-ink-3 mb-4">Resumo da venda</p>
          <div class="space-y-2 mb-4">
            ${appState.cart.map(item => `
              <div class="flex justify-between items-start gap-2">
                <div class="flex-1 min-w-0">
                  <p class="text-[13px] font-medium text-ink truncate">${escHtml(item.nome)}</p>
                  <p class="text-[11px] text-ink-3">${escHtml(item.variacao)} · <span class="t-data">${escHtml(item.sku)}</span> × ${item.qtd}</p>
                </div>
                <span class="t-data text-[12.5px] flex-shrink-0">${formatCurrency(item.preco * item.qtd)}</span>
              </div>
            `).join('')}
          </div>
          <div class="border-t border-border pt-3">
            <div class="flex justify-between items-baseline">
              <span class="t-caps text-ink-3">Total</span>
              <span class="t-display text-ink" style="font-size:28px">${formatCurrency(total)}</span>
            </div>
          </div>
          <div class="mt-4 pt-3 border-t border-border">
            <p class="text-[11px] text-ink-3 mb-1">Vendedor: <span class="font-medium text-ink">${vend1 ? escHtml(vend1.nome) : '—'}</span></p>
            ${vend2 ? `<p class="text-[11px] text-ink-3">Co-vendedor: <span class="font-medium text-ink">${escHtml(vend2.nome)}</span> <span class="badge badge-accent ml-1">Dividida</span></p>` : ''}
          </div>
        </div>

        <!-- Método de pagamento -->
        <div class="card" style="padding:24px">
          <p class="t-caps text-ink-3 mb-4">Método de pagamento</p>
          <div class="grid grid-cols-2 gap-3 mb-4">
            <div class="payment-card ${appState.paymentMetodo === 'dinheiro' ? 'selected' : ''}" onclick="selectMetodoPagamento('dinheiro')">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="6" width="20" height="12" rx="2"/><circle cx="12" cy="12" r="3"/><path d="M6 12h.01M18 12h.01"/></svg>
              <span class="payment-card-label">Dinheiro</span>
            </div>
            <div class="payment-card ${appState.paymentMetodo === 'pix' ? 'selected' : ''}" onclick="selectMetodoPagamento('pix')">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2L2 7l10 5 10-5-10-5z"/><path d="M2 17l10 5 10-5"/><path d="M2 12l10 5 10-5"/></svg>
              <span class="payment-card-label">Pix</span>
            </div>
            <div class="payment-card ${appState.paymentMetodo === 'credito' ? 'selected' : ''}" onclick="selectMetodoPagamento('credito')">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>
              <span class="payment-card-label">Crédito</span>
            </div>
            <div class="payment-card ${appState.paymentMetodo === 'debito' ? 'selected' : ''}" onclick="selectMetodoPagamento('debito')">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/><line x1="7" y1="15" x2="13" y2="15"/></svg>
              <span class="payment-card-label">Débito</span>
            </div>
          </div>

          <!-- Parcelamento (só crédito) -->
          <div id="payment-parcelas" class="hidden animate-fade-in mb-4">
            <label class="input-label" for="select-parcelas">Parcelas</label>
            <select id="select-parcelas" class="input" onchange="appState.paymentParcelas = parseInt(this.value)">
              ${[1,2,3,4,5,6,10,12].map(n => `<option value="${n}" ${appState.paymentParcelas === n ? 'selected' : ''}>${n}x de ${formatCurrency(total/n)}</option>`).join('')}
            </select>
          </div>

          <!-- Troco (só dinheiro) -->
          <div id="payment-troco" class="hidden animate-fade-in mb-4">
            <label class="input-label" for="input-recebido">Valor recebido (R$)</label>
            <input id="input-recebido" type="number" step="0.01" class="input mb-2" placeholder="${total.toFixed(2)}" oninput="calcTroco(${total})">
            <div id="troco-display" class="flex justify-between items-center p-3 rounded-lg bg-subtle">
              <span class="text-[12px] text-ink-2">Troco</span>
              <span class="t-data font-medium text-ink" id="troco-valor">—</span>
            </div>
          </div>

          <button id="btn-finalizar" onclick="processPayment()" class="btn btn-accent btn-full btn-lg" ${appState.paymentMetodo ? '' : 'disabled'}>
            Finalizar Venda
          </button>
        </div>
      </div>
    </div>
  `
}

function selectMetodoPagamento(metodo) {
  appState.paymentMetodo = metodo
  appState.paymentParcelas = 1
  document.querySelectorAll('.payment-card').forEach(c => c.classList.remove('selected'))
  document.querySelector(`[onclick="selectMetodoPagamento('${metodo}')"]`)?.classList.add('selected')
  document.getElementById('payment-parcelas').classList.toggle('hidden', metodo !== 'credito')
  document.getElementById('payment-troco').classList.toggle('hidden', metodo !== 'dinheiro')
  const btn = document.getElementById('btn-finalizar')
  if (btn) btn.disabled = false
}

function calcTroco(total) {
  const recebido = parseFloat(document.getElementById('input-recebido')?.value) || 0
  const troco = recebido - total
  const trocoEl = document.getElementById('troco-valor')
  if (trocoEl) {
    trocoEl.textContent = recebido > 0 ? formatCurrency(Math.max(0, troco)) : '—'
    trocoEl.classList.toggle('text-danger', troco < 0 && recebido > 0)
  }
}

function processPayment() {
  const btn = document.getElementById('btn-finalizar')
  if (!btn) return
  btn.disabled = true
  btn.innerHTML = `<div class="spinner"></div> Processando...`

  setTimeout(() => {
    btn.innerHTML = `${svgIcon('check', 14)} Venda finalizada!`
    btn.style.background = '#3D6B45'
    setTimeout(() => {
      const total = calcTotal()
      const vend1 = VENDEDORES.find(x => x.id === appState.vendedorPrincipal)
      const vend2 = appState.segundoVendedor ? VENDEDORES.find(x => x.id === appState.segundoVendedor) : null
      const metodoLabel = { dinheiro:'Dinheiro', pix:'Pix', credito:'Cartão de Crédito', debito:'Cartão de Débito' }[appState.paymentMetodo] || ''
      const now = new Date()
      const hora = now.getHours().toString().padStart(2,'0') + ':' + now.getMinutes().toString().padStart(2,'0')
      const idVenda = 'VND-2026-' + String(Math.floor(Math.random()*9000)+1000)
      const comissaoTotal = total * 0.03

      showModal(`
        <div class="modal-header">
          <div class="flex items-center gap-3">
            <div class="w-7 h-7 border border-accent flex items-center justify-center" style="border-radius:3px">
              <span class="t-display text-accent" style="font-size:14px">K</span>
            </div>
            <span class="modal-title">Recibo de Venda</span>
          </div>
        </div>
        <div class="modal-body">
          <div class="flex justify-between mb-4">
            <span class="t-data text-ink-3">${idVenda}</span>
            <span class="t-data text-ink-3">${hora}</span>
          </div>
          <div class="space-y-2 mb-4 border-b border-border pb-4">
            ${appState.cart.map(item => `
              <div class="flex justify-between">
                <div>
                  <p class="text-[13px] font-medium">${escHtml(item.nome)}</p>
                  <p class="text-[11px] text-ink-3">${escHtml(item.variacao)} · qtd ${item.qtd}</p>
                </div>
                <span class="t-data text-[12.5px]">${formatCurrency(item.preco * item.qtd)}</span>
              </div>
            `).join('')}
          </div>
          <div class="space-y-1 mb-4 border-b border-border pb-4">
            <div class="flex justify-between">
              <span class="text-[12px] text-ink-3">${metodoLabel}${appState.paymentParcelas > 1 ? ` ${appState.paymentParcelas}x` : ''}</span>
              <span class="t-data text-[12.5px]">${formatCurrency(total)}</span>
            </div>
            <div class="flex justify-between">
              <span class="t-caps text-ink-3">Total pago</span>
              <span class="t-display text-ink" style="font-size:22px">${formatCurrency(total)}</span>
            </div>
          </div>
          <div class="space-y-1">
            <p class="text-[11px] text-ink-3">Vendedor: <span class="font-medium text-ink">${vend1 ? escHtml(vend1.nome) : '—'}</span>
              — Comissão: ${formatCurrency(vend2 ? comissaoTotal/2 : comissaoTotal)}</p>
            ${vend2 ? `<p class="text-[11px] text-ink-3">Co-vendedor: <span class="font-medium text-ink">${escHtml(vend2.nome)}</span>
              — Comissão: ${formatCurrency(comissaoTotal/2)}</p>` : ''}
          </div>
        </div>
        <div class="modal-footer">
          <button onclick="showToast('Enviando para impressão...','info')" class="btn btn-ghost">${svgIcon('printer',13)} Imprimir</button>
          <button onclick="newSale()" class="btn btn-primary">${svgIcon('plus',13)} Nova Venda</button>
        </div>
      `)
    }, 500)
  }, 1200)
}

function newSale() {
  closeModal()
  appState.cart = []
  appState.vendedorPrincipal = null
  appState.segundoVendedor = null
  appState.comissaoDividida = false
  appState.paymentMetodo = null
  appState.paymentParcelas = 1
  navigateTo('screen-pdv')
}

// ===== RELATÓRIOS =====

function renderReports() {
  const terminal = appState.terminal

  if (terminal === 'estoque') {
    document.getElementById('screen-reports').innerHTML = `
      <div class="flex items-center justify-center min-h-64 animate-fade-in">
        <div class="text-center">
          <div class="flex justify-center mb-4 text-ink-3">${svgIcon('lock', 40)}</div>
          <p class="t-display text-ink mb-2" style="font-size:24px">Acesso restrito</p>
          <p class="text-[13px] text-ink-3 max-w-xs mx-auto">Relatórios financeiros são exclusivos para o perfil Proprietário/Admin.</p>
        </div>
      </div>
    `
    return
  }

  const periodos = ['hoje','semana','mes']
  const periodoLabel = { hoje:'Hoje', semana:'Esta Semana', mes:'Este Mês' }

  const totalVendas = VENDAS.reduce((s, v) => s + v.total, 0)
  const totalComissoes = totalVendas * 0.03
  const ticketMedio = totalVendas / VENDAS.length
  const itensTotais = VENDAS.reduce((s, v) => s + v.itens.reduce((si, i) => si + i.qtd, 0), 0)

  document.getElementById('screen-reports').innerHTML = `
    <div class="animate-fade-in">
      <div class="section-header mb-4">
        <h1 class="t-display text-ink" style="font-size:28px">Relatórios</h1>
        <button onclick="exportReport()" class="btn btn-secondary">${svgIcon('download',13)} Exportar PDF</button>
      </div>

      <!-- Seletor de período -->
      <div class="flex items-center gap-3 mb-6 flex-wrap">
        <input type="date" id="report-date-from" class="input" style="width:150px;padding:6px 10px;font-size:13px" value="2026-06-01">
        <span class="text-ink-3">até</span>
        <input type="date" id="report-date-to" class="input" style="width:150px;padding:6px 10px;font-size:13px" value="2026-06-08">
        ${periodos.map(p => `
          <button onclick="switchReportPeriodo('${p}')" class="filter-chip ${appState.reportPeriodo === p ? 'active' : ''}">${periodoLabel[p]}</button>
        `).join('')}
      </div>

      <!-- Métricas -->
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div class="card card-metric">
          <p class="t-caps text-ink-3">Faturamento</p>
          <p class="t-display text-ink mt-2 mb-1" style="font-size:26px;letter-spacing:-0.02em">${formatCurrency(totalVendas)}</p>
        </div>
        <div class="card card-metric">
          <p class="t-caps text-ink-3">Transações</p>
          <p class="t-display text-ink mt-2 mb-1" style="font-size:26px">${VENDAS.length}</p>
        </div>
        <div class="card card-metric">
          <p class="t-caps text-ink-3">Ticket médio</p>
          <p class="t-display text-ink mt-2 mb-1" style="font-size:26px">${formatCurrency(ticketMedio)}</p>
        </div>
        <div class="card card-metric">
          <p class="t-caps text-ink-3">Peças vendidas</p>
          <p class="t-display text-ink mt-2 mb-1" style="font-size:26px">${itensTotais}</p>
        </div>
      </div>

      <!-- Tabs -->
      <div class="tab-list mb-5">
        ${['financeiro','vendedores','caixa','fiscal'].map(tab => `
          <button class="tab-btn ${appState.reportTab === tab ? 'active' : ''}" onclick="switchReportTab('${tab}')">
            ${{ financeiro:'Financeiro', vendedores:'Vendas por Vendedor', caixa:'Fechamento de Caixa', fiscal:'Fiscal' }[tab]}
          </button>
        `).join('')}
      </div>

      <div id="report-content">
        ${renderReportContent()}
      </div>
    </div>
  `
}

function switchReportTab(tab) {
  appState.reportTab = tab
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.textContent.trim() === { financeiro:'Financeiro', vendedores:'Vendas por Vendedor', caixa:'Fechamento de Caixa', fiscal:'Fiscal' }[tab]))
  document.getElementById('report-content').innerHTML = renderReportContent()
}

function switchReportPeriodo(p) {
  appState.reportPeriodo = p
  renderReports()
}

function renderReportContent() {
  switch (appState.reportTab) {
    case 'financeiro': return renderReportFinanceiro()
    case 'vendedores': return renderReportVendedores()
    case 'caixa':      return renderReportCaixa()
    case 'fiscal':     return renderReportFiscal()
    default:           return ''
  }
}

function renderReportFinanceiro() {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>ID Venda</th><th>Hora</th><th>Cliente</th><th>Método</th><th>Parcelas</th><th>Total</th><th>Status</th></tr></thead>
        <tbody>
          ${VENDAS.map(v => `
            <tr>
              <td><span class="t-data text-ink-3">${escHtml(v.id)}</span></td>
              <td><span class="t-data">${escHtml(v.horario)}</span></td>
              <td>${v.cliente ? escHtml(v.cliente) : '<span class="text-ink-3">—</span>'}</td>
              <td>${escHtml(v.metodo)}</td>
              <td><span class="t-data">${v.parcelas}x</span></td>
              <td><span class="t-data font-medium">${formatCurrency(v.total)}</span></td>
              <td><span class="badge badge-normal">${escHtml(v.status)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

function renderReportVendedores() {
  const resumo = {}
  VENDAS.forEach(v => {
    if (!resumo[v.vendedorPrincipal]) resumo[v.vendedorPrincipal] = { vendas:0, total:0, comissao:0 }
    resumo[v.vendedorPrincipal].vendas++
    const share = v.comissaoDividida ? v.total / 2 : v.total
    resumo[v.vendedorPrincipal].total += share
    resumo[v.vendedorPrincipal].comissao += share * 0.03
    if (v.comissaoDividida && v.segundoVendedor) {
      if (!resumo[v.segundoVendedor]) resumo[v.segundoVendedor] = { vendas:0, total:0, comissao:0 }
      resumo[v.segundoVendedor].total += v.total / 2
      resumo[v.segundoVendedor].comissao += (v.total / 2) * 0.03
    }
  })
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Vendedor</th><th>Vendas</th><th>Volume</th><th>Comissão (3%)</th></tr></thead>
        <tbody>
          ${Object.entries(resumo).map(([nome, data]) => `
            <tr>
              <td class="font-medium">${escHtml(nome)}</td>
              <td><span class="t-data">${data.vendas}</span></td>
              <td><span class="t-data">${formatCurrency(data.total)}</span></td>
              <td><span class="t-data text-success">${formatCurrency(data.comissao)}</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

function renderReportCaixa() {
  const totalDinheiro = VENDAS.filter(v => v.metodo === 'Dinheiro').reduce((s,v)=>s+v.total,0)
  const totalPix = VENDAS.filter(v => v.metodo === 'Pix').reduce((s,v)=>s+v.total,0)
  const totalCredito = VENDAS.filter(v => v.metodo === 'Crédito').reduce((s,v)=>s+v.total,0)
  const totalDebito = VENDAS.filter(v => v.metodo === 'Débito').reduce((s,v)=>s+v.total,0)
  const total = totalDinheiro + totalPix + totalCredito + totalDebito
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>Método</th><th>Transações</th><th>Total</th></tr></thead>
        <tbody>
          <tr><td>Dinheiro</td><td><span class="t-data">${VENDAS.filter(v=>v.metodo==='Dinheiro').length}</span></td><td><span class="t-data">${formatCurrency(totalDinheiro)}</span></td></tr>
          <tr><td>Pix</td><td><span class="t-data">${VENDAS.filter(v=>v.metodo==='Pix').length}</span></td><td><span class="t-data">${formatCurrency(totalPix)}</span></td></tr>
          <tr><td>Cartão de Crédito</td><td><span class="t-data">${VENDAS.filter(v=>v.metodo==='Crédito').length}</span></td><td><span class="t-data">${formatCurrency(totalCredito)}</span></td></tr>
          <tr><td>Cartão de Débito</td><td><span class="t-data">${VENDAS.filter(v=>v.metodo==='Débito').length}</span></td><td><span class="t-data">${formatCurrency(totalDebito)}</span></td></tr>
          <tr style="background:#EDE9E2">
            <td class="font-medium">Total do caixa</td>
            <td><span class="t-data">${VENDAS.length}</span></td>
            <td><span class="t-data font-medium">${formatCurrency(total)}</span></td>
          </tr>
        </tbody>
      </table>
    </div>
  `
}

function renderReportFiscal() {
  return `
    <div class="table-wrap">
      <table>
        <thead><tr><th>NF / Cupom</th><th>Data</th><th>Cliente</th><th>Valor</th><th>Status</th></tr></thead>
        <tbody>
          ${VENDAS.map((v, i) => `
            <tr>
              <td><span class="t-data text-ink-3">NF-${String(1000+i).padStart(6,'0')}</span></td>
              <td><span class="t-data">08/06/2026 ${escHtml(v.horario)}</span></td>
              <td>${v.cliente ? escHtml(v.cliente) : '<span class="text-ink-3">Consumidor Final</span>'}</td>
              <td><span class="t-data">${formatCurrency(v.total)}</span></td>
              <td><span class="badge badge-normal">Emitida</span></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>
  `
}

function exportReport() {
  showToast('Relatório exportado para PDF com sucesso.', 'success')
}

// ===== PROMOÇÕES =====

function renderPromotions() {
  if (appState.terminal !== 'admin') {
    document.getElementById('screen-promotions').innerHTML = `
      <div class="flex items-center justify-center min-h-64 animate-fade-in">
        <div class="text-center">
          <div class="flex justify-center mb-4 text-ink-3">${svgIcon('lock', 40)}</div>
          <p class="t-display text-ink mb-2" style="font-size:24px">Acesso restrito</p>
          <p class="text-[13px] text-ink-3">Promoções são gerenciadas pelo Proprietário/Admin.</p>
        </div>
      </div>
    `
    return
  }

  document.getElementById('screen-promotions').innerHTML = `
    <div class="animate-fade-in">
      <div class="section-header mb-6">
        <h1 class="t-display text-ink" style="font-size:28px">Promoções</h1>
        <button onclick="openPromoModal()" class="btn btn-primary">${svgIcon('plus',13)} Nova Promoção</button>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="promo-grid">
        ${PROMOCOES.map(p => renderPromoCard(p)).join('')}
      </div>
    </div>
  `
}

function renderPromoCard(p) {
  const isAtiva = p.status === 'ativa'
  return `
    <div class="card animate-fade-in" style="padding:20px" id="promo-${p.id}">
      <div class="flex items-start justify-between gap-3">
        <div class="flex-1 min-w-0">
          <div class="flex items-center gap-2 mb-1">
            <p class="text-[14px] font-medium text-ink">${escHtml(p.nome)}</p>
            <span class="badge ${isAtiva ? 'badge-ativo' : 'badge-inativo'}">${isAtiva ? 'Ativa' : 'Encerrada'}</span>
          </div>
          <p class="text-[12px] text-ink-3 mb-1">Escopo: ${escHtml(p.escopo)}</p>
          <p class="text-[12px] text-ink-3 mb-2">Desconto: <span class="font-medium text-accent">${escHtml(p.desconto)}</span></p>
          <p class="t-data text-[11px] text-ink-3">${escHtml(p.inicio)} → ${escHtml(p.fim)}</p>
        </div>
        <label class="toggle" title="${isAtiva ? 'Desativar' : 'Ativar'} promoção">
          <input type="checkbox" ${isAtiva ? 'checked' : ''} onchange="togglePromocao(${p.id})">
          <span class="toggle-slider"></span>
        </label>
      </div>
    </div>
  `
}

function togglePromocao(id) {
  const promo = PROMOCOES.find(p => p.id === id)
  if (!promo) return
  promo.status = promo.status === 'ativa' ? 'encerrada' : 'ativa'
  const card = document.getElementById(`promo-${id}`)
  if (card) card.outerHTML = renderPromoCard(promo)
  showToast(`Promoção "${promo.nome}" ${promo.status === 'ativa' ? 'ativada' : 'desativada'}.`, 'info')
}

function openPromoModal() {
  showModal(`
    <div class="modal-header">
      <p class="modal-title">Nova Promoção</p>
    </div>
    <div class="modal-body space-y-4">
      <div>
        <label class="input-label" for="promo-nome">Nome da promoção</label>
        <input id="promo-nome" class="input" placeholder="Ex: Desconto Primavera 2026">
      </div>
      <div>
        <label class="input-label" for="promo-escopo">Escopo</label>
        <input id="promo-escopo" class="input" placeholder="Ex: Coleção Verão, Clientes VIP...">
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="input-label" for="promo-desconto">Desconto</label>
          <input id="promo-desconto" class="input" placeholder="Ex: 15% ou R$ 30">
        </div>
        <div></div>
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="input-label" for="promo-inicio">Início</label>
          <input id="promo-inicio" type="date" class="input" value="2026-06-08">
        </div>
        <div>
          <label class="input-label" for="promo-fim">Fim</label>
          <input id="promo-fim" type="date" class="input" value="2026-07-08">
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button onclick="closeModal()" class="btn btn-ghost">Cancelar</button>
      <button onclick="savePromo()" class="btn btn-primary">Criar Promoção</button>
    </div>
  `)
}

function savePromo() {
  const nome = document.getElementById('promo-nome')?.value.trim()
  if (!nome) { showToast('Informe o nome da promoção.', 'error'); return }
  const novaPromo = {
    id: PROMOCOES.length + 1,
    nome,
    escopo: document.getElementById('promo-escopo')?.value || '',
    desconto: document.getElementById('promo-desconto')?.value || '',
    inicio: document.getElementById('promo-inicio')?.value || '',
    fim: document.getElementById('promo-fim')?.value || '',
    status: 'ativa',
  }
  PROMOCOES.push(novaPromo)
  closeModal()
  showToast(`Promoção "${nome}" criada.`, 'success')
  renderPromotions()
  showScreen('screen-promotions')
}

// ===== USUÁRIOS =====

function renderUsers() {
  if (appState.terminal !== 'admin') {
    document.getElementById('screen-users').innerHTML = `
      <div class="flex items-center justify-center min-h-64 animate-fade-in">
        <div class="text-center">
          <div class="flex justify-center mb-4 text-ink-3">${svgIcon('lock', 40)}</div>
          <p class="t-display text-ink mb-2" style="font-size:24px">Acesso restrito</p>
          <p class="text-[13px] text-ink-3">Gestão de usuários é exclusiva para Proprietário/Admin.</p>
        </div>
      </div>
    `
    return
  }

  document.getElementById('screen-users').innerHTML = `
    <div class="animate-fade-in">
      <div class="section-header mb-6">
        <div class="flex items-center gap-3">
          <h1 class="t-display text-ink" style="font-size:28px">Usuários</h1>
          <span class="badge badge-neutral">${USUARIOS.length} usuários</span>
        </div>
        <button onclick="showToast('Funcionalidade em desenvolvimento.','info')" class="btn btn-primary">
          ${svgIcon('plus',13)} Novo Usuário
        </button>
      </div>

      <div class="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Usuário</th><th>E-mail</th><th>Perfil</th><th>Status</th><th>Ações</th>
            </tr>
          </thead>
          <tbody id="users-tbody">
            ${USUARIOS.map(u => renderUserRow(u)).join('')}
          </tbody>
        </table>
      </div>
    </div>
  `
}

function renderUserRow(u) {
  const perfilBadge = u.perfil.includes('Admin') ? 'badge-accent' : 'badge-neutral'
  return `
    <tr id="user-row-${u.id}">
      <td>
        <div class="flex items-center gap-3">
          <div class="w-8 h-8 rounded-full bg-accent-s flex items-center justify-center text-[11px] font-medium text-accent flex-shrink-0">
            ${getInitials(u.nome)}
          </div>
          <span class="font-medium">${escHtml(u.nome)}</span>
        </div>
      </td>
      <td><span class="t-data text-[12px] text-ink-3">${escHtml(u.email)}</span></td>
      <td><span class="badge ${perfilBadge}">${escHtml(u.perfil)}</span></td>
      <td>
        <label class="flex items-center gap-2 cursor-pointer">
          <label class="toggle">
            <input type="checkbox" ${u.ativo ? 'checked' : ''} onchange="toggleUserStatus(${u.id})">
            <span class="toggle-slider"></span>
          </label>
          <span class="text-[12px] ${u.ativo ? 'text-success' : 'text-ink-3'}">${u.ativo ? 'Ativo' : 'Inativo'}</span>
        </label>
      </td>
      <td>
        <button onclick="showToast('Editando ${escHtml(u.nome.replace(/'/g,"\\'"))}...','info')" class="btn btn-ghost btn-sm">
          ${svgIcon('edit',13)} Editar
        </button>
      </td>
    </tr>
  `
}

function toggleUserStatus(id) {
  const u = USUARIOS.find(x => x.id === id)
  if (!u) return
  if (u.email === appState.currentUser?.email) {
    showToast('Não é possível desativar seu próprio usuário.', 'error')
    renderUsers()
    showScreen('screen-users')
    return
  }
  u.ativo = !u.ativo
  const row = document.getElementById(`user-row-${id}`)
  if (row) row.outerHTML = renderUserRow(u)
  showToast(`${u.nome} ${u.ativo ? 'ativado' : 'desativado'}.`, u.ativo ? 'success' : 'warning')
}

// ===== INIT =====

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('header-date').textContent = formatDate()

  document.getElementById('login-senha').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin()
  })
  document.getElementById('login-email').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin()
  })

  document.getElementById('modal-overlay').addEventListener('click', e => {
    if (e.target === document.getElementById('modal-overlay')) closeModal()
  })
})
