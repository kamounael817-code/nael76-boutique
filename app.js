// Produits Nael76
const products = [
  {
    id: 1,
    name: "Le Manteau Croix-Rousse",
    price: 420,
    image: "https://images.unsplash.com/photo-1539533057440-7814bae1ef51?w=600&q=80",
    description: "Laine double face, coupe droite, doublure amovible. Une pièce d'hiver pensée pour se porter dix ans sans se démoder.",
    details: [
      "Laine 100% double face",
      "Doublure amovible en soie",
      "Coupe droite intemporelle",
      "Produit en série limitée"
    ],
    inStock: true,
    stock: 8
  },
  {
    id: 2,
    name: "La Chemise Bellecour",
    price: 135,
    image: "https://images.unsplash.com/photo-1596399579883-b87ccd6b2f5c?w=600&q=80",
    description: "Popeline de coton égyptien, boutons en nacre véritable, coupe ajustée sans être cintrée.",
    details: [
      "Coton égyptien premium",
      "Boutons en nacre véritable",
      "Coupe ajustée élégante",
      "Disponible en 3 coloris"
    ],
    inStock: true,
    stock: 15
  },
  {
    id: 3,
    name: "Le Pantalon Perrache",
    price: 190,
    image: "https://images.unsplash.com/photo-1542272604-787c62d465d1?w=600&q=80",
    description: "Laine peignée, taille haute, pinces devant. Ourlets laissés bruts pour une retouche sur mesure.",
    details: [
      "Laine peignée italienne",
      "Taille haute classique",
      "Pinces devant de précision",
      "Ourlets bruts personnalisables"
    ],
    inStock: true,
    stock: 12
  }
];

// Panier (localStorage)
let cart = JSON.parse(localStorage.getItem('nael76Cart')) || [];

// DOM Elements
const piecesGrid = document.getElementById('piecesGrid');
const cartIcon = document.getElementById('cartIcon');
const cartCount = document.getElementById('cartCount');
const cartModal = document.getElementById('cartModal');
const cartItems = document.getElementById('cartItems');
const cartEmpty = document.getElementById('cartEmpty');
const cartSummary = document.getElementById('cartSummary');
const closeCart = document.getElementById('closeCart');
const productModal = document.getElementById('productModal');
const closeProduct = document.getElementById('closeProduct');
const checkoutContainer = document.getElementById('checkoutContainer');
const closeCheckout = document.getElementById('closeCheckout');
const checkoutBtn = document.getElementById('checkoutBtn');
const payBtn = document.getElementById('payBtn');

// Initialiser
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();
  setupEventListeners();
});

