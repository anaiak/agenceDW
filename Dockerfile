# Dockerfile multi-stage pour DreamWeaver Studio
# Stage 1: Build
FROM node:18-alpine AS builder

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système nécessaires
RUN apk add --no-cache git

# Copier les fichiers de dépendances
COPY package*.json ./

# Installer TOUTES les dépendances (dev + prod nécessaires pour le build)
RUN npm ci --silent

# Copier tout le contenu (plus robuste)
COPY . .

# Vérifier et créer les dossiers/fichiers manquants si nécessaire
RUN echo "=== Vérification des dossiers ===" && \
    ls -la && \
    echo "=== Contenu public ===" && \
    (ls -la public/ || echo "Dossier public manquant") && \
    echo "=== Contenu src ===" && \
    (ls -la src/ || echo "Dossier src manquant")

# Créer index.html minimal si manquant
RUN if [ ! -f "public/index.html" ]; then \
        echo "Création du dossier public et index.html manquants" && \
        mkdir -p public && \
        echo '<!DOCTYPE html><html lang="fr"><head><meta charset="utf-8"/><link rel="icon" href="%PUBLIC_URL%/favicon.ico"/><meta name="viewport" content="width=device-width, initial-scale=1"/><meta name="theme-color" content="#000000"/><meta name="description" content="DreamWeaver Studio"/><title>DREAMWEAVER — SHOCK OF THE NEW</title><link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet"></head><body><noscript>JavaScript requis pour l'"'"'expérience complète.</noscript><div id="root"></div></body></html>' > public/index.html; \
    fi

# Variables d'environnement pour le build
ENV NODE_ENV=production
ENV GENERATE_SOURCEMAP=false
ENV CI=true
ENV DISABLE_ESLINT_PLUGIN=true

# Vérification finale avant build
RUN echo "=== État final avant build ===" && \
    ls -la public/ && \
    echo "=== Contenu index.html ===" && \
    cat public/index.html

# Build de l'application avec gestion d'erreur
RUN npm run build

# Stage 2: Production
FROM nginx:alpine AS production

# Installer envsubst pour les variables d'environnement
RUN apk add --no-cache gettext

# Copier le template de configuration nginx
COPY nginx.conf.template /etc/nginx/nginx.conf.template

# Copier les fichiers buildés depuis le stage builder
COPY --from=builder /app/build /usr/share/nginx/html

# Script de démarrage qui remplace les variables d'environnement
COPY start.sh /start.sh
RUN chmod +x /start.sh

# Exposer le port (sera défini par Railway)
EXPOSE $PORT

# Démarrer avec le script personnalisé
CMD ["/start.sh"] 