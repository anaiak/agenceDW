# 🔍 Guide de Dépannage GTM - DreamWeaver Studio

## Problème Identifié et Solution

### ❌ Problème Principal
Vos balises GTM n'étaient **pas détectées** à cause d'une **Content Security Policy (CSP) trop restrictive** dans la configuration nginx qui bloquait les scripts de Google Tag Manager.

### ✅ Solution Appliquée
Nous avons corrigé la CSP dans `nginx.conf` et `nginx.conf.template` pour autoriser explicitement :
- `https://www.googletagmanager.com`
- `https://www.google-analytics.com` 
- `https://ssl.google-analytics.com`
- `https://tagmanager.google.com`

## 🛠️ Comment Tester GTM

### 1. Outil de Diagnostic Intégré
Un outil de diagnostic a été ajouté à votre application :

**Accès :**
- **Raccourci clavier :** `Ctrl + Shift + G`
- **URL avec paramètre :** Ajoutez `?gtm_debug=true` à votre URL
- **Script npm :** `npm run start:gtm-debug`

**Fonctionnalités :**
- ✅ Vérification DataLayer
- ✅ Vérification script GTM
- ✅ Test d'événements
- ✅ Rechargement GTM
- ✅ Auto-refresh

### 2. Méthodes de Vérification Manuelles

#### A. Via Console du Navigateur
```javascript
// Vérifier que dataLayer existe
console.log('DataLayer:', window.dataLayer);

// Vérifier le container GTM
console.log('GTM Container:', window.google_tag_manager);

// Tester un événement
window.dataLayer.push({
  event: 'test_event',
  test_parameter: 'test_value'
});
```

#### B. Via Google Tag Assistant
1. Installer l'extension **Tag Assistant Legacy** de Google
2. Naviguer sur votre site
3. Cliquer sur l'extension pour voir les tags détectés

#### C. Via DevTools - Network
1. Ouvrir DevTools (F12)
2. Onglet **Network**
3. Filtrer par `googletagmanager.com`
4. Recharger la page
5. Vérifier que les requêtes GTM sont présentes

## 🔧 Configuration Actuelle

### GTM ID Configuré
```javascript
const GTM_ID = 'GTM-KV8Q2ZXG';
```

### Balises HTML Présentes
- ✅ Script GTM dans `<head>`
- ✅ Noscript GTM dans `<body>`

### Événements Trackés
- `page_view` - Vues de pages
- `contact_form_start` - Début formulaire de contact
- `contact_form_submit` - Soumission formulaire
- `project_view` - Vue détail projet
- `service_view` - Vue service
- `menu_click` - Clics menu navigation
- `legal_page_view` - Pages légales
- `cta_click` - Clics call-to-action
- `scroll_depth` - Profondeur de scroll

## 🚀 Actions à Effectuer

### 1. Redémarrer l'Application
Après les modifications de la CSP, redémarrez votre serveur :
```bash
# Si en développement
npm start

# Si en production avec Docker
docker-compose restart
```

### 2. Vider le Cache
- **Navigateur :** `Ctrl + F5` (rechargement dur)
- **CloudFlare/CDN :** Purger le cache si applicable

### 3. Tester GTM
1. Ouvrir `http://localhost:3000?gtm_debug=true`
2. Le diagnostic s'affichera automatiquement
3. Vérifier que tous les indicateurs sont verts ✅

### 4. Valider dans GTM
1. Aller sur [Google Tag Manager](https://tagmanager.google.com/)
2. Sélectionner votre container `GTM-KV8Q2ZXG`
3. Mode **Preview** pour tester en temps réel
4. Naviguer sur votre site pour voir les événements

## 🐛 Problèmes Fréquents et Solutions

### Problème : "DataLayer n'existe pas"
**Solution :** Vérifier que le script GTM se charge avant vos scripts React
```html
<!-- Doit être dans <head> AVANT autres scripts -->
<script>(function(w,d,s,l,i){...})(window,document,'script','dataLayer','GTM-KV8Q2ZXG');</script>
```

### Problème : "Script GTM bloqué par CSP"
**Solution :** ✅ Résolu - CSP mise à jour pour autoriser GTM

### Problème : "Événements ne remontent pas"
**Diagnostic :**
```javascript
// Vérifier que les événements sont poussés
window.dataLayer.push({
  event: 'debug_test',
  debug_info: 'test_from_console'
});

// Vérifier le contenu de dataLayer
console.table(window.dataLayer);
```

### Problème : "GTM fonctionne localement mais pas en production"
**Actions :**
1. Vérifier la configuration nginx en production
2. S'assurer que la CSP est identique
3. Vérifier les certificats SSL
4. Tester avec les DevTools

## 📊 Monitoring et Performance

### Métriques à Surveiller
- Temps de chargement GTM (< 2s)
- Taux d'événements reçus
- Erreurs JavaScript liées à GTM

### Optimisations Appliquées
- Chargement asynchrone du script GTM
- Initialisation conditionnelle du dataLayer
- Gestion des erreurs dans les fonctions GTM

## 🎯 Prochaines Étapes

1. **Tester immédiatement** avec l'outil de diagnostic
2. **Valider les événements** dans GTM Preview
3. **Configurer Google Analytics 4** dans GTM
4. **Mettre en place des conversions** pour le formulaire de contact
5. **Ajouter le suivi e-commerce** si nécessaire

---

**Contact Support :** Si le problème persiste après ces étapes, vérifiez d'abord que nginx a été redémarré avec la nouvelle configuration. 