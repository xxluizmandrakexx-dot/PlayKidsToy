
// Bolinhas de neve animadas no fundo
const snowLayer = document.getElementById('snowLayer');
if (snowLayer) {
  const amount = window.innerWidth < 600 ? 28 : 48;
  for (let i = 0; i < amount; i++) {
    const dot = document.createElement('span');
    dot.className = 'snow-dot';
    const size = Math.random() * 9 + 4;
    dot.style.width = `${size}px`;
    dot.style.height = `${size}px`;
    dot.style.left = `${Math.random() * 100}%`;
    dot.style.animationDuration = `${Math.random() * 8 + 7}s`;
    dot.style.animationDelay = `${Math.random() * -15}s`;
    dot.style.opacity = `${Math.random() * .55 + .35}`;
    snowLayer.appendChild(dot);
  }
}
const products = [
  {id:1,name:'Yumi Land',price:69.99,category:'kits',image:'assets/yumi-land.jpg',tag:'OFERTA',desc:'Casa de brinquedo cheia de detalhes e diversão.'},
  {id:2,name:'LEGO Clássico – 500 Peças',price:34.99,category:'educativos',image:'assets/lego-classico.jpg',tag:'MEGA OFERTA',desc:'Centenas de possibilidades para criar e imaginar.'},
  {id:3,name:'Carrinho Hot Wheels 5-Pack',price:29.99,category:'carrinhos',image:'assets/hot-wheels.jpg',tag:'MAIS VENDIDO',desc:'Kit com carrinhos para acelerar a brincadeira.'},
  {id:4,name:'Puzzle – 1000 Peças',price:39.99,category:'educativos',image:'assets/fundo-playkidstoy.jpg',tag:'COMBO',desc:'Desafio divertido para montar peça por peça.'},
  {id:5,name:'Jogo de Tabuleiro – Batalha Naval',price:49.99,category:'jogos',image:'assets/batalha-naval.jpg',tag:'IMPERDÍVEL',desc:'Batalhas estratégicas para jogar com a família.'},
  {id:6,name:'Kit Mistão de Brinquedos',price:9.99,category:'kits',image:'assets/kit-brinquedos.jpg',tag:'PREÇO DE QUEIMA',desc:'Um kit surpresa cheio de brinquedos e diversão.'}
];
let cart=[];
const brl=n=>n.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
const grid=document.getElementById('productsGrid');
function renderProducts(list=products){
  grid.innerHTML=list.length?list.map(p=>`<article class="product"><div class="product-media"><img src="${p.image}" alt="${p.name}" loading="lazy"><span class="badge">${p.tag}</span></div><div class="product-body"><span class="product-category">PlayKidsToy</span><h3>${p.name}</h3><div class="stars">★★★★★</div><p style="color:#7d879d;font-size:13px;line-height:1.4;margin:6px 0">${p.desc}</p><div class="product-bottom"><div><span class="old">Preço especial</span><span class="price">${brl(p.price)}</span></div><button class="add" onclick="addToCart(${p.id})">+ Carrinho</button></div></div></article>`).join(''):`<p style="grid-column:1/-1;text-align:center;padding:40px">Nenhum brinquedo encontrado. 🧸</p>`;
}
function addToCart(id){const p=products.find(x=>x.id===id);cart.push(p);renderCart();showToast(`${p.name} foi adicionado! 🛒`)}
function renderCart(){document.getElementById('cartCount').textContent=cart.length;const box=document.getElementById('cartItems');if(!cart.length){box.innerHTML='<div class="empty-cart">Seu carrinho está vazio.<br><span>Adicione alguns brinquedos! 🧸</span></div>'}else{box.innerHTML=cart.map((p,i)=>`<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${brl(p.price)}</p></div><button class="remove" onclick="removeCart(${i})">✕</button></div>`).join('')}document.getElementById('cartTotal').textContent=brl(cart.reduce((s,p)=>s+p.price,0))}
function removeCart(i){cart.splice(i,1);renderCart()}
function openCart(){document.getElementById('cartDrawer').classList.add('open');document.getElementById('cartDrawer').setAttribute('aria-hidden','false');document.getElementById('backdrop').classList.add('show')}
function closeCart(){document.getElementById('cartDrawer').classList.remove('open');document.getElementById('cartDrawer').setAttribute('aria-hidden','true');document.getElementById('backdrop').classList.remove('show')}
function showToast(t){const x=document.getElementById('toast');x.textContent=t;x.classList.add('show');clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>x.classList.remove('show'),2200)}
document.getElementById('cartBtn').onclick=openCart;document.getElementById('closeCart').onclick=closeCart;document.getElementById('backdrop').onclick=closeCart;document.getElementById('checkoutBtn').onclick=()=>{if(!cart.length)return showToast('Adicione um produto primeiro 😊');showToast('Checkout de demonstração — conecte seu pagamento aqui!')};
document.querySelectorAll('.category').forEach(btn=>btn.addEventListener('click',()=>{const c=btn.dataset.category;renderProducts(c==='todos'?products:products.filter(p=>p.category===c));document.getElementById('produtos').scrollIntoView({behavior:'smooth'})}));
document.getElementById('searchInput').addEventListener('input',e=>{const q=e.target.value.toLowerCase();renderProducts(products.filter(p=>p.name.toLowerCase().includes(q)||p.desc.toLowerCase().includes(q)))});
document.getElementById('searchBtn').onclick=()=>{document.getElementById('searchInput').focus();document.getElementById('produtos').scrollIntoView({behavior:'smooth'})};
document.getElementById('menuBtn').onclick=()=>document.querySelector('.nav').classList.toggle('mobile-open');
renderProducts();renderCart();


