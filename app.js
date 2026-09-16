// Produits Nael76
const products = [
  {
    id: 1,
    name: "Le Manteau Croix-Rousse",
    price: 420,
    icon: "🧥",
    description: "Laine double face, coupe droite, doublure amovible. Une pièce d'hiver pensée pour se porter dix ans sans se démoder.",
    features: [
      "Laine 100% double face",
      "Doublure amovible en soie",
      "Coupe droite intemporelle",
      "Produit en série limitée",
      "Fabriqué en France"
    ]
  },
  {
    id: 2,
    name: "La Chemise Bellecour",
    price: 135,
    icon: "👕",
    description: "Popeline de coton égyptien, boutons en nacre véritable, coupe ajustée sans être cintrée.",
    features: [
      "Coton égyptien premium",
      "Boutons en nacre véritable",
      "Coupe ajustée élégante",
      "Disponible en 3 coloris",
      "Lavage à 30°C recommandé"
    ]
  },
  {
    id: 3,
    name: "Le Pantalon Perrache",
    price: 190,
    icon: "👖",
    description: "Laine peignée, taille haute, pinces devant. Ourlets laissés bruts pour une retouche sur mesure.",
    features: [
      "Laine peignée italienne",
      "Taille haute classique",
      "Pinces devant de précision",
      "Ourlets bruts personnalisables",
      "Doublure partiellement doublée"
    ]
  }
];

// Cart en LocalStorage
let cart = JSON.parse(localStorage.getItem('nael76Cart')) || [];
let currentProduct = null;

// Initialize
function init() {
  renderProducts();
  updateCartCount();
}

// Render products
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  grid.innerHTML = products.map(product => `
    <div class="product-card">
      <div class="product-image">
        ${product.icon}
        <div class="product-badge">Stock limité</div>
      </div>
      <div class="product-content">
        <div class="product-name">${product.name}</div>
        <p class="product-desc">${product.description}</p>
        <div class="product-price">${product.price},00 €</div>
        <div class="button-group">
          <button class="btn-secondary" onclick="openDetail(${product.id})">Voir détails</button>
          <button class="btn-primary" onclick="quickAdd(${product.id})">Ajouter</button>
        </div>
      </div>
    </div>
  `).join('');
}

// Open product detail
function openDetail(productId) {
  currentProduct = products.find(p => p.id === productId);
  if (!currentProduct) return;

  document.getElementById('detailName').textContent = currentProduct.name;
  document.getElementById('detailPrice').innerHTML = `<div class="product-price">${currentProduct.price},00 €</div>`;
  document.getElementById('detailDesc').textContent = currentProduct.description;
  document.getElementById('detailFeatures').innerHTML = `
    <ul>
      ${currentProduct.features.map(f => `<li>${f}</li>`).join('')}
    </ul>
  `;
  document.getElementById('detailQty').value = 1;
  document.getElementById('detailModal').classList.add('active');
}

// Close detail modal
function closeDetail() {
  document.getElementById('detailModal').classList.remove('active');
  currentProduct = null;
}

// Add from detail
function addToCartFromDetail() {
  const qty = parseInt(document.getElementById('detailQty').value);
  addToCart(currentProduct.id, qty);
  closeDetail();
}

// Quick add to cart
function quickAdd(productId) {
  addToCart(productId, 1);
}

// Add to cart
function addToCart(productId, quantity = 1) {
  const product = products.find(p => p.id === productId);
  if (!product) return;

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      quantity: quantity
    });
  }

  saveCart();
  updateCartCount();
  showNotification(`✓ ${product.name} ajouté au panier!`);
}

// Save cart to localStorage
function saveCart() {
  localStorage.setItem('nael76Cart', JSON.stringify(cart));
}

// Update cart count
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.quantity, 0);
  document.getElementById('cartCount').textContent = count;
}

// Open cart
function openCart() {
  const cartItems = document.getElementById('cartItems');
  const cartSummary = document.getElementById('cartSummary');

  if (cart.length === 0) {
    cartItems.innerHTML = `
      <div class="empty-cart">
        <div class="empty-cart-icon">🛒</div>
        <p>Votre panier est vide</p>
        <p style="font-size: 0.9rem; margin-top: 10px;">Ajoutez des produits pour commencer vos achats</p>
      </div>
    `;
    cartSummary.style.display = 'none';
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">${item.price},00 € x ${item.quantity}</div>
        </div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="updateQty(${item.id}, -1)">−</button>
          <span style="min-width: 30px; text-align: center;">${item.quantity}</span>
          <button class="qty-btn" onclick="updateQty(${item.id}, 1)">+</button>
          <button class="qty-btn" onclick="removeFromCart(${item.id})" style="background: #ffebee; color: #d32f2f; margin-left: 10px;">🗑️</button>
        </div>
      </div>
    `).join('');

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('totalPrice').textContent = total.toLocaleString('fr-FR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }) + ' €';
    cartSummary.style.display = 'block';
  }

  document.getElementById('cartModal').classList.add('active');
}

// Close cart
function closeCart() {
  document.getElementById('cartModal').classList.remove('active');
}

// Update quantity
function updateQty(productId, delta) {
  const item = cart.find(p => p.id === productId);
  if (item) {
    item.quantity += delta;
    if (item.quantity <= 0) {
      removeFromCart(productId);
    } else {
      saveCart();
      updateCartCount();
      openCart();
    }
  }
}

// Remove from cart
function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  saveCart();
  updateCartCount();
  openCart();
}

// Checkout
function checkout() {
  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const message = `Commande validée!\n\nMontant: ${total.toLocaleString('fr-FR', { minimumFractionDigits: 2 })} €\n\nMerci pour votre achat chez Nael76!`;
  alert(message);
  cart = [];
  saveCart();
  updateCartCount();
  closeCart();
}

// Notification
function showNotification(message) {
  const notif = document.createElement('div');
  notif.textContent = message;
  notif.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #2b211b;
    color: #f3ede4;
    padding: 15px 25px;
    border-radius: 8px;
    font-weight: 600;
    z-index: 3000;
    animation: slideIn 0.3s ease;
  `;
  document.body.appendChild(notif);
  setTimeout(() => notif.remove(), 2000);
}

// Add animation
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
`;
document.head.appendChild(style);

// Initialize on load
init();