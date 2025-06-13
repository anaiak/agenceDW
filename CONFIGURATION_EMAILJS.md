# 📧 Configuration EmailJS - Template de Réception

## 🎯 **Objectif**
Configurer un template EmailJS professionnel pour recevoir visuellement les demandes de contact du site DreamWeaver Studio.

---

## 📋 **Étapes de Configuration**

### **1. Connexion à EmailJS Dashboard**
1. Allez sur [emailjs.com](https://www.emailjs.com/)
2. Connectez-vous avec votre compte
3. Accédez à votre service `service_phh8eqg`

### **2. Modification du Template**
1. Cliquez sur **"Email Templates"** dans le menu
2. Sélectionnez votre template `template_m85wiah`
3. Cliquez sur **"Edit"**

### **3. Configuration du Template**

#### **Sujet de l'Email :**
```
🚨 [DreamWeaver Studio] Nouvelle demande de {{from_name}} - {{company}}
```

#### **Contenu HTML :**
Copiez-collez le contenu du fichier `email-template.html` dans la section **"Content"** du template EmailJS.

#### **Variables Utilisées :**
- `{{from_name}}` : Nom du prospect
- `{{from_email}}` : Email du prospect  
- `{{company}}` : Entreprise (peut être vide)
- `{{message}}` : Message du projet
- `{{date}}` : Date automatique (à ajouter)
- `{{time}}` : Heure automatique (à ajouter)

### **4. Variables Automatiques à Ajouter**

Dans le template EmailJS, ajoutez ces variables pour enrichir les données :

```javascript
// Dans le code JavaScript du formulaire (déjà fait) :
const templateParams = {
  from_name: formData.name,
  from_email: formData.email,
  company: formData.company || 'Non précisée',
  message: formData.message,
  date: new Date().toLocaleDateString('fr-FR'),
  time: new Date().toLocaleTimeString('fr-FR'),
  to_email: 'contact@dreamweaver.studio'
};
```

### **5. Test du Template**

1. Dans EmailJS Dashboard, cliquez sur **"Test"**
2. Remplissez les champs de test :
   - `from_name`: "Jean Dupont"
   - `from_email`: "jean.dupont@example.com"  
   - `company`: "Startup Innovante"
   - `message`: "Bonjour, je souhaiterais développer un site e-commerce révolutionnaire..."
3. Cliquez sur **"Send Test"**

---

## 🎨 **Caractéristiques du Template**

### **Design :**
- ✅ Esthétique **brutalist** cohérente avec le site
- ✅ Police **JetBrains Mono** monospace
- ✅ Couleurs **noir & blanc** pures
- ✅ Éléments visuels **géométriques**
- ✅ **Responsive** mobile-friendly

### **Fonctionnalités :**
- 🚨 **Badge d'alerte** visuel "LEAD ENTRANT"
- 📊 **Grille d'informations** structurée
- 💬 **Section message** mise en valeur
- 📈 **Métadonnées** automatiques (date/heure/source)
- 🔥 **Priorité HAUTE** par défaut
- 📧 **Bouton de réponse** prérempli
- 📞 **Bouton d'appel** direct

### **Informations Affichées :**
1. **Nom du prospect** ({{from_name}})
2. **Email de contact** ({{from_email}})
3. **Entreprise** ({{company}})
4. **Message complet** ({{message}})
5. **Date de réception** ({{date}})
6. **Heure d'envoi** ({{time}})
7. **Source** : "Site Web - Formulaire Contact"
8. **Priorité** : "🔥 HAUTE"

---

## ⚡ **Actions Rapides Intégrées**

### **Bouton "RÉPONDRE" :**
- Ouvre votre client email
- Sujet prérempli : "Re: Votre demande sur DreamWeaver Studio"
- Message de réponse template inclus

### **Bouton "APPELER" :**
- Lien `tel:` pour appel direct
- Compatible mobile et desktop

---

## 🔧 **Personnalisation Avancée**

### **Modifier les Couleurs :**
```css
/* Dans le template, changez ces variables : */
background-color: #000000; /* Noir principal */
color: #ffffff; /* Blanc principal */
border: 2px solid #ffffff; /* Bordures blanches */
```

### **Ajouter des Champs :**
Pour ajouter un champ (ex: téléphone), modifiez :

1. **JavaScript (Contact.tsx) :**
```javascript
const templateParams = {
  // ... existing params
  phone: formData.phone || 'Non précisé'
};
```

2. **Template HTML :**
```html
<div class="info-item">
    <span class="info-label">Téléphone</span>
    <div class="info-value">{{phone}}</div>
</div>
```

---

## 📱 **Compatibilité Email**

### **Clients Email Testés :**
- ✅ Gmail (Desktop/Mobile)
- ✅ Outlook (Desktop/Mobile)  
- ✅ Apple Mail (Desktop/Mobile)
- ✅ Thunderbird
- ✅ Yahoo Mail
- ✅ Webmail clients

### **Fallbacks Inclus :**
- Polices système si JetBrains Mono indisponible
- CSS inline pour compatibilité maximale
- Images SVG encodées en base64
- Media queries pour mobile

---

## 🚀 **Résultat Final**

Vous recevrez des emails avec :
- **Design professionnel** cohérent avec votre brand
- **Informations structurées** et faciles à lire
- **Actions rapides** pour répondre efficacement
- **Priorisation visuelle** des leads importants
- **Métadonnées complètes** pour le suivi

---

## 📞 **Support**

En cas de problème :
1. Vérifiez les **variables** dans EmailJS Dashboard
2. Testez avec des **données simples** d'abord
3. Consultez les **logs EmailJS** pour les erreurs
4. Vérifiez la **configuration du service** EmailJS

**Template créé pour DreamWeaver Studio - Design Digital Brutalist** 🎨 