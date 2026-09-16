# 🛍️ Nael76 — Boutique en Ligne Premium

Une boutique e-commerce élégante et moderne pour du prêt-à-porter de qualité supérieure.

## ✨ Fonctionnalités

✅ **Catalogue de produits** avec images haute qualité
✅ **Panier interactif** avec gestion des quantités
✅ **Stockage local** (localStorage) - vos données persistent
✅ **Design responsive** (mobile, tablette, desktop)
✅ **Paiement sécurisé** (intégration Stripe prête)
✅ **Notifications en temps réel**
✅ **Interface élégante** et intuitive

## 🚀 Accès au Site

**Site en ligne :** https://kamounael817-code.github.io/nael76-boutique/

### Ou lancez localement :

```bash
# 1. Clonez le repository
git clone https://github.com/kamounael817-code/nael76-boutique.git
cd nael76-boutique

# 2. Ouvrez index.html
# Avec VS Code : Clic droit → "Open with Live Server"
# Ou double-cliquez sur index.html
```

## 📦 Structure du Projet

```
nael76-boutique/
├── index.html          # Page principale avec tous les produits
├── app.js              # Logique du panier et paiement
├── todo-app.html       # Application To-Do (bonus)
└── README.md           # Ce fichier
```

## 🎯 Comment Utiliser

### Voir les Produits
1. Accédez au site
2. Scrollez pour voir les 3 produits premium
3. Cliquez sur "Voir les détails" pour plus d'infos

### Ajouter au Panier
- Cliquez sur "Ajouter" pour ajout rapide (quantité 1)
- Ou ouvrez le détail du produit et modifiez la quantité

### Paiement
1. Cliquez sur l'icône 🛒 (panier) en haut à droite
2. Vérifiez vos articles
3. Cliquez sur "Procéder au paiement"
4. Le paiement est actuellement en **mode démo** (pas de vrai paiement)

### Données Sauvegardées
- Votre panier est sauvegardé automatiquement
- Même après fermer le navigateur, vos articles restent

## 🎨 Design

- **Polices :** Libre Caslon Display (titres) + Public Sans (corps)
- **Couleurs :** Palettes chaudes et élégantes (espresso, cognac, ivoire)
- **Responsive :** Fonctionne parfaitement sur tous les appareils

## 💳 Produits

| Produit | Prix | Description |
|---------|------|-------------|
| Le Manteau Croix-Rousse | 420€ | Laine double face, doublure amovible |
| La Chemise Bellecour | 135€ | Coton égyptien, boutons nacre |
| Le Pantalon Perrache | 190€ | Laine peignée, taille haute |

## 🔧 Configuration Stripe (Optionnel)

Pour ajouter un vrai paiement Stripe :

1. Créez un compte à https://stripe.com
2. Obtenez votre clé publique
3. Modifiez `app.js` ligne 1 avec votre clé :
```javascript
const stripe = Stripe('YOUR_STRIPE_KEY_HERE');
```

## 📝 Bonus : Application To-Do

Visitez `/todo-app.html` pour une application de gestion de tâches avec :
- ✅ Ajout/suppression de tâches
- 📊 Statistiques en temps réel
- 🎯 Filtrage par priorité
- 💾 Sauvegarde automatique

## 🌐 Déployer Votre Propre Version

### Sur Netlify
1. Connectez votre GitHub à Netlify
2. Sélectionnez ce repository
3. Déployez en 1 clic !

### Sur Vercel
1. Connectez votre GitHub à Vercel
2. Sélectionnez ce repository
3. Déployé automatiquement !

## 📱 Technologies

- **HTML5** - Structure sémantique
- **CSS3** - Design moderne (Flexbox, Grid)
- **JavaScript Vanilla** - Zéro dépendances
- **LocalStorage API** - Persistence des données
- **Stripe.js** - Paiements sécurisés (optionnel)

## 📄 License

© 2026 Nael76 - Tous droits réservés

## 🤝 Support

Besoin d'aide ? Contactez-moi via GitHub Issues.

---

**Profitez de votre boutique ! 🎉**