// Música infantil de fundo — começa após a primeira interação para respeitar bloqueios de autoplay do navegador
const bgMusic = document.getElementById('bgMusic');
const musicPlay = document.getElementById('musicPlay');
const musicMute = document.getElementById('musicMute');
const musicVolume = document.getElementById('musicVolume');
const musicStatus = document.getElementById('musicStatus');
if (bgMusic && musicPlay && musicMute && musicVolume) {
  bgMusic.volume = Number(musicVolume.value);
  let userStartedMusic = false;

  const updateMusicUI = () => {
    const playing = !bgMusic.paused;
    musicPlay.textContent = playing ? '⏸' : '▶';
    musicPlay.setAttribute('aria-label', playing ? 'Pausar música' : 'Tocar música');
    musicMute.textContent = bgMusic.muted || bgMusic.volume === 0 ? '🔇' : '🔊';
    musicStatus.textContent = playing ? 'Tocando baixinho...' : 'Música pausada';
  };

  const startMusic = async () => {
    if (userStartedMusic) return;
    userStartedMusic = true;
    try { await bgMusic.play(); } catch (_) { userStartedMusic = false; }
    updateMusicUI();
  };

  musicPlay.addEventListener('click', async () => {
    if (bgMusic.paused) {
      try { await bgMusic.play(); } catch (_) {}
    } else {
      bgMusic.pause();
    }
    userStartedMusic = true;
    updateMusicUI();
  });

  musicMute.addEventListener('click', () => {
    bgMusic.muted = !bgMusic.muted;
    updateMusicUI();
  });

  musicVolume.addEventListener('input', () => {
    bgMusic.volume = Number(musicVolume.value);
    if (bgMusic.volume > 0) bgMusic.muted = false;
    updateMusicUI();
  });

  bgMusic.addEventListener('play', updateMusicUI);
  bgMusic.addEventListener('pause', updateMusicUI);
  updateMusicUI();

  // Tenta iniciar na primeira interação do visitante; se o navegador bloquear, o botão continua disponível.
  ['pointerdown','keydown','touchstart'].forEach(evt => document.addEventListener(evt, startMusic, { once: true, passive: true }));
}