// Afficher les produits
function renderProducts() {
  piecesGrid.innerHTML = products.map(product => `
    <div class="piece">
      <div class="piece-img-wrapper">
        <img src="${product.image}" alt="${product.name}" class="piece-img">
        <span class="piece-num">0${product.id}</span>
        ${product.stock < 5 ? `<span class="piece-badge">Stock limité</span>` : ''}
      </div>
      <div class="piece-info">
        <div class="piece-name">${product.name}</div>
        <p class="piece-desc">${product.description}</p>
        <div class="piece-price">${product.price},00 €</div>
        <div class="piece-footer">
          <span class="piece-link" onclick="openProduct(${product.id})">Voir les détails</span>
          <button class="piece-add-btn" onclick="quickAddToCart(${product.id})">Ajouter</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Ouvrir modal produit
function openProduct(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  document.getElementById('productImg').src = product.image;
  document.getElementById('productName').textContent = product.name;
  document.getElementById('productPrice').textContent = `${product.price},00 €`;
  document.getElementById('productDesc').textContent = product.description;
  document.getElementById('productDetails').innerHTML = product.details
    .map(detail => `<li>✓ ${detail}</li>`).join('');
  document.getElementById('productQty').value = 1;
  
  productModal.classList.add('active');
  
  // Mettre à jour le bouton ajouter
  document.getElementById('addToCartBtn').onclick = () => addToCart(productId);
}

// Ajouter au panier (quick)
function quickAddToCart(productId) {
  addToCart(productId, 1);
  showNotification('Produit ajouté au panier! 🎉');
}

// Ajouter au panier
function addToCart(productId, quantity = null) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const qty = quantity || parseInt(document.getElementById('productQty').value);
  
  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += qty;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: qty
    });
  }

  saveCart();
  updateCartUI();
  closeProduct.click();
  showNotification('✓ Ajouté au panier');
}

// Sauvegarder le panier
function saveCart() {
  localStorage.setItem('nael76Cart', JSON.stringify(cart));
}

// Mettre à jour l'affichage du panier
function updateCartUI() {
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  cartCount.textContent = totalItems;

  if (cart.length === 0) {
    cartItems.innerHTML = '';
    cartEmpty.style.display = 'block';
    cartSummary.style.display = 'none';
  } else {
    cartEmpty.style.display = 'none';
    cartSummary.style.display = 'block';
    
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-img">
          <img src="${item.image}" alt="${item.name}">
        </div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price},00 €</div>
          <div class="cart-item-qty">
            <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
            <span>${item.quantity}</span>
            <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          </div>
          <button class="cart-remove" onclick="removeFromCart(${item.id})">Retirer</button>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('cartTotalPrice').textContent = total.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' €';
  }
}

// Mettre à jour quantité
function updateQty(productId, delta) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartUI();
    }
  }
}

// Retirer du panier
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartUI();
  showNotification('Produit retiré du panier');
}

// Ouvrir checkout
function openCheckout() {
  if (cart.length === 0) {
    showNotification('Votre panier est vide');
    return;
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  document.getElementById('checkoutItems').innerHTML = cart.map(item => `
    <div class="checkout-item">
      <span>${item.name} x${item.quantity}</span>
      <span>${(item.price * item.quantity).toLocaleString('fr-FR', {minimumFractionDigits: 2})} €</span>
    </div>
  `).join('');

  document.getElementById('checkoutTotalPrice').textContent = 
    total.toLocaleString('fr-FR', {minimumFractionDigits: 2}) + ' €';

  cartModal.classList.remove('active');
  checkoutContainer.classList.add('active');

  // Initialiser Stripe (demo mode)
  setupStripeDemo(total);
}

// Demo Stripe
function setupStripeDemo(total) {
  document.getElementById('payBtn').onclick = (e) => {
    e.preventDefault();
    const btn = document.getElementById('payBtn');
    btn.disabled = true;
    btn.textContent = 'Traitement...';

    setTimeout(() => {
      showNotification('✓ Paiement simulé de ' + total.toLocaleString('fr-FR', {minimumFractionDigits: 2}) + ' €');
      cart = [];
      saveCart();
      updateCartUI();
      checkoutContainer.classList.remove('active');
      btn.disabled = false;
      btn.textContent = 'Payer maintenant';
    }, 2000);
  };
}

// Event Listeners
function setupEventListeners() {
  cartIcon.addEventListener('click', () => cartModal.classList.toggle('active'));
  closeCart.addEventListener('click', () => cartModal.classList.remove('active'));
  closeProduct.addEventListener('click', () => productModal.classList.remove('active'));
  closeCheckout.addEventListener('click', () => checkoutContainer.classList.remove('active'));
  checkoutBtn.addEventListener('click', openCheckout);
  
  document.getElementById('openCart').addEventListener('click', () => {
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
  });

  document.getElementById('heroCollection').addEventListener('click', () => {
    document.getElementById('collection').scrollIntoView({ behavior: 'smooth' });
  });
}

// Notification
function showNotification(message) {
  const notif = document.createElement('div');
  notif.textContent = message;
  notif.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2B211B;
    color: #F3EDE4;
    padding: 16px 24px;
    border-radius: 4px;
    font-size: 0.9rem;
    z-index: 2000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 3000);
}

// Animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);
